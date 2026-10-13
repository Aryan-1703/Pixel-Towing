/**
 * Service catalogue — slugs, labels and sitemap dates.
 *
 * Pure data so routes.ts can build the sitemap from it. Page copy, images and
 * icons for each slug live in ServiceDetailPage, typed against ServiceSlug so
 * a service cannot exist in one place and be missing from the other.
 */

export const SERVICE_SLUGS = [
	"lockout",
	"tire-change",
	"jump-start",
	"vehicle-transport",
	"scrap-car-removal",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const isServiceSlug = (value: string): value is ServiceSlug =>
	(SERVICE_SLUGS as readonly string[]).includes(value);

interface ServiceLink {
	label: string;
	anchor: string;
	/** One factual sentence for machine-readable summaries (llms.txt). Must match the page copy. */
	summary: string;
	lastmod: string;
}

/** Short labels and descriptive anchor text used in nav, footer and cross-links. */
export const SERVICE_LINKS: Record<ServiceSlug, ServiceLink> = {
	lockout: {
		label: "Car Lockout",
		anchor: "24/7 car lockout service",
		summary:
			"24/7 car lockout service: we unlock car doors and trunks when keys or a key fob are locked inside, using professional vehicle-entry tools. Price quoted before dispatch.",
		lastmod: "2026-10-11",
	},
	"tire-change": {
		label: "Flat Tire Change",
		anchor: "Flat tire change",
		summary:
			"Roadside flat tire change: we install your spare and check its pressure. No usable spare? We tow you to a tire shop.",
		lastmod: "2026-09-30",
	},
	"jump-start": {
		label: "Battery Boost",
		anchor: "Battery boost and jump start",
		summary:
			"24/7 battery boost with a professional booster pack, plus a basic battery and charging-system check.",
		lastmod: "2026-09-30",
	},
	"vehicle-transport": {
		label: "Flatbed Towing",
		anchor: "Flatbed towing for AWD vehicles",
		summary:
			"Flatbed towing for AWD, 4WD, luxury and low-clearance vehicles and motorcycles, plus long-distance towing across Ontario.",
		lastmod: "2026-09-30",
	},
	"scrap-car-removal": {
		label: "Scrap Car Removal",
		anchor: "Scrap car removal",
		summary:
			"Scrap car removal with free towing, an upfront cash offer based on the vehicle, and help with the ownership paperwork.",
		lastmod: "2026-09-30",
	},
};

export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;

export const ACCIDENT_RECOVERY = {
	path: "/accident-recovery",
	label: "Accident Recovery",
	anchor: "Accident towing in Brampton",
	summary:
		"24/7 accident towing in Brampton and the GTA, with Collision Reporting Centre drop-off and optional collision repair and rental coordination.",
} as const;
