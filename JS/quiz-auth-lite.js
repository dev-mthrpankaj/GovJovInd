(function () {
    "use strict";

    const SESSION_KEY = "gju:candidate-session";
    const API_URL = "https://script.google.com/macros/s/AKfycbyM6Xq_fq0axcmTvMTG3Xx0Dwy9h7wSbUDqsO7EvULeGLm0SAVWO0OrkmEEtKh_QBbE/exec";

    function getSession() {
        try {
            const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY) || "null");
            return saved && saved.userId ? saved : null;
        } catch {
            return null;
        }
    }

    async function callApi(payload) {
        const response = await fetch(API_URL, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });
        return JSON.parse(await response.text());
    }

    window.CandidateAuth = {
        SESSION_KEY,
        getSession,
        callApi
    };
}());
