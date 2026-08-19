(function () {
  "use strict";

  const CERTIFICATE_API_BASE = "https://test.govjobupdates.com/live-test/certificate-api";
  const CERTIFICATE_DRIVE_API_URL = "https://script.google.com/macros/s/AKfycbxDgRkmo0ZxktOZGdArFW-7APDT68ZJpETTvLSsaS4rD6h52TcB-lL-iJtypwg5gttPcQ/exec";
  const DEFAULT_SERVICE_FEE_PAISE = 11000;
  const DEFAULT_DELIVERY_FEE_PAISE = 5000;
  const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024;
  const ALLOWED_DOCUMENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  let verifiedPayment = null;
  let uploadInProgress = false;
  let pricingReady = false;
  let pricing = {
    services: {},
    delivery_fee_paise: DEFAULT_DELIVERY_FEE_PAISE
  };

  function clean(value) { return String(value || "").replace(/\s+/g, " ").trim(); }
  function validateMobile(value) { return /^[6-9]\d{9}$/.test(value); }
  function validateEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
  function money(paise) { return `₹${Math.round(Number(paise || 0) / 100)}`; }
  function selectedServices() { return $$('#serviceChoices input[name="services"]:checked').map((input) => input.value); }
  function hasIncome() { return selectedServices().includes("Income Certificate"); }
  function hasCasteOrDomicile() { return selectedServices().some((service) => service !== "Income Certificate"); }
  function incomeFor() { return clean($('input[name="incomeFor"]:checked')?.value).toLowerCase(); }
  function onlineDocuments() { return Boolean($("#onlineDocumentsToggle")?.checked); }
  function homeDelivery() { return Boolean($("#homeDeliveryToggle")?.checked); }

  function setProgress(message, show = true) {
    const box = $("#certProgress");
    if (!box) return;
    box.textContent = message || "";
    box.classList.toggle("show", Boolean(show && message));
  }

  function setError(message) {
    const box = $("#certError");
    if (!box) return;
    box.textContent = message || "";
    box.classList.toggle("show", Boolean(message));
  }

  function clearMessages() {
    setProgress("", false);
    setError("");
    const success = $("#certSuccess");
    if (success) {
      success.classList.remove("show");
      success.innerHTML = "";
    }
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function servicePrice(service) {
    const value = Number(pricing.services?.[service]);
    return Number.isFinite(value) && value >= 0 ? value : DEFAULT_SERVICE_FEE_PAISE;
  }

  function currentServiceFeePaise() {
    return selectedServices().reduce((sum, service) => sum + servicePrice(service), 0);
  }

  function currentTotalPaise() {
    return currentServiceFeePaise() + (homeDelivery() ? Number(pricing.delivery_fee_paise || 0) : 0);
  }

  function pricingRangeText() {
    const values = Object.values(pricing.services || {}).map(Number).filter((v) => Number.isFinite(v) && v >= 0);
    if (!values.length) return "Loading...";
    const min = Math.min(...values);
    const max = Math.max(...values);
    return min === max ? `${money(min)} each` : `${money(min)}–${money(max)}`;
  }

  function renderPricingLabels() {
    const hero = $("#heroServiceFee");
    if (hero) hero.textContent = pricingRangeText();

    const safety = $("#safetyFeeTitle");
    if (safety) safety.textContent = `${pricingRangeText()} Assistance Fee`;

    const deliveryCopy = $("#deliveryFeeCopy");
    if (deliveryCopy) deliveryCopy.textContent = `Digital copy is included. Add ${money(pricing.delivery_fee_paise)} once for laminated physical certificate(s) sent together.`;

    $$('#serviceChoices input[name="services"]').forEach((input) => {
      const labelText = input.closest("label")?.querySelector("span");
      if (!labelText) return;
      let badge = labelText.querySelector(".service-live-price");
      if (!badge) {
        badge = document.createElement("small");
        badge.className = "service-live-price";
        labelText.appendChild(badge);
      }
      badge.textContent = money(servicePrice(input.value));
    });
  }

  async function loadPricing() {
    const response = await fetch(`${CERTIFICATE_API_BASE}/pricing.php`, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
      credentials: "omit",
      headers: {"X-Requested-With": "XMLHttpRequest"}
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success || !result.services) {
      throw new Error("Live certificate pricing could not be loaded. Please refresh the page.");
    }
    pricing = {
      services: result.services,
      delivery_fee_paise: Number(result.delivery_fee_paise || 0)
    };
    pricingReady = true;
    renderPricingLabels();
    refreshUI();
  }

  function setRequired(id, required) {
    const element = $("#" + id);
    if (element) element.required = Boolean(required);
  }

  function refreshUI() {
    const services = selectedServices();
    const income = hasIncome();
    const common = hasCasteOrDomicile();
    const online = onlineDocuments();
    const delivery = homeDelivery();

    const serviceFee = currentServiceFeePaise();
    const deliveryFee = delivery ? Number(pricing.delivery_fee_paise || 0) : 0;
    if ($("#serviceFeeDisplay")) $("#serviceFeeDisplay").textContent = money(serviceFee);
    if ($("#deliveryFeeDisplay")) $("#deliveryFeeDisplay").textContent = money(deliveryFee);
    if ($("#totalFeeDisplay")) $("#totalFeeDisplay").textContent = money(serviceFee + deliveryFee);

    $("#incomeForSection")?.toggleAttribute("hidden", !income);
    $$('input[name="incomeFor"]').forEach((radio) => { radio.required = income; });

    $("#onlineDocumentsArea")?.toggleAttribute("hidden", !online);
    $("#offlineDocumentsNote")?.toggleAttribute("hidden", online);
    $("#commonDocumentsSection")?.toggleAttribute("hidden", !common);
    $("#incomeDocumentsSection")?.toggleAttribute("hidden", !income);

    setRequired("aadhaarFile", online && common);
    setRequired("letterFile", online && common);
    setRequired("photoFile", online && common);
    setRequired("incomeAadhaarFile", online && income);
    setRequired("incomeLetterFile", online && income);
    setRequired("incomePhotoFile", online && income);

    if ($("#offlineRequiredDocuments")) {
      const groups = [];
      if (common) groups.push("Caste/Domicile: Aadhaar Card, Sabhasad/Pradhan Letter Pad and Passport Size Photo");
      if (income) groups.push(`Income (${incomeFor() === "father" ? "Father" : incomeFor() === "self" ? "Self" : "select Self/Father"}): separate Aadhaar front + back single PDF/print set, separate Sabhasad/Pradhan Letter Pad and separate Passport Size Photo`);
      $("#offlineRequiredDocuments").textContent = groups.length
        ? `Required documents — ${groups.join(". ")}.`
        : "Select at least one certificate to see the required documents.";
    }
    $("#offlineIncomePhoneNote")?.toggleAttribute("hidden", !income);

    $("#deliveryAddressArea")?.toggleAttribute("hidden", !delivery);
    ["deliveryName", "deliveryMobile", "deliveryAddress", "deliveryPincode"].forEach((id) => setRequired(id, delivery));

    setSubmitState("ready");
  }

  function setSubmitState(mode) {
    const button = $("#certSubmitBtn");
    if (!button) return;
    if (mode === "creating") {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Secure Payment...';
      return;
    }
    if (mode === "verifying") {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying Payment...';
      return;
    }
    if (mode === "uploading") {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading Documents...';
      return;
    }
    if (mode === "retry") {
      button.disabled = false;
      button.innerHTML = '<i class="fas fa-rotate-right"></i> Retry Document Upload';
      return;
    }
    button.disabled = !pricingReady;
    button.innerHTML = pricingReady
      ? `<i class="fas fa-lock"></i> Pay ${money(currentTotalPaise())} &amp; Submit Application`
      : '<i class="fas fa-spinner fa-spin"></i> Loading Live Pricing...';
  }

  function collectApplicationData() {
    return {
      services: selectedServices(),
      income_for: hasIncome() ? incomeFor() : "",
      applicant_name: clean($("#applicantName")?.value),
      father_husband_name: clean($("#fatherName")?.value),
      mobile: clean($("#mobileNumber")?.value),
      email: clean($("#emailId")?.value),
      district: clean($("#district")?.value),
      tehsil: clean($("#tehsil")?.value),
      aadhaar_last4: clean($("#aadhaarLast4")?.value),
      extra_note: clean($("#extraNote")?.value),
      document_submission_mode: onlineDocuments() ? "online" : "offline",
      home_delivery: homeDelivery(),
      delivery_name: clean($("#deliveryName")?.value),
      delivery_mobile: clean($("#deliveryMobile")?.value),
      delivery_address: clean($("#deliveryAddress")?.value),
      delivery_pincode: clean($("#deliveryPincode")?.value)
    };
  }

  function selectedFiles() {
    return {
      aadhaar: $("#aadhaarFile")?.files?.[0] || null,
      letter: $("#letterFile")?.files?.[0] || null,
      photo: $("#photoFile")?.files?.[0] || null,
      income_aadhaar: $("#incomeAadhaarFile")?.files?.[0] || null,
      income_letter: $("#incomeLetterFile")?.files?.[0] || null,
      income_photo: $("#incomePhotoFile")?.files?.[0] || null,
      extra: $("#extraFile")?.files?.[0] || null
    };
  }

  function validateFile(file, label, options = {}) {
    if (!file) throw new Error(`${label} is required.`);
    if (file.size <= 0 || file.size > MAX_FILE_SIZE_BYTES) throw new Error(`${label} must be under 1.5 MB.`);

    const type = String(file.type || "").toLowerCase();
    if (options.pdfOnly && type !== "application/pdf") throw new Error(`${label} must be a PDF file.`);
    if (options.imageOnly && !type.startsWith("image/")) throw new Error(`${label} must be an image file.`);
    if (!options.pdfOnly && !options.imageOnly && !ALLOWED_DOCUMENT_TYPES.has(type)) {
      throw new Error(`${label} must be JPG, PNG, WEBP or PDF.`);
    }
  }

  function validateApplication(data, files) {
    if (!data.services.length) throw new Error("Please select at least one certificate service.");
    if (data.services.includes("Income Certificate") && !["self", "father"].includes(data.income_for)) {
      throw new Error("Please select whether the Income Certificate is for Self or Father.");
    }
    if (!data.applicant_name || !data.father_husband_name || !data.mobile || !data.email || !data.district || !data.tehsil) {
      throw new Error("Please fill all required applicant details.");
    }
    if (!validateMobile(data.mobile)) throw new Error("Please enter a valid 10 digit Indian mobile number.");
    if (!validateEmail(data.email)) throw new Error("Please enter a valid email address.");
    if (data.aadhaar_last4 && !/^\d{4}$/.test(data.aadhaar_last4)) {
      throw new Error("Aadhaar last 4 digits must contain exactly 4 numbers.");
    }

    if (data.home_delivery) {
      if (!data.delivery_name || !validateMobile(data.delivery_mobile) || !data.delivery_address || !/^\d{6}$/.test(data.delivery_pincode)) {
        throw new Error("Please complete the home delivery address and valid mobile/PIN code.");
      }
    }

    if (data.document_submission_mode === "online") {
      const common = data.services.some((service) => service !== "Income Certificate");
      const income = data.services.includes("Income Certificate");

      if (common) {
        validateFile(files.aadhaar, "Caste / Domicile Aadhaar Card");
        validateFile(files.letter, "Caste / Domicile Sabhasad / Pradhan Letter Pad");
        validateFile(files.photo, "Caste / Domicile Passport Size Photo", { imageOnly: true });
      }

      if (income) {
        validateFile(files.income_aadhaar, "Income Certificate Aadhaar Front + Back", { pdfOnly: true });
        validateFile(files.income_letter, "Income Certificate Sabhasad / Pradhan Letter Pad");
        validateFile(files.income_photo, "Income Certificate Passport Size Photo", { imageOnly: true });
      }

      if (files.extra) validateFile(files.extra, "Extra Document");
    }
  }

  async function postJson(url, payload) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-store",
      credentials: "omit",
      headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
      body: JSON.stringify(payload)
    });
    let result;
    try { result = await response.json(); } catch { throw new Error("The certificate server returned an invalid response."); }
    if (!response.ok || !result?.success) throw new Error(result?.message || "The request could not be completed.");
    return result;
  }

  const createOrder = (data) => postJson(`${CERTIFICATE_API_BASE}/create-order.php`, data);
  const verifyPayment = (requestId, payment) => postJson(`${CERTIFICATE_API_BASE}/verify-payment.php`, {
    request_id: requestId,
    razorpay_order_id: payment.razorpay_order_id,
    razorpay_payment_id: payment.razorpay_payment_id,
    razorpay_signature: payment.razorpay_signature
  });

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) { resolve(null); return; }
      if (file.size > MAX_FILE_SIZE_BYTES) { reject(new Error(`${file.name} must be under 1.5 MB.`)); return; }
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
      reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
      reader.readAsDataURL(file);
    });
  }

  async function buildFilesPayload(files) {
    const payload = {};
    for (const [key, value] of Object.entries(files)) payload[key] = await fileToBase64(value);
    return payload;
  }

  async function uploadDocuments(requestId, uploadToken, files) {
    const payload = await buildFilesPayload(files);
    const response = await fetch(CERTIFICATE_DRIVE_API_URL, {
      method: "POST",
      redirect: "follow",
      cache: "no-store",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "uploadCertificateDocuments",
        data: { requestId, uploadToken },
        files: payload
      })
    });
    const text = await response.text();
    let result;
    try { result = JSON.parse(text); } catch { throw new Error("Google Drive upload service returned an invalid response."); }
    if (!result?.success) throw new Error(result?.message || "Document upload failed.");
    return result;
  }

  function setSuccess(requestId, data) {
    const box = $("#certSuccess");
    if (!box) return;
    const trackUrl = `up-certificate-status.html?request_id=${encodeURIComponent(requestId)}`;
    const documents = data.document_submission_mode === "offline" ? "Submit offline" : "Uploaded online";
    const delivery = data.home_delivery ? "Home delivery requested" : "Digital copy only";
    const incomeMeta = data.services.includes("Income Certificate")
      ? `<div class="success-meta-row"><span>Income Certificate For</span><strong>${escapeHtml(data.income_for === "father" ? "Father" : "Self")}</strong></div>`
      : "";

    box.dataset.requestId = requestId;
    box.innerHTML = `<div class="success-title"><i class="fas fa-circle-check"></i> Application submitted successfully</div>
      <div class="success-meta">
        <div class="success-meta-row"><span>Request ID</span><strong>${escapeHtml(requestId)}</strong></div>
        <div class="success-meta-row"><span>Documents</span><strong>${documents}</strong></div>
        ${incomeMeta}
        <div class="success-meta-row"><span>Delivery</span><strong>${delivery}</strong></div>
      </div>
      <p>Please save your Request ID. Use it with your registered mobile number to track the request.</p>
      <div class="cert-success-actions">
        <button class="btn copy-success" type="button" data-cert-action="copy-request"><i class="fas fa-copy"></i> Copy Request ID</button>
        <a class="btn btn-primary" href="${trackUrl}"><i class="fas fa-route"></i> Track Application</a>
        <button class="btn btn-light" type="button" data-cert-action="new-application"><i class="fas fa-plus"></i> Start New Application</button>
      </div>`;
    box.classList.add("show");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function openRazorpay(order, files, data) {
    return new Promise((resolve, reject) => {
      if (typeof window.Razorpay !== "function") {
        reject(new Error("Secure payment service could not be loaded."));
        return;
      }

      let completed = false;
      const razorpay = new window.Razorpay({
        key: order.razorpay_key_id,
        amount: order.amount,
        currency: order.currency,
        name: order.name || "GovJobUpdates",
        description: order.description || "UP Certificate Assistance",
        order_id: order.razorpay_order_id,
        prefill: order.prefill || {},
        modal: {
          ondismiss() {
            if (!completed) {
              setProgress("", false);
              setSubmitState("ready");
            }
          }
        },
        handler: async function (payment) {
          completed = true;
          try {
            setSubmitState("verifying");
            setProgress("Payment received. Verifying securely...");
            const verified = await verifyPayment(order.request_id, payment);

            if (verified.next_action === "upload_documents") {
              verifiedPayment = {
                requestId: verified.request_id,
                uploadToken: verified.upload_token,
                files,
                data
              };
              setSubmitState("uploading");
              setProgress("Payment verified. Uploading documents...");
              const uploaded = await uploadDocuments(verifiedPayment.requestId, verifiedPayment.uploadToken, files);
              verifiedPayment = null;
              setProgress("", false);
              setSuccess(uploaded.request_id || order.request_id, data);
              resolve(uploaded);
            } else {
              setProgress("", false);
              setSuccess(order.request_id, data);
              resolve(verified);
            }
          } catch (error) {
            setProgress("", false);
            if (verifiedPayment) {
              setError("Payment is verified, but document upload could not finish. Do not pay again. Click Retry Document Upload. " + (error.message || ""));
              setSubmitState("retry");
            } else {
              setError(error.message || "Payment verification failed.");
              setSubmitState("ready");
            }
            reject(error);
          }
        }
      });

      razorpay.on("payment.failed", function (response) {
        completed = true;
        setProgress("", false);
        setSubmitState("ready");
        const message = response?.error?.description || response?.error?.reason || "Payment failed or was not completed.";
        setError(message);
        reject(new Error(message));
      });
      razorpay.open();
    });
  }

  async function retryVerifiedUpload() {
    if (!verifiedPayment || uploadInProgress) return;
    uploadInProgress = true;
    clearMessages();
    setSubmitState("uploading");
    setProgress("Retrying document upload. No additional payment will be taken...");
    try {
      const files = selectedFiles();
      validateApplication(verifiedPayment.data, files);
      const uploaded = await uploadDocuments(verifiedPayment.requestId, verifiedPayment.uploadToken, files);
      const requestId = uploaded.request_id || verifiedPayment.requestId;
      const data = verifiedPayment.data;
      verifiedPayment = null;
      setProgress("", false);
      setSuccess(requestId, data);
      setSubmitState("ready");
    } catch (error) {
      setProgress("", false);
      setError("Your payment remains verified. Document upload is still incomplete. " + (error.message || "Please try again."));
      setSubmitState("retry");
    } finally {
      uploadInProgress = false;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (verifiedPayment) {
      await retryVerifiedUpload();
      return;
    }

    clearMessages();
    const data = collectApplicationData();
    const files = selectedFiles();

    try { validateApplication(data, files); }
    catch (error) { setError(error.message); return; }

    setSubmitState("creating");
    if (!pricingReady) {
      throw new Error("Live pricing is still loading. Please wait a moment and try again.");
    }
    setProgress(`Creating your secure ${money(currentTotalPaise())} payment order...`);

    try {
      const order = await createOrder(data);
      if (Number(order.amount) !== currentTotalPaise() || String(order.currency || "").toUpperCase() !== "INR") {
        throw new Error("The payment amount returned by the server is invalid.");
      }
      setProgress("Secure payment window is opening...");
      await openRazorpay(order, files, data);
    } catch (error) {
      if (!verifiedPayment) {
        setProgress("", false);
        setError(error.message || "Could not start the payment.");
        setSubmitState("ready");
      }
    }
  }

  async function copyRequestId() {
    const success = $("#certSuccess");
    const requestId = clean(success?.dataset.requestId);
    if (!requestId) return;
    try { await navigator.clipboard.writeText(requestId); }
    catch { window.prompt("Copy your Request ID:", requestId); }
  }

  function startNewApplication() {
    verifiedPayment = null;
    uploadInProgress = false;
    $("#upCertificateForm")?.reset();
    const success = $("#certSuccess");
    if (success) {
      success.classList.remove("show");
      success.innerHTML = "";
    }
    clearMessages();
    refreshUI();
    $("#certificateForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSuccessActions(event) {
    const target = event.target.closest("[data-cert-action]");
    if (!target) return;
    if (target.dataset.certAction === "copy-request") copyRequestId();
    if (target.dataset.certAction === "new-application") startNewApplication();
  }

  function init() {
    loadPricing().catch((error) => {
      pricingReady = false;
      setError(error.message || "Live certificate pricing could not be loaded.");
      setSubmitState("ready");
    });
    $("#upCertificateForm")?.addEventListener("submit", handleSubmit);
    $("#certSuccess")?.addEventListener("click", handleSuccessActions);
    $$('#serviceChoices input, input[name="incomeFor"], #onlineDocumentsToggle, #homeDeliveryToggle')
      .forEach((element) => element.addEventListener("change", refreshUI));
    refreshUI();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
