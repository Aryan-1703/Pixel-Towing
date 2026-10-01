import { Helmet } from "react-helmet-async";
import { BUSINESS, SITE_ORIGIN, absoluteUrl } from "../content/site";
import { SERVICE_AREAS } from "../content/cities";

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
	areaServed: SERVICE_AREAS.map(area => ({ "@type": "City", name: area.name })),
	openingHoursSpecification: {
		"@type": "OpeningHoursSpecification",
		dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		opens: "00:00",
		closes: "23:59",
	},
	paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
	hasMap: BUSINESS.googleProfileUrl,
	sameAs: [BUSINESS.instagramUrl, BUSINESS.googleProfileUrl],
};

const BusinessSchema = () => (
	<Helmet>
		<script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
	</Helmet>
);

export default BusinessSchema;

