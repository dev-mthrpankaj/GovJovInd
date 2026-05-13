(function () {
  "use strict";

  const WHATSAPP_NUMBER = "917300627752";
  const UPI_ID = "YOUR_UPI_ID@upi";
  const PAYEE_NAME = "GovJobUpdates CSC";
  const FEE_AMOUNT = 80;

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

  function buildMessage(data) {
    return [
      "New UP Certificate Service Request",
      "",
      `Request ID: ${data.requestId}`,
      `Service: ${data.serviceType}`,
      `Fee: ₹${FEE_AMOUNT}`,
      `Payment UTR: ${data.paymentUtr}`,
      "",
      `Applicant: ${data.applicantName}`,
      `Father/Husband: ${data.fatherName}`,
      `Mobile for OTP: ${data.mobileNumber}`,
      `Email: ${data.emailId}`,
      `Aadhaar Last 4: ${data.aadhaarLast4 || "Not provided"}`,
      "",
      `District: ${data.district}`,
      `Tehsil: ${data.tehsil}`,
      `Address: ${data.address}`,
      "",
      `Extra Note: ${data.extraNote || "None"}`,
      "",
      "Required documents to be sent:",
      "1. Aadhaar Card",
      "2. Sabhasad/Pradhan Letter Pad",
      "3. Photo",
      "4. Phone Number for OTP",
      "5. Email ID"
    ].join("\n");
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

  function handleSubmit(event) {
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
      extraNote: clean($("#extraNote")?.value)
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

    saveLocalRequest(data);
    const message = buildMessage(data);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const success = $("#certSuccess");
    if (success) {
      success.classList.add("show");
      success.innerHTML = `<strong>Request ID: ${data.requestId}</strong><br>Please send documents on WhatsApp with this request ID. Payment will be manually verified after checking UTR.`;
    }
    window.open(waUrl, "_blank", "noopener,noreferrer");
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
