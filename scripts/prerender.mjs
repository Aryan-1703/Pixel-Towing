/**
 * prerender.mjs — Static pre-rendering for pixeltowing.com
 *
 * Reads the route list from dist/.site-manifest.json (generated from
 * src/content/routes.ts by vite.config.ts), visits each route with puppeteer,
 * waits for React Helmet to flush the head, checks the head is SEO-clean, and
 * saves the HTML as dist/<route>/index.html. The NotFound page is saved as
 * dist/404.html for server.mjs to serve with HTTP 404.
 *
 * Run automatically via `npm run build` (postbuild hook).
 */

import puppeteer from "puppeteer";
import { createServer } from "http";
import handler from "serve-handler";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST = resolve(__dirname, "../dist");
const MANIFEST = JSON.parse(readFileSync(join(DIST, ".site-manifest.json"), "utf8"));
const SITE_ORIGIN = "https://pixeltowing.com";
// 0 = let the OS pick a free port, so concurrent or leftover builds can't collide
const PORT = Number(process.env.PRERENDER_PORT) || 0;
const HOST = "127.0.0.1";
const MAX_ATTEMPTS = 3;
// Search results truncate descriptions at roughly 155-160 characters.
const MAX_DESCRIPTION_LENGTH = 160;
let BASE_URL = "";

// Start static file server with SPA fallback (prerendered files don't exist yet)
function startServer() {
	return new Promise((resolve, reject) => {
		const server = createServer((req, res) => {
			handler(req, res, {
				public: DIST,
				rewrites: [{ source: "**", destination: "/index.html" }],
			});
		});
		server.once("error", reject);
		server.listen(PORT, HOST, () => {
			BASE_URL = `http://${HOST}:${server.address().port}`;
			console.log(`  Static server running at ${BASE_URL}`);
			resolve(server);
		});
	});
}

// Capture a route's rendered HTML. Returns null if Helmet never flushed.
async function captureRoute(page, route) {
	await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle0", timeout: 30000 });

	// Every page (including the 404) emits a Helmet-managed robots tag, so its
	// presence means Helmet has flushed. Cold starts can take a few seconds.
	try {
		await page.waitForFunction(
			() => !!document.querySelector('meta[name="robots"][data-rh="true"]'),
			{ timeout: 10000, polling: 200 },
		);
	} catch {
		return null;
	}

	// Small additional buffer so any sibling Helmet tags settle in the head
	await new Promise(r => setTimeout(r, 250));
	return page.content();
}

/** Head facts used to enforce one title / description / canonical per page. */
function inspectHead(page) {
	return page.evaluate(() => {
		const schemaTypes = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => {
			try {
				return JSON.parse(el.textContent)["@type"];
			} catch {
				return "INVALID_JSON";
			}
		});
		return {
			titles: document.querySelectorAll("head > title").length,
			descriptions: document.head.querySelectorAll('meta[name="description"]').length,
			descriptionText: document.head.querySelector('meta[name="description"]')?.content ?? "",
			canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.href),
			robots: document.querySelector('meta[name="robots"]')?.content ?? "",
			schemaTypes,
		};
	});
}

/** Returns a list of problems with the rendered head (empty = clean). */
function auditHead(head, route, indexable) {
	const problems = [];
	if (head.titles !== 1) problems.push(`${head.titles} <title> tags`);
	if (head.descriptions !== 1) problems.push(`${head.descriptions} meta descriptions`);
	if (head.descriptionText.length > MAX_DESCRIPTION_LENGTH) {
		problems.push(`meta description is ${head.descriptionText.length} chars (max ${MAX_DESCRIPTION_LENGTH})`);
	}
	if (head.schemaTypes.includes("INVALID_JSON")) problems.push("invalid JSON-LD");
	if (head.schemaTypes.includes("FAQPage")) problems.push("FAQPage schema present");
	const businessNodes = head.schemaTypes.filter(type => type === "AutomotiveBusiness").length;
	if (businessNodes !== 1) problems.push(`${businessNodes} business schema nodes`);

	if (indexable) {
		const expected = route === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
		if (head.canonicals.length !== 1 || head.canonicals[0] !== expected) {
			problems.push(`canonical ${JSON.stringify(head.canonicals)} (expected ${expected})`);
		}
		if (head.robots.includes("noindex")) problems.push("indexable route is noindex");
	} else if (!head.robots.includes("noindex")) {
		problems.push("noindex route is missing noindex");
	}
	return problems;
}

// Pre-render one route, retrying the navigation when Helmet has not flushed.
// The first route of a run reliably loses this race on a cold V8 / React
// start, and a reload is what actually clears it.
async function prerenderRoute(page, route, outputFile, indexable) {
	let html = null;
	for (let attempt = 1; attempt <= MAX_ATTEMPTS && !html; attempt++) {
		html = await captureRoute(page, route);
		if (!html && attempt < MAX_ATTEMPTS) {
			console.log(`     ↻ ${route} — Helmet not ready, retry ${attempt}/${MAX_ATTEMPTS - 1}`);
		}
	}
	if (!html) throw new Error(`Helmet did not flush after ${MAX_ATTEMPTS} attempts`);

	const problems = auditHead(await inspectHead(page), route, indexable);
	if (problems.length > 0) throw new Error(problems.join("; "));

	mkdirSync(resolve(outputFile, ".."), { recursive: true });
	writeFileSync(outputFile, html, "utf8");
}

function buildJobs() {
	const jobs = MANIFEST.routes.map(route => ({
		route: route.path,
		indexable: route.indexable,
		outputFile: route.path === "/" ? join(DIST, "index.html") : join(DIST, route.path.slice(1), "index.html"),
	}));
	jobs.push({ route: MANIFEST.notFoundPath, indexable: false, outputFile: join(DIST, "404.html") });
	// "/" overwrites dist/index.html, which is also the SPA shell the fallback
	// serves for every other route — so it must be rendered last.
	return [...jobs.filter(job => job.route !== "/"), ...jobs.filter(job => job.route === "/")];
}

async function main() {
	const server = await startServer();
	const browser = await puppeteer.launch({
		headless: "shell",
		timeout: 60000,
		args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
	});

	const jobs = buildJobs();
	let failed = 0;

	try {
		const page = await browser.newPage();
		page.on("console", () => {});

		for (const [i, job] of jobs.entries()) {
			const label = `[${i + 1}/${jobs.length}] ${job.route}`;
			try {
				await prerenderRoute(page, job.route, job.outputFile, job.indexable);
				console.log(`  ✅ ${label}`);
			} catch (err) {
				console.error(`  ❌ ${label} — ${err.message}`);
				failed++;
			}
		}
	} finally {
		await browser.close();
		server.close();
	}

	console.log(`\n  Pre-rendering complete: ${jobs.length - failed} succeeded, ${failed} failed`);
	if (failed > 0) process.exit(1);
}

main().catch(err => {
	console.error("Pre-rendering failed:", err);
	process.exit(1);
});
