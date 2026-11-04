/* Single place to change the certificate backend endpoint (no code edits needed in the other scripts). */
window.GJU_CERT_CONFIG = {
  // Move this to a stable production API host when ready (it must be in certificate_allowed_origins' CORS for the site, and routed to /live-test/certificate-api).
  apiBase: "https://test.govjobupdates.com/live-test/certificate-api"
};
