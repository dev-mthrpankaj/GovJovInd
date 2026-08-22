import { getStoreUser, storeAuthHeaders } from "./store-account-auth.js";

(function(){
  "use strict";
  const API_BASE="https://test.govjobupdates.com/live-test/store-api";
  const CART_KEY="gjuStoreCart";
  const LEGACY_CART_KEY="gjuPhysicalStoreCart";
  const PIN_KEY="gjuStoreDeliveryPin";
  const CHECKOUT_KEY="gjuStoreCheckoutKey";
  const LAST_ORDER_KEY="gjuStoreLastOrder";
  const PENDING_V2_KEY="gjuStorePendingV2Payment";
  const ONLINE_MODE=new URLSearchParams(location.search).get("v2")==="1";
  const $=s=>document.querySelector(s);
  const clean=v=>String(v??"").replace(/\s+/g," ").trim();
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const money=p=>`₹${(Number(p||0)/100).toLocaleString("en-IN",{minimumFractionDigits:Number(p||0)%100?2:0,maximumFractionDigits:2})}`;
  const etaLabel=v=>{v=clean(v);if(!v)return"To be confirmed";return /^\d+$/.test(v)?`${v} day${v==="1"?"":"s"}`:v};
  const state={cart:[],validated:null,delivery:null,pin:"",submitting:false,checkout:null};

  function readCart(){try{let raw=localStorage.getItem(CART_KEY);if(!raw){raw=localStorage.getItem(LEGACY_CART_KEY);if(raw)localStorage.setItem(CART_KEY,raw)}const c=JSON.parse(raw||"[]");return Array.isArray(c)?c.filter(i=>Number(i.variant_id)>0&&Number(i.quantity)>0):[]}catch{return[]}}
  function checkoutKey(){let key=sessionStorage.getItem(CHECKOUT_KEY)||"";const prefix=ONLINE_MODE?"gju_v2_":"gju_";if(new RegExp(`^${prefix}[A-Za-z0-9_-]{20,120}$`).test(key))return key;try{key=prefix+crypto.randomUUID().replace(/-/g,"")}catch{key=prefix+Date.now().toString(36)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)}sessionStorage.setItem(CHECKOUT_KEY,key);return key}
  function resetCheckoutKey(){sessionStorage.removeItem(CHECKOUT_KEY)}
  function setAlert(msg){const el=$("#checkoutAlert");if(!el)return;el.textContent=msg||"";el.hidden=!msg;if(msg)el.scrollIntoView({behavior:"smooth",block:"center"})}
  function setLoading(show){$("#checkoutLoading").hidden=!show}
  function showEmpty(){setLoading(false);$("#checkoutLayout").hidden=true;$("#checkoutSuccess").hidden=true;$("#checkoutEmpty").hidden=false}
  function showLayout(){setLoading(false);$("#checkoutEmpty").hidden=true;$("#checkoutSuccess").hidden=true;$("#checkoutLayout").hidden=false}
  function cartPayload(){return state.cart.map(i=>({variant_id:Number(i.variant_id),quantity:Number(i.quantity)}))}

  function applyModeCopy(){
    if(!ONLINE_MODE)return;
    document.title="Online Checkout | GovJobUpdates Store";
    const desc=document.querySelector('meta[name="description"]');if(desc)desc.content="Complete your GovJobUpdates Store order with live stock verification, PIN-code delivery and secure Razorpay online payment.";
    const heading=$(".checkout-heading p");if(heading)heading.textContent="Final price, exact-unit stock and PIN-code eligibility are verified before secure online payment.";
    const paymentCard=$(".payment-card");
    if(paymentCard){
      const copy=paymentCard.querySelector(".checkout-card-head p");if(copy)copy.textContent="Pay securely online through Razorpay after your order and exact physical units are reserved.";
      const option=paymentCard.querySelector(".payment-option");
      if(option)option.innerHTML='<span class="payment-radio"><span></span></span><span class="payment-icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span><span class="payment-copy"><strong>Secure Online Payment</strong><small>UPI, cards and other methods available through Razorpay.</small></span><span class="payment-badge">Selected</span>';
      const note=paymentCard.querySelector(".cod-note");if(note)note.innerHTML='<i class="fas fa-circle-info" aria-hidden="true"></i><span>Your payment is accepted only after server-side signature, amount, currency and captured-status verification.</span>';
    }
    const totalLabel=$(".summary-total span");if(totalLabel)totalLabel.textContent="Total Payable";
    const btn=$("#placeOrderBtn");if(btn)btn.innerHTML='<span><i class="fas fa-lock"></i> Pay Securely</span><i class="fas fa-arrow-right"></i>';
    const successTitle=$("#checkoutSuccess h2");if(successTitle)successTitle.textContent="Payment successful — your order is confirmed";
    const successCopy=$(".success-copy");if(successCopy)successCopy.textContent="Your payment has been verified by the server and the reserved items are confirmed for this order.";
    const paymentValue=document.querySelector("#checkoutSuccess .success-grid div:nth-child(2) strong");if(paymentValue)paymentValue.textContent="Paid Online";
  }

  async function validateCheckout(pin){
    if(!state.cart.length){showEmpty();return false}
    const payload={items:cartPayload()};if(/^\d{6}$/.test(pin))payload.pin_code=pin;
    const r=await fetch(`${API_BASE}/cart-validate.php`,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(payload)});
    const j=await r.json().catch(()=>null);if(!r.ok||!j?.success)throw new Error(j?.message||"Your cart could not be verified.");
    state.validated=j;state.delivery=j.delivery||null;renderSummary();if(state.delivery)renderPinResult(state.delivery);updatePlaceButton();return true;
  }

  function localItem(id){return state.cart.find(i=>Number(i.variant_id)===Number(id))||{}}
  function renderSummary(){
    const v=state.validated;if(!v)return;const box=$("#checkoutItems");
    box.innerHTML=v.items.map(item=>{const local=localItem(item.variant_id);const img=clean(local.image);const variant=[item.size,item.color].filter(Boolean).join(" / ");return `<article class="checkout-item"><div class="checkout-item-image">${img?`<img src="${esc(img)}" alt="${esc(item.product_title)}">`:'<i class="fas fa-box-open" aria-hidden="true"></i>'}</div><div class="checkout-item-copy"><strong>${esc(item.product_title)}</strong><span>${variant?esc(variant)+" · ":""}Qty ${Number(item.quantity)}</span></div><div class="checkout-item-price"><strong>${money(item.line_total_paise)}</strong><span>${money(item.selling_price_paise)} each</span></div></article>`}).join("");
    $("#checkoutSubtotal").textContent=money(v.subtotal_paise);
    if(state.delivery?.serviceable){$("#checkoutDelivery").textContent=Number(state.delivery.delivery_fee_paise||0)===0?"Free":money(state.delivery.delivery_fee_paise);$("#checkoutGrandTotal").textContent=money(state.delivery.grand_total_paise??(Number(v.subtotal_paise)+Number(state.delivery.delivery_fee_paise||0)))}else{$("#checkoutDelivery").textContent="Verify PIN";$("#checkoutGrandTotal").textContent=money(v.subtotal_paise)}
  }

  function deliveryEligible(d){return Boolean(d?.serviceable&&d?.minimum_order_met!==false&&(ONLINE_MODE||d?.cod_available))}
  function renderPinResult(d){
    const box=$("#checkoutPinResult"),summary=$("#summaryDeliveryInfo");
    if(!d?.serviceable){box.className="checkout-pin-result show error";box.textContent=`Delivery is not available for PIN ${state.pin}.`;summary.innerHTML='<i class="fas fa-location-dot"></i><span>This PIN code is not serviceable.</span>';return}
    const ok=deliveryEligible(d);const bits=[`Delivery available${d.city?` in ${d.city}`:""}${d.locality?`, ${d.locality}`:""}.`,ONLINE_MODE?"Online payment available.":(d.cod_available?"COD available.":"COD unavailable."),Number(d.delivery_fee_paise||0)===0?"Free delivery.":`Delivery charge ${money(d.delivery_fee_paise)}.`,d.eta?`ETA: ${d.eta}.`:""];
    box.className=`checkout-pin-result show ${ok?"success":"warning"}`;box.textContent=bits.filter(Boolean).join(" ");summary.innerHTML=`<i class="fas fa-truck-fast" aria-hidden="true"></i><span>${esc(d.eta?`Delivery: ${d.eta}`:"Delivery verified")}${Number(d.delivery_fee_paise||0)===0?" · Free delivery":""}</span>`;
  }

  async function verifyPin(){
    setAlert("");const pin=clean($("#checkoutPin").value);const btn=$("#verifyPinBtn");
    if(!/^\d{6}$/.test(pin)){state.delivery=null;$("#checkoutPinResult").className="checkout-pin-result show error";$("#checkoutPinResult").textContent="Enter a valid 6 digit PIN code.";updatePlaceButton();return false}
    state.pin=pin;localStorage.setItem(PIN_KEY,pin);btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Checking…';
    try{await validateCheckout(pin);return deliveryEligible(state.delivery)}catch(e){state.delivery=null;$("#checkoutPinResult").className="checkout-pin-result show error";$("#checkoutPinResult").textContent=e.message||"Could not verify delivery.";updatePlaceButton();return false}finally{btn.disabled=false;btn.innerHTML='<i class="fas fa-location-dot"></i> Verify PIN'}
  }

  function validateForm(mark=true){
    const fields={name:$("#customerName"),mobile:$("#customerMobile"),email:$("#customerEmail"),address:$("#addressLine1"),locality:$("#locality"),pin:$("#checkoutPin")};
    const checks={name:clean(fields.name.value).length>=2,mobile:/^[6-9]\d{9}$/.test(clean(fields.mobile.value)),email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(fields.email.value)),address:clean(fields.address.value).length>=3,locality:clean(fields.locality.value).length>=2,pin:/^\d{6}$/.test(clean(fields.pin.value))};
    if(mark)Object.keys(fields).forEach(k=>fields[k].classList.toggle("is-invalid",!checks[k]));return Object.values(checks).every(Boolean)
  }

  function updatePlaceButton(){
    const btn=$("#placeOrderBtn"),help=$("#placeOrderHelp");const cartOk=Boolean(state.validated?.items?.length);const deliveryOk=deliveryEligible(state.delivery);const formOk=validateForm(false);const enabled=cartOk&&deliveryOk&&formOk&&!state.submitting;btn.disabled=!enabled;
    if(state.submitting)help.textContent=ONLINE_MODE?"Starting secure payment…":"Creating your order securely…";else if(!cartOk)help.textContent="Your cart needs live verification.";else if(!deliveryOk)help.textContent=ONLINE_MODE?"Verify a serviceable delivery PIN.":"Verify a serviceable PIN with COD availability.";else if(!formOk)help.textContent="Complete all required customer and delivery details.";else help.textContent=ONLINE_MODE?"Everything is verified. Continue to secure online payment.":"Everything is verified. You can place your COD order.";
  }

  function collectOrder(){const out={idempotency_key:checkoutKey(),customer_name:clean($("#customerName").value),mobile:clean($("#customerMobile").value),email:clean($("#customerEmail").value),address:clean($("#addressLine1").value),address_line2:clean($("#addressLine2").value),landmark:clean($("#landmark").value),locality:clean($("#locality").value),pin_code:clean($("#checkoutPin").value),delivery_notes:clean($("#deliveryNotes").value),items:cartPayload()};if(!ONLINE_MODE)out.payment_method="cod";return out}

  function loadRazorpay(){return new Promise((resolve,reject)=>{if(window.Razorpay)return resolve();const existing=document.querySelector('script[data-gju-razorpay]');if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',()=>reject(new Error("Secure payment could not be loaded.")),{once:true});return}const s=document.createElement('script');s.src='https://checkout.razorpay.com/v1/checkout.js';s.async=true;s.setAttribute('data-gju-razorpay','');s.onload=resolve;s.onerror=()=>reject(new Error("Secure payment could not be loaded. Check your connection and try again."));document.head.appendChild(s)})}
  function savePendingPayment(v){try{localStorage.setItem(PENDING_V2_KEY,JSON.stringify(v))}catch{}}
  function readPendingPayment(){try{return JSON.parse(localStorage.getItem(PENDING_V2_KEY)||"null")}catch{return null}}
  function clearPendingPayment(){localStorage.removeItem(PENDING_V2_KEY)}

  async function verifyOnlinePayment(payload,{silent=false}={}){
    const r=await fetch(`${API_BASE}/v2-verify-payment.php`,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(payload)});const j=await r.json().catch(()=>null);
    if(!r.ok||!j?.success)throw new Error(j?.message||"Payment verification could not be completed.");
    clearPendingPayment();showSuccess({order_number:j.payment?.order_number||payload.order_number,grand_total_paise:j.payment?.amount_paise||state.checkout?.amount_paise||state.delivery?.grand_total_paise||0,order_status:j.payment?.order_status||"confirmed",eta:state.delivery?.eta||""},true);return j;
  }

  async function openRazorpay(checkout){
    await loadRazorpay();state.checkout=checkout;
    return new Promise((resolve,reject)=>{
      let completed=false;
      const rzp=new window.Razorpay({key:checkout.razorpay_key_id,amount:Number(checkout.amount_paise),currency:checkout.currency||"INR",name:"GovJobUpdates Store",description:`Order ${checkout.order_number}`,order_id:checkout.razorpay_order_id,prefill:{name:clean($("#customerName").value),email:clean($("#customerEmail").value),contact:clean($("#customerMobile").value)},notes:{order_number:checkout.order_number},modal:{ondismiss:function(){if(!completed)reject(new Error("Payment window was closed. Your reserved stock may remain held for a short time; you can retry this checkout."))}},handler:async function(resp){completed=true;const verifyPayload={order_number:checkout.order_number,razorpay_order_id:resp.razorpay_order_id,razorpay_payment_id:resp.razorpay_payment_id,razorpay_signature:resp.razorpay_signature};savePendingPayment(verifyPayload);try{await verifyOnlinePayment(verifyPayload);resolve()}catch(e){reject(new Error(`${e.message} If money was deducted, do not pay again; reload this page to retry server verification.`))}}});
      rzp.on('payment.failed',function(resp){const msg=resp?.error?.description||resp?.error?.reason||"Payment failed or was not completed.";reject(new Error(msg))});rzp.open();
    })
  }

  async function submitOnlineOrder(data,accountHeaders){
    const r=await fetch(`${API_BASE}/v2-create-order.php`,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-Checkout-Idempotency-Key":data.idempotency_key,...accountHeaders},body:JSON.stringify(data)});const j=await r.json().catch(()=>null);
    if(!r.ok||!j?.success)throw new Error(j?.message||"Secure checkout could not be started.");if(!j.checkout?.razorpay_order_id||!j.checkout?.razorpay_key_id)throw new Error("Payment gateway response is incomplete.");await openRazorpay(j.checkout)
  }

  async function submitOrder(e){
    e.preventDefault();if(state.submitting)return;setAlert("");if(!validateForm(true)){setAlert("Please complete all required checkout details correctly.");updatePlaceButton();return}
    const pinOk=await verifyPin();if(!pinOk){setAlert(ONLINE_MODE?"Please verify a serviceable delivery PIN code.":"Please verify a serviceable PIN code with Cash on Delivery available.");return}
    state.submitting=true;updatePlaceButton();const btn=$("#placeOrderBtn");btn.innerHTML=ONLINE_MODE?'<span><i class="fas fa-spinner fa-spin"></i> Starting Payment…</span>':'<span><i class="fas fa-spinner fa-spin"></i> Placing Order…</span>';
    const data=collectOrder();
    try{const accountHeaders=await storeAuthHeaders(false);if(ONLINE_MODE){await submitOnlineOrder(data,accountHeaders)}else{const r=await fetch(`${API_BASE}/create-order.php`,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-Checkout-Idempotency-Key":data.idempotency_key,...accountHeaders},body:JSON.stringify(data)});const j=await r.json().catch(()=>null);if(!r.ok||!j?.success)throw new Error(j?.message||"Your order could not be created.");showSuccess(j.order||{},false)}}catch(err){setAlert(err.message||"Checkout could not be completed. Your cart has not been cleared.")}finally{if(!$("#checkoutSuccess").hidden)return;state.submitting=false;btn.innerHTML=ONLINE_MODE?'<span><i class="fas fa-lock"></i> Pay Securely</span><i class="fas fa-arrow-right"></i>':'<span><i class="fas fa-lock"></i> Place COD Order</span><i class="fas fa-arrow-right"></i>';updatePlaceButton()}
  }

  function showSuccess(order,paidOnline=false){
    localStorage.removeItem(CART_KEY);localStorage.removeItem(LEGACY_CART_KEY);localStorage.removeItem(PIN_KEY);resetCheckoutKey();clearPendingPayment();
    try{localStorage.setItem(LAST_ORDER_KEY,JSON.stringify({order_number:order.order_number||"",mobile:clean($("#customerMobile").value),email:clean($("#customerEmail").value),created_at:new Date().toISOString()}))}catch{}
    $("#checkoutLayout").hidden=true;$("#checkoutEmpty").hidden=true;$("#checkoutLoading").hidden=true;$("#checkoutSuccess").hidden=false;$("#successOrderNumber").textContent=order.order_number||"—";$("#successAmount").textContent=money(order.grand_total_paise||state.checkout?.amount_paise||0);$("#successStatus").textContent=String(order.order_status||"placed").replace(/_/g," ").replace(/^./,c=>c.toUpperCase());$("#successEta").textContent=etaLabel(order.eta||state.delivery?.eta);
    if(paidOnline){const title=$("#checkoutSuccess h2");if(title)title.textContent="Payment successful — your order is confirmed";const copy=$(".success-copy");if(copy)copy.textContent="Your payment has been verified securely and your order is confirmed.";const pay=document.querySelector("#checkoutSuccess .success-grid div:nth-child(2) strong");if(pay)pay.textContent="Paid Online"}
    const trackLink=$("#successTrackOrder");if(trackLink&&order.order_number)trackLink.href=`store-track-order.html?order=${encodeURIComponent(order.order_number)}`;window.scrollTo({top:0,behavior:"smooth"})
  }

  function bindInputs(){["#customerName","#customerMobile","#customerEmail","#addressLine1","#locality"].forEach(sel=>$(sel)?.addEventListener("input",e=>{e.target.classList.remove("is-invalid");updatePlaceButton()}));$("#checkoutPin")?.addEventListener("input",()=>{state.delivery=null;$("#checkoutPinResult").className="checkout-pin-result";$("#checkoutPinResult").textContent="";updatePlaceButton()});$("#verifyPinBtn")?.addEventListener("click",verifyPin);$("#checkoutForm")?.addEventListener("submit",submitOrder)}

  async function retryPendingVerification(){if(!ONLINE_MODE)return false;const pending=readPendingPayment();if(!pending?.order_number||!pending?.razorpay_payment_id||!pending?.razorpay_signature)return false;setAlert("A completed payment is awaiting server verification. Verifying it now…");try{await verifyOnlinePayment(pending,{silent:true});return true}catch(e){setAlert(`${e.message} If payment was deducted, do not start another payment.`);return false}}

  async function init(){
    applyModeCopy();state.cart=readCart();state.pin=clean(localStorage.getItem(PIN_KEY)||"");bindInputs();
    try{const user=await getStoreUser();if(user){if($("#customerName")&&!clean($("#customerName").value)&&user.displayName)$("#customerName").value=user.displayName;if($("#customerEmail")&&!clean($("#customerEmail").value)&&user.email)$("#customerEmail").value=user.email}}catch{}
    if(!state.cart.length){showEmpty();return}if(state.pin)$("#checkoutPin").value=state.pin;
    try{await validateCheckout(state.pin);showLayout();if(state.pin&&state.delivery)renderPinResult(state.delivery);await retryPendingVerification()}catch(e){showLayout();setAlert(e.message||"Your cart could not be verified. Please return to cart and review it.");$("#placeOrderBtn").disabled=true;$("#placeOrderHelp").textContent="Return to cart and resolve availability before checkout."}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
}());
