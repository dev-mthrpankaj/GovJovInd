(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", initProfile);

    function initProfile() {
        const auth = window.CandidateAuth;
        if (!auth) return;
        const session = auth.requireAuth();
        if (!session) return;
        auth.bindLogout();
        renderProfile(session);
        bindPasswordForm(auth, session);
    }

    function renderProfile(session) {
        const details = document.getElementById("profileDetails");
        if (!details) return;
        details.innerHTML = [
            ["Candidate ID", session.userId],
            ["Name", session.name || "Candidate"],
            ["Mobile", session.mobile || "Not saved"],
            ["Email", session.email || "Not saved"],
            ["Date of Birth", formatDate(session.dob)],
            ["Gender", session.gender || "Not saved"],
            ["Created", formatDate(session.createdAt)]
        ].map(([label, value]) => `
            <article class="profile-detail">
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value || "Not saved")}</strong>
            </article>
        `).join("");
    }

    function bindPasswordForm(auth, session) {
        const form = document.getElementById("changePasswordForm");
        const message = document.getElementById("profileMessage");
        const button = document.getElementById("changePasswordSubmit");
        if (!form) return;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const currentPassword = form.currentPassword.value;
            const newPassword = form.newPassword.value;
            const confirmPassword = form.confirmPassword.value;

            if (!currentPassword || !newPassword || !confirmPassword) {
                auth.showMessage(message, "Please fill current password, new password, and confirmation.", "error");
                return;
            }

            if (newPassword !== confirmPassword) {
                auth.showMessage(message, "New password and confirmation do not match.", "error");
                return;
            }

            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(newPassword)) {
                auth.showMessage(message, "New password must be alphanumeric with at least one letter and one number.", "error");
                return;
            }

            const original = auth.setButtonBusy(button, true);
            auth.showMessage(message, "");
            try {
                const result = await auth.changeCandidatePassword({
                    userId: session.userId,
                    currentPassword,
                    newPassword
                });
                if (!result.success) {
                    auth.showMessage(message, result.message || "Password update failed.", "error");
                    return;
                }
                form.reset();
                auth.showMessage(message, "Password updated successfully.", "success");
            } catch {
                auth.showMessage(message, "Server connection failed. Please try again.", "error");
            } finally {
                auth.setButtonBusy(button, false, original);
            }
        });
    }

    function formatDate(value) {
        if (!value) return "Not saved";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#039;"
        }[char]));
    }
}());
