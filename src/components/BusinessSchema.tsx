import { Helmet } from "react-helmet-async";
import { BUSINESS, SITE_ORIGIN, absoluteUrl } from "../content/site";
import { AUTHOR } from "../content/author";
import { SERVICE_AREAS, areaServedSchema } from "../content/cities";
import { ACCIDENT_RECOVERY, SERVICE_LINKS, SERVICE_SLUGS, servicePath } from "../content/services";

/** Matches the Person node on the About page, so both describe one person. */
const AUTHOR_REF = { "@id": `${AUTHOR.url}#author` } as const;

/**
 * The one authoritative Pixel Towing business entity, rendered once in App.tsx.
 *
 * It describes the real business (Brampton-based service-area business), not
 * one entity per city. Page-level schema (Service, Article, BreadcrumbList)
 * points at it by `@id` instead of redefining the business.
 */
const businessSchema = {
	"@context": "https://schema.org",
	// schema.org has no towing-specific type; AutomotiveBusiness is the closest LocalBusiness subtype.
	"@type": "AutomotiveBusiness",
	"@id": BUSINESS.schemaId,
	name: BUSINESS.name,
	url: `${SITE_ORIGIN}/`,
	logo: absoluteUrl(BUSINESS.defaultImagePath),
	image: absoluteUrl(BUSINESS.defaultImagePath),
	description:
		"24/7 towing and roadside assistance based in Brampton, Ontario — accident towing, flatbed towing, lockouts, battery boosts, tire changes and scrap car removal.",
	telephone: BUSINESS.phoneE164,
	email: BUSINESS.email,
	priceRange: "$$",
	address: {
		"@type": "PostalAddress",
		addressLocality: BUSINESS.locality,
		addressRegion: BUSINESS.region,
		addressCountry: BUSINESS.country,
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: BUSINESS.geo.latitude,
		longitude: BUSINESS.geo.longitude,
	},
	areaServed: SERVICE_AREAS.map(area => areaServedSchema(area.slug)),
	openingHoursSpecification: {
		"@type": "OpeningHoursSpecification",
		dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		opens: "00:00",
		closes: "23:59",
	},
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "dispatch",
		telephone: BUSINESS.phoneE164,
		email: BUSINESS.email,
		areaServed: "CA-ON",
		availableLanguage: "English",
		hoursAvailable: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			opens: "00:00",
			closes: "23:59",
		},
	},
	founder: AUTHOR_REF,
	knowsAbout: [
		"Towing",
		"Accident towing",
		"Flatbed towing",
		"Roadside assistance",
		"Car lockout",
		"Battery boost",
		"Flat tire change",
		"Scrap car removal",
		"Ontario towing regulations",
		"Ontario Tow Zone Program",
	],
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Towing and roadside services",
		itemListElement: [
			{ anchor: ACCIDENT_RECOVERY.anchor, path: ACCIDENT_RECOVERY.path },
			...SERVICE_SLUGS.map(slug => ({ anchor: SERVICE_LINKS[slug].anchor, path: servicePath(slug) })),
		].map(service => ({
			"@type": "Offer",
			itemOffered: {
				"@type": "Service",
				name: service.anchor,
				url: absoluteUrl(service.path),
			},
		})),
	},
	paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
	hasMap: BUSINESS.googleProfileUrl,
	sameAs: [BUSINESS.instagramUrl, BUSINESS.googleProfileUrl],
};

/** Site-level node so AI and search engines tie every page to one publisher. */
const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${SITE_ORIGIN}/#website`,
	name: BUSINESS.name,
	url: `${SITE_ORIGIN}/`,
	inLanguage: "en-CA",
	publisher: { "@id": BUSINESS.schemaId },
};

const BusinessSchema = () => (
	<Helmet>
		<script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
		<script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
	</Helmet>
);

export default BusinessSchema;
