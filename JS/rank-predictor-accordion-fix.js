(function () {
    "use strict";

    const MOBILE_QUERY = "(max-width: 767px)";

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
        const normalized = sectionId === "subjectScorecardDetails" ? "attemptDetailsSection" : sectionId;
        document.querySelectorAll(".form-stepper [data-step-for]").forEach((item) => {
            const stepFor = item.getAttribute("data-step-for");
            const itemTarget = stepFor === "subjectScorecardDetails" ? "attemptDetailsSection" : stepFor;
            const active = itemTarget === normalized;
            item.classList.toggle("is-active", active);
            if (active) item.setAttribute("aria-current", "step");
            else item.removeAttribute("aria-current");
        });
    }

    function openAccordion(section) {
        if (!section || section.tagName !== "DETAILS") return;
        const willOpen = !section.open;

        if (isMobileLayout() && willOpen) {
            document.querySelectorAll(".form-accordion").forEach((other) => {
                if (other !== section) other.open = false;
            });
        }

        section.open = willOpen;
        section.dataset.userToggled = "true";

        if (willOpen) {
            setStepperActive(section.id);
            safeScrollToSection(section);
        }
    }

    document.addEventListener("click", (event) => {
        const summary = event.target?.closest?.(".form-accordion > summary");
        if (!summary) return;
        const section = summary.parentElement;
        if (!section || !document.getElementById("rankPredictorApp")?.contains(section)) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openAccordion(section);
    }, true);

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const summary = event.target?.closest?.(".form-accordion > summary");
        if (!summary) return;
        const section = summary.parentElement;
        if (!section || !document.getElementById("rankPredictorApp")?.contains(section)) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openAccordion(section);
    }, true);
}());
