import { IMAGES, type SiteImage } from "../assets/images";
import type { BlogSlug } from "./blogPosts";

/**
 * Featured image per article — shown at the top of the post and used as the
 * Article schema `image` and social preview, so all three always match.
 */
export const BLOG_IMAGES: Record<BlogSlug, SiteImage> = {
	"what-to-do-after-car-accident-brampton": IMAGES.accidentTowing,
	"ontario-towing-laws-driver-rights": IMAGES.flatbedTowing,
	"dead-battery-vs-bad-alternator": IMAGES.batteryBoost,
	"how-to-avoid-predatory-towing-gta": IMAGES.accidentTowing,
	"car-insurance-towing-coverage-ontario": IMAGES.flatbedTowing,
	"total-loss-vehicle-ontario-guide": IMAGES.scrapCarRemoval,
	"oem-vs-aftermarket-parts-collision-repair": IMAGES.accidentTowing,
	"deductible-waived-collision-repair-brampton": IMAGES.accidentTowing,
	"collision-repair-rental-car-brampton": IMAGES.flatbedTowing,
};
