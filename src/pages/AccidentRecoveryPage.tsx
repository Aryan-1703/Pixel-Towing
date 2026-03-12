import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Accordion,
	Stack,
	Badge,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
	Phone,
	CheckCircle,
	ShieldAlert,
	Car,
	Wrench,
	Star,
	AlertTriangle,
	FileText,
	DollarSign,
	Award,
	MessageSquare,
} from "lucide-react";
import SEO from "../components/SEO";

import accidentImg from "../assets/tow-truck-accident-recovery-brampton.jpg";
import towingImg from "../assets/flatbed-towing-brampton.jpg";

// ============================================================
// COLLISION SCHEMA — maximum rich snippet coverage
// ============================================================
const collisionSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "AutoBodyShop",
			"@id": "https://pixeltowing.com/accident-recovery#bodyshop",
			name: "Pixel Towing & Collision Centre",
			telephone: "+16476739755",
			url: "https://pixeltowing.com/accident-recovery",
			image: "https://pixeltowing.com/tow.png",
			priceRange: "$$",
			description:
				"Full-service accident recovery, collision repair, OEM parts, deductible assistance, and same-day rental cars in Brampton and the GTA. We handle the entire insurance process for you.",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Brampton",
				addressRegion: "ON",
				addressCountry: "CA",
			},
			areaServed: [
				{ "@type": "City", name: "Brampton" },
				{ "@type": "City", name: "Mississauga" },
				{ "@type": "City", name: "Toronto" },
				{ "@type": "City", name: "Caledon" },
				{ "@type": "City", name: "Etobicoke" },
				{ "@type": "City", name: "Vaughan" },
				{ "@type": "City", name: "Halton Hills" },
			],
			hasOfferCatalog: {
				"@type": "OfferCatalog",
				name: "Collision & Accident Recovery Services",
				itemListElement: [
					{
						"@type": "Offer",
						itemOffered: { "@type": "Service", name: "Accident Towing & Recovery" },
					},
					{
						"@type": "Offer",
						itemOffered: { "@type": "Service", name: "Collision Repair with OEM Parts" },
					},
					{
						"@type": "Offer",
						itemOffered: { "@type": "Service", name: "Deductible Assistance Program" },
					},
					{
						"@type": "Offer",
						itemOffered: { "@type": "Service", name: "Same-Day Rental Car" },
					},
					{
						"@type": "Offer",
						itemOffered: { "@type": "Service", name: "Total Loss Claim Advocacy" },
					},
					{
						"@type": "Offer",
						itemOffered: { "@type": "Service", name: "Lifetime Warranty on Repairs" },
					},
				],
			},
		},
		{
			"@type": "FAQPage",
			"@id": "https://pixeltowing.com/accident-recovery#faq",
			mainEntity: [
				{
					"@type": "Question",
					name: "Is my deductible waived if I use Pixel Towing's bodyshop?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "In many cases, yes — partially or fully. Through our insurer relationships and repair volume, we are able to assist with deductible costs in qualifying claims. Call us to discuss your specific situation.",
					},
				},
				{
					"@type": "Question",
					name: "Do I have to use my insurance company's preferred shop after an accident?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "No. Under Ontario insurance regulations, you have the legal right to choose any licensed collision repair facility. Your insurer can recommend a shop but cannot force you to use it.",
					},
				},
				{
					"@type": "Question",
					name: "What does OEM parts repair mean?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "OEM (Original Equipment Manufacturer) parts are the exact same components your car was built with at the factory. They maintain your vehicle's safety ratings, fit, and resale value. Many insurance-preferred shops use aftermarket alternatives to reduce costs — we use OEM parts as standard.",
					},
				},
				{
					"@type": "Question",
					name: "My car might be a total loss — what should I do?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Don't accept the first offer from insurance. Total loss valuations are negotiable. We help clients understand the fair market value of their vehicle and advocate for a higher payout when the initial offer is below market. Call us before signing anything.",
					},
				},
			],
		},
	],
};

// ============================================================
// WHAT WE OFFER — the full collision advantage list
// ============================================================
const COLLISION_ADVANTAGES = [
	{
		icon: Award,
		color: "text-warning",
		title: "Lifetime Warranty on All Repairs",
		desc: "Every repair at our bodyshop carries a lifetime workmanship warranty. Paint, panels, structural work — if it ever fails due to our repair, we fix it at no cost. No other shop in Brampton matches this.",
	},
	{
		icon: DollarSign,
		color: "text-success",
		title: "Deductible Assistance (Waived or Reduced)",
		desc: "In many qualifying claims, we are able to assist with your deductible — partially or fully. This is legitimate, legal, and based on our relationships with insurers and repair volume. Ask us about your eligibility when you call.",
	},
	{
		icon: Wrench,
		color: "text-primary",
		title: "OEM Parts Only — Not Aftermarket",
		desc: "Insurance-preferred shops often use aftermarket parts to keep costs down. We use Original Equipment Manufacturer parts exclusively — the same parts your car was built with. This protects your safety ratings and resale value.",
	},
	{
		icon: Car,
		color: "text-purple",
		title: "Same-Day Rental Car From Our Own Fleet",
		desc: "We operate our own rental fleet. While insurance pre-authorization typically takes 24–48 hours, we put you in a vehicle the same day you call — and handle the billing with insurance afterward.",
	},
	{
		icon: FileText,
		color: "text-danger",
		title: "Total Loss Advocacy — Fight for Fair Market Value",
		desc: "If your vehicle is written off, the first offer from insurance is rarely the best offer. We review your vehicle's actual market value, comparable sales, and pre-accident condition to help you negotiate a fair payout. Don't sign anything until you've talked to us.",
	},
	{
		icon: ShieldAlert,
		color: "text-warning",
		title: "Collision Reporting Centre — We Go With You",
		desc: "We don't drop your car and leave. We tow you to the CRC at 7750 Hurontario St, wait with you, and help you complete the report correctly. How your CRC report is written affects your claim — this matters.",
	},
];

const PROCESS_STEPS = [
	{
		num: "01",
		title: "Call Us First — Before Insurance",
		desc: "You have the legal right to choose your tow company and your repair shop. Call 647-673-9755. We arrive in 15–20 minutes and take control of the scene so you don't have to.",
	},
	{
		num: "02",
		title: "We Secure Your Vehicle & Handle the CRC",
		desc: "We tow your vehicle safely and accompany you through the Collision Reporting Centre process. Your report is filed correctly the first time.",
	},
	{
		num: "03",
		title: "Rental Car Same Day",
		desc: "You need to get to work and get on with your life. We get you into a rental from our own fleet the same day — no waiting for insurance to pre-authorize.",
	},
	{
		num: "04",
		title: "Repair Assessment & Insurance Coordination",
		desc: "Our estimator assesses the damage and builds the repair file. We communicate directly with your adjuster — you don't spend hours on hold with insurance.",
	},
	{
		num: "05",
		title: "Repair With OEM Parts + Deductible Discussion",
		desc: "Repairs begin using manufacturer-original parts. We discuss deductible assistance options with you based on your claim. Lifetime warranty applies to all work.",
	},
	{
		num: "06",
		title: "You Pick Up a Fully Restored Vehicle",
		desc: "Your car is returned to pre-accident condition, detailed, and ready. If the repair ever fails, the lifetime warranty means we fix it — no argument.",
	},
];

const FAQS = [
	{
		q: "Do I have to use my insurance company's preferred shop?",
		a: "No — this is one of the most important things to know after an accident in Ontario. Your insurer can recommend a 'preferred' collision centre, but cannot legally require you to use it. You have the right to choose any licensed repair facility. Preferred shops work within insurance-negotiated rates, which often means aftermarket parts and timelines that suit the insurer, not you. We work in your interest.",
	},
	{
		q: "Is my deductible really waived or reduced?",
		a: "In many qualifying cases, yes. Through our insurer relationships and repair volume, we can assist with deductible costs on qualifying claims — this is a legitimate program and not out of pocket for the insurer. Eligibility depends on your specific claim and insurer. Call us and we'll tell you immediately if you qualify.",
	},
	{
		q: "What's the difference between OEM and aftermarket parts?",
		a: "OEM (Original Equipment Manufacturer) parts are made by or for your car's manufacturer — the exact same parts it left the factory with. Aftermarket parts are made by third parties to fit your car. They're cheaper, which is why insurance-preferred shops use them. The difference shows in fit, finish, longevity, and sometimes in safety ratings. We use OEM parts as standard on every repair.",
	},
	{
		q: "My car might be a total loss. What should I do?",
		a: "First — don't accept the first offer insurance gives you. Total loss valuations are negotiable and the initial offer is often below actual market value. We review your vehicle's real market comparables, pre-accident condition, recent upgrades, and low mileage factors to build a case for a higher payout. We've helped clients receive significantly more than the opening offer. Call us before signing anything.",
	},
	{
		q: "Can I get a rental car immediately after my accident?",
		a: "Yes. Because we operate our own rental fleet, we can put you in a vehicle the same day you call — often within a few hours of your accident. When insurance arranges a rental, the pre-authorization process typically takes 24–48 business hours. We skip that by handling the billing with insurance after the fact.",
	},
	{
		q: "What does the lifetime warranty actually cover?",
		a: "Our lifetime workmanship warranty covers all repairs performed at our bodyshop — paint, body panels, structural repairs, and part installations. If any covered repair fails or shows defects due to our work, we repair it at no charge to you, for as long as you own the vehicle. This is transferable to a new owner if you sell the car, which also protects resale value.",
	},
	{
		q: "How long will my car repair take?",
		a: "Repair time depends on damage severity and parts availability. Minor to moderate damage typically takes 5–10 business days. We keep you updated throughout and provide a rental car for the full duration so you're never without transportation.",
	},
	{
		q: "Do you handle all insurance companies in Ontario?",
		a: "Yes. We work directly with all major Ontario insurers including Intact, Aviva, Belair Direct, TD Insurance, Economical, Desjardins, CAA, Gore Mutual, and others. We submit the repair file and invoice directly — you don't have to chase anyone.",
	},
	{
		q: "What if the other driver was at fault?",
		a: "If the other driver was at fault, their insurance (via DCPD — Direct Compensation Property Damage) covers your repairs. This doesn't change anything about your right to choose your shop, your rental, or your tow company. Call us and we handle the coordination regardless of fault.",
	},
	{
		q: "Is this only for cars or do you handle trucks and SUVs too?",
		a: "We handle all passenger vehicles — sedans, SUVs, pickup trucks, minivans, luxury vehicles, and leased vehicles. For commercial trucks or fleet vehicles, call us to discuss your specific requirements.",
	},
];

// ============================================================
// COMPONENT
// ============================================================
const AccidentRecoveryPage = () => {
	return (
		<div style={{ paddingTop: "76px" }}>
			<SEO
				title="Accident Recovery Brampton | Deductible Waived | OEM Parts | Pixel Towing"
				description="Got into an accident in Brampton or GTA? Pixel Towing handles towing, collision repair with OEM parts, deductible assistance, same-day rental & total loss advocacy. Lifetime warranty. Call 647-673-9755."
				canonical="https://pixeltowing.com/accident-recovery"
			/>

			<Helmet>
				<script type="application/ld+json">{JSON.stringify(collisionSchema)}</script>
			</Helmet>

			{/* ======== HERO ======== */}
			<section
				className="text-white"
				style={{
					background: `linear-gradient(rgba(10,14,30,0.88), rgba(10,14,30,0.88)), url(${accidentImg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					paddingTop: "5rem",
					paddingBottom: "5rem",
				}}
			>
				<Container>
					<Row className="align-items-center g-5">
						<Col lg={7}>
							<Badge bg="warning" text="dark" className="rounded-pill mb-3 px-3 py-2">
								GTA's #1 Full-Service Collision Centre
							</Badge>
							<h1 className="display-4 fw-bold mb-4 lh-sm">
								Accident in Brampton or GTA?
								<br />
								<span style={{ color: "#FBBF24" }}>One Call Handles Everything.</span>
							</h1>
							<p className="lead text-white-50 mb-4">
								Tow Truck → Collision Reporting → Bodyshop Repair → Rental Car. All under
								one roof. OEM parts. Lifetime warranty. Deductible assistance available.
								Your insurance pays — you choose where your car goes.
							</p>

							{/* Quick benefit pills */}
							<div className="d-flex flex-wrap gap-2 mb-5">
								{[
									"✅ Deductible Waived/Reduced",
									"✅ OEM Parts — Not Aftermarket",
									"✅ Lifetime Warranty",
									"✅ Same-Day Rental Car",
									"✅ Total Loss Advocacy",
									"✅ All Ontario Insurers Accepted",
								].map(b => (
									<span
										key={b}
										className="badge bg-white text-dark px-3 py-2 rounded-pill fw-normal"
									>
										{b}
									</span>
								))}
							</div>

							<Stack gap={3} direction="horizontal" className="flex-wrap">
								<Button
									href="tel:+16476739755"
									variant="warning"
									size="lg"
									className="fw-bold rounded-pill px-5 py-3 shadow-lg"
								>
									<Phone size={20} className="me-2" />
									Call Now — 647-673-9755
								</Button>
								<Button
									href="https://wa.link/sq54ln"
									target="_blank"
									variant="outline-light"
									size="lg"
									className="fw-bold rounded-pill px-4 py-3"
								>
									<MessageSquare size={18} className="me-2" />
									WhatsApp Us
								</Button>
							</Stack>

							<p className="text-white-50 small mt-3">
								⚡ 15-min response · 24/7 · All Peel Region & GTA
							</p>
						</Col>

						<Col lg={5}>
							<Card className="border-0 rounded-4 shadow-lg p-4 bg-white">
								<h3 className="h5 fw-bold mb-4 text-dark text-center">
									🚗 Just Had an Accident?
								</h3>
								<Stack gap={3}>
									{[
										{ icon: "1️⃣", text: "Stay calm — check for injuries" },
										{ icon: "2️⃣", text: "Move to safety & turn on hazards" },
										{ icon: "3️⃣", text: "Call 647-673-9755 — we come to you" },
										{ icon: "4️⃣", text: "Don't sign anything from other trucks" },
										{ icon: "5️⃣", text: "We handle the CRC, rental & repairs" },
									].map(step => (
										<div key={step.icon} className="d-flex align-items-center gap-3">
											<span style={{ fontSize: "1.4rem" }}>{step.icon}</span>
											<span className="text-dark fw-medium">{step.text}</span>
										</div>
									))}
								</Stack>
								<hr />
								<div className="text-center">
									<div className="text-muted small mb-1">Dispatch available 24/7</div>
									<a
										href="tel:+16476739755"
										className="h4 fw-bold text-dark text-decoration-none"
									>
										647-673-9755
									</a>
								</div>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* ======== THE FULL ADVANTAGE LIST ======== */}
			<section className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold">
							Why Accident Victims Choose Pixel Towing
						</h2>
						<p className="lead text-muted mx-auto" style={{ maxWidth: "640px" }}>
							We're not just a tow company. We're a full collision solution — and every
							advantage below is available to you the moment you call.
						</p>
					</div>
					<Row xs={1} md={2} lg={3} className="g-4">
						{COLLISION_ADVANTAGES.map((item, i) => (
							<Col key={i}>
								<Card className="border-0 shadow-sm h-100 rounded-4 p-4">
									<item.icon size={40} className={`${item.color} mb-3`} />
									<h3 className="h5 fw-bold mb-2">{item.title}</h3>
									<p className="text-muted small mb-0">{item.desc}</p>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* ======== YOUR RIGHTS SECTION ======== */}
			<section className="py-5" style={{ background: "#0f172a" }}>
				<Container>
					<Row className="align-items-center g-5">
						<Col lg={6}>
							<Badge bg="warning" text="dark" className="rounded-pill mb-3">
								Ontario Law
							</Badge>
							<h2 className="display-6 fw-bold text-white mb-4">
								Your Insurance Company Cannot Tell You Which Shop to Use
							</h2>
							<p className="text-white-50 mb-3">
								This is the most important thing to know after a collision in Ontario.
								Under provincial insurance regulations, your insurer can <em>suggest</em>{" "}
								a preferred collision centre — but they cannot legally require you to use
								it. You have the right to choose any licensed shop. That right is yours
								regardless of your policy type, your insurer, or what you're told at the
								scene.
							</p>
							<p className="text-white-50 mb-4">
								Insurance-preferred shops operate on insurer-negotiated rates. That
								structure incentivizes lower repair costs — which can mean non-OEM parts,
								shortcuts on structural work, and a process designed for the insurer's
								convenience, not yours.
							</p>
							<div className="d-flex flex-column gap-3">
								{[
									"You choose the tow company — not insurance dispatch",
									"You choose the repair shop — not their preferred facility",
									"You choose the rental company — not their approved vendor",
									"You negotiate the total loss value — don't accept the first offer",
								].map(right => (
									<div key={right} className="d-flex align-items-start gap-3">
										<CheckCircle size={20} className="text-warning mt-1 flex-shrink-0" />
										<span className="text-white">{right}</span>
									</div>
								))}
							</div>
						</Col>
						<Col lg={6}>
							<img
								src={towingImg}
								alt="Pixel Towing flatbed tow truck recovering accident vehicle in Brampton GTA"
								className="img-fluid rounded-4 shadow-lg"
								loading="lazy"
							/>
						</Col>
					</Row>
				</Container>
			</section>

			{/* ======== HOW IT WORKS — 6 STEPS ======== */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-6 fw-bold">
							How Our Accident-to-Repair Process Works
						</h2>
						<p className="text-muted">
							From the crash scene to your restored vehicle — we handle every step.
						</p>
					</div>
					<Row xs={1} md={2} lg={3} className="g-4">
						{PROCESS_STEPS.map(step => (
							<Col key={step.num}>
								<Card className="border-0 shadow-sm h-100 rounded-4 p-4 bg-white">
									<div
										className="fw-bold mb-3"
										style={{ fontSize: "2.5rem", color: "#FBBF24", lineHeight: 1 }}
									>
										{step.num}
									</div>
									<h3 className="h5 fw-bold mb-2">{step.title}</h3>
									<p className="text-muted small mb-0">{step.desc}</p>
								</Card>
							</Col>
						))}
					</Row>
					<div className="text-center mt-5">
						<Button
							href="tel:+16476739755"
							variant="dark"
							size="lg"
							className="fw-bold rounded-pill px-5 py-3 shadow"
						>
							<Phone size={20} className="me-2" />
							Start the Process — Call 647-673-9755
						</Button>
					</div>
				</Container>
			</section>

			{/* ======== TOTAL LOSS SECTION ======== */}
			<section className="py-5 bg-white">
				<Container>
					<Row className="justify-content-center">
						<Col lg={9}>
							<Card
								className="border-0 rounded-4 shadow-lg p-5"
								style={{ borderLeft: "5px solid #EF4444" }}
							>
								<div className="d-flex align-items-center mb-4 gap-3">
									<AlertTriangle size={40} className="text-danger flex-shrink-0" />
									<h2 className="h3 fw-bold mb-0">
										Car a Total Loss? Don't Accept the First Offer.
									</h2>
								</div>
								<p className="text-secondary mb-3">
									When insurance declares your vehicle a total loss, they calculate a
									settlement based on their own valuation method. That first offer is a
									starting point — not a final answer. Insurers routinely undervalue
									vehicles by failing to account for:
								</p>
								<Row className="mb-4">
									{[
										"Recent upgrades or aftermarket features",
										"Low mileage relative to vehicle age",
										"Documented maintenance history",
										"Local market comparables above average",
										"Pre-accident condition (new tires, brakes, etc.)",
										"Replacement cost vs. depreciated book value",
									].map(item => (
										<Col key={item} sm={6} className="mb-2">
											<div className="d-flex align-items-start gap-2">
												<CheckCircle
													size={16}
													className="text-success mt-1 flex-shrink-0"
												/>
												<span className="text-secondary small">{item}</span>
											</div>
										</Col>
									))}
								</Row>
								<p className="text-secondary mb-4">
									We've helped clients in Brampton and the GTA receive significantly more
									than the initial total loss offer by building a proper valuation case.
									<strong> Call us before you sign the total loss settlement.</strong>
								</p>
								<Button
									href="tel:+16476739755"
									variant="danger"
									className="fw-bold rounded-pill px-5"
									size="lg"
								>
									<Phone size={18} className="me-2" />
									Talk to Us Before You Sign — 647-673-9755
								</Button>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* ======== DEDUCTIBLE SECTION ======== */}
			<section className="py-5 bg-light">
				<Container>
					<Row className="justify-content-center">
						<Col lg={9}>
							<Card
								className="border-0 rounded-4 shadow-lg p-5"
								style={{ borderLeft: "5px solid #10B981" }}
							>
								<div className="d-flex align-items-center mb-4 gap-3">
									<DollarSign size={40} className="text-success flex-shrink-0" />
									<h2 className="h3 fw-bold mb-0">
										Deductible Waived or Reduced — Ask Us How
									</h2>
								</div>
								<p className="text-secondary mb-3">
									One of the biggest pain points after an accident is the deductible — the
									amount you pay out of pocket before insurance covers the rest. Standard
									deductibles in Ontario typically run $500–$1,000 or more.
								</p>
								<p className="text-secondary mb-4">
									Through our insurer relationships and repair volume, we are able to
									assist qualifying clients with their deductible — either fully waiving
									it or reducing it significantly. This is a legitimate program available
									to clients who bring their vehicle to our bodyshop. Eligibility depends
									on your claim type and insurer. Call us and we'll tell you within
									minutes if your claim qualifies.
								</p>
								<div className="d-flex flex-wrap gap-3">
									<Button
										href="tel:+16476739755"
										variant="success"
										className="fw-bold rounded-pill px-5"
										size="lg"
									>
										<Phone size={18} className="me-2" />
										Check Your Deductible Eligibility — Free Call
									</Button>
									<Button
										href="https://wa.link/sq54ln"
										target="_blank"
										variant="outline-success"
										className="fw-bold rounded-pill px-4"
										size="lg"
									>
										WhatsApp to Ask
									</Button>
								</div>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* ======== FAQ ======== */}
			<section className="py-5 bg-white">
				<Container>
					<Row className="justify-content-center">
						<Col lg={9}>
							<h2 className="fw-bold text-center mb-2">
								Collision & Accident Recovery FAQ
							</h2>
							<p className="text-muted text-center mb-5">
								Everything you need to know — answered honestly.
							</p>
							<Accordion flush className="border rounded-4 overflow-hidden">
								{FAQS.map((faq, i) => (
									<Accordion.Item eventKey={String(i)} key={i}>
										<Accordion.Header>{faq.q}</Accordion.Header>
										<Accordion.Body className="text-secondary lh-lg">
											{faq.a}
										</Accordion.Body>
									</Accordion.Item>
								))}
							</Accordion>
						</Col>
					</Row>
				</Container>
			</section>

			{/* ======== SERVICE AREAS FOR THIS PAGE ======== */}
			<section className="py-4 bg-light border-top">
				<Container>
					<h3 className="h5 fw-bold text-center mb-3">
						Accident Recovery & Collision Repair — All GTA Areas
					</h3>
					<p className="text-center text-muted small mb-4">
						We respond to accident scenes and provide full collision repair services
						across:
					</p>
					<div className="d-flex flex-wrap justify-content-center gap-2">
						{[
							{ name: "Brampton", path: "/" },
							{ name: "Mississauga", path: "/locations/mississauga" },
							{ name: "Caledon", path: "/locations/caledon" },
							{ name: "Etobicoke", path: "/locations/etobicoke" },
							{ name: "Vaughan", path: "/locations/vaughan" },
							{ name: "Toronto", path: "/locations/toronto" },
							{ name: "Georgetown", path: "/locations/georgetown" },
							{ name: "Halton Hills", path: "/locations/halton-hills" },
							{ name: "Acton", path: "/locations/acton" },
							{ name: "Erin", path: "/locations/erin" },
						].map(area => (
							<Link
								key={area.path}
								to={area.path}
								className="btn btn-sm btn-outline-secondary rounded-pill"
							>
								{area.name}
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* ======== SEO TEXT BLOCK ======== */}
			<section className="py-5 bg-white border-top">
				<Container>
					<Row className="justify-content-center">
						<Col lg={9}>
							<h2 className="fw-bold mb-4">
								Brampton & GTA's Collision Repair Experts — Tow, Repair, Rental Under One
								Roof
							</h2>
							<p className="text-secondary mb-3">
								Pixel Towing is not just a tow truck company. We are Brampton's only
								full-service accident solution — combining a 24/7 tow truck fleet, a
								certified collision repair bodyshop, and our own rental car fleet under
								one operation. When you're in an accident anywhere in the GTA, one call to{" "}
								<a href="tel:+16476739755" className="fw-bold text-dark">
									647-673-9755
								</a>{" "}
								puts all of that in motion simultaneously.
							</p>
							<p className="text-secondary mb-3">
								We built this model because we saw how the standard process fails drivers:
								insurance dispatches a tow company to an insurance-preferred shop, repairs
								are done with aftermarket parts to save money for the insurer, the rental
								takes two days to arrange, and the driver — who just went through
								something stressful — has to coordinate between three different companies
								while their car sits. We eliminated that entirely.
							</p>
							<p className="text-secondary mb-3">
								Every vehicle we repair leaves our shop with a{" "}
								<strong>lifetime workmanship warranty</strong>. We use{" "}
								<strong>OEM (Original Equipment Manufacturer) parts</strong> exclusively —
								the same components your car was built with. We work directly with every
								major Ontario insurer to handle billing so you're not chasing anyone. And
								through our deductible assistance program, many clients pay little to
								nothing out of pocket.
							</p>
							<p className="text-secondary mb-3">
								If your vehicle has been declared a{" "}
								<Link
									to="/blog/total-loss-vehicle-ontario-guide"
									className="text-decoration-underline text-secondary"
								>
									total loss
								</Link>
								, we advocate on your behalf for a fair market valuation — because the
								first offer from insurance rarely is one. We've helped drivers across{" "}
								<Link
									to="/locations/mississauga"
									className="text-decoration-underline text-secondary"
								>
									Mississauga
								</Link>
								,{" "}
								<Link
									to="/locations/caledon"
									className="text-decoration-underline text-secondary"
								>
									Caledon
								</Link>
								,{" "}
								<Link
									to="/locations/etobicoke"
									className="text-decoration-underline text-secondary"
								>
									Etobicoke
								</Link>
								, and the rest of the GTA get meaningfully more than their opening
								settlement.
							</p>
							<p className="text-secondary">
								Whether you're searching for <strong>collision repair near me</strong>,{" "}
								<strong>accident towing Brampton</strong>,{" "}
								<strong>bodyshop Brampton deductible waived</strong>, or{" "}
								<strong>total loss car GTA</strong> — the answer is the same. Call Pixel
								Towing at{" "}
								<a href="tel:+16476739755" className="fw-bold text-dark">
									647-673-9755
								</a>
								. We handle everything from the moment of impact to the day you pick up
								your car.
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* ======== FINAL CTA ======== */}
			<section
				className="py-5 text-white text-center"
				style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a)" }}
			>
				<Container>
					<Star size={32} className="text-warning mb-3" fill="currentColor" />
					<h2 className="display-5 fw-bold mb-3">
						In an Accident? Call Us Before Anyone Else.
					</h2>
					<p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "580px" }}>
						Tow truck, collision reporting, bodyshop with lifetime warranty, deductible
						assistance, OEM parts, same-day rental — one call, we handle all of it.
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
							className="fw-bold rounded-pill px-5 py-3 shadow-lg text-dark"
						>
							<Phone size={22} className="me-2" />
							647-673-9755 — Call Now
						</Button>
						<Button
							href="https://wa.link/sq54ln"
							target="_blank"
							variant="outline-light"
							size="lg"
							className="fw-bold rounded-pill px-4 py-3"
						>
							<MessageSquare size={18} className="me-2" />
							WhatsApp Dispatch
						</Button>
					</Stack>
					<p className="text-white-50 small mt-4">
						Serving Brampton · Mississauga · Caledon · Etobicoke · Vaughan · Toronto ·
						Georgetown · Halton Hills
					</p>
				</Container>
			</section>
		</div>
	);
};

export default AccidentRecoveryPage;
