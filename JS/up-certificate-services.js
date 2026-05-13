(function () {
  "use strict";

  const UPI_ID = "YOUR_UPI_ID@upi";
  const PAYEE_NAME = "GovJobUpdates CSC";
  const FEE_AMOUNT = 80;
  const CERTIFICATE_API_URL = "https://script.google.com/macros/s/AKfycbyM6Xq_fq0axcmTvMTG3Xx0Dwy9h7wSbUDqsO7EvULeGLm0SAVWO0OrkmEEtKh_QBbE/exec";
  const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024;

  const $ = (selector) => document.querySelector(selector);

  function setPaymentUi() {
    const upiText = $("#upiIdText");
    const upiBtn = $("#upiPayBtn");
    if (upiText) upiText.textContent = UPI_ID;
    if (upiBtn) {
      const params = new URLSearchParams({
        pa: UPI_ID,
        pn: PAYEE_NAME,
        am: String(FEE_AMOUNT),
        cu: "INR",
        tn: "UP Certificate CSC Assistance"
      });
      upiBtn.href = `upi://pay?${params.toString()}`;
      if (UPI_ID.includes("YOUR_UPI_ID")) {
        upiBtn.classList.add("btn-disabled");
        upiBtn.setAttribute("aria-disabled", "true");
        upiBtn.title = "Add real UPI ID in JS/up-certificate-services.js first";
      }
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
      setSuccess(`<strong>Request submitted successfully.</strong><br>Request ID: <strong>${data.requestId}</strong><br>Your documents have been uploaded. Payment UTR will be manually verified. Keep this Request ID for future reference.`);
      setProgress("Upload complete.", false);
      event.currentTarget.reset();
    } catch (error) {
      setProgress("Upload failed.", false);
      alert(error.message || "Could not submit request. Please try again.");
    } finally {
      setSubmitState(false);
    }
  }

  function init() {
    setPaymentUi();
    $("#copyUpiBtn")?.addEventListener("click", async () => {
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
