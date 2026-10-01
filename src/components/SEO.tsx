import { Helmet } from "react-helmet-async";
import { BUSINESS, SITE_ORIGIN } from "../content/site";

interface BaseProps {
	title: string;
	description: string;
	/** Site-relative or absolute image URL for social previews. Defaults to the brand image. */
	image?: string;
	imageAlt?: string;
	type?: "website" | "article";
}

/** Indexable pages must declare a canonical; noindex pages (e.g. 404) may omit it. */
type SEOProps = BaseProps &
	({ noindex?: false; canonical: string } | { noindex: true; canonical?: string });

const toAbsolute = (url: string) => (url.startsWith("http") ? url : `${SITE_ORIGIN}${url}`);

/**
 * All per-page head metadata. index.html deliberately carries none of this,
 * so every page — prerendered or client-rendered — has exactly one title,
 * description, canonical and set of Open Graph / Twitter tags.
 */
const SEO = ({
	title,
	description,
	canonical,
	noindex = false,
	image = BUSINESS.defaultImagePath,
	imageAlt = "Pixel Towing tow truck in Brampton, Ontario",
	type = "website",
}: SEOProps) => {
	const imageUrl = toAbsolute(image);

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta
				name="robots"
				content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}
			/>
			{canonical && <link rel="canonical" href={canonical} />}

			<meta property="og:site_name" content={BUSINESS.name} />
			<meta property="og:locale" content="en_CA" />
			<meta property="og:type" content={type} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{canonical && <meta property="og:url" content={canonical} />}
			<meta property="og:image" content={imageUrl} />
			<meta property="og:image:alt" content={imageAlt} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={imageUrl} />
			<meta name="twitter:image:alt" content={imageAlt} />
		</Helmet>
	);
};

export default SEO;
