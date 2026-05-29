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
}());
