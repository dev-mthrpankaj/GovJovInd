// Run with Playwright installed; optionally set TYPING_CHROMIUM_PATH.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
(async()=>{
 const root=path.join(__dirname,'..');
 const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',p.endsWith('.css')?'text/css':p.endsWith('.js')?'text/javascript':p.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(p));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
 browser=await chromium.launch({headless:true,executablePath:process.env.TYPING_CHROMIUM_PATH || undefined,args:['--no-sandbox','--disable-gpu']});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=`http://127.0.0.1:${server.address().port}`;
 await page.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 for(const [width,height] of [[1920,1080],[1366,768],[1280,600],[1024,768],[768,1024],[390,844],[360,740],[390,460]]){
  await page.setViewportSize({width,height});
  await page.goto(base+'/typing-test/app.html');
  await page.waitForFunction(()=>document.querySelector('#typingTestApp').dataset.state==='ready');
  const geometry=await page.evaluate(()=>{
   const rect=id=>{const r=document.getElementById(id).getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height};};
   return {passage:rect('passageText'),input:rect('typingInput'),finish:rect('submitButton'),overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.equal(geometry.overflow,false,`${width}: horizontal overflow`);
  assert.ok(geometry.passage.height>=50 && geometry.input.height>=50,`${width}: readable panels`);
  assert.ok(geometry.passage.bottom<=geometry.input.top,`${width}: panels overlap`);
  assert.ok(geometry.finish.bottom<=height,`${width}x${height}: finish button below viewport (${geometry.finish.bottom})`);
  await page.evaluate(()=>new Promise(requestAnimationFrame));
  assert.equal(await page.evaluate(()=>{
   const box=document.querySelector('#passageText').getBoundingClientRect();
   const cursor=document.querySelector('.is-current').getBoundingClientRect();
   return cursor.top>=box.top && cursor.bottom<=box.bottom;
  }),true,`${width}x${height}: current character clipped`);
  if(process.env.TYPING_SCREENSHOTS)await page.screenshot({path:path.join(process.env.TYPING_SCREENSHOTS,`${width}-${height}.png`)});
 }
 await page.setViewportSize({width:1366,height:768});
 await page.goto(base+'/typing-test/app.html');
 const text=await page.locator('#passageText').textContent();
 await page.locator('#typingInput').fill(text.slice(0,25));
 assert.equal(await page.locator('#pauseButton').count(),0);
 assert.equal(await page.locator('#typingInput').isDisabled(),false);
 const before=await page.locator('#timerText').textContent();await page.waitForTimeout(1200);
 assert.notEqual(await page.locator('#timerText').textContent(),before);
 await page.locator('#submitButton').click();assert.equal(await page.locator('#resultPanel').isVisible(),true);
 await page.locator('#retryResult').click();assert.equal(await page.locator('#typingInput').inputValue(),'');
 assert.equal(await page.locator('#resultPanel').isVisible(),false);
 await page.getByText('Display & keyboard settings', {exact:true}).click();
 for(let n=0;n<12;n++)await page.locator('#fontIncrease').click();
 assert.ok((await page.locator('#submitButton').boundingBox()).y<768);
 await page.goto(base+'/typing-test/app.html?preset=general-hindi&language=hindi');
 await page.locator('#typingInput').fill('हिंदी');
 assert.equal(await page.locator('#typingTestApp').getAttribute('data-state'),'running');
 await page.locator('#submitButton').click();assert.equal(await page.locator('#resultPanel').isVisible(),true);
 await page.goto(base+'/typing-test/app.html');
 await page.locator('.gju-typing-header-fullscreen').click();
 await page.waitForFunction(()=>!!document.fullscreenElement);
 assert.ok((await page.locator('#submitButton').boundingBox()).y<768);
 await page.evaluate(()=>document.exitFullscreen());
 await page.waitForFunction(()=>!document.fullscreenElement);
 assert.equal(await page.locator('#fullscreenSwitch').isChecked(),false);
 const presets=await page.evaluate(()=>window.GJU_TYPING_CONFIG.presets.map(p=>({id:p.id,languages:p.languages})));
 let routes=0;
 for(const preset of presets)for(const language of preset.languages){
  await page.goto(`${base}/typing-test/app.html?preset=${preset.id}&language=${language}&difficulty=hard&passage=2`);
  await page.waitForFunction(()=>document.querySelector('#typingTestApp').dataset.state==='ready');
  assert.ok((await page.locator('#passageText').textContent()).length>100,preset.id);
  assert.equal(await page.locator('#passageText').getAttribute('lang'),language==='hindi'?'hi':'en');
  await page.locator('#typingInput').press('Control+a');
  assert.equal(await page.locator('#typingTestApp').getAttribute('data-state'),'ready');
  routes++;
 }
 await page.goto(base+'/typing-test/app.html?preset=rrb-ntpc&language=english');
 await page.locator('#typingInput').pressSequentially('example');
 await page.locator('#typingInput').press('Backspace');
 assert.equal(await page.locator('#typingInput').inputValue(),'example');
 await page.locator('#submitButton').click();
 await page.getByText('Optional self-review calculation',{exact:true}).click();
 await page.locator('#reviewCount').fill('400');await page.locator('#reviewMistakes').fill('30');await page.locator('#reviewHalfMistakes').fill('0');
 await page.locator('#reviewForm button').click();
 assert.match(await page.locator('#reviewOutput').textContent(),/30 WPM/);
 assert.match(await page.locator('#reviewOutput').textContent(),/Early finish/);
 const saved=await page.evaluate(()=>window.GJUTypingStorage.getStats());
 assert.equal(saved.history[0].review.speed,30);assert.equal(saved.history[0].review.benchmarkMet,false);
 await page.reload();
 assert.equal(await page.evaluate(()=>window.GJUTypingStorage.getStats().totalTests),saved.totalTests);
 await page.goto(base+'/typing-test/app.html?preset=up-police-computer-operator&language=hindi&hindiMode=krutidev');
 assert.equal(await page.locator('#hindiInputMode').inputValue(),'mangal');
 assert.equal(await page.locator('#hindiInputMode').isDisabled(),true);
 console.log(`PASS: ${presets.length} presets / ${routes} language routes; shortcut start protection; RRB editing restriction and persisted self-review; UP Police Hindi mode.`);
 assert.deepEqual(errors,[]);console.log('PASS: 8 viewport layouts; panels and controls fit; uninterrupted timer, submit/retry, font size, fullscreen, Hindi and no page errors.');
 }finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
