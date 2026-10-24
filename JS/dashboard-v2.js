import{getApps,initializeApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getAuth,onAuthStateChanged}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{getDatabase,ref,get,update}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
const cfg=window.GJU_FIREBASE_CONFIG,rc=window.RANK_PREDICTOR_CONFIG||{};
const TYPING="https://test.govjobupdates.com/live-test/typing-api/history.php";
const PROGRESS="https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
const $=s=>document.querySelector(s),n=v=>Number.isFinite(+v)?+v:0,esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const avg=a=>a.length?a.reduce((s,x)=>s+x,0)/a.length:0,T=d=>new Date(String(d).replace(" ","T"));
const lvl=p=>p>=70?["ok","Strong"]:p>=45?["mid","Average"]:["bad","Needs work"];
const fmt=d=>{const x=T(d);return isNaN(x)?"Recent":x.toLocaleDateString("en-IN",{day:"2-digit",month:"short"})};
const dur=s=>s>=60?Math.round(s/60)+" min":s+" s";
if(!cfg||!cfg.apiKey)throw new Error("firebase config missing");
const app=getApps().length?getApps()[0]:initializeApp(cfg),auth=getAuth(app),db=getDatabase(app);
function ring(p){const r=56,c=2*Math.PI*r;return`<svg width="132" height="132"><circle cx="66" cy="66" r="${r}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="11"/><circle cx="66" cy="66" r="${r}" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}"/></svg><b>${p}%<span>AVG BEST SCORE</span></b>`}
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
 const prep=rows.length?Math.round(avgBest):0;
 const wk=new Set(sorted.filter(r=>Date.now()-T(r.completedAt)<6048e5).map(r=>String(r.completedAt).slice(0,10))).size;
 const by={};rows.forEach(r=>{(by[r.subject||"General"]??=[]).push(n(r.bestPercentage||r.percentage))});
 const subs=Object.entries(by).map(([name,a])=>({name,p:avg(a)})).sort((a,b)=>b.p-a.p),weak=subs.length?subs[subs.length-1].name:"";
 $("#gdRing").innerHTML=ring(prep);
 $("#gdHello").textContent=rows.length?(prep>=70?"You are on track. Keep the momentum.":prep>=45?"Good base. A few focused sets will lift your score.":"Start with basics and build daily practice."):"Take your first quiz to unlock your preparation report.";
 const rr=rows.filter(r=>n(r.rank)>0).sort((a,b)=>n(a.rank)-n(b.rank))[0];
 $("#gdKpis").innerHTML=[["Quizzes attempted",attempts,`${rows.length} unique sets`],["Avg best score",rows.length?Math.round(avgBest)+"%":"--","across your quizzes"],["Accuracy",rows.length?Math.round(acc)+"%":"--","correct of attempted"],["Best quiz rank",rr?"#"+rr.rank:"--",rr?`of ${rr.rankedUsers} · ${esc(String(rr.quizTitle).slice(0,26))}`:"No ranked quiz yet"]].map(k=>`<div class="gd-kpi"><span>${k[0]}</span><strong>${k[1]}</strong><small>${k[2]}</small></div>`).join("");
 $("#gdSubjects").innerHTML=subs.length?subs.map(s=>{const[l,t]=lvl(s.p);return`<div class="gd-bar"><div><span>${esc(s.name)}</span><span><em class="t-${l}">${t}</em> ${Math.round(s.p)}%</span></div><div class="gd-track"><i class="s-${l}" style="width:${Math.round(s.p)}%"></i></div></div>`}).join(""):'<div class="gd-empty">No subject data yet. <a href="quiz.html">Start a quiz</a></div>';
 $("#gdTrend").innerHTML=trend(sorted.slice(0,8));
 $("#gdInsights").innerHTML=insights(rows,subs);
 $("#gdRecent").innerHTML=sorted.length?sorted.slice(0,6).map(r=>{const l=lvl(n(r.percentage))[0];return`<div class="gd-row"><div><strong>${esc(r.quizTitle)}</strong><small>${esc(r.subject)} · ${fmt(r.completedAt)} · ${n(r.correct)}/${n(r.totalQuestions)} correct · ${dur(n(r.timeTakenSeconds))}${n(r.attemptCount)>1?` · ${n(r.attemptCount)} attempts`:""}${n(r.rank)>0?` · <span class="gd-tag">Rank #${n(r.rank)} of ${n(r.rankedUsers)}</span>`:""}</small></div><span class="gd-pill" style="color:var(--${l})">${Math.round(n(r.percentage))}%</span></div>`}).join(""):'<div class="gd-empty">Nothing yet. <a href="quiz.html">Take your first quiz</a></div>';
 renderRank((rk&&rk.attempts)||[],profile);
}

const RES_KEY="gju_rank_predictor_latest_result";let rankList=[];
const fr=v=>{const x=Number(v);return Number.isFinite(x)&&x>0?"#"+x.toLocaleString("en-IN"):"--"},mk=v=>{const x=Number(v);return Number.isFinite(x)?Math.round(x*100)/100:"--"};
const rt=a=>new Date(a.completedAt||a.createdAt||a.timestamp||0).getTime()||0;
const nm=a=>a.normalizedMarks??a.normalisedMarks??a.rawMarks;
function snap(a){return{resultData:a,payload:{examId:a.examId||"",examName:a.examName||"",sheetName:a.sheetName||"",mode:a.mode||"",rollNumber:a.rollNumber||"",gender:a.gender||"",category:a.category||"",horizontalCategory:a.horizontalCategory||"",state:a.state||"",examDate:a.examDate||"",shift:a.shift||"",totalQuestions:a.totalQuestions,totalAttempted:a.totalAttempted,rightAnswers:a.rightAnswers,wrongAnswers:a.wrongAnswers,unattempted:a.unattempted,rawMarks:a.rawMarks,normalizedMarks:nm(a),subjectData:a.subjectData||a.subjectAnalysis||[]},examName:a.examName||"",exam:{examId:a.examId||"",examName:a.examName||"",board:a.board||"",hasShifts:Boolean(a.hasShifts),normalization:Boolean(a.normalization)},derived:{normalizedMarks:nm(a)},savedAt:new Date().toISOString()}}
function renderRank(all,profile){
 const yr=Date.now()-365*864e5,mob=profile.mobile;
 let att=all.filter(a=>!rt(a)||rt(a)>=yr);
 const mine=att.filter(a=>String(a.mobileNumber||a.mobile||"").replace(/\D/g,"").slice(-10)===mob);
 if(mob)att=mine;
 att=att.sort((a,b)=>rt(b)-rt(a));rankList=att;
 const form=mob?"":`<form class="gd-mob" id="gdMob"><input id="gdMobIn" inputmode="numeric" maxlength="10" placeholder="Rank Predictor me jo mobile diya tha"><button>Save mobile</button></form><p class="sub" style="margin-top:6px">Isi mobile se aapke rank records match hote hain.</p>`;
 if(!att.length){$("#gdRank").innerHTML=`<div class="gd-empty">Abhi koi rank record nahi mila.<br><a href="rank-predictor.html">Rank predict karein</a></div>${form}`;bindMob();return}
 const ranks=att.map(a=>n(a.overallRank)).filter(x=>x>0),pcs=att.map(a=>n(a.percentile)),L=att[0];
 const by=new Map();att.forEach((a,i)=>{const k=a.examId||a.examName;if(!by.has(k))by.set(k,[]);by.get(k).push(i)});
 const sum=[["Latest rank",fr(L.overallRank)],["Best rank",ranks.length?fr(Math.min(...ranks)):"--"],["Best percentile",Math.max(...pcs).toFixed(1)+"%"],["Predictions",att.length]].map(x=>`<div><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
 const cards=[...by.values()].map(ix=>{const a=att[ix[0]],prev=ix[1]!==undefined?att[ix[1]]:null;
  let mv="";if(prev&&n(a.overallRank)>0&&n(prev.overallRank)>0){const d=n(prev.overallRank)-n(a.overallRank);mv=d===0?'<em class="t-mid">Rank unchanged</em>':`<em class="${d>0?"t-ok":"t-bad"}">${d>0?"▲ improved":"▼ dropped"} by ${Math.abs(d).toLocaleString("en-IN")} (was ${fr(prev.overallRank)})</em>`}
  const m=[["Overall rank",fr(a.overallRank)],["Percentile",mk(a.percentile)+"%"],["Normalized marks",mk(nm(a))],["Raw marks",mk(a.rawMarks)],["Shift rank",fr(a.shiftRank)],["Category rank",fr(a.categoryRank)],["State rank",fr(a.stateRank)]].map(x=>`<div><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  const older=ix.slice(1,5).map(i=>`<div class="gd-row"><div><small>${fmt(att[i].completedAt||att[i].createdAt)} · rank ${fr(att[i].overallRank)} · ${mk(att[i].percentile)}%</small></div><button class="gd-link" data-rid="${i}">Open</button></div>`).join("");
  return`<article class="gd-exam"><div class="gd-exam-h"><div><small>${esc(a.board||"Exam")}</small><h3>${esc(a.examName||"Rank Predictor Exam")}</h3><p class="sub" style="margin:2px 0 0">${ix.length} check${ix.length>1?"s":""} · latest ${fmt(a.completedAt||a.createdAt)}</p></div>${mv}</div><div class="gd-m">${m}</div><div class="gd-hero-actions" style="margin-top:12px"><button class="gd-btn gd-sm" data-rid="${ix[0]}">Open full result</button><a class="gd-btn gd-sm gd-out" href="rank-predictor.html">Check again</a></div>${older?`<details class="gd-old"><summary>Earlier checks (${ix.length-1})</summary>${older}</details>`:""}</article>`}).join("");
 $("#gdRank").innerHTML=`<div class="gd-rank gd-rank4">${sum}</div><div class="gd-exams">${cards}</div>${form}`;bindMob();
}
function bindMob(){$("#gdMob")?.addEventListener("submit",async e=>{e.preventDefault();const m=$("#gdMobIn").value.replace(/\D/g,"").slice(-10);if(m.length!==10)return;await update(ref(db,`users/${auth.currentUser.uid}`),{mobile:m});load(auth.currentUser)})}
document.addEventListener("click",e=>{const b=e.target.closest("[data-rid]");if(!b)return;const a=rankList[+b.dataset.rid];if(!a)return;try{sessionStorage.setItem(RES_KEY,JSON.stringify(snap(a)));location.href="rank-result.html"}catch{alert("Browser storage blocked hai, result open nahi ho paaya.")}});

const pretty=k=>String(k||"").replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()).replace(/\bSsc\b/,"SSC").replace(/\bCgl\b/,"CGL").replace(/\bChsl\b/,"CHSL").replace(/\bHc\b/,"HC").replace(/\bDest\b/,"DEST");
const LANG={en:"English",hi:"Hindi"},w1=x=>Math.round(n(x)*10)/10;
function line(v,unit){if(v.length<2)return'<div class="gd-empty">Take 2+ typing tests to see your speed trend.</div>';const w=300,h=90,mx=Math.max(...v,1),st=w/(v.length-1),d=v[v.length-1]-v[0];
 const pts=v.map((y,i)=>`${(i*st).toFixed(1)},${(h-8-(y/mx)*(h-16)).toFixed(1)}`).join(" ");
 return`<svg viewBox="0 0 ${w} ${h}" width="100%" height="90" role="img" aria-label="Speed trend"><polyline points="${pts}" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg><p class="sub" style="margin:6px 0 0">${d>=0?"Up":"Down"} ${Math.abs(w1(d))} ${unit} across your last ${v.length} tests</p>`}
const pno=id=>{const m=String(id||"").match(/:(\d+)$/);return m?"Passage "+(+m[1]+1):""};
function renderTyping(d){
 const A=(d.attempts||[]).slice().sort((x,y)=>T(y.createdAt)-T(x.createdAt)),R=(d.ranked||[]).slice().sort((x,y)=>x.rank-y.rank||String(x.presetKey).localeCompare(y.presetKey)||(+String(x.passageId).split(":").pop()-+String(y.passageId).split(":").pop())),E=$("#gdTKpis");
 const key=o=>[o.presetKey,o.language,o.difficulty,o.durationSeconds,o.passageId].join("|"),rk={};R.forEach(r=>rk[key(r)]=r);
 if(!A.length&&!R.length){E.innerHTML="";["#gdTTrend","#gdTTips","#gdTBest","#gdTRecent"].forEach(s=>$(s).innerHTML='<div class="gd-empty">Abhi koi ranked typing test nahi mila. <a href="../typing-test/index.html">Ranked test dein</a></div>');return}
 const net=A.map(a=>n(a.netWpm)),best=net.length?Math.max(...net):0,l5=avg(net.slice(0,5)),p5=net.length>5?avg(net.slice(5,10)):null,top=R[0];
 E.innerHTML=[["Best rank",top?"#"+top.rank:"--",top?`of ${top.rankedUsers} · Top ${Math.max(1,Math.ceil(top.rank/top.rankedUsers*100))}%`:"no rank yet"],["Best speed",w1(best)+" WPM","net, ranked tests"],["Recent average",w1(l5)+" WPM",p5===null?"last 5 ranked tests":(l5>=p5?"▲ ":"▼ ")+Math.abs(w1(l5-p5))+" vs previous 5"],["Ranked tests",A.length,`${R.length} rank${R.length===1?"":"s"} held`]].map(k=>`<div class="gd-kpi"><span>${k[0]}</span><strong>${k[1]}</strong><small>${k[2]}</small></div>`).join("");
 $("#gdTBest").innerHTML=R.length?R.map(r=>{const gap=w1(r.topSpeed-r.bestNetWpm),pc=Math.round(r.bestNetWpm/Math.max(r.topSpeed,1)*100),l=r.rank===1?"ok":r.percentile>=50?"mid":"bad";
  return`<div class="gd-trank"><div class="gd-tbadge t-${l}"><small>RANK</small><b>#${r.rank}</b><span>of ${r.rankedUsers}</span></div><div class="gd-tbody"><h3>${esc(pretty(r.presetKey))}${pno(r.passageId)?` <span class="gd-pno">· ${pno(r.passageId)}</span>`:""}</h3><p class="sub" style="margin:2px 0 8px"><span class="gd-tag">${esc(LANG[r.language]||r.language)}</span> <span class="gd-tag">${esc(r.difficulty)}</span> <span class="gd-tag">${Math.round(r.durationSeconds/60)} min</span> · ${r.rankedAttempts} ranked test${r.rankedAttempts>1?"s":""} · better than ${Math.max(0,r.rankedUsers-r.rank)} student${r.rankedUsers-r.rank===1?"":"s"}</p><div class="gd-track"><i class="s-${l}" style="width:${pc}%"></i></div><div class="gd-tnums"><span>You <b>${w1(r.bestNetWpm)}</b> WPM</span><span>Community avg <b>${w1(r.communityAverage)}</b></span><span>Top <b>${w1(r.topSpeed)}</b></span></div><p class="gd-gap">${r.rank===1?"🏆 You hold the #1 spot here.":`Add <b>${gap} WPM</b> to reach #1.`}</p></div></div>`}).join(""):'<div class="gd-empty">Rank abhi calculate nahi hui. Ek ranked test poora karein.</div>';
 $("#gdTTrend").innerHTML=line(A.slice(0,12).map(a=>n(a.netWpm)).reverse(),"WPM");
 const tips=[],acc=avg(A.map(a=>n(a.accuracy)));
 if(top&&top.rank>1){const ca=top.communityAverage;if(ca&&top.bestNetWpm<ca)tips.push(["📊",`Your best (${w1(top.bestNetWpm)}) is below the community average (${w1(ca)}) in ${esc(pretty(top.presetKey))}. Add ${w1(ca-top.bestNetWpm)} WPM to move into the top half.`]);else tips.push(["🎯",`You are #${top.rank}. ${w1(top.topSpeed-top.bestNetWpm)} more WPM takes you to #1.`])}
 if(acc&&acc<95)tips.push(["✍️",`Accuracy is ${Math.round(acc)}%. Ranking breaks ties by accuracy, so clean typing helps your rank.`]);
 if(p5!==null)tips.push([l5>=p5?"📈":"📉",l5>=p5?`Recent average is up ${w1(l5-p5)} WPM. Keep the daily routine.`:`Recent average dropped ${w1(p5-l5)} WPM. Practise 15 min daily before the next ranked test.`]);
 if(A.length<5)tips.push(["🚀","Take at least 5 ranked tests to unlock reliable trends."]);
 if(!tips.length)tips.push(["💪","Great consistency. Keep pushing for the next rank."]);
 $("#gdTTips").innerHTML=tips.map(([i,t])=>`<div class="gd-ins"><i>${i}</i><div>${t}</div></div>`).join("");
 $("#gdTRecent").innerHTML=A.slice(0,8).map(a=>{const c=rk[key(a)];return`<div class="gd-row"><div><strong>${esc(pretty(a.presetKey))}${pno(a.passageId)?" · "+pno(a.passageId):""}</strong><small>${esc(LANG[a.language]||a.language)} · ${esc(a.difficulty)} · ${fmt(a.createdAt)} · ${Math.round(n(a.durationSeconds)/60)} min · ${Math.round(n(a.accuracy))}% accurate${c?` · <span class="gd-tag">Current rank #${c.rank}</span>`:""}</small></div><span class="gd-pill">${w1(a.netWpm)} <small>WPM</small></span></div>`}).join("")||'<div class="gd-empty">No ranked tests yet.</div>';
}
function tabs(){const go=t=>{document.querySelectorAll(".gd-tabs button").forEach(b=>b.classList.toggle("on",b.dataset.tab===t));document.querySelectorAll(".gd-panel").forEach(p=>p.classList.toggle("on",p.id==="gdP-"+t));history.replaceState(null,"","#"+t)};
 document.getElementById("gdTabs").addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(b)go(b.dataset.tab)});
 const h=location.hash.slice(1);if(["practice","rank","typing"].includes(h))go(h)}
tabs();
async function load(user){
 const tok=await user.getIdToken(),profile={mobile:""};
 try{const s=await get(ref(db,`users/${user.uid}`));if(s.exists())profile.mobile=String(s.val().mobile||"").replace(/\D/g,"").slice(-10)}catch{}
 const base=String(rc.apiBaseUrl||"").replace(/\/+$/,"");
 const [q,r,t]=await Promise.all([
  fetch(PROGRESS,{headers:{Accept:"application/json",Authorization:`Bearer ${tok}`},cache:"no-store"}).then(x=>x.json()).catch(()=>null),
  base?fetch(`${base}/dashboard.php`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${tok}`},body:JSON.stringify({firebaseUid:user.uid,userId:user.uid,name:user.displayName||"",email:user.email||"",mobile:profile.mobile})}).then(x=>x.json()).catch(()=>null):null,
  fetch(TYPING,{headers:{Accept:"application/json",Authorization:`Bearer ${tok}`},cache:"no-store"}).then(x=>x.json()).catch(()=>null)]);
 render(q&&q.success?q.progress:[],r,profile);
 renderTyping(t&&t.success?t:{attempts:[],ranked:[]});
}
onAuthStateChanged(auth,u=>{if(u)load(u).catch(()=>{$("#gdHello").textContent="Could not load data. Please refresh."})});
