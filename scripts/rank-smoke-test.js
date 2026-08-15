const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = process.cwd();
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const reports = new Map();
const waiters = new Map();

function getMime(file) {
  const ext = path.extname(file).toLowerCase();
  return ({
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".webmanifest": "application/manifest+json"
  })[ext] || "application/octet-stream";
}

function harnessHtml(mode) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:100%;height:100%;font-family:monospace}
#frame{width:100vw;height:5400px;border:0;display:block}
#results{white-space:pre-wrap;font:14px/1.4 monospace;padding:12px}
</style></head><body><pre id="results">RUNNING</pre><iframe id="frame" src="/rank-predictor/rrb-je/index.html"></iframe><script>
const mode=${JSON.stringify(mode)},results=[],failures=[];
function out(ok,n,d=''){const l=(ok?'PASS ':'FAIL ')+mode+' '+n+(d?' - '+d:'');results.push(l);if(!ok)failures.push(l);document.querySelector('#results').textContent=results.join('\\n')+'\\n'}
function delay(ms){return new Promise(r=>setTimeout(r,ms))}
function frameWin(){return document.querySelector('#frame').contentWindow}
function doc(){return frameWin().document}
async function waitFor(fn,t=12000,label='condition'){const e=Date.now()+t;while(Date.now()<e){try{if(fn())return true}catch{}await delay(120)}throw new Error('Timed out waiting for '+label)}
async function click(sel){const el=doc().querySelector(sel);if(!el)throw new Error('Missing '+sel);el.scrollIntoView({block:'center',inline:'nearest'});await delay(100);el.click();await delay(400)}
async function fill(sel,val){const el=doc().querySelector(sel);if(!el)throw new Error('Missing '+sel);el.scrollIntoView({block:'center',inline:'nearest'});await delay(40);el.focus({preventScroll:true});el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));el.blur();await delay(160)}
function selectFirst(sel){const el=doc().querySelector(sel);if(!el)throw new Error('Missing '+sel);const o=Array.from(el.options||[]).find(x=>x.value&&!x.disabled);if(!o)return '';el.value=o.value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return o.value}
async function selectCategory(){await waitFor(()=>doc().querySelector('#categoryOptions [data-category-value]'),12000,'category options');const el=doc().querySelector('#categoryOptions [data-category-value]');if(!el)throw new Error('Missing category option');el.click();return el.dataset.categoryValue||''}
async function ensureOpen(detailsSel,summarySel){if(!doc().querySelector(detailsSel)?.open)await click(summarySel)}
async function testAccordions(){const mobile=mode==='mobile';for(const [name,sectionSel,summarySel] of [['Candidate Details','#candidateDetailsSection','#candidateDetailsSection > summary'],['Exam Details','#examDetailsSection','#examDetailsSection > summary'],['Subject Attempts','#attemptDetailsSection','#attemptDetailsSection > summary'],['Subject Scorecard','#subjectScorecardDetails','#subjectScorecardDetails > summary']]){const section=doc().querySelector(sectionSel);section.scrollIntoView({block:'start'});await delay(120);await click(summarySel);const open=Array.from(doc().querySelectorAll('.form-accordion[open]')).map(x=>x.id);const interactiveOpen=open.filter(id=>!['examDetailsSection','subjectScorecardDetails'].includes(id));const rect=section.getBoundingClientRect();const submitTop=doc().querySelector('#submitDataBtn').getBoundingClientRect().top;const noBottomJump=submitTop>220||rect.top<240;const onlySelected=!mobile||interactiveOpen.length<=1;out(noBottomJump&&onlySelected,'accordion '+name,'openSet='+(open.join(',')||'none')+', scrollY='+Math.round(frameWin().scrollY))}}
async function fillSubmitForm(){await ensureOpen('#candidateDetailsSection','#candidateDetailsSection > summary');await fill('#candidateName',mode+' Test Candidate');await fill('#rollNumber','GJU'+String(Date.now()).slice(-7));await fill('#mobileNumber','9876543210');await fill('#dob','2000-01-01');selectFirst('#gender');await selectCategory();selectFirst('#state');await ensureOpen('#examDetailsSection','#examDetailsSection > summary');await fill('#examDate','2026-05-24');if(doc().querySelector('#rankPredictorApp')?.classList.contains('has-shift'))await fill('#shift','1');await ensureOpen('#subjectScorecardDetails','#subjectScorecardDetails > summary');if(doc().querySelectorAll('.subject-card').length){if(!doc().querySelector('.subject-card')?.open)await click('.subject-card > summary');await fill('.subject-input[data-subject-field="correct"]','10');await fill('.subject-input[data-subject-field="wrong"]','0')}else{await ensureOpen('#attemptDetailsSection','#attemptDetailsSection > summary');await fill('#totalAttempted','10');await fill('#rightAnswers','10');await fill('#wrongAnswers','0')}await delay(800);const s={attempted:doc().querySelector('#summaryAttempted')?.textContent,correct:doc().querySelector('#summaryCorrect')?.textContent,wrong:doc().querySelector('#summaryWrong')?.textContent,marks:doc().querySelector('#summaryExpectedMarks')?.textContent};out(s.attempted==='10'&&s.correct==='10'&&s.wrong==='0','fill submit form',JSON.stringify(s));await click('#submitDataBtn');await delay(400);const msg=doc().querySelector('#submitMessage')?.textContent.trim()||'';out(/consent/i.test(msg),'submit button validation no live write',msg||'no message')}
async function testCheckRank(){await click('#checkTab');await fill('#checkRollNumber','NORESULT'+String(Date.now()).slice(-6));await fill('#checkMobileNumber','9876543210');await fill('#checkDob','2000-01-01');await click('#checkRankBtn');await waitFor(()=>{const f=doc().querySelector('#rankCheckForm');const m=doc().querySelector('#checkMessage')?.textContent.trim();return f?.dataset.busy!=='true'&&!!m},30000,'check rank response');const msg=doc().querySelector('#checkMessage')?.textContent.trim()||'';out(/No data found|Server connection failed|Rank found successfully/i.test(msg),'check rank button completed',msg)}
async function testResultPage(){const sample={resultData:{examName:'Smoke Test Exam',rollNumber:'ROLL123',rawMarks:65,normalizedMarks:68.25,percentile:76.47,rawRanks:{overallRank:12,categoryRank:5,stateRank:3,shiftRank:6,genderRank:8,genderCategoryRank:4,genderStateRank:2,genderShiftRank:3},normalizedRanks:{overallRank:9,categoryRank:4,stateRank:2,shiftRank:5,genderRank:6,genderCategoryRank:3,genderStateRank:1,genderShiftRank:2},averageMarks:72.67,averageShiftMarks:70.5,categoryAverageMarks:69.25,totalSubmissions:222,accuracyIndicator:'Medium',lastUpdated:'2026-05-24T09:00:00.000Z',subjectAnalysis:[{name:'General Awareness',score:65,avgScore:72.67,accuracy:76.47}],subjectData:[{name:'General Awareness',attempted:85,correct:65,wrong:20,marks:65}]},payload:{examName:'Smoke Test Exam',rollNumber:'ROLL123'},examName:'Smoke Test Exam',savedAt:'2026-05-24T09:00:00.000Z'};sessionStorage.setItem('gju_rank_predictor_latest_result',JSON.stringify(sample));const frame=document.querySelector('#frame');frame.src='/HTML/rank-result.html';await waitFor(()=>{const d=frame.contentDocument;const dashboard=d?.querySelector('#resultDashboard');return d?.readyState==='complete'&&dashboard&&!dashboard.hidden},12000,'result render');const d=frame.contentDocument;const raw=d.querySelector('#rawOverallRank')?.textContent,norm=d.querySelector('#normalizedOverallRank')?.textContent;const stateLabel=Array.from(d.querySelectorAll('.rank-basis-card span')).some(el=>/State\\/District Rank/.test(el.textContent));const noBodyScroll=d.documentElement.scrollWidth<=frame.contentWindow.innerWidth+2;out(raw==='#12'&&norm==='#9'&&stateLabel,'result page two rank bases','raw='+raw+', normalised='+norm);out(noBodyScroll,'result page no body horizontal scroll','doc='+d.documentElement.scrollWidth+', viewport='+frame.contentWindow.innerWidth)}
async function report(){await fetch('/__report?mode='+mode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,results,failures})})}
async function run(){try{await waitFor(()=>doc().readyState==='complete'&&doc().querySelector('#rankPredictorApp'),15000,'rank predictor load');await delay(1200);const w=frameWin().innerWidth;out(mode==='mobile'?w<=767:w>=1000,'viewport active','innerWidth='+w);await testAccordions();await fillSubmitForm();await testCheckRank();await testResultPage()}catch(e){out(false,'harness error',e&&(e.stack||e.message)||String(e))}finally{document.querySelector('#results').textContent=results.join('\\n')+'\\nSUMMARY failures='+failures.length+'\\n';await report()}}
window.addEventListener('load',()=>run());
</script></body></html>`;
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    if (url.pathname === "/__rank-smoke.html") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      res.end(harnessHtml(url.searchParams.get("mode") || "desktop"));
      return;
    }
    if (url.pathname === "/__report") {
      let body = "";
      req.on("data", (d) => body += d);
      req.on("end", () => {
        const mode = url.searchParams.get("mode") || "unknown";
        const report = JSON.parse(body || "{}");
        reports.set(mode, report);
        if (waiters.has(mode)) waiters.get(mode)(report);
        res.writeHead(204);
        res.end();
      });
      return;
    }
    const clean = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
    const requested = path.resolve(root, clean);
    if (!requested.startsWith(path.resolve(root))) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(requested, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": getMime(requested), "Cache-Control": "no-store" });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

function waitReport(mode, timeout = 90000) {
  return new Promise((resolve, reject) => {
    if (reports.has(mode)) return resolve(reports.get(mode));
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${mode} report`)), timeout);
    waiters.set(mode, (report) => {
      clearTimeout(timer);
      resolve(report);
    });
  });
}

function launchEdge(url, size) {
  return spawn(edgePath, [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    `--window-size=${size}`,
    url
  ], { stdio: ["ignore", "ignore", "ignore"] });
}

(async () => {
  const server = await startServer();
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const [mode, size] of [["desktop", "1366,900"], ["mobile", "390,844"]]) {
      const child = launchEdge(`${base}/__rank-smoke.html?mode=${mode}`, size);
      let report;
      try {
        report = await waitReport(mode);
      } finally {
        child.kill("SIGKILL");
      }
      console.log(`\n===== ${mode.toUpperCase()} =====`);
      report.results.forEach((line) => console.log(line));
      console.log(`SUMMARY failures=${report.failures.length}`);
      if (report.failures.length) process.exitCode = 1;
    }
  } finally {
    server.close();
  }
})();
