(function () {
  "use strict";

  const CERTIFICATE_API_BASE = "https://test.govjobupdates.com/live-test/certificate-api";
  const CERTIFICATE_DRIVE_API_URL = "https://script.google.com/macros/s/AKfycbxDgRkmo0ZxktOZGdArFW-7APDT68ZJpETTvLSsaS4rD6h52TcB-lL-iJtypwg5gttPcQ/exec";
  const SERVICE_FEE_PAISE = 11000;
  const DELIVERY_FEE_PAISE = 5000;
  const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024;
  const ALLOWED_DOCUMENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  let verifiedPayment = null;
  let uploadInProgress = false;

  function clean(v) { return String(v || "").replace(/\s+/g, " ").trim(); }
  function validateMobile(v) { return /^[6-9]\d{9}$/.test(v); }
  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function money(paise) { return `₹${Math.round(Number(paise || 0) / 100)}`; }
  function selectedServices() { return $$('#serviceChoices input[name="services"]:checked').map((x) => x.value); }
  function isIncomeSelected() { return selectedServices().includes("Income Certificate"); }
  function onlineDocuments() { return Boolean($("#onlineDocumentsToggle")?.checked); }
  function homeDelivery() { return Boolean($("#homeDeliveryToggle")?.checked); }

  function setProgress(message, show = true) { const box=$("#certProgress"); if(!box)return; box.textContent=message||""; box.classList.toggle("show",Boolean(show&&message)); }
  function setError(message) { const box=$("#certError"); if(!box)return; box.textContent=message||""; box.classList.toggle("show",Boolean(message)); }
  function clearMessages(){ setProgress("",false); setError(""); const s=$("#certSuccess"); if(s){s.classList.remove("show");s.innerHTML="";} }
  function escapeHtml(v){ return String(v||"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }

  function currentTotalPaise(){ return selectedServices().length * SERVICE_FEE_PAISE + (homeDelivery()?DELIVERY_FEE_PAISE:0); }
  function refreshUI(){
    const services=selectedServices();
    const serviceFee=services.length*SERVICE_FEE_PAISE;
    const deliveryFee=homeDelivery()?DELIVERY_FEE_PAISE:0;
    $("#serviceFeeDisplay") && ($("#serviceFeeDisplay").textContent=money(serviceFee));
    $("#deliveryFeeDisplay") && ($("#deliveryFeeDisplay").textContent=money(deliveryFee));
    $("#totalFeeDisplay") && ($("#totalFeeDisplay").textContent=money(serviceFee+deliveryFee));

    const online=onlineDocuments();
    const income=isIncomeSelected();
    const needsCasteOrDomicile=services.some((service)=>service !== "Income Certificate");
    $("#onlineDocumentsArea")?.toggleAttribute("hidden",!online);
    $("#offlineDocumentsNote")?.toggleAttribute("hidden",online);

    const aadhaar=$("#aadhaarFile");
    if(aadhaar){
      aadhaar.required=online;
      aadhaar.accept=income?"application/pdf":"image/*,.pdf";
    }
    const letter=$("#letterFile");
    if(letter) letter.required=online&&needsCasteOrDomicile;
    $("#letterFileField")?.toggleAttribute("hidden",online&&!needsCasteOrDomicile);
    const photo=$("#photoFile"); if(photo) photo.required=online;

    if($("#aadhaarFileLabel")) $("#aadhaarFileLabel").textContent=income?"Upload Aadhaar Front + Back (Single PDF)":"Upload Aadhaar Card";
    if($("#aadhaarFileHelp")) $("#aadhaarFileHelp").textContent=income?"Both sides of Aadhaar must be combined into one PDF file.":"A clear Aadhaar image or PDF can be uploaded.";
    if($("#photoFileLabel")) $("#photoFileLabel").textContent=income?"Upload Passport Size Photo (for Income Certificate)":"Upload Passport Size Photo";
    if($("#photoFileHelp")) $("#photoFileHelp").textContent=income?"This photo will be used as the photo to be pasted on the Income Certificate and reused for other selected services.":"The same photo is reused for all selected certificate requests.";
    $("#incomeDocumentNote")?.toggleAttribute("hidden",!income);

    const offlineDocs=[];
    if(income) offlineDocs.push("Aadhaar front + back in one PDF/print set", "Passport size photo for Income Certificate");
    if(needsCasteOrDomicile) offlineDocs.push("Sabhasad / Pradhan Letter Pad");
    if(!income && needsCasteOrDomicile) offlineDocs.unshift("Aadhaar Card", "Passport size photo");
    if($("#offlineRequiredDocuments")) $("#offlineRequiredDocuments").textContent=offlineDocs.length?`Required documents: ${[...new Set(offlineDocs)].join("; ")}.`:"Select at least one certificate to see the required documents.";
    $("#offlineIncomePhoneNote")?.toggleAttribute("hidden",!income);

    const delivery=homeDelivery();
    $("#deliveryAddressArea")?.toggleAttribute("hidden",!delivery);
    ["deliveryName","deliveryMobile","deliveryAddress","deliveryPincode"].forEach((id)=>{const el=$("#"+id); if(el) el.required=delivery;});
    setSubmitState("ready");
  }

  function setSubmitState(mode){
    const btn=$("#certSubmitBtn"); if(!btn)return;
    if(mode==="creating"){btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Preparing Secure Payment...';return;}
    if(mode==="verifying"){btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Verifying Payment...';return;}
    if(mode==="uploading"){btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Uploading Documents...';return;}
    if(mode==="retry"){btn.disabled=false;btn.innerHTML='<i class="fas fa-rotate-right"></i> Retry Document Upload';return;}
    btn.disabled=false;
    const total=currentTotalPaise();
    btn.innerHTML=`<i class="fas fa-lock"></i> Pay ${money(total)} &amp; Submit Application`;
  }

  function collectApplicationData(){
    return {
      services:selectedServices(), applicant_name:clean($("#applicantName")?.value), father_husband_name:clean($("#fatherName")?.value),
      mobile:clean($("#mobileNumber")?.value), email:clean($("#emailId")?.value), district:clean($("#district")?.value), tehsil:clean($("#tehsil")?.value),
      aadhaar_last4:clean($("#aadhaarLast4")?.value), extra_note:clean($("#extraNote")?.value),
      document_submission_mode:onlineDocuments()?"online":"offline", home_delivery:homeDelivery(),
      delivery_name:clean($("#deliveryName")?.value), delivery_mobile:clean($("#deliveryMobile")?.value), delivery_address:clean($("#deliveryAddress")?.value), delivery_pincode:clean($("#deliveryPincode")?.value)
    };
  }

  function selectedFiles(){
    return {aadhaar:$("#aadhaarFile")?.files?.[0]||null,letter:$("#letterFile")?.files?.[0]||null,photo:$("#photoFile")?.files?.[0]||null,extra:$("#extraFile")?.files?.[0]||null};
  }

  function validateFile(file,label,imageOnly=false){ if(!file)throw new Error(`${label} is required.`); if(file.size<=0||file.size>MAX_FILE_SIZE_BYTES)throw new Error(`${label} must be under 1.5 MB.`); if(imageOnly){if(!String(file.type||"").startsWith("image/"))throw new Error(`${label} must be an image file.`);return;} if(!ALLOWED_DOCUMENT_TYPES.has(String(file.type||"").toLowerCase()))throw new Error(`${label} must be JPG, PNG, WEBP or PDF.`); }
  function validateApplication(data,files){
    if(!data.services.length)throw new Error("Please select at least one certificate service.");
    if(!data.applicant_name||!data.father_husband_name||!data.mobile||!data.email||!data.district||!data.tehsil)throw new Error("Please fill all required applicant details.");
    if(!validateMobile(data.mobile))throw new Error("Please enter a valid 10 digit Indian mobile number.");
    if(!validateEmail(data.email))throw new Error("Please enter a valid email address.");
    if(data.aadhaar_last4&&!/^\d{4}$/.test(data.aadhaar_last4))throw new Error("Aadhaar last 4 digits must contain exactly 4 numbers.");
    if(data.home_delivery){ if(!data.delivery_name||!validateMobile(data.delivery_mobile)||!data.delivery_address||!/^\d{6}$/.test(data.delivery_pincode))throw new Error("Please complete the home delivery address and valid mobile/PIN code."); }
    if(data.document_submission_mode==="online"){
      const income=data.services.includes("Income Certificate");
      const needsCasteOrDomicile=data.services.some((service)=>service !== "Income Certificate");
      validateFile(files.aadhaar,income?"Aadhaar Front + Back PDF":"Aadhaar Card");
      if(income && String(files.aadhaar?.type||"").toLowerCase()!=="application/pdf")throw new Error("For Income Certificate, Aadhaar front and back must be combined into one PDF file.");
      if(needsCasteOrDomicile)validateFile(files.letter,"Sabhasad / Pradhan Letter Pad");
      validateFile(files.photo,income?"Passport Size Photo for Income Certificate":"Passport Size Photo",true);
      if(files.extra)validateFile(files.extra,"Extra Document");
    }
  }

  async function postJson(url,payload){ const r=await fetch(url,{method:"POST",mode:"cors",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(payload)}); let x; try{x=await r.json();}catch{throw new Error("The certificate server returned an invalid response.");} if(!r.ok||!x?.success)throw new Error(x?.message||"The request could not be completed."); return x; }
  const createOrder=(data)=>postJson(`${CERTIFICATE_API_BASE}/create-order.php`,data);
  const verifyPayment=(requestId,p)=>postJson(`${CERTIFICATE_API_BASE}/verify-payment.php`,{request_id:requestId,razorpay_order_id:p.razorpay_order_id,razorpay_payment_id:p.razorpay_payment_id,razorpay_signature:p.razorpay_signature});

  function fileToBase64(file){return new Promise((resolve,reject)=>{if(!file){resolve(null);return;} if(file.size>MAX_FILE_SIZE_BYTES){reject(new Error(`${file.name} must be under 1.5 MB.`));return;} const r=new FileReader(); r.onload=()=>{const x=String(r.result||"");resolve({name:file.name,type:file.type||"application/octet-stream",size:file.size,data:x.includes(",")?x.split(",")[1]:x});};r.onerror=()=>reject(new Error(`Could not read ${file.name}.`));r.readAsDataURL(file);});}
  async function buildFilesPayload(files){const out={}; for(const [k,v] of Object.entries(files)) out[k]=await fileToBase64(v); return out;}
  async function uploadDocuments(requestId,uploadToken,files){const payload=await buildFilesPayload(files); const r=await fetch(CERTIFICATE_DRIVE_API_URL,{method:"POST",redirect:"follow",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"uploadCertificateDocuments",data:{requestId,uploadToken},files:payload})}); const text=await r.text(); let x; try{x=JSON.parse(text);}catch{throw new Error("Google Drive upload service returned an invalid response.");} if(!x?.success)throw new Error(x?.message||"Document upload failed."); return x;}

  function setSuccess(requestId,data){const box=$("#certSuccess");if(!box)return;const track=`up-certificate-status.html?request_id=${encodeURIComponent(requestId)}`;const docs=data.document_submission_mode==="offline"?"Submit offline":"Uploaded online";const delivery=data.home_delivery?"Home delivery requested":"Digital copy only";box.dataset.requestId=requestId;box.innerHTML=`<div class="success-title"><i class="fas fa-circle-check"></i> Application submitted successfully</div><div class="success-meta"><div class="success-meta-row"><span>Request ID</span><strong>${escapeHtml(requestId)}</strong></div><div class="success-meta-row"><span>Documents</span><strong>${docs}</strong></div><div class="success-meta-row"><span>Delivery</span><strong>${delivery}</strong></div></div><p>Please save your Request ID. Use it with your registered mobile number to track the request.</p><div class="cert-success-actions"><button class="btn copy-success" type="button" data-cert-action="copy-request"><i class="fas fa-copy"></i> Copy Request ID</button><a class="btn btn-primary" href="${track}"><i class="fas fa-route"></i> Track Application</a><button class="btn btn-light" type="button" data-cert-action="new-application"><i class="fas fa-plus"></i> Start New Application</button></div>`;box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"center"});}

  function openRazorpay(order,files,data){return new Promise((resolve,reject)=>{if(typeof window.Razorpay!=="function"){reject(new Error("Secure payment service could not be loaded."));return;}let completed=false;const rz=new window.Razorpay({key:order.razorpay_key_id,amount:order.amount,currency:order.currency,name:order.name||"GovJobUpdates",description:order.description||"UP Certificate Assistance",order_id:order.razorpay_order_id,prefill:order.prefill||{},modal:{ondismiss(){if(!completed){setProgress("",false);setSubmitState("ready");}}},handler:async function(p){completed=true;try{setSubmitState("verifying");setProgress("Payment received. Verifying securely...");const verified=await verifyPayment(order.request_id,p);if(verified.next_action==="upload_documents"){verifiedPayment={requestId:verified.request_id,uploadToken:verified.upload_token,files,data};setSubmitState("uploading");setProgress("Payment verified. Uploading documents...");const uploaded=await uploadDocuments(verifiedPayment.requestId,verifiedPayment.uploadToken,files);verifiedPayment=null;setProgress("",false);setSuccess(uploaded.request_id||order.request_id,data);resolve(uploaded);}else{setProgress("",false);setSuccess(order.request_id,data);resolve(verified);} }catch(e){setProgress("",false);if(verifiedPayment){setError("Payment is verified, but document upload could not finish. Do not pay again. Click Retry Document Upload. "+(e.message||""));setSubmitState("retry");}else{setError(e.message||"Payment verification failed.");setSubmitState("ready");}reject(e);}}});rz.on("payment.failed",function(r){completed=true;setProgress("",false);setSubmitState("ready");const m=r?.error?.description||r?.error?.reason||"Payment failed or was not completed.";setError(m);reject(new Error(m));});rz.open();});}

  async function retryVerifiedUpload(){if(!verifiedPayment||uploadInProgress)return;uploadInProgress=true;clearMessages();setSubmitState("uploading");setProgress("Retrying document upload. No additional payment will be taken...");try{const files=selectedFiles();validateApplication(verifiedPayment.data,files);const uploaded=await uploadDocuments(verifiedPayment.requestId,verifiedPayment.uploadToken,files);const id=uploaded.request_id||verifiedPayment.requestId;const data=verifiedPayment.data;verifiedPayment=null;setProgress("",false);setSuccess(id,data);setSubmitState("ready");}catch(e){setProgress("",false);setError("Your payment remains verified. Document upload is still incomplete. "+(e.message||"Please try again."));setSubmitState("retry");}finally{uploadInProgress=false;}}

  async function handleSubmit(e){e.preventDefault();if(verifiedPayment){await retryVerifiedUpload();return;}clearMessages();const data=collectApplicationData(),files=selectedFiles();try{validateApplication(data,files);}catch(err){setError(err.message);return;}setSubmitState("creating");setProgress(`Creating your secure ${money(currentTotalPaise())} payment order...`);try{const order=await createOrder(data);if(Number(order.amount)!==currentTotalPaise()||String(order.currency||"").toUpperCase()!=="INR")throw new Error("The payment amount returned by the server is invalid.");setProgress("Secure payment window is opening...");await openRazorpay(order,files,data);}catch(err){if(!verifiedPayment){setProgress("",false);setError(err.message||"Could not start the payment.");setSubmitState("ready");}}}

  async function copyRequestId(){const s=$("#certSuccess"),id=clean(s?.dataset.requestId);if(!id)return;try{await navigator.clipboard.writeText(id);}catch{window.prompt("Copy your Request ID:",id);}}
  function startNewApplication(){verifiedPayment=null;uploadInProgress=false;$("#upCertificateForm")?.reset();const s=$("#certSuccess");if(s){s.classList.remove("show");s.innerHTML="";}clearMessages();refreshUI();$("#certificateForm")?.scrollIntoView({behavior:"smooth",block:"start"});}
  function handleSuccessActions(e){const t=e.target.closest("[data-cert-action]");if(!t)return;if(t.dataset.certAction==="copy-request")copyRequestId();if(t.dataset.certAction==="new-application")startNewApplication();}
  function init(){$("#upCertificateForm")?.addEventListener("submit",handleSubmit);$("#certSuccess")?.addEventListener("click",handleSuccessActions);$$('#serviceChoices input, #onlineDocumentsToggle, #homeDeliveryToggle').forEach((x)=>x.addEventListener("change",refreshUI));refreshUI();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
}());
