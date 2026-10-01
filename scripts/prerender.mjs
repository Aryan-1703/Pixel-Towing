/**
 * prerender.mjs — Static pre-rendering for pixeltowing.com
 *
 * Starts a local server, visits each route with puppeteer,
 * waits for React + React Helmet to finish rendering, then
 * saves the resulting HTML as a static index.html file.
 *
 * Run automatically via `npm run build` (postbuild hook).
 */

import puppeteer from "puppeteer";
import { createServer } from "http";
import handler from "serve-handler";
import { writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST = resolve(__dirname, "../dist");
const PORT = 3999;
const BASE_URL = `http://localhost:${PORT}`;

// All routes to pre-render
const ROUTES = [
  "/",
  "/services",
  "/accident-recovery",
  "/services/lockout",
  "/services/tire-change",
  "/services/jump-start",
  "/services/vehicle-transport",
  "/services/scrap-car-removal",
  "/locations/mississauga",
  "/locations/caledon",
  "/locations/halton-hills",
  "/locations/acton",
  "/locations/erin",
  "/blog",
  "/blog/what-to-do-after-car-accident-brampton",
  "/blog/ontario-towing-laws-driver-rights",
  "/blog/dead-battery-vs-bad-alternator",
  "/blog/how-to-avoid-predatory-towing-gta",
  "/blog/car-insurance-towing-coverage-ontario",
  "/blog/total-loss-vehicle-ontario-guide",
  "/blog/oem-vs-aftermarket-parts-collision-repair",
  "/blog/deductible-waived-collision-repair-brampton",
  "/blog/collision-repair-rental-car-brampton",
  "/about",
  "/contact",
  "/review",
  "/locations/etobicoke",
  "/locations/vaughan",
  "/locations/toronto",
  "/locations/georgetown",
];

// Start static file server
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      handler(req, res, {
        public: DIST,
        rewrites: [{ source: "**", destination: "/index.html" }],
      });
    });
    server.listen(PORT, () => {
      console.log(`  Static server running at ${BASE_URL}`);
      resolve(server);
    });
  });
}

const MAX_ATTEMPTS = 3;

// Capture a route's rendered HTML. Returns null if Helmet never flushed.
async function captureRoute(page, route) {
  const url = `${BASE_URL}${route}`;
  // networkidle0 waits for all network requests to finish, then React renders
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

  // Wait until react-helmet-async has injected the canonical link, retrying
  // until it appears or we hit the timeout. Cold-start renders sometimes need
  // multiple seconds before Helmet flushes into the DOM.
  try {
    await page.waitForFunction(
      () => !!document.querySelector('link[rel="canonical"][data-rh="true"]'),
      { timeout: 10000, polling: 200 }
    );
  } catch {
    return null;
  }

  // Small additional buffer so any sibling Helmet tags settle in the head
  await new Promise((r) => setTimeout(r, 250));

  return page.content();
}

// Pre-render a single route, retrying the whole navigation when Helmet has not
// flushed. The first route of a run reliably loses this race on a cold V8 /
// React start, and a reload is what actually clears it — waiting longer on the
// same navigation does not.
async function prerenderRoute(page, route) {
  let html = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS && !html; attempt++) {
    html = await captureRoute(page, route);
    if (!html && attempt < MAX_ATTEMPTS) {
      console.log(`     ↻ ${route} — Helmet not ready, retry ${attempt}/${MAX_ATTEMPTS - 1}`);
    }
  }

  if (!html) {
    throw new Error(`Helmet canonical not injected after ${MAX_ATTEMPTS} attempts`);
  }

  // Determine output path
  const outputDir =
    route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
  mkdirSync(outputDir, { recursive: true });
  const outputFile = join(outputDir, "index.html");
  writeFileSync(outputFile, html, "utf8");

  return html;
}

async function main() {
  const server = await startServer();

  const browser = await puppeteer.launch({
    headless: "shell",
    timeout: 60000,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  let passed = 0;
  let failed = 0;

  try {
    const page = await browser.newPage();
    // Suppress non-critical console noise
    page.on("console", () => {});

    for (let i = 0; i < ROUTES.length; i++) {
      const route = ROUTES[i];
      try {
        const html = await prerenderRoute(page, route);

        // Verify the canonical was injected by Helmet — without it, the page
        // ships with the static fallback title and no canonical, which is
        // exactly the SEO regression we just fixed.
        const hasCanonical = html.includes('rel="canonical"') && html.includes('data-rh="true"');
        if (!hasCanonical) {
          throw new Error("Helmet canonical not injected");
        }
        console.log(`  ✅ [${i + 1}/${ROUTES.length}] ${route}`);
        passed++;
      } catch (err) {
        console.error(`  ❌ [${i + 1}/${ROUTES.length}] ${route} — ${err.message}`);
        failed++;
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n  Pre-rendering complete: ${passed} succeeded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Pre-rendering failed:", err);
  process.exit(1);
});
