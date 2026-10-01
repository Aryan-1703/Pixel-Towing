import type { ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Phone, Calendar, Clock } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";
import { BLOG_POSTS, findBlogPost, formatPostDate } from "../content/blogPosts";
import { BLOG_IMAGES } from "../content/blogImages";
import type { SiteImage } from "../assets/images";
import { AUTHOR } from "../content/author";
import { BUSINESS, BUSINESS_REF, DISPATCH_MESSAGE, absoluteUrl } from "../content/site";
import { SERVICE_SLUGS, SERVICE_LINKS, ACCIDENT_RECOVERY, servicePath } from "../content/services";

// Renders **bold** and [text](url) inside a line of body copy.
// External links open in a new tab so official sources open cleanly.
const renderInline = (text: string, keyPrefix: string): ReactNode[] => {
	const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
	return tokens.filter(Boolean).map((token, i) => {
		const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
		if (link && link[2].startsWith("/")) {
			return (
				<Link key={`${keyPrefix}-${i}`} to={link[2]}>
					{link[1]}
				</Link>
			);
		}
		if (link) {
			const isExternal = link[2].startsWith("http");
			return (
				<a
					key={`${keyPrefix}-${i}`}
					href={link[2]}
					{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				>
					{link[1]}
				</a>
			);
		}
		const bold = /^\*\*([^*]+)\*\*$/.exec(token);
		if (bold) return <strong key={`${keyPrefix}-${i}`}>{bold[1]}</strong>;
		return <span key={`${keyPrefix}-${i}`}>{token}</span>;
	});
};

// Minimal markdown-like renderer for the article bodies in blogPosts.ts.
const renderContent = (content: string) =>
	content
		.trim()
		.split("\n")
		.map((line, key) => {
			if (line.startsWith("## ")) return <h2 key={key} className="fw-bold mt-5 mb-3 h3">{line.slice(3)}</h2>;
			if (line.startsWith("### ")) return <h3 key={key} className="fw-bold mt-4 mb-2 h5">{line.slice(4)}</h3>;
			if (line.startsWith("---")) return <hr key={key} className="my-4" />;
			if (line.startsWith("- ")) {
				return (
					<li key={key} className="mb-2 ms-3">
						{renderInline(line.slice(2), `li${key}`)}
					</li>
				);
			}
			if (line.trim() === "") return <div key={key} className="mb-2" />;
			return (
				<p key={key} className="text-secondary lh-lg mb-3">
					{renderInline(line, `p${key}`)}
				</p>
			);
		});

type Post = (typeof BLOG_POSTS)[number];

const dateModifiedOf = (post: Post) => ("dateModified" in post ? post.dateModified : undefined);

const buildArticleSchema = (post: Post, pageUrl: string, image: SiteImage) => {
	const dateModified = dateModifiedOf(post);
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		"@id": `${pageUrl}#article`,
		headline: post.title,
		description: post.excerpt,
		image: [absoluteUrl(image.src)],
		author: { "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.jobTitle, url: AUTHOR.url },
		publisher: BUSINESS_REF,
		datePublished: post.datePublished,
		...(dateModified ? { dateModified } : {}),
		mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
	};
};

const ArticleHeader = ({ post, image }: { post: Post; image: SiteImage }) => {
	const dateModified = dateModifiedOf(post);
	const reviewedNote = "reviewedNote" in post ? post.reviewedNote : undefined;
	return (
		<>
			<Badge bg={post.categoryColor} className="rounded-pill mb-3">
				{post.category}
			</Badge>
			<h1 className="fw-bold display-6 mb-3">{post.title}</h1>
			<p className="lead text-muted mb-4">{post.excerpt}</p>
			<div className="d-flex flex-wrap gap-4 text-muted small mb-4 pb-4 border-bottom">
				<span className="d-flex align-items-center gap-1">
					<Calendar size={14} /> Published {formatPostDate(post.datePublished)}
					{dateModified && ` · Updated ${formatPostDate(dateModified)}`}
				</span>
				<span className="d-flex align-items-center gap-1">
					<Clock size={14} /> {post.readTime}
				</span>
				<span>
					By <Link to="/about" className="text-muted">{AUTHOR.name}</Link> — Pixel Towing, {AUTHOR.location}
				</span>
			</div>
			{reviewedNote && <p className="text-muted small fst-italic mb-4">{reviewedNote}</p>}
			<img
				src={image.src}
				alt={image.alt}
				width={image.width}
				height={image.height}
				className="img-fluid rounded-4 shadow-sm mb-4 w-100"
				style={{ height: "auto" }}
			/>
		</>
	);
};

const ArticleCta = () => (
	<Card className="border-0 rounded-4 text-white p-4 mb-5" style={{ background: "linear-gradient(135deg, #1e293b, #1e3a8a)" }}>
		<Row className="align-items-center">
			<Col md={8}>
				<h2 className="h3 fw-bold mb-1">Need a Tow in Brampton or the GTA?</h2>
				<p className="text-white-50 mb-0">{DISPATCH_MESSAGE.full}</p>
			</Col>
			<Col md={4} className="text-md-end mt-3 mt-md-0">
				<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill px-4">
					<Phone size={18} className="me-2" /> Call Now
				</Button>
			</Col>
		</Row>
	</Card>
);

const RelatedPosts = ({ currentSlug }: { currentSlug: string }) => (
	<>
		<h2 className="h3 fw-bold mb-4">More Guides</h2>
		<Row className="g-4">
			{BLOG_POSTS.filter(p => p.slug !== currentSlug)
				.slice(0, 2)
				.map(related => (
					<Col key={related.slug} sm={6}>
						<Card className="border-0 shadow-sm h-100 rounded-4">
							<Card.Body className="p-4">
								<Badge bg={related.categoryColor} className="rounded-pill mb-2 small">
									{related.category}
								</Badge>
								<h3 className="fw-bold h6">
									<Link to={`/blog/${related.slug}`} className="text-dark stretched-link">
										{related.title}
									</Link>
								</h3>
							</Card.Body>
						</Card>
					</Col>
				))}
		</Row>
	</>
);

const ServiceLinks = () => (
	<div className="mt-5 p-4 bg-white rounded-4 shadow-sm">
		<h2 className="h6 fw-bold text-muted text-uppercase mb-3">Our Services</h2>
		<div className="d-flex flex-wrap gap-2">
			<Link to={ACCIDENT_RECOVERY.path} className="btn btn-sm btn-outline-secondary rounded-pill">
				{ACCIDENT_RECOVERY.anchor}
			</Link>
			{SERVICE_SLUGS.map(serviceSlug => (
				<Link key={serviceSlug} to={servicePath(serviceSlug)} className="btn btn-sm btn-outline-secondary rounded-pill">
					{SERVICE_LINKS[serviceSlug].anchor}
				</Link>
			))}
		</div>
	</div>
);

const BlogPostPage = () => {
	const { slug } = useParams<{ slug: string }>();
	const post = findBlogPost(slug);
	if (!post) return <NotFound />;

	const pageUrl = absoluteUrl(`/blog/${post.slug}`);
	const image = BLOG_IMAGES[post.slug];

	return (
		<div style={{ paddingTop: "76px" }} className="bg-light">
			<SEO title={post.metaTitle} description={post.excerpt} canonical={pageUrl} type="article" image={image.src} imageAlt={image.alt} />
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(buildArticleSchema(post, pageUrl, image))}</script>
			</Helmet>
			<Breadcrumbs
				trail={[{ name: "Home", to: "/" }, { name: "Blog", to: "/blog" }, { name: post.title }]}
				currentUrl={pageUrl}
			/>
			<Container className="py-5">
				<Row className="justify-content-center">
					<Col lg={8}>
						<ArticleHeader post={post} image={image} />
						<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">{renderContent(post.content)}</Card>
						<ArticleCta />
						<RelatedPosts currentSlug={post.slug} />
						<ServiceLinks />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default BlogPostPage;
