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

// ⚡ PERFORMANCE: Data moved outside component to prevent re-creation on every render
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
			"Flat tire change, car battery boost, and lockout services. 30-minute ETA in the GTA.",
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
		text: "Pixel Towing was quick and reliable on the 410. Best towing service!",
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

const Home = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [pixelLetters, setPixelLetters] = useState(["", "", "", "", ""]);
	const [showTowing, setShowTowing] = useState(false);
	const [currentReview, setCurrentReview] = useState(0);

	useEffect(() => {
		setIsVisible(true);

		// Animation for "PIXEL" letters (Optimized to reduce renders)
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

		// ⚡ Cleanup function to prevent memory leaks
		return () => {
			timers.forEach(clearTimeout);
			clearTimeout(towTimer);
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentReview(prev => (prev + 1) % GOOGLE_REVIEWS.length);
		}, 6000); // ⚡ Slowed down carousel to 6s for better reading & performance
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-light">
			<SEO
				title="Pixel Towing Brampton | 24/7 Tow Truck & Roadside Assistance"
				description="Looking for a tow truck in Brampton? Pixel Towing offers 24/7 accident recovery, flat tire service, and battery boosts across Mississauga & GTA. Call 647-673-9755."
				canonical="https://pixeltowing.com/"
			/>

			{/* Inline styles specifically for backgrounds are fine, layout is in CSS */}
			<style type="text/css">
				{`
                /* ⚡ PERFORMANCE: Used fixed background for Parallax instead of JS Scroll Listener */
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
                    background-color: #111;
                    /* ⚡ Lazy Loaded Parallax background via CSS */
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
						24/7 Tow Truck in Brampton & GTA
					</h1>

					<p
						className="lead mb-5 text-white-50 mx-auto"
						style={{ maxWidth: "42rem", fontSize: "1.25rem" }}
					>
						Fast arrival times for Brampton, Mississauga, Caledon, Toronto, Vaughan &
						Scarborough.
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
							View Services
						</Link>
					</Stack>
				</Container>
			</section>

			{/* WHY CHOOSE US */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold">Why Pixel Towing?</h2>
						<p className="lead text-muted">
							Brampton's trusted choice for reliable & honest roadside service.
						</p>
					</div>

					<Row className="g-4 text-center">
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm bg-light">
								<Award size={56} className="text-warning mx-auto mb-3" />
								<h3 className="h4 fw-bold">Accident Assistance</h3>
								<p className="text-muted mb-0">
									We guide you through the insurance claim process and tow to the
									Collision Reporting Center.
								</p>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm bg-light">
								<Clock size={56} className="text-primary mx-auto mb-3" />
								<h3 className="h4 fw-bold">30 Min Arrival</h3>
								<p className="text-muted mb-0">
									Strategic trucks stationed in Brampton & Mississauga mean we arrive
									faster.
								</p>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm bg-light">
								<Shield size={56} className="text-success mx-auto mb-3" />
								<h3 className="h4 fw-bold">Damage-Free</h3>
								<p className="text-muted mb-0">
									Premium flatbed tow trucks designed for low-clearance & AWD vehicles.
								</p>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* SERVICES GRID */}
			<section className="py-5 bg-white services-section">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-4 fw-bold">Our Services</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "45rem" }}>
							Towing • Flatbeds • Accidents • Scrap Car • Boost • Lockout • Fuel
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
											loading="lazy" /* ⚡ Performance: Lazy loads these images */
										/>
										<Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 service-card-overlay">
											<div className="bg-dark bg-opacity-50 rounded-3 p-3 backdrop-blur">
												<service.icon size={36} className="mb-2 text-warning mx-auto" />
												<h3 className="h4 fw-bold text-white">{service.title}</h3>
												<p className="text-white-50 mb-2 small d-none d-sm-block">
													{service.description}
												</p>
												<span className="fw-bold text-warning small">
													LEARN MORE <ArrowRight size={14} />
												</span>
											</div>
										</Card.ImgOverlay>
									</Card>
								</Link>
							</Col>
						))}
					</Row>

					<div className="text-center mt-5">
						<Link to="/services">
							<Button variant="outline-dark" className="rounded-pill px-4">
								View All Services
							</Button>
						</Link>
					</div>
				</Container>
			</section>

			{/* REVIEWS CAROUSEL */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-6 fw-bold">5-Star Google Reviews</h2>
						<p className="text-muted">See what your Brampton neighbors are saying.</p>
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
										<div className="d-flex align-items-center justify-content-center">
											<div
												className="bg-primary text-white rounded-circle me-3 fw-bold d-flex align-items-center justify-content-center"
												style={{ width: 40, height: 40 }}
											>
												{review.name.charAt(0)}
											</div>
											<div className="text-start">
												<div className="fw-bold text-dark">{review.name}</div>
												<small className="text-muted">
													{review.date} • Verified Customer
												</small>
											</div>
										</div>
									</Card.Body>
								</Card>
							</Carousel.Item>
						))}
					</Carousel>
				</Container>
			</section>

			{/* FAQ SECTION */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold display-6">Frequently Asked Questions</h2>
						<p className="text-muted">
							Answers to common towing questions in Brampton, Mississauga & the GTA.
						</p>
					</div>
					<Row className="justify-content-center">
						<Col md={10} lg={8}>
							<Accordion flush>
								{/* KEYWORD: TOW TRUCK COST BRAMPTON */}
								<Accordion.Item eventKey="0">
									<Accordion.Header>
										How much does a tow truck cost in Brampton?
									</Accordion.Header>
									<Accordion.Body>
										Our rates are affordable and transparent starting from $100. We charge a flat hook-up fee
										plus a per-kilometer rate. Unlike some providers, Pixel Towing has{" "}
										<strong>no hidden fees</strong>. Call <strong>647-673-9755</strong>{" "}
										for an immediate, upfront quote based on your location and vehicle
										type.
									</Accordion.Body>
								</Accordion.Item>

								{/* KEYWORD: 24/7 & HIGHWAYS */}
								<Accordion.Item eventKey="1">
									<Accordion.Header>
										Are you open right now (24/7 Service)?
									</Accordion.Header>
									<Accordion.Body>
										Yes! We operate <strong>24 hours a day, 7 days a week</strong>,
										including holidays. Whether you are stuck on Highway 410, the 407 ETR,
										or a residential street in Peel Region at 3 AM, our dispatch team is
										ready to help.
									</Accordion.Body>
								</Accordion.Item>

								{/* KEYWORD: ETA (Time to Arrival) */}
								<Accordion.Item eventKey="2">
									<Accordion.Header>
										How long will it take for the truck to arrive?
									</Accordion.Header>
									<Accordion.Body>
										Our standard ETA for Brampton and Mississauga is{" "}
										<strong>10 to 20 minutes</strong>, depending on traffic and weather.
										When you call, we use GPS tracking to dispatch the nearest truck to
										your location immediately.
									</Accordion.Body>
								</Accordion.Item>

								{/* KEYWORD: LOW CLEARANCE / PARKING GARAGE (Very important in GTA) */}
								<Accordion.Item eventKey="3">
									<Accordion.Header>
										Can you tow a car from an underground parking garage?
									</Accordion.Header>
									<Accordion.Body>
										Yes. We have specialized <strong>Low-Clearance Tow Trucks</strong>{" "}
										designed specifically for condo underground parking garages and
										shopping centers (like Square One or Bramalea City Centre). We can
										extract your vehicle safely without damage.
									</Accordion.Body>
								</Accordion.Item>

								{/* KEYWORD: INSURANCE & ACCIDENTS */}
								<Accordion.Item eventKey="5">
									<Accordion.Header>
										Do I have to pay out of pocket for accident recovery?
									</Accordion.Header>
									<Accordion.Body>
										In most accident recovery situations, the cost is{" "}
										<strong>fully covered by your insurance company</strong>. We work
										directly with all major insurance providers to handle the billing and
										tow your car to the Collision Reporting Center or repair shop, meaning
										you usually pay $0 out of pocket at the roadside.
									</Accordion.Body>
								</Accordion.Item>

								{/* KEYWORD: PAYMENTS (Transactional) */}
								<Accordion.Item eventKey="6">
									<Accordion.Header>What payment methods do you accept?</Accordion.Header>
									<Accordion.Body>
										For services not covered by insurance (like breakdowns or battery
										boosts), we accept
										<strong>
											{" "}
											E-Transfer, Visa, MasterCard, American Express, Debit, Cash, and Apple Pay
										</strong>
										. Our drivers carry secure mobile payment terminals.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Container>
			</section>

			{/* SEO TEXT BLOCK */}
			<section className="py-5 bg-light border-top seo-block">
				<Container>
					<Row>
						<Col lg={8} className="mx-auto text-center text-md-start">
							<h2 className="fw-bold h3 mb-4 text-dark">
								Premier Tow Truck & Roadside Company in Peel Region
							</h2>
							<p className="text-secondary mb-3">
								Pixel Towing is locally owned, serving{" "}
								<strong>Brampton, Mississauga, and Caledon</strong>. We are moments away
								from <strong>Steeles Ave, Hurontario St, and Highway 410</strong>.
							</p>
							<h3 className="h5 fw-bold text-dark mt-4 mb-3">Neighbourhoods We Serve:</h3>
							<ul className="text-secondary list-unstyled d-flex flex-wrap justify-content-center justify-content-md-start">
								<li className="w-50 w-md-33 mb-2">
									<CheckCircle size={14} className="text-success me-1" /> Downtown
									Brampton
								</li>
								<li className="w-50 w-md-33 mb-2">
									<CheckCircle size={14} className="text-success me-1" /> Castlemore &
									Gore
								</li>
								<li className="w-50 w-md-33 mb-2">
									<CheckCircle size={14} className="text-success me-1" /> Mount Pleasant
								</li>
								<li className="w-50 w-md-33 mb-2">
									<CheckCircle size={14} className="text-success me-1" /> Bramalea
								</li>
								<li className="w-50 w-md-33 mb-2">
									<CheckCircle size={14} className="text-success me-1" /> Springdale
								</li>
							</ul>
						</Col>
					</Row>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-5 contact-section-bg text-center text-white">
				<Container>
					<h2 className="display-4 fw-bold mb-3">Stuck on the Road?</h2>
					<p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
						Fast ETA for Brampton, Mississauga, and Highway 410/407.
					</p>
					<Button
						href="tel:+16476739755"
						variant="light"
						size="lg"
						className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg zoom-hover"
					>
						<Phone className="me-2" /> Call 647-673-9755 Now
					</Button>
				</Container>
			</section>
		</div>
	);
};

export default Home;
