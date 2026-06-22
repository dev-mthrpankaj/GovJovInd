(function () {
    "use strict";

    const MOBILE_QUERY = "(max-width: 767px)";
    const ACCORDION_SELECTOR = ".form-accordion";
    const SUMMARY_SELECTOR = ".form-accordion > summary";

    function isMobileLayout() {
        return Boolean(window.matchMedia?.(MOBILE_QUERY)?.matches || window.innerWidth <= 767);
    }

    function getHeaderOffset() {
        const header = document.querySelector("header");
        const height = header ? Math.ceil(header.getBoundingClientRect().height) : 72;
        return Math.max(height + 14, 86);
    }

    function safeScrollToSection(section) {
        if (!section) return;
        window.requestAnimationFrame(() => {
            const targetTop = Math.max(0, window.scrollY + section.getBoundingClientRect().top - getHeaderOffset());
            window.scrollTo({ top: targetTop, behavior: "smooth" });
        });
    }

    function setStepperActive(sectionId) {
        document.querySelectorAll(".form-stepper [data-step-for]").forEach((item) => {
            const active = item.getAttribute("data-step-for") === sectionId;
            item.classList.toggle("is-active", active);
            if (active) item.setAttribute("aria-current", "step");
            else item.removeAttribute("aria-current");
        });
    }

    function setDetailsOpenSilently(section, open) {
        if (!section || section.tagName !== "DETAILS") return;
        section.dataset.applyingDefault = "true";
        section.open = Boolean(open);
        window.setTimeout(() => {
            delete section.dataset.applyingDefault;
        }, 0);
    }

    function openAccordion(section) {
        if (!section || section.tagName !== "DETAILS") return;
        if (section.hasAttribute("data-static-section")) {
            setDetailsOpenSilently(section, true);
            return;
        }
        const willOpen = !section.open;

        if (isMobileLayout() && willOpen) {
            document.querySelectorAll(ACCORDION_SELECTOR).forEach((other) => {
                if (other !== section) setDetailsOpenSilently(other, false);
            });
        }

        section.open = willOpen;
        section.dataset.userToggled = "true";

        if (willOpen) {
            setStepperActive(section.id);
            safeScrollToSection(section);
        }
    }

    function setTextIfEmpty(elementId, fallbackText) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const current = (element.textContent || "").trim();
        if (!current || current === "--" || current.toLowerCase() === "loading") {
            element.textContent = fallbackText;
        }
    }

    function addRankPredictorSeoSupport() {
        const app = document.getElementById("rankPredictorApp");
        if (!app || document.getElementById("rankPredictorSeoSupport")) return;

        const faqSection = document.getElementById("rankFaqTitle")?.closest("section");
        const section = document.createElement("section");
        section.className = "page-guide";
        section.id = "rankPredictorSeoSupport";
        section.setAttribute("aria-labelledby", "rankPredictorSeoSupportTitle");
        section.innerHTML = `
            <p class="guide-kicker">Rank Predictor Guide</p>
            <h2 id="rankPredictorSeoSupportTitle">Use one rank predictor for SSC, UPSC, UPSSSC, Railway, Police and state exams</h2>
            <p>GovJobUpdates Rank Predictor is an all-in-one exam rank estimation tool. Candidates can select the exam, submit expected marks or subject-wise attempts, and check estimated overall rank, category rank, state or district rank where that data is available.</p>
            <div class="guide-grid">
                <article class="guide-card"><h3>After answer key release</h3><p>Use the official answer key or response sheet to calculate right and wrong answers, then submit the same data in the rank predictor for an expected rank estimate.</p></article>
                <article class="guide-card"><h3>Supported exam types</h3><p>The page is designed for SSC, UPSC, UPSSSC, Railway, Police, OMR, CBT and state-level recruitment exams. Exam-specific rules load from the selected setup.</p></article>
                <article class="guide-card"><h3>Accuracy depends on data</h3><p>The estimate improves when more genuine candidates submit data for the same exam, category, state, district or shift. Final official results can still differ.</p></article>
            </div>
            <nav class="related-links" aria-label="Rank predictor internal links">
                <h3>Use Rank Predictor with these pages</h3>
                <a href="answer-key.html">Check Answer Keys</a>
                <a href="results.html">Check Official Results</a>
                <a href="quiz.html">Practice Free Quiz</a>
                <a href="latest-jobs.html">Latest Government Jobs</a>
                <a href="student-hub.html">Student Hub Guidance</a>
            </nav>
            <p class="official-note"><strong>Important:</strong> This is an estimate only. Official marks, cutoff, normalization, merit list and selection status are published by the concerned exam authority.</p>`;

        if (faqSection) {
            faqSection.parentNode.insertBefore(section, faqSection);
        } else {
            app.appendChild(section);
        }
    }

    function applyRankPredictorSafeEnhancements() {
        setTextIfEmpty("activeExamLabel", "Select an exam");
        setTextIfEmpty("activeModeLabel", "OMR / CBT supported");
        setTextIfEmpty("normalizationLabel", "Exam-wise setting");
        addRankPredictorSeoSupport();
    }

    document.addEventListener("click", (event) => {
        const summary = event.target?.closest?.(SUMMARY_SELECTOR);
        if (!summary) return;
        const section = summary.parentElement;
        if (!section || !document.getElementById("rankPredictorApp")?.contains(section)) return;

        if (section.hasAttribute("data-static-section")) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            setDetailsOpenSilently(section, true);
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openAccordion(section);
    }, true);

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const summary = event.target?.closest?.(SUMMARY_SELECTOR);
        if (!summary) return;
        const section = summary.parentElement;
        if (!section || !document.getElementById("rankPredictorApp")?.contains(section)) return;

        if (section.hasAttribute("data-static-section")) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            setDetailsOpenSilently(section, true);
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openAccordion(section);
    }, true);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyRankPredictorSafeEnhancements, { once: true });
    } else {
        applyRankPredictorSafeEnhancements();
    }

    window.setTimeout(applyRankPredictorSafeEnhancements, 1200);
}());