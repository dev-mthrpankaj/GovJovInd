(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        const auth = window.CandidateAuth;
        const form = document.getElementById("registerForm");
        const message = document.getElementById("registerMessage");
        const button = document.getElementById("registerSubmit");

        if (!auth || !form) return;

        if (auth.getSession()) {
            window.location.replace("dashboard.html");
            return;
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = form.name.value.trim();
            const mobile = form.mobile.value.trim();
            const email = form.email.value.trim();
            const dob = form.dob.value.trim();
            const password = form.password.value;
            const remember = Boolean(form.remember?.checked);
            const normalizedMobile = auth.normalizeContact(mobile);
            const normalizedEmail = auth.normalizeContact(email);

            if (!name || !mobile || !email || !dob || !password) {
                auth.showMessage(message, "Please fill name, mobile number, email, date of birth, and password.", "error");
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
                auth.showMessage(message, "Password must be alphanumeric with at least one letter and one number.", "error");
                return;
            }

            const original = auth.setButtonBusy(button, true);
            auth.showMessage(message, "");
            try {
                const result = await auth.registerCandidate({ name, mobile, email, dob, password, remember });
                if (!result.success) {
                    auth.showMessage(message, result.message || "Registration failed. Please try again.", "error");
                    return;
                }
                auth.showMessage(message, "Account created. Opening dashboard...", "success");
                window.location.href = "dashboard.html";
            } catch {
                auth.showMessage(message, "Server connection failed. Please try again.", "error");
            } finally {
                auth.setButtonBusy(button, false, original);
            }
        });
    });
}());
