import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Calendar, Clock, Phone } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { BLOG_POSTS, formatPostDate } from "../content/blogPosts";
import { BLOG_IMAGES } from "../content/blogImages";
import { BUSINESS, absoluteUrl } from "../content/site";

const PAGE_URL = absoluteUrl("/blog");

const BlogPage = () => {
	return (
		<div className="bg-light" style={{ paddingTop: "76px" }}>
			<SEO
				title="Towing Tips & Driver Resources | Pixel Towing Blog"
				description="Plain-language guides to Ontario towing rules, collision reporting, insurance claims and roadside problems, from Pixel Towing in Brampton."
				canonical={PAGE_URL}
			/>

			<Breadcrumbs trail={[{ name: "Home", to: "/" }, { name: "Blog" }]} currentUrl={PAGE_URL} />

			<div className="py-5 text-white text-center" style={{ background: "linear-gradient(135deg, #1e293b, #1e3a8a)" }}>
				<Container>
					<h1 className="display-5 fw-bold mb-3">Towing Tips & Driver Resources</h1>
					<p className="lead text-white-50 mb-0">
						Know your rights and your options — written by a Brampton tow operator.
					</p>
				</Container>
			</div>

			<Container className="py-5">
				<Row className="g-4">
					{BLOG_POSTS.map(post => {
						const image = BLOG_IMAGES[post.slug];
						return (
							<Col key={post.slug} md={6} lg={4}>
								<Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden">
									<Card.Img
										src={image.src}
										alt=""
										width={image.width}
										height={image.height}
										loading="lazy"
										style={{ height: 160, objectFit: "cover" }}
									/>
									<Card.Body className="p-4 d-flex flex-column">
										<div className="mb-3">
											<Badge bg={post.categoryColor} className="rounded-pill">
												{post.category}
											</Badge>
										</div>
										<h2 className="h5 fw-bold mb-3">
											<Link to={`/blog/${post.slug}`} className="text-dark text-decoration-none stretched-link">
												{post.title}
											</Link>
										</h2>
										<p className="text-muted small flex-grow-1">{post.excerpt}</p>
										<div className="d-flex gap-3 text-muted small mt-3 pt-3 border-top">
											<span className="d-flex align-items-center gap-1">
												<Calendar size={13} /> {formatPostDate(post.datePublished)}
											</span>
											<span className="d-flex align-items-center gap-1">
												<Clock size={13} /> {post.readTime}
											</span>
										</div>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>

				<div className="text-center mt-5 py-4 bg-warning rounded-4 p-4">
					<h2 className="h3 fw-bold">Need a Tow Right Now?</h2>
					<p className="text-dark mb-3">24/7 dispatch in Brampton, Mississauga and the GTA.</p>
					<Button href={BUSINESS.phoneHref} variant="dark" size="lg" className="rounded-pill fw-bold px-5">
						<Phone size={18} className="me-2" /> {BUSINESS.phoneDisplay}
					</Button>
				</div>
			</Container>
		</div>
	);
};

export default BlogPage;
