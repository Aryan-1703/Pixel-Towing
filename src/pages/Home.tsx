import { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	Stack,
	Carousel,
	Image,
} from "react-bootstrap";
import {
	Phone,
	Mail,
	Clock,
	Shield,
	Zap,
	Truck,
	Users,
	Star,
	CheckCircle,
	ArrowRight,
	MapPin,
	Wrench,
	CreditCard,
	Award,
} from "lucide-react";

// Custom CSS for effects not available in standard Bootstrap
const CustomStyles = () => (
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
        background-color: rgba(0, 0, 0, 0.3);
      }
      .animated-bg-element-1 {
        position: absolute;
        top: 25%;
        left: 25%;
        width: 16rem;
        height: 16rem;
        background-color: rgba(59, 130, 246, 0.1);
        border-radius: 50%;
        filter: blur(5rem);
        animation: pulse 4s infinite alternate;
      }
      .animated-bg-element-2 {
        position: absolute;
        bottom: 25%;
        right: 25%;
        width: 24rem;
        height: 24rem;
        background-color: rgba(253, 224, 71, 0.1);
        border-radius: 50%;
        filter: blur(6rem);
        animation: pulse 5s infinite alternate;
        animation-delay: 1s;
      }
      .pixel-letter {
        background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
      }
      .scroll-indicator {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        animation: bounce 2s infinite;
      }
      .scroll-indicator-outer {
        width: 1.5rem;
        height: 2.5rem;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 9999px;
        display: flex;
        justify-content: center;
      }
      .scroll-indicator-inner {
        width: 0.25rem;
        height: 0.75rem;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 9999px;
        margin-top: 0.5rem;
        animation: pulse 1.5s infinite;
      }
      .about-section-bg {
        background: linear-gradient(to right, #111827, #1e3a8a, #111827);
      }
      .contact-section-bg {
        background: linear-gradient(to bottom right, #f59e0b, #ef4444, #dc2626);
      }
      .card-quick-link {
        text-decoration: none;
        transition: all 0.3s ease;
      }
      .card-quick-link:hover {
        transform: translateY(-5px);
        box-shadow: 0 1rem 1.5rem rgba(0,0,0,0.1);
      }
      .google-icon {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
      }
    `}
	</style>
);

const Home = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [activeService, setActiveService] = useState(null);
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

	const services = [
		{
			title: "Emergency Accident Recovery",
			description:
				"Rapid response for collision recovery with professional care and advanced equipment. We're there when you need us most.",
			icon: "🚨",
			color: "from-red-500 to-red-600",
			features: [
				"24/7 Emergency Response",
				"Professional Equipment",
				"Insurance Assistance",
			],
		},
		{
			title: "Comprehensive Roadside Assistance",
			description:
				"Complete roadside support including jump starts, tire changes, fuel delivery, and emergency repairs to get you moving.",
			icon: "🧰",
			color: "from-blue-500 to-blue-600",
			features: ["Jump Start Service", "Flat Tire Repair", "Fuel Delivery"],
		},
		{
			title: "Professional Vehicle Transport",
			description:
				"Secure towing and transport services for all vehicle types, from motorcycles to heavy-duty trucks across any distance.",
			icon: "🚛",
			color: "from-green-500 to-green-600",
			features: ["All Vehicle Types", "Long Distance", "Secure Transport"],
		},
		{
			title: "Emergency Lockout Services",
			description:
				"Fast and damage-free vehicle unlocking services. Our specialists use professional tools to get you back on the road.",
			icon: "🔐",
			color: "from-purple-500 to-purple-600",
			features: ["Damage-Free Service", "All Vehicle Models", "Quick Response"],
		},
	];
	const stats = [
		{ number: "5000+", label: "Happy Customers", icon: Users },
		{ number: "24/7", label: "Available Always", icon: Clock },
		{ number: "15min", label: "Average Response", icon: Zap },
		{ number: "100%", label: "Satisfaction Rate", icon: Star },
	];
	// Google Reviews (simulated - in real app, you'd fetch from Google Places API)
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
		{
			name: "David Thompson",
			text: "Called them at 2 AM and they were there in 20 minutes. Exceptional customer service!",
			rating: 5,
			date: "1 week ago",
			verified: true,
		},
	];
	const quickLinks = [
		{
			title: "Services",
			description: "Complete range of towing and roadside assistance",
			icon: Wrench,
			color: "from-blue-500 to-blue-600",
			link: "#services",
		},
		{
			title: "Contact Us",
			description: "Get in touch for immediate assistance",
			icon: Phone,
			color: "from-green-500 to-green-600",
			link: "#contact",
		},
		{
			title: "Service Areas",
			description: "Serving Brampton, Mississauga, Toronto & GTA",
			icon: MapPin,
			color: "from-purple-500 to-purple-600",
			link: "#areas",
		},
		{
			title: "Pricing",
			description: "Transparent and competitive pricing",
			icon: CreditCard,
			color: "from-orange-500 to-orange-600",
			link: "#pricing",
		},
	];

	// These are unchanged from the original to keep the data
	// services, stats, googleReviews, quickLinks definitions from original component here
	// ...

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentReview(prev => (prev + 1) % googleReviews.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [googleReviews.length]);

	return (
		<div className="bg-light">
			<CustomStyles />

			{/* Hero Section */}
			<section className="hero-section text-center">
				<div
					className="hero-background"
					style={{ transform: `translateY(${scrollY * 0.5}px)` }}
				/>
				<div className="hero-overlay" />
				<div className="animated-bg-element-1" />
				<div className="animated-bg-element-2" />

				<Container
					className={`position-relative z-index-1 transition-all duration-1000 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
					}`}
				>
					<div className="mb-5">
						<Stack direction="horizontal" gap={3} className="justify-content-center mb-3">
							{pixelLetters.map((letter, index) => (
								<div
									key={index}
									className={`display-1 fw-bold transition-all duration-500 pixel-letter ${
										letter
											? "opacity-100 scale-100 rotate-0"
											: "opacity-0 scale-150 rotate-45"
									}`}
								>
									{letter}
								</div>
							))}
						</Stack>
						<div
							className={`h2 fw-light text-warning transition-all duration-1000 ${
								showTowing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
							}`}
						>
							TOWING
						</div>
					</div>

					<p className="display-6 mb-4 fw-light text-light">
						Reliable Towing, Anytime You Need It
					</p>
					<p className="h4 mb-5 text-warning fw-semibold">
						Available 24/7 in Brampton & GTA
					</p>

					<Stack
						gap={4}
						className="justify-content-center align-items-center mb-5"
						direction="horizontal"
					>
						<Button
							href="tel:+16476739755"
							variant="warning"
							size="lg"
							className="fw-bold rounded-pill px-4 py-3"
						>
							<Phone className="me-2" size={20} />
							Call Now: +1 647 673 9755
						</Button>
						<a
							href="mailto:towing@pixel17.com"
							className="d-flex align-items-center text-white text-decoration-none h-100"
						>
							<Mail className="me-2" size={20} />
							towing@pixel17.com
						</a>
					</Stack>

					<Stack
						direction="horizontal"
						gap={4}
						className="justify-content-center text-light"
					>
						<div className="d-flex align-items-center">
							<Shield size={20} className="me-2 text-success" /> Fully Licensed
						</div>
						<div className="d-flex align-items-center">
							<CheckCircle size={20} className="me-2 text-success" /> Insured
						</div>
						<div className="d-flex align-items-center">
							<Clock size={20} className="me-2 text-success" /> 24/7 Service
						</div>
					</Stack>
				</Container>
				<div className="scroll-indicator">
					<div className="scroll-indicator-outer">
						<div className="scroll-indicator-inner" />
					</div>
				</div>
			</section>

			{/* Quick Navigation Links */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold text-dark">Quick Access</h2>
						<p className="lead text-muted">
							Everything you need to know about our services
						</p>
					</div>
					<Row xs={1} md={2} lg={4} className="g-4">
						{quickLinks.map((link, index) => (
							<Col key={index}>
								<Card
									as="a"
									href={link.link}
									className="h-100 p-3 border-0 shadow-sm card-quick-link"
								>
									<Card.Body>
										<div
											className={`d-inline-flex align-items-center justify-content-center w-12 h-12 bg-gradient text-white rounded-3 mb-4 p-3`}
										>
											<link.icon size={24} />
										</div>
										<Card.Title as="h3" className="mb-2">
											{link.title}
										</Card.Title>
										<Card.Text className="text-muted">{link.description}</Card.Text>
										<ArrowRight className="mt-3 text-muted" />
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Stats Section */}
			<section className="py-5 bg-light">
				<Container>
					<Row xs={2} md={4} className="g-4">
						{stats.map((stat, index) => (
							<Col key={index} className="text-center">
								<div className="d-inline-flex align-items-center justify-content-center p-3 bg-primary bg-gradient text-white rounded-circle mb-3">
									<stat.icon size={32} />
								</div>
								<div className="h2 fw-bold text-dark mb-2">{stat.number}</div>
								<div className="text-muted">{stat.label}</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Services Section */}
			<section id="services" className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-4 fw-bold text-dark">Our Premium Services</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "45rem" }}>
							Professional towing and roadside assistance with state-of-the-art equipment
							and certified technicians.
						</p>
					</div>
					<Row xs={1} md={2} className="g-4">
						{services.map((service, index) => (
							<Col key={index}>
								<Card
									className={`h-100 p-4 border-2 shadow-sm transition-all duration-300 ${
										activeService === index ? "border-primary" : "border-transparent"
									}`}
									// onMouseEnter={() => setActiveService(index)}
									onMouseLeave={() => setActiveService(null)}
								>
									<Card.Body>
										<div className="d-flex justify-content-between align-items-start mb-4">
											<div className="display-4">{service.icon}</div>
											<ArrowRight className="text-muted" />
										</div>
										<Card.Title as="h3" className="mb-3">
											{service.title}
										</Card.Title>
										<Card.Text className="text-muted mb-4">
											{service.description}
										</Card.Text>
										<Stack gap={2}>
											{service.features.map((feature, idx) => (
												<div key={idx} className="d-flex align-items-center text-muted">
													<CheckCircle size={16} className="me-2 text-success" />{" "}
													{feature}
												</div>
											))}
										</Stack>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Google Reviews Section */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<div className="d-flex align-items-center justify-content-center mb-3">
							<Image
								src="data:image/svg+xml,...(your original SVG data)"
								alt="Google"
								className="google-icon"
							/>
							<h2 className="display-5 fw-bold text-dark">Google Reviews</h2>
						</div>
						<div className="d-flex align-items-center justify-content-center mb-3">
							<div className="d-flex me-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star key={i} size={24} className="text-warning" fill="currentColor" />
								))}
							</div>
							<span className="h4 fw-bold text-secondary me-2">4.9</span>
							<span className="text-muted">({googleReviews.length}+ reviews)</span>
						</div>
						<div
							className="bg-primary bg-gradient mx-auto"
							style={{ width: "6rem", height: "4px" }}
						/>
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
								<Card className="border-0 shadow-lg p-4 p-md-5">
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

			{/* Service Areas Section */}
			<section id="areas" className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold text-dark">Service Areas</h2>
						<p className="lead text-muted">Proudly serving the Greater Toronto Area</p>
					</div>
					<Row xs={1} md={2} lg={3} className="g-4">
						{[
							"Brampton",
							"Mississauga",
							"Toronto",
							"Vaughan",
							"Markham",
							"Richmond Hill",
						].map((city, index) => (
							<Col key={index}>
								<Card className="text-center p-4 bg-light border-0 h-100">
									<Card.Body>
										<MapPin size={32} className="text-primary mx-auto mb-3" />
										<Card.Title as="h3">{city}</Card.Title>
										<Card.Text className="text-muted">
											{index === 0
												? "Our home base with fastest response times"
												: index === 1
												? "Complete coverage across all neighborhoods"
												: "24/7 emergency and scheduled services"}
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* About Section */}
			<section className="py-5 about-section-bg text-white">
				<Container>
					<Row className="align-items-center g-5">
						<Col md={6}>
							<h2 className="display-5 fw-bold mb-4">Why Choose Pixel Towing?</h2>
							<p className="lead text-light opacity-75 mb-4">
								At Pixel Towing, we believe that no one should be left stranded. With a
								team of certified drivers, modern tow trucks, and unmatched dedication, we
								deliver fast and safe towing services.
							</p>
							<Stack gap={3}>
								<div className="d-flex align-items-center">
									<Award size={24} className="text-warning me-3" /> Certified Professional
									Drivers
								</div>
								<div className="d-flex align-items-center">
									<Truck size={24} className="text-warning me-3" /> State-of-the-Art
									Equipment
								</div>
								<div className="d-flex align-items-center">
									<Shield size={24} className="text-warning me-3" /> Fully Licensed &
									Insured
								</div>
								<div className="d-flex align-items-center">
									<CreditCard size={24} className="text-warning me-3" /> Transparent
									Pricing
								</div>
							</Stack>
						</Col>
						<Col md={6}>
							<Card className="bg-white bg-opacity-10 border-light border-opacity-25 p-4">
								<Card.Body className="text-center">
									<Truck size={64} className="text-warning mx-auto mb-4" />
									<Card.Title as="h3" className="mb-3">
										Modern Fleet
									</Card.Title>
									<Card.Text className="text-light opacity-75">
										Our fleet of modern tow trucks and equipment ensures safe, efficient
										service for any vehicle type.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-5 contact-section-bg">
				<Container className="text-center text-white">
					<h2 className="display-4 fw-bold mb-3">Need Help Right Now?</h2>
					<p className="lead text-white-50 mb-4">
						Don't wait - our emergency response team is standing by 24/7
					</p>
					<Stack gap={4} className="justify-content-center align-items-center">
						<Button
							href="tel:+16476739755"
							variant="light"
							size="lg"
							className="fw-bold rounded-pill px-5 py-3 text-dark"
						>
							<Phone className="me-2" /> Emergency: +1 647 673 9755
						</Button>
						<div className="text-center">
							<a
								href="mailto:towing@pixel17.com"
								className="d-flex align-items-center text-white text-decoration-none"
							>
								<Mail className="me-2" /> towing@pixel17.com
							</a>
							<span className="small text-white-50">For non-emergency inquiries</span>
						</div>
					</Stack>
					<div className="mt-5 text-white-50">
						<p className="fw-semibold mb-1">Serving Brampton & Greater Toronto Area</p>
						<p>Fast Response • Professional Service • Fair Pricing</p>
					</div>
				</Container>
			</section>
		</div>
	);
};

export default Home;
