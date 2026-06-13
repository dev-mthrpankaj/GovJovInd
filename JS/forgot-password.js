import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

(function () {
    "use strict";

    const config = window.GJU_FIREBASE_CONFIG;
    const form = document.getElementById("forgotPasswordForm");
    const message = document.getElementById("forgotPasswordMessage");
    const button = document.getElementById("forgotPasswordSubmit");

    function showMessage(text, type = "info") {
        if (!message) return;
        message.textContent = text || "";
        message.className = text ? `auth-message ${type}` : "auth-message hidden";
    }

    function setBusy(isBusy) {
        if (!button) return;
        button.disabled = isBusy;
        button.textContent = isBusy ? "Sending..." : "Send Reset Link";
    }

    function readableError(error) {
        const code = String(error?.code || "");
        if (code.includes("invalid-email")) return "Please enter a valid email address.";
        if (code.includes("user-not-found")) return "No account was found with this email address.";
        if (code.includes("unauthorized-domain")) return "This domain is not authorized in Firebase Auth settings.";
        return "Could not send reset email. Please try again.";
    }

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = String(form.email?.value || "").trim().toLowerCase();

        if (!email) {
            showMessage("Please enter your registered email address.", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        if (!config || !config.apiKey) {
            showMessage("Firebase Auth is not configured on this page.", "error");
            return;
        }

        setBusy(true);
        showMessage("");

        try {
            const app = getApps().length ? getApps()[0] : initializeApp(config);
            const auth = getAuth(app);
            await sendPasswordResetEmail(auth, email);
            form.reset();
            showMessage("Password reset link sent. Please check your inbox. If you do not receive it, check Spam or Promotions folder.", "success");
        } catch (error) {
            showMessage(readableError(error), "error");
        } finally {
            setBusy(false);
        }
    });
}());
