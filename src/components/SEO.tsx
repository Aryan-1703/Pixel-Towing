import { Helmet } from "react-helmet-async";

interface SEOProps {
	title: string;
	description: string;
	canonical?: string;
}

const SEO = ({ title, description, canonical }: SEOProps) => {
	return (
		<Helmet>
			{/* Dynamic Title */}
			<title>{title}</title>
			<meta name="description" content={description} />

			{/* Canonical Link (Prevents Duplicate Content Issues) */}
			<link rel="canonical" href={canonical || window.location.href} />

			{/* Open Graph / Facebook (Updates when shared) */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
		</Helmet>
	);
};

export default SEO;
