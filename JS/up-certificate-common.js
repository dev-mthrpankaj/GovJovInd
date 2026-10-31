/* Shared helpers for the UP certificate pages: file checks + photo compression, upload, API calls, resume bookkeeping. */
(function (w) {
  "use strict";
  const cfg = w.GJU_CERT_CONFIG || {};
  const API_BASE = cfg.apiBase || "https://test.govjobupdates.com/live-test/certificate-api";
  const DRIVE_URL = cfg.driveUrl || "";
  const LIMIT = 1.5 * 1024 * 1024;           // size we upload (server/Apps Script limit)
  const RAW_IMAGE_LIMIT = 25 * 1024 * 1024;  // phone photos are accepted and compressed down
  const PENDING_KEY = "gjuCertPendingUpload";

  const clean = (v) => String(v == null ? "" : v).replace(/\s+/g, " ").trim();
  const escapeHtml = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
  const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]{1,119}$/u;
  const validPersonName = (v) => NAME_RE.test(v);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---- real file type from the first bytes (the browser-reported type is not trusted) ---- */
  async function sniff(file) {
    const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const at = (i) => b[i];
    if (at(0) === 0x25 && at(1) === 0x50 && at(2) === 0x44 && at(3) === 0x46) return { mime: "application/pdf", ext: "pdf" };
    if (at(0) === 0xff && at(1) === 0xd8 && at(2) === 0xff) return { mime: "image/jpeg", ext: "jpg" };
    if (at(0) === 0x89 && at(1) === 0x50 && at(2) === 0x4e && at(3) === 0x47) return { mime: "image/png", ext: "png" };
    if (at(0) === 0x52 && at(1) === 0x49 && at(2) === 0x46 && at(3) === 0x46 && at(8) === 0x57 && at(9) === 0x45 && at(10) === 0x42 && at(11) === 0x50) return { mime: "image/webp", ext: "webp" };
    return null;
  }

  async function decode(file) {
    if (typeof createImageBitmap === "function") {
      try { return await createImageBitmap(file, { imageOrientation: "from-image" }); } catch (e) { /* fall through */ }
    }
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("decode")); };
      img.src = url;
    });
  }

  const toBlob = (canvas, q) => new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", q));

  /** Shrinks a big photo to <= 1.5 MB JPEG (keeps it readable: max side 1800px, quality 0.85 -> 0.5). */
  async function compressImage(file, label) {
    const img = await decode(file).catch(() => { throw new Error(`${label} could not be read. Please choose another photo.`); });
    const w0 = img.width || img.naturalWidth, h0 = img.height || img.naturalHeight;
    let scale = Math.min(1, 1800 / Math.max(w0, h0));
    for (let round = 0; round < 6; round++) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(w0 * scale));
      canvas.height = Math.max(1, Math.round(h0 * scale));
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      for (const q of [0.85, 0.72, 0.6, 0.5]) {
        const blob = await toBlob(canvas, q);
        if (blob && blob.size <= LIMIT * 0.95) {
          return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
        }
      }
      scale *= 0.8;
    }
    throw new Error(`${label} is too large to shrink. Please choose a smaller photo.`);
  }

  /**
   * Validates one document and returns a file that is safe to upload (compressed if it was a big photo).
   * opts: { pdfOnly, imageOnly }
   */
  async function prepareFile(file, label, opts) {
    opts = opts || {};
    if (!file) throw new Error(`${label} is required.`);
    if (file.size <= 0) throw new Error(`${label} is empty.`);
    const real = await sniff(file);
    if (!real) throw new Error(`${label} must be a valid JPG, PNG, WEBP or PDF file.`);
    const isPdf = real.mime === "application/pdf";
    if (opts.pdfOnly && !isPdf) throw new Error(`${label} must be a PDF file.`);
    if (opts.imageOnly && isPdf) throw new Error(`${label} must be an image file.`);
    if (isPdf) {
      if (file.size > LIMIT) throw new Error(`${label} (PDF) must be under 1.5 MB. Please reduce the PDF size.`);
      return file;
    }
    if (file.size > RAW_IMAGE_LIMIT) throw new Error(`${label} is too large (max 25 MB).`);
    if (file.size <= LIMIT * 0.95 && real.mime === "image/jpeg") return file;
    return compressImage(file, label);
  }

  function rulesFromAccept(accept) {
    const a = String(accept || "");
    return { pdfOnly: a === "application/pdf", imageOnly: a === "image/*" };
  }

  /* ---- API ---- */
  async function request(path, options) {
    let res;
    try { res = await fetch(`${API_BASE}/${path}`, Object.assign({ mode: "cors", cache: "no-store", credentials: "omit" }, options)); }
    catch (e) { const err = new Error("Network problem. Please check your internet and try again."); err.network = true; throw err; }
    let body;
    try { body = await res.json(); } catch (e) { throw new Error("The certificate server returned an invalid response."); }
    if (!res.ok || !body || !body.success) {
      const err = new Error((body && body.message) || "The request could not be completed.");
      err.code = body && body.code;
      err.status = res.status;
      throw err;
    }
    return body;
  }
  const getJson = (path) => request(path, { method: "GET", headers: { "X-Requested-With": "XMLHttpRequest" } });
  const postJson = (path, payload) => request(path, { method: "POST", headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" }, body: JSON.stringify(payload) });

  /** Verify a Razorpay payment. The bank can take a few seconds to confirm, so wait and retry instead of failing. */
  async function verifyPayment(requestId, payment) {
    const payload = { request_id: requestId, razorpay_order_id: payment.razorpay_order_id, razorpay_payment_id: payment.razorpay_payment_id, razorpay_signature: payment.razorpay_signature };
    let lastError;
    for (let attempt = 0; attempt < 5; attempt++) {
      try { return await postJson("verify-payment.php", payload); }
      catch (e) {
        lastError = e;
        if (!(e.network || e.code === "payment_pending")) throw e;
        await sleep(2500 * (attempt + 1));
      }
    }
    throw lastError;
  }

  const resumeUpload = (requestId, mobile, email) => postJson("resume-upload.php", { request_id: requestId, mobile, email });

  /* ---- Drive upload (Apps Script). Network failures are retried; server refusals are not. ---- */
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => { const r = String(reader.result || ""); resolve({ name: file.name, type: file.type || "application/octet-stream", size: file.size, data: r.includes(",") ? r.split(",")[1] : r }); };
      reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
      reader.readAsDataURL(file);
    });
  }

  async function uploadDocuments(requestId, uploadToken, files) {
    if (!DRIVE_URL) throw new Error("Document upload service is not configured.");
    const payload = {};
    for (const [key, file] of Object.entries(files)) if (file) payload[key] = await fileToBase64(file);
    const body = JSON.stringify({ action: "uploadCertificateDocuments", data: { requestId, uploadToken }, files: payload });
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 180000);
      try {
        const res = await fetch(DRIVE_URL, { method: "POST", redirect: "follow", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body, signal: ctl.signal });
        const text = await res.text();
        let result;
        try { result = JSON.parse(text); } catch (e) { throw new Error("Google Drive upload service returned an invalid response."); }
        if (!result || !result.success) { const err = new Error((result && result.message) || "Document upload failed."); err.final = true; throw err; }
        return result;
      } catch (e) {
        lastError = e;
        if (e.final) throw e;
        await sleep(2000 * (attempt + 1));
      } finally { clearTimeout(timer); }
    }
    throw new Error((lastError && lastError.message) || "Document upload failed. Please try again.");
  }

  /* ---- remembers "paid but documents not uploaded" so the customer is always led back (no token stored) ---- */
  function savePending(requestId) { try { localStorage.setItem(PENDING_KEY, JSON.stringify({ requestId, savedAt: Date.now() })); } catch (e) { /* storage unavailable */ } }
  function loadPending() {
    try {
      const v = JSON.parse(localStorage.getItem(PENDING_KEY) || "null");
      return v && /^GJU-CERT-\d{6}-[A-Z0-9]{6}$/.test(v.requestId || "") ? v : null;
    } catch (e) { return null; }
  }
  function clearPending() { try { localStorage.removeItem(PENDING_KEY); } catch (e) { /* ignore */ } }

  w.GJUCert = { API_BASE, LIMIT, clean, escapeHtml, validPersonName, sniff, prepareFile, rulesFromAccept, getJson, postJson, verifyPayment, resumeUpload, uploadDocuments, savePending, loadPending, clearPending };
}(window));
