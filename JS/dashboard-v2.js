import{getApps,initializeApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getAuth,onAuthStateChanged}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{getDatabase,ref,get,update}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
const cfg=window.GJU_FIREBASE_CONFIG,rc=window.RANK_PREDICTOR_CONFIG||{};
const PROGRESS="https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
const $=s=>document.querySelector(s),n=v=>Number.isFinite(+v)?+v:0,esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const avg=a=>a.length?a.reduce((s,x)=>s+x,0)/a.length:0,T=d=>new Date(String(d).replace(" ","T"));
const lvl=p=>p>=70?["ok","Strong"]:p>=45?["mid","Average"]:["bad","Needs work"];
const fmt=d=>{const x=T(d);return isNaN(x)?"Recent":x.toLocaleDateString("en-IN",{day:"2-digit",month:"short"})};
const dur=s=>s>=60?Math.round(s/60)+" min":s+" s";
if(!cfg||!cfg.apiKey)throw new Error("firebase config missing");
const app=getApps().length?getApps()[0]:initializeApp(cfg),auth=getAuth(app),db=getDatabase(app);
function ring(p){const r=56,c=2*Math.PI*r;return`<svg width="132" height="132"><circle cx="66" cy="66" r="${r}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="11"/><circle cx="66" cy="66" r="${r}" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}"/></svg><b>${p}<span>PREP SCORE</span></b>`}
function trend(rows){if(rows.length<2)return'<div class="gd-empty">Attempt 2+ quizzes to see your trend.</div>';
 const v=rows.slice().reverse().map(r=>n(r.percentage)),w=300,h=90,st=w/(v.length-1),d=v[v.length-1]-v[0];
 const pts=v.map((y,i)=>`${(i*st).toFixed(1)},${(h-8-(y/100)*(h-16)).toFixed(1)}`).join(" ");
 return`<svg viewBox="0 0 ${w} ${h}" width="100%" height="90" role="img" aria-label="Score trend"><polyline points="${pts}" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg><p class="sub" style="margin:6px 0 0">${d>=0?"Up":"Down"} ${Math.abs(Math.round(d))} pts across your last ${v.length} quizzes</p>`}
function insights(rows,subs){const o=[],S=k=>rows.reduce((s,r)=>s+n(r[k]),0),at=S("attempted"),wr=S("wrong"),un=S("unattempted"),q=S("totalQuestions");
 if(subs.length>1)o.push(["🎯",`<b>${esc(subs[subs.length-1].name)}</b> is your weakest subject (${Math.round(subs[subs.length-1].p)}%). Do one set today before anything else.`]);
 if(subs.length)o.push(["💪",`<b>${esc(subs[0].name)}</b> is your strongest at ${Math.round(subs[0].p)}%. Keep it warm with a quick set weekly.`]);
 if(at&&wr/at>.3)o.push(["⚠️",`${Math.round(wr/at*100)}% of your attempted answers are wrong. Negative marking is costing you; skip questions you are unsure of.`]);
 if(q&&un/q>.25)o.push(["⏱️",`You leave ${Math.round(un/q*100)}% of questions unattempted. Practise with the timer on to build speed.`]);
 if(!o.length)o.push(["🚀","Attempt a few more quizzes and personalised tips will appear here."]);
 return o.map(([i,t])=>`<div class="gd-ins"><i>${i}</i><div>${t}</div></div>`).join("")}
function render(rows,rk,profile){
 const sorted=rows.slice().sort((a,b)=>T(b.completedAt)-T(a.completedAt));
 const attempts=rows.reduce((s,r)=>s+Math.max(1,n(r.attemptCount)),0),avgBest=avg(rows.map(r=>n(r.bestPercentage||r.percentage))),acc=avg(rows.map(r=>n(r.accuracy)));
 const prep=rows.length?Math.round(.6*avgBest+.4*acc):0;
 const wk=new Set(sorted.filter(r=>Date.now()-T(r.completedAt)<6048e5).map(r=>String(r.completedAt).slice(0,10))).size;
 const by={};rows.forEach(r=>{(by[r.subject||"General"]??=[]).push(n(r.bestPercentage||r.percentage))});
 const subs=Object.entries(by).map(([name,a])=>({name,p:avg(a)})).sort((a,b)=>b.p-a.p),weak=subs.length?subs[subs.length-1].name:"";
 $("#gdRing").innerHTML=ring(prep);
 $("#gdHello").textContent=rows.length?(prep>=70?"You are on track. Keep the momentum.":prep>=45?"Good base. A few focused sets will lift your score.":"Start with basics and build daily practice."):"Take your first quiz to unlock your preparation report.";
 $("#gdKpis").innerHTML=[["Quizzes taken",attempts,`${rows.length} unique sets`],["Avg best score",rows.length?Math.round(avgBest)+"%":"--","across your quizzes"],["Accuracy",rows.length?Math.round(acc)+"%":"--","correct of attempted"],["Active days",wk+"/7","practised this week"]].map(k=>`<div class="gd-kpi"><span>${k[0]}</span><strong>${k[1]}</strong><small>${k[2]}</small></div>`).join("");
 $("#gdSubjects").innerHTML=subs.length?subs.map(s=>{const[l,t]=lvl(s.p);return`<div class="gd-bar"><div><span>${esc(s.name)}</span><span><em class="t-${l}">${t}</em> ${Math.round(s.p)}%</span></div><div class="gd-track"><i class="s-${l}" style="width:${Math.round(s.p)}%"></i></div></div>`}).join(""):'<div class="gd-empty">No subject data yet. <a href="quiz.html">Start a quiz</a></div>';
 $("#gdFocusText").textContent=weak?"Practice "+weak:"Start a quiz";
 $("#gdTrend").innerHTML=trend(sorted.slice(0,8));
 $("#gdInsights").innerHTML=insights(rows,subs);
 $("#gdRecent").innerHTML=sorted.length?sorted.slice(0,6).map(r=>{const l=lvl(n(r.percentage))[0];return`<div class="gd-row"><div><strong>${esc(r.quizTitle)}</strong><small>${esc(r.subject)} · ${fmt(r.completedAt)} · ${n(r.correct)}/${n(r.totalQuestions)} correct · ${dur(n(r.timeTakenSeconds))}</small></div><span class="gd-pill" style="color:var(--${l})">${Math.round(n(r.percentage))}%</span></div>`}).join(""):'<div class="gd-empty">Nothing yet. <a href="quiz.html">Take your first quiz</a></div>';
 const att=(rk&&rk.attempts)||[],last=att.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))[0];
 $("#gdRank").innerHTML=att.length?`<div class="gd-rank"><div><span>Latest percentile</span><strong>${n(last.percentile).toFixed(1)}%</strong></div><div><span>Best percentile</span><strong>${Math.max(...att.map(a=>n(a.percentile))).toFixed(1)}%</strong></div></div><p class="sub" style="margin-top:10px">${esc(last.examName||"Rank Predictor")} · ${att.length} prediction${att.length>1?"s":""}</p>`:`<div class="gd-empty">No rank prediction yet.<br><a href="rank-predictor.html">Predict your rank</a></div>${profile.mobile?"":'<form class="gd-mob" id="gdMob"><input id="gdMobIn" inputmode="numeric" maxlength="10" placeholder="Mobile used in Rank Predictor"><button>Save</button></form>'}`;
 $("#gdMob")?.addEventListener("submit",async e=>{e.preventDefault();const m=$("#gdMobIn").value.replace(/\D/g,"").slice(-10);if(m.length!==10)return;await update(ref(db,`users/${auth.currentUser.uid}`),{mobile:m});load(auth.currentUser)});
}
async function load(user){
 const tok=await user.getIdToken(),profile={mobile:""};
 try{const s=await get(ref(db,`users/${user.uid}`));if(s.exists())profile.mobile=String(s.val().mobile||"").replace(/\D/g,"").slice(-10)}catch{}
 const base=String(rc.apiBaseUrl||"").replace(/\/+$/,"");
 const [q,r]=await Promise.all([
  fetch(PROGRESS,{headers:{Accept:"application/json",Authorization:`Bearer ${tok}`},cache:"no-store"}).then(x=>x.json()).catch(()=>null),
  base?fetch(`${base}/dashboard.php`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${tok}`},body:JSON.stringify({firebaseUid:user.uid,userId:user.uid,name:user.displayName||"",email:user.email||"",mobile:profile.mobile})}).then(x=>x.json()).catch(()=>null):null]);
 render(q&&q.success?q.progress:[],r,profile);
}
onAuthStateChanged(auth,u=>{if(u)load(u).catch(()=>{$("#gdHello").textContent="Could not load data. Please refresh."})});
