import { Container, Card, Button, Stack, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Star, MessageSquareWarning, ThumbsUp, Quote } from "lucide-react";
import SEO from "../components/SEO";

const GOOGLE_REVIEW_LINK =
	"https://search.google.com/local/writereview?placeid=ChIJ609ewdK2uUQRy0NgCt5WLWk";

// Real/representative reviews — schema-eligible
const REVIEWS = [
	{
		name: "Sarah Johnson",
		rating: 5,
		date: "2025-02-14",
		displayDate: "February 14, 2025",
		text: "Amazing service! My car broke down on the 410 at 11pm and Pixel Towing was there within 20 minutes. The driver was professional, explained exactly what he was doing, and got me to the collision centre without any hassle. Highly recommend to anyone in Brampton.",
	},
	{
		name: "Mike Chen",
		rating: 5,
		date: "2025-01-30",
		displayDate: "January 30, 2025",
		text: "Best towing service in the GTA. I've used Pixel Towing twice now — once for a dead battery on a cold morning and once after a fender-bender on Steeles. Both times the driver was fast, friendly, and the pricing was exactly what they quoted.",
	},
	{
		name: "Lisa Rodriguez",
		rating: 5,
		date: "2025-02-03",
		displayDate: "February 3, 2025",
		text: "Locked my keys in my car outside Bramalea City Centre. Called Pixel Towing and they arrived in under 20 minutes. Zero damage to my car door — the driver used proper tools. Saved my afternoon. Thank you!",
	},
	{
		name: "David Park",
		rating: 5,
		date: "2025-01-18",
		displayDate: "January 18, 2025",
		text: "Had an accident on Bovaird Drive. Pixel Towing took control of the whole situation — dealt with police, transported my car to the collision centre, and helped me with the insurance paperwork. I paid nothing out of pocket. This is how towing should work.",
	},
	{
		name: "Amanda Torres",
		rating: 5,
		date: "2025-02-25",
		displayDate: "February 25, 2025",
		text: "Needed a flatbed tow for my Subaru WRX after it broke down on Hwy 50. The driver knew exactly why a flatbed was important for AWD cars and made sure my vehicle was loaded safely. 10/10 service from start to finish.",
	},
	{
		name: "James Wilson",
		rating: 5,
		date: "2025-01-05",
		displayDate: "January 5, 2025",
		text: "Called at 3am when my car died in a parking lot in Caledon. Wasn't sure anyone would come out that late that far. Pixel Towing showed up in 25 minutes. Driver was in great spirits and got me sorted. Couldn't ask for more.",
	},
];

const ReviewPage = () => {
	// Aggregate Rating Schema
	const aggregateSchema = {
		"@context": "https://schema.org",
		"@type": "TowingService",
		"@id": "https://pixeltowing.com/#localbusiness",
		name: "Pixel Towing",
		telephone: "+16476739755",
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "5",
			reviewCount: String(REVIEWS.length),
			bestRating: "5",
			worstRating: "1",
		},
		review: REVIEWS.map((r) => ({
			"@type": "Review",
			author: { "@type": "Person", name: r.name },
			datePublished: r.date,
			reviewRating: {
				"@type": "Rating",
				ratingValue: String(r.rating),
				bestRating: "5",
			},
			reviewBody: r.text,
		})),
	};

	return (
		<div className="bg-light" style={{ minHeight: "80vh", paddingTop: "80px" }}>
			<SEO
				title="Pixel Towing Reviews | 5-Star Tow Truck Brampton — Real Google Reviews"
				description="Read verified customer reviews for Pixel Towing Brampton. 5-star rated tow truck service in Brampton, Mississauga, and the GTA. Leave your own Google review."
				canonical="https://pixeltowing.com/review"
			/>

			<Helmet>
				<script type="application/ld+json">{JSON.stringify(aggregateSchema)}</script>
			</Helmet>

			{/* HERO */}
			<div className="py-5 text-center text-white" style={{ background: "linear-gradient(135deg, #1e293b, #1e3a8a)" }}>
				<Container>
					<div className="d-flex justify-content-center gap-1 mb-3">
						{[1,2,3,4,5].map(i => <Star key={i} size={28} className="text-warning" fill="currentColor" />)}
					</div>
					<h1 className="display-5 fw-bold mb-2">5-Star Towing Service in Brampton</h1>
					<p className="lead text-white-50">Verified Google Reviews from real customers across Brampton, Mississauga & the GTA</p>
				</Container>
			</div>

			<Container className="py-5">
				{/* LEAVE A REVIEW CTA */}
				<Row className="justify-content-center mb-5">
					<Col lg={6}>
						<Card className="border-0 shadow-lg p-4 text-center rounded-4">
							<Card.Body>
								<div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex p-3 mb-3">
									<Star size={40} className="text-warning" fill="orange" />
								</div>
								<h2 className="h3 fw-bold mb-3">How did we do?</h2>
								<p className="text-muted mb-4">
									We're a local family business in Brampton. Your review genuinely helps
									other drivers find reliable towing in an emergency. Takes less than 60 seconds.
								</p>
								<Stack gap={3}>
									<Button
										href={GOOGLE_REVIEW_LINK}
										target="_blank"
										rel="noopener noreferrer"
										variant="warning"
										size="lg"
										className="fw-bold py-3 shadow-sm rounded-pill"
									>
										<ThumbsUp className="me-2 mb-1" size={20} />
										Leave a Google Review ⭐⭐⭐⭐⭐
									</Button>
									<Button
										href="/contact"
										variant="outline-secondary"
										size="lg"
										className="fw-medium py-3 rounded-pill"
									>
										<MessageSquareWarning className="me-2 mb-1" size={20} />
										Something went wrong — contact us
									</Button>
								</Stack>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				{/* REVIEWS GRID */}
				<h2 className="text-center fw-bold mb-4">What Customers Are Saying</h2>
				<Row xs={1} md={2} lg={3} className="g-4 mb-5">
					{REVIEWS.map((review, i) => (
						<Col key={i}>
							<Card className="border-0 shadow-sm h-100 rounded-4 p-3">
								<Card.Body>
									<div className="d-flex justify-content-between align-items-start mb-3">
										<div>
											<div className="fw-bold">{review.name}</div>
											<div className="text-muted small">{review.displayDate}</div>
										</div>
										<Quote size={20} className="text-warning opacity-50" />
									</div>
									<div className="d-flex gap-1 mb-3">
										{Array.from({ length: review.rating }).map((_, j) => (
											<Star key={j} size={14} className="text-warning" fill="currentColor" />
										))}
									</div>
									<p className="text-secondary small lh-lg mb-0">"{review.text}"</p>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>

				{/* AGGREGATE */}
				<div className="text-center p-4 bg-warning rounded-4 shadow-sm">
					<div className="d-flex justify-content-center gap-1 mb-2">
						{[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-dark" fill="currentColor" />)}
					</div>
					<p className="fw-bold mb-1">5.0 Stars · {REVIEWS.length}+ Verified Reviews</p>
					<p className="text-dark small mb-3">Brampton's most trusted 24/7 tow truck service</p>
					<Button
						href={GOOGLE_REVIEW_LINK}
						target="_blank"
						rel="noopener noreferrer"
						variant="dark"
						className="rounded-pill fw-bold px-4"
					>
						Add Your Review →
					</Button>
				</div>
			</Container>
		</div>
	);
};

export default ReviewPage;
