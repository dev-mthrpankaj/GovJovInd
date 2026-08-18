(function () {
  "use strict";

  const CERTIFICATE_API_BASE =
    "https://test.govjobupdates.com/live-test/certificate-api";

  const CERTIFICATE_DRIVE_API_URL =
    "https://script.google.com/macros/s/AKfycbxDgRkmo0ZxktOZGdArFW-7APDT68ZJpETTvLSsaS4rD6h52TcB-lL-iJtypwg5gttPcQ/exec";

  const FEE_AMOUNT_PAISE = 11000;
  const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024;

  const ALLOWED_DOCUMENT_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
  ]);

  const $ = (selector) => document.querySelector(selector);

  let verifiedPayment = null;
  let uploadInProgress = false;

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function validateMobile(value) {
    return /^[6-9]\d{9}$/.test(value);
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

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

  function setSuccess(requestId) {
    const success = $("#certSuccess");
    if (!success) return;

    success.innerHTML = `
      <div class="success-title">
        <i class="fas fa-circle-check" aria-hidden="true"></i>
        Application submitted successfully
      </div>
      <div>Your ₹110 payment has been verified and the selected documents have been uploaded successfully.</div>
      <div>Your Request ID is:</div>
      <div class="request-id">${escapeHtml(requestId)}</div>
      <div>Please save this Request ID for future reference.</div>
    `;
    success.classList.add("show");
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function setSubmitState(mode) {
    const btn = $("#certSubmitBtn");
    if (!btn) return;

    if (mode === "creating") {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Preparing Secure Payment...';
      return;
    }

    if (mode === "verifying") {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Verifying Payment...';
      return;
    }

    if (mode === "uploading") {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Uploading Documents...';
      return;
    }

    if (mode === "retry") {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-rotate-right" aria-hidden="true"></i> Retry Document Upload';
      return;
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-lock" aria-hidden="true"></i> Pay ₹110 &amp; Submit Application';
  }

  function collectApplicationData() {
    return {
      service_type: clean($("#serviceType")?.value),
      applicant_name: clean($("#applicantName")?.value),
      father_husband_name: clean($("#fatherName")?.value),
      mobile: clean($("#mobileNumber")?.value),
      email: clean($("#emailId")?.value),
      district: clean($("#district")?.value),
      tehsil: clean($("#tehsil")?.value),
      address: clean($("#address")?.value),
      aadhaar_last4: clean($("#aadhaarLast4")?.value),
      extra_note: clean($("#extraNote")?.value)
    };
  }

  function selectedFiles() {
    return {
      aadhaar: $("#aadhaarFile")?.files?.[0] || null,
      letter: $("#letterFile")?.files?.[0] || null,
      photo: $("#photoFile")?.files?.[0] || null,
      extra: $("#extraFile")?.files?.[0] || null
    };
  }

  function validateApplication(data, files) {
    if (
      !data.service_type ||
      !data.applicant_name ||
      !data.father_husband_name ||
      !data.mobile ||
      !data.email ||
      !data.district ||
      !data.tehsil ||
      !data.address
    ) {
      throw new Error("Please fill all required applicant details.");
    }

    if (!validateMobile(data.mobile)) {
      throw new Error("Please enter a valid 10 digit Indian mobile number.");
    }

    if (!validateEmail(data.email)) {
      throw new Error("Please enter a valid email address.");
    }

    if (data.aadhaar_last4 && !/^\d{4}$/.test(data.aadhaar_last4)) {
      throw new Error("Aadhaar last 4 digits must contain exactly 4 numbers.");
    }

    if (!files.aadhaar || !files.letter || !files.photo) {
      throw new Error("Please select Aadhaar Card, Sabhasad/Pradhan Letter Pad and Passport Size Photo.");
    }

    validateFile(files.aadhaar, "Aadhaar Card", false);
    validateFile(files.letter, "Letter Pad", false);
    validateFile(files.photo, "Passport Size Photo", true);

    if (files.extra) {
      validateFile(files.extra, "Extra Document", false);
    }
  }

  function validateFile(file, label, imageOnly) {
    if (!file) {
      throw new Error(`${label} is required.`);
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`${label} must be under 1.5 MB.`);
    }

    if (imageOnly) {
      if (!String(file.type || "").startsWith("image/")) {
        throw new Error(`${label} must be an image file.`);
      }
      return;
    }

    if (!ALLOWED_DOCUMENT_TYPES.has(String(file.type || "").toLowerCase())) {
      throw new Error(`${label} must be JPG, PNG, WEBP or PDF.`);
    }
  }

  async function postJson(url, payload) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-store",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify(payload)
    });

    let result = null;
    try {
      result = await response.json();
    } catch {
      throw new Error("The certificate server returned an invalid response.");
    }

    if (!response.ok || !result || !result.success) {
      throw new Error(result?.message || "The request could not be completed.");
    }

    return result;
  }

  async function createOrder(data) {
    return postJson(`${CERTIFICATE_API_BASE}/create-order.php`, data);
  }

  async function verifyPayment(requestId, paymentResponse) {
    return postJson(`${CERTIFICATE_API_BASE}/verify-payment.php`, {
      request_id: requestId,
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_signature: paymentResponse.razorpay_signature
    });
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        reject(new Error(`${file.name} must be under 1.5 MB.`));
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

      reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
      reader.readAsDataURL(file);
    });
  }

  async function buildFilesPayload(files) {
    return {
      aadhaar: await fileToBase64(files.aadhaar),
      letter: await fileToBase64(files.letter),
      photo: await fileToBase64(files.photo),
      extra: await fileToBase64(files.extra)
    };
  }

  async function uploadDocuments(requestId, uploadToken, files) {
    const filesPayload = await buildFilesPayload(files);

    const response = await fetch(CERTIFICATE_DRIVE_API_URL, {
      method: "POST",
      redirect: "follow",
      cache: "no-store",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "uploadCertificateDocuments",
        data: {
          requestId,
          uploadToken
        },
        files: filesPayload
      })
    });

    const text = await response.text();
    let result;

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Google Drive upload service returned an invalid response.");
    }

    if (!result || !result.success) {
      throw new Error(result?.message || "Document upload failed.");
    }

    return result;
  }

  function openRazorpay(order, files) {
    return new Promise((resolve, reject) => {
      if (typeof window.Razorpay !== "function") {
        reject(new Error("Secure payment service could not be loaded. Please refresh the page and try again."));
        return;
      }

      let completed = false;

      const options = {
        key: order.razorpay_key_id,
        amount: order.amount,
        currency: order.currency,
        name: order.name || "GovJobUpdates",
        description: order.description || "UP Certificate Assistance",
        order_id: order.razorpay_order_id,
        prefill: order.prefill || {},
        theme: {},
        modal: {
          ondismiss: function () {
            if (!completed) {
              setProgress("", false);
              setSubmitState("ready");
            }
          }
        },
        handler: async function (paymentResponse) {
          completed = true;

          try {
            setSubmitState("verifying");
            setProgress("Payment received. Verifying it securely with the server...");

            const verified = await verifyPayment(order.request_id, paymentResponse);

            verifiedPayment = {
              requestId: verified.request_id,
              uploadToken: verified.upload_token,
              files
            };

            setSubmitState("uploading");
            setProgress("Payment verified. Uploading your selected documents securely...");

            const uploaded = await uploadDocuments(
              verifiedPayment.requestId,
              verifiedPayment.uploadToken,
              verifiedPayment.files
            );

            verifiedPayment = null;
            setProgress("", false);
            setError("");
            setSuccess(uploaded.request_id || order.request_id);

            const form = $("#upCertificateForm");
            if (form && typeof form.reset === "function") {
              form.reset();
            }

            setSubmitState("ready");
            resolve(uploaded);
          } catch (error) {
            setProgress("", false);

            if (verifiedPayment) {
              setError(
                "Your payment is already verified, but the document upload could not finish. Do not pay again. Check your selected files and click “Retry Document Upload”. " +
                (error.message || "")
              );
              setSubmitState("retry");
            } else {
              setError(error.message || "Payment verification failed. Please contact support if the amount was debited.");
              setSubmitState("ready");
            }

            reject(error);
          }
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        completed = true;
        setProgress("", false);
        setSubmitState("ready");

        const message =
          response?.error?.description ||
          response?.error?.reason ||
          "Payment failed or was not completed.";

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
      const currentFiles = selectedFiles();
      validateApplication(collectApplicationData(), currentFiles);

      const uploaded = await uploadDocuments(
        verifiedPayment.requestId,
        verifiedPayment.uploadToken,
        currentFiles
      );

      const requestId = uploaded.request_id || verifiedPayment.requestId;
      verifiedPayment = null;

      setProgress("", false);
      setSuccess(requestId);

      const form = $("#upCertificateForm");
      if (form && typeof form.reset === "function") {
        form.reset();
      }

      setSubmitState("ready");
    } catch (error) {
      setProgress("", false);
      setError(
        "Your payment remains verified. Document upload is still incomplete. Do not pay again. " +
        (error.message || "Please try again.")
      );
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

    try {
      validateApplication(data, files);
    } catch (error) {
      setError(error.message);
      return;
    }

    setSubmitState("creating");
    setProgress("Creating your secure ₹110 payment order...");

    try {
      const order = await createOrder(data);

      if (
        Number(order.amount) !== FEE_AMOUNT_PAISE ||
        String(order.currency || "").toUpperCase() !== "INR"
      ) {
        throw new Error("The payment amount returned by the server is invalid.");
      }

      setProgress("Secure payment window is opening...");
      await openRazorpay(order, files);
    } catch (error) {
      if (!verifiedPayment) {
        setProgress("", false);
        setError(error.message || "Could not start the payment. Please try again.");
        setSubmitState("ready");
      }
    }
  }

  function init() {
    $("#upCertificateForm")?.addEventListener("submit", handleSubmit);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
