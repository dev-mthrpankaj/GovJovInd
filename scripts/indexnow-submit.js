"use strict";

const fs = require("fs");
const path = require("path");

const SITE_ORIGIN = "https://govjobupdates.com";
const HOST = "govjobupdates.com";
const SITEMAP_PATH = path.resolve(__dirname, "..", "sitemap.xml");
const DEFAULT_LOOKBACK_HOURS = 48;
const MAX_BATCH_SIZE = 500;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const args = new Set(process.argv.slice(2));
const forceAll = args.has("--all");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    throw new Error(`sitemap.xml not found at ${SITEMAP_PATH}`);
  }

  return fs.readFileSync(SITEMAP_PATH, "utf8");
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'");
}

function parseSitemap(xml) {
  const entries = [];
  const urlBlockPattern = /<url>\s*([\s\S]*?)\s*<\/url>/gi;
  let match;

  while ((match = urlBlockPattern.exec(xml)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>\s*([\s\S]*?)\s*<\/loc>/i);
    if (!locMatch) continue;

    const lastmodMatch = block.match(/<lastmod>\s*([\s\S]*?)\s*<\/lastmod>/i);
    entries.push({
      url: decodeXml(locMatch[1].trim()),
      lastmod: lastmodMatch ? decodeXml(lastmodMatch[1].trim()) : ""
    });
  }

  return entries;
}

function isGovJobUpdatesUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === SITE_ORIGIN;
  } catch (_) {
    return false;
  }
}

function isBlockedUrl(url) {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.toLowerCase();

    return parsed.hostname !== HOST
      || pathname.startsWith("/live-test/")
      || pathname.includes("/live-test/admin/")
      || pathname.includes("/live-test/api/")
      || pathname.includes("/admin/")
      || pathname.includes("/payment-")
      || pathname.includes("/attempt.php")
      || pathname.includes("/preload-attempt.php")
      || pathname.includes("/autosave.php")
      || pathname.includes("/submit.php")
      || pathname.includes("/log-violation.php")
      || pathname.includes("/android-webview-app/")
      || pathname.includes("/reports/")
      || pathname.includes("/generated-job-pages/")
      || pathname.includes("/generated_job_pages/")
      || pathname.includes("/tmp-live-test-")
      || pathname.includes("/.cache/")
      || pathname.includes("/.edge-")
      || pathname.includes("/.sixth/");
  } catch (_) {
    return true;
  }
}

function parseLastmod(lastmod) {
  const value = String(lastmod || "").trim();
  if (!value) return null;

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T23:59:59Z`
    : value;
  const timestamp = Date.parse(normalized);

  return Number.isNaN(timestamp) ? null : timestamp;
}

function isRecentlyModified(entry) {
  if (forceAll) return true;

  const timestamp = parseLastmod(entry.lastmod);
  if (!timestamp) return false;

  const cutoff = Date.now() - (DEFAULT_LOOKBACK_HOURS * 60 * 60 * 1000);
  return timestamp >= cutoff;
}

function getEligibleEntries(entries) {
  const stats = {
    nonGovDomain: 0,
    blocked: 0,
    oldLastmod: 0,
    duplicate: 0
  };
  const seen = new Set();
  const eligible = [];

  for (const entry of entries) {
    if (!isGovJobUpdatesUrl(entry.url)) {
      stats.nonGovDomain += 1;
      continue;
    }

    if (isBlockedUrl(entry.url)) {
      stats.blocked += 1;
      continue;
    }

    if (!isRecentlyModified(entry)) {
      stats.oldLastmod += 1;
      continue;
    }

    if (seen.has(entry.url)) {
      stats.duplicate += 1;
      continue;
    }

    seen.add(entry.url);
    eligible.push(entry);
  }

  return { eligible, stats };
}

function chunkUrls(urls) {
  const chunks = [];
  for (let index = 0; index < urls.length; index += MAX_BATCH_SIZE) {
    chunks.push(urls.slice(index, index + MAX_BATCH_SIZE));
  }
  return chunks;
}

function getIndexNowKey() {
  const key = String(process.env.INDEXNOW_KEY || "").trim();
  if (!key) {
    throw new Error("INDEXNOW_KEY environment variable is missing.");
  }
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(key)) {
    throw new Error("INDEXNOW_KEY format looks invalid. Use a plain alphanumeric key.");
  }
  return key;
}

async function submitBatch(key, urlList, batchNumber, totalBatches) {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `${SITE_ORIGIN}/${encodeURIComponent(key)}.txt`,
      urlList
    })
  });

  const responseText = await response.text();
  const safeText = responseText.replace(new RegExp(escapeRegExp(key), "g"), "[redacted]");

  if (!response.ok) {
    throw new Error(`Batch ${batchNumber}/${totalBatches} failed with HTTP ${response.status}: ${safeText || response.statusText}`);
  }

  console.log(`Batch ${batchNumber}/${totalBatches} accepted with HTTP ${response.status}. URLs: ${urlList.length}`);
}

async function main() {
  const xml = readSitemap();
  const entries = parseSitemap(xml);
  const { eligible, stats } = getEligibleEntries(entries);
  const urls = eligible.map((entry) => entry.url);

  console.log(`IndexNow mode: ${forceAll ? "full sitemap (--all)" : `last ${DEFAULT_LOOKBACK_HOURS} hours`}`);
  console.log(`Found URLs in sitemap: ${entries.length}`);
  console.log(`Eligible URLs: ${urls.length}`);
  console.log(`Skipped URLs: ${entries.length - urls.length}`);
  console.log(`Skipped breakdown: non-govjobupdates=${stats.nonGovDomain}, blocked=${stats.blocked}, old-lastmod=${stats.oldLastmod}, duplicates=${stats.duplicate}`);

  if (!urls.length) {
    console.log("Submitted URLs: 0");
    console.log("Failed URLs: 0");
    return;
  }

  const key = getIndexNowKey();
  const batches = chunkUrls(urls);
  let submitted = 0;
  let failed = 0;

  for (let index = 0; index < batches.length; index += 1) {
    const batch = batches[index];
    try {
      await submitBatch(key, batch, index + 1, batches.length);
      submitted += batch.length;
    } catch (error) {
      failed += batch.length;
      console.error(error.message);
    }
  }

  console.log(`Submitted URLs: ${submitted}`);
  console.log(`Failed URLs: ${failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
