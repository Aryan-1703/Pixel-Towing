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
	Shield,
	Truck,
	Star,
	CheckCircle,
	ArrowRight,
	Wrench,
	Award,
	ShieldAlert,
	MapPin,
} from "lucide-react";
import SEO from "../components/SEO";
import "../css/Home.css";

// Images
import accident from "../assets/tow-truck-accident-recovery-brampton.jpg";
import towing from "../assets/flatbed-towing-brampton.jpg";
import flatTire from "../assets/flatTire.png";

const HOME_SERVICES = [
	{
		title: "Accident Recovery",
		description:
			"Fast accident towing, insurance reporting assistance, and collision center delivery in Brampton.",
		icon: ShieldAlert,
		link: "/services/accident-recovery",
		image: accident,
		alt: "Tow truck lifting crashed car at accident scene in Brampton Ontario",
	},
	{
		title: "Roadside Assistance",
		description:
			"Flat tire change, car battery boost, and lockout services. 15-20 minute ETA.",
		icon: Wrench,
		link: "/services",
		image: flatTire,
		alt: "Roadside technician fixing flat tire on Highway 410 Brampton",
	},
	{
		title: "Flatbed Towing",
		description:
			"Flatbed towing for AWD, luxury cars, motorcycles, and low-clearance vehicles.",
		icon: Truck,
		link: "/services/vehicle-transport",
		image: towing,
		alt: "Flatbed tow truck transporting luxury vehicle in Brampton GTA",
	},
];

const GOOGLE_REVIEWS = [
	{
		name: "Sarah Johnson",
		text: "Amazing service! Arrived within 15 minutes in Brampton and handled everything professionally. Highly recommended for anyone stuck on the 410.",
		rating: 5,
		date: "2 weeks ago",
	},
	{
		name: "Mike Chen",
		text: "Pixel Towing was quick and reliable when I broke down on the 401. Best towing service in the GTA — fair pricing and no hidden fees.",
		rating: 5,
		date: "1 month ago",
	},
	{
		name: "Lisa Rodriguez",
		text: "They arrived within 15 minutes for a battery boost near Bramalea City Centre — super friendly and professional driver.",
		rating: 5,
		date: "3 weeks ago",
	},
	{
		name: "David Park",
		text: "Got locked out of my car at Square One. Pixel Towing arrived in 18 minutes, zero damage to my car door. Excellent service!",
		rating: 5,
		date: "1 week ago",
	},
];

const FULL_SERVICE_LIST = [
	"Local Towing Brampton",
	"Long Distance Towing Ontario",
	"24 Hour Flatbed Towing",
	"Motorcycle Towing",
	"Underground Garage Extraction",
	"Winch-Out Service",
	"Ditch Pull-Out Recovery",
	"Off Road Vehicle Recovery",
	"Junk Car Removal",
	"Flat Tire Roadside Repair",
	"Car Battery Jump Start",
	"Emergency Fuel Delivery",
	"Vehicle Lockout Service",
	"Accident Scene Management",
	"Luxury Car Transport",
	"Scrap Car Recycling",
];

const SERVICE_AREAS = [
	{ name: "Mississauga", path: "/locations/mississauga", desc: "Hwy 401 & 410" },
	{ name: "Caledon", path: "/locations/caledon", desc: "Hwy 50 & Bolton" },
	{ name: "Etobicoke", path: "/locations/etobicoke", desc: "Hwy 427 & Airport" },
	{ name: "Vaughan", path: "/locations/vaughan", desc: "Hwy 400 & 407" },
	{ name: "Toronto", path: "/locations/toronto", desc: "GTA & North York" },
	{ name: "Georgetown", path: "/locations/georgetown", desc: "Trafalgar Rd" },
	{ name: "Halton Hills", path: "/locations/halton-hills", desc: "Steeles & 10th Line" },
	{ name: "Acton", path: "/locations/acton", desc: "Hwy 7 & Hwy 25" },
	{ name: "Erin", path: "/locations/erin", desc: "Wellington Rd 124" },
];

const Home = () => {
	return (
		<div className="bg-light">
			<SEO
				title="Pixel Towing Brampton | #1 Tow Truck & Roadside | 15 Min ETA | 647-673-9755"
				description="#1 Tow Truck Service in Brampton. Fast 15-min ETA. Accident Recovery, Lockouts, Battery Boost & Flatbed Towing. Licensed Municipal Tower. Call 647-673-9755."
				canonical="https://pixeltowing.com/"
			/>

			<style type="text/css">{`
				/* CSS-ONLY hero animation - no JS, no LCP penalty */
				.hero-section {
					background: linear-gradient(to bottom right, #1e293b, #1e3a8a, #111827);
					min-height: 90vh;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					text-align: center;
				}
				.hero-overlay {
					background-color: rgba(0,0,0,0.45);
					position: absolute;
					inset: 0;
				}
				.pixel-letter-css {
					background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					text-shadow: none;
					display: inline-block;
					opacity: 0;
					transform: scale(0.5);
					animation: pixelReveal 0.5s ease forwards;
				}
				.pixel-letter-css:nth-child(1) { animation-delay: 0.1s; }
				.pixel-letter-css:nth-child(2) { animation-delay: 0.3s; }
				.pixel-letter-css:nth-child(3) { animation-delay: 0.5s; }
				.pixel-letter-css:nth-child(4) { animation-delay: 0.7s; }
				.pixel-letter-css:nth-child(5) { animation-delay: 0.9s; }
				@keyframes pixelReveal {
					to { opacity: 1; transform: scale(1); }
				}
				.towing-reveal {
					opacity: 0;
					animation: fadeUp 0.8s ease 1.2s forwards;
				}
				@keyframes fadeUp {
					from { opacity: 0; transform: translateY(12px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.hero-content {
					opacity: 0;
					animation: fadeUp 0.8s ease 0.2s forwards;
				}
				.contact-section-bg {
					background: #111;
					background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8));
				}
				.area-card:hover {
					background: #1e3a8a !important;
					color: white !important;
					transform: translateY(-2px);
					transition: all 0.2s ease;
				}
				.area-card {
					transition: all 0.2s ease;
				}
			`}</style>

			{/* ======== HERO — CSS animation only, no JS delay ======== */}
			<section className="hero-section">
				<div className="hero-overlay" />
				<Container className="position-relative">
					{/* PIXEL letters — pure CSS stagger, renders immediately */}
					<Stack direction="horizontal" gap={3} className="justify-content-center mb-2">
						{"PIXEL".split("").map((letter, i) => (
							<span key={i} className="display-1 fw-bold pixel-letter-css">
								{letter}
							</span>
						))}
					</Stack>

					<div
						className="h2 fw-light text-warning towing-reveal"
						style={{ letterSpacing: "5px" }}
					>
						TOWING SERVICE
					</div>

					<div className="hero-content mt-4">
						<h1 className="display-4 fw-bold text-white mb-4">
							Brampton's #1 Tow Truck & Roadside Assistance
						</h1>

						<p className="lead mb-5 text-white-50 mx-auto" style={{ maxWidth: "42rem" }}>
							<strong className="text-white">15-Minute Arrival.</strong> Trusted by Peel
							Region Drivers for Accident Recovery, Lockouts & Flatbed Towing. Available
							24/7.
						</p>

						<Stack
							gap={3}
							className="justify-content-center align-items-center flex-md-row"
						>
							<Button
								href="tel:+16476739755"
								variant="warning"
								size="lg"
								className="fw-bold rounded-pill px-5 py-3 shadow-lg"
							>
								<Phone className="me-2" />
								647-673-9755 — Call Now
							</Button>
							<Link
								to="/services"
								className="btn btn-outline-light btn-lg rounded-pill px-5 py-3"
							>
								View All Services
							</Link>
						</Stack>

						{/* Trust signals directly under CTA */}
						<div className="mt-4 d-flex justify-content-center gap-4 flex-wrap text-white-50 small">
							<span>✅ Licensed & Insured</span>
							<span>✅ Peel Region Approved</span>
							<span>✅ $0 Out-of-Pocket for Insured Accidents</span>
							<span>✅ All Payment Methods</span>
						</div>
					</div>
				</Container>
			</section>

			{/* ONE CALL DOES IT ALL */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold">
							One Call. Tow Truck. Bodyshop. Rental Car.
						</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
							Most tow companies drop your car and disappear. We stay with you from the
							accident scene all the way to picking up your repaired vehicle.
						</p>
					</div>
					<Row className="g-4">
						<Col md={3}>
							<Card
								className="p-4 border-0 h-100 shadow-sm text-center"
								style={{ borderTop: "4px solid #FBBF24" }}
							>
								<Truck size={48} className="text-warning mx-auto mb-3" />
								<h3 className="h5 fw-bold">We Tow You</h3>
								<p className="text-muted small mb-0">
									15-minute response across Brampton. Licensed flatbed and wheel-lift
									trucks for every vehicle type, 24/7.
								</p>
							</Card>
						</Col>
						<Col md={3}>
							<Card
								className="p-4 border-0 h-100 shadow-sm text-center"
								style={{ borderTop: "4px solid #3B82F6" }}
							>
								<Shield size={48} className="text-primary mx-auto mb-3" />
								<h3 className="h5 fw-bold">We Handle the CRC</h3>
								<p className="text-muted small mb-0">
									We take you through the Collision Reporting Centre and make sure your
									report is filed correctly — protecting your legal position.
								</p>
							</Card>
						</Col>
						<Col md={3}>
							<Card
								className="p-4 border-0 h-100 shadow-sm text-center"
								style={{ borderTop: "4px solid #10B981" }}
							>
								<Wrench size={48} className="text-success mx-auto mb-3" />
								<h3 className="h5 fw-bold">Our Own Bodyshop</h3>
								<p className="text-muted small mb-0">
									Your car is repaired at <strong>our certified bodyshop</strong> — not an
									insurance-preferred facility. OEM parts. Lifetime workmanship warranty.
								</p>
							</Card>
						</Col>
						<Col md={3}>
							<Card
								className="p-4 border-0 h-100 shadow-sm text-center"
								style={{ borderTop: "4px solid #8B5CF6" }}
							>
								<Award size={48} style={{ color: "#8B5CF6" }} className="mx-auto mb-3" />
								<h3 className="h5 fw-bold">Rental Car Same Day</h3>
								<p className="text-muted small mb-0">
									We run our own rental fleet. You're in a vehicle{" "}
									<strong>same day</strong>, not waiting 48 hours for insurance
									pre-authorization.
								</p>
							</Card>
						</Col>
					</Row>

					{/* Consumer rights callout */}
					<div
						className="mt-5 p-4 rounded-4 border border-warning"
						style={{ background: "rgba(251,191,36,0.06)" }}
					>
						<Row className="align-items-center">
							<Col md={8}>
								<h3 className="h5 fw-bold mb-2">
									💡 Most drivers don't know this about their rights in Ontario
								</h3>
								<p className="text-secondary mb-0">
									Your insurance company cannot legally force you to use their preferred
									tow company, their preferred repair shop, or their rental vendor. That
									choice is yours. Exercising it often means faster repairs, a rental car
									in hours not days, and your car fixed with the parts it was built with —
									while your insurance still covers the bill.
								</p>
							</Col>
							<Col md={4} className="text-center mt-3 mt-md-0">
								<Button
									href="tel:+16476739755"
									variant="warning"
									size="lg"
									className="fw-bold rounded-pill px-4"
								>
									<Phone size={18} className="me-2" />
									Call Us First — 647-673-9755
								</Button>
								<div className="text-muted small mt-2">
									We handle everything from here
								</div>
							</Col>
						</Row>
					</div>
				</Container>
			</section>

			{/* FULL SERVICE LIST */}
			<section className="py-5 bg-dark text-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold text-warning">We Tow It All — Big or Small</h2>
						<p className="text-white-50">
							Complete breakdown and recovery services across the GTA.
						</p>
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
						<h2 className="display-4 fw-bold">Core Towing Services</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "45rem" }}>
							Professional 24/7 Solutions for Accidents, Breakdowns & Roadside
							Emergencies.
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
											loading={index === 0 ? "eager" : "lazy"}
										/>
										<Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 service-card-overlay">
											<div className="bg-dark bg-opacity-50 rounded-3 p-3">
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
					<div className="text-center mt-4">
						<Link to="/services" className="btn btn-outline-dark rounded-pill px-5">
							See All 6 Services →
						</Link>
					</div>
				</Container>
			</section>

			{/* ======== SERVICE AREAS GRID — Internal Linking Power ======== */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<MapPin size={36} className="text-warning mb-3" />
						<h2 className="fw-bold display-6">Towing Service Areas Near You</h2>
						<p className="text-muted">
							We cover all of Peel Region and surrounding GTA communities.
						</p>
					</div>
					<Row xs={2} md={3} lg={3} className="g-3">
						{SERVICE_AREAS.map(area => (
							<Col key={area.path}>
								<Link to={area.path} className="text-decoration-none">
									<Card className="area-card border-0 shadow-sm h-100 p-3 text-center bg-white">
										<div className="fw-bold text-dark">{area.name}</div>
										<div className="text-muted small mt-1">{area.desc}</div>
										<div className="text-warning small mt-2 fw-bold">
											Towing Available →
										</div>
									</Card>
								</Link>
							</Col>
						))}
					</Row>
					<p className="text-center text-muted mt-4 small">
						Brampton-based. Also serving{" "}
						<Link to="/locations/mississauga">Mississauga towing</Link>,{" "}
						<Link to="/locations/caledon">Caledon towing</Link>, and all Hwy 410 corridor
						routes.
					</p>
				</Container>
			</section>

			{/* REVIEWS */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-4">
						<h2 className="display-6 fw-bold">Google Reviews — Real Customers</h2>
						<div className="d-flex justify-content-center gap-1 my-2">
							{[1, 2, 3, 4, 5].map(i => (
								<Star key={i} size={22} className="text-warning" fill="currentColor" />
							))}
						</div>
						<p className="text-muted">5.0 stars · Verified Google Reviews</p>
					</div>
					<Carousel controls indicators fade className="pb-5">
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
													size={22}
													className="text-warning"
													fill="currentColor"
												/>
											))}
										</div>
										<p className="h5 fst-italic text-secondary mb-4">"{review.text}"</p>
										<div className="fw-bold text-dark">— {review.name}</div>
										<div className="text-muted small">{review.date} · Google Review</div>
									</Card.Body>
								</Card>
							</Carousel.Item>
						))}
					</Carousel>
					<div className="text-center">
						<Link to="/review" className="btn btn-outline-warning rounded-pill px-4">
							Leave Your Own Review ⭐
						</Link>
					</div>
				</Container>
			</section>

			{/* FAQ */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold display-6">
							Brampton Towing — Frequently Asked Questions
						</h2>
					</div>
					<Row className="justify-content-center">
						<Col md={10} lg={8}>
							<Accordion flush>
								<Accordion.Item eventKey="0">
									<Accordion.Header>
										How much does a tow truck cost in Brampton?
									</Accordion.Header>
									<Accordion.Body>
										Our rates are fully transparent. We charge a flat hook-up fee plus a
										per-kilometre rate with zero hidden charges. For accident recovery
										with valid insurance coverage, you typically pay{" "}
										<strong>$0 out of pocket</strong> — we bill your insurer directly.
										Call <strong>647-673-9755</strong> for a free, no-obligation quote.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>
										Can you tow from underground parking in Brampton?
									</Accordion.Header>
									<Accordion.Body>
										Yes. We have specialized Low-Clearance trucks built for condo
										parkades, Bramalea City Centre, Shoppers World, and Square One parking
										garages. Most standard flatbeds cannot access these — ours can.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="2">
									<Accordion.Header>
										How fast is your tow truck response time?
									</Accordion.Header>
									<Accordion.Body>
										Our average ETA is <strong>15–20 minutes</strong> anywhere in
										Brampton, North Mississauga, and Caledon. We station trucks near Hwy
										410 and Hwy 50 for maximum coverage of Peel Region.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="3">
									<Accordion.Header>
										Do I have to pay for accident towing in Ontario?
									</Accordion.Header>
									<Accordion.Body>
										In most accident recovery cases,{" "}
										<strong>your insurance covers the full towing cost</strong>. Customers
										with valid collision or comprehensive coverage typically pay{" "}
										<strong>nothing out of pocket</strong>. We work directly with Intact,
										Aviva, Belair, Economical, and all major Ontario insurers.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="4">
									<Accordion.Header>Do you tow AWD and luxury vehicles?</Accordion.Header>
									<Accordion.Body>
										Yes — and you should <em>never</em> allow wheel-lift towing of an AWD
										vehicle. We use flatbed trucks for all AWD (Subaru, Audi Quattro, BMW
										xDrive, etc.) and luxury vehicles. All four wheels off the ground,
										zero drivetrain damage.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Container>
			</section>

			{/* BLOG TEASER */}
			<section className="py-5 bg-white border-top">
				<Container>
					<div className="text-center mb-4">
						<h2 className="fw-bold h3">Towing Tips & Driver Resources</h2>
						<p className="text-muted">Know your rights on Ontario roads.</p>
					</div>
					<Row className="g-4 justify-content-center">
						<Col md={4}>
							<Card className="border-0 shadow-sm h-100 rounded-4">
								<Card.Body className="p-4">
									<span className="badge bg-warning text-dark mb-2">
										Know Your Rights
									</span>
									<h5 className="fw-bold">What To Do After a Car Accident in Brampton</h5>
									<p className="text-muted small">
										Step-by-step: CRC, insurance, and choosing your tow company.
									</p>
									<Link
										to="/blog/what-to-do-after-car-accident-brampton"
										className="btn btn-sm btn-outline-warning rounded-pill"
									>
										Read More →
									</Link>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="border-0 shadow-sm h-100 rounded-4">
								<Card.Body className="p-4">
									<span className="badge bg-primary mb-2">Ontario Law</span>
									<h5 className="fw-bold">
										Ontario Towing Laws: Your Rights When You're Towed
									</h5>
									<p className="text-muted small">
										Bill 258 explained — how to protect yourself from predatory towers.
									</p>
									<Link
										to="/blog/ontario-towing-laws-driver-rights"
										className="btn btn-sm btn-outline-primary rounded-pill"
									>
										Read More →
									</Link>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="border-0 shadow-sm h-100 rounded-4">
								<Card.Body className="p-4">
									<span className="badge bg-success mb-2">Car Tips</span>
									<h5 className="fw-bold">Dead Battery vs Bad Alternator: How to Tell</h5>
									<p className="text-muted small">
										Don't buy a new battery you don't need. Read this first.
									</p>
									<Link
										to="/blog/dead-battery-vs-bad-alternator"
										className="btn btn-sm btn-outline-success rounded-pill"
									>
										Read More →
									</Link>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* NEIGHBORHOOD SEO BLOCK */}
			<section className="py-5 bg-light border-top">
				<Container>
					<Row>
						<Col lg={10} className="mx-auto">
							<h2 className="fw-bold mb-4">
								Brampton's Full-Service Accident & Towing Company
							</h2>
							<p className="text-secondary mb-3">
								Pixel Towing is more than a tow truck company. We are a locally owned,
								full-service accident solution based in Brampton, serving{" "}
								<strong>
									Mississauga, Caledon, Halton Hills, Georgetown, and the GTA
								</strong>
								. When you call us after an accident, we handle the tow, the Collision
								Reporting Centre, the repairs at{" "}
								<strong>our own certified bodyshop</strong>, and get you into a rental
								vehicle from <strong>our own fleet — the same day</strong>.
							</p>
							<p className="text-secondary mb-3">
								Under Ontario law, you are not obligated to use your insurance company's
								preferred tow company or repair shop. You have the right to choose — and
								choosing a single provider who handles everything from the crash scene to
								your repaired car being returned to you means fewer phone calls, less
								stress, and repairs done to the standard <em>you</em> expect.
							</p>
							<p className="text-secondary mb-3">
								Whether you need a{" "}
								<Link
									to="/services/accident-recovery"
									className="text-decoration-underline text-secondary"
								>
									tow truck after an accident
								</Link>{" "}
								on Hwy 410, a{" "}
								<Link
									to="/services/vehicle-transport"
									className="text-decoration-underline text-secondary"
								>
									flatbed tow
								</Link>{" "}
								for an AWD vehicle, or emergency{" "}
								<Link
									to="/services/lockout"
									className="text-decoration-underline text-secondary"
								>
									roadside assistance
								</Link>{" "}
								anywhere in Peel Region — our drivers are available 24/7 and will be on
								scene in 15 minutes.
							</p>
							<p className="text-secondary">
								Searching for a <strong>tow truck near me in Brampton</strong>? Call{" "}
								<a href="tel:+16476739755" className="fw-bold text-dark">
									647-673-9755
								</a>
								. One call and we take care of the rest.
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* FINAL CTA */}
			<section className="py-5 contact-section-bg text-center text-white bg-dark">
				<Container>
					<h2 className="display-4 fw-bold mb-3">Emergency? Call Now — 24/7.</h2>
					<p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
						Average 15-minute response for Brampton, Mississauga & all Hwy 410 corridor
						routes.
					</p>
					<Stack
						gap={3}
						direction="horizontal"
						className="justify-content-center flex-wrap"
					>
						<Button
							href="tel:+16476739755"
							variant="warning"
							size="lg"
							className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg"
						>
							<Phone className="me-2" /> Call 647-673-9755
						</Button>
						<Button
							href="https://wa.link/sq54ln"
							target="_blank"
							variant="outline-light"
							size="lg"
							className="fw-bold rounded-pill px-5 py-3"
						>
							WhatsApp Dispatch
						</Button>
					</Stack>
				</Container>
			</section>
		</div>
	);
};

export default Home;
