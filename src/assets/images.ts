/**
 * Photo registry: one place for each image's file, intrinsic size (for
 * width/height attributes, which prevent layout shift) and default alt text.
 */
import accidentTowing from "./accident-towing-brampton.webp";
import flatbedTowing from "./flatbed-towing-brampton.webp";
import flatTireChange from "./flat-tire-change-brampton.webp";
import batteryBoost from "./battery-boost-brampton.webp";
import carLockout from "./car-lockout-service-brampton.webp";
import scrapCarRemoval from "./scrap-car-removal-brampton.webp";

export interface SiteImage {
	src: string;
	width: number;
	height: number;
	alt: string;
}

export const IMAGES = {
	accidentTowing: {
		src: accidentTowing,
		width: 1200,
		height: 630,
		alt: "Tow truck recovering a damaged car after a collision",
	},
	flatbedTowing: {
		src: flatbedTowing,
		width: 1000,
		height: 563,
		alt: "Car secured on a flatbed tow truck",
	},
	flatTireChange: {
		src: flatTireChange,
		width: 614,
		height: 320,
		alt: "Roadside technician changing a flat tire",
	},
	batteryBoost: {
		src: batteryBoost,
		width: 710,
		height: 562,
		alt: "Technician boosting a car battery",
	},
	carLockout: {
		src: carLockout,
		width: 612,
		height: 408,
		alt: "Technician opening a locked car door",
	},
	scrapCarRemoval: {
		src: scrapCarRemoval,
		width: 960,
		height: 540,
		alt: "Old car being removed for scrap",
	},
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;
