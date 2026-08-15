import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, update, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function(){
  "use strict";
  function markAuthReady(){
    document.body.classList.remove("gju-auth-pending");
    document.body.classList.add("gju-auth-ready");
  }

  const config = window.GJU_FIREBASE_CONFIG;
  if(!config || !config.apiKey){ console.warn("[GovJobUpdates] Firebase auth config missing."); markAuthReady(); return; }
  const app = getApps().length ? getApps()[0] : initializeApp(config);
  const auth = getAuth(app);
  const authPersistenceReady = setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.warn("[GovJobUpdates] Firebase auth persistence setup failed:", error.message);
  });
  const db = getDatabase(app);
  const provider = new GoogleAuthProvider();
  const page = document.body.dataset.authPage || "";
  const SESSION_KEY = "gju:candidate-session";
  const $ = (s) => document.querySelector(s);
  const isAndroidApp = /GovJobUpdatesApp/i.test(navigator.userAgent || "");
  let authStateKnown = false;

  function show(msg, isError){ const n=$("#authMessage"); if(!n) return; n.textContent=msg; n.classList.remove("hidden"); n.classList.toggle("error", !!isError); }
  function busy(form, state){ if(!form) return; form.querySelectorAll("button").forEach(b=>b.disabled=!!state); }
  function cleanMobile(value){ return String(value||"").replace(/[^0-9]/g,"").slice(-10); }
  function safeUser(user){ return { name:user.displayName||"", email:user.email||"", photoURL:user.photoURL||"", provider:user.providerData?.[0]?.providerId||"password", updatedAt:serverTimestamp() }; }
  function saveUser(user, extra={}){ if(!user) return Promise.resolve(); return update(ref(db, `users/${user.uid}`), { ...safeUser(user), ...extra, lastLoginAt:serverTimestamp() }); }
  async function saveUserSoft(user, extra={}){ try{ await saveUser(user, extra); }catch(error){ console.warn("[GovJobUpdates] User profile save failed:", error.message); } }
  function redirectTarget(defaultPath="dashboard.html"){
    try{
      const value = new URLSearchParams(window.location.search).get("redirect");
      if(value && /^[a-z0-9-]+\.html(?:[?#].*)?$/i.test(value)) return value;
    }catch{}
    return defaultPath;
  }
  function go(path){ window.location.href = path; }

  function rememberSession(user){
    if(!user) return;
    const data = { userId:user.uid, name:user.displayName||"", email:user.email||"", provider:user.providerData?.[0]?.providerId||"password", loggedInAt:Date.now() };
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(data)); } catch {}
  }

  function clearSession(){
    try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); } catch {}
  }

  async function completeGoogleLogin(user, redirectToDashboard=true){
    await authPersistenceReady;
    rememberSession(user);
    syncHeader(user);
    markAuthReady();
    await saveUserSoft(user,{createdAt:serverTimestamp(),role:"user"});
    if(redirectToDashboard) go(redirectTarget("dashboard.html"));
  }

  async function startGoogleLogin(button, messageFn=show, redirectToDashboard=true){
    if(button) button.disabled=true;
    try{
      if(isAndroidApp){
        messageFn("Google login Android app WebView me Google policy ki wajah se blocked hai. Please email/password login use karein.", true);
        return;
      }
      const res=await signInWithPopup(auth,provider);
      await completeGoogleLogin(res.user, redirectToDashboard);
    }catch(err){
      messageFn(readableError(err),true);
    }finally{
      if(button) button.disabled=false;
    }
  }

  async function handleRedirectLogin(){
    return Promise.resolve();
  }

  function prepareGoogleButton(button){
    if(!isAndroidApp || !button) return false;
    button.hidden = true;
    const divider = button.previousElementSibling;
    if(divider?.classList?.contains("auth-divider")) divider.hidden = true;
    return true;
  }

  function headerHref(pageName){
    const path = window.location.pathname.replace(/\\/g,"/");
    if(/\/HTML\/[^/]+\.html$/i.test(path)) return pageName;
    if(/\/(?:Job_Details|AdmitCard_Details|Result_Details|AnswerKey_Details)\/HTML\/[^/]+\.html$/i.test(path)) return `../../HTML/${pageName}`;
    return `HTML/${pageName}`;
  }

  function syncHeader(user){
    const link = document.querySelector("[data-auth-entry], .header-login-btn");
    if(!link) return;
    const label = link.querySelector("span") || link;
    if(user){
      link.href = link.dataset.dashboardHref || headerHref("dashboard.html");
      link.classList.add("is-active");
      link.setAttribute("aria-label", "Open candidate dashboard");
      label.textContent = "Dashboard";
    } else {
      link.href = link.dataset.loginHref || headerHref("login.html");
      link.classList.remove("is-active");
      link.setAttribute("aria-label", "Login to candidate dashboard");
      label.textContent = "Login";
    }
  }

  window.CandidateAuth = window.CandidateAuth || {};
  window.CandidateAuth.syncHeaderEntry = function(){
    if(!authStateKnown) return;
    syncHeader(auth.currentUser);
    markAuthReady();
  };

  function bindLogin(){
    const loginForm = $("#loginForm"), signupForm = $("#signupForm"), googleBtn = $("#googleLoginBtn");
    const activateTab = (target)=>{
      document.querySelectorAll("[data-auth-tab]").forEach(b=>b.classList.toggle("is-active", b.dataset.authTab===target));
      loginForm?.classList.toggle("hidden", target!=="login");
      signupForm?.classList.toggle("hidden", target!=="signup");
      show("",false);
      $("#authMessage")?.classList.add("hidden");
    };
    document.querySelectorAll("[data-auth-tab]").forEach(btn=>btn.addEventListener("click",()=>activateTab(btn.dataset.authTab || "login")));
    try {
      if (new URLSearchParams(window.location.search).get("mode") === "signup") activateTab("signup");
    } catch {}
    loginForm?.addEventListener("submit", async(e)=>{ e.preventDefault(); busy(loginForm,true); try{ await authPersistenceReady; const email=$("#loginEmail").value.trim(); const pass=$("#loginPassword").value; const res=await signInWithEmailAndPassword(auth,email,pass); rememberSession(res.user); syncHeader(res.user); markAuthReady(); await saveUserSoft(res.user); go(redirectTarget("dashboard.html")); }catch(err){ show(readableError(err),true); }finally{ busy(loginForm,false); } });
    signupForm?.addEventListener("submit", async(e)=>{ e.preventDefault(); busy(signupForm,true); try{ await authPersistenceReady; const name=$("#signupName").value.trim(); const mobile=cleanMobile($("#signupMobile")?.value); if(mobile.length!==10){ show("Please enter valid 10 digit mobile number.", true); return; } const email=$("#signupEmail").value.trim(); const pass=$("#signupPassword").value; const res=await createUserWithEmailAndPassword(auth,email,pass); if(name) await updateProfile(res.user,{displayName:name}); rememberSession(res.user); syncHeader(res.user); markAuthReady(); await saveUserSoft(res.user,{name,mobile,createdAt:serverTimestamp(),role:"user"}); go(redirectTarget("dashboard.html")); }catch(err){ show(readableError(err),true); }finally{ busy(signupForm,false); } });
    if(!prepareGoogleButton(googleBtn)) googleBtn?.addEventListener("click", ()=>startGoogleLogin(googleBtn, show, true));
  }

  function bindDashboard(){
    const loading=$("#dashboardLoading"), content=$("#dashboardContent"), guest=$("#dashboardGuest"), logoutBtn=$("#logoutBtn");
    const dashboardLoginForm=$("#dashboardLoginForm"), dashboardGoogleBtn=$("#dashboardGoogleLoginBtn"), dashboardMessage=$("#dashboardAuthMessage");
    const showDashboardMessage=(msg,isError)=>{ if(!dashboardMessage) return; dashboardMessage.textContent=msg; dashboardMessage.classList.toggle("hidden", !msg); dashboardMessage.classList.toggle("error", !!isError); };
    dashboardLoginForm?.addEventListener("submit", async(e)=>{ e.preventDefault(); busy(dashboardLoginForm,true); showDashboardMessage("",false); try{ await authPersistenceReady; const email=$("#dashboardLoginEmail").value.trim(); const pass=$("#dashboardLoginPassword").value; const res=await signInWithEmailAndPassword(auth,email,pass); rememberSession(res.user); syncHeader(res.user); markAuthReady(); await saveUserSoft(res.user); }catch(err){ showDashboardMessage(readableError(err),true); }finally{ busy(dashboardLoginForm,false); } });
    if(!prepareGoogleButton(dashboardGoogleBtn)) dashboardGoogleBtn?.addEventListener("click", ()=>{ showDashboardMessage("",false); startGoogleLogin(dashboardGoogleBtn, showDashboardMessage, false); });
    onAuthStateChanged(auth,(user)=>{
      authStateKnown = true;
      syncHeader(user);
      markAuthReady();
      if(!user){ clearSession(); if(logoutBtn) logoutBtn.textContent="Login"; if(loading) loading.hidden=false; if(guest) guest.hidden=true; if(content) content.hidden=true; return; }
      rememberSession(user);
      if(logoutBtn) logoutBtn.textContent="Logout";
      if(loading) loading.hidden=true; if(guest) guest.hidden=true; if(content) content.hidden=false;
      $("#userName") && ($("#userName").textContent = user.displayName || "GovJobUpdates User");
      $("#userEmail") && ($("#userEmail").textContent = user.email || "No email available");
      $("#profileName") && ($("#profileName").textContent = user.displayName || "GovJobUpdates User");
      $("#profileEmail") && ($("#profileEmail").textContent = user.email || "No email available");
      saveUserSoft(user);
    });
    logoutBtn?.addEventListener("click", async()=>{ if(!auth.currentUser){ go("login.html"); return; } await signOut(auth); clearSession(); syncHeader(null); markAuthReady(); go("login.html"); });
  }

  onAuthStateChanged(auth,(user)=>{ authStateKnown = true; if(user) rememberSession(user); else clearSession(); syncHeader(user); markAuthReady(); });
  handleRedirectLogin();

  function readableError(err){ const code=String(err?.code||""); if(code.includes("invalid-credential")) return "Email ya password galat hai."; if(code.includes("email-already-in-use")) return "Is email se account already bana hua hai."; if(code.includes("weak-password")) return "Password kam se kam 6 characters ka rakho."; if(code.includes("unauthorized-domain")) return "Firebase me govjobupdates.com ko Authorized domains me add karo."; if(code.includes("popup")) return "Google popup complete nahi hua. Dobara try karo."; if(String(err?.message||"").includes("permission_denied")) return "Login ho gaya, par profile save rules me users node allow nahi hai."; return "Login request failed. Please try again."; }
  if(page==="login") bindLogin();
  if(page==="dashboard") bindDashboard();
}());
