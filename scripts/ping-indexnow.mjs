import fs from "node:fs";
import path from "node:path";

const HOST = "realgigpay.com";
const ORIGIN = `https://${HOST}`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;

function resolveKey() {
  const envKey = (process.env.INDEXNOW_KEY ?? "").trim();
  if (/^[a-f0-9]{32}$/i.test(envKey)) {
    return envKey;
  }

  const publicDir = path.join(process.cwd(), "public");
  if (fs.existsSync(publicDir)) {
    const match = fs
      .readdirSync(publicDir)
      .find((file) => /^[a-f0-9]{32}\.txt$/i.test(file));
    if (match) {
      return match.replace(/\.txt$/i, "");
    }
  }

  throw new Error(
    "IndexNow key not found. Set INDEXNOW_KEY in your environment or place a <32-hex>.txt file in public/.",
  );
}

function toAbsoluteUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  if (trimmed === "/") return ORIGIN;
  return `${ORIGIN}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

async function fetchSitemapUrls() {
  const response = await fetch(SITEMAP_URL, {
    headers: { accept: "application/xml, text/xml" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${SITEMAP_URL}: HTTP ${response.status}`);
  }
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (!urls.length) {
    throw new Error(`No <loc> URLs found in ${SITEMAP_URL}`);
  }
  return urls;
}

async function main() {
  const key = resolveKey();
  const keyLocation = `${ORIGIN}/${key}.txt`;
  const args = process.argv.slice(2);

  let urlList = [];
  if (args.includes("--all") || args.length === 0) {
    console.log(`Fetching URLs from ${SITEMAP_URL}...`);
    urlList = await fetchSitemapUrls();
  } else {
    urlList = args
      .filter((arg) => !arg.startsWith("--"))
      .map(toAbsoluteUrl)
      .filter(Boolean);
  }

  urlList = [...new Set(urlList)];

  if (!urlList.length) {
    console.error("Usage: npm run indexnow -- --all OR npm run indexnow -- /fiverr-fee-calculator /blog/post");
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow for ${HOST}...`);
  console.log(`Key location: ${keyLocation}`);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation,
      urlList,
    }),
  });

  const text = await response.text();
  console.log(`IndexNow response status: HTTP ${response.status} ${response.statusText}`);
  if (text.trim()) {
    console.log(`Response body: ${text.trim()}`);
  }

  if (response.status >= 400) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("IndexNow ping failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
