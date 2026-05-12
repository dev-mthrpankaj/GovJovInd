import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, update, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function(){
  "use strict";
  const config = window.GJU_FIREBASE_CONFIG;
  if(!config || !config.apiKey){ console.warn("[GovJobUpdates] Firebase auth config missing."); return; }
  const app = getApps().length ? getApps()[0] : initializeApp(config);
  const auth = getAuth(app);
  const db = getDatabase(app);
  const provider = new GoogleAuthProvider();
  const page = document.body.dataset.authPage || "";
  const $ = (s) => document.querySelector(s);

  function show(msg, isError){ const n=$("#authMessage"); if(!n) return; n.textContent=msg; n.classList.remove("hidden"); n.classList.toggle("error", !!isError); }
  function busy(form, state){ if(!form) return; form.querySelectorAll("button").forEach(b=>b.disabled=!!state); }
  function safeUser(user){ return { name:user.displayName||"", email:user.email||"", photoURL:user.photoURL||"", provider:user.providerData?.[0]?.providerId||"password", updatedAt:serverTimestamp() }; }
  function saveUser(user, extra={}){ if(!user) return Promise.resolve(); return update(ref(db, `users/${user.uid}`), { ...safeUser(user), ...extra, lastLoginAt:serverTimestamp() }); }
  function go(path){ window.location.href = path; }

  function bindLogin(){
    const loginForm = $("#loginForm"), signupForm = $("#signupForm"), googleBtn = $("#googleLoginBtn");
    document.querySelectorAll("[data-auth-tab]").forEach(btn=>btn.addEventListener("click",()=>{
      const target=btn.dataset.authTab; document.querySelectorAll("[data-auth-tab]").forEach(b=>b.classList.toggle("is-active", b===btn));
      loginForm.classList.toggle("hidden", target!=="login"); signupForm.classList.toggle("hidden", target!=="signup"); show("",false); $("#authMessage")?.classList.add("hidden");
    }));
    loginForm?.addEventListener("submit", async(e)=>{ e.preventDefault(); busy(loginForm,true); try{ const email=$("#loginEmail").value.trim(); const pass=$("#loginPassword").value; const res=await signInWithEmailAndPassword(auth,email,pass); await saveUser(res.user); go("dashboard.html"); }catch(err){ show(readableError(err),true); }finally{ busy(loginForm,false); } });
    signupForm?.addEventListener("submit", async(e)=>{ e.preventDefault(); busy(signupForm,true); try{ const name=$("#signupName").value.trim(); const email=$("#signupEmail").value.trim(); const pass=$("#signupPassword").value; const res=await createUserWithEmailAndPassword(auth,email,pass); if(name) await updateProfile(res.user,{displayName:name}); await saveUser(res.user,{name,createdAt:serverTimestamp(),role:"user"}); go("dashboard.html"); }catch(err){ show(readableError(err),true); }finally{ busy(signupForm,false); } });
    googleBtn?.addEventListener("click", async()=>{ googleBtn.disabled=true; try{ const res=await signInWithPopup(auth,provider); await saveUser(res.user,{createdAt:serverTimestamp(),role:"user"}); go("dashboard.html"); }catch(err){ show(readableError(err),true); }finally{ googleBtn.disabled=false; } });
    onAuthStateChanged(auth,(user)=>{ if(user && new URLSearchParams(location.search).get("stay")!=="1"){} });
  }

  function bindDashboard(){
    const loading=$("#dashboardLoading"), content=$("#dashboardContent"), guest=$("#dashboardGuest"), logoutBtn=$("#logoutBtn");
    onAuthStateChanged(auth,(user)=>{
      if(loading) loading.hidden=true;
      if(!user){ if(guest) guest.hidden=false; if(content) content.hidden=true; return; }
      if(guest) guest.hidden=true; if(content) content.hidden=false;
      $("#userName") && ($("#userName").textContent = user.displayName || "GovJobUpdates User");
      $("#userEmail") && ($("#userEmail").textContent = user.email || "No email available");
      saveUser(user);
    });
    logoutBtn?.addEventListener("click", async()=>{ await signOut(auth); go("login.html"); });
  }

  function readableError(err){ const code=String(err?.code||""); if(code.includes("invalid-credential")) return "Email ya password galat hai."; if(code.includes("email-already-in-use")) return "Is email se account already bana hua hai."; if(code.includes("weak-password")) return "Password kam se kam 6 characters ka rakho."; if(code.includes("popup")) return "Google popup complete nahi hua. Dobara try karo."; return "Login request failed. Please try again."; }
  if(page==="login") bindLogin();
  if(page==="dashboard") bindDashboard();
}());
