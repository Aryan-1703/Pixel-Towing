import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Stack, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
import accident from "../assets/accident.jpg";
import towing from "../assets/towing.jpg";
import flatTire from "../assets/flatTire.png";

const Home = () => {
	const navigate = useNavigate();
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

	// Data for the new visual services section on the homepage
	const homeServices = [
		{
			title: "Accident Management",
			description:
				"Complete support from roadside recovery to insurance claim coordination.",
			icon: ShieldAlert,
			link: "/services/accident-recovery",
			image: accident,
		},
		{
			title: "Roadside Assistance",
			description:
				"Fast help for lockouts, flat tires, and dead batteries to get you moving again.",
			icon: Wrench,
			link: "/services",
			image: flatTire,
		},
		{
			title: "Specialized Towing",
			description:
				"Expert transport for breakdowns, AWD vehicles, classic cars, and motorcycles.",
			icon: Truck,
			link: "/services/vehicle-transport",
			image: towing,
		},
	];

	// Simulated Google Reviews data
	const googleReviews = [
		{
			name: "Sarah Johnson",
			text: "Incredible service! They arrived within 15 minutes and handled my car with such care. Highly recommend!",
			rating: 5,
			date: "2 weeks ago",
			verified: true,
		},
		{
			name: "Mike Chen",
			text: "Professional, fast, and reasonably priced. Pixel Towing saved my day when I was stranded on the highway.",
			rating: 5,
			date: "1 month ago",
			verified: true,
		},
		{
			name: "Lisa Rodriguez",
			text: "Best towing service in Brampton! The driver was courteous and explained everything clearly.",
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
			<style type="text/css">
				{`
    /* --- General Styles --- */
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
    .about-section-bg {
        background: linear-gradient(to right, #111827, #1e3a8a, #111827);
    }
    .contact-section-bg {
        background: linear-gradient(to bottom right, #f59e0b, #ef4444, #dc2626);
    }
    .service-card-home {
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border-radius: 0.5rem;
    }
    .service-card-home:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
    .service-card-img {
        height: 400px;
        object-fit: cover;
        border-radius: 0.5rem;
    }
    .service-card-overlay {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.0) 100%);
        border-radius: 0.5rem;
    }

    /* --- MOBILE VIEW ADJUSTMENTS --- */
    /* This applies to screens smaller than 992px (where the navbar collapses) */
    @media (max-width: 991.98px) {
        .hero-section {
            /* Stop trying to perfectly center the content vertically */
            align-items: flex-start;
            /* Push content down to clear the ~70px navbar and add breathing room */
            padding-top: 120px;
        }

        .hero-section .display-1 {
            /* Make the PIXEL letters slightly smaller on mobile */
            font-size: 4.5rem;
        }
        
        .hero-section .display-3 {
            /* Make the main headline smaller on mobile */
            font-size: 2.5rem;
        }

        /* Make the service cards on the homepage a bit shorter on mobile */
        .service-card-img {
            height: 350px;
        }
    }
    `}
			</style>

			{/* Hero Section */}
			<section className="hero-section text-center">
				<div
					className="hero-background"
					style={{ transform: `translateY(${scrollY * 0.5}px)` }}
				/>
				<div className="hero-overlay" />

				<Container
					className={`position-relative z-index-1 transition-all duration-1000 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
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
							className={`h2 fw-light text-warning transition-all duration-1000 ${
								showTowing ? "opacity-100" : "opacity-0"
							}`}
						>
							TOWING
						</div>
					</div>

					<h1 className="display-3 mb-4 fw-bold text-white">
						Your Trusted Partner on the Road
					</h1>
					<p className="lead mb-5 text-white-50 mx-auto" style={{ maxWidth: "40rem" }}>
						24/7 Professional Towing and Roadside Assistance in Brampton & the GTA.
					</p>

					<Stack gap={3} className="justify-content-center align-items-center">
						<Button
							href="tel:+16476739755"
							variant="warning"
							size="lg"
							className="fw-bold rounded-pill px-5 py-3 shadow-lg"
						>
							<Phone className="me-2" />
							GET HELP NOW: +1 647 673 9755
						</Button>
						<Button
							onClick={() => navigate("/services")}
							variant="outline-light"
							size="lg"
							className="rounded-pill px-5 py-3"
						>
							View All Services
						</Button>
					</Stack>
				</Container>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold text-dark">
							Why Pixel Towing is Your Best Call
						</h2>
						<p className="lead text-muted">
							We provide more than just a tow - we provide peace of mind.
						</p>
					</div>
					<Row className="g-4 text-center">
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm">
								<Award size={48} className="text-warning mx-auto mb-3" />
								<Card.Title as="h3" className="mb-2">
									Insurance Experts
								</Card.Title>
								<Card.Text className="text-muted">
									We handle the entire insurance claim process for you, from first call to
									final settlement.
								</Card.Text>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm">
								<Clock size={48} className="text-primary mx-auto mb-3" />
								<Card.Title as="h3" className="mb-2">
									Rapid 24/7 Response
								</Card.Title>
								<Card.Text className="text-muted">
									Our dispatch is always on, ensuring a truck is on its way to you in
									minutes, any time of day or night.
								</Card.Text>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="p-4 border-0 h-100 shadow-sm">
								<Shield size={48} className="text-success mx-auto mb-3" />
								<Card.Title as="h3" className="mb-2">
									Damage-Free Guarantee
								</Card.Title>
								<Card.Text className="text-muted">
									With state-of-the-art equipment and trained specialists, your vehicle's
									safety is our top priority.
								</Card.Text>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Services Section */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-4 fw-bold text-dark">How We Can Help</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "45rem" }}>
							From emergency accident management to simple roadside assistance, we have
							you covered.
						</p>
					</div>
					<Row xs={1} md={1} lg={3} className="g-4">
						{homeServices.map((service, index) => (
							<Col key={index}>
								<Card
									className="h-100 shadow-lg border-0 text-white text-center service-card-home"
									onClick={() => navigate(service.link)}
								>
									<Card.Img
										src={service.image}
										alt={service.title}
										className="service-card-img"
									/>
									<Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 service-card-overlay">
										<service.icon size={40} className="mb-3" />
										<Card.Title as="h3">{service.title}</Card.Title>
										<Card.Text>{service.description}</Card.Text>
										<p className="fw-bold mt-2">
											Learn More <ArrowRight size={16} />
										</p>
									</Card.ImgOverlay>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Google Reviews Section */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold text-dark">Trusted by Our Community</h2>
					</div>
					<Carousel
						activeIndex={currentReview}
						onSelect={i => setCurrentReview(i)}
						controls={false}
						indicators={true}
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
										<blockquote className="blockquote mb-4">
											<p className="h5 fst-italic text-secondary">"{review.text}"</p>
										</blockquote>
										<div className="d-flex align-items-center justify-content-center mb-1">
											<div className="fw-semibold me-2">{review.name}</div>
											{review.verified && (
												<CheckCircle size={20} className="text-primary" />
											)}
										</div>
										<footer className="text-muted small">{review.date}</footer>
									</Card.Body>
								</Card>
							</Carousel.Item>
						))}
					</Carousel>
				</Container>
			</section>

			{/* The Pixel Towing Promise Section */}
			<section className="py-5 about-section-bg text-white">
				<Container>
					<Row className="align-items-center g-5">
						<Col md={6}>
							<h2 className="display-5 fw-bold mb-4">The Pixel Towing Promise</h2>
							<p className="lead text-light opacity-75 mb-4">
								We started Pixel Towing to bring a new level of professionalism,
								transparency, and care to the roadside assistance industry. Every call is
								answered by a team that's fully licensed, insured, and equipped with
								state-of-the-art trucks. We're not just a service; we're your neighbours,
								dedicated to getting you back on track safely.
							</p>
						</Col>
						<Col md={6} className="text-center">
							<Truck size={128} className="text-warning" />
							<h3 className="mt-3">Modern, Safe & Reliable Fleet</h3>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Final Call to Action Section */}
			<section className="py-5 contact-section-bg">
				<Container className="text-center text-white">
					<h2 className="display-4 fw-bold mb-3">Need Help Right Now?</h2>
					<p className="lead text-white-50 mb-4">
						Don't wait - our emergency response team is standing by 24/7.
					</p>
					<Button
						href="tel:+16476739755"
						variant="light"
						size="lg"
						className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg"
					>
						<Phone className="me-2" /> Call for Immediate Assistance
					</Button>
				</Container>
			</section>
		</div>
	);
};

export default Home;
