(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        const auth = window.CandidateAuth;
        const form = document.getElementById("forgotPasswordForm");
        const message = document.getElementById("forgotPasswordMessage");
        const button = document.getElementById("forgotPasswordSubmit");

        if (!auth || !form) return;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const mobile = form.mobile.value.trim();
            const email = form.email.value.trim();
            const dob = form.dob.value.trim();
            const password = form.password.value;
            const normalizedMobile = auth.normalizeContact(mobile);
            const normalizedEmail = auth.normalizeContact(email);

            if (!mobile || !email || !dob || !password) {
                auth.showMessage(message, "Please enter mobile number, email, date of birth, and new password.", "error");
                return;
            }

            if (!/^\d{10}$/.test(normalizedMobile)) {
                auth.showMessage(message, "Please enter a valid 10-digit mobile number.", "error");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
                auth.showMessage(message, "Please enter a valid email address.", "error");
                return;
            }

            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(password)) {
                auth.showMessage(message, "New password must be alphanumeric with at least one letter and one number.", "error");
                return;
            }

            const original = auth.setButtonBusy(button, true);
            auth.showMessage(message, "");
            try {
                const result = await auth.resetCandidatePassword({ mobile, email, dob, password });
                if (!result.success) {
                    auth.showMessage(message, result.message || "Password reset failed. Please check your details.", "error");
                    return;
                }
                form.reset();
                auth.showMessage(message, "Password reset successfully. You can login now.", "success");
            } catch {
                auth.showMessage(message, "Server connection failed. Please try again.", "error");
            } finally {
                auth.setButtonBusy(button, false, original);
            }
        });
    });
}());
