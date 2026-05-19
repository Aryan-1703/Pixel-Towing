import { Helmet } from "react-helmet-async";

interface SEOProps {
	title: string;
	description: string;
	canonical: string;
	noindex?: boolean;
}

const SEO = ({ title, description, canonical, noindex = false }: SEOProps) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />

			{noindex ? (
				<meta name="robots" content="noindex, follow" />
			) : (
				<meta name="robots" content="index, follow, max-image-preview:large" />
			)}

			<link rel="canonical" href={canonical} />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={canonical} />
		</Helmet>
	);
};

export default SEO;
