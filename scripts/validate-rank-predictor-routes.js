const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const configPath = path.join(rootDir, 'JS', 'rank-predictor-config.js');
const configText = fs.readFileSync(configPath, 'utf8');
const examIds = Array.from(configText.matchAll(/examId:\s*"([^"]+)"/g)).map((match) => match[1]);

const routePages = [
  'rank-predictor/ssc-cgl/index.html',
  'rank-predictor/railway/index.html',
  'rank-predictor/ssc-cpo/index.html',
  'rank-predictor/up-home-guard/index.html',
  'rank-predictor/up-police/index.html',
  'rank-predictor/upsc/index.html',
  'rank-predictor/upsssc/index.html'
];

const failures = [];

for (const relativePath of routePages) {
  const filePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(filePath)) {
    failures.push(`${relativePath} is missing`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const matches = Array.from(html.matchAll(/(?:href|src)="([^"]*\?exam=([^"&\s]+))"/g));
  for (const match of matches) {
    const examId = decodeURIComponent(match[2]);
    if (!examIds.includes(examId)) {
      failures.push(`${relativePath} uses unknown exam ID "${examId}"`);
    }
  }
}

if (failures.length) {
  console.error('Rank predictor route validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Validated ${routePages.length} rank predictor route pages against ${examIds.length} configured exams.`);
