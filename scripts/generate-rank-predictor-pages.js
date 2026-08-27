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

const htmlPages = [
  "latest-jobs",
  "admitcard",
  "answer-key",
  "results",
  "quiz",
  "rank-predictor",
  "student-hub",
  "documents",
  "up-certificate-services",
  "about-us",
  "login",
  "dashboard",
  "privacy-policy",
  "terms",
  "refund-policy",
  "disclaimer",
  "contact"
];

const categoryLandingPages = [
  {
    dir: "ssc-cgl",
    name: "SSC CGL",
    title: "SSC CGL Rank Predictor 2026 | GovJobUpdates",
    description: "Use SSC CGL Rank Predictor to estimate expected marks, overall rank, category rank and cutoff chances after checking the official answer key.",
    intro: "Estimate your SSC CGL expected rank after matching attempts with the official answer key or response sheet.",
    context: "official answer key",
    links: ["ssc-cgl-2025-tier-1"]
  },
  {
    dir: "ssc-cpo",
    name: "SSC CPO",
    title: "SSC CPO Rank Predictor 2026 | GovJobUpdates",
    description: "Use SSC CPO Rank Predictor to estimate written exam rank, category rank and physical test cutoff chances with answer key based marks.",
    intro: "Check SSC CPO expected written rank and understand how marks can affect physical stage shortlisting.",
    context: "physical",
    links: ["ssc-cpo-2025-paper-1"]
  },
  {
    dir: "up-police",
    name: "UP Police",
    title: "UP Police Rank Predictor 2026 | GovJobUpdates",
    description: "Use UP Police Rank Predictor to estimate expected marks, category rank and selection chances after the official UP Police answer key.",
    intro: "Estimate UP Police expected rank using answer key based marks and compare with candidate submissions.",
    context: "official UP Police",
    links: ["up-police-si-2025", "up-constable-2026"]
  },
  {
    dir: "railway",
    name: "Railway",
    title: "Railway Rank Predictor 2026 | RRB Exams | GovJobUpdates",
    description: "Use Railway Rank Predictor for RRB exams to estimate marks, normalized rank, category rank and cutoff chances after answer key release.",
    intro: "Open RRB exam rank predictor pages and compare expected marks for Railway Recruitment Boards exams.",
    context: "Railway Recruitment Boards",
    links: ["rrb-alp-cbt-2", "rrb-ntpc-gl-cbt-2-2026", "rrb-group-d-2026"]
  },
  {
    dir: "up-home-guard",
    name: "UP Home Guard",
    title: "UP Home Guard Rank Predictor 2026 | GovJobUpdates",
    description: "Use UP Home Guard Rank Predictor to estimate expected rank, category rank and cutoff chances from answer key based candidate data.",
    intro: "Check UP Home Guard expected rank and compare your marks before the final list from the official authority.",
    context: "official authority",
    links: ["up-homeguard-2026"]
  }
];

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
  return normalizeGeneratedLinks(html);
}

function normalizeGeneratedLinks(html) {
  let output = html.replace(/<base\b[^>]*>\s*/gi, "");
  output = output.replace(/(href|src)="\.\.\/Assets\//g, '$1="/Assets/');
  output = output.replace(/(href|src)="\.\.\/CSS\//g, '$1="/CSS/');
  output = output.replace(/(href|src)="\.\.\/JS\//g, '$1="/JS/');
  output = output.replace(/href="\.\.\/index\.html"/g, 'href="/"');
  output = output.replace(/href="\.\.\/typing-test\/index\.html"/g, 'href="/typing-test/"');
  output = output.replace(/href="\.\.\/rank-predictor\/([^"\/]+)\/index\.html"/g, 'href="/rank-predictor/$1/"');
  output = output.replace(/href="\.\.\/rank-predictor\/([^"]+)"/g, 'href="/rank-predictor/$1"');

  htmlPages.forEach((page) => {
    const pattern = new RegExp(`href="${page}\\.html"`, "g");
    output = output.replace(pattern, `href="/HTML/${page}.html"`);
  });

  output = output.replace(/data-login-href="login\.html"/g, 'data-login-href="/HTML/login.html"');
  output = output.replace(/data-dashboard-href="dashboard\.html"/g, 'data-dashboard-href="/HTML/dashboard.html"');
  return output;
}

function normalizeExistingRankPages() {
  const rankRoot = path.join(root, "rank-predictor");
  if (!fs.existsSync(rankRoot)) return [];

  return fs.readdirSync(rankRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(rankRoot, entry.name, "index.html"))
    .filter((file) => fs.existsSync(file))
    .map((file) => {
      fs.writeFileSync(file, normalizeGeneratedLinks(fs.readFileSync(file, "utf8")));
      return path.relative(root, file).replace(/\\/g, "/");
    });
}

function buildCategorySchema(page) {
  const url = `${baseUrl}/rank-predictor/${page.dir}/`;
  return {
    webpage: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title.replace(/\s*\|\s*GovJobUpdates$/, ""),
      url,
      description: page.description,
      publisher: {
        "@type": "Organization",
        name: "GovJobUpdates",
        url: `${baseUrl}/`
      }
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How does ${page.name} Rank Predictor work?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `It uses answer key based marks and available candidate submissions to estimate ${page.name} rank and cutoff chances.`
          }
        },
        {
          "@type": "Question",
          name: "Is the predicted rank official?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It is only an estimate. Final result, cutoff, normalization and merit list are published by the official authority."
          }
        }
      ]
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
        { "@type": "ListItem", position: 2, name: "Rank Predictor", item: `${baseUrl}/HTML/rank-predictor.html` },
        { "@type": "ListItem", position: 3, name: `${page.name} Rank Predictor`, item: url }
      ]
    }
  };
}

function buildCategoryLandingPage(page, examById) {
  const url = `${baseUrl}/rank-predictor/${page.dir}/`;
  const schemas = buildCategorySchema(page);
  const examLinks = page.links
    .map((examId) => examById.get(examId))
    .filter(Boolean)
    .map((exam) => {
      const title = escapeHtml(getRankTitle(getShortName(exam)));
      return `<a class="primary-btn" href="/rank-predictor/${escapeHtml(getDir(exam))}/">Open Rank Predictor - ${title}</a>`;
    })
    .join("\n                ");

  const fallbackLink = `<a class="primary-btn" href="/HTML/rank-predictor.html">Open Rank Predictor</a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${escapeHtml(url)}">
    <meta property="og:site_name" content="GovJobUpdates">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${escapeHtml(url)}">
    <meta property="og:image" content="${baseUrl}/Assets/Home%20Page/Government%20Job%20Banner.webp">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${baseUrl}/Assets/Home%20Page/Government%20Job%20Banner.webp">
    <script type="application/ld+json">${scriptJson(schemas.webpage)}</script>
    <script type="application/ld+json">${scriptJson(schemas.faq)}</script>
    <script type="application/ld+json">${scriptJson(schemas.breadcrumb)}</script>
    <link rel="icon" type="image/png" sizes="32x32" href="/Assets/Home Page/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/Assets/Home Page/favicon-16x16.png">
    <link rel="shortcut icon" href="/Assets/Home Page/favicon.ico">
    <link rel="apple-touch-icon" href="/Assets/Home Page/apple-icon.png">
    <link rel="stylesheet" href="/CSS/style.css">
    <link rel="stylesheet" href="/CSS/rank-predictor.css?v=20260820-lifecycle-phase3">
    <link rel="stylesheet" href="/Assets/vendor/fontawesome/css/all.min.css">
</head>
<body>
    <header><div class="header-container"><div class="logo-container"><img src="/Assets/Home%20Page/favicon-96x96.png" alt="GovJobUpdates Logo" class="logo-img" width="46" height="46" decoding="async"><a href="/" class="logo">GovJob<span>Updates</span></a><span class="header-tiranga" aria-hidden="true"></span></div><button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false"><i class="fas fa-bars" aria-hidden="true"></i></button><nav><ul><li><a href="/">Home</a></li><li><a href="/HTML/latest-jobs.html">Jobs</a></li><li><a href="/HTML/admitcard.html">Admit Card</a></li><li><a href="/HTML/answer-key.html">Answer Key</a></li><li><a href="/HTML/results.html">Results</a></li><li><a href="/HTML/quiz.html">Quiz</a></li><li><a href="/HTML/rank-predictor.html" class="active">Rank Predictor</a></li><li><a href="/HTML/student-hub.html">Student Hub</a></li><li><a href="/HTML/documents.html">Documents</a></li><li><a href="/HTML/up-certificate-services.html">UP Services</a></li><li><a href="/HTML/about-us.html">About Us</a></li></ul></nav><div class="header-auth-actions"><a class="header-login-btn" href="/HTML/login.html" aria-label="Login to candidate dashboard" data-auth-entry data-login-href="/HTML/login.html" data-dashboard-href="/HTML/dashboard.html"><i class="fas fa-user-circle" aria-hidden="true"></i><span>Login</span></a></div></div></header>
    <main class="rank-cards-page">
        <section class="rank-cards-heading" aria-labelledby="categoryRankTitle">
            <div>
                <p class="rank-cards-kicker">GovJobUpdates Rank Predictor</p>
                <h1 id="categoryRankTitle">${escapeHtml(page.name)} Rank Predictor</h1>
                <span>${escapeHtml(page.intro)}</span>
            </div>
            <div class="rank-card-actions">
                ${examLinks || fallbackLink}
            </div>
        </section>
        <section class="page-guide" id="rankPredictorSeoSupport" aria-labelledby="categoryRankGuide">
            <p class="guide-kicker">${escapeHtml(page.name)} Rank Guide</p>
            <h2 id="categoryRankGuide">${escapeHtml(page.name)} expected rank, category rank and cutoff analysis</h2>
            <p>Open Rank Predictor for the active ${escapeHtml(page.name)} exam and enter marks after checking the ${escapeHtml(page.context)} notice, answer key or response sheet. The prediction helps compare expected marks with other candidate submissions.</p>
            <div class="guide-grid">
                <article class="guide-card"><h3>Answer key based estimate</h3><p>Use correct, wrong and attempted answers from the official answer key before submitting your expected marks.</p></article>
                <article class="guide-card"><h3>Category comparison</h3><p>Where enough data is available, the tool can estimate overall rank, category rank, gender rank, state rank or district rank.</p></article>
                <article class="guide-card"><h3>Official result check</h3><p>Final cutoff, merit list, normalization and selection status must always be verified from the official recruitment authority.</p></article>
            </div>
            <nav class="related-links" aria-label="${escapeHtml(page.name)} rank predictor related pages">
                <h3>Useful pages</h3>
                ${examLinks || fallbackLink}
                <a href="/HTML/rank-predictor.html">All Rank Predictors</a>
                <a href="/HTML/answer-key.html">Answer Keys</a>
                <a href="/HTML/results.html">Results</a>
                <a href="/HTML/latest-jobs.html">Latest Jobs</a>
            </nav>
            <p class="official-note"><strong>Important:</strong> ${escapeHtml(page.name)} Rank Predictor is an estimate only. Always verify final marks, cutoff and selection status from the official authority.</p>
        </section>
        <section class="seo-faq" aria-labelledby="categoryRankFaq">
            <h2 id="categoryRankFaq">${escapeHtml(page.name)} Rank Predictor FAQs</h2>
            <div class="seo-faq-list">
                <details><summary>Is this ${escapeHtml(page.name)} predicted rank official?</summary><p>No. It is only an estimate based on submitted marks and cannot replace the official result or cutoff.</p></details>
                <details><summary>When should I use this predictor?</summary><p>Use it after checking the official answer key or response sheet so your entered marks are more accurate.</p></details>
            </div>
        </section>
    </main>
    <nav class="candidate-bottom-nav" aria-label="Primary mobile navigation"><a href="/" aria-label="Home"><i class="fas fa-home" aria-hidden="true"></i><span>Home</span></a><a href="/HTML/rank-predictor.html" class="is-active" aria-label="Rank"><i class="fas fa-chart-line" aria-hidden="true"></i><span>Rank</span></a><a href="/HTML/quiz.html" aria-label="Quiz"><i class="fas fa-stopwatch" aria-hidden="true"></i><span>Quiz</span></a><a href="/HTML/up-certificate-services.html" aria-label="UP Doc"><i class="fas fa-certificate" aria-hidden="true"></i><span>UP Doc</span></a><a href="/HTML/latest-jobs.html" aria-label="Jobs"><i class="fas fa-briefcase" aria-hidden="true"></i><span>Jobs</span></a></nav>
    <footer><div class="footer-content"><div class="footer-section"><h3>GovJobUpdates</h3><p>India's trusted government job portal for latest jobs, admit cards, results, answer keys, rank prediction, UP certificate assistance and document tools. GovJobUpdates is not a government website; always verify details from the official source before applying.</p></div><div class="footer-section"><h3>Quick Links</h3><ul><li><a href="/">Home</a></li><li><a href="/HTML/latest-jobs.html">Jobs</a></li><li><a href="/HTML/admitcard.html">Admit Card</a></li><li><a href="/HTML/answer-key.html">Answer Key</a></li><li><a href="/HTML/results.html">Results</a></li><li><a href="/HTML/rank-predictor.html">Rank Predictor</a></li><li><a href="/typing-test/">Typing Test</a></li></ul></div><div class="footer-section"><h3>Resources</h3><ul><li><a href="/HTML/quiz.html">Quiz</a></li><li><a href="/HTML/student-hub.html">Student Hub</a></li><li><a href="/HTML/documents.html">Documents</a></li><li><a href="/HTML/up-certificate-services.html">UP Services</a></li><li><a href="/HTML/about-us.html">About Us</a></li><li><a href="/HTML/contact.html">Contact</a></li></ul></div><div class="footer-section"><h3>Contact Us</h3><ul><li><i class="fas fa-envelope" aria-hidden="true"></i> dmagstudio2023@outlook.com</li><li><i class="fas fa-phone" aria-hidden="true"></i> +91 7300627752</li><li><i class="fas fa-map-marker-alt" aria-hidden="true"></i> Shikohabad, UP, India</li></ul></div></div><div class="copyright">&copy; 2026 GovJobUpdates. All rights reserved. | <a href="/HTML/privacy-policy.html">Privacy Policy</a> | <a href="/HTML/terms.html">Terms of Use</a> | <a href="/HTML/disclaimer.html">Disclaimer</a></div></footer>
    <script src="/JS/script.js?v=20260815-scroll-fix" defer></script>
    <script src="/JS/firebase-config.js" defer></script>
    <script type="module" src="/JS/firebase-analytics.js"></script>
    <script type="module" src="/JS/firebase-visitors.js"></script>
</body>
</html>`;
}

async function main() {
  const { source, exams } = await loadExams();
  const written = [];
  const examById = new Map(exams.map((exam) => [exam.examId, exam]));

  for (const exam of exams) {
    const dir = path.join(root, "rank-predictor", getDir(exam));
    const file = path.join(dir, "index.html");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, buildPage(exam));
    written.push(path.relative(root, file).replace(/\\/g, "/"));
  }

  for (const page of categoryLandingPages) {
    const dir = path.join(root, "rank-predictor", page.dir);
    const file = path.join(dir, "index.html");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, buildCategoryLandingPage(page, examById));
    written.push(path.relative(root, file).replace(/\\/g, "/"));
  }

  const normalized = normalizeExistingRankPages();

  console.log(`Loaded ${exams.length} rank predictor exams from ${source}.`);
  console.log(`Generated ${written.length} rank predictor pages.`);
  written.forEach((file) => console.log(file));
  console.log(`Normalized ${normalized.length} existing rank predictor pages.`);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
