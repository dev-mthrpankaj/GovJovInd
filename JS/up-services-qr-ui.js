(function(){
  "use strict";
  var QR_PATH = "../Assets/UP Services/payment-qr.svg";
  function ready(fn){ if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  function injectStyle(){
    if(document.getElementById("upQrUiStyle")) return;
    var s = document.createElement("style");
    s.id = "upQrUiStyle";
    s.textContent = ".payment-qr-card{display:grid;gap:.9rem}.payment-qr-wrap{display:grid;place-items:center;padding:1rem;border:1px dashed #93c5fd;border-radius:16px;background:#fff}.payment-qr-wrap img{width:min(100%,260px);max-width:260px;aspect-ratio:1/1;object-fit:contain;display:block;border-radius:14px;box-shadow:0 10px 24px rgba(37,99,235,.12);background:#fff}.payment-qr-meta{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}.payment-qr-fee{display:grid;gap:.18rem;padding:.78rem;border:1px solid #dbeafe;border-radius:12px;background:#f8fbff}.payment-qr-fee span{font-size:.8rem;color:#64748b;font-weight:800}.payment-qr-fee strong{font-size:1rem;color:#0f172a}.payment-first-panel{margin-bottom:1rem;border:1px solid #bfdbfe!important;background:linear-gradient(135deg,#ffffff,#eff6ff)!important}.payment-first-panel h2{display:flex;align-items:center;gap:.5rem}.payment-step-badge{display:inline-flex;width:max-content;align-items:center;gap:.35rem;padding:.34rem .6rem;border-radius:999px;background:#dcfce7;color:#166534;font-size:.76rem;font-weight:900}.cert-grid.payment-first-layout{grid-template-columns:minmax(0,1fr)!important}.cert-grid.payment-first-layout .payment-box{order:-1}.cert-grid.payment-first-layout #certificateForm{order:1}@media(min-width:900px){.cert-grid.payment-first-layout .payment-box{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,.65fr) minmax(0,.65fr);align-items:start}.cert-grid.payment-first-layout .payment-box>.cert-card:first-child{grid-column:1 / -1}.cert-grid.payment-first-layout #certificateForm{max-width:920px;width:100%;justify-self:center}}@media(max-width:640px){.payment-qr-meta{grid-template-columns:1fr}.payment-qr-wrap img{max-width:220px}.payment-first-panel{margin-bottom:.75rem}}";
    document.head.appendChild(s);
  }
  function patch(){
    if(!/\/HTML\/up-certificate-services\.html$/i.test(location.pathname)) return;
    injectStyle();
    var old = document.getElementById("upiIdText");
    var card = old ? old.closest(".cert-card") : null;
    if(card && card.dataset.qrReady !== "1"){
      card.dataset.qrReady = "1";
      card.classList.add("payment-first-panel");
      card.innerHTML = '<span class="payment-step-badge">Step 1: Pay first</span><h2><i class="fas fa-qrcode"></i> Scan & Pay ₹80</h2><div class="payment-upi-card payment-qr-card"><p>Form submit karne se pehle QR code scan karke ₹80 payment karein. Payment ke baad UTR / Transaction ID form me enter karna zaroori hai.</p><div class="payment-qr-wrap"><img id="paymentQrImage" src="'+QR_PATH+'" alt="Scan QR to pay ₹80" loading="lazy" decoding="async"></div><div class="payment-qr-meta"><div class="payment-qr-fee"><span>Amount</span><strong>₹80</strong></div><div class="payment-qr-fee"><span>Purpose</span><strong>UP Certificate Service</strong></div></div><p class="cert-note"><strong>Important:</strong> Pehle payment karein, phir neeche form me Payment UTR / Transaction ID aur payment screenshot submit karein.</p></div>';
    }
    var grid = document.querySelector(".cert-grid");
    if(grid) grid.classList.add("payment-first-layout");
    var formTitle = document.querySelector("#certificateForm h2");
    if(formTitle && !formTitle.dataset.stepReady){
      formTitle.dataset.stepReady = "1";
      formTitle.innerHTML = '<span class="payment-step-badge" style="background:#dbeafe;color:#1d4ed8;margin-right:.45rem">Step 2</span> Certificate Request Form';
    }
  }
  ready(patch);
  setTimeout(patch,250);
  setTimeout(patch,750);
  setTimeout(patch,1500);
}());
