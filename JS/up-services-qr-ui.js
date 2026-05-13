(function(){
  "use strict";
  var QR_PATH = "../Assets/UP Services/payment-qr.svg";
  function ready(fn){ if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  function injectStyle(){
    if(document.getElementById("upQrUiStyle")) return;
    var s = document.createElement("style");
    s.id = "upQrUiStyle";
    s.textContent = ".payment-qr-card{display:grid;gap:.9rem}.payment-qr-wrap{display:grid;place-items:center;padding:1rem;border:1px dashed #93c5fd;border-radius:16px;background:#fff}.payment-qr-wrap img{width:min(100%,260px);max-width:260px;aspect-ratio:1/1;object-fit:contain;display:block;border-radius:14px;box-shadow:0 10px 24px rgba(37,99,235,.12);background:#fff}.payment-qr-meta{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}.payment-qr-fee{display:grid;gap:.18rem;padding:.78rem;border:1px solid #dbeafe;border-radius:12px;background:#f8fbff}.payment-qr-fee span{font-size:.8rem;color:#64748b;font-weight:800}.payment-qr-fee strong{font-size:1rem;color:#0f172a}@media(max-width:640px){.payment-qr-meta{grid-template-columns:1fr}.payment-qr-wrap img{max-width:220px}}";
    document.head.appendChild(s);
  }
  function patch(){
    if(!/\/HTML\/up-certificate-services\.html$/i.test(location.pathname)) return;
    injectStyle();
    var old = document.getElementById("upiIdText");
    var card = old ? old.closest(".cert-card") : null;
    if(!card || card.dataset.qrReady === "1") return;
    card.dataset.qrReady = "1";
    card.innerHTML = '<h2>Pay ₹80</h2><div class="payment-upi-card payment-qr-card"><p>QR code scan karke ₹80 pay karein, phir form me UTR / Transaction ID bharein.</p><div class="payment-qr-wrap"><img id="paymentQrImage" src="'+QR_PATH+'" alt="Scan QR to pay ₹80" loading="lazy" decoding="async"></div><div class="payment-qr-meta"><div class="payment-qr-fee"><span>Amount</span><strong>₹80</strong></div><div class="payment-qr-fee"><span>Purpose</span><strong>UP Certificate Service</strong></div></div><p class="cert-note"><strong>Important:</strong> Payment ke baad UTR / Transaction ID form me zaroor bharein. Real QR image ko <code>Assets/UP Services/payment-qr.svg</code> par replace kar dein.</p></div>';
  }
  ready(patch);
  setTimeout(patch,250);
  setTimeout(patch,750);
  setTimeout(patch,1500);
}());
