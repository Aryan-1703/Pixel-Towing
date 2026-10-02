import { Container, Row, Col, Button, Card, Stack, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Phone, Shield, Truck, Star, ArrowRight, Wrench, Award, ShieldAlert, MapPin } from "lucide-react";
import SEO from "../components/SEO";
import TowZoneNotice from "../components/TowZoneNotice";
import { IMAGES } from "../assets/images";
import { BUSINESS, DISPATCH_MESSAGE, SITE_ORIGIN } from "../content/site";
import { CITIES, CITY_SLUGS } from "../content/cities";
import { ACCIDENT_RECOVERY, SERVICE_LINKS, SERVICE_SLUGS, servicePath } from "../content/services";
import "../css/Home.css";

const HOME_SERVICES = [
	{
		title: "Accident Towing",
		description: "Accident towing, help getting to a Collision Reporting Centre, and delivery to the repair shop you choose.",
		icon: ShieldAlert,
		link: ACCIDENT_RECOVERY.path,
		anchor: ACCIDENT_RECOVERY.anchor,
		image: IMAGES.accidentTowing,
	},
	{
		title: "Roadside Assistance",
		description: "Flat tire changes, battery boosts and car lockouts, 24/7.",
		icon: Wrench,
		link: servicePath("jump-start"),
		anchor: "Battery boost and roadside help",
		image: IMAGES.batteryBoost,
	},
	{
		title: "Flatbed Towing",
		description: "Flatbed towing for AWD, luxury, low-clearance vehicles and motorcycles.",
		icon: Truck,
		link: servicePath("vehicle-transport"),
		anchor: SERVICE_LINKS["vehicle-transport"].anchor,
		image: IMAGES.flatbedTowing,
	},
] as const;

const FAQS = [
	{
		q: "How much does a tow truck cost in Brampton?",
		a: "It depends on the service, distance and vehicle. We quote the price before we dispatch, and we'll give you our maximum rate schedule before any work starts, as Ontario requires. For accident towing, whether your insurer pays depends on your policy and the circumstances of the claim.",
	},
	{
		q: "Can you tow from underground parking?",
		a: "Often, yes, but clearance varies between garages. Tell dispatch the posted height limit and which level you're on so we can send a suitable truck.",
	},
	{
		q: "How fast can you get to me?",
		a: DISPATCH_MESSAGE.full,
	},
	{
		q: "Do I have to pay for accident towing in Ontario?",
		a: "Coverage depends on your policy and the circumstances of the claim. Ask your insurer or broker what your policy covers for towing and storage. Whoever pays, you're entitled to an itemized invoice before payment.",
	},
	{
		q: "Do you tow AWD and luxury vehicles?",
		a: "Yes. Flatbed towing keeps all four wheels off the ground and is commonly preferred for AWD and many 4WD vehicles. Tell us your drivetrain when you call.",
	},
] as const;

const HeroSection = () => (
	<section className="hero-section">
		<div className="hero-overlay" />
		<Container className="position-relative">
			{/* Decorative branding — the only animated part of the hero. */}
			<div aria-hidden="true">
				<Stack direction="horizontal" gap={3} className="justify-content-center mb-2">
					{"PIXEL".split("").map((letter, i) => (
						<span key={i} className="display-1 fw-bold pixel-letter-css">
							{letter}
						</span>
					))}
				</Stack>
				<div className="h2 fw-light text-warning towing-reveal" style={{ letterSpacing: "5px" }}>
					TOWING SERVICE
				</div>
			</div>

			<div className="mt-4">
				<h1 className="fw-bold text-white mb-4">24/7 Tow Truck & Roadside Assistance in Brampton</h1>
				<p className="lead mb-5 text-white-50 mx-auto" style={{ maxWidth: "42rem" }}>
					Emergency towing, accident towing, flatbed towing and roadside assistance across
					Brampton and the GTA. {DISPATCH_MESSAGE.short}.
				</p>
				<Stack gap={3} className="justify-content-center align-items-center flex-md-row">
					<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill px-5 py-3 shadow-lg">
						<Phone className="me-2" />
						{BUSINESS.phoneDisplay} — Call Now
					</Button>
					<Link to="/services" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3">
						Towing and roadside services
					</Link>
				</Stack>
				<div className="mt-4 d-flex justify-content-center gap-4 flex-wrap text-white-50 small">
					<span>✅ Licensed & Insured</span>
					<span>✅ Available 24/7</span>
					<span>✅ Card, Debit or Cash</span>
				</div>
			</div>
		</Container>
	</section>
);

const ONE_CALL_CARDS = [
	{
		icon: Truck,
		color: "#FBBF24",
		title: "We Tow You",
		text: "Flatbed and wheel-lift trucks for most vehicle types, 24/7, to the destination you choose.",
	},
	{
		icon: Shield,
		color: "#3B82F6",
		title: "Collision Reporting",
		text: "If your vehicle can't be driven, we can take it to a Collision Reporting Centre so you can file your report.",
	},
	{
		icon: Wrench,
		color: "#10B981",
		title: "Collision Repair",
		text: "Repairs at a collision facility we have an interest in, or at any shop you prefer.",
	},
	{
		icon: Award,
		color: "#8B5CF6",
		title: "Rental Vehicles",
		text: "Rental vehicles available through a business we have an interest in, subject to availability and your coverage.",
	},
] as const;

const RightsCallout = () => (
	<div className="mt-5 p-4 rounded-4 border border-warning" style={{ background: "rgba(251,191,36,0.06)" }}>
		<h3 className="h5 fw-bold mb-3">Your choices after a collision in Ontario</h3>
		<ul className="text-secondary mb-3">
			<li>
				<strong>Towing:</strong> outside the provincial highway tow zones, you choose the tow
				company and destination, and the operator needs your consent before towing.{" "}
				<Link to="/blog/ontario-towing-laws-driver-rights">Ontario towing laws explained</Link>.
			</li>
			<li>
				<strong>Repairs and rentals:</strong> FSRA says that as long as your insurer approves the
				estimate, you may use the repair shop of your choice, and you can choose your rental
				company. What your insurer pays depends on your policy.
			</li>
		</ul>
		<TowZoneNotice />
	</div>
);

const OneCallSection = () => (
	<section className="py-5 bg-white">
		<Container>
			<div className="text-center mb-5">
				<h2 className="display-5 fw-bold">One Call. Tow, Repair, Rental.</h2>
				<p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
					After a collision, we can coordinate the tow, the repair and a rental — or just the
					tow, if you'd rather use your own shop.
				</p>
			</div>
			<Row className="g-4">
				{ONE_CALL_CARDS.map(card => (
					<Col md={3} key={card.title}>
						<Card className="p-4 border-0 h-100 shadow-sm text-center" style={{ borderTop: `4px solid ${card.color}` }}>
							<card.icon size={48} style={{ color: card.color }} className="mx-auto mb-3" />
							<h3 className="h5 fw-bold">{card.title}</h3>
							<p className="text-muted small mb-0">{card.text}</p>
						</Card>
					</Col>
				))}
			</Row>
			{/* Ontario tow operators must disclose an interest in a facility they refer customers to. */}
			<p className="text-muted small mt-4 mb-0">
				Disclosure: Pixel Towing has an ownership and operating interest in the collision repair
				facility and rental fleet described above. You are free to choose a different repair shop
				or rental provider. <Link to={ACCIDENT_RECOVERY.path} className="text-muted">Read our full disclosure</Link>.
			</p>
			<RightsCallout />
		</Container>
	</section>
);

const ServicesSection = () => (
	<section className="py-5 bg-white services-section border-top">
		<Container>
			<div className="text-center mb-5">
				<h2 className="display-5 fw-bold">Core Towing Services</h2>
			</div>
			<Row xs={1} lg={3} className="g-4">
				{HOME_SERVICES.map(service => (
					<Col key={service.link}>
						<Link to={service.link} className="text-decoration-none h-100 d-block">
							<Card className="h-100 border-0 text-white text-center rounded-4 position-relative">
								<Card.Img
									src={service.image.src}
									alt={service.image.alt}
									width={service.image.width}
									height={service.image.height}
									className="service-card-img rounded-4"
									loading="lazy"
								/>
								<Card.ImgOverlay className="d-flex flex-column justify-content-end p-4">
									<div className="bg-dark bg-opacity-50 rounded-3 p-3">
										<service.icon size={36} className="mb-2 text-warning mx-auto" />
										<h3 className="h4 fw-bold text-white">{service.title}</h3>
										<p className="text-white-50 mb-2 small d-none d-sm-block">{service.description}</p>
										<span className="fw-bold text-warning small">
											{service.anchor} <ArrowRight size={14} />
										</span>
									</div>
								</Card.ImgOverlay>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
			<div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
				{SERVICE_SLUGS.map(slug => (
					<Link key={slug} to={servicePath(slug)} className="btn btn-sm btn-outline-dark rounded-pill">
						{SERVICE_LINKS[slug].anchor}
					</Link>
				))}
			</div>
		</Container>
	</section>
);

const ServiceAreasSection = () => (
	<section className="py-5 bg-light">
		<Container>
			<div className="text-center mb-5">
				<MapPin size={36} className="text-warning mb-3" />
				<h2 className="fw-bold display-6">Towing Service Areas Near Brampton</h2>
				<p className="text-muted">Brampton-based, serving Peel Region and nearby communities.</p>
			</div>
			<Row xs={2} md={3} className="g-3">
				{CITY_SLUGS.map(slug => (
					<Col key={slug}>
						<Link to={`/locations/${slug}`} className="text-decoration-none">
							<Card className="area-card border-0 shadow-sm h-100 p-3 text-center bg-white">
								<div className="fw-bold text-dark">Tow truck in {CITIES[slug].name}</div>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
			<div className="text-center mt-4">
				<Link to="/locations" className="btn btn-outline-dark rounded-pill px-4">
					All towing service areas
				</Link>
			</div>
		</Container>
	</section>
);

const ReviewsSection = () => (
	<section className="py-5 bg-white">
		<Container className="text-center">
			<Star size={36} className="text-warning mb-3" fill="currentColor" />
			<h2 className="display-6 fw-bold">See Our Latest Customer Reviews on Google</h2>
			<p className="text-muted mb-4">Read what customers say about us on our Google Business Profile.</p>
			<Stack direction="horizontal" gap={3} className="justify-content-center flex-wrap">
				<Button
					href={BUSINESS.googleProfileUrl}
					target="_blank"
					rel="noopener noreferrer"
					variant="warning"
					className="rounded-pill px-4 fw-bold"
				>
					Read Pixel Towing reviews on Google
				</Button>
				<Link to="/review" className="btn btn-outline-dark rounded-pill px-4">
					Leave a review
				</Link>
			</Stack>
		</Container>
	</section>
);

const FaqSection = () => (
	<section className="py-5 bg-light">
		<Container>
			<h2 className="fw-bold display-6 text-center mb-5">Brampton Towing — Frequently Asked Questions</h2>
			<Row className="justify-content-center">
				<Col md={10} lg={8}>
					<Accordion flush>
						{FAQS.map((faq, i) => (
							<Accordion.Item eventKey={String(i)} key={faq.q}>
								<Accordion.Header as="h3">{faq.q}</Accordion.Header>
								<Accordion.Body>{faq.a}</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				</Col>
			</Row>
		</Container>
	</section>
);

const BLOG_TEASERS = [
	{
		badge: "Know Your Rights",
		bg: "warning",
		title: "What To Do After a Car Accident in Brampton",
		text: "Safety, collision reporting, towing and your insurance claim — step by step.",
		to: "/blog/what-to-do-after-car-accident-brampton",
		anchor: "What to do after a Brampton accident",
	},
	{
		badge: "Ontario Law",
		bg: "primary",
		title: "Ontario Towing Laws: Your Rights Under the TSSEA",
		text: "Consent, maximum rates, invoices, payment and tow zones explained.",
		to: "/blog/ontario-towing-laws-driver-rights",
		anchor: "Ontario towing laws and your rights",
	},
	{
		badge: "Car Tips",
		bg: "success",
		title: "Dead Battery vs Bad Alternator",
		text: "How to tell which one you're dealing with before you buy parts.",
		to: "/blog/dead-battery-vs-bad-alternator",
		anchor: "Dead battery vs alternator",
	},
] as const;

const BlogTeaserSection = () => (
	<section className="py-5 bg-white border-top">
		<Container>
			<div className="text-center mb-4">
				<h2 className="fw-bold h3">Towing Tips & Driver Resources</h2>
			</div>
			<Row className="g-4 justify-content-center">
				{BLOG_TEASERS.map(post => (
					<Col md={4} key={post.to}>
						<Card className="border-0 shadow-sm h-100 rounded-4">
							<Card.Body className="p-4">
								<span className={`badge bg-${post.bg} ${post.bg === "warning" ? "text-dark" : ""} mb-2`}>{post.badge}</span>
								<h3 className="h5 fw-bold">{post.title}</h3>
								<p className="text-muted small">{post.text}</p>
								<Link to={post.to} className="btn btn-sm btn-outline-dark rounded-pill">
									{post.anchor} →
								</Link>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	</section>
);

const AboutBlock = () => (
	<section className="py-5 bg-light border-top">
		<Container>
			<Row>
				<Col lg={10} className="mx-auto">
					<h2 className="fw-bold mb-4">A Local Brampton Towing Company</h2>
					<p className="text-secondary mb-3">
						Pixel Towing is a locally owned towing and roadside assistance company based in
						Brampton, serving Mississauga, Caledon, Halton Hills, Georgetown and the wider GTA.
						After a collision we can handle the tow and, if you want, coordinate repairs and a
						rental through businesses we have an interest in — or take your vehicle wherever you
						choose.
					</p>
					<p className="text-secondary mb-0">
						Need <Link to={ACCIDENT_RECOVERY.path}>accident towing in Brampton</Link>,{" "}
						<Link to={servicePath("vehicle-transport")}>flatbed towing for AWD vehicles</Link>, or a{" "}
						<Link to={servicePath("lockout")}>car lockout service</Link>? Call{" "}
						<a href={BUSINESS.phoneHref} className="fw-bold text-dark">
							{BUSINESS.phoneDisplay}
						</a>{" "}
						any time.
					</p>
				</Col>
			</Row>
		</Container>
	</section>
);

const FinalCta = () => (
	<section className="py-5 contact-section-bg text-center text-white bg-dark">
		<Container>
			<h2 className="display-4 fw-bold mb-3">Need a Tow? Call 24/7.</h2>
			<p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
				{DISPATCH_MESSAGE.full}
			</p>
			<Stack gap={3} direction="horizontal" className="justify-content-center flex-wrap">
				<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg">
					<Phone className="me-2" /> Call {BUSINESS.phoneDisplay}
				</Button>
				<Button
					href={BUSINESS.whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					variant="outline-light"
					size="lg"
					className="fw-bold rounded-pill px-5 py-3"
				>
					WhatsApp Dispatch
				</Button>
			</Stack>
		</Container>
	</section>
);

const Home = () => (
	<div className="bg-light">
		<SEO
			title="24/7 Tow Truck Brampton | Roadside & Towing | Pixel Towing"
			description="24/7 tow truck in Brampton — emergency towing, accident towing, flatbed towing and roadside assistance across the GTA. Call 647-673-9755."
			canonical={`${SITE_ORIGIN}/`}
		/>
		<HeroSection />
		<OneCallSection />
		<ServicesSection />
		<ServiceAreasSection />
		<ReviewsSection />
		<FaqSection />
		<BlogTeaserSection />
		<AboutBlock />
		<FinalCta />
	</div>
);

export default Home;
