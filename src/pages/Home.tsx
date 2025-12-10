import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Stack, Carousel } from "react-bootstrap";
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
import accident from "../assets/accident.jpg";
import towing from "../assets/towing.jpg";
import flatTire from "../assets/flatTire.png";

const Home = () => {
	// const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const [pixelLetters, setPixelLetters] = useState(["", "", "", "", ""]);
	const [showTowing, setShowTowing] = useState(false);
	const [currentReview, setCurrentReview] = useState(0);

	useEffect(() => {
		setIsVisible(true);
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);

		const letters = ["P", "I", "X", "E", "L"];
		letters.forEach((letter, index) => {
			setTimeout(() => {
				setPixelLetters(prev => {
					const newLetters = [...prev];
					newLetters[index] = letter;
					return newLetters;
				});
			}, 300 * (index + 1));
		});

		setTimeout(() => setShowTowing(true), 2000);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const homeServices = [
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

	const googleReviews = [
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

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentReview(prev => (prev + 1) % googleReviews.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [googleReviews.length]);

	return (
		<div className="bg-light">
			{/* 🔥 SEO METADATA */}
			<SEO
				title="Pixel Towing Brampton | 24/7 Tow Truck & Roadside Assistance"
				description="Looking for a tow truck in Brampton? Pixel Towing offers 24/7 accident recovery, flat tire service, and battery boosts across Mississauga & GTA. Call Now."
				canonical="https://pixeltowing.com/"
			/>

			<style type="text/css">
				{`
                .hero-section {
                    position: relative;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    color: white;
                }
                .hero-background {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom right, #1e293b, #1e3a8a, #111827);
                }
                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                }
                .pixel-letter {
                    background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
                }
            `}
			</style>

			{/* HERO SECTION */}
			<section className="hero-section text-center">
				<div
					className="hero-background"
					style={{ transform: `translateY(${scrollY * 0.5}px)` }}
				/>
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
						>
							TOWING SERVICE
						</div>
					</div>

					<h1 className="display-4 mb-4 fw-bold text-white">
						24/7 Tow Truck in Brampton & GTA
					</h1>

					<p className="lead mb-5 text-white-50 mx-auto" style={{ maxWidth: "40rem" }}>
						Fast arrival times for Brampton, Mississauga, Caledon, Toronto & Scarborough.
					</p>

					<Stack gap={3} className="justify-content-center align-items-center">
						<Button
							href="tel:+16476739755"
							variant="warning"
							size="lg"
							className="fw-bold rounded-pill px-5 py-3 shadow-lg"
						>
							<Phone className="me-2" />
							647-673-9755
						</Button>

						{/* ✅ FIXED: REPLACED <Button as={Link}> WITH DIRECT <Link> */}
						{/* This prevents the TypeScript/Props error */}
						<Link
							to="/services"
							className="btn btn-outline-light btn-lg rounded-pill px-5 py-3"
						>
							See Towing Services
						</Link>
					</Stack>
				</Container>
			</section>

			{/* WHY CHOOSE US */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold">Why Pixel Towing?</h2>
						<p className="lead text-muted">Top-rated tow truck operators in Brampton.</p>
					</div>

					<Row className="g-4 text-center">
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm">
								<Award size={48} className="text-warning mx-auto mb-3" />
								<h3>Accident Assistance</h3>
								<p className="text-muted">
									We guide you through the insurance claim process and tow to a collision
									reporting center.
								</p>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm">
								<Clock size={48} className="text-primary mx-auto mb-3" />
								<h3>30 Min ETA</h3>
								<p className="text-muted">
									We have trucks stationed in Brampton and Mississauga for rapid response.
								</p>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm">
								<Shield size={48} className="text-success mx-auto mb-3" />
								<h3>Damage-Free Towing</h3>
								<p className="text-muted">
									Professional flatbed trucks for safe transport of all vehicle types.
								</p>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* SERVICES */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-4 fw-bold">Towing & Roadside Services</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "45rem" }}>
							We handle everything: Car Towing • Flatbed • Accident Recovery • Scrap Car
							Removal • Boost & Unlocks • Highway Rescue
						</p>
					</div>

					<Row xs={1} lg={3} className="g-4">
						{homeServices.map((service, index) => (
							<Col key={index}>
								{/* ✅ FIXED: WE NOW WRAP THE CARD IN A LINK RATHER THAN 'as={Link}' */}
								{/* This keeps the styling perfect and avoids errors */}
								<Link
									to={service.link}
									className="text-decoration-none text-white h-100 d-block"
								>
									<Card className="h-100 shadow-lg border-0 text-white text-center service-card-home">
										<Card.Img
											src={service.image}
											alt={service.alt}
											className="service-card-img"
										/>
										<Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 service-card-overlay">
											<service.icon size={40} className="mb-3 mx-auto" />
											<h3 className="h3">{service.title}</h3>
											<p>{service.description}</p>
											<p className="fw-bold mt-2">
												Learn More <ArrowRight size={16} />
											</p>
										</Card.ImgOverlay>
									</Card>
								</Link>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* REVIEWS */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold">Recent Towing Reviews</h2>
					</div>

					<Carousel
						activeIndex={currentReview}
						onSelect={i => setCurrentReview(i)}
						controls={false}
						indicators
						fade
					>
						{googleReviews.map((review, index) => (
							<Carousel.Item key={index}>
								<Card className="border-0 shadow-lg p-4 p-md-5 mx-md-5">
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
										<p className="h5 fst-italic text-secondary mb-4">“{review.text}”</p>
										<div className="d-flex align-items-center justify-content-center">
											<span className="fw-semibold me-2">{review.name}</span>
											{review.verified && (
												<CheckCircle className="text-primary" size={18} />
											)}
										</div>
									</Card.Body>
								</Card>
							</Carousel.Item>
						))}
					</Carousel>
				</Container>
			</section>

			{/* FINAL CTA */}
			<section className="py-5 contact-section-bg">
				<Container className="text-center text-white">
					<h2 className="display-4 fw-bold mb-3">Stuck on the Road?</h2>
					<p className="lead text-white-50 mb-4">
						Serving Brampton, Mississauga, and Highway 401/410/407.
					</p>

					<Button
						href="tel:+16476739755"
						variant="light"
						size="lg"
						className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg"
					>
						<Phone className="me-2" /> 647-673-9755
					</Button>
				</Container>
			</section>
		</div>
	);
};

export default Home;
