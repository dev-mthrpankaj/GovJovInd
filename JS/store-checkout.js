import { getStoreUser, storeAuthHeaders } from "./store-account-auth.js";

(function(){
  "use strict";
  const API_BASE="https://test.govjobupdates.com/live-test/store-api";
  const CART_KEY="gjuStoreCart";
  const LEGACY_CART_KEY="gjuPhysicalStoreCart";
  const PIN_KEY="gjuStoreDeliveryPin";
  const CHECKOUT_KEY="gjuStoreCheckoutKey";
  const LAST_ORDER_KEY="gjuStoreLastOrder";
  const $=s=>document.querySelector(s);
  const clean=v=>String(v??"").replace(/\s+/g," ").trim();
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const money=p=>`₹${(Number(p||0)/100).toLocaleString("en-IN",{minimumFractionDigits:Number(p||0)%100?2:0,maximumFractionDigits:2})}`;
  const etaLabel=v=>{v=clean(v);if(!v)return"To be confirmed";return /^\d+$/.test(v)?`${v} day${v==="1"?"":"s"}`:v};
  const state={cart:[],validated:null,delivery:null,pin:"",submitting:false};

  function readCart(){try{let raw=localStorage.getItem(CART_KEY);if(!raw){raw=localStorage.getItem(LEGACY_CART_KEY);if(raw)localStorage.setItem(CART_KEY,raw)}const c=JSON.parse(raw||"[]");return Array.isArray(c)?c.filter(i=>Number(i.variant_id)>0&&Number(i.quantity)>0):[]}catch{return[]}}
  function checkoutKey(){let key=sessionStorage.getItem(CHECKOUT_KEY)||"";if(/^[A-Za-z0-9_-]{20,120}$/.test(key))return key;try{key="gju_"+crypto.randomUUID().replace(/-/g,"")}catch{key="gju_"+Date.now().toString(36)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)}sessionStorage.setItem(CHECKOUT_KEY,key);return key}
  function resetCheckoutKey(){sessionStorage.removeItem(CHECKOUT_KEY)}
  function setAlert(msg){const el=$("#checkoutAlert");if(!el)return;el.textContent=msg||"";el.hidden=!msg;if(msg)el.scrollIntoView({behavior:"smooth",block:"center"})}
  function setLoading(show){$("#checkoutLoading").hidden=!show}
  function showEmpty(){setLoading(false);$("#checkoutLayout").hidden=true;$("#checkoutSuccess").hidden=true;$("#checkoutEmpty").hidden=false}
  function showLayout(){setLoading(false);$("#checkoutEmpty").hidden=true;$("#checkoutSuccess").hidden=true;$("#checkoutLayout").hidden=false}
  function cartPayload(){return state.cart.map(i=>({variant_id:Number(i.variant_id),quantity:Number(i.quantity)}))}

  async function validateCheckout(pin){
    if(!state.cart.length){showEmpty();return false}
    const payload={items:cartPayload()};
    if(/^\d{6}$/.test(pin))payload.pin_code=pin;
    const r=await fetch(`${API_BASE}/cart-validate.php`,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(payload)});
    const j=await r.json().catch(()=>null);
    if(!r.ok||!j?.success)throw new Error(j?.message||"Your cart could not be verified.");
    state.validated=j;
    state.delivery=j.delivery||null;
    renderSummary();
    if(state.delivery)renderPinResult(state.delivery);
    updatePlaceButton();
    return true;
  }

  function localItem(id){return state.cart.find(i=>Number(i.variant_id)===Number(id))||{}}
  function renderSummary(){
    const v=state.validated;if(!v)return;
    const box=$("#checkoutItems");
    box.innerHTML=v.items.map(item=>{const local=localItem(item.variant_id);const img=clean(local.image);const variant=[item.size,item.color].filter(Boolean).join(" / ");return `<article class="checkout-item"><div class="checkout-item-image">${img?`<img src="${esc(img)}" alt="${esc(item.product_title)}">`:'<i class="fas fa-box-open" aria-hidden="true"></i>'}</div><div class="checkout-item-copy"><strong>${esc(item.product_title)}</strong><span>${variant?esc(variant)+" · ":""}Qty ${Number(item.quantity)}</span></div><div class="checkout-item-price"><strong>${money(item.line_total_paise)}</strong><span>${money(item.selling_price_paise)} each</span></div></article>`}).join("");
    $("#checkoutSubtotal").textContent=money(v.subtotal_paise);
    if(state.delivery?.serviceable){$("#checkoutDelivery").textContent=Number(state.delivery.delivery_fee_paise||0)===0?"Free":money(state.delivery.delivery_fee_paise);$("#checkoutGrandTotal").textContent=money(state.delivery.grand_total_paise??(Number(v.subtotal_paise)+Number(state.delivery.delivery_fee_paise||0)))}else{$("#checkoutDelivery").textContent="Verify PIN";$("#checkoutGrandTotal").textContent=money(v.subtotal_paise)}
  }

  function renderPinResult(d){
    const box=$("#checkoutPinResult"),summary=$("#summaryDeliveryInfo");
    if(!d?.serviceable){box.className="checkout-pin-result show error";box.textContent=`Delivery is not available for PIN ${state.pin}.`;summary.innerHTML='<i class="fas fa-location-dot"></i><span>This PIN code is not serviceable.</span>';return}
    const ok=d.cod_available&&d.minimum_order_met!==false;
    const bits=[`Delivery available${d.city?` in ${d.city}`:""}${d.locality?`, ${d.locality}`:""}.`,d.cod_available?"COD available.":"COD unavailable.",Number(d.delivery_fee_paise||0)===0?"Free delivery.":`Delivery charge ${money(d.delivery_fee_paise)}.`,d.eta?`ETA: ${d.eta}.`:""];
    box.className=`checkout-pin-result show ${ok?"success":"warning"}`;box.textContent=bits.filter(Boolean).join(" ");
    summary.innerHTML=`<i class="fas fa-truck-fast" aria-hidden="true"></i><span>${esc(d.eta?`Delivery: ${d.eta}`:"Delivery verified")}${Number(d.delivery_fee_paise||0)===0?" · Free delivery":""}</span>`;
  }

  async function verifyPin(){
    setAlert("");const pin=clean($("#checkoutPin").value);const btn=$("#verifyPinBtn");
    if(!/^\d{6}$/.test(pin)){state.delivery=null;$("#checkoutPinResult").className="checkout-pin-result show error";$("#checkoutPinResult").textContent="Enter a valid 6 digit PIN code.";updatePlaceButton();return false}
    state.pin=pin;localStorage.setItem(PIN_KEY,pin);btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Checking…';
    try{await validateCheckout(pin);return Boolean(state.delivery?.serviceable&&state.delivery?.cod_available&&state.delivery?.minimum_order_met!==false)}catch(e){state.delivery=null;$("#checkoutPinResult").className="checkout-pin-result show error";$("#checkoutPinResult").textContent=e.message||"Could not verify delivery.";updatePlaceButton();return false}finally{btn.disabled=false;btn.innerHTML='<i class="fas fa-location-dot"></i> Verify PIN'}
  }

  function validateForm(mark=true){
    const fields={name:$("#customerName"),mobile:$("#customerMobile"),email:$("#customerEmail"),address:$("#addressLine1"),locality:$("#locality"),pin:$("#checkoutPin")};
    const checks={name:clean(fields.name.value).length>=2,mobile:/^[6-9]\d{9}$/.test(clean(fields.mobile.value)),email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(fields.email.value)),address:clean(fields.address.value).length>=3,locality:clean(fields.locality.value).length>=2,pin:/^\d{6}$/.test(clean(fields.pin.value))};
    if(mark)Object.keys(fields).forEach(k=>fields[k].classList.toggle("is-invalid",!checks[k]));
    return Object.values(checks).every(Boolean)
  }

  function updatePlaceButton(){
    const btn=$("#placeOrderBtn"),help=$("#placeOrderHelp");
    const cartOk=Boolean(state.validated?.items?.length);
    const deliveryOk=Boolean(state.delivery?.serviceable&&state.delivery?.cod_available&&state.delivery?.minimum_order_met!==false);
    const formOk=validateForm(false);
    const enabled=cartOk&&deliveryOk&&formOk&&!state.submitting;
    btn.disabled=!enabled;
    if(state.submitting)help.textContent="Creating your order securely…";
    else if(!cartOk)help.textContent="Your cart needs live verification.";
    else if(!deliveryOk)help.textContent="Verify a serviceable PIN with COD availability.";
    else if(!formOk)help.textContent="Complete all required customer and delivery details.";
    else help.textContent="Everything is verified. You can place your COD order.";
  }

  function collectOrder(){return {idempotency_key:checkoutKey(),customer_name:clean($("#customerName").value),mobile:clean($("#customerMobile").value),email:clean($("#customerEmail").value),address:clean($("#addressLine1").value),address_line2:clean($("#addressLine2").value),landmark:clean($("#landmark").value),locality:clean($("#locality").value),pin_code:clean($("#checkoutPin").value),delivery_notes:clean($("#deliveryNotes").value),payment_method:"cod",items:cartPayload()}}

  async function submitOrder(e){
    e.preventDefault();if(state.submitting)return;setAlert("");
    if(!validateForm(true)){setAlert("Please complete all required checkout details correctly.");updatePlaceButton();return}
    const pinOk=await verifyPin();if(!pinOk){setAlert("Please verify a serviceable PIN code with Cash on Delivery available.");return}
    state.submitting=true;updatePlaceButton();const btn=$("#placeOrderBtn");btn.innerHTML='<span><i class="fas fa-spinner fa-spin"></i> Placing Order…</span>';
    const data=collectOrder();
    try{
      const accountHeaders=await storeAuthHeaders(false);
      const r=await fetch(`${API_BASE}/create-order.php`,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-Checkout-Idempotency-Key":data.idempotency_key,...accountHeaders},body:JSON.stringify(data)});
      const j=await r.json().catch(()=>null);
      if(!r.ok||!j?.success)throw new Error(j?.message||"Your order could not be created.");
      showSuccess(j.order||{});
    }catch(err){setAlert(err.message||"Your order could not be created. Your cart has not been cleared.");state.submitting=false;btn.innerHTML='<span><i class="fas fa-lock"></i> Place COD Order</span><i class="fas fa-arrow-right"></i>';updatePlaceButton()}
  }

  function showSuccess(order){
    localStorage.removeItem(CART_KEY);localStorage.removeItem(LEGACY_CART_KEY);localStorage.removeItem(PIN_KEY);resetCheckoutKey();
    try{localStorage.setItem(LAST_ORDER_KEY,JSON.stringify({order_number:order.order_number||"",mobile:clean($("#customerMobile").value),email:clean($("#customerEmail").value),created_at:new Date().toISOString()}))}catch{}
    $("#checkoutLayout").hidden=true;$("#checkoutEmpty").hidden=true;$("#checkoutLoading").hidden=true;$("#checkoutSuccess").hidden=false;
    $("#successOrderNumber").textContent=order.order_number||"—";$("#successAmount").textContent=money(order.grand_total_paise||0);$("#successStatus").textContent=String(order.order_status||"placed").replace(/_/g," ").replace(/^./,c=>c.toUpperCase());$("#successEta").textContent=etaLabel(order.eta);
    const trackLink=$("#successTrackOrder");if(trackLink&&order.order_number)trackLink.href=`store-track-order.html?order=${encodeURIComponent(order.order_number)}`;
    window.scrollTo({top:0,behavior:"smooth"})
  }

  function bindInputs(){
    ["#customerName","#customerMobile","#customerEmail","#addressLine1","#locality"].forEach(sel=>$(sel)?.addEventListener("input",e=>{e.target.classList.remove("is-invalid");updatePlaceButton()}));
    $("#checkoutPin")?.addEventListener("input",()=>{state.delivery=null;$("#checkoutPinResult").className="checkout-pin-result";$("#checkoutPinResult").textContent="";updatePlaceButton()});
    $("#verifyPinBtn")?.addEventListener("click",verifyPin);$("#checkoutForm")?.addEventListener("submit",submitOrder)
  }

  async function init(){
    state.cart=readCart();state.pin=clean(localStorage.getItem(PIN_KEY)||"");bindInputs();
    try{
      const user=await getStoreUser();
      if(user){
        if($("#customerName")&&!clean($("#customerName").value)&&user.displayName)$("#customerName").value=user.displayName;
        if($("#customerEmail")&&!clean($("#customerEmail").value)&&user.email)$("#customerEmail").value=user.email;
      }
    }catch{}
    if(!state.cart.length){showEmpty();return}
    if(state.pin)$("#checkoutPin").value=state.pin;
    try{await validateCheckout(state.pin);showLayout();if(state.pin&&state.delivery)renderPinResult(state.delivery)}catch(e){showLayout();setAlert(e.message||"Your cart could not be verified. Please return to cart and review it.");$("#placeOrderBtn").disabled=true;$("#placeOrderHelp").textContent="Return to cart and resolve availability before checkout."}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
}());
