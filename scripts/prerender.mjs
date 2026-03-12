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
  "/services/accident-recovery",
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

// Pre-render a single route
async function prerenderRoute(page, route) {
  const url = `${BASE_URL}${route}`;
  // networkidle0 waits for all network requests to finish, then React renders
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

  // Give React + React Helmet additional time to update the <head>.
  // networkidle0 guarantees JS is loaded; this gap lets React finish rendering.
  await new Promise((r) => setTimeout(r, 1500));

  // Get fully rendered HTML — retry once if Helmet hasn't injected yet
  let html = await page.content();
  if (!html.includes('data-rh="true"')) {
    await new Promise((r) => setTimeout(r, 1000));
    html = await page.content();
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

        // Verify the SEO title was injected by Helmet
        const hasHelmetTitle = html.includes('data-rh="true"');
        const status = hasHelmetTitle ? "✅" : "⚠️ ";
        console.log(`  ${status} [${i + 1}/${ROUTES.length}] ${route}`);
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
