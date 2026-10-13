/**
 * indexnow.mjs — tell Bing (and so ChatGPT search and Copilot), Yandex, Naver
 * and Seznam that pages on pixeltowing.com changed.
 *
 * Run after a deploy is live:   npm run indexnow
 * Submit only some URLs:        npm run indexnow -- /services/lockout /blog
 *
 * With no arguments it submits every URL in the live sitemap. The key is public
 * by design: search engines verify it by fetching https://pixeltowing.com/<key>.txt
 * (public/<key>.txt). See https://www.indexnow.org/documentation.
 */

const SITE_ORIGIN = "https://pixeltowing.com";
const HOST = "pixeltowing.com";
const INDEXNOW_KEY = "cd50e408811dc2a962978440ded267f4";
const ENDPOINT = "https://api.indexnow.org/indexnow";
// Protocol limit per request.
const MAX_URLS = 10000;

async function fetchText(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`GET ${url} returned HTTP ${res.status}`);
	return res.text();
}

async function sitemapUrls() {
	const xml = await fetchText(`${SITE_ORIGIN}/sitemap.xml`);
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].trim());
}

/** Accepts site-relative paths or absolute URLs on this host only. */
function toSiteUrl(arg) {
	const url = new URL(arg, SITE_ORIGIN);
	if (url.host !== HOST) throw new Error(`Not a ${HOST} URL: ${arg}`);
	return url.href;
}

async function verifyKeyFile() {
	const body = await fetchText(`${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`);
	if (body.trim() !== INDEXNOW_KEY) {
		throw new Error("Live key file does not match INDEXNOW_KEY — deploy the latest build first.");
	}
}

async function main() {
	const args = process.argv.slice(2);
	const urls = args.length > 0 ? args.map(toSiteUrl) : await sitemapUrls();
	if (urls.length === 0) throw new Error("No URLs to submit.");
	if (urls.length > MAX_URLS) throw new Error(`Too many URLs (${urls.length} > ${MAX_URLS}).`);

	await verifyKeyFile();

	const res = await fetch(ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify({
			host: HOST,
			key: INDEXNOW_KEY,
			keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
			urlList: urls,
		}),
	});

	// 200 = accepted, 202 = accepted, key validation pending.
	if (res.status !== 200 && res.status !== 202) {
		throw new Error(`IndexNow returned HTTP ${res.status}: ${await res.text()}`);
	}
	console.log(`IndexNow accepted ${urls.length} URL(s) (HTTP ${res.status}).`);
}

main().catch(err => {
	console.error(`IndexNow submission failed: ${err.message}`);
	process.exit(1);
});
