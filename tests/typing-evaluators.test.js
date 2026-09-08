const test = require('node:test');
const assert = require('node:assert/strict');
const e = require('../typing-test/typing-evaluators.js');

test('RRB official example: 400 words, 10 final mistakes, ten minutes = 30 WPM', () => {
  const r = e.rrb({words: 400, fullMistakes: 30, halfMistakes: 0});
  assert.equal(r.ignoredMistakes, 20); assert.equal(r.finalMistakes, 10);
  assert.equal(r.speed, 30); assert.equal(r.meetsBenchmark, true);
});
test('RRB half mistakes, fractional allowance, minimum content and zero boundaries', () => {
  const r = e.rrb({words: 250, fullMistakes: 10, halfMistakes: 5, language:'hindi'});
  assert.equal(r.mistakes,12.5); assert.equal(r.finalMistakes,0); assert.equal(r.speed,25);
  assert.equal(r.meetsBenchmark,true);
  assert.equal(e.rrb({words:299,fullMistakes:0,halfMistakes:0}).minimumContentMet,false);
  assert.equal(e.rrb({words:0,fullMistakes:0,halfMistakes:0}).speed,0);
  assert.equal(e.rrb({words:301,fullMistakes:16,halfMistakes:0}).allowance,15.05);
  assert.equal(e.rrb({words:10,fullMistakes:100,halfMistakes:0}).speed,0);
});
test('Delhi official example subtracts mistakes from WPM, not from words', () => {
  const r=e.delhi({strokes:2000,mistakes:10});
  assert.equal(r.tentativeSpeed,40);assert.equal(r.speed,30);assert.equal(r.marks,10);
});
test('Delhi exact published slabs in both languages; unknown rounding stays unknown', () => {
  for(const [speed,marks] of [[29,0],[30,10],[31,12],[35,12],[36,15],[40,15],[41,18],[45,18],[46,21],[50,21],[51,25]]){
    assert.equal(e.delhiMarks(speed),marks);
    assert.equal(e.delhiMarks(speed-5,'hindi'),marks);
  }
  assert.equal(e.delhiMarks(30.5),null);
  assert.equal(e.delhiMarks(35.5),null);
  assert.equal(e.delhi({strokes:2000,mistakes:10,minutes:1}).marks,null);
});
test('UP Police reviewed word benchmarks: both languages and exact 85% boundary', () => {
  assert.equal(e.upPolice({words:460,correctWords:391}).meetsBenchmark,true);
  assert.equal(e.upPolice({words:460,correctWords:390}).meetsBenchmark,false);
  assert.equal(e.upPolice({words:400,correctWords:340,language:'hindi'}).meetsBenchmark,true);
  assert.equal(e.upPolice({words:374,correctWords:374,language:'hindi'}).meetsBenchmark,false);
  assert.equal(e.upPolice({words:0,correctWords:0}).accuracy,0);
});
test('SSC speed and DEST output units do not equate Hindi graphemes with physical keys', () => {
  assert.equal(e.chslSpeed(1750,10,'english').speed,35);
  assert.equal(e.chslSpeed(1500,10,'hindi').requiredSpeed,30);
  assert.equal(e.destProgress('a'.repeat(1999)).volumeMet,false);
  assert.equal(e.destProgress('a'.repeat(2000)).volumeMet,true);
  assert.equal(e.destProgress('a b,\r\nc').keyDepressions,6);
  assert.equal(e.destProgress('कि').keyDepressions,2);
});
test('Exam assessments never silently classify character errors; early finishes are not passes', () => {
  const base={targetAchieved:true,speedPass:true,language:'english',errors:500};
  const dest=e.assess(base,{preset:{evaluationType:'ssc-dest',targetKeyDepressions:2000},typed:'a'.repeat(2000),complete:false});
  assert.equal(dest.targetAchieved,false);assert.equal(dest.officialQualification,null);
  const r=e.assess(base,{preset:{evaluationType:'rrb',minimumWordsByLanguage:{english:300}},typed:'one '.repeat(300),complete:true});
  assert.equal(r.targetAchieved,false);assert.equal(r.fullMistakes,undefined);assert.equal(r.minimumContentMet,true);
  const g=e.assess(base,{preset:{evaluationType:'general'}});assert.equal(g.targetAchieved,true);
});
test('Invalid reviewed inputs are rejected instead of leaking NaN', () => {
  assert.throws(()=>e.rrb({words:1,fullMistakes:-1,halfMistakes:0}));
  assert.throws(()=>e.delhi({strokes:100,mistakes:NaN}));
  assert.throws(()=>e.upPolice({words:100,correctWords:101}));
  assert.throws(()=>e.chslSpeed(100,0,'english'));
});
