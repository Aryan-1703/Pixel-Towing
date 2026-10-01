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
	defaultImagePath: "/tow.jpg",
} as const;

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
