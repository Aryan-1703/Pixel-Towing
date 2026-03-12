import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Phone, Calendar, Clock, ChevronLeft, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { BLOG_POSTS } from "./BlogPage";

// Simple markdown-like renderer
const renderContent = (content: string) => {
	const lines = content.trim().split("\n");
	const elements: React.ReactNode[] = [];
	let key = 0;

	for (const line of lines) {
		if (line.startsWith("## ")) {
			elements.push(<h2 key={key++} className="fw-bold mt-5 mb-3 h3">{line.slice(3)}</h2>);
		} else if (line.startsWith("### ")) {
			elements.push(<h3 key={key++} className="fw-bold mt-4 mb-2 h5">{line.slice(4)}</h3>);
		} else if (line.startsWith("---")) {
			elements.push(<hr key={key++} className="my-4" />);
		} else if (line.startsWith("- ")) {
			elements.push(
				<li key={key++} className="mb-2 ms-3">
					{line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}
				</li>
			);
		} else if (line.trim() === "") {
			elements.push(<div key={key++} className="mb-2" />);
		} else {
			// Process bold
			const parts = line.split(/\*\*(.*?)\*\*/g);
			elements.push(
				<p key={key++} className="text-secondary lh-lg mb-3">
					{parts.map((part, i) =>
						i % 2 === 1 ? <strong key={i}>{part}</strong> : part
					)}
				</p>
			);
		}
	}
	return elements;
};

const BlogPostPage = () => {
	const { slug } = useParams<{ slug: string }>();
	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) return <Navigate to="/blog" replace />;

	const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

	const articleSchema = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.excerpt,
		author: {
			"@type": "Organization",
			name: "Pixel Towing",
			url: "https://pixeltowing.com",
		},
		publisher: {
			"@type": "Organization",
			name: "Pixel Towing",
			logo: {
				"@type": "ImageObject",
				url: "https://pixeltowing.com/tow.png",
			},
		},
		datePublished: post.date,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://pixeltowing.com/blog/${post.slug}`,
		},
	};

	return (
		<div style={{ paddingTop: "76px" }} className="bg-light">
			<SEO
				title={post.metaTitle || `${post.title} | Pixel Towing Brampton`}
				description={post.excerpt}
				canonical={`https://pixeltowing.com/blog/${post.slug}`}
			/>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
			</Helmet>

			<Container className="py-5">
				<Row className="justify-content-center">
					<Col lg={8}>
						{/* Breadcrumb */}
						<div className="mb-4">
							<Link to="/blog" className="text-muted text-decoration-none small">
								<ChevronLeft size={14} className="me-1" />
								Back to Blog
							</Link>
						</div>

						{/* Article header */}
						<Badge bg={post.categoryColor} className="rounded-pill mb-3">
							{post.category}
						</Badge>
						<h1 className="fw-bold display-6 mb-3">{post.title}</h1>
						<p className="lead text-muted mb-4">{post.excerpt}</p>

						<div className="d-flex gap-4 text-muted small mb-4 pb-4 border-bottom">
							<span className="d-flex align-items-center gap-1">
								<Calendar size={14} /> {post.date}
							</span>
							<span className="d-flex align-items-center gap-1">
								<Clock size={14} /> {post.readTime}
							</span>
							<span>By Pixel Towing — Brampton, ON</span>
						</div>

						{/* Article body */}
						<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">
							{renderContent(post.content)}
						</Card>

						{/* CTA */}
						<Card className="border-0 rounded-4 text-white p-4 mb-5"
							style={{ background: "linear-gradient(135deg, #1e293b, #1e3a8a)" }}>
							<Row className="align-items-center">
								<Col md={8}>
									<h3 className="fw-bold mb-1">Need a Tow in Brampton or the GTA?</h3>
									<p className="text-white-50 mb-0">
										24/7 dispatch. 15–20 min ETA. Licensed & insured.
									</p>
								</Col>
								<Col md={4} className="text-md-end mt-3 mt-md-0">
									<Button href="tel:+16476739755" variant="warning" size="lg" className="fw-bold rounded-pill px-4">
										<Phone size={18} className="me-2" /> Call Now
									</Button>
								</Col>
							</Row>
						</Card>

						{/* Related posts */}
						{relatedPosts.length > 0 && (
							<div>
								<h3 className="fw-bold mb-4">More Helpful Guides</h3>
								<Row className="g-4">
									{relatedPosts.map((related) => (
										<Col key={related.slug} sm={6}>
											<Card className="border-0 shadow-sm h-100 rounded-4">
												<Card.Body className="p-4">
													<Badge bg={related.categoryColor} className="rounded-pill mb-2 small">
														{related.category}
													</Badge>
													<h5 className="fw-bold h6">{related.title}</h5>
													<Link
														to={`/blog/${related.slug}`}
														className="btn btn-sm btn-outline-dark rounded-pill mt-2"
													>
														Read <ArrowRight size={13} />
													</Link>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</div>
						)}

						{/* Internal service links */}
						<div className="mt-5 p-4 bg-white rounded-4 shadow-sm">
							<h4 className="h6 fw-bold text-muted text-uppercase mb-3">Our Services</h4>
							<div className="d-flex flex-wrap gap-2">
								<Link to="/services/accident-recovery" className="btn btn-sm btn-outline-secondary rounded-pill">Accident Recovery</Link>
								<Link to="/services/lockout" className="btn btn-sm btn-outline-secondary rounded-pill">Car Lockout</Link>
								<Link to="/services/jump-start" className="btn btn-sm btn-outline-secondary rounded-pill">Battery Boost</Link>
								<Link to="/services/tire-change" className="btn btn-sm btn-outline-secondary rounded-pill">Tire Change</Link>
								<Link to="/services/vehicle-transport" className="btn btn-sm btn-outline-secondary rounded-pill">Flatbed Towing</Link>
								<Link to="/services/scrap-car-removal" className="btn btn-sm btn-outline-secondary rounded-pill">Scrap Car Removal</Link>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default BlogPostPage;
