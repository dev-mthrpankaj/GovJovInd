const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(){
 const nodes={};
 for(const id of ['typingTestApp','typingInput','resultPanel','typingCompetitionGate','typingCompetitionGateTitle','typingCompetitionGateText'])nodes[id]={dataset:{state:'ready'},hidden:false,classList:{add(){},remove(){}},removeAttribute(){},setAttribute(){}};
 const input=nodes.typingInput;input.readOnly=true;
 let localSaves=0,requests=0,observer;
 const window={GJU_TYPING_CONFIG:{},location:{search:''},GJUTypingStorage:{saveResult(){localSaves++;return 'saved';}}};
 const context=vm.createContext({window,document:{getElementById:id=>nodes[id]},URLSearchParams,Promise,fetch:async()=>{requests++;return {ok:true,status:200,json:async()=>({success:true,rankSession:{token:'session-token'}})};},MutationObserver:class{constructor(fn){observer=fn;}observe(){}}});
 const code=fs.readFileSync(require('node:path').join(__dirname,'../typing-test/typing-competition.js'),'utf8');
 vm.runInContext(code.replace('  injectUi();','  window.hooks={setGate,hookStorage,watchAttemptState,submitRankedResult,setUser(user){authUser=user;}}; return;\n  injectUi();'),context);
 return {nodes,input,window,get requests(){return requests;},get localSaves(){return localSaves;},state(value){nodes.typingTestApp.dataset.state=value;observer();}};
}
test('guest practice stays editable during checking, signed-out and auth errors',()=>{
 const s=setup();
 for(const state of ['checking','login','error','ready']){
  s.input.readOnly=true;s.window.hooks.setGate(state);assert.equal(s.input.readOnly,false,state);
 }
});
test('guest result is saved locally without any ranked request',async()=>{
 const s=setup();s.window.hooks.hookStorage();s.window.hooks.watchAttemptState();s.state('running');
 assert.equal(s.window.GJUTypingStorage.saveResult({id:'guest'}),'saved');await Promise.resolve();
 assert.equal(s.localSaves,1);assert.equal(s.requests,0);
});
test('signing in after a guest attempt starts does not retroactively rank it',async()=>{
 const s=setup();s.window.hooks.watchAttemptState();s.state('running');
 s.window.hooks.setUser({uid:'student',getIdToken:async()=> 'token'});
 await s.window.hooks.submitRankedResult({id:'late-login'});
 assert.equal(s.requests,0);
});

test('a student signed in before typing still starts and submits a ranked session',async()=>{
 const s=setup();s.window.hooks.setUser({uid:'student',getIdToken:async()=> 'token'});
 s.window.hooks.watchAttemptState();s.state('running');
 await s.window.hooks.submitRankedResult({id:'ranked',durationMinutes:10,timeTakenSeconds:600});
 assert.equal(s.requests,2);
});
