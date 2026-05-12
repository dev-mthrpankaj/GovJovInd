(function () {
  "use strict";

  const CONTACT_EMAIL = "dmagstudio2023@outlook.com";
  const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
  const allowedPages = new Set([
    "index.html",
    "latest-jobs.html",
    "admitcard.html",
    "answer-key.html",
    "results.html",
    "quiz.html",
    "documents.html",
    "about-us.html"
  ]);
  const blockedPages = new Set(["rank-predictor.html"]);

  const pageName = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (blockedPages.has(pageName) || !allowedPages.has(pageName)) return;
  if (document.getElementById("gjuContactWidget")) return;

  function isQuizExamMode() {
    return document.body.classList.contains("gju-quiz-exam-mode") ||
      Boolean(document.getElementById("examView") && !document.getElementById("examView").classList.contains("hidden"));
  }

  function injectStyle() {
    if (document.getElementById("gjuContactWidgetStyle")) return;
    const style = document.createElement("style");
    style.id = "gjuContactWidgetStyle";
    style.textContent = `
      .gju-contact-widget{position:fixed;right:18px;bottom:92px;z-index:9998;font-family:inherit}.gju-contact-widget.is-hidden{display:none!important}.gju-contact-fab{display:inline-flex;align-items:center;gap:9px;min-height:46px;padding:0 15px;border:0;border-radius:999px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-weight:900;box-shadow:0 14px 32px rgba(37,99,235,.32);cursor:pointer;transition:transform .18s ease,box-shadow .18s ease}.gju-contact-fab:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(37,99,235,.42)}.gju-contact-fab i{font-size:16px}.gju-contact-panel{position:fixed;inset:0;display:none;place-items:center;padding:18px;background:rgba(15,23,42,.56);backdrop-filter:blur(8px);z-index:100000}.gju-contact-panel.is-open{display:grid}.gju-contact-card{width:min(100%,440px);background:#fff;border:1px solid #dbe5f4;border-radius:22px;box-shadow:0 26px 80px rgba(15,23,42,.28);overflow:hidden;color:#0f172a}.gju-contact-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:18px 18px 12px;background:linear-gradient(135deg,#eff6ff,#fff)}.gju-contact-kicker{display:inline-flex;padding:5px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.gju-contact-head h2{margin:8px 0 4px;font-size:1.35rem;line-height:1.15}.gju-contact-head p{margin:0;color:#64748b;font-size:.92rem}.gju-contact-close{flex:0 0 auto;width:38px;height:38px;border:1px solid #dbe5f4;border-radius:12px;background:#fff;color:#0f172a;cursor:pointer}.gju-contact-form{display:grid;gap:12px;padding:16px 18px 18px}.gju-contact-field{display:grid;gap:6px}.gju-contact-field label{font-size:.86rem;font-weight:900;color:#0f172a}.gju-contact-field input,.gju-contact-field textarea{width:100%;border:1px solid #dbe5f4;border-radius:13px;padding:12px;font:inherit;font-size:15px;background:#fff;color:#0f172a;outline:none}.gju-contact-field textarea{min-height:118px;resize:vertical}.gju-contact-field input:focus,.gju-contact-field textarea:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.12)}.gju-contact-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.gju-contact-submit{min-height:46px;border:0;border-radius:14px;background:#2563eb;color:#fff;font-weight:900;cursor:pointer}.gju-contact-submit:disabled{opacity:.65;cursor:not-allowed}.gju-contact-status{display:none;border-radius:13px;padding:10px 12px;font-size:.9rem;font-weight:800}.gju-contact-status.show{display:block}.gju-contact-status.success{background:#dcfce7;color:#166534}.gju-contact-status.error{background:#fee2e2;color:#991b1b}.gju-contact-honeypot{position:absolute;left:-9999px;opacity:0}.gju-contact-note{font-size:.78rem;color:#64748b;text-align:center}.gju-contact-body-lock{overflow:hidden!important}
      @media(max-width:640px){.gju-contact-widget{right:14px;bottom:82px}.gju-contact-fab{width:48px;height:48px;min-height:48px;padding:0;justify-content:center}.gju-contact-fab span{display:none}.gju-contact-card{border-radius:18px}.gju-contact-row{grid-template-columns:1fr}.gju-contact-head{padding:16px}.gju-contact-form{padding:14px 16px 16px}}
    `;
    document.head.appendChild(style);
  }

  function getPageLabel() {
    const title = document.title || "GovJobUpdates";
    return title.replace(/\s*\|\s*GovJobUpdates\s*$/i, "").trim() || pageName;
  }

  function createWidget() {
    injectStyle();
    const wrapper = document.createElement("div");
    wrapper.id = "gjuContactWidget";
    wrapper.className = "gju-contact-widget";
    wrapper.innerHTML = `
      <button class="gju-contact-fab" type="button" id="gjuContactOpen" aria-haspopup="dialog" aria-controls="gjuContactPanel">
        <i class="fas fa-headset" aria-hidden="true"></i><span>Contact Us</span>
      </button>
      <div class="gju-contact-panel" id="gjuContactPanel" role="dialog" aria-modal="true" aria-labelledby="gjuContactTitle">
        <article class="gju-contact-card">
          <div class="gju-contact-head">
            <div><span class="gju-contact-kicker">Help & Support</span><h2 id="gjuContactTitle">Contact GovJobUpdates</h2><p>Tell us your issue, correction, or request. We will review it by email.</p></div>
            <button class="gju-contact-close" type="button" id="gjuContactClose" aria-label="Close contact form"><i class="fas fa-times" aria-hidden="true"></i></button>
          </div>
          <form class="gju-contact-form" id="gjuContactForm">
            <input type="text" name="_honey" class="gju-contact-honeypot" tabindex="-1" autocomplete="off">
            <input type="hidden" name="_subject" value="New GovJobUpdates Contact Request">
            <input type="hidden" name="Website Page" id="gjuContactPage" value="${escapeHtml(getPageLabel())}">
            <div class="gju-contact-row">
              <div class="gju-contact-field"><label for="gjuContactName">Name</label><input id="gjuContactName" name="Name" type="text" maxlength="80" placeholder="Your name"></div>
              <div class="gju-contact-field"><label for="gjuContactPhone">Mobile / Email</label><input id="gjuContactPhone" name="Contact" type="text" maxlength="120" placeholder="Optional"></div>
            </div>
            <div class="gju-contact-field"><label for="gjuContactSubject">Subject</label><input id="gjuContactSubject" name="Subject" type="text" maxlength="120" required placeholder="Example: Quiz issue, Job update, Correction"></div>
            <div class="gju-contact-field"><label for="gjuContactMessage">Description</label><textarea id="gjuContactMessage" name="Description" maxlength="1500" required placeholder="Write your problem or purpose clearly..."></textarea></div>
            <div class="gju-contact-status" id="gjuContactStatus" role="status" aria-live="polite"></div>
            <button class="gju-contact-submit" type="submit" id="gjuContactSubmit">Submit Request</button>
            <div class="gju-contact-note">Your message will be sent to GovJobUpdates support email.</div>
          </form>
        </article>
      </div>
    `;
    document.body.appendChild(wrapper);
    bindWidget(wrapper);
    syncVisibility(wrapper);
    return wrapper;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
    }[character]));
  }

  function setStatus(message, type) {
    const status = document.getElementById("gjuContactStatus");
    if (!status) return;
    status.textContent = message || "";
    status.className = `gju-contact-status ${message ? "show" : ""} ${type || ""}`;
  }

  function openPanel() {
    if (isQuizExamMode()) return;
    document.getElementById("gjuContactPanel")?.classList.add("is-open");
    document.body.classList.add("gju-contact-body-lock");
    window.setTimeout(() => document.getElementById("gjuContactSubject")?.focus(), 80);
  }

  function closePanel() {
    document.getElementById("gjuContactPanel")?.classList.remove("is-open");
    document.body.classList.remove("gju-contact-body-lock");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = document.getElementById("gjuContactSubmit");
    const subject = document.getElementById("gjuContactSubject")?.value.trim();
    const message = document.getElementById("gjuContactMessage")?.value.trim();
    if (!subject || !message) {
      setStatus("Please enter subject and description.", "error");
      return;
    }
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Sending...";
    }
    setStatus("Sending your request...", "");
    try {
      const formData = new FormData(form);
      formData.append("Page URL", window.location.href);
      formData.append("Submitted At", new Date().toLocaleString("en-IN"));
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      document.getElementById("gjuContactPage").value = getPageLabel();
      setStatus("Request submitted successfully. We will review it soon.", "success");
    } catch (error) {
      const mailSubject = encodeURIComponent(`GovJobUpdates Contact: ${subject}`);
      const mailBody = encodeURIComponent(`${message}\n\nPage: ${window.location.href}`);
      setStatus("Could not send automatically. Opening email fallback...", "error");
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Submit Request";
      }
    }
  }

  function bindWidget(wrapper) {
    wrapper.querySelector("#gjuContactOpen")?.addEventListener("click", openPanel);
    wrapper.querySelector("#gjuContactClose")?.addEventListener("click", closePanel);
    wrapper.querySelector("#gjuContactPanel")?.addEventListener("click", (event) => {
      if (event.target.id === "gjuContactPanel") closePanel();
    });
    wrapper.querySelector("#gjuContactForm")?.addEventListener("submit", handleSubmit);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePanel();
    });
  }

  function syncVisibility(widget) {
    widget.classList.toggle("is-hidden", isQuizExamMode());
  }

  function initWatchers(widget) {
    const observer = new MutationObserver(() => syncVisibility(widget));
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    const examView = document.getElementById("examView");
    if (examView) observer.observe(examView, { attributes: true, attributeFilter: ["class", "hidden"] });
    window.addEventListener("resize", () => syncVisibility(widget), { passive: true });
  }

  function init() {
    const widget = createWidget();
    initWatchers(widget);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
