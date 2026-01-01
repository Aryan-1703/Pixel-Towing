import { Container, Card, Button, Stack } from "react-bootstrap";
import { Star, MessageSquareWarning, ThumbsUp } from "lucide-react";
import SEO from "../components/SEO";

const GOOGLE_REVIEW_LINK =
	"https://search.google.com/local/writereview?placeid=ChIJ609ewdK2uUQRy0NgCt5WLWk";

const ReviewPage = () => {
	return (
		<div className="bg-light" style={{ minHeight: "80vh", paddingTop: "100px" }}>
			<SEO
				title="Rate Pixel Towing | Brampton Tow Truck Reviews"
				description="Leave a quick Google review for Pixel Towing. Your feedback helps other drivers find reliable towing services in Brampton & the GTA."
				canonical="https://pixeltowing.com/review"
			/>

			<Container className="d-flex justify-content-center">
				<Card
					className="border-0 shadow-lg p-4 text-center rounded-4"
					style={{ maxWidth: "500px", width: "100%" }}
				>
					<Card.Body>
						{/* ICON */}
						<div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex p-3 mb-3">
							<Star size={40} className="text-warning" fill="orange" />
						</div>

						<h1 className="h3 fw-bold mb-3">How did we do?</h1>

						<p className="text-muted mb-4">
							We’re a local towing company, and your support means everything to us. If
							you have 10 seconds, we’d truly appreciate your feedback.
						</p>

						{/* MAIN ACTIONS */}
						<Stack gap={3}>
							{/* HAPPY → GOOGLE */}
							<Button
								href={GOOGLE_REVIEW_LINK}
								target="_blank"
								rel="noopener noreferrer"
								variant="warning"
								size="lg"
								className="fw-bold py-3 shadow-sm rounded-pill"
								aria-label="Leave a Google Review for Pixel Towing"
							>
								<ThumbsUp className="me-2 mb-1" size={20} />
								It was great! Leave a Google Review
							</Button>

							{/* NOT HAPPY → CONTACT */}
							<Button
								href="/contact"
								variant="outline-secondary"
								size="lg"
								className="fw-medium py-3 rounded-pill"
								aria-label="Contact Pixel Towing Support"
							>
								<MessageSquareWarning className="me-2 mb-1" size={20} />
								It could be better — contact us
							</Button>
						</Stack>

						{/* SECOND CTA (BOOST CONVERSION) */}
						<div className="mt-4">
							<Button
								href={GOOGLE_REVIEW_LINK}
								target="_blank"
								rel="noopener noreferrer"
								variant="outline-warning"
								size="sm"
								className="rounded-pill"
							>
								Leave a Google Review ⭐⭐⭐⭐⭐
							</Button>
						</div>

						<p className="text-muted small mt-4">
							Thank you for choosing Pixel Towing 🚛
							<br />
							Serving Brampton & the GTA 24/7
						</p>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
};

export default ReviewPage;
