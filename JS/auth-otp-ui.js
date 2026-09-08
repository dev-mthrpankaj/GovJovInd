(function(){
  "use strict";
  const OTP_LENGTH = 6;
  const RESEND_SECONDS = 60;
  const state = { mode: "idle", email: "", resendTimer: null, remaining: 0 };

  const $ = (sel) => document.querySelector(sel);
  const maskEmail = (email) => {
    const value = String(email || "").trim();
    const at = value.indexOf("@");
    if (at < 1) return value;
    const local = value.slice(0, at);
    const domain = value.slice(at + 1);
    const visible = local.length <= 2 ? local.charAt(0) : local.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(3, local.length - visible.length))}@${domain}`;
  };

  function setMessage(text, isError = false) {
    const el = $("#authMessage");
    if (!el) return;
    el.textContent = text || "";
    el.classList.toggle("hidden", !text);
    el.classList.toggle("error", !!isError);
  }

  function normalizeOtp(value) {
    return String(value || "").replace(/\D/g, "").slice(0, OTP_LENGTH);
  }

  function stopTimer() {
    if (state.resendTimer) clearInterval(state.resendTimer);
    state.resendTimer = null;
  }

  function updateResendUi() {
    const btn = $("#otpResendBtn");
    const timer = $("#otpResendTimer");
    if (!btn || !timer) return;
    const waiting = state.remaining > 0;
    btn.disabled = waiting;
    timer.textContent = waiting ? `Resend available in ${state.remaining}s` : "Didn't receive it?";
  }

  function startResendTimer(seconds = RESEND_SECONDS) {
    stopTimer();
    state.remaining = seconds;
    updateResendUi();
    state.resendTimer = setInterval(() => {
      state.remaining -= 1;
      if (state.remaining <= 0) {
        state.remaining = 0;
        stopTimer();
      }
      updateResendUi();
    }, 1000);
  }

  function showPanel(panelId) {
    document.querySelectorAll("[data-auth-panel]").forEach((panel) => {
      panel.classList.toggle("hidden", panel.id !== panelId);
    });
  }

  function showOtp(mode, email) {
    state.mode = mode;
    state.email = String(email || "").trim();
    const title = $("#otpTitle");
    const copy = $("#otpCopy");
    const emailEl = $("#otpEmail");
    const verifyBtn = $("#otpVerifyBtn");
    if (title) title.textContent = mode === "reset" ? "Verify password reset" : "Verify your email";
    if (copy) copy.textContent = mode === "reset"
      ? "Enter the 6-digit code sent to your registered email."
      : "Enter the 6-digit code sent to your email to activate your account.";
    if (emailEl) emailEl.textContent = maskEmail(state.email);
    if (verifyBtn) verifyBtn.textContent = mode === "reset" ? "Verify & Continue" : "Verify Email";
    const input = $("#otpCode");
    if (input) input.value = "";
    showPanel("otpPanel");
    setMessage("");
    startResendTimer();
    input?.focus();
  }

  function showResetPassword() {
    showPanel("resetPasswordPanel");
    setMessage("");
    $("#newPassword")?.focus();
  }

  function backToAuth() {
    stopTimer();
    state.mode = "idle";
    state.email = "";
    showPanel("authFormsPanel");
    setMessage("");
  }

  function dispatch(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function bind() {
    const otpInput = $("#otpCode");
    otpInput?.addEventListener("input", () => {
      otpInput.value = normalizeOtp(otpInput.value);
    });

    $("#otpForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const code = normalizeOtp($("#otpCode")?.value);
      if (code.length !== OTP_LENGTH) {
        setMessage("Please enter the complete 6-digit OTP.", true);
        return;
      }
      dispatch("gju:otp-verify-request", { mode: state.mode, email: state.email, code });
    });

    $("#otpResendBtn")?.addEventListener("click", () => {
      if (state.remaining > 0) return;
      dispatch("gju:otp-resend-request", { mode: state.mode, email: state.email });
      startResendTimer();
    });

    $("#otpBackBtn")?.addEventListener("click", backToAuth);

    $("#resetPasswordForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const password = $("#newPassword")?.value || "";
      const confirm = $("#confirmNewPassword")?.value || "";
      if (password.length < 6) {
        setMessage("Password must be at least 6 characters.", true);
        return;
      }
      if (password !== confirm) {
        setMessage("Passwords do not match.", true);
        return;
      }
      dispatch("gju:password-reset-submit", { email: state.email, password });
    });

    $("#resetBackBtn")?.addEventListener("click", backToAuth);

    window.GJUAuthOtpUI = {
      showSignupOtp(email) { showOtp("signup", email); },
      showResetOtp(email) { showOtp("reset", email); },
      showResetPassword,
      backToAuth,
      startResendTimer,
      setMessage,
      getState() { return { ...state }; }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind, { once: true });
  else bind();
}());
