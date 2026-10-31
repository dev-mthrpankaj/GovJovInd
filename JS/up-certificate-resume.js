/* "Resume document upload": for a PAID request whose documents are missing (tab closed, upload failed, or re-upload requested). */
(function () {
  "use strict";
  const C = window.GJUCert;
  if (!C) return;
  const $ = (s) => document.querySelector(s);
  const card = $("#resumeCard"), form = $("#resumeForm");
  if (!card || !form) return;

  const msg = $("#resumeMessage"), docs = $("#resumeDocs"), uploadBtn = $("#resumeUploadBtn"), checkBtn = $("#resumeCheckBtn"), progress = $("#resumeProgress");
  let session = null;   // { requestId, token, required }

  const say = (text, kind) => { msg.textContent = text || ""; msg.className = "track-message" + (text ? " show" : "") + (kind === "ok" ? " is-ok" : ""); if (text) msg.scrollIntoView({ behavior: "smooth", block: "nearest" }); };
  const busy = (button, on, label) => { button.disabled = on; if (label) button.dataset.label = button.dataset.label || button.innerHTML; button.innerHTML = on ? `<i class="fas fa-spinner fa-spin"></i> ${label}` : (button.dataset.label || button.innerHTML); };

  function renderDocs(required) {
    docs.innerHTML = "";
    required.forEach((d) => {
      const wrap = document.createElement("div");
      wrap.className = "resume-doc";
      const id = "resumeFile_" + d.key;
      wrap.innerHTML = `<label for="${C.escapeHtml(id)}">${C.escapeHtml(d.label)}${d.required ? "" : " (optional)"}</label><input type="file" id="${C.escapeHtml(id)}" data-key="${C.escapeHtml(d.key)}" accept="${C.escapeHtml(d.accept || "")}" ${d.required ? "required" : ""}>`;
      docs.appendChild(wrap);
    });
    docs.hidden = false;
    uploadBtn.hidden = false;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    say("");
    docs.hidden = true; uploadBtn.hidden = true; session = null;
    const requestId = C.clean($("#resumeRequest").value).toUpperCase();
    const mobile = C.clean($("#resumeMobile").value).replace(/\D/g, "");
    const email = C.clean($("#resumeEmail").value).toLowerCase();
    if (!/^GJU-CERT-\d{6}-[A-Z0-9]{6}$/.test(requestId)) return say("Enter a valid Request ID (example: GJU-CERT-261031-AB12CD).");
    if (!/^[6-9]\d{9}$/.test(mobile)) return say("Enter the 10 digit mobile number used in the request.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return say("Enter the email used in the request.");
    busy(checkBtn, true, "Checking...");
    try {
      const r = await C.resumeUpload(requestId, mobile, email);
      session = { requestId: r.request_id, token: r.upload_token, required: r.required_documents || [] };
      renderDocs(session.required);
      say(`Hi ${r.applicant_name}, your payment is safe. Upload the documents below. Do NOT pay again.`, "ok");
    } catch (err) {
      say(err.code === "not_eligible"
        ? "No request is waiting for documents with these details. If your documents were already uploaded, just check the status above. Otherwise re-check the Request ID, mobile and email."
        : err.message);
    } finally { busy(checkBtn, false); }
  });

  uploadBtn.addEventListener("click", async () => {
    if (!session) return;
    say("");
    busy(uploadBtn, true, "Uploading...");
    try {
      const files = {};
      progress.hidden = false; progress.textContent = "Checking and optimising your documents...";
      for (const d of session.required) {
        const input = docs.querySelector(`input[data-key="${d.key}"]`);
        const file = input && input.files && input.files[0];
        if (!file) { if (d.required) throw new Error(`${d.label} is required.`); files[d.key] = null; continue; }
        files[d.key] = await C.prepareFile(file, d.label, C.rulesFromAccept(d.accept));
      }
      progress.textContent = "Uploading documents. Please keep this page open...";
      await C.uploadDocuments(session.requestId, session.token, files);
      C.clearPending();
      progress.hidden = true;
      docs.hidden = true; uploadBtn.hidden = true;
      say(`Documents received for ${session.requestId}. You can track the request above.`, "ok");
      session = null;
    } catch (err) {
      progress.hidden = true;
      say((err.message || "Upload failed.") + " Your payment is safe. You can fix the file and try again, or start again with your details to get a fresh upload session.");
    } finally { busy(uploadBtn, false); }
  });

  /* prefill: ?request_id= (from the pay page banner / e-mail) and the saved pending request */
  const qs = new URLSearchParams(location.search);
  const pending = C.loadPending();
  const rid = (qs.get("request_id") || (pending && pending.requestId) || "").toUpperCase();
  if (/^GJU-CERT-\d{6}-[A-Z0-9]{6}$/.test(rid)) { $("#resumeRequest").value = rid; if (pending || location.hash === "#resume") card.classList.add("is-highlight"); }
  if (location.hash === "#resume") setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "start" }), 300);

  /* called by the status script when the tracked request still needs documents */
  window.GJUResumePrefill = (requestId, mobile) => {
    $("#resumeRequest").value = requestId || "";
    if (mobile) $("#resumeMobile").value = mobile;
    card.classList.add("is-highlight");
    card.hidden = false;
  };
}());
