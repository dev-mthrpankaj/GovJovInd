(function () {
    "use strict";

    const RESET_API = "https://test.govjobupdates.com/live-test/account-api/password-reset-request.php";
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

    async function readJsonSafe(response) {
        try {
            return await response.json();
        } catch {
            return null;
        }
    }

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = String(form.email?.value || "").trim().toLowerCase();
        const honeypot = String(form.website?.value || "").trim();

        if (!email) {
            showMessage("Please enter your registered email address.", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        setBusy(true);
        showMessage("");

        try {
            const response = await fetch(RESET_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, website: honeypot }),
                credentials: "omit",
                cache: "no-store"
            });

            const payload = await readJsonSafe(response);

            if (!response.ok || !payload?.success) {
                const errorCode = String(payload?.error || "");
                if (errorCode === "invalid_email") {
                    showMessage("Please enter a valid email address.", "error");
                    return;
                }

                throw new Error(payload?.message || `Password reset request failed (${response.status}).`);
            }

            form.reset();
            showMessage(
                payload.message || "If a GovJobUpdates account exists for this email, a password reset link will be sent shortly. Please also check Spam or Promotions.",
                "success"
            );
        } catch (error) {
            console.warn("[GovJobUpdates] Password reset request failed:", error?.message || error);
            showMessage("Password reset email could not be sent right now. Please try again shortly.", "error");
        } finally {
            setBusy(false);
        }
    });
}());
