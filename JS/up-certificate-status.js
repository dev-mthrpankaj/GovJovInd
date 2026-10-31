(function () {
  "use strict";

  const API_BASE = (window.GJU_CERT_CONFIG && window.GJU_CERT_CONFIG.apiBase) || "https://test.govjobupdates.com/live-test/certificate-api";
  const STATUS_API_URL = API_BASE + "/status.php";

  const $ = (selector) => document.querySelector(selector);

  const STATUS_MAP = {
    payment_pending: {
      title: "Payment Pending",
      pill: "Payment Pending",
      note: "Payment has not yet been verified for this request.",
      step: 0,
      className: ""
    },
    payment_verified: {
      title: "Payment Verified",
      pill: "Payment Verified",
      note: "Your payment has been verified. Document upload is pending or being completed.",
      step: 0,
      className: ""
    },
    awaiting_offline_documents: {
      title: "Awaiting Offline Documents",
      pill: "Submit Documents Offline",
      note: "Your payment is verified. Please submit the required documents offline. Keep your Request ID for tracking.",
      step: 0,
      className: "is-processing"
    },
    documents_uploaded: {
      title: "Application Received",
      pill: "Received",
      note: "We have received your payment and documents. Your request is waiting for submission/processing by our team.",
      step: 1,
      className: ""
    },
    under_review: {
      title: "Application Submitted",
      pill: "Submitted",
      note: "Your certificate assistance application has been submitted/forwarded for processing. Final approval remains with the concerned government authority. The fee is non-refundable from this stage.",
      step: 2,
      className: ""
    },
    processing: {
      title: "Processing",
      pill: "Processing",
      note: "Your application has been filed and is being processed. Please check again later for the next update. The fee is non-refundable from this stage.",
      step: 3,
      className: "is-processing"
    },
    completed: {
      title: "Completed",
      pill: "Completed",
      note: "Your GovJobUpdates certificate assistance request has been completed successfully.",
      step: 4,
      className: "is-completed"
    },
    rejected: {
      title: "Rejected",
      pill: "Rejected",
      note: "Your assistance request could not be completed. Please contact support with your Request ID for further information.",
      step: 2,
      className: "is-rejected"
    }
  };

  const STEPS = [
    {
      title: "Payment Verified",
      text: "Payment successfully verified."
    },
    {
      title: "Application Received",
      text: "Required documents received by GovJobUpdates."
    },
    {
      title: "Application Submitted",
      text: "Application submitted/forwarded for processing."
    },
    {
      title: "Processing",
      text: "Application is being processed."
    },
    {
      title: "Completed",
      text: "GovJobUpdates assistance request completed."
    }
  ];

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  }

  function serviceLabel(service) {
    let label = service.service_type || "Certificate";
    if (service.service_type === "Income Certificate" && service.beneficiary_type) label += ` (${service.beneficiary_type === "father" ? "Father" : "Self"})`;
    if (service.service_type === "PAN Card" && service.service_option) label += ` (${service.service_option === "correction" ? "Correction / Update" : "New PAN"})`;
    return label;
  }

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function validateMobile(value) {
    return /^[6-9]\d{9}$/.test(value);
  }

  function setMessage(message) {
    const box = $("#trackMessage");
    if (!box) return;
    box.textContent = message || "";
    box.classList.toggle("show", Boolean(message));
  }

  function setLoading(loading) {
    const button = $("#trackSubmitBtn");
    if (!button) return;
    button.disabled = loading;
    button.innerHTML = loading
      ? '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Checking Status...'
      : '<i class="fas fa-magnifying-glass" aria-hidden="true"></i> Check Application Status';
  }

  function formatRupees(paise) {
    return `₹${(Number(paise || 0) / 100).toFixed(2)} Paid`;
  }

  function renderTimeline(statusKey) {
    const container = $("#trackTimeline");
    if (!container) return;

    const state = STATUS_MAP[statusKey] || STATUS_MAP.documents_uploaded;
    const rejected = statusKey === "rejected";

    container.innerHTML = STEPS.map((step, index) => {
      let classes = "track-step";
      let icon = '<i class="fas fa-circle" aria-hidden="true"></i>';

      if (rejected) {
        if (index < state.step) {
          classes += " is-done";
          icon = '<i class="fas fa-check" aria-hidden="true"></i>';
        } else if (index === state.step) {
          classes += " is-current";
          icon = '<i class="fas fa-xmark" aria-hidden="true"></i>';
        }
      } else if (index < state.step) {
        classes += " is-done";
        icon = '<i class="fas fa-check" aria-hidden="true"></i>';
      } else if (index === state.step) {
        classes += " is-current";
        icon = statusKey === "completed"
          ? '<i class="fas fa-check" aria-hidden="true"></i>'
          : '<i class="fas fa-circle" aria-hidden="true"></i>';
      }

      const title = rejected && index === state.step ? "Rejected" : step.title;
      const text = rejected && index === state.step
        ? "This request could not be completed."
        : step.text;

      return `
        <div class="${classes}">
          <div class="track-step-icon">${icon}</div>
          <div class="track-step-content">
            <strong>${title}</strong>
            <span>${text}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderApplication(application) {
    let statusKey = String(application.application_status || "documents_uploaded").toLowerCase();
    let state = STATUS_MAP[statusKey] || STATUS_MAP.documents_uploaded;
    const summary = application.result_summary || {};
    if (statusKey === "completed" && summary.state === "partial") {
      state = { title: "Partly Completed", pill: summary.label || "Partly completed", step: 4, className: "is-processing",
        note: "Some certificates were approved and some were rejected. See each certificate below. The fee for submitted applications is non-refundable; contact support with your Request ID for the next step." };
    }
    if (application.refund_status && application.refund_status !== "none" && Number(application.refunded_paise) > 0) {
      state = Object.assign({}, state, { note: state.note + ` Refunded: \u20b9${(Number(application.refunded_paise) / 100).toFixed(2)} (${application.refund_status}).` });
    }

    $("#trackEmpty")?.setAttribute("hidden", "");
    $("#trackResultContent")?.classList.add("show");

    $("#trackApplicant").textContent = application.applicant_name || "-";
    $("#trackRequest").textContent = application.request_id || "-";
    const allServices = Array.isArray(application.services) ? application.services : [];
    $("#trackService").textContent = allServices.length ? allServices.map(serviceLabel).join(", ") : (application.service_type || "-");
    $("#trackGovernmentApplication").textContent = application.government_application_number || "Not issued yet";
    $("#trackCertificateNumber").textContent = application.certificate_number || "Not issued yet";
    $("#trackPayment").textContent =
      application.payment_status === "paid"
        ? formatRupees(application.amount)
        : "Payment Pending";

    $("#trackCurrentStatus").textContent = state.title;

    const pill = $("#trackStatusPill");
    pill.textContent = state.pill;
    pill.className = `track-status-pill ${state.className}`.trim();

    const note = $("#trackStatusNote");
    note.textContent = state.note;
    note.className = `track-note ${state.className}`.trim();

    const services = Array.isArray(application.services) ? application.services : [];
    const servicesCard = $("#trackServicesCard");
    const servicesBox = $("#trackServices");
    if (services.length && servicesCard && servicesBox) {
      servicesBox.innerHTML = services.map((service) => `
        <div class="track-details" style="grid-template-columns:1fr; margin:.55rem 0">
          <div><span>${esc(serviceLabel(service))}</span><strong>${esc(String(service.service_status || "pending").replace(/_/g," "))}</strong></div>
        </div>`).join("");
      servicesCard.hidden = false;
    } else if (servicesCard) { servicesCard.hidden = true; }

    renderTimeline(statusKey);
  }

  async function loadStatus(requestId, mobile) {
    const response = await fetch(STATUS_API_URL, {
      method: "POST",
      mode: "cors",
      cache: "no-store",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        request_id: requestId,
        mobile
      })
    });

    let result = null;
    try {
      result = await response.json();
    } catch {
      throw new Error("The status server returned an invalid response.");
    }

    if (!response.ok || !result || !result.success) {
      throw new Error(result?.message || "Could not find this certificate request.");
    }

    return result.application;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const requestId = clean($("#trackRequestId")?.value).toUpperCase();
    const mobile = clean($("#trackMobile")?.value);

    if (!requestId) {
      setMessage("Please enter your Request ID.");
      return;
    }

    if (!validateMobile(mobile)) {
      setMessage("Please enter the 10 digit mobile number used while submitting the application.");
      return;
    }

    setLoading(true);

    try {
      const application = await loadStatus(requestId, mobile);
      renderApplication(application);
      if (application.can_resume_upload && typeof window.GJUResumePrefill === "function") {
        window.GJUResumePrefill(application.request_id, mobile);
        $("#trackStatusNote").textContent += " Your documents are still pending: use \"Resume document upload\" below. No second payment is needed.";
      }
    } catch (error) {
      $("#trackResultContent")?.classList.remove("show");
      $("#trackEmpty")?.removeAttribute("hidden");
      setMessage(error.message || "Could not load application status.");
    } finally {
      setLoading(false);
    }
  }

  function prefillRequestId() {
    const params = new URLSearchParams(window.location.search);
    const requestId = clean(params.get("request_id")).toUpperCase();
    if (requestId && $("#trackRequestId")) {
      $("#trackRequestId").value = requestId;
      $("#trackMobile")?.focus();
    }
  }

  function init() {
    prefillRequestId();
    $("#certificateStatusForm")?.addEventListener("submit", handleSubmit);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
