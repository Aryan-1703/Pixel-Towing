import { Container, Card, Button, Stack, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Star, MessageSquareWarning, ThumbsUp, ExternalLink } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS, absoluteUrl } from "../content/site";

/**
 * Review request page (noindex, not in the sitemap). It deliberately shows no
 * review text: reviews live on the Google Business Profile, and this site
 * never reproduces, paraphrases or invents them.
 */
const ReviewPage = () => {
	return (
		<div className="bg-light" style={{ minHeight: "80vh", paddingTop: "80px" }}>
			<SEO
				title="Leave a Review | Pixel Towing"
				description="Used Pixel Towing? Leave a review on our Google Business Profile, or contact us directly if something went wrong."
				canonical={absoluteUrl("/review")}
				noindex
			/>

			<div className="py-5 text-center text-white" style={{ background: "linear-gradient(135deg, #1e293b, #1e3a8a)" }}>
				<Container>
					<h1 className="display-5 fw-bold mb-2">How Did We Do?</h1>
					<p className="lead text-white-50 mb-0">Your feedback helps other drivers — and helps us improve.</p>
				</Container>
			</div>

			<Container className="py-5">
				<Row className="justify-content-center">
					<Col lg={6}>
						<Card className="border-0 shadow-lg p-4 text-center rounded-4">
							<Card.Body>
								<div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex p-3 mb-3">
									<Star size={40} className="text-warning" fill="currentColor" />
								</div>
								<h2 className="h3 fw-bold mb-3">Leave a review on Google</h2>
								<p className="text-muted mb-4">
									We're a local Brampton business. An honest review helps other drivers decide
									who to call in an emergency. It takes less than a minute.
								</p>
								<Stack gap={3}>
									<Button
										href={BUSINESS.googleWriteReviewUrl}
										target="_blank"
										rel="noopener noreferrer"
										variant="warning"
										size="lg"
										className="fw-bold py-3 shadow-sm rounded-pill"
									>
										<ThumbsUp className="me-2 mb-1" size={20} />
										Write a Google review
									</Button>
									<Button
										href={BUSINESS.googleProfileUrl}
										target="_blank"
										rel="noopener noreferrer"
										variant="outline-dark"
										size="lg"
										className="fw-medium py-3 rounded-pill"
									>
										<ExternalLink className="me-2 mb-1" size={18} />
										Read our reviews on Google
									</Button>
									<Link to="/contact" className="btn btn-outline-secondary btn-lg fw-medium py-3 rounded-pill">
										<MessageSquareWarning className="me-2 mb-1" size={20} />
										Something went wrong — contact us
									</Link>
								</Stack>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ReviewPage;
