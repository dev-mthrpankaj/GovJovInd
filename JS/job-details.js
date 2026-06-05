(function () {
  "use strict";

  const SITE = "https://govjobupdates.com";
  const PATHS = {
    latestJobs: "../../HTML/latest-jobs.html",
    admitCard: "../../HTML/admitcard.html",
    answerKey: "../../HTML/answer-key.html",
    results: "../../HTML/results.html",
    rankPredictor: "../../HTML/rank-predictor.html",
    quiz: "../../HTML/quiz.html",
    documents: "../../HTML/documents.html",
    articles: "../../HTML/student-hub.html",
    disclaimer: "../../HTML/disclaimer.html",
    home: "../../index.html"
  };

  function initMenu() {
    const toggle = document.querySelector("[data-job-menu-toggle]");
    const nav = document.querySelector("[data-job-nav]");
    if (!toggle || !nav || toggle.dataset.bound === "true") return;
    toggle.dataset.bound = "true";
    const icon = toggle.querySelector("i");
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      if (icon) {
        icon.classList.toggle("fa-bars", !open);
        icon.classList.toggle("fa-times", open);
      }
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) setOpen(false);
    });
  }

  function initLogoFallback() {
    document.querySelectorAll(".job-detail-logo-mark img, .logo-img").forEach((img) => {
      if (img.dataset.logoFallbackBound === "true") return;
      img.dataset.logoFallbackBound = "true";
      img.addEventListener("error", () => {
        const fallback = img.closest(".job-detail-logo-mark")?.querySelector(".job-detail-logo-fallback");
        img.style.display = "none";
        if (fallback) fallback.style.display = "grid";
      }, { once: true });
      if (img.complete && img.naturalWidth === 0) img.style.display = "none";
    });
  }

  function initStaticActions() {
    document.querySelectorAll(".copy-link").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          const old = button.innerHTML;
          button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copied';
          setTimeout(() => { button.innerHTML = old; }, 1500);
        } catch {
          window.prompt("Copy this link", window.location.href);
        }
      });
    });
    document.querySelectorAll(".print-page").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => window.print());
    });
  }

  function runSharedHelpers() {
    initMenu();
    initLogoFallback();
    initStaticActions();
  }

  function getText(value, fallback = "Not specified") {
    if (value === undefined || value === null || String(value).trim() === "") return fallback;
    return String(value).trim();
  }

  function escapeHtml(value) {
    return getText(value, "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character]));
  }

  function stripHtml(value) {
    const div = document.createElement("div");
    div.innerHTML = getText(value, "");
    return div.textContent || div.innerText || "";
  }

  function normalizeActionUrl(value) {
    const url = getText(value, "");
    if (!url || url === "#") return "";
    if (/^(https?:|mailto:|tel:)/i.test(url) || /^(\/|\.\/|\.\.\/)/.test(url)) return url;
    if (/^[a-z0-9.-]+\.[a-z]{2,}(?:[/:?#].*)?$/i.test(url)) return `https://${url}`;
    return "";
  }

  function absoluteUrl(value) {
    const url = normalizeActionUrl(value);
    if (!url) return "";
    try {
      return new URL(url, window.location.href).href;
    } catch {
      return "";
    }
  }

  function parseDate(value) {
    if (!value) return null;
    const normalized = String(value).trim();
    const iso = /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? `${normalized}T00:00:00` : normalized;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(value) {
    const date = parseDate(value);
    if (!date) return "Not specified";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function isoDate(value) {
    const date = parseDate(value);
    return date ? date.toISOString().slice(0, 10) : "";
  }

  function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  function getStatus(job) {
    const today = getToday();
    const start = parseDate(job.startDate);
    const last = parseDate(job.lastDate || job.endDate);
    const status = getText(job.status, "").toLowerCase();
    if (last && today > last) return "Closed";
    if (start && today < start) return "Upcoming";
    if (status === "closed") return "Closed";
    if (status === "upcoming") return "Upcoming";
    return "Active";
  }

  function getRequestedId() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("id") || params.get("job") || "";
    if (raw) return raw.startsWith("job-") ? raw : `job-${raw.replace(/[^0-9]/g, "")}`;
    const file = window.location.pathname.split("/").pop() || "";
    const match = file.match(/(job-\d{4}|\d{4})/);
    if (!match) return "";
    return match[1].startsWith("job-") ? match[1] : `job-${match[1]}`;
  }

  function asArray(value) {
    if (Array.isArray(value)) return value.map((item) => getText(item, "")).filter(Boolean);
    return String(value || "").split(/[,|;]/).map((item) => item.trim()).filter(Boolean);
  }

  function normalizeJob(job) {
    const id = getText(job.id || job.jobId || job.ID, "");
    return {
      ...job,
      id: id.startsWith("job-") ? id : id ? `job-${String(id).replace(/[^0-9]/g, "")}` : "",
      title: getText(job.title || job.jobTitle || job.name, "Government Job Update"),
      organization: getText(job.organization || job.org || job.board, "Official Recruitment Board"),
      department: getText(job.department || job.category, "Government"),
      category: getText(job.category || job.department, "Government"),
      year: getText(job.year, "2026"),
      qualification: getText(job.qualification || job.eligibility, "Read official notification for post-wise qualification."),
      totalPosts: getText(job.totalPosts || job.posts || job.vacancy || job.vacancies, "Not specified"),
      startDate: getText(job.startDate || job.applicationStart || job.beginDate, ""),
      lastDate: getText(job.lastDate || job.endDate || job.applicationEnd, ""),
      updatedAt: getText(job.updatedAt || job.updated || job.updateDate, ""),
      applyLink: getText(job.applyLink || job.apply || job.applyUrl, "#"),
      officialNotification: getText(job.officialNotification || job.notification || job.notificationLink, "#"),
      officialWebsite: getText(job.officialWebsite || job.website || job.applyLink || job.apply || "#"),
      applicationFee: getText(job.applicationFee || job.fee || job.fees, "Check the official notification for category-wise application fee details."),
      ageLimit: getText(job.ageLimit || job.age || "Check the official notification for minimum age, maximum age and relaxation rules."),
      salary: getText(job.salary || job.payScale || job.pay || "Salary, stipend, honorarium or pay scale will be as notified by the recruiting organization."),
      selectionProcess: getText(job.selectionProcess || job.selection || "Selection stages will be conducted as per the official recruitment notification."),
      examPattern: getText(job.examPattern || job.paperPattern || ""),
      syllabus: getText(job.syllabus || job.syllabusOverview || ""),
      documentsRequired: asArray(job.documentsRequired || job.documents),
      tags: Array.isArray(job.tags) ? job.tags : asArray(job.tags)
    };
  }

  async function loadJobs() {
    let jobs = (Array.isArray(window.GovJobUpdatesJobs) ? window.GovJobUpdatesJobs : []).map(normalizeJob).filter((job) => job.id);
    if (window.GovJobUpdatesSheetData && typeof window.GovJobUpdatesSheetData.load === "function") {
      try {
        const sheetJobs = await window.GovJobUpdatesSheetData.load("jobs", jobs);
        if (Array.isArray(sheetJobs) && sheetJobs.length) jobs = sheetJobs.map(normalizeJob).filter((job) => job.id);
      } catch {}
    }
    return jobs;
  }

  function setMeta(name, content) {
    let node = document.querySelector(`meta[name="${name}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute("name", name);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  }

  function setProperty(property, content) {
    let node = document.querySelector(`meta[property="${property}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute("property", property);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  }

  function ensureCanonical(url) {
    let node = document.querySelector('link[rel="canonical"]');
    if (!node) {
      node = document.createElement("link");
      node.setAttribute("rel", "canonical");
      document.head.appendChild(node);
    }
    node.setAttribute("href", url);
  }

  function updateSeo(job) {
    const title = `${job.title} | GovJobUpdates`;
    const description = `${job.title} by ${job.organization}: important dates, eligibility, vacancy, salary, selection process, apply link, notification, FAQ and preparation resources.`;
    const canonical = window.location.href.split("#")[0];
    document.title = title;
    setMeta("description", description.slice(0, 158));
    setProperty("og:title", title);
    setProperty("og:description", description.slice(0, 180));
    setProperty("og:type", "article");
    setProperty("og:url", canonical);
    setProperty("og:site_name", "GovJobUpdates");
    setProperty("twitter:card", "summary_large_image");
    setProperty("twitter:title", title);
    setProperty("twitter:description", description.slice(0, 180));
    ensureCanonical(canonical);
  }

  function linkButton(url, label, primary) {
    const safe = normalizeActionUrl(url);
    if (!safe) return `<button class="btn btn-disabled" type="button" disabled>${escapeHtml(label)} Coming Soon</button>`;
    return `<a class="btn ${primary ? "btn-primary" : "btn-outline"}" href="${escapeHtml(safe)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
  }

  function linkTableRow(label, url, fallbackUrl, note) {
    const safe = normalizeActionUrl(url || fallbackUrl);
    const target = safe ? `<a href="${escapeHtml(safe)}"${/^https?:/i.test(safe) ? ' target="_blank" rel="noopener"' : ""}>Open Link</a>` : "<span>Coming Soon</span>";
    return `<tr><th scope="row">${escapeHtml(label)}</th><td>${target}</td><td>${escapeHtml(note)}</td></tr>`;
  }

  function row(label, value) {
    return `<div class="job-detail-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
  }

  function renderTags(tags) {
    const values = Array.isArray(tags) && tags.length ? tags : ["Government Job"];
    return values.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  }

  function summaryItem(label, value) {
    return `<li><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></li>`;
  }

  function statCard(label, value, icon) {
    return `<article><i class="fas ${escapeHtml(icon)}" aria-hidden="true"></i><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`;
  }

  function dateCard(label, value) {
    return `<article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`;
  }

  function table(headers, rows, className) {
    return `<div class="job-detail-table-wrap"><table class="${escapeHtml(className)}"><thead><tr>${headers.map((head) => `<th scope="col">${escapeHtml(head)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderNotFound(root, id) {
    document.title = "Job Not Found | GovJobUpdates";
    root.innerHTML = `<section class="job-detail-hero job-detail-empty-state"><span class="job-detail-kicker">Job Not Found</span><h1>Job detail is unavailable</h1><p class="job-detail-org">No matching job was found for <strong>${escapeHtml(id || "this URL")}</strong>. Please return to Latest Jobs and choose another update.</p><div class="job-detail-actions"><a class="btn btn-primary" href="../../HTML/latest-jobs.html">Back to Latest Jobs</a><a class="btn btn-outline" href="../../HTML/contact.html">Report Issue</a></div></section>`;
  }

  function generateAbout(job) {
    const postText = job.totalPosts === "Not specified" ? "the notified posts" : `${job.totalPosts} notified posts`;
    const closing = formatDate(job.lastDate);
    return [
      `${job.title} is an important recruitment update from ${job.organization} for candidates looking for a career opportunity in the ${job.department} sector. This page brings the essential details of the recruitment together in one place so applicants can understand the opportunity, check the timeline and move to the official source with better clarity.`,
      `The recruitment is listed under ${job.category} and currently shows ${postText}. Candidates with the required qualification, including ${job.qualification}, should review the official advertisement carefully before applying. The purpose of this overview is to help applicants quickly understand whether the vacancy matches their education, career stage and preparation plan.`,
      `For many aspirants, a recruitment like this is not only about submitting an online form. It also involves checking eligibility, confirming age limits, arranging documents, understanding the selection stages and planning preparation around the exam or assessment pattern. Applicants should avoid last-minute form submission, keep scanned documents ready and verify every instruction on the official website.`,
      `The application window begins on ${formatDate(job.startDate)} and the last date is ${closing}. If the recruitment is active or upcoming, candidates should use the official apply link and notification link provided below. If the last date has passed, the page remains useful for checking admit card, answer key, result, rank predictor and preparation resources connected with the same recruitment cycle.`,
      `GovJobUpdates publishes this page as an informational guide for job seekers. It is not the recruiting authority, so final decisions, corrections, fee rules, reservation details and eligibility interpretations must always be confirmed from ${job.organization} through the official notification or portal.`
    ].join(" ");
  }

  function defaultDocuments(job) {
    if (job.documentsRequired.length) return job.documentsRequired;
    return [
      "Recent passport size photograph",
      "Signature scan in the required format",
      "Class 10 certificate or date of birth proof",
      "Educational qualification certificates",
      "Category, EWS, domicile or reservation certificate if applicable",
      "Photo identity proof such as Aadhaar, PAN, voter ID or passport",
      "Experience, NOC or disability certificate if required by the notification",
      "Final submitted application form and fee receipt"
    ];
  }

  function inferExamPattern(job) {
    if (job.examPattern) return job.examPattern;
    if (/interview|consultant|trainee/i.test(`${job.title} ${job.category}`)) return "";
    return "If a written examination is part of the selection process, the exact subjects, marks, duration, negative marking and qualifying rules will be provided in the official notification.";
  }

  function inferSyllabus(job) {
    if (job.syllabus) return job.syllabus;
    if (/technical|scientist|engineer|telecom|agriculture|laboratory/i.test(`${job.title} ${job.department}`)) {
      return "The syllabus may include post-specific technical subjects along with general awareness, reasoning, quantitative aptitude or language sections where applicable.";
    }
    if (/constable|police|excise/i.test(`${job.title} ${job.department}`)) {
      return "The syllabus usually focuses on general knowledge, reasoning, numerical ability, language skills and recruitment-specific physical or document verification requirements when notified.";
    }
    return "The syllabus overview depends on the official exam pattern. Candidates should read the notification for subject-wise topics and prepare previous-year questions where available.";
  }

  function renderFAQ(job, status) {
    const lastDate = formatDate(job.lastDate);
    const startDate = formatDate(job.startDate);
    const questions = [
      ["What is this recruitment about?", `${job.title} is a recruitment update from ${job.organization} for ${job.department} related posts.`],
      ["How many vacancies are available?", `The current vacancy count shown for this recruitment is ${job.totalPosts}. Check the notification for category-wise and post-wise distribution.`],
      ["What is the required qualification?", `The qualification summary is: ${job.qualification}`],
      ["When does the application start?", `The application start date shown on this page is ${startDate}.`],
      ["What is the last date to apply?", `The last date shown for this recruitment is ${lastDate}. Candidates should verify the date from the official portal before submitting the form.`],
      ["What is the application fee?", `${job.applicationFee}`],
      ["What is the age limit?", `${job.ageLimit}`],
      ["What is the salary or pay scale?", `${job.salary}`],
      ["What is the selection process?", `${job.selectionProcess}`],
      ["Where can I apply online?", `Use the Apply Online link in the Important Links Table. It points to the official source when the link is available.`],
      ["Where can I find admit card, answer key and result updates?", "Use the Admit Card, Answer Key and Results links in the Important Links Table for related updates on GovJobUpdates."],
      ["Is GovJobUpdates the official recruitment website?", "No. GovJobUpdates is an informational job update platform. Candidates must verify all details from the official notification and official website."]
    ];
    return { questions, html: `<div class="job-faq-list">${questions.map(([q, a], index) => `<details class="job-faq-item"${index === 0 ? " open" : ""}><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</div>` };
  }

  function renderSchemas(job, faqItems) {
    document.querySelectorAll('script[data-job-schema="true"]').forEach((node) => node.remove());
    const pageUrl = window.location.href.split("#")[0];
    const schemas = [];
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}/` },
        { "@type": "ListItem", "position": 2, "name": "Latest Jobs", "item": `${SITE}/HTML/latest-jobs.html` },
        { "@type": "ListItem", "position": 3, "name": job.title, "item": pageUrl }
      ]
    });
    if (job.title && job.organization) {
      const jobPosting = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": stripHtml(generateAbout(job)),
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.organization,
          "sameAs": absoluteUrl(job.officialWebsite) || SITE
        },
        "datePosted": isoDate(job.updatedAt || job.startDate) || isoDate(new Date()),
        "validThrough": isoDate(job.lastDate) ? `${isoDate(job.lastDate)}T23:59:59+05:30` : undefined,
        "employmentType": /contract|consultant/i.test(`${job.title} ${job.category}`) ? "CONTRACTOR" : "FULL_TIME",
        "url": pageUrl,
        "qualifications": job.qualification,
        "industry": job.department
      };
      Object.keys(jobPosting).forEach((key) => jobPosting[key] === undefined && delete jobPosting[key]);
      schemas.push(jobPosting);
    }
    if (faqItems.length >= 10) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      });
    }
    schemas.forEach((schema) => {
      const node = document.createElement("script");
      node.type = "application/ld+json";
      node.dataset.jobSchema = "true";
      node.textContent = JSON.stringify(schema);
      document.head.appendChild(node);
    });
  }

  function renderJob(root, job) {
    const status = getStatus(job);
    updateSeo(job);
    const startDate = formatDate(job.startDate);
    const lastDate = formatDate(job.lastDate);
    const updatedAt = formatDate(job.updatedAt);
    const about = generateAbout(job);
    const documents = defaultDocuments(job);
    const examPattern = inferExamPattern(job);
    const syllabus = inferSyllabus(job);
    const faq = renderFAQ(job, status);
    renderSchemas(job, faq.questions);

    root.innerHTML = `
      <section class="job-detail-hero job-detail-universal-hero">
        <div class="job-detail-hero-copy">
          <span class="job-detail-kicker">${escapeHtml(status)} Recruitment Update</span>
          <h1>${escapeHtml(job.title)}</h1>
          <p class="job-detail-org"><strong>Organization:</strong> ${escapeHtml(job.organization)}</p>
          <div class="job-detail-tags"><span>${escapeHtml(job.category)}</span><span>${escapeHtml(job.year)}</span><span>${escapeHtml(job.totalPosts)} Posts</span></div>
          <div class="job-detail-actions">${linkButton(job.applyLink, "Apply Online", true)}${linkButton(job.officialNotification, "Official Notification", false)}<button class="btn btn-outline copy-link" type="button"><i class="fas fa-link" aria-hidden="true"></i> Copy Link</button></div>
        </div>
        <aside class="job-detail-hero-panel" aria-label="Job quick facts">
          <span>Quick Status</span>
          <strong>${escapeHtml(status)}</strong>
          <p>Check eligibility, dates, vacancy, salary, official links and preparation resources before applying.</p>
        </aside>
      </section>
      <section class="job-detail-stat-grid" aria-label="Important job summary">
        ${statCard("Total Posts", job.totalPosts, "fa-users")}
        ${statCard("Qualification", job.qualification, "fa-graduation-cap")}
        ${statCard("Last Date", lastDate, "fa-calendar-day")}
        ${statCard("Department", job.department, "fa-building")}
      </section>
      <section class="job-alert-box job-detail-trust-note"><span><strong>Important:</strong> GovJobUpdates is not a government website. Always verify eligibility, dates, fees and application instructions from the official source before applying.</span></section>
      <section class="job-detail-dashboard">
        <div class="job-detail-main-stack">
          <article class="job-detail-card" id="about-recruitment">
            <h2><i class="fas fa-circle-info" aria-hidden="true"></i> About This Recruitment</h2>
            <p>${escapeHtml(about)}</p>
          </article>
          <article class="job-detail-card" id="important-dates">
            <h2><i class="fas fa-calendar-alt" aria-hidden="true"></i> Important Dates</h2>
            <div class="job-date-grid">${dateCard("Application Start", startDate)}${dateCard("Last Date", lastDate)}${dateCard("Updated On", updatedAt)}</div>
            <p class="job-meta-note">Dates may change through official corrigendum or portal notice. Always check the official notification before taking action.</p>
          </article>
          <article class="job-detail-card" id="application-fee">
            <h2><i class="fas fa-indian-rupee-sign" aria-hidden="true"></i> Application Fee</h2>
            ${table(["Category", "Fee Details"], `<tr><td>Application Fee</td><td>${escapeHtml(job.applicationFee)}</td></tr>`, "fees-table")}
          </article>
          <article class="job-detail-card" id="vacancy-details">
            <h2><i class="fas fa-users" aria-hidden="true"></i> Vacancy Details</h2>
            ${table(["Post / Recruitment", "Total Posts", "Department"], `<tr><td>${escapeHtml(job.title)}</td><td>${escapeHtml(job.totalPosts)}</td><td>${escapeHtml(job.department)}</td></tr>`, "vacancy-table")}
          </article>
          <article class="job-detail-card" id="eligibility">
            <h2><i class="fas fa-user-check" aria-hidden="true"></i> Eligibility</h2>
            <dl class="job-detail-list">${row("Qualification", job.qualification)}${row("Recruiting Organization", job.organization)}${row("Category", job.category)}</dl>
          </article>
          <article class="job-detail-card" id="age-limit">
            <h2><i class="fas fa-id-card" aria-hidden="true"></i> Age Limit</h2>
            <p>${escapeHtml(job.ageLimit)}</p>
          </article>
          <article class="job-detail-card" id="salary-benefits">
            <h2><i class="fas fa-wallet" aria-hidden="true"></i> Salary &amp; Benefits</h2>
            ${table(["Job Type", "Salary / Pay Details", "Benefits Note"], `<tr><td>${escapeHtml(job.category)}</td><td>${escapeHtml(job.salary)}</td><td>Benefits, allowances, contract terms or service conditions should be treated as applicable only when mentioned in the official notification.</td></tr>`, "salary-table")}
          </article>
          <article class="job-detail-card" id="selection-process">
            <h2><i class="fas fa-list-check" aria-hidden="true"></i> Selection Process</h2>
            <p>${escapeHtml(job.selectionProcess)}</p>
          </article>
          ${examPattern ? `<article class="job-detail-card" id="exam-pattern"><h2><i class="fas fa-table-list" aria-hidden="true"></i> Exam Pattern</h2><p>${escapeHtml(examPattern)}</p></article>` : ""}
          ${syllabus ? `<article class="job-detail-card" id="syllabus-overview"><h2><i class="fas fa-book-open" aria-hidden="true"></i> Syllabus Overview</h2><p>${escapeHtml(syllabus)}</p></article>` : ""}
          <article class="job-detail-card" id="documents-required">
            <h2><i class="fas fa-folder-open" aria-hidden="true"></i> Documents Required</h2>
            <ul class="job-detail-check-list">${documents.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </article>
          <article class="job-detail-card" id="how-to-apply">
            <h2><i class="fas fa-pen-to-square" aria-hidden="true"></i> How To Apply</h2>
            <ol class="job-step-list">
              <li>Open the official apply link or official website from the Important Links Table.</li>
              <li>Read the official notification carefully and confirm eligibility, age limit and fee rules.</li>
              <li>Keep documents, photograph, signature and payment details ready before starting the form.</li>
              <li>Fill the form with correct personal, educational and category details.</li>
              <li>Submit the form before ${escapeHtml(lastDate)} and save the final printout or receipt.</li>
            </ol>
          </article>
          <article class="job-detail-card" id="why-apply">
            <h2><i class="fas fa-briefcase" aria-hidden="true"></i> Why Apply For This Recruitment</h2>
            <p>This recruitment can be useful for candidates who match the required qualification and want to build a career with ${escapeHtml(job.organization)} in the ${escapeHtml(job.department)} domain. It may offer structured selection, role-specific experience and a recognized opportunity within the notified service conditions.</p>
          </article>
          <article class="job-detail-card" id="preparation-resources">
            <h2><i class="fas fa-lightbulb" aria-hidden="true"></i> Preparation Resources</h2>
            <div class="job-resource-grid"><a href="${PATHS.quiz}">Quiz Practice</a><a href="${PATHS.rankPredictor}">Rank Predictor</a><a href="${PATHS.articles}">Student Hub Articles</a><a href="${PATHS.documents}">Document Tools</a></div>
          </article>
          <article class="job-detail-card" id="important-links">
            <h2><i class="fas fa-link" aria-hidden="true"></i> Important Links Table</h2>
            ${table(["Resource", "Link", "Purpose"], [
              linkTableRow("Apply Online", job.applyLink, "", "Open the official application or login portal."),
              linkTableRow("Official Notification", job.officialNotification, "", "Read official eligibility, fee, vacancy and selection rules."),
              linkTableRow("Official Website", job.officialWebsite, job.applyLink, "Verify updates directly from the recruiting authority."),
              linkTableRow("Latest Jobs", PATHS.latestJobs, "", "Browse more current government job updates."),
              linkTableRow("Admit Card", PATHS.admitCard, "", "Check admit card updates when released."),
              linkTableRow("Answer Key", PATHS.answerKey, "", "Check answer key updates after the exam."),
              linkTableRow("Results", PATHS.results, "", "Check result and merit updates."),
              linkTableRow("Rank Predictor", PATHS.rankPredictor, "", "Estimate rank after exam marks are available."),
              linkTableRow("Quiz Practice", PATHS.quiz, "", "Practice topic-wise quizzes for preparation.")
            ].join(""), "important-links-table")}
          </article>
          <article class="job-detail-card job-rank-cta" id="rank-predictor">
            <h2><i class="fas fa-chart-line" aria-hidden="true"></i> Rank Predictor CTA</h2>
            <p>After the exam, use GovJobUpdates Rank Predictor to compare your expected score with category-wise trends and understand where you may stand before official results are announced.</p>
            <a class="btn btn-primary" href="${PATHS.rankPredictor}">Open Rank Predictor</a>
          </article>
          <article class="job-detail-card" id="related-articles">
            <h2><i class="fas fa-newspaper" aria-hidden="true"></i> Related Articles</h2>
            <div class="job-related-links"><a href="${PATHS.articles}">Latest Student Hub Reports</a><a href="${PATHS.latestJobs}">More Government Job Updates</a><a href="${PATHS.quiz}">Practice Quizzes</a><a href="${PATHS.results}">Latest Results</a></div>
          </article>
          <article class="job-detail-card" id="faq">
            <h2><i class="fas fa-question-circle" aria-hidden="true"></i> FAQ Section</h2>
            ${faq.html}
          </article>
          <article class="job-detail-card" id="disclaimer">
            <h2><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Disclaimer</h2>
            <p>GovJobUpdates is an informational platform and is not affiliated with ${escapeHtml(job.organization)} or any government department. Candidates must verify all details from the official notification and official website before applying, paying fees or making career decisions.</p>
            <a class="btn btn-outline" href="${PATHS.disclaimer}">Read Full Disclaimer</a>
          </article>
        </div>
        <aside class="job-detail-side-rail" aria-label="Job summary and useful links">
          <section class="job-detail-side-card">
            <h2>Quick Summary</h2>
            <ul class="job-summary-list">${summaryItem("Status", status)}${summaryItem("Posts", `${job.totalPosts} Posts`)}${summaryItem("Qualification", job.qualification)}${summaryItem("Last Date", lastDate)}</ul>
          </section>
          <section class="job-detail-side-card">
            <h2>Important Links</h2>
            <div class="job-side-actions">${linkButton(job.applyLink, "Apply Online", true)}${linkButton(job.officialNotification, "Official Notification", false)}<a class="btn btn-outline" href="${PATHS.latestJobs}">Latest Jobs</a><a class="btn btn-outline" href="${PATHS.rankPredictor}">Rank Predictor</a></div>
          </section>
          <section class="job-detail-side-card">
            <h2>Tags</h2>
            <div class="job-detail-tags">${renderTags(job.tags)}</div>
          </section>
        </aside>
      </section>`;
    runSharedHelpers();
  }

  async function initDynamicDetail() {
    const root = document.getElementById("jobDetailRoot");
    if (!root) return;
    root.innerHTML = `<section class="job-detail-card"><h2>Loading job details...</h2><p>Please wait while we fetch the latest job data.</p></section>`;
    const id = getRequestedId();
    const jobs = await loadJobs();
    const job = jobs.find((item) => item.id === id);
    if (!job) renderNotFound(root, id);
    else renderJob(root, job);
  }

  async function init() {
    runSharedHelpers();
    await initDynamicDetail();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
