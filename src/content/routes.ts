/**
 * Single source of truth for every public URL.
 *
 * vite.config.ts reads this at build time to emit:
 *   - dist/sitemap.xml        (indexable routes only)
 *   - dist/.site-manifest.json (all routes to prerender + permanent redirects,
 *                              read by scripts/prerender.mjs and server.mjs)
 *
 * Dynamic routes are derived from the content modules, so adding a city,
 * service or article automatically adds it to prerendering and the sitemap.
 * Keep this file (and everything it imports) free of React and asset imports.
 */
import { CITY_SLUGS, CITIES } from "./cities";
import { SERVICE_SLUGS, SERVICE_LINKS, servicePath } from "./services";
import { BLOG_POSTS } from "./blogPosts";

export interface SiteRoute {
	path: string;
	/** false → rendered with noindex and left out of the sitemap. */
	indexable: boolean;
	/** ISO date of the last substantial content change. Required for indexable routes. */
	lastmod: string;
}

const STATIC_ROUTES: readonly SiteRoute[] = [
	{ path: "/", indexable: true, lastmod: "2026-09-30" },
	{ path: "/services", indexable: true, lastmod: "2026-09-30" },
	{ path: "/accident-recovery", indexable: true, lastmod: "2026-09-30" },
	{ path: "/locations", indexable: true, lastmod: "2026-09-30" },
	{ path: "/blog", indexable: true, lastmod: "2026-09-30" },
	{ path: "/about", indexable: true, lastmod: "2026-09-30" },
	{ path: "/contact", indexable: true, lastmod: "2026-09-30" },
	{ path: "/review", indexable: false, lastmod: "2026-09-30" },
];

export const SITE_ROUTES: readonly SiteRoute[] = [
	...STATIC_ROUTES,
	...SERVICE_SLUGS.map(slug => ({
		path: servicePath(slug),
		indexable: true,
		lastmod: SERVICE_LINKS[slug].lastmod,
	})),
	...CITY_SLUGS.map(slug => ({
		path: `/locations/${slug}`,
		indexable: true,
		lastmod: CITIES[slug].lastmod,
	})),
	...BLOG_POSTS.map(post => ({
		path: `/blog/${post.slug}`,
		indexable: true,
		lastmod: post.dateModified ?? post.datePublished,
	})),
];

/**
 * Permanent (HTTP 301) redirects, served by server.mjs before React loads.
 * App.tsx keeps client-side <Navigate> fallbacks for the same paths.
 */
export const PERMANENT_REDIRECTS: Readonly<Record<string, string>> = {
	"/collision-repair": "/accident-recovery",
	"/services/accident-recovery": "/accident-recovery",
};

/** Path the prerenderer renders the NotFound page from; saved as dist/404.html. */
export const NOT_FOUND_PRERENDER_PATH = "/__not-found";

export const SITE_MANIFEST_FILE = ".site-manifest.json";
