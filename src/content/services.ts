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

/** Short labels and descriptive anchor text used in nav, footer and cross-links. */
export const SERVICE_LINKS: Record<ServiceSlug, { label: string; anchor: string; lastmod: string }> = {
	lockout: { label: "Car Lockout", anchor: "Car lockout service", lastmod: "2026-09-30" },
	"tire-change": { label: "Flat Tire Change", anchor: "Flat tire change", lastmod: "2026-09-30" },
	"jump-start": { label: "Battery Boost", anchor: "Battery boost and jump start", lastmod: "2026-09-30" },
	"vehicle-transport": {
		label: "Flatbed Towing",
		anchor: "Flatbed towing for AWD vehicles",
		lastmod: "2026-09-30",
	},
	"scrap-car-removal": {
		label: "Scrap Car Removal",
		anchor: "Scrap car removal",
		lastmod: "2026-09-30",
	},
};

export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;

export const ACCIDENT_RECOVERY = {
	path: "/accident-recovery",
	label: "Accident Recovery",
	anchor: "Accident towing in Brampton",
} as const;
