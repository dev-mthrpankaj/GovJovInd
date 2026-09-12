#!/usr/bin/env node

/*
 * Copies SEO-critical visible text from each page's inline #jobData JSON into
 * the initial HTML. The lifecycle script continues to hydrate the same fields
 * in the browser; this simply gives crawlers and no-JS clients a useful
 * fallback.
 *
 * Usage:
 *   node scripts/hydrate-job-static-fallbacks.js          # preview changes
 *   node scripts/hydrate-job-static-fallbacks.js --write  # update files
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jobsDir = path.join(root, 'jobs');
const write = process.argv.includes('--write');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateElement(html, id, value) {
  if (value === undefined || value === null || value === '') return html;
  const expression = new RegExp(`(<([a-z0-9]+)\\b[^>]*\\bid=["']${id}["'][^>]*>)[\\s\\S]*?(<\\/\\2>)`, 'i');
  if (!expression.test(html)) return html;
  return html.replace(expression, `$1${escapeHtml(value)}$3`);
}

function readJobData(html, file) {
  const match = html.match(/<script\b[^>]*\bid=["']jobData["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(`${file}: #jobData was not found`);
  try {
    return JSON.parse(match[1].trim());
  } catch (error) {
    throw new Error(`${file}: invalid #jobData JSON (${error.message})`);
  }
}

const files = fs.readdirSync(jobsDir).filter(file => file.endsWith('.html')).sort();
let changed = 0;
let skipped = 0;
const errors = [];

for (const file of files) {
  const filePath = path.join(jobsDir, file);
  const original = fs.readFileSync(filePath, 'utf8');
  try {
    const job = readJobData(original, file);
    let html = original;
    html = updateElement(html, 'jobOrganization', job.organization);
    html = updateElement(html, 'jobTitle', job.title);
    html = updateElement(html, 'jobSummary', job.summary);
    html = updateElement(html, 'breadcrumbCurrent', job.shortTitle || job.title);
    html = updateElement(html, 'latestUpdate', job.latestUpdate);

    if (html === original) {
      skipped += 1;
      continue;
    }
    changed += 1;
    console.log(`${write ? 'Updated' : 'Would update'} jobs/${file}`);
    if (write) fs.writeFileSync(filePath, html, 'utf8');
  } catch (error) {
    errors.push(error.message);
  }
}

console.log(`\n${write ? 'Updated' : 'Preview'}: ${changed} changed, ${skipped} already current, ${errors.length} errors.`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
}
