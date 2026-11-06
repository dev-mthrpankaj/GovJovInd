/*
 * Response sheet auto-fill for the rank predictor (reads right/wrong/unattempted per section).
 * Loaded on demand by rank-predictor.js. Exam-site specific code lives in JS/sheet-providers/*.js
 * (one small file per exam provider); the server side parsers are in rank-api/parse-response.php.
 */
(function () {
    "use strict";

    let api = null;
    let getById, getSelectedExam, showMessage, postPhpRankApi, getRankApiEndpoint, readValue;

    function providers() {
        return (window.GovJobSheetProviders || []).filter((p) => p && p.hosts && typeof p.collect === "function");
    }

    function mount(options) {
        api = options;
        ({ getById, getSelectedExam, showMessage, postPhpRankApi, getRankApiEndpoint, readValue } = options);
        mountSheetUi();
    }

    window.GovJobSheetAutofill = { mount };

    function mountSheetUi() {
        const input = getById("answerSheetLink");
        if (!input) return;

        const label = input.closest("label") || input;
        const helper = label.querySelector?.(".field-helper");
        if (helper) helper.textContent = "Optional. Paste your response sheet link and tap Fill. Check the numbers before submitting.";
        const fallbackTitle = document.querySelector(".manual-fallback strong");
        if (fallbackTitle) fallbackTitle.textContent = "Two ways to enter your marks";
        const fallbackNote = document.querySelector(".manual-fallback span");
        if (fallbackNote) fallbackNote.textContent = "Use \"Quick fill\" at the top of this form, or enter attempted, right and wrong answers yourself. Manual entry always works, even after the answer key or response sheet link expires.";

        const wrap = document.createElement("section");
        wrap.className = "form-section-card online-only response-sheet-autofill";
        wrap.setAttribute("aria-label", "Fill from response sheet");
        wrap.style.padding = "16px";
        wrap.style.marginBottom = "16px";
        wrap.innerHTML = `
            <style>
                .response-sheet-autofill .rs-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin: 10px 0; }
                .rank-predictor-page .response-sheet-autofill .btn { width: auto; min-height: 44px; padding: 10px 18px; font-size: 15px; text-decoration: none; cursor: pointer; }
                .response-sheet-autofill .rs-option { margin-top: 16px; font-weight: 800; display: block; }
                .response-sheet-autofill ol { margin: 8px 0 0 20px; padding: 0; line-height: 1.7; }
                .response-sheet-autofill .rs-note { display: block; margin-top: 8px; padding: 10px 12px; border-radius: 8px; background: #eef5ff; color: #0b3d91; font-weight: 700; font-size: 0.9em; }
                @media (max-width: 767px) { .rank-predictor-page .response-sheet-autofill .btn { width: 100%; } }
            </style>
            <strong style="display:block;font-size:1.05em">Quick fill from your response sheet</strong>
            <span class="field-helper" style="display:block;margin:4px 0 10px">Fills your name, roll number, exam date, shift and right / wrong answers. Check the numbers before submitting. You can still enter everything by hand.</span>
            <details class="sheet-bookmarklet" open>
                <summary><strong>Option 1: one click (laptop, recommended)</strong></summary>
                <ol>
                    <li>Drag this button to your bookmarks bar (only once):
                        <div class="rs-actions"><a id="sheetBookmarklet" class="btn btn-primary" href="#" draggable="true">Read sheet</a></div>
                    </li>
                    <li>Open your response sheet (SSC, RRB or any TCS iON exam) in the browser as usual.</li>
                    <li>Click that bookmark. This page opens and everything is filled in automatically.</li>
                </ol>
                <span class="rs-option">On a phone</span>
                <div class="rs-actions"><button class="btn btn-outline" id="copySheetBookmarklet" type="button">Copy code</button></div>
                <span class="field-helper">Open your response sheet, type <strong>javascript:</strong> in the address bar, paste the copied code after it and press Go.</span>
                <span class="rs-note">To track your rank without login, use the dashboard.</span>
            </details>
            <span class="rs-option">Option 2: paste the link</span>
            <div class="sheet-link-slot"></div>
            <div class="rs-actions"><button class="btn btn-outline" id="fillFromSheetBtn" type="button">Fill from response sheet</button></div>
            <label class="rp-field" for="responseSheetFiles" style="margin-top:16px"><strong>Option 3: upload saved pages</strong>
                <input id="responseSheetFiles" type="file" accept=".html,.htm,.txt,text/html,text/plain" multiple>
                <span class="field-helper">Open each PART (A, B, C, D) of the response sheet, save it (Ctrl+S) and select all saved files here.</span>
            </label>
            <div class="form-message hidden" id="responseSheetMessage" role="status" aria-live="polite"></div>`;
        const anchor = document.getElementById("candidateDetailsSection");
        if (anchor) {
            anchor.insertAdjacentElement("beforebegin", wrap);
            wrap.querySelector(".sheet-link-slot")?.appendChild(label);
            label.style.display = "block";
            label.classList.remove("online-only");
        } else {
            label.insertAdjacentElement("afterend", wrap);
        }
        getById("fillFromSheetBtn")?.addEventListener("click", handleFillFromResponseSheet);
        getById("responseSheetFiles")?.addEventListener("change", handleResponseSheetFiles);
        bindSheetBookmarklet();
        listenForBookmarkletSheet();
    }


    // ---- One-click import: a bookmark run on the exam site reads the sheet in the candidate's own browser and sends it here ----
    function sheetBookmarkletCode() {
        const exam = getSelectedExam();
        const examId = exam?.examId || "";
        const target = `${window.location.origin}${window.location.pathname}${examId ? `?exam=${encodeURIComponent(examId)}` : ""}#sheet-import`;
        const table = providers().map((p) => `[new RegExp(${JSON.stringify(p.hosts)},"i"),${p.collect.toString()}]`).join(",");
        const code = `(function(){var T=${JSON.stringify(target)};var P=[${table}];var C=null;` +
            `for(var i=0;i<P.length;i++){if(P[i][0].test(location.hostname)){C=P[i][1];break;}}` +
            `if(!C){alert("Open your exam response sheet page first, then tap this bookmark again.");return;}` +
            `var w=window.open(T,"_blank");if(!w){alert("Please allow pop-ups for this page and try again.");return;}` +
            `var ready=false,data=null;` +
            `var t=setTimeout(function(){if(!ready)alert("Could not reach GovJobUpdates. Please keep that tab open and try again.");},20000);` +
            `function send(){if(ready&&data){clearTimeout(t);w.postMessage({type:"gju-sheet",parts:data},"*");}}` +
            `window.addEventListener("message",function(e){if(e.source===w&&e.data&&e.data.type==="gju-sheet-ready"){ready=true;send();}});` +
            `C().then(function(d){data=d;send();}).catch(function(){clearTimeout(t);alert("Could not read this page. Please save the pages and upload them instead.");});})();`;
        return code.replace(/\s*\n\s*/g, " ");
    }

    function isAllowedSheetOrigin(origin) {
        let host = "";
        try {
            const url = new URL(origin);
            if (url.protocol !== "https:") return false;
            host = url.hostname;
        } catch (error) {
            return false;
        }
        return providers().some((p) => new RegExp(p.hosts, "i").test(host));
    }

    function bindSheetBookmarklet() {
        const link = getById("sheetBookmarklet");
        const refresh = () => {
            if (!link) return;
            const examName = String(getSelectedExam()?.examName || "").trim();
            link.textContent = examName ? `Read sheet: ${examName}` : "Read response sheet";
            link.setAttribute("title", link.textContent);
            link.setAttribute("href", "javascript:" + sheetBookmarkletCode());
        };
        if (link) {
            ["pointerenter", "pointerdown", "dragstart", "focus", "touchstart"].forEach((name) => link.addEventListener(name, refresh, { passive: true }));
            link.addEventListener("click", (event) => {
                event.preventDefault();
                showMessage("responseSheetMessage", "Drag this button to your bookmarks bar, then click it while your response sheet is open.", "info");
            });
            refresh();
        }
        getById("copySheetBookmarklet")?.addEventListener("click", async () => {
            const code = sheetBookmarkletCode();
            try {
                await navigator.clipboard.writeText(code);
                showMessage("responseSheetMessage", "Code copied. Open your response sheet, type javascript: in the address bar, paste the code after it and press Go.", "success");
            } catch (error) {
                window.prompt("Copy this code:", code);
            }
        });
    }

    function listenForBookmarkletSheet() {
        if (window.location.hash !== "#sheet-import" || !window.opener) return;
        window.addEventListener("message", (event) => {
            if (event.source !== window.opener || !isAllowedSheetOrigin(event.origin)) return;
            const data = event.data;
            if (!data || data.type !== "gju-sheet" || !Array.isArray(data.parts)) return;
            const parts = data.parts.filter((part) => typeof part === "string" && part.length > 0 && part.length < 3 * 1024 * 1024).slice(0, 8);
            if (!parts.length) return showMessage("responseSheetMessage", "No response sheet pages were received. Please try again or upload the saved pages.", "error");
            runResponseSheetParse({ responseSheetHtmlParts: parts }, `Reading ${parts.length} page${parts.length > 1 ? "s" : ""} from your response sheet.`);
        });
        showMessage("responseSheetMessage", "Waiting for your response sheet...", "info");
        try { window.opener.postMessage({ type: "gju-sheet-ready" }, "*"); } catch (error) { /* opener closed */ }
    }

    function handleFillFromResponseSheet() {
        const exam = getSelectedExam();
        const url = readValue("answerSheetLink");
        if (!exam) return showMessage("responseSheetMessage", "Please select an exam first.", "error");
        if (!/^https?:\/\/\S+$/i.test(url)) return showMessage("responseSheetMessage", "Paste a valid response sheet link first.", "error");
        return runResponseSheetParse({ answerSheetLink: url }, "Reading your response sheet. SSC sheets have several parts, so this can take up to a minute.");
    }

    async function handleResponseSheetFiles(event) {
        const input = event.target;
        const files = Array.from(input.files || []).slice(0, 8);
        if (!files.length) return;
        if (files.some((file) => file.size > 3 * 1024 * 1024)) {
            input.value = "";
            return showMessage("responseSheetMessage", "Each saved page must be smaller than 3 MB.", "error");
        }
        try {
            const parts = await Promise.all(files.map((file) => file.text()));
            await runResponseSheetParse({ responseSheetHtmlParts: parts }, `Reading ${files.length} saved page${files.length > 1 ? "s" : ""}.`);
        } catch (error) {
            showMessage("responseSheetMessage", "Could not read the selected files. Please save the pages again or enter marks manually.", "error");
        } finally {
            input.value = "";
        }
    }

    async function runResponseSheetParse(payload, progressText) {
        const button = getById("fillFromSheetBtn");
        const exam = getSelectedExam();
        const endpoint = getRankApiEndpoint("parseResponse");
        if (!exam) return showMessage("responseSheetMessage", "Please select an exam first.", "error");
        if (!endpoint) return showMessage("responseSheetMessage", api.invalidUrlMessage, "error");

        if (button) button.disabled = true;
        showMessage("responseSheetMessage", progressText, "info");
        try {
            const result = await postPhpRankApi(endpoint, Object.assign({
                examId: exam.examId || exam.id || "",
                examName: exam.examName || exam.name || ""
            }, payload));
            if (!result || result.success !== true || !result.data) {
                throw new Error(result?.message || "Could not read this response sheet. Please enter marks manually.");
            }
            const { filled, notes } = applyParsedResponseSheet(exam, result.data);
            if (!filled.length) {
                throw new Error(notes[0] || "Could not match this sheet to the exam sections. Please enter marks manually.");
            }
            const warnings = [...notes, ...(Array.isArray(result.data.warnings) ? result.data.warnings : [])];
            const text = `Filled: ${filled.join("; ")}.${warnings.length ? " Note: " + warnings.join(" ") : ""} Please verify before submitting.`;
            showMessage("responseSheetMessage", text, warnings.length ? "warning" : "success");
        } catch (error) {
            let message = error?.message || "Could not read this response sheet. Please enter marks manually.";
            if (/Upstream status: (401|403|429)/.test(message)) {
                message = "The exam website did not allow us to open this link automatically. Please upload your saved response sheet pages below, or enter marks manually.";
            }
            showMessage("responseSheetMessage", message, "error");
        } finally {
            if (button) button.disabled = false;
        }
    }

    function sheetSubjectText(name) {
        return String(name || "").toLowerCase()
            .replace(/^\s*(part|section)[\s\-_]*[a-z0-9]+\b/, "")
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }

    // Loose key used only when the exact name does not match: groups common subject words together.
    function sheetSubjectKey(name) {
        const text = sheetSubjectText(name);
        const tokens = text.split(/\s+/).filter(Boolean);
        const groups = [
            ["reasoning", "intelligence", "logical"],
            ["awareness", "gk", "knowledge"],
            ["quantitative", "quant", "math", "aptitude", "numerical"],
            ["english", "comprehension", "language"]
        ];
        const group = groups.findIndex((words) => words.some((word) => tokens.some((token) => token.startsWith(word))));
        return group >= 0 ? `g:${group}` : `t:${text}`;
    }

    function mapSheetSections(sections, examSubjects) {
        const used = new Set();
        const mapping = sections.map(() => -1);
        const pass = (keyOf) => {
            sections.forEach((section, index) => {
                if (mapping[index] >= 0) return;
                const key = keyOf(section.name);
                if (!key) return;
                const match = examSubjects.findIndex((subject, subjectIndex) => !used.has(subjectIndex) && keyOf(subject.name) === key);
                if (match >= 0) {
                    mapping[index] = match;
                    used.add(match);
                }
            });
        };
        pass(sheetSubjectText); // 1. the exam subject is named exactly like the section in the sheet
        pass(sheetSubjectKey);  // 2. otherwise match by common subject words (reasoning, awareness, ...)
        // Nothing matched by name: fall back to sheet order only when the counts line up exactly.
        if (mapping.every((value) => value < 0) && sections.length === examSubjects.length) {
            sections.forEach((_, index) => { mapping[index] = index; });
        }
        return mapping;
    }

    function setSheetInputValue(input, value) {
        if (!input) return;
        input.value = String(value);
        input.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function applyParsedResponseSheet(exam, parsed) {
        const filled = [];
        const notes = [];
        const sections = Array.isArray(parsed.subjects) ? parsed.subjects : [];
        const examSubjects = Array.isArray(exam.subjects) ? exam.subjects : [];

        if (examSubjects.length && api.getSubjectControls().length) {
            const mapping = mapSheetSections(sections, examSubjects);
            const covered = new Set();
            sections.forEach((section, index) => {
                const subjectIndex = mapping[index];
                const control = api.getSubjectControls()[subjectIndex];
                if (subjectIndex < 0 || !control) {
                    notes.push(`${section.name} could not be matched to a subject, enter it manually.`);
                    return;
                }
                const subject = examSubjects[subjectIndex];
                const expected = Number(subject.questions) || 0;
                if (expected && Number(section.totalQuestions) !== expected) {
                    notes.push(`${section.name} has ${section.totalQuestions} questions but ${subject.name} expects ${expected}.`);
                }
                setSheetInputValue(control.correct, Number(section.correct) || 0);
                setSheetInputValue(control.wrong, Number(section.wrong) || 0);
                covered.add(subjectIndex);
                filled.push(`${subject.name} ${section.correct} right, ${section.wrong} wrong`);
            });
            const missing = examSubjects.filter((_, index) => !covered.has(index)).map((subject) => subject.name);
            if (filled.length && missing.length) notes.push(`Not filled: ${missing.join(", ")}.`);
        } else if (parsed.totals && Number(parsed.totals.totalQuestions) > 0) {
            const right = Number(parsed.totals.correct) || 0;
            const wrong = Number(parsed.totals.wrong) || 0;
            setSheetInputValue(getById("totalAttempted"), right + wrong);
            setSheetInputValue(getById("rightAnswers"), right);
            setSheetInputValue(getById("wrongAnswers"), wrong);
            filled.push(`${right} right, ${wrong} wrong`);
        }

        if (Number(parsed.totals?.bonus) > 0) {
            notes.push(`${parsed.totals.bonus} bonus or dropped question(s) were not counted as right or wrong.`);
        }

        // Candidate details: only fill empty fields, never overwrite what the user typed.
        const candidate = parsed.candidate || {};
        [["candidateName", candidate.name], ["rollNumber", candidate.rollNumber], ["shift", candidate.shift], ["examDate", sheetDateToIso(candidate.examDate)]].forEach(([id, value]) => {
            const field = getById(id);
            if (field && value && !String(field.value || "").trim()) setSheetInputValue(field, value);
        });
        if (candidate.shiftGuessed && candidate.shift) notes.push("Shift was guessed from the exam time, please check it.");
        if (candidate.subject && exam.examName && !sheetMatchesExam(candidate.subject, exam.examName)) {
            notes.push(`This sheet is for "${candidate.subject}", but this page is for ${exam.examName}. Please make sure you are on the right exam page.`);
        }
        return { filled, notes };
    }

    // True when the exam named on the sheet ("Combined Graduate Level Examination, 2026") plausibly is the page's exam ("SSC CGL 2026").
    function sheetMatchesExam(sheetExam, pageExam) {
        const page = String(pageExam).toUpperCase().replace(/[^A-Z0-9]+/g, "");
        const stop = new Set(["EXAMINATION", "EXAM", "TEST", "OF", "AND", "THE", "FOR", "IN", "SSC", "RRB"]);
        const words = String(sheetExam).toUpperCase().replace(/[^A-Z0-9 ]+/g, " ").split(/\s+/).filter((w) => w && !/^\d+$/.test(w) && !stop.has(w));
        if (words.length < 2) return true;
        const acronym = words.map((w) => w[0]).join("");
        if (page.includes(acronym)) return true;
        return words.some((w) => w.length >= 4 && page.includes(w));
    }

    function sheetDateToIso(text) {
        const value = String(text || "").trim();
        if (!value) return "";
        const months = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
        let day, month, year, m;
        if ((m = value.match(/^(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})/))) { year = +m[1]; month = +m[2]; day = +m[3]; }
        else if ((m = value.match(/^(\d{1,2})[\/.\s-]+(\d{1,2})[\/.\s-]+(\d{4})/))) { day = +m[1]; month = +m[2]; year = +m[3]; }
        else if ((m = value.match(/^(\d{1,2})[\/.\s-]*([A-Za-z]{3})[a-z]*[\/.,\s-]*(\d{4})/))) { day = +m[1]; month = months[m[2].toLowerCase()]; year = +m[3]; }
        if (!day || !month || !year || month > 12 || day > 31) return "";
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
}());