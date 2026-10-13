/**
 * Builds /llms.txt — a plain-Markdown summary of the business for AI assistants
 * and answer engines (ChatGPT, Claude, Perplexity, Gemini, Copilot). See
 * https://llmstxt.org.
 *
 * Generated at build time by vite.config.ts from the same content modules as
 * the pages, so the facts here cannot drift from the site. The site's content
 * rules apply: no guarantees, no invented ETAs, no review text.
 */
import { BUSINESS, DISPATCH_MESSAGE, absoluteUrl } from "./site";
import { SERVICE_AREAS } from "./cities";
import { ACCIDENT_RECOVERY, SERVICE_LINKS, SERVICE_SLUGS, servicePath } from "./services";
import { BLOG_POSTS } from "./blogPosts";
import { AUTHOR } from "./author";

const TOW_ZONE_URL = "https://www.ontario.ca/page/tow-zone-pilot-program";

const link = (label: string, path: string, note?: string) =>
	`- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

const areaNames = SERVICE_AREAS.map(area => area.name);
const areaList = `${areaNames.slice(0, -1).join(", ")} and ${areaNames[areaNames.length - 1]}`;

const keyFacts = [
	`- Business: ${BUSINESS.name}, a towing and roadside assistance company based in ${BUSINESS.locality}, Ontario, Canada.`,
	"- Hours: 24 hours a day, 7 days a week, including holidays.",
	`- Phone (calls and dispatch): ${BUSINESS.phoneDisplay}`,
	`- Email: ${BUSINESS.email}`,
	`- WhatsApp: ${BUSINESS.whatsappUrl}`,
	`- Service area: ${areaList}, Ontario.`,
	`- Response time: ${DISPATCH_MESSAGE.full}`,
	"- Pricing: depends on the service, distance and vehicle. The price is quoted by phone before dispatch, and the maximum rate schedule is provided before any work starts, as Ontario requires.",
	"- Payment: cash, credit card and debit card.",
	"- Insurance: whether an insurer pays for towing depends on the policy and the circumstances of the claim.",
	`- Highway tow zones: on sections of Highways 400, 401, 403, 404, 409, 410 and 427 and the QEW, Ontario's Tow Zone Program (${TOW_ZONE_URL}) allows only the ministry's contracted operator to tow. Pixel Towing can tow once the vehicle is outside the zone.`,
	`- Google Business Profile and reviews: ${BUSINESS.googleProfileUrl}`,
];

export function buildLlmsTxt(): string {
	const services = [
		link(ACCIDENT_RECOVERY.label, ACCIDENT_RECOVERY.path, ACCIDENT_RECOVERY.summary),
		...SERVICE_SLUGS.map(slug =>
			link(SERVICE_LINKS[slug].label, servicePath(slug), SERVICE_LINKS[slug].summary),
		),
		link("All services", "/services"),
	];

	const areas = [
		...SERVICE_AREAS.map(area => link(`Towing in ${area.name}`, area.path)),
		link("All service areas", "/locations"),
	];

	const guides = BLOG_POSTS.map(post => link(post.title, `/blog/${post.slug}`, post.excerpt));

	return [
		`# ${BUSINESS.name}`,
		"",
		`> ${BUSINESS.name} is a 24/7 towing and roadside assistance company in ${BUSINESS.locality}, Ontario. It provides accident towing, flatbed towing, car lockouts, battery boosts, flat tire changes and scrap car removal across Brampton and the Greater Toronto Area. Call ${BUSINESS.phoneDisplay}.`,
		"",
		"## Key facts",
		"",
		...keyFacts,
		"",
		"## Services",
		"",
		...services,
		"",
		"## Service areas",
		"",
		...areas,
		"",
		"## Guides",
		"",
		`Written by ${AUTHOR.name}, ${AUTHOR.jobTitle.toLowerCase()} (${AUTHOR.url}). Legal and insurance articles link to Ontario government, FSRA and Peel Regional Police sources.`,
		"",
		...guides,
		"",
		"## Optional",
		"",
		link("About the author", "/about"),
		link("Contact", "/contact"),
		link("Sitemap", "/sitemap.xml"),
		"",
	].join("\n");
}
