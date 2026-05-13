(function(){
  "use strict";
  var QR_PATH = "../Assets/UP Services/payment-qr.svg";
  function ready(fn){ if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  function injectStyle(){
    if(document.getElementById("upQrUiStyle")) return;
    var s = document.createElement("style");
    s.id = "upQrUiStyle";
    s.textContent = ".payment-qr-card{display:grid;gap:.9rem}.payment-qr-wrap{display:grid;place-items:center;padding:1rem;border:1px dashed #93c5fd;border-radius:16px;background:#fff}.payment-qr-wrap img{width:min(100%,260px);max-width:260px;aspect-ratio:1/1;object-fit:contain;display:block;border-radius:14px;box-shadow:0 10px 24px rgba(37,99,235,.12);background:#fff}.payment-qr-meta{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}.payment-qr-fee{display:grid;gap:.18rem;padding:.78rem;border:1px solid #dbeafe;border-radius:12px;background:#f8fbff}.payment-qr-fee span{font-size:.8rem;color:#64748b;font-weight:800}.payment-qr-fee strong{font-size:1rem;color:#0f172a}.payment-first-panel{margin-bottom:1rem;border:1px solid #bfdbfe!important;background:linear-gradient(135deg,#ffffff,#eff6ff)!important}.payment-first-panel h2{display:flex;align-items:center;gap:.5rem}.payment-step-badge{display:inline-flex;width:max-content;align-items:center;gap:.35rem;padding:.34rem .6rem;border-radius:999px;background:#dcfce7;color:#166534;font-size:.76rem;font-weight:900}.payment-bilingual-note{display:grid;gap:.45rem}.payment-bilingual-note .note-line{display:block;line-height:1.45}.payment-bilingual-note .note-lang{font-weight:900;color:#9a3412;margin-right:.35rem}.cert-grid.payment-first-layout{grid-template-columns:minmax(0,1fr)!important}.cert-grid.payment-first-layout .payment-box{order:-1}.cert-grid.payment-first-layout #certificateForm{order:1}@media(min-width:900px){.cert-grid.payment-first-layout .payment-box{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,.65fr) minmax(0,.65fr);align-items:start}.cert-grid.payment-first-layout .payment-box>.cert-card:first-child{grid-column:1 / -1}.cert-grid.payment-first-layout #certificateForm{max-width:920px;width:100%;justify-self:center}}@media(max-width:640px){.payment-qr-meta{grid-template-columns:1fr}.payment-qr-wrap img{max-width:220px}.payment-first-panel{margin-bottom:.75rem}}";
    document.head.appendChild(s);
  }
  function patch(){
    if(!/\/HTML\/up-certificate-services\.html$/i.test(location.pathname)) return;
    injectStyle();
    var old = document.getElementById("upiIdText");
    var card = document.getElementById("paymentCard") || (old ? old.closest(".cert-card") : null);
    if(card && card.dataset.qrReady !== "1"){
      card.dataset.qrReady = "1";
      card.classList.add("payment-first-panel");
      card.innerHTML = '<span class="payment-step-badge">Step 1: Pay first</span><h2><i class="fas fa-qrcode"></i> Scan & Pay ₹80</h2><div class="payment-upi-card payment-qr-card"><p><strong>हिंदी:</strong> फॉर्म जमा करने से पहले क्यूआर कोड स्कैन करके ₹80 का भुगतान करें। भुगतान के बाद फॉर्म में यूटीआर / ट्रांजैक्शन आईडी भरना आवश्यक है।</p><p><strong>English:</strong> Please scan the QR code and pay ₹80 before submitting the form. After payment, enter the UTR / Transaction ID in the form.</p><div class="payment-qr-wrap"><img id="paymentQrImage" src="'+QR_PATH+'" alt="Scan QR to pay ₹80" loading="lazy" decoding="async"></div><div class="payment-qr-meta"><div class="payment-qr-fee"><span>Amount</span><strong>₹80</strong></div><div class="payment-qr-fee"><span>Purpose</span><strong>UP Certificate Service</strong></div></div><p class="cert-note payment-bilingual-note"><span class="note-line"><span class="note-lang">हिंदी:</span>पहले भुगतान करें, फिर नीचे दिए गए फॉर्म में भुगतान यूटीआर / ट्रांजैक्शन आईडी और भुगतान का स्क्रीनशॉट जमा करें।</span><span class="note-line"><span class="note-lang">English:</span>First complete the payment, then submit the Payment UTR / Transaction ID and payment screenshot in the form below.</span></p></div>';
    }
    var grid = document.querySelector(".cert-grid");
    if(grid) grid.classList.add("payment-first-layout");
    var formTitle = document.querySelector("#certificateForm h2");
    if(formTitle && !formTitle.dataset.stepReady){
      formTitle.dataset.stepReady = "1";
      formTitle.innerHTML = '<span class="payment-step-badge" style="background:#dbeafe;color:#1d4ed8;margin-right:.45rem">Step 2</span> Certificate Request Form';
    }
  }
  ready(patch);
  setTimeout(patch,250);
  setTimeout(patch,750);
  setTimeout(patch,1500);
}());

(function () {
  "use strict";

  const UPI_ID = "";
  const PAYEE_NAME = "GovJobUpdates CSC";
  const FEE_AMOUNT = 80;
  const CERTIFICATE_API_URL = "https://script.google.com/macros/s/AKfycbxDgRkmo0ZxktOZGdArFW-7APDT68ZJpETTvLSsaS4rD6h52TcB-lL-iJtypwg5gttPcQ/exec";
  const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024;

  const $ = (selector) => document.querySelector(selector);

  function hasConfiguredUpiId() {
    return Boolean(UPI_ID && !UPI_ID.includes("YOUR_UPI_ID"));
  }

  function polishPageShell() {
    document.body.classList.add("up-certificate-page");

    const style = document.createElement("style");
    style.id = "upCertificatePageShellStyle";
    style.textContent = `
      body.up-certificate-page{background:#f4f7fb;overflow-x:hidden}.up-certificate-page main.cert-page{width:min(1180px,calc(100% - 28px));margin:1.2rem auto 2rem;padding:0 0 1.5rem}.up-certificate-page header{position:sticky;top:0;z-index:1000}.up-certificate-page .cert-hero{margin-top:.25rem}.up-service-link-card{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem;border:1px solid #bfdbfe;border-radius:18px;background:linear-gradient(135deg,#eff6ff,#fff);text-decoration:none;color:#0f172a}.up-service-link-card strong{display:block;color:#0f172a}.up-service-link-card span{display:block;color:#64748b;font-size:.9rem}.up-service-link-card i{color:#2563eb}.up-certificate-page nav.active{max-height:calc(100dvh - 88px);overflow-y:auto;-webkit-overflow-scrolling:touch}.up-certificate-page nav.active ul{padding-bottom:1rem}.up-certificate-page .candidate-bottom-nav a[href*="up-certificate-services"]{color:#2563eb}
      @media(max-width:640px){.up-certificate-page main.cert-page{width:min(100% - 18px,680px);margin:.75rem auto 5.6rem}.up-certificate-page .cert-hero{margin-top:.15rem}.up-service-link-card{padding:.85rem;border-radius:15px}.up-certificate-page .cert-card,.up-certificate-page .cert-hero{box-shadow:0 10px 30px rgba(15,23,42,.06)}}
    `;
    if (!document.getElementById(style.id)) document.head.appendChild(style);
  }

  function setPaymentUi() {
    const upiText = $("#upiIdText");
    const upiBtn = $("#upiPayBtn");
    const canUseUpiDeepLink = hasConfiguredUpiId();
    if (upiText) {
      if (canUseUpiDeepLink) upiText.textContent = UPI_ID;
      else upiText.closest(".payment-upi-id")?.remove();
    }
    if (upiBtn) {
      if (!canUseUpiDeepLink) {
        upiBtn.remove();
        return;
      }
      const params = new URLSearchParams({
        pa: UPI_ID,
        pn: PAYEE_NAME,
        am: String(FEE_AMOUNT),
        cu: "INR",
        tn: "UP Certificate CSC Assistance"
      });
      upiBtn.href = `upi://pay?${params.toString()}`;
    }
  }

  function makeRequestId() {
    const now = new Date();
    const date = now.toISOString().slice(2, 10).replace(/-/g, "");
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `UPDOC-${date}-${random}`;
  }

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function validateMobile(value) {
    return /^[6-9]\d{9}$/.test(value);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        reject(new Error(`${file.name} is too large. Keep every file under 1.5 MB.`));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        resolve({
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size,
          data: result.includes(",") ? result.split(",")[1] : result
        });
      };
      reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
      reader.readAsDataURL(file);
    });
  }

  async function getFilesPayload() {
    return {
      paymentScreenshot: await fileToBase64($("#paymentScreenshotFile")?.files?.[0]),
      aadhaar: await fileToBase64($("#aadhaarFile")?.files?.[0]),
      letter: await fileToBase64($("#letterFile")?.files?.[0]),
      photo: await fileToBase64($("#photoFile")?.files?.[0]),
      extra: await fileToBase64($("#extraFile")?.files?.[0])
    };
  }

  function saveLocalRequest(data) {
    try {
      const key = "gju:up-certificate-requests";
      const previous = JSON.parse(localStorage.getItem(key) || "[]");
      previous.unshift({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(previous.slice(0, 20)));
    } catch {
      // Ignore storage errors.
    }
  }

  function setProgress(message, show = true) {
    const progress = $("#certProgress");
    if (!progress) return;
    progress.textContent = message || "";
    progress.classList.toggle("show", show);
  }

  function setSuccess(message) {
    const success = $("#certSuccess");
    if (!success) return;
    success.classList.add("show");
    success.innerHTML = message;
  }

  function setSubmitState(isLoading) {
    const btn = $("#certSubmitBtn");
    if (!btn) return;
    btn.disabled = isLoading;
    btn.innerHTML = isLoading ? '<i class="fas fa-spinner fa-spin"></i> Uploading Documents...' : '<i class="fas fa-cloud-arrow-up"></i> Submit Request with Documents';
  }

  async function submitToAppsScript(payload) {
    const response = await fetch(CERTIFICATE_API_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    const result = JSON.parse(text);
    if (!result.success) throw new Error(result.message || "Request upload failed.");
    return result;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget || $("#upCertificateForm");
    const data = {
      requestId: makeRequestId(),
      serviceType: clean($("#serviceType")?.value),
      applicantName: clean($("#applicantName")?.value),
      fatherName: clean($("#fatherName")?.value),
      mobileNumber: clean($("#mobileNumber")?.value),
      emailId: clean($("#emailId")?.value),
      district: clean($("#district")?.value),
      tehsil: clean($("#tehsil")?.value),
      address: clean($("#address")?.value),
      aadhaarLast4: clean($("#aadhaarLast4")?.value),
      paymentUtr: clean($("#paymentUtr")?.value),
      extraNote: clean($("#extraNote")?.value),
      feeAmount: FEE_AMOUNT,
      submittedAt: new Date().toISOString(),
      pageUrl: window.location.href
    };

    if (!data.serviceType || !data.applicantName || !data.fatherName || !data.mobileNumber || !data.emailId || !data.district || !data.tehsil || !data.address || !data.paymentUtr) {
      alert("Please fill all required fields including payment UTR.");
      return;
    }
    if (!validateMobile(data.mobileNumber)) {
      alert("Please enter a valid 10 digit Indian mobile number.");
      return;
    }
    if (data.aadhaarLast4 && !/^\d{4}$/.test(data.aadhaarLast4)) {
      alert("Aadhaar last 4 digits should be exactly 4 numbers.");
      return;
    }
    if (!$("#paymentScreenshotFile")?.files?.[0]) {
      alert("Please upload payment screenshot for verification.");
      return;
    }
    if (!$("#aadhaarFile")?.files?.[0] || !$("#letterFile")?.files?.[0] || !$("#photoFile")?.files?.[0]) {
      alert("Please upload Aadhaar, Sabhasad/Pradhan letter pad, and photo.");
      return;
    }

    setSubmitState(true);
    setProgress("Reading selected documents...");
    try {
      const files = await getFilesPayload();
      setProgress("Uploading request to secure Drive folder...");
      const payload = {
        action: "submitCertificateRequest",
        data,
        files
      };
      const result = await submitToAppsScript(payload);
      saveLocalRequest({ ...data, folderUrl: result.folderUrl || "" });
      setSuccess(`<strong>Request submitted successfully.</strong><br>Request ID: <strong>${data.requestId}</strong><br>Your documents and payment screenshot have been uploaded. Payment UTR will be manually verified. Keep this Request ID for future reference.`);
      setProgress("Upload complete.", false);
      if (form && typeof form.reset === "function") form.reset();
    } catch (error) {
      setProgress("Upload failed.", false);
      alert(error.message || "Could not submit request. Please try again.");
    } finally {
      setSubmitState(false);
    }
  }

  function init() {
    polishPageShell();
    window.setTimeout(polishPageShell, 250);
    setPaymentUi();
    $("#copyUpiBtn")?.addEventListener("click", async () => {
      if (!hasConfiguredUpiId()) return;
      try {
        await navigator.clipboard.writeText(UPI_ID);
        alert("UPI ID copied");
      } catch {
        alert(`UPI ID: ${UPI_ID}`);
      }
    });
    $("#upCertificateForm")?.addEventListener("submit", handleSubmit);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
