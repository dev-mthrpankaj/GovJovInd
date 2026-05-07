(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        const auth = window.CandidateAuth;
        const form = document.getElementById("loginForm");
        const message = document.getElementById("loginMessage");
        const button = document.getElementById("loginSubmit");

        if (!auth || !form) return;

        if (auth.getSession()) {
            window.location.replace(auth.getNextUrl("dashboard.html"));
            return;
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const contact = form.contact.value.trim();
            const password = form.password.value;
            const remember = Boolean(form.remember?.checked);

            if (!contact || !password) {
                auth.showMessage(message, "Please enter your mobile/email and password.", "error");
                return;
            }

            const original = auth.setButtonBusy(button, true);
            auth.showMessage(message, "");
            try {
                const result = await auth.loginCandidate({ contact, password, remember });
                if (!result.success) {
                    auth.showMessage(message, result.message || "Login failed. Please check your details.", "error");
                    return;
                }
                auth.showMessage(message, "Login successful. Opening dashboard...", "success");
                window.location.href = auth.getNextUrl("dashboard.html");
            } catch {
                auth.showMessage(message, "Server connection failed. Please try again.", "error");
            } finally {
                auth.setButtonBusy(button, false, original);
            }
        });
    });
}());
