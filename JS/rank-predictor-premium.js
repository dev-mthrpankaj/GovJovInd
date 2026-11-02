/* ==========================================================================
   GovJobUpdates - Rank Predictor PREMIUM FORM ENHANCER
   Load AFTER rank-predictor.js. 100% additive:
   - never replaces/removes existing handlers or elements
   - never changes the value a student typed (except: pasted mobile number
     is cleaned to 10 digits, then the normal "input" event is fired)
   - never touches ad slots (.gjd-ad / .rank-ad-layout)
   - every feature is wrapped in try/catch, so a failure here can not break
     the original predictor.
   ========================================================================== */
(function () {
    "use strict";

    var app = null;
    var forms = [];
    var mo = null;
    var raf = 0;
    var seenErrors = 0;
    var seenMessages = {};

    function $(sel, root) { return (root || document).querySelector(sel); }
    function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function byId(id) { return document.getElementById(id); }
    function safe(fn) { try { return fn(); } catch (e) { return undefined; } }
    function visible(el) { return !!(el && el.getClientRects && el.getClientRects().length); }
    function setClass(el, name, on) {
        if (!el) return;
        if (el.classList.contains(name) !== !!on) el.classList.toggle(name, !!on);
    }
    function val(id) { var el = byId(id); return el ? String(el.value || "").trim() : ""; }

    /* ---------------------------------------------------------------- *
     * Field validity rules (only for the soft green tick, never blocks)
     * ---------------------------------------------------------------- */
    function todayStr() {
        var d = new Date();
        var m = String(d.getMonth() + 1).padStart(2, "0");
        var day = String(d.getDate()).padStart(2, "0");
        return d.getFullYear() + "-" + m + "-" + day;
    }

    function isDobOk(v) {
        if (!v) return false;
        var t = Date.parse(v);
        if (!isFinite(t)) return false;
        var y = new Date(t).getFullYear();
        return y >= 1950 && v <= todayStr();
    }

    function isFieldOk(el) {
        if (!el) return false;
        var v = String(el.value || "").trim();
        switch (el.id) {
            case "candidateName": return v.length >= 2;
            case "rollNumber":
            case "checkRollNumber": return v.length >= 2;
            case "mobileNumber":
            case "checkMobileNumber": return /^\d{10}$/.test(v);
            case "dob":
            case "checkDob": return isDobOk(v);
            default: return v.length > 0;
        }
    }

    /* ---------------------------------------------------------------- *
     * Progress model per form
     * ---------------------------------------------------------------- */
    function hasOptions(containerId) {
        var c = byId(containerId);
        return !!(c && c.children.length);
    }

    function selectHasChoices(id) {
        var s = byId(id);
        if (!s) return false;
        return $$("option", s).some(function (o) { return o.value; });
    }

    function attemptsDone() {
        var section = byId("subjectScorecardDetails");
        if (section && !section.hidden && visible(section)) {
            var n = parseInt((byId("summaryAttempted") || {}).textContent, 10);
            return isFinite(n) && n > 0;
        }
        var t = parseInt(val("totalAttempted"), 10);
        return isFinite(t) && t > 0;
    }

    function submitItems() {
        var items = [
            { id: "candidateName", ok: isFieldOk(byId("candidateName")) },
            { id: "rollNumber", ok: isFieldOk(byId("rollNumber")) },
            { id: "mobileNumber", ok: isFieldOk(byId("mobileNumber")) },
            { id: "dob", ok: isFieldOk(byId("dob")) },
            { id: "gender", ok: !!val("gender") }
        ];
        if (hasOptions("categoryOptions")) items.push({ id: "category", ok: !!val("category") });
        if (hasOptions("horizontalCategoryOptions")) items.push({ id: "horizontalCategory", ok: !!val("horizontalCategory") });
        if (selectHasChoices("state")) items.push({ id: "state", ok: !!val("state") });
        items.push({ id: "examDate", ok: !!val("examDate") });
        var shift = byId("shift");
        if (shift && visible(shift)) items.push({ id: "shift", ok: !!val("shift") });
        items.push({ id: "attempts", ok: attemptsDone() });
        var consent = byId("dataConsent");
        items.push({ id: "dataConsent", ok: !!(consent && consent.checked) });
        return items;
    }

    function checkItems() {
        return [
            { id: "checkRollNumber", ok: isFieldOk(byId("checkRollNumber")) },
            { id: "checkMobileNumber", ok: isFieldOk(byId("checkMobileNumber")) },
            { id: "checkDob", ok: isFieldOk(byId("checkDob")) }
        ];
    }

    function sectionDone(sectionId) {
        var map = {
            candidateDetailsSection: ["candidateName", "rollNumber", "mobileNumber", "dob", "gender", "category", "horizontalCategory", "state"],
            examDetailsSection: ["examDate", "shift"]
        };
        var ids = map[sectionId];
        if (!ids) return false;
        var list = submitItems();
        var relevant = list.filter(function (i) { return ids.indexOf(i.id) !== -1; });
        return relevant.length > 0 && relevant.every(function (i) { return i.ok; });
    }

    /* ---------------------------------------------------------------- *
     * Progress bar UI (inserted once per form)
     * ---------------------------------------------------------------- */
    function ensureProgress(form) {
        if (!form || $(".rpp-progress", form)) return;
        var wrap = document.createElement("div");
        wrap.className = "rpp-progress";
        wrap.innerHTML =
            '<div class="rpp-progress-top"><span class="rpp-progress-label">Form progress</span><span class="rpp-progress-pct">0%</span></div>' +
            '<div class="rpp-progress-track" role="progressbar" aria-label="Form completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="rpp-progress-bar"></span></div>';
        var heading = $(".form-heading", form);
        if (heading && heading.parentNode === form) heading.insertAdjacentElement("afterend", wrap);
        else form.insertBefore(wrap, form.firstChild);
    }

    function paintProgress(form, items) {
        var box = $(".rpp-progress", form);
        if (!box || !items.length) return;
        var done = items.filter(function (i) { return i.ok; }).length;
        var pct = Math.round((done / items.length) * 100);
        var label = $(".rpp-progress-label", box);
        var pctEl = $(".rpp-progress-pct", box);
        var bar = $(".rpp-progress-bar", box);
        var track = $(".rpp-progress-track", box);
        var text = pct === 100 ? "All set - ready to go" : done + " of " + items.length + " completed";
        if (label && label.textContent !== text) label.textContent = text;
        if (pctEl && pctEl.textContent !== pct + "%") pctEl.textContent = pct + "%";
        if (bar) bar.style.width = pct + "%";
        if (track) track.setAttribute("aria-valuenow", String(pct));
        setClass(box, "is-complete", pct === 100);
    }

    /* ---------------------------------------------------------------- *
     * Visual states: ticks, section done, filled subject cards
     * ---------------------------------------------------------------- */
    function paintFieldStates() {
        $$(".rp-field", app).forEach(function (wrap) {
            var input = $("input:not([type=hidden]):not([readonly]):not([type=checkbox]), select", wrap);
            if (!input || !input.dataset.rppTouched) { setClass(wrap, "is-valid", false); return; }
            var ok = isFieldOk(input) && !wrap.classList.contains("has-error");
            setClass(wrap, "is-valid", ok);
        });
    }

    function paintSections() {
        ["candidateDetailsSection", "examDetailsSection"].forEach(function (id) {
            var el = byId(id);
            if (el) setClass(el, "is-section-done", sectionDone(id));
        });
        var subj = byId("subjectScorecardDetails");
        if (subj && !subj.hidden) setClass(subj, "is-section-done", attemptsDone());
    }

    function paintSubjectCards() {
        $$(".subject-card", app).forEach(function (card) {
            var total = $("[data-subject-summary='attempted']", card);
            var n = total ? parseInt(String(total.textContent).split("/")[0], 10) : 0;
            setClass(card, "is-filled", isFinite(n) && n > 0);
        });
    }

    function bumpNumbers() {
        ["summaryAttempted", "summaryCorrect", "summaryWrong", "summaryExpectedMarks"].forEach(function (id) {
            var el = byId(id);
            if (!el) return;
            var now = el.textContent;
            if (el.dataset.rppLast !== undefined && el.dataset.rppLast !== now) {
                el.classList.remove("rpp-bump");
                void el.offsetWidth; // restart animation
                el.classList.add("rpp-bump");
            }
            el.dataset.rppLast = now;
        });
    }

    /* Backend answers (duplicate / network / not found) must never be hidden
       below the sticky bar: bring them into view. Validation errors keep the
       original behaviour (focus on the first bad field). */
    function surfaceMessages() {
        $$(".form-message", app).forEach(function (box) {
            if (box.classList.contains("hidden")) { delete seenMessages[box.id]; return; }
            var text = box.textContent || "";
            if (!text || seenMessages[box.id] === text) return;
            seenMessages[box.id] = text;
            var form = box.closest("form");
            if (form && $(".has-error, [aria-invalid='true']", form)) return;
            if (!/\b(error|warning|success)\b/.test(box.className)) return;
            var r = box.getBoundingClientRect();
            var vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            if (r.top < 80 || r.bottom > vh - 120) {
                safe(function () { box.scrollIntoView({ behavior: "smooth", block: "center" }); });
            }
        });
    }

    function hapticOnNewErrors() {
        var n = $$(".has-error", app).length;
        if (n > seenErrors && navigator.vibrate) safe(function () { navigator.vibrate(18); });
        seenErrors = n;
    }

    function update() {
        raf = 0;
        safe(function () {
            var submit = byId("rankSubmitForm");
            var check = byId("rankCheckForm");
            if (submit) paintProgress(submit, submitItems());
            if (check) paintProgress(check, checkItems());
            paintFieldStates();
            paintSections();
            paintSubjectCards();
            bumpNumbers();
            surfaceMessages();
            hapticOnNewErrors();
        });
        // discard mutations caused by our own class toggles
        if (mo) safe(function () { mo.takeRecords(); });
    }

    function schedule() {
        if (raf) return;
        raf = window.requestAnimationFrame(update);
    }

    /* ---------------------------------------------------------------- *
     * Input comfort
     * ---------------------------------------------------------------- */
    function enhanceAttributes() {
        var today = todayStr();
        ["dob", "checkDob"].forEach(function (id) {
            var el = byId(id);
            if (el && !el.getAttribute("max")) el.setAttribute("max", today);
        });
        var name = byId("candidateName");
        if (name) { name.setAttribute("autocapitalize", "words"); name.setAttribute("spellcheck", "false"); }
        ["rollNumber", "checkRollNumber"].forEach(function (id) {
            var el = byId(id);
            if (!el) return;
            el.setAttribute("autocorrect", "off");
            el.setAttribute("spellcheck", "false");
            el.setAttribute("autocapitalize", "characters");
        });
        ["mobileNumber", "checkMobileNumber"].forEach(function (id) {
            var el = byId(id);
            if (el) el.setAttribute("autocomplete", "tel-national");
        });
    }

    function focusables(form) {
        var all = $$("input, select, .choice-chip-row", form);
        return all.filter(function (el) {
            if (el.classList.contains("choice-chip-row")) return visible(el);
            if (el.tagName === "INPUT" && ["hidden", "checkbox", "radio", "button", "submit", "reset"].indexOf(el.type) !== -1) return false;
            if (el.readOnly || el.disabled) return false;
            return visible(el);
        });
    }

    function onKeydown(e) {
        if (e.key !== "Enter" || e.isComposing || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
        var t = e.target;
        if (!t || t.tagName !== "INPUT") return;
        if (["checkbox", "radio", "button", "submit", "reset"].indexOf(t.type) !== -1) return;
        var form = t.closest("form");
        if (!form) return;
        var list = focusables(form);
        var idx = list.indexOf(t);
        if (idx === -1 || idx === list.length - 1) return; // last field: normal submit
        var next = list[idx + 1];
        if (next.classList && next.classList.contains("choice-chip-row")) {
            next = $(".category-chip.is-selected, .category-chip", next);
        }
        if (!next || !next.focus) return;
        e.preventDefault();
        next.focus();
    }

    function onFocusIn(e) {
        var t = e.target;
        if (!t || t.tagName !== "INPUT") return;
        if (["totalAttempted", "rightAnswers", "wrongAnswers", "shift"].indexOf(t.id) !== -1 && t.value) {
            window.setTimeout(function () { safe(function () { t.select(); }); }, 0);
        }
    }

    function onPaste(e) {
        var t = e.target;
        if (!t || !t.id || (t.id !== "mobileNumber" && t.id !== "checkMobileNumber")) return;
        var cd = e.clipboardData || window.clipboardData;
        if (!cd) return;
        var digits = String(cd.getData("text") || "").replace(/\D/g, "");
        if (!digits) return;
        if (digits.length > 10) digits = digits.slice(-10); // drops +91 / 0 prefix
        e.preventDefault();
        t.value = digits;
        t.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function markTouched(e) {
        var t = e.target;
        if (!t || !t.closest || !t.closest(".rp-field")) return;
        if (e.type === "blur" || e.type === "focusout" || e.type === "change") t.dataset.rppTouched = "1";
        // mobile: show the tick the moment the 10th digit lands
        if (e.type === "input" && /^(check)?mobileNumber$/.test(t.id) && /^\d{10}$/.test(String(t.value))) t.dataset.rppTouched = "1";
    }

    /* ---------------------------------------------------------------- *
     * Boot
     * ---------------------------------------------------------------- */
    function init() {
        app = byId("rankPredictorApp") || $("main.rank-predictor-page");
        if (!app) return;
        forms = ["rankSubmitForm", "rankCheckForm"].map(byId).filter(Boolean);
        if (!forms.length) return;

        safe(enhanceAttributes);
        forms.forEach(function (f) { safe(function () { ensureProgress(f); }); });

        app.addEventListener("input", function (e) { markTouched(e); schedule(); }, true);
        app.addEventListener("change", function (e) { markTouched(e); schedule(); }, true);
        app.addEventListener("focusout", function (e) { markTouched(e); schedule(); }, true);
        app.addEventListener("click", function () { window.setTimeout(schedule, 60); }, true);
        app.addEventListener("keydown", onKeydown);
        app.addEventListener("focusin", onFocusIn);
        document.addEventListener("paste", onPaste, true);

        if ("MutationObserver" in window) {
            mo = new MutationObserver(schedule);
            mo.observe(app, {
                subtree: true,
                childList: true,
                characterData: true,
                attributes: true,
                attributeFilter: ["class", "hidden", "open"]
            });
        }
        window.addEventListener("pageshow", schedule);
        schedule();
        // late async exam config / subject render
        window.setTimeout(schedule, 400);
        window.setTimeout(schedule, 1500);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
