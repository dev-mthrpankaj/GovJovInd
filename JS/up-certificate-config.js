/* Single place to change the certificate backend / Drive endpoints (no code edits needed in the other scripts). */
window.GJU_CERT_CONFIG = {
  // Move this to a stable production API host when ready (it must be in certificate_allowed_origins' CORS for the site, and routed to /live-test/certificate-api).
  apiBase: "https://test.govjobupdates.com/live-test/certificate-api",
  // Web-app URL of GoogleAppsScript/certificate-drive-upload.gs after you redeploy it.
  driveUrl: "https://script.google.com/macros/s/AKfycbxDgRkmo0ZxktOZGdArFW-7APDT68ZJpETTvLSsaS4rD6h52TcB-lL-iJtypwg5gttPcQ/exec"
};
