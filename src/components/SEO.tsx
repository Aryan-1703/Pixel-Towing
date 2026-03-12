import { Helmet } from "react-helmet-async";

interface SEOProps {
	title: string;
	description: string;
	canonical?: string;
	noindex?: boolean;
}

const SEO = ({ title, description, canonical, noindex = false }: SEOProps) => {
	return (
		<Helmet>
			{/* Dynamic Title */}
			<title>{title}</title>
			<meta name="description" content={description} />

			{/* Robots — noindex for utility pages that shouldn't be ranked */}
			{noindex ? (
				<meta name="robots" content="noindex, follow" />
			) : (
				<meta name="robots" content="index, follow, max-image-preview:large" />
			)}

			{/* Canonical Link (Prevents Duplicate Content Issues) */}
			<link rel="canonical" href={canonical || window.location.href} />

			{/* Open Graph / Facebook (Updates when shared) */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
		</Helmet>
	);
};

export default SEO;
