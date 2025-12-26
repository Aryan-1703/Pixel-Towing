import { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	Stack,
	Carousel,
	Accordion,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	Phone,
	Clock,
	Shield,
	Truck,
	Star,
	CheckCircle,
	ArrowRight,
	Wrench,
	Award,
	ShieldAlert,
} from "lucide-react";
import SEO from "../components/SEO";
import "../css/Home.css";

// Images
import accident from "../assets/tow-truck-accident-recovery-brampton.jpg";
import towing from "../assets/flatbed-towing-brampton.jpg";
import flatTire from "../assets/flatTire.png";

// DATA: Performance Optimized (Moved Outside)
const HOME_SERVICES = [
	{
		title: "Accident Recovery",
		description:
			"Fast accident towing, insurance reporting assistance, and collision center delivery in Brampton.",
		icon: ShieldAlert,
		link: "/services/accident-recovery",
		image: accident,
		alt: "Tow truck lifting crashed car accident in Brampton",
	},
	{
		title: "Roadside Assistance",
		description:
			"Flat tire change, car battery boost, and lockout services. 15-20 minute ETA.",
		icon: Wrench,
		link: "/services",
		image: flatTire,
		alt: "Technician fixing flat tire on roadside",
	},
	{
		title: "Specialized Transport",
		description:
			"Flatbed towing for AWD, luxury cars, motorcycles, and low-clearance vehicles.",
		icon: Truck,
		link: "/services/vehicle-transport",
		image: towing,
		alt: "Flatbed tow truck hauling luxury vehicle",
	},
];

const GOOGLE_REVIEWS = [
	{
		name: "Sarah Johnson",
		text: "Amazing service! Arrived fast in Brampton and handled everything professionally. Highly recommended.",
		rating: 5,
		date: "2 weeks ago",
		verified: true,
	},
	{
		name: "Mike Chen",
		text: "Pixel Towing was quick and reliable on the 401. Best towing service!",
		rating: 5,
		date: "1 month ago",
		verified: true,
	},
	{
		name: "Lisa Rodriguez",
		text: "They arrived within 15 minutes for a battery boost — super friendly.",
		rating: 5,
		date: "3 weeks ago",
		verified: true,
	},
];

// 🔥 COMPETITOR KILLER: The Massive Keyword List (Abrams Strategy)
const FULL_SERVICE_LIST = [
	"Local Towing Brampton",
	"Long Distance Towing",
	"24 Hour Flatbed",
	"Motorcycle Towing",
	"Underground Garage Extraction",
	"Winch-Out Service",
	"Ditch Pull-Out",
	"Off Road Recovery",
	"Junk Car Removal",
	"Flat Tire Repair",
	"Car Battery Jump Start",
	"Emergency Fuel Delivery",
	"Vehicle Lockout Service",
	"Accident Management",
	"Luxury Car Transport",
	"Scrap Car Recycling",
];

const Home = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [pixelLetters, setPixelLetters] = useState(["", "", "", "", ""]);
	const [showTowing, setShowTowing] = useState(false);
	const [currentReview, setCurrentReview] = useState(0);

	useEffect(() => {
		setIsVisible(true);
		const letters = ["P", "I", "X", "E", "L"];
		const timers: ReturnType<typeof setTimeout>[] = [];

		letters.forEach((letter, index) => {
			const timer = setTimeout(() => {
				setPixelLetters(prev => {
					const newLetters = [...prev];
					newLetters[index] = letter;
					return newLetters;
				});
			}, 300 * (index + 1));
			timers.push(timer);
		});

		const towTimer = setTimeout(() => setShowTowing(true), 2000);

		return () => {
			timers.forEach(clearTimeout);
			clearTimeout(towTimer);
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentReview(prev => (prev + 1) % GOOGLE_REVIEWS.length);
		}, 6000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-light">
			<SEO
				title="Pixel Towing Brampton | 24/7 Tow Truck & Roadside | 15 Min ETA"
				description="#1 Tow Truck Service in Brampton. Fast 15-min ETA. Accident Recovery, Lockouts, Battery Boost & Flatbed Towing. Licensed Municipal Tower. Call 647-673-9755."
				canonical="https://pixeltowing.com/"
			/>

			<style type="text/css">
				{`
                .hero-section {
                    background: linear-gradient(to bottom right, #1e293b, #1e3a8a, #111827);
                }
                .hero-overlay {
                    background-color: rgba(0, 0, 0, 0.45);
                    position: absolute;
                    inset: 0;
                }
                .pixel-letter {
                    background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 35px rgba(255, 215, 0, 0.4);
                }
                .contact-section-bg {
                    background: #111;
                    background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/assets/towing.jpg'); 
                    background-size: cover;
                    background-attachment: fixed;
                }
            `}
			</style>

			{/* HERO SECTION */}
			<section className="hero-section text-center">
				<div className="hero-overlay" />
				<Container
					className={`position-relative ${isVisible ? "opacity-100" : "opacity-0"}`}
				>
					<div className="mb-4">
						<Stack direction="horizontal" gap={3} className="justify-content-center mb-3">
							{pixelLetters.map((letter, index) => (
								<div key={index} className="display-1 fw-bold pixel-letter">
									{letter}
								</div>
							))}
						</Stack>
						<div
							className={`h2 fw-light text-warning ${
								showTowing ? "opacity-100" : "opacity-0"
							}`}
							style={{ letterSpacing: "5px", transition: "opacity 1s ease" }}
						>
							TOWING SERVICE
						</div>
					</div>

					<h1 className="display-4 mb-4 fw-bold text-white">
						Top Rated Tow Truck in Brampton & GTA
					</h1>

					<p
						className="lead mb-5 text-white-50 mx-auto"
						style={{ maxWidth: "42rem", fontSize: "1.25rem" }}
					>
						<strong>15-Minute Arrival.</strong> Trusted by Peel Region Drivers for
						Accident Recovery & Roadside Assistance.
					</p>

					<Stack
						gap={3}
						className="justify-content-center align-items-center flex-md-row"
					>
						<Button
							href="tel:+16476739755"
							variant="warning"
							size="lg"
							className="fw-bold rounded-pill px-5 py-3 shadow-lg w-100 w-md-auto"
						>
							<Phone className="me-2" />
							647-673-9755
						</Button>

						<Link
							to="/services"
							className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 w-100 w-md-auto"
						>
							Our Services
						</Link>
					</Stack>
				</Container>
			</section>

			{/* WHY CHOOSE US */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold">Why Brampton Chooses Pixel?</h2>
						<p className="lead text-muted">
							Licensed, Insured, and Trusted by your neighbors.
						</p>
					</div>

					<Row className="g-4 text-center">
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm bg-light">
								<Award size={56} className="text-warning mx-auto mb-3" />
								<h3 className="h4 fw-bold">Certified & Licensed</h3>
								<p className="text-muted mb-0">
									Fully licensed municipal tow operators working alongside{" "}
									<strong>Peel Regional Police</strong> guidelines.
								</p>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm bg-light">
								<Clock size={56} className="text-primary mx-auto mb-3" />
								<h3 className="h4 fw-bold">15-Min Response</h3>
								<p className="text-muted mb-0">
									Faster than the competition. Our strategic location near Hwy 410 ensures
									rapid response.
								</p>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm bg-light">
								<Shield size={56} className="text-success mx-auto mb-3" />
								<h3 className="h4 fw-bold">Price Guarantee</h3>
								<p className="text-muted mb-0">
									Transparent pricing. No hidden hook-up fees or surprise charges. What we
									quote is what you pay.
								</p>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* 🔥 NEW SECTION: THE "FULL LIST" (Competitor Killer) */}
			<section className="py-5 bg-dark text-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold text-warning">We Tow It All - Big or Small</h2>
						<p className="text-white-50">Complete breakdown and recovery services.</p>
					</div>
					<Row xs={1} md={2} lg={4} className="g-3">
						{FULL_SERVICE_LIST.map((item, idx) => (
							<Col key={idx}>
								<div className="d-flex align-items-center bg-secondary bg-opacity-25 p-3 rounded">
									<CheckCircle size={18} className="text-warning me-2 flex-shrink-0" />
									<span className="small fw-bold">{item}</span>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* SERVICES GRID */}
			<section className="py-5 bg-white services-section">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-4 fw-bold">Core Services</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "45rem" }}>
							Professional 24/7 Solutions for Accidents & Breakdowns.
						</p>
					</div>

					<Row xs={1} lg={3} className="g-4">
						{HOME_SERVICES.map((service, index) => (
							<Col key={index}>
								<Link to={service.link} className="text-decoration-none h-100 d-block">
									<Card className="h-100 border-0 text-white text-center service-card-home rounded-4 position-relative">
										<Card.Img
											src={service.image}
											alt={service.alt}
											className="service-card-img rounded-4"
											loading="lazy"
										/>
										<Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 service-card-overlay">
											<div className="bg-dark bg-opacity-50 rounded-3 p-3 backdrop-blur">
												<service.icon size={36} className="mb-2 text-warning mx-auto" />
												<h3 className="h4 fw-bold text-white">{service.title}</h3>
												<p className="text-white-50 mb-2 small d-none d-sm-block">
													{service.description}
												</p>
												<span className="fw-bold text-warning small">
													DETAILS <ArrowRight size={14} />
												</span>
											</div>
										</Card.ImgOverlay>
									</Card>
								</Link>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* REVIEWS */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-6 fw-bold">Verified Google Reviews</h2>
					</div>
					<Carousel
						activeIndex={currentReview}
						onSelect={i => setCurrentReview(i)}
						controls={false}
						indicators
						fade
						className="pb-5"
					>
						{GOOGLE_REVIEWS.map((review, index) => (
							<Carousel.Item key={index}>
								<Card
									className="border-0 shadow-sm p-4 p-md-5 mx-auto rounded-4"
									style={{ maxWidth: "800px" }}
								>
									<Card.Body className="text-center">
										<div className="d-flex justify-content-center mb-3">
											{Array.from({ length: review.rating }).map((_, i) => (
												<Star
													key={i}
													size={24}
													className="text-warning"
													fill="currentColor"
												/>
											))}
										</div>
										<p className="h4 fst-italic text-secondary mb-4">"{review.text}"</p>
										<div className="fw-bold text-dark">- {review.name}</div>
									</Card.Body>
								</Card>
							</Carousel.Item>
						))}
					</Carousel>
				</Container>
			</section>

			{/* FAQ & LOCATION */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold display-6">Brampton Towing FAQ</h2>
					</div>
					<Row className="justify-content-center">
						<Col md={10} lg={8}>
							<Accordion flush>
								<Accordion.Item eventKey="0">
									<Accordion.Header>
										How much does a tow truck cost in Brampton?
									</Accordion.Header>
									<Accordion.Body>
										Our rates are transparent. Flat hook-up fee + km rate. No hidden
										costs. Call <strong>647-673-9755</strong> for a free quote.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>
										Can you tow from underground parking?
									</Accordion.Header>
									<Accordion.Body>
										Yes. We have specialized <strong>Low Clearance Trucks</strong> for
										condos, Bramalea City Centre, and Square One parking garages.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="2">
									<Accordion.Header>How fast is your response time?</Accordion.Header>
									<Accordion.Body>
										We pride ourselves on being faster than the competition. Our ETA is
										typically <strong>15-20 minutes</strong> in Brampton, Caledon and
										North Mississauga.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="3">
									<Accordion.Header>
										Do I have to pay for accident towing?
									</Accordion.Header>
									<Accordion.Body>
										In most accident recovery cases,{" "}
										<strong>insurance covers the entire towing cost</strong>. Customers
										typically pay <strong>nothing out of pocket</strong>. We handle
										insurance coordination so you don’t have to.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Container>
			</section>

			{/* NEIGHBORHOOD SEO BLOCK */}
			<section className="py-5 bg-white border-top">
				<Container>
					<Row>
						<Col lg={10} className="mx-auto">
							<h2 className="fw-bold mb-4">Trusted Towing Company in Brampton, ON</h2>

							<p className="text-secondary mb-3">
								Pixel Towing is a locally owned and operated towing company proudly
								serving Brampton, Mississauga, and Caledon. We specialize in fast,
								reliable towing and roadside assistance for accidents, breakdowns, and
								emergency situations.
							</p>

							<p className="text-secondary mb-3">
								Whether you need a{" "}
								<Link to="/services" className="text-decoration-underline text-secondary">
									tow truck in Brampton
								</Link>{" "}
								after an accident, a
								<Link
									to="/services/vehicle-transport"
									className="text-decoration-underline text-secondary"
								>
									{" "}
									flatbed tow
								</Link>{" "}
								for an AWD vehicle, or emergency{" "}
								<Link
									to="/services/lockout"
									className="text-decoration-underline text-secondary"
								>
									roadside assistance
								</Link>
								, our licensed operators are available 24 hours a day, 7 days a week.
							</p>

							<p className="text-secondary mb-3">
								Our team follows Peel Regional Police towing guidelines and works directly
								with insurance providers during accident recovery. In many accident cases,{" "}
								<strong>insurance covers the full towing cost</strong>, meaning{" "}
								<strong>customers pay nothing out of pocket</strong>.
							</p>

							<p className="text-secondary">
								If you’re searching for a <strong>tow truck near you in Brampton</strong>,
								Pixel Towing delivers fast response times, transparent pricing, and
								professional service every time.
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* FINAL CTA */}
			<section className="py-5 contact-section-bg text-center text-white">
				<Container>
					<h2 className="display-4 fw-bold mb-3">Emergency? Call Now.</h2>
					<p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
						15-Minute Response for Brampton, Mississauga & Hwy 410.
					</p>
					<Button
						href="tel:+16476739755"
						variant="light"
						size="lg"
						className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg"
					>
						<Phone className="me-2" /> Call 647-673-9755
					</Button>
				</Container>
			</section>
		</div>
	);
};

export default Home;
