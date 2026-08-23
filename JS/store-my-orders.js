import { getStoreUser, getStoreIdToken } from "./store-account-auth.js";

const API_BASE = "https://test.govjobupdates.com/live-test/store-api";
const $ = (s) => document.querySelector(s);
const clean = (v) => String(v ?? "").replace(/\s+/g, " ").trim();
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const money = (p) => `₹${(Number(p || 0) / 100).toLocaleString("en-IN", {minimumFractionDigits:Number(p || 0) % 100 ? 2 : 0, maximumFractionDigits:2})}`;
const state = { orders: [], filter: "all", loading: false };

const STATUS_LABELS = {
  placed: "Placed", confirmed: "Confirmed", packed: "Packed", shipped: "Shipped",
  out_for_delivery: "Out for Delivery", delivery_failed: "Delivery Failed",
  rto_in_transit: "RTO in Transit", rto_received: "RTO Received",
  lost_in_transit: "Lost in Transit", delivered: "Delivered", cancelled: "Cancelled",
  return_requested: "Return Requested", returned: "Returned"
};

function statusLabel(v) { return STATUS_LABELS[clean(v).toLowerCase()] || clean(v).replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Order"; }
function statusClass(v) {
  v = clean(v).toLowerCase();
  if (["delivered"].includes(v)) return "is-success";
  if (["cancelled","lost_in_transit","returned"].includes(v)) return "is-danger";
  if (["delivery_failed","rto_in_transit","rto_received","return_requested"].includes(v)) return "is-warning";
  return "";
}
function formatDate(v) {
  if (!v) return "—";
  const iso = String(v).replace(" ", "T");
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return clean(v);
  return new Intl.DateTimeFormat("en-IN", {day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(d);
}
function etaLabel(v) { v = clean(v); if (!v) return "To be confirmed"; return /^\d+$/.test(v) ? `${v} day${v === "1" ? "" : "s"}` : v; }
function setAlert(msg) { const el = $("#myOrdersAlert"); if (!el) return; el.textContent = msg || ""; el.hidden = !msg; }
function setClaimMessage(msg, error=false) { const el=$("#claimOrderMessage"); if(!el)return; el.textContent=msg||""; el.className=`claim-order-message${msg?" show":""}${error?" error":""}`; }
function showLogin() { $("#myOrdersLoading").hidden=true; $("#myOrdersContent").hidden=true; $("#myOrdersLogin").hidden=false; }
function showContent() { $("#myOrdersLoading").hidden=true; $("#myOrdersLogin").hidden=true; $("#myOrdersContent").hidden=false; }

async function authFetch(url, options={}) {
  let token = await getStoreIdToken(false);
  if (!token) throw Object.assign(new Error("Please login to view your orders."), { code:"authentication_required" });
  const headers = { ...(options.headers || {}), Authorization:`Bearer ${token}` };
  let response = await fetch(url, { ...options, mode:"cors", cache:"no-store", credentials:"omit", headers });
  if (response.status === 401) {
    token = await getStoreIdToken(true);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      response = await fetch(url, { ...options, mode:"cors", cache:"no-store", credentials:"omit", headers });
    }
  }
  return response;
}

function orderMatchesFilter(order) {
  const s=clean(order.order_status).toLowerCase();
  if(state.filter==="all") return true;
  if(state.filter==="active") return !["delivered","cancelled","returned","lost_in_transit","rto_received"].includes(s);
  if(state.filter==="delivered") return s==="delivered";
  if(state.filter==="cancelled") return ["cancelled","returned","rto_received","lost_in_transit"].includes(s);
  return true;
}

function renderItems(items) {
  const safe = Array.isArray(items) ? items : [];
  if (!safe.length) return '<div class="order-item-row"><div><strong>Order item</strong><span>Item details unavailable</span></div></div>';
  return safe.map(item => `<div class="order-item-row"><div><strong>${esc(item.title || "Product")}</strong><span>${item.variant ? esc(item.variant) + " · " : ""}Qty ${Number(item.quantity || 0)}${item.sku ? ` · SKU ${esc(item.sku)}` : ""}</span></div><div class="order-item-price">${money(item.line_total_paise)}</div></div>`).join("");
}

function renderTimeline(history) {
  const rows = Array.isArray(history) ? history : [];
  if (!rows.length) return '<div class="order-timeline-row"><div class="order-timeline-dot"><i class="fas fa-check"></i></div><div><strong>Order placed</strong><span>Status history will appear here.</span></div></div>';
  return rows.map(row => `<div class="order-timeline-row"><div class="order-timeline-dot"><i class="fas fa-check" aria-hidden="true"></i></div><div><strong>${esc(statusLabel(row.status))}</strong><span>${esc(formatDate(row.created_at))}${row.note ? ` · ${esc(row.note)}` : ""}</span></div></div>`).join("");
}

function pendingRequest(order, type){return (Array.isArray(order.requests)?order.requests:[]).find(r=>r.type===type&&r.status==='pending')||null}
function latestRequest(order,type){return (Array.isArray(order.requests)?order.requests:[]).find(r=>r.type===type)||null}
function requestButton(order,index){
  const st=clean(order.order_status).toLowerCase();
  const cancel=pendingRequest(order,'cancel'), ret=pendingRequest(order,'return');
  if(cancel) return `<button class="order-request-btn is-pending" type="button" disabled><i class="fas fa-clock"></i> Cancellation Pending</button>`;
  if(ret) return `<button class="order-request-btn is-pending" type="button" disabled><i class="fas fa-clock"></i> Return Pending</button>`;
  if(['placed','confirmed','packed'].includes(st)) return `<button class="order-request-btn" type="button" data-request-number="${esc(order.order_number||'')}" data-request-type="cancel"><i class="fas fa-ban"></i> Request Cancellation</button>`;
  if(st==='delivered') {
    if(order.return_allowed === false || clean(order.open_box_status).toLowerCase()==='accepted') {
      return `<button class="order-request-btn is-pending" type="button" disabled title="${esc(order.return_block_reason || 'Return is not available after accepting an Open Box delivery.')}\"><i class="fas fa-shield-halved"></i> Return Not Available</button>`;
    }
    return `<button class="order-request-btn" type="button" data-request-number="${esc(order.order_number||'')}" data-request-type="return"><i class="fas fa-rotate-left"></i> Request Return</button>`;
  }
  return '';
}
function requestHistory(order){
  const rows=Array.isArray(order.requests)?order.requests:[];
  if(!rows.length)return '';
  return `<div class="order-request-history"><strong>Cancellation / Return Requests</strong>${rows.map(r=>`<div class="order-request-history-row"><span>${esc((r.type==='cancel'?'Cancellation':'Return')+' · '+statusLabel(r.status))}</span><small>${esc(formatDate(r.created_at))}${r.admin_note?` · ${esc(r.admin_note)}`:''}</small></div>`).join('')}</div>`;
}
function ensureRequestDialog(){
  if($('#storeOrderRequestDialog'))return;
  document.body.insertAdjacentHTML('beforeend',`<div class="order-request-modal" id="storeOrderRequestDialog" hidden><div class="order-request-backdrop" data-close-request></div><section class="order-request-panel" role="dialog" aria-modal="true" aria-labelledby="orderRequestTitle"><button class="order-request-close" type="button" data-close-request aria-label="Close"><i class="fas fa-xmark"></i></button><span class="my-orders-eyebrow">Order Support</span><h2 id="orderRequestTitle">Request</h2><p id="orderRequestCopy"></p><form id="orderRequestForm"><input type="hidden" id="orderRequestNumber"><input type="hidden" id="orderRequestType"><label>Reason<select id="orderRequestReason" required></select></label><label>Additional details <span>(optional)</span><textarea id="orderRequestNote" maxlength="500" rows="4" placeholder="Tell us anything that may help us process the request."></textarea></label><div class="order-request-message" id="orderRequestMessage"></div><div class="order-request-actions"><button type="button" class="order-request-secondary" data-close-request>Keep Order</button><button type="submit" class="order-request-submit" id="orderRequestSubmit">Submit Request</button></div></form><p class="order-request-footnote">Submitting a request does not immediately change inventory or payment. Our team reviews it first.</p></section></div>`);
  document.querySelectorAll('[data-close-request]').forEach(b=>b.addEventListener('click',closeRequestDialog));
  $('#orderRequestForm')?.addEventListener('submit',submitOrderRequest);
}
function openRequestDialog(order,type){
  ensureRequestDialog();
  const dlg=$('#storeOrderRequestDialog'), reason=$('#orderRequestReason');
  $('#orderRequestNumber').value=order.order_number||''; $('#orderRequestType').value=type; $('#orderRequestNote').value=''; $('#orderRequestMessage').textContent='';
  const cancelReasons=[['changed_mind','Changed my mind'],['ordered_by_mistake','Ordered by mistake'],['wrong_item','Wrong item selected'],['delivery_too_late','Delivery may be too late'],['other','Other']];
  const returnReasons=[['wrong_item','Wrong item received'],['size_fit_issue','Size / fit issue'],['damaged_item','Damaged item'],['quality_issue','Quality issue'],['not_as_expected','Not as expected'],['other','Other']];
  const rows=type==='cancel'?cancelReasons:returnReasons;
  reason.innerHTML=rows.map(([v,l])=>`<option value="${v}">${l}</option>`).join('');
  $('#orderRequestTitle').textContent=type==='cancel'?'Request Order Cancellation':'Request a Return';
  $('#orderRequestCopy').textContent=type==='cancel'?'Cancellation is available only before dispatch. Your order stays active until our team approves the request.':'Returns can be requested after delivery within the configured return window. Our team will review the request before any stock or refund action.';
  dlg.hidden=false; document.body.classList.add('order-request-open');
}
function closeRequestDialog(){const dlg=$('#storeOrderRequestDialog');if(dlg)dlg.hidden=true;document.body.classList.remove('order-request-open')}
async function submitOrderRequest(e){
  e.preventDefault(); const btn=$('#orderRequestSubmit'), msg=$('#orderRequestMessage'); btn.disabled=true; btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Submitting…'; msg.textContent=''; msg.className='order-request-message';
  try{const response=await authFetch(`${API_BASE}/order-request.php`,{method:'POST',headers:{'Content-Type':'application/json','X-Requested-With':'XMLHttpRequest'},body:JSON.stringify({order_number:$('#orderRequestNumber').value,request_type:$('#orderRequestType').value,reason_code:$('#orderRequestReason').value,note:clean($('#orderRequestNote').value)})});const data=await response.json().catch(()=>null);if(!response.ok||!data?.success)throw new Error(data?.message||'Could not submit request.');msg.textContent=data.message||'Request submitted.';msg.className='order-request-message success';setTimeout(async()=>{closeRequestDialog();await loadOrders()},700)}catch(err){msg.textContent=err.message||'Could not submit request.';msg.className='order-request-message error'}finally{btn.disabled=false;btn.textContent='Submit Request'}
}
function bindRequestButtons(){document.querySelectorAll('[data-request-number]').forEach(btn=>btn.addEventListener('click',()=>{const order=state.orders.find(o=>o.order_number===btn.dataset.requestNumber);if(order)openRequestDialog(order,btn.dataset.requestType)}))}

function renderOrderCard(order, index) {
  const status = clean(order.order_status).toLowerCase();
  const items = Array.isArray(order.items) ? order.items : [];
  const courierBits = [];
  if (order.courier_partner) courierBits.push(esc(order.courier_partner));
  if (order.tracking_number) courierBits.push(`Tracking ID ${esc(order.tracking_number)}`);
  const shipment = courierBits.length ? courierBits.join(" · ") : (status === "shipped" || status === "out_for_delivery" ? "Shipment details being updated" : "");
  const trackingLink = /^https:\/\//i.test(clean(order.tracking_url)) ? `<a class="order-track-btn" href="${esc(order.tracking_url)}" target="_blank" rel="noopener">Courier Tracking <i class="fas fa-arrow-up-right-from-square"></i></a>` : `<a class="order-track-btn" href="store-track-order.html?order=${encodeURIComponent(order.order_number || "")}">Track Order <i class="fas fa-location-crosshairs"></i></a>`;
  return `<article class="order-card" data-status="${esc(status)}">
    <div class="order-card-head">
      <div><div class="order-card-meta"><span><i class="far fa-calendar"></i> ${esc(formatDate(order.created_at))}</span><span>${Number(order.item_quantity || 0)} item${Number(order.item_quantity || 0) === 1 ? "" : "s"}</span></div><div class="order-card-number"><strong>${esc(order.order_number)}</strong><span class="order-status-pill ${statusClass(status)}">${esc(statusLabel(status))}</span></div></div>
      <div class="order-card-total"><span>Order Total</span><strong>${money(order.grand_total_paise)}</strong></div>
    </div>
    <div class="order-card-body">
      <div class="order-items-preview">${renderItems(items)}</div>
      <div class="order-card-side">
        <div class="order-payment"><span>Payment:</span><strong>${esc(statusLabel(order.payment_status || "pending"))} · ${esc(String(order.payment_method || "cod").toUpperCase())}</strong></div>
        ${shipment ? `<div class="order-shipment-mini"><i class="fas fa-truck-fast"></i> ${shipment}</div>` : ""}
        <div class="order-card-actions">${trackingLink}${requestButton(order,index)}<button class="order-detail-btn" type="button" data-order-details="${index}"><i class="fas fa-receipt"></i> Details</button></div>
      </div>
    </div>
    <div class="order-details" id="orderDetails${index}" hidden>
      <div class="order-details-grid">
        <div class="order-detail-box"><span>Delivery Area</span><strong>${esc(order.city || "—")} · ${esc(order.pin_code || "—")}</strong></div>
        <div class="order-detail-box"><span>Estimated Delivery</span><strong>${esc(etaLabel(order.eta))}</strong></div>
        <div class="order-detail-box"><span>Shipment</span><strong>${shipment || "Not shipped yet"}</strong></div>
      </div>
      ${order.shipment_note ? `<div class="order-detail-box" style="margin-top:.65rem"><span>Shipment Note</span><strong>${esc(order.shipment_note)}</strong></div>` : ""}
      ${requestHistory(order)}<div class="order-timeline">${renderTimeline(order.history)}</div>
    </div>
  </article>`;
}

function bindDetails() {
  document.querySelectorAll("[data-order-details]").forEach(btn => btn.addEventListener("click", () => {
    const id = `#orderDetails${Number(btn.dataset.orderDetails)}`;
    const panel=$(id); if(!panel)return; const opening=panel.hidden; panel.hidden=!panel.hidden; btn.innerHTML=opening?'<i class="fas fa-chevron-up"></i> Hide Details':'<i class="fas fa-receipt"></i> Details';
  }));
}

function renderOrders() {
  const list=$("#myOrdersList"), empty=$("#myOrdersEmpty"), count=$("#myOrdersCount");
  if(!list)return;
  count.textContent=String(state.orders.length);
  empty.hidden = state.orders.length !== 0;
  const filtered=state.orders.filter(orderMatchesFilter);
  if(!filtered.length && state.orders.length){ list.innerHTML='<div class="my-orders-filter-empty">No orders match this filter.</div>'; return; }
  list.innerHTML=filtered.map((o,i)=>renderOrderCard(o,i)).join("");
  bindDetails();
  bindRequestButtons();
}

async function loadOrders() {
  if(state.loading)return; state.loading=true; setAlert("");
  const refresh=$("#refreshMyOrders"); if(refresh)refresh.disabled=true;
  try {
    const user=await getStoreUser();
    if(!user){showLogin();return;}
    showContent();
    $("#myOrdersAccountName").textContent=user.displayName||"GovJobUpdates User";
    $("#myOrdersAccountEmail").textContent=user.email||"";
    const response=await authFetch(`${API_BASE}/my-orders.php`,{method:"GET",headers:{"X-Requested-With":"XMLHttpRequest"}});
    const data=await response.json().catch(()=>null);
    if(!response.ok||!data?.success){
      if(response.status===401){showLogin();return;}
      throw new Error(data?.message||"Could not load your orders.");
    }
    state.orders=Array.isArray(data.orders)?data.orders:[];
    renderOrders();
  } catch(err) {
    if(err?.code==="authentication_required"){showLogin();return;}
    showContent(); setAlert(err.message||"Could not load your orders.");
  } finally { state.loading=false; if(refresh)refresh.disabled=false; $("#myOrdersLoading").hidden=true; }
}

async function claimOrder(event) {
  event.preventDefault(); setClaimMessage("");
  const orderNumber=clean($("#claimOrderNumber")?.value).toUpperCase();
  const mobile=clean($("#claimOrderMobile")?.value).replace(/\D/g,"");
  if(!/^GJU-PS-[A-Z0-9-]{6,30}$/.test(orderNumber)){setClaimMessage("Enter a valid GovJobUpdates Store order number.",true);return;}
  if(!/^[6-9]\d{9}$/.test(mobile)){setClaimMessage("Enter the 10 digit mobile number used on that order.",true);return;}
  const btn=$("#claimOrderBtn");btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Linking…';
  try{
    const response=await authFetch(`${API_BASE}/claim-order.php`,{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify({order_number:orderNumber,mobile})});
    const data=await response.json().catch(()=>null);
    if(!response.ok||!data?.success)throw new Error(data?.message||"Could not link this order.");
    setClaimMessage(`Order ${orderNumber} has been added to Your Orders.`);
    $("#claimOrderForm").reset();
    await loadOrders();
  }catch(err){setClaimMessage(err.message||"Could not link this order.",true)}finally{btn.disabled=false;btn.innerHTML='<i class="fas fa-link"></i> Add to Your Orders'}
}

function bind() {
  $("#refreshMyOrders")?.addEventListener("click", loadOrders);
  $("#myOrdersFilter")?.addEventListener("change", e=>{state.filter=e.target.value||"all";renderOrders()});
  $("#claimOrderForm")?.addEventListener("submit", claimOrder);
}

async function init(){bind();ensureRequestDialog();await loadOrders();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();