(function () {
  "use strict";

  const C = window.GJUCert;
  if (!C) { console.error("up-certificate-common.js must load before this script."); return; }
  const CERTIFICATE_API_BASE = C.API_BASE;
  const DEFAULT_SERVICE_FEE_PAISE = 11000;
  const DEFAULT_DELIVERY_FEE_PAISE = 5000;
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
  const EWS_SERVICES = ["EWS Central Certificate", "EWS State Certificate"];
  const isCommonSetService = (service) => service !== "Income Certificate" && service !== "PAN Card" && !EWS_SERVICES.includes(service);
  function hasCasteOrDomicile() { return selectedServices().some(isCommonSetService); }
  function hasEws() { return selectedServices().some((service) => EWS_SERVICES.includes(service)); }
  function hasPan() { return selectedServices().includes("PAN Card"); }
  function isPanOnly() { const s = selectedServices(); return s.length > 0 && s.every((x) => x === "PAN Card"); }
  const validPersonName = C.validPersonName;
  function panType() { return clean($('input[name="panType"]:checked')?.value).toLowerCase(); }
  function incomeFor() { return clean($('input[name="incomeFor"]:checked')?.value).toLowerCase(); }
  function onlineDocuments() { return Boolean($("#onlineDocumentsToggle")?.checked); }
  // PAN Card is delivered directly by the PAN provider: no home-delivery option / fee when PAN is the only service.
  function homeDelivery() { return !isPanOnly() && Boolean($("#homeDeliveryToggle")?.checked); }

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
    if (message) box.scrollIntoView({ behavior: "smooth", block: "center" });
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
    const ews = hasEws();
    const pan = hasPan();
    const online = onlineDocuments();
    const delivery = homeDelivery();

    const serviceFee = currentServiceFeePaise();
    const deliveryFee = delivery ? Number(pricing.delivery_fee_paise || 0) : 0;
    if ($("#serviceFeeDisplay")) $("#serviceFeeDisplay").textContent = money(serviceFee);
    if ($("#deliveryFeeDisplay")) $("#deliveryFeeDisplay").textContent = money(deliveryFee);
    if ($("#totalFeeDisplay")) $("#totalFeeDisplay").textContent = money(serviceFee + deliveryFee);

    $("#incomeForSection")?.toggleAttribute("hidden", !income);
    $$('input[name="incomeFor"]').forEach((radio) => { radio.required = income; });

    $("#panTypeSection")?.toggleAttribute("hidden", !pan);
    $$('input[name="panType"]').forEach((radio) => { radio.required = pan; });

    $("#onlineDocumentsArea")?.toggleAttribute("hidden", !online);
    $("#offlineDocumentsNote")?.toggleAttribute("hidden", online);
    $("#commonDocumentsSection")?.toggleAttribute("hidden", !common);
    $("#incomeDocumentsSection")?.toggleAttribute("hidden", !income);
    $("#ewsDocumentsSection")?.toggleAttribute("hidden", !ews);
    $("#panDocumentsSection")?.toggleAttribute("hidden", !pan);

    setRequired("privacyConsent", online);
    setRequired("aadhaarFile", online && common);
    setRequired("letterFile", online && common);
    setRequired("photoFile", online && common);
    setRequired("incomeAadhaarFile", online && income);
    setRequired("incomeLetterFile", online && income);
    setRequired("incomePhotoFile", online && income);
    setRequired("ewsAadhaarFile", online && ews);
    setRequired("ewsPhotoFile", online && ews);
    setRequired("ewsIncomeFile", online && ews);
    setRequired("panAadhaarFile", online && pan);
    setRequired("panPhotoFile", online && pan);
    setRequired("panSignatureFile", online && pan);
    const panNew = pan && panType() === "new";
    const panCorr = pan && panType() === "correction";
    $("#panNewDocs")?.toggleAttribute("hidden", !panNew);
    $("#panCorrectionDocs")?.toggleAttribute("hidden", !panCorr);
    setRequired("panIdProofType", online && panNew);
    setRequired("panIdProofFile", online && panNew);
    setRequired("panCopyType", online && panCorr);
    setRequired("panCopyFile", online && panCorr);
    setRequired("panAuthorityType", online && panCorr);
    setRequired("panAuthorityFile", online && panCorr);

    if ($("#offlineRequiredDocuments")) {
      const groups = [];
      if (common) groups.push("Caste/Domicile: Aadhaar Card, Sabhasad/Pradhan Letter Pad and Passport Size Photo");
      if (income) groups.push(`Income (${incomeFor() === "father" ? "Father" : incomeFor() === "self" ? "Self" : "select Self/Father"}): separate Aadhaar front + back single PDF/print set, separate Sabhasad/Pradhan Letter Pad and separate Passport Size Photo`);
      if (ews) groups.push("EWS (Central/State): Aadhaar front + back single PDF/print set, recent Passport Size Photo and Income Certificate");
      if (pan) groups.push(`PAN Card (${panType() === "correction" ? "Correction / Update" : panType() === "new" ? "New PAN" : "select New/Correction"}): Aadhaar front + back single PDF/print set, recent Passport Size Photo and Signature on white paper${panType() === "correction" ? ", additional documents: PAN Card / FIR / PAN Card Letter and MLA / MP Letter Pad" : panType() === "new" ? ", plus one additional proof (Voter ID / Driving Licence / Passport / Domicile Certificate / High School Marksheet / Bank Passbook)" : ""}`);
      $("#offlineRequiredDocuments").textContent = groups.length
        ? `Required documents — ${groups.join(". ")}.`
        : "Select at least one certificate to see the required documents.";
    }
    $("#offlineIncomePhoneNote")?.toggleAttribute("hidden", !(income || ews || pan));

    const noDelivery = isPanOnly();
    if (noDelivery && $("#homeDeliveryToggle")) $("#homeDeliveryToggle").checked = false;
    $("#deliveryToggleCard")?.toggleAttribute("hidden", noDelivery);
    $("#panNoDeliveryNote")?.toggleAttribute("hidden", !pan);
    const panNote = $("#panNoDeliveryText");
    if (panNote) panNote.innerHTML = noDelivery
      ? 'PAN Card is delivered directly to you by the PAN service provider, so there is <strong>no delivery fee</strong> for PAN Card. <span lang="hi">PAN Card की कोई डिलीवरी फीस नहीं है।</span>'
      : 'Home delivery below is only for your other certificates. PAN Card is delivered directly by the PAN service provider, so <strong>PAN has no delivery fee</strong>. <span lang="hi">PAN Card की डिलीवरी फीस नहीं लगेगी।</span>';
    $("#deliveryAddressArea")?.toggleAttribute("hidden", !delivery);
    ["deliveryName", "deliveryMobile", "deliveryAddress", "deliveryPincode"].forEach((id) => setRequired(id, delivery));

    // PAN needs the father's name only (never husband). Mother's name is required for every certificate, PAN included.
    const panOnly = isPanOnly();
    const fatherLabel = $("#fatherLabel");
    if (fatherLabel) fatherLabel.textContent = panOnly ? "Father\u2019s Name" : "Father / Husband Name";
    const fatherInput = $("#fatherName");
    if (fatherInput) fatherInput.placeholder = panOnly ? "Father\u2019s full name" : "Father or husband name";
    const mobileLabel = $("#mobileLabel");
    if (mobileLabel) mobileLabel.textContent = panOnly ? "Active mobile number" : "Aadhaar-linked mobile number";
    const mobileHelp = $("#mobileHelp");
    if (mobileHelp) mobileHelp.textContent = panOnly ? "We will contact you on this number about your PAN request." : "The OTP for Aadhaar authentication goes to this number.";
    $("#motherRow")?.toggleAttribute("hidden", false);
    setRequired("motherName", true);
    applyPanLock(hasPan() && !panType());

    setSubmitState("ready");
  }

  // Step-by-step reveal: steps 2-5 stay hidden until a certificate is chosen (and PAN type, for PAN),
  // then open one at a time via the Continue buttons. Once opened, a step stays open until selection is cleared.
  let stageReached = 1;
  const STEP2_IDS = ["applicantName", "fatherName", "motherName", "mobileNumber", "emailId", "district", "tehsil"];
  function renderStages(scrollToStep) {
    const form = $("#upCertificateForm");
    const anchor = $("#panLockHint");
    if (!form || !anchor) return;
    let after = false, step = 2;
    for (const el of form.children) {
      if (el === anchor) { after = true; continue; }
      if (!after) continue;
      if (el.dataset && el.dataset.step) step = Number(el.dataset.step);
      const isNext = el.classList.contains("cert-next");
      const hide = isNext ? !(Number(el.dataset.from) === stageReached) : step > stageReached;
      el.classList.toggle("cert-stage-hidden", hide);
    }
    if (scrollToStep) {
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      $('.cert-step-head[data-step="' + scrollToStep + '"]')?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }
  function applyPanLock(panLocked) {
    const anchor = $("#panLockHint");
    const hasService = $$('input[name="services"]:checked').length > 0;
    const open = hasService && !panLocked;
    const prev = stageReached;
    if (!open) stageReached = 1;
    else if (stageReached < 2) stageReached = 2;
    if (anchor) {
      anchor.hidden = open || !hasService;
    }
    renderStages(prev < 2 && stageReached === 2 ? 2 : 0);
  }
  function advanceFrom(from) {
    if (stageReached !== from) return;
    if (from === 2) {
      for (const id of STEP2_IDS) {
        const el = document.getElementById(id);
        if (el && !el.checkValidity()) { el.reportValidity(); el.focus(); return; }
      }
      stageReached = 3;
      renderStages(3);
    } else if (from === 3) {
      stageReached = 5;
      renderStages(4);
    }
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest && e.target.closest(".cert-next-btn");
    if (btn) advanceFrom(Number(btn.closest(".cert-next").dataset.from));
  });

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
    if (!pricingReady) {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Live Pricing...';
      return;
    }
    if (!selectedServices().length) {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-hand-pointer"></i> Select a certificate to continue';
      return;
    }
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-lock"></i> Pay ${money(currentTotalPaise())} &amp; Submit Application`;
  }

  function collectApplicationData() {
    return {
      services: selectedServices(),
      income_for: hasIncome() ? incomeFor() : "",
      pan_type: hasPan() ? panType() : "",
      pan_id_proof_type: hasPan() && panType() === "new" ? clean($("#panIdProofType")?.value) : "",
      pan_copy_type: hasPan() && panType() === "correction" ? clean($("#panCopyType")?.value) : "",
      pan_authority_type: hasPan() && panType() === "correction" ? clean($("#panAuthorityType")?.value) : "",
      applicant_name: clean($("#applicantName")?.value),
      father_husband_name: clean($("#fatherName")?.value),
      mother_name: clean($("#motherName")?.value),
      refund_policy_ack: Boolean($("#refundConsent")?.checked),
      privacy_ack: onlineDocuments() && Boolean($("#privacyConsent")?.checked),
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
      ews_aadhaar: $("#ewsAadhaarFile")?.files?.[0] || null,
      ews_photo: $("#ewsPhotoFile")?.files?.[0] || null,
      ews_income: $("#ewsIncomeFile")?.files?.[0] || null,
      pan_aadhaar: $("#panAadhaarFile")?.files?.[0] || null,
      pan_photo: $("#panPhotoFile")?.files?.[0] || null,
      pan_signature: $("#panSignatureFile")?.files?.[0] || null,
      pan_id_proof: hasPan() && panType() === "new" ? ($("#panIdProofFile")?.files?.[0] || null) : null,
      pan_card_copy: hasPan() && panType() === "correction" ? ($("#panCopyFile")?.files?.[0] || null) : null,
      pan_authority_letter: hasPan() && panType() === "correction" ? ($("#panAuthorityFile")?.files?.[0] || null) : null,
      extra: $("#extraFile")?.files?.[0] || null
    };
  }

  function validateFile(file, label, options = {}) {
    if (!file) throw new Error(`${label} is required.`);
    if (file.size <= 0) throw new Error(`${label} is empty.`);
    const type = String(file.type || "").toLowerCase();
    const isPdf = type === "application/pdf" || /\.pdf$/i.test(file.name || "");
    if (options.pdfOnly && !isPdf) throw new Error(`${label} must be a PDF file.`);
    if (options.imageOnly && isPdf) throw new Error(`${label} must be an image file.`);
    if (isPdf && file.size > C.LIMIT) throw new Error(`${label} (PDF) must be under 1.5 MB.`);
    if (!isPdf && file.size > 25 * 1024 * 1024) throw new Error(`${label} is too large (max 25 MB).`);
  }

  function validateApplication(data, files) {
    if (!data.services.length) throw new Error("Please select at least one certificate service.");
    if (data.services.includes("Income Certificate") && !["self", "father"].includes(data.income_for)) {
      throw new Error("Please select whether the Income Certificate is for Self or Father.");
    }
    if (data.services.includes("PAN Card") && !["new", "correction"].includes(data.pan_type)) {
      throw new Error("Please select whether the PAN Card request is for New PAN or Correction / Update.");
    }
    const panOnly = data.services.length > 0 && data.services.every((x) => x === "PAN Card");
    if (!data.applicant_name || !data.father_husband_name || !data.mother_name || !data.mobile || !data.email || !data.district || !data.tehsil) {
      throw new Error("Please fill all required applicant details.");
    }
    if (!validPersonName(data.applicant_name)) throw new Error("Applicant name should contain letters only.");
    if (!validPersonName(data.father_husband_name)) throw new Error(panOnly ? "Father\u2019s name should contain letters only." : "Father / Husband name should contain letters only.");
    if (!validPersonName(data.mother_name)) throw new Error("Mother\u2019s name should contain letters only.");
    if (!data.refund_policy_ack) throw new Error("Please tick the refund rule box to continue.");
    if (data.document_submission_mode === "online" && !data.privacy_ack) throw new Error("Please tick the document storage notice to upload documents online.");
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
      const common = data.services.some(isCommonSetService);
      const income = data.services.includes("Income Certificate");
      const ews = data.services.some((service) => EWS_SERVICES.includes(service));
      const pan = data.services.includes("PAN Card");

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

      if (ews) {
        validateFile(files.ews_aadhaar, "EWS Aadhaar Front + Back", { pdfOnly: true });
        validateFile(files.ews_photo, "EWS Recent Passport Size Photo", { imageOnly: true });
        validateFile(files.ews_income, "EWS Income Certificate");
      }

      if (pan) {
        validateFile(files.pan_aadhaar, "PAN Aadhaar Front + Back", { pdfOnly: true });
        validateFile(files.pan_photo, "PAN Recent Passport Size Photo", { imageOnly: true });
        validateFile(files.pan_signature, "PAN Signature", { imageOnly: true });
        if (data.pan_type === "new") {
          if (!data.pan_id_proof_type) throw new Error("Please select the second proof type for New PAN.");
          validateFile(files.pan_id_proof, "PAN Second Proof");
        } else if (data.pan_type === "correction") {
          if (!data.pan_copy_type) throw new Error("Please select whether you are uploading the PAN Card, FIR or PAN Card Letter.");
          if (!data.pan_authority_type) throw new Error("Please select MLA Letter Pad or MP Letter Pad.");
          validateFile(files.pan_card_copy, "Additional Document: PAN Card / FIR / PAN Card Letter");
          validateFile(files.pan_authority_letter, "Additional Document: MLA / MP Letter Pad");
        }
      }

      if (files.extra) validateFile(files.extra, "Extra Document");
    }
  }

  const createOrder = (data) => C.postJson("create-order.php", data);
  const verifyPayment = (requestId, payment) => C.verifyPayment(requestId, payment);
  const uploadDocuments = (requestId, uploadToken, files) => C.uploadDocuments(requestId, uploadToken, files, (p) => setProgress(`Uploading documents (${p.index} of ${p.total})...`));

  const FILE_RULES = {
    aadhaar: ["Caste / Domicile Aadhaar Card", {}], letter: ["Caste / Domicile Sabhasad / Pradhan Letter Pad", {}], photo: ["Caste / Domicile Passport Size Photo", { imageOnly: true }],
    income_aadhaar: ["Income Certificate Aadhaar Front + Back", { pdfOnly: true }], income_letter: ["Income Certificate Sabhasad / Pradhan Letter Pad", {}], income_photo: ["Income Certificate Passport Size Photo", { imageOnly: true }],
    ews_aadhaar: ["EWS Aadhaar Front + Back", { pdfOnly: true }], ews_photo: ["EWS Recent Passport Size Photo", { imageOnly: true }], ews_income: ["EWS Income Certificate", {}],
    pan_aadhaar: ["PAN Aadhaar Front + Back", { pdfOnly: true }], pan_photo: ["PAN Recent Passport Size Photo", { imageOnly: true }], pan_signature: ["PAN Signature", { imageOnly: true }],
    pan_id_proof: ["PAN Second Proof", {}], pan_card_copy: ["Additional Document: PAN Card / FIR / PAN Card Letter", {}], pan_authority_letter: ["Additional Document: MLA / MP Letter Pad", {}],
    extra: ["Extra Document", {}]
  };

  /** Checks the real file bytes and shrinks big phone photos BEFORE any money is taken. */
  async function prepareAll(files) {
    const out = {};
    for (const [key, file] of Object.entries(files)) {
      if (!file) { out[key] = null; continue; }
      const [label, opts] = FILE_RULES[key] || [key, {}];
      out[key] = await C.prepareFile(file, label, opts);
    }
    return out;
  }

  function setSuccess(requestId, data) {
    const box = $("#certSuccess");
    if (!box) return;
    const trackUrl = `up-certificate-status.html?request_id=${encodeURIComponent(requestId)}`;
    const documents = data.document_submission_mode === "offline" ? "Submit offline" : "Uploaded online";
    const delivery = data.home_delivery ? "Home delivery requested" : "Digital copy only";
    const incomeMeta = (data.services.includes("Income Certificate")
      ? `<div class="success-meta-row"><span>Income Certificate For</span><strong>${escapeHtml(data.income_for === "father" ? "Father" : "Self")}</strong></div>`
      : "") + (data.services.includes("PAN Card")
      ? `<div class="success-meta-row"><span>PAN Card Request</span><strong>${escapeHtml(data.pan_type === "correction" ? "Correction / Update" : "New PAN")}</strong></div>`
      : "");

    box.dataset.requestId = requestId;
    box.innerHTML = `<div class="success-title"><i class="fas fa-circle-check"></i> Application submitted successfully</div>
      <div class="success-meta">
        <div class="success-meta-row"><span>Request ID</span><strong>${escapeHtml(requestId)}</strong></div>
        <div class="success-meta-row"><span>Documents</span><strong>${documents}</strong></div>
        ${incomeMeta}
        <div class="success-meta-row"><span>Delivery</span><strong>${delivery}</strong></div>
      </div>
      <p>Please save your Request ID. Use it with your registered mobile number to track the request.</p>
      <p class="success-refund-note"><i class="fas fa-circle-info"></i> Reminder: once the status changes to Processing, the fee is non-refundable.</p>
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

            // The server decides the next step. Older responses had no next_action, so also fall back to
            // "online request + upload token issued" instead of silently skipping the document upload.
            const mustUpload = verified.next_action === "upload_documents"
              || (verified.document_submission_mode === "online" && !!verified.upload_token);
            if (mustUpload && verified.upload_token) {
              verifiedPayment = {
                requestId: verified.request_id,
                uploadToken: verified.upload_token,
                files,
                data
              };
              C.savePending(verified.request_id);
              setSubmitState("uploading");
              setProgress("Payment verified. Uploading documents...");
              const uploaded = await uploadDocuments(verifiedPayment.requestId, verifiedPayment.uploadToken, files);
              verifiedPayment = null;
              C.clearPending();
              setProgress("", false);
              setSuccess(uploaded.request_id || order.request_id, data);
              resolve(uploaded);
            } else {
              setProgress("", false);
              setSuccess(order.request_id, data);
              if (verified.document_submission_mode === "online" && verified.can_resume_upload) {
                // Paid, but this response carried no upload token (e.g. a repeated verify call).
                C.savePending(order.request_id);
                setError("Payment verified, but your documents are not uploaded yet. Do NOT pay again. Open Track Application > Resume document upload (Request ID " + order.request_id + ") to finish.");
              }
              resolve(verified);
            }
          } catch (error) {
            setProgress("", false);
            if (verifiedPayment) {
              setError("Payment is verified, but document upload could not finish. Do NOT pay again. Click Retry Document Upload. You can also finish later from Track Application > Resume document upload (Request ID " + order.request_id + "). " + (error.message || ""));
              setSubmitState("retry");
            } else {
              setError(`We could not confirm your payment right now. If money was deducted, do NOT pay again - it is matched to your request automatically. Save your Request ID ${order.request_id} and check Track Application after a few minutes.`);
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
      const files = verifiedPayment.files;
      const uploaded = await uploadDocuments(verifiedPayment.requestId, verifiedPayment.uploadToken, files);
      const requestId = uploaded.request_id || verifiedPayment.requestId;
      const data = verifiedPayment.data;
      verifiedPayment = null;
      C.clearPending();
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
    let files = selectedFiles();

    try {
      validateApplication(data, files);
      if (data.document_submission_mode === "online") {
        setSubmitState("creating");
        setProgress("Checking and optimising your documents...");
        files = await prepareAll(files);
        setProgress("", false);
      }
    } catch (error) { setProgress("", false); setError(error.message); setSubmitState("ready"); return; }

    if (!pricingReady) {
      setError("Live pricing is still loading. Please wait a moment and try again.");
      return;
    }
    setSubmitState("creating");
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

  function showResumeBanner() {
    const banner = $("#resumeBanner");
    const pending = C.loadPending();
    if (!banner || !pending) return;
    const link = `up-certificate-status.html?request_id=${encodeURIComponent(pending.requestId)}#resume`;
    banner.innerHTML = `<i class="fas fa-circle-exclamation" aria-hidden="true"></i><div><strong>You have a paid request waiting for documents (${escapeHtml(pending.requestId)}).</strong><br>Do not pay again. <a href="${link}">Resume document upload</a> &middot; <button type="button" id="dismissResume">Dismiss</button></div>`;
    banner.hidden = false;
    $("#dismissResume")?.addEventListener("click", () => { C.clearPending(); banner.hidden = true; });
  }

  function init() {
    showResumeBanner();
    loadPricing().catch((error) => {
      pricingReady = false;
      setError(error.message || "Live certificate pricing could not be loaded.");
      setSubmitState("ready");
    });
    $("#upCertificateForm")?.addEventListener("submit", handleSubmit);
    $("#certSuccess")?.addEventListener("click", handleSuccessActions);
    $$('#serviceChoices input, input[name="incomeFor"], input[name="panType"], #onlineDocumentsToggle, #homeDeliveryToggle, #refundConsent')
      .forEach((element) => element.addEventListener("change", refreshUI));
    refreshUI();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());