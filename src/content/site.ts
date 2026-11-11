/**
 * Single source of truth for Pixel Towing's business identity.
 *
 * This module must stay free of React, JSX and asset imports: vite.config.ts
 * imports it (through routes.ts) at build time to generate the sitemap.
 */

export const SITE_ORIGIN = "https://pixeltowing.com";

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string): string =>
	path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;

export const BUSINESS = {
	/** Stable JSON-LD node id — every schema that mentions the business points here. */
	schemaId: `${SITE_ORIGIN}/#localbusiness`,
	name: "Pixel Towing",
	phoneE164: "+16476739755",
	phoneDisplay: "647-673-9755",
	phoneHref: "tel:+16476739755",
	email: "info@pixeltowing.com",
	whatsappUrl: "https://wa.link/sq54ln",
	locality: "Brampton",
	region: "ON",
	country: "CA",
	geo: { latitude: 43.7315, longitude: -79.7624 },
	/** Public Google Business Profile (opens the listing and its reviews). */
	googleProfileUrl:
		"https://www.google.com/maps/place/?q=place_id:ChIJ609ewdK2uUQRy0NgCt5WLWk",
	googleWriteReviewUrl:
		"https://search.google.com/local/writereview?placeid=ChIJ609ewdK2uUQRy0NgCt5WLWk",
	instagramUrl: "https://www.instagram.com/pixel_towing",
	/** Square brand image: favicon and schema `logo`. */
	logoPath: "/tow.jpg",
	/** 1200×630 social preview used when a page has no image of its own. */
	defaultImagePath: "/og-default.jpg",
	defaultImageSize: { width: 1200, height: 630 },
} as const;

/**
 * Payment methods, in the one place every page, the schema and llms.txt read
 * from — so the site can never list two different sets. Only list methods the
 * business actually takes on every job.
 */
export const PAYMENT_METHODS: readonly string[] = ["Cash", "Credit card", "Debit card"];

/** "Cash, credit card or debit card" — for running text. */
export const paymentMethodsText = (conjunction: "and" | "or"): string => {
	const lower = PAYMENT_METHODS.map((method, i) => (i === 0 ? method : method.toLowerCase()));
	return lower.length === 1
		? lower[0]
		: `${lower.slice(0, -1).join(", ")} ${conjunction} ${lower[lower.length - 1]}`;
};

/** Reference to the business node for use inside page-level JSON-LD. */
export const BUSINESS_REF = { "@id": BUSINESS.schemaId } as const;

/**
 * Ontario TSSEA disclosure details.
 *
 * Tow operators must publish their legal name, operating name, email, phone
 * and a copy of their certificate on their website. Fill these in from Pixel
 * Towing's actual MTO documents — never guess. Anything left null is simply
 * not rendered.
 */
export const COMPLIANCE: {
	legalName: string | null;
	operatingName: string;
	towOperatorCertificateNumber: string | null;
	/** Site-relative path to a PDF/image copy of the certificate, e.g. "/compliance/certificate.pdf". */
	certificateCopyPath: string | null;
	/** Site-relative path to the published maximum rate schedule. */
	maximumRateSchedulePath: string | null;
} = {
	legalName: null,
	operatingName: BUSINESS.name,
	towOperatorCertificateNumber: null,
	certificateCopyPath: null,
	maximumRateSchedulePath: null,
};

/**
 * Default response-time wording. Exact ETA ranges are only shown where a
 * city entry carries one backed by real dispatch data (see cities.ts).
 */
export const DISPATCH_MESSAGE = {
	short: "Fast 24/7 dispatch",
	full: "Fast 24/7 dispatch. Response time varies by location, traffic, weather and current demand.",
} as const;

/**
 * RoadLift — the roadside assistance app from the team behind Pixel Towing.
 *
 * Every claim here must match roadlift.ca and the live app: iPhone only for
 * now, Mississauga and Brampton only, towing / boosts / flat tires / lockouts /
 * fuel delivery. The promo code must exist and be active in the RoadLift admin
 * panel; set `promo` to null to hide the offer everywhere.
 */
interface RoadLiftConfig {
	readonly name: string;
	readonly siteUrl: string;
	readonly appStoreUrl: string;
	/** Appended to roadlift.ca links so RoadLift's analytics credit this site. */
	readonly utm: string;
	readonly androidAvailable: boolean;
	readonly promo: { readonly code: string; readonly offer: string } | null;
	readonly features: readonly string[];
	/** Pixel Towing city slugs RoadLift currently serves ("brampton" is the homepage). */
	readonly citySlugs: readonly string[];
}

export const ROADLIFT: RoadLiftConfig = {
	name: "RoadLift",
	siteUrl: "https://roadlift.ca",
	appStoreUrl: "https://apps.apple.com/ca/app/roadlift/id6761619708",
	utm: "utm_source=pixeltowing&utm_medium=referral&utm_campaign=cross_promo",
	androidAvailable: false,
	promo: { code: "PIXEL15", offer: "$15 off" },
	// Don't say "fixed price": the search-radius travel fee can raise the price after confirming.
	// Don't frame RoadLift against phoning: the phone is Pixel Towing's primary action.
	features: [
		"Upfront price before you confirm",
		"Live dispatch: see when a driver accepts and track them on the map",
		"Chat with your driver and pay in the app",
	],
	citySlugs: ["brampton", "mississauga"],
};

/** roadlift.ca URL for a path, tagged with this site's UTM parameters. */
export const roadLiftUrl = (path = "/"): string => `${ROADLIFT.siteUrl}${path}?${ROADLIFT.utm}`;
