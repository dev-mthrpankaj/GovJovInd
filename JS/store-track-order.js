(function(){
  "use strict";
  const API="https://test.govjobupdates.com/live-test/store-api/track-order.php";
  const LAST_ORDER_KEY="gjuStoreLastOrder";
  const $=s=>document.querySelector(s);
  const clean=v=>String(v??"").replace(/\s+/g," ").trim();
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const money=p=>`₹${(Number(p||0)/100).toLocaleString("en-IN",{minimumFractionDigits:Number(p||0)%100?2:0,maximumFractionDigits:2})}`;
  const label=s=>String(s||"").replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
  function eta(v){v=clean(v);if(!v)return"To be confirmed";return /^\d+$/.test(v)?`${v} day${v==="1"?"":"s"}`:v}
  function when(v){v=clean(v);if(!v)return"";const d=new Date(v.replace(" ","T"));return Number.isNaN(d.getTime())?v:d.toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}
  const STATUS={
    placed:{note:"Your order has been received and the items are reserved.",cls:""},
    confirmed:{note:"Your order has been confirmed and is being prepared.",cls:""},
    packed:{note:"Your order is packed and ready for dispatch.",cls:""},
    shipped:{note:"Your parcel has been handed over to the courier or delivery partner.",cls:""},
    out_for_delivery:{note:"Your parcel is out for delivery.",cls:"warning"},
    delivery_failed:{note:"The delivery attempt could not be completed. Another attempt or return-to-origin update may follow.",cls:"warning"},
    rto_in_transit:{note:"The parcel is being returned to GovJobUpdates Store.",cls:"warning"},
    rto_received:{note:"The returned parcel has reached GovJobUpdates Store.",cls:"danger"},
    lost_in_transit:{note:"The shipment has been marked lost in transit. Please contact support if you need assistance.",cls:"danger"},
    delivered:{note:"Your order has been delivered successfully.",cls:"success"},
    cancelled:{note:"This order has been cancelled.",cls:"danger"},
    return_requested:{note:"A return has been requested for this order.",cls:"warning"},
    returned:{note:"The return has been completed.",cls:"danger"}
  };
  function msg(t){const b=$("#trackMessage");b.textContent=t||"";b.classList.toggle("show",Boolean(t))}
  function loading(on){const b=$("#trackSubmitBtn");b.disabled=on;b.innerHTML=on?'<i class="fas fa-spinner fa-spin"></i> Checking…':'<i class="fas fa-magnifying-glass"></i> Track Order'}
  async function load(number,mobile){
    const r=await fetch(API,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify({order_number:number,mobile})});
    const j=await r.json().catch(()=>null);if(!r.ok||!j?.success)throw new Error(j?.message||"Could not load this order.");return j;
  }
  function render(j){
    const o=j.order||{},items=Array.isArray(j.items)?j.items:[],history=Array.isArray(j.history)?j.history:[];
    $("#trackEmpty").hidden=true;$("#trackResult").hidden=false;
    const st=String(o.order_status||"placed").toLowerCase(),meta=STATUS[st]||{note:"Order status updated.",cls:""};
    $("#trackCurrentStatus").textContent=label(st);const pill=$("#trackStatusPill");pill.textContent=label(st);pill.className=`track-status-pill ${meta.cls}`.trim();
    $("#trackOrderId").textContent=o.order_number||"—";$("#trackAmount").textContent=money(o.grand_total_paise);$("#trackPayment").textContent=`${label(o.payment_method)} · ${label(o.payment_status)}`;$("#trackArea").textContent=[o.city,o.pin_code].filter(Boolean).join(" - ")||"—";$("#trackEta").textContent=eta(o.delivery_eta_label);$("#trackItemCount").textContent=String(items.reduce((n,i)=>n+Number(i.quantity||0),0));
    const courier=clean(o.courier_partner),awb=clean(o.tracking_number),url=clean(o.tracking_url),note=clean(o.shipment_note),card=$("#shipmentCard");
    if(courier||awb||url||note){card.hidden=false;$("#trackCourier").textContent=courier||"Delivery partner assigned";$("#trackAwb").textContent=awb?`Tracking ID: ${awb}`:"Tracking ID will be updated when available.";$("#trackShipmentNote").textContent=note;const a=$("#trackShipmentLink");if(url&&/^https?:\/\//i.test(url)){a.href=url;a.hidden=false}else{a.hidden=true}}else card.hidden=true;
    $("#trackItems").innerHTML=items.map(i=>`<div class="track-item"><div class="track-item-copy"><strong>${esc(i.product_title_snapshot||"Item")}</strong><span>${esc(i.variant_label_snapshot||"")} · Qty ${Number(i.quantity||0)}</span></div><div class="track-item-price"><strong>${money(i.line_total_paise)}</strong></div></div>`).join("")||'<p>No item details available.</p>';
    $("#trackTimeline").innerHTML=history.map(h=>`<div class="track-step"><div class="track-step-icon"><i class="fas fa-check" aria-hidden="true"></i></div><div class="track-step-content"><strong>${esc(label(h.new_status))}</strong><span>${esc(when(h.created_at))}${clean(h.note)?` · ${esc(h.note)}`:""}</span></div></div>`).join("");
    const n=$("#trackStatusNote");n.textContent=meta.note;n.className=`track-status-note ${meta.cls}`.trim();
  }
  async function submit(e){e.preventDefault();msg("");const number=clean($("#trackOrderNumber").value).toUpperCase(),mobile=clean($("#trackMobile").value);if(!/^GJU-PS-\d{6}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/.test(number)){msg("Enter a valid GovJobUpdates Store order number.");return}if(!/^[6-9]\d{9}$/.test(mobile)){msg("Enter the 10 digit mobile number used at checkout.");return}loading(true);try{render(await load(number,mobile))}catch(err){$("#trackResult").hidden=true;$("#trackEmpty").hidden=false;msg(err.message||"Could not load this order.")}finally{loading(false)}}
  function prefill(){const q=new URLSearchParams(location.search),number=clean(q.get("order")).toUpperCase();if(number)$("#trackOrderNumber").value=number;try{const last=JSON.parse(localStorage.getItem(LAST_ORDER_KEY)||"null");if(last&&(!number||number===clean(last.order_number).toUpperCase())){if(!number&&last.order_number)$("#trackOrderNumber").value=last.order_number;if(last.mobile)$("#trackMobile").value=last.mobile}}catch{}}
  function init(){prefill();$("#storeTrackForm").addEventListener("submit",submit)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
}());
