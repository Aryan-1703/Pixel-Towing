/**
 * server.mjs — production static server for pixeltowing.com (Railway).
 *
 * Serves the prerendered build in dist/ with correct HTTP semantics:
 *   /real-page          → 200  (dist/real-page/index.html)
 *   /old-page           → 301  (PERMANENT_REDIRECTS in src/content/routes.ts)
 *   /does-not-exist     → 404  (dist/404.html, the prerendered NotFound page)
 *
 * No dependencies: Railway's runtime image only needs Node.
 */

import { createServer } from "node:http";
import { createReadStream, readFileSync, statSync } from "node:fs";
import { pipeline } from "node:stream";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const DIST = resolve(ROOT, "dist");
const MANIFEST_FILE = join(DIST, ".site-manifest.json");
const NOT_FOUND_FILE = join(DIST, "404.html");
const PORT = Number(process.env.PORT) || 3000;
const CANONICAL_HOST = process.env.CANONICAL_HOST || "pixeltowing.com";

const MIME_TYPES = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".xml": "application/xml; charset=utf-8",
	".txt": "text/plain; charset=utf-8",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".webp": "image/webp",
	".avif": "image/avif",
	".gif": "image/gif",
	".ico": "image/x-icon",
	".pdf": "application/pdf",
	".woff": "font/woff",
	".woff2": "font/woff2",
};

const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ".svg"]);

const SECURITY_HEADERS = {
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "SAMEORIGIN",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Strict-Transport-Security": "max-age=31536000",
};

function loadRedirects() {
	try {
		const manifest = JSON.parse(readFileSync(MANIFEST_FILE, "utf8"));
		return new Map(Object.entries(manifest.redirects ?? {}));
	} catch (err) {
		throw new Error(`Cannot read ${MANIFEST_FILE} — run "npm run build" first. (${err.message})`);
	}
}

const REDIRECTS = loadRedirects();

function isFile(path) {
	try {
		return statSync(path).isFile();
	} catch {
		return false;
	}
}

/** Maps a decoded URL path to a file inside dist/, or null. Never escapes dist/. */
function resolveFile(pathname) {
	const segments = pathname.split("/").filter(Boolean);
	// Dotfiles (including the build manifest) are never public.
	if (segments.some(segment => segment.startsWith("."))) return null;

	const target = resolve(DIST, ...segments);
	if (target !== DIST && !target.startsWith(DIST + sep)) return null;

	const candidate = extname(pathname) ? target : join(target, "index.html");
	return isFile(candidate) ? candidate : null;
}

function cacheControlFor(pathname, status) {
	if (status === 200 && pathname.startsWith("/assets/")) {
		return "public, max-age=31536000, immutable";
	}
	if (extname(pathname) === "" || pathname.endsWith(".html") || status !== 200) {
		return "public, max-age=0, must-revalidate";
	}
	return "public, max-age=3600";
}

function redirect(res, location) {
	res.writeHead(301, { ...SECURITY_HEADERS, Location: location, "Cache-Control": "public, max-age=3600" });
	res.end();
}

// dist/ is immutable at runtime, so each text file is compressed once. Bounded
// by the size of the build (a few hundred KB of HTML/JS/CSS).
const GZIP_CACHE = new Map();

function gzipped(file) {
	let body = GZIP_CACHE.get(file);
	if (!body) {
		body = gzipSync(readFileSync(file));
		GZIP_CACHE.set(file, body);
	}
	return body;
}

function sendFile(req, res, file, status, pathname) {
	const ext = extname(file);
	const headers = {
		...SECURITY_HEADERS,
		"Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
		"Cache-Control": cacheControlFor(pathname, status),
		Vary: "Accept-Encoding",
	};

	if (COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
		const body = gzipped(file);
		res.writeHead(status, { ...headers, "Content-Encoding": "gzip", "Content-Length": body.length });
		return res.end(req.method === "HEAD" ? undefined : body);
	}

	res.writeHead(status, { ...headers, "Content-Length": statSync(file).size });
	if (req.method === "HEAD") return res.end();
	// pipeline() destroys the file stream if the client disconnects mid-body.
	pipeline(createReadStream(file), res, err => {
		if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
			console.error(`Failed to stream ${pathname}: ${err.message}`);
		}
	});
}

function sendNotFound(req, res) {
	if (!isFile(NOT_FOUND_FILE)) {
		res.writeHead(404, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
		return res.end("Not found");
	}
	return sendFile(req, res, NOT_FOUND_FILE, 404, "/404.html");
}

/**
 * Works on the still-percent-encoded path, so a redirect can never decode into
 * "//host" (an off-site, protocol-relative Location). Collapses leading
 * slashes, strips "/index.html" and trailing slashes, then applies redirects.
 */
function canonicalPath(encodedPath) {
	let path = `/${encodedPath.replace(/^\/+/, "")}`;
	if (path.endsWith("/index.html")) path = path.slice(0, -"index.html".length);
	if (path.length > 1) path = path.replace(/\/+$/, "") || "/";
	return REDIRECTS.get(path) ?? path;
}

/** Returns a single-hop redirect target for non-canonical URLs, or null. */
function canonicalRedirect(req, encodedPath, search) {
	const host = (req.headers.host ?? "").toLowerCase();
	const path = canonicalPath(encodedPath);
	// Railway terminates TLS and forwards the original scheme.
	const wrongHost = host === `www.${CANONICAL_HOST}`;
	const insecure = req.headers["x-forwarded-proto"] === "http" && host === CANONICAL_HOST;
	if (wrongHost || insecure) return `https://${CANONICAL_HOST}${path}${search}`;
	return path === encodedPath ? null : `${path}${search}`;
}

function handle(req, res) {
	if (req.method !== "GET" && req.method !== "HEAD") {
		res.writeHead(405, { ...SECURITY_HEADERS, Allow: "GET, HEAD" });
		return res.end();
	}

	let url;
	let pathname;
	try {
		// Prefix rather than resolve, so a request for "//host/x" stays a path.
		url = new URL(`http://localhost${req.url ?? "/"}`);
		pathname = decodeURIComponent(url.pathname);
	} catch {
		res.writeHead(400, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
		return res.end("Bad request");
	}

	const location = canonicalRedirect(req, url.pathname, url.search);
	if (location) return redirect(res, location);

	// The 404 page is only ever served with status 404, never as its own URL.
	const file = pathname === "/404.html" ? null : resolveFile(pathname);
	if (file) return sendFile(req, res, file, 200, pathname);
	return sendNotFound(req, res);
}

createServer((req, res) => {
	try {
		handle(req, res);
	} catch (err) {
		const safeUrl = String(req.url).replace(/[\x00-\x1f\x7f]/g, "?");
		console.error(`Unhandled error for ${req.method} ${safeUrl}: ${err.message}`);
		if (!res.headersSent) {
			res.writeHead(500, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
		}
		res.end("Internal server error");
	}
}).listen(PORT, () => {
	console.log(`Pixel Towing server listening on port ${PORT}`);
});
