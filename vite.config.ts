import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { absoluteUrl } from "./src/content/site";
import {
	SITE_ROUTES,
	PERMANENT_REDIRECTS,
	NOT_FOUND_PRERENDER_PATH,
	SITE_MANIFEST_FILE,
} from "./src/content/routes";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Fail the build on route-table mistakes instead of shipping a broken sitemap. */
function validateRoutes(): void {
	const seen = new Set<string>();
	for (const route of SITE_ROUTES) {
		if (seen.has(route.path)) throw new Error(`Duplicate route in routes.ts: ${route.path}`);
		seen.add(route.path);
		if (!ISO_DATE.test(route.lastmod)) {
			throw new Error(`Route ${route.path} has an invalid lastmod: "${route.lastmod}"`);
		}
	}
	for (const [from, to] of Object.entries(PERMANENT_REDIRECTS)) {
		if (seen.has(from)) throw new Error(`Redirect source is also a live route: ${from}`);
		if (!seen.has(to)) throw new Error(`Redirect target is not a known route: ${from} -> ${to}`);
	}
}

function buildSitemap(): string {
	const urls = SITE_ROUTES.filter(route => route.indexable)
		.map(
			route =>
				`  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n  </url>`,
		)
		.join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** Emits sitemap.xml and the prerender/server manifest from src/content/routes.ts. */
function siteManifestPlugin(): Plugin {
	return {
		name: "pixel-site-manifest",
		apply: "build",
		buildStart() {
			validateRoutes();
		},
		generateBundle() {
			this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap() });
			this.emitFile({
				type: "asset",
				fileName: SITE_MANIFEST_FILE,
				source: JSON.stringify(
					{
						routes: SITE_ROUTES,
						redirects: PERMANENT_REDIRECTS,
						notFoundPath: NOT_FOUND_PRERENDER_PATH,
					},
					null,
					2,
				),
			});
		},
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), siteManifestPlugin()],
});
