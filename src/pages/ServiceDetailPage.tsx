import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Breadcrumb,
	Accordion,
} from "react-bootstrap";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ Keeps Schema Safe
import {
	Phone,
	ShieldAlert,
	KeyRound,
	Wrench,
	Zap,
	Truck,
	CheckCircle,
} from "lucide-react";
import SEO from "../components/SEO";

import lockout from "../assets/lockout.jpg";
import flatTire from "../assets/flatTire.png";
import accident from "../assets/tow-truck-accident-recovery-brampton.jpg";
import jumpStart from "../assets/jumpStart.jpeg";
import towing from "../assets/flatbed-towing-brampton.jpg";
import scrap from "../assets/cash for car.jpg";

// 🔥 DATA STRUCTURE
const allServicesData = {
	"accident-recovery": {
		title: "24/7 Accident & Collision Recovery (Insurance Approved)",
		metaTitle: "Accident Towing Brampton | Collision Reporting Center & Claims Help",
		metaDesc:
			"In a crash? We guide you through the Collision Reporting Center process, insurance claims, and vehicle repairs. $0 out-of-pocket for insured drivers. Call 647-673-9755.",
		tagline: "Don't Panic. We Handle the Tow, the Police Report, and the Repair.",
		image: accident,
		icon: ShieldAlert,
		details: [
			"**STOP. Don't let police or 'chaser' tow trucks pressure you.** You have the right to choose who touches your vehicle.",
			"**Step 1: The Collision Reporting Center (CRC):** By law in Peel and Toronto, you often must report accidents. We don't just drop you off; we tow your car to the CRC, wait with you, and **help you fill out the police report** correctly to protect your liability.",
			"**Step 2: Claims & Billing:** We work directly with your insurance provider (Intact, Belair, Aviva, etc.) to cover the tow and storage fees. In almost all full-coverage cases, you pay **$0 out of pocket**.",
			"**Step 3: Vehicle Repair Strategy:** If you don't have a mechanic, don't worry. We can transport your vehicle to our network of **Manufacturer-Certified Collision Centers**. These facilities offer **Lifetime Warranties** on paint and bodywork, arrange your Rental Car, and can often cover your insurance deductible.",
		],
		features: [
			"Direct Insurance Billing ($0 to you)",
			"Assistance at Collision Reporting Center",
			"Free Rental Car Arrangement Support",
			"Lifetime Warranty Repair Network",
		],
		faqs: [
			{
				question: "What should I do immediately after an accident?",
				answer:
					"**1. Stay Calm.** 2. Call Pixel Towing at 647-673-9755. 3. Do not sign anything from other tow trucks on scene. We will secure the scene, deal with the police, and protect your vehicle.",
			},
			{
				question: "Do I have to go to the police pound or my dealer?",
				answer:
					"**NO.** Dealerships often have limited storage, and police pounds charge insane fees. It is smarter to tow to a certified collision shop or the Reporting Center. We will guide you to the option that saves you the most money.",
			},
			{
				question: "Will you help me deal with my insurance company?",
				answer:
					"Yes. Insurance adjusters try to minimize payouts. We act as your advocate to ensure your car is repaired with OEM (Original) parts, or if it is totaled, that you get the Fair Market Value payout you deserve.",
			},
			{
				question: "Who pays for the tow?",
				answer:
					"Your insurance company. We send the bill directly to them. If you have valid collision coverage, we generally do not ask for payment from you at the roadside.",
			},
			{
				question: "Do you offer a warranty on repairs?",
				answer:
					"While we are the towing service, the **Certified Collision Centers** we recommend offer a Lifetime Warranty on all bodywork and paint, ensuring your car returns to pre-accident condition.",
			},
		],
	},

	lockout: {
		title: "Emergency Car Lockout Service (No Damage)",
		metaTitle: "Car Lockout Service Brampton & GTA | Keys Locked in Car | 15 Min ETA",
		metaDesc:
			"Keys locked in car? Pixel Towing unlocks cars in Brampton, Mississauga & Toronto fast. Non-destructive methods, luxury car safe, 24/7 Service. Call 647-673-9755.",
		tagline: "Keys Locked Inside? Engine Running? We Unlock It FAST.",
		image: lockout,
		icon: KeyRound,
		details: [
			"It happens to the best of us. Whether your engine is running, your child is locked inside, or you simply lost your keys, panic sets in quickly. We are the calm in your chaos.",
			"**100% Damage-Free Guarantee:** Unlike amateurs who use coat hangers, our certified technicians use specialized **Lishi picks, air wedges, and long-reach tools**. We unlock your door without scratching the paint, bending the frame, or damaging weather stripping.",
			"**We Unlock All Makes & Models:** From standard sedans (Civic, Corolla) to high-security luxury vehicles (BMW, Mercedes, Audi) and even heavy-duty trucks.",
		],
		features: [
			"15-Minute Rapid Response",
			"Child/Pet Emergency Priority",
			"Zero-Damage Air Wedge Method",
			"Luxury & German Car Specialist",
		],
		faqs: [
			{
				question: "Will unlocking the car scratch my paint?",
				answer:
					"Absolutely not. We use soft, rubberized air wedges and coated tools specifically designed to protect your vehicle's finish. We guarantee zero damage.",
			},
			{
				question: "My car is running / A child is inside. Can you help?",
				answer:
					"**YES. Call 647-673-9755 immediately.** We prioritize 'engine-running' and 'occupant-locked' calls above all others and will dispatch the nearest truck instantly.",
			},
			{
				question: "Can you open luxury cars (BMW, Mercedes, Audi)?",
				answer:
					"Yes. Luxury cars have 'deadlock' security features that normal tow truck drivers cannot open. We carry specialized Lishi decoders to pick these high-security locks without triggering the anti-theft lockdown.",
			},
			{
				question: "Do you unlock semi-trucks or RVs?",
				answer:
					"Yes, our heavy-duty division can unlock Semi-truck cabs, RVs, Box trucks, and Buses using commercial lockout tools.",
			},
			{
				question: "Do you make keys if I lost them completely?",
				answer:
					"We primarily focus on *unlocking* vehicles where the keys are inside. If your keys are totally lost, we can tow your vehicle to a dealership or coordinate with our partner automotive locksmith for key cutting.",
			},
		],
	},

	"tire-change": {
		title: "Roadside Flat Tire Service",
		metaTitle: "Flat Tire Change Brampton | Mobile Tire Service 24/7",
		metaDesc:
			"Flat tire on the highway? We come to you. Pixel Towing provides fast tire changes and air delivery in Brampton, Vaughan, and Toronto. Call 24/7.",
		tagline: "Your Safety is Our Priority. Don't Risk Changing It on a Busy Highway.",
		image: flatTire,
		icon: Wrench,
		details: [
			"Changing a tire on the side of the 401, 410, or 407 is extremely dangerous. Let us handle it safely.",
			"We bring commercial jacks and torque wrenches to ensure your spare tire is installed correctly to manufacturer specifications.",
			"No spare tire? We can tow your vehicle to the nearest tire shop.",
		],
		features: [
			"Highway Safety Protocols",
			"Wheel Nut Torque Precision",
			"Spare Tire Air Check",
			"Towing to Tire Shop Available",
		],
		faqs: [
			{
				question: "Do you provide the spare tire?",
				answer:
					"No, we install the spare tire that comes with your vehicle. If you do not have a spare, we can tow you to a tire shop.",
			},
			{
				question: "Can you remove a stripped lug nut?",
				answer:
					"Our trucks are equipped with specialized extraction sockets to handle most stripped or stuck lug nuts.",
			},
			{
				question: "Do you fill the tire with air?",
				answer:
					"Yes, we always check and inflate your spare tire to the correct PSI before you drive off.",
			},
		],
	},

	"jump-start": {
		title: "Car Battery Boost & Jump Start",
		metaTitle: "Car Battery Boost Brampton | Dead Battery Jump Start Service",
		metaDesc:
			"Dead battery in Brampton? We offer 24/7 car battery boosting. Safe for modern cars with electronics. Fast arrival & affordable rates.",
		tagline: "Safe Boosting That Protects Your Vehicle’s Electronics.",
		image: jumpStart,
		icon: Zap,
		details: [
			"Modern vehicles have sensitive computers (ECUs). Using cheap jumper cables can cause electrical damage.",
			"We use professional-grade booster packs with voltage protection to jump-start your car safely, even in -20°C weather.",
			"We also test your alternator to see if you need a new battery or just a charge.",
		],
		features: [
			"ECU-Safe Boost Equipment",
			"Battery & Alternator Check",
			"Underground Garage Capable",
			"Hybrid Vehicle Boosting",
		],
		faqs: [
			{
				question: "Will boosting damage my car's computer?",
				answer:
					"No. We use voltage-regulated booster packs specifically designed to be safe for modern ECU systems.",
			},
			{
				question: "Can you boost a hybrid vehicle?",
				answer:
					"Yes, we are trained to safely boost the 12V startup battery in Hybrid and Electric Vehicles.",
			},
			{
				question: "What if the car still won't start?",
				answer:
					"If a boost doesn't work, it may be a starter or alternator issue. We can easily tow you to a mechanic.",
			},
		],
	},

	"vehicle-transport": {
		title: "Flatbed & Breakdown Towing",
		metaTitle: "Flatbed Tow Truck Brampton | Long Distance & Luxury Towing",
		metaDesc:
			"Need a tow truck? We provide flatbed towing for breakdown cars, AWD vehicles, and motorcycles in Brampton & GTA. Damage-free towing guaranteed.",
		tagline: "The Right Equipment for Every Tow.",
		image: towing,
		icon: Truck,
		details: [
			"When your car breaks down, you need a truck that won't cause more damage. We dispatch flatbed trucks for AWD and luxury vehicles.",
			"Our drivers are trained to handle low-clearance sports cars and heavy SUVs.",
			"We offer both local towing in Brampton/Mississauga and long-distance towing across Ontario.",
		],
		features: [
			"Flatbed & Wheel-Lift Trucks",
			"Long Distance Towing (Ontario-Wide)",
			"Motorcycle Transport",
			"Low-Profile Ramp Extensions",
		],
		faqs: [
			{
				question: "Is flatbed towing safer?",
				answer:
					"Yes. Flatbed towing lifts your entire vehicle off the ground, preventing wear on your transmission and tires. It is the only safe method for AWD vehicles.",
			},
			{
				question: "Can you tow long distance?",
				answer:
					"Yes. We offer long-distance towing from Brampton to anywhere in Ontario. Call us for a flat-rate quote.",
			},
			{
				question: "Can you take me (the driver) too?",
				answer:
					"Yes, our trucks have clean, comfortable passenger seats. We can transport you alongside your vehicle.",
			},
		],
	},
	"scrap-car-removal": {
		title: "Cash for Scrap Cars & Free Removal",
		metaTitle: "Cash for Scrap Cars Brampton & Caledon | We Pay Top Dollar + Free Tow",
		metaDesc:
			"Get instant CASH for junk cars. We beat dealer prices in Brampton, Mississauga & Caledon. Free towing included. Same-day pickup. Call 647-673-9755.",
		tagline: "Turn That Clunker Into Cash Today. We Tow It Away for Free.",
		image: scrap,
		icon: Truck,
		details: [
			"Stop looking at that rust bucket in your driveway. Pixel Towing pays cash for unwanted vehicles and hauls them away at no cost to you.",
			"**How It Works:** Since we are a towing company first, we don't have to hire a middleman. This means we can offer you **competitive cash payouts** while providing **100% Free Towing**.",
			"We accept all vehicles: Accident damage, non-runners, no wheels, high mileage, or just old. We handle the eco-friendly recycling process.",
		],
		features: [
			"Instant Cash Offers",
			"Free Same-Day Pickup (Save $120)",
			"We Buy Any Condition",
			"Ownership Transfer Help",
		],
		faqs: [
			{
				question: "How much will you pay for my car?",
				answer:
					"Offers are based on the **vehicle's weight** and **current metal market prices**. Call us with the Make/Model, and we will give you a fair, upfront cash offer over the phone.",
			},
			{
				question: "Do I have to pay for the tow?",
				answer:
					"Never. Many competitors deduct the towing fee from your payout. At Pixel Towing, **removal is completely free**, putting more cash in your pocket.",
			},
			{
				question: "What documents do I need?",
				answer:
					"You simply need the vehicle ownership (green slip). If you have lost it, let our dispatcher know, and we can guide you through the alternative process.",
			},
			{
				question: "Do you take cars that don't start?",
				answer:
					"Yes! We bring our flatbed or wheel-lift trucks to remove the vehicle, even if it has no wheels or keys.",
			},
		],
	},
};

type ServiceKey = keyof typeof allServicesData;

const ServiceDetailPage = () => {
	const { serviceId } = useParams<{ serviceId: ServiceKey }>();

	if (!serviceId || !allServicesData[serviceId]) {
		return <Navigate to="/services" replace />;
	}

	const service = allServicesData[serviceId];
	const IconComponent = service.icon;

	// 🔥 STRUCTURED DATA: Added full address block to fix Google Search Console error
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Service",
				"@id": `https://pixeltowing.com/services/${serviceId}#service`,
				serviceType: service.title,
				provider: {
					"@type": "AutomotiveBusiness",
					name: "Pixel Towing",
					telephone: "+16476739755",
					image: "https://pixeltowing.com/tow-icon.png", // Added
					priceRange: "$$", // Added
					address: {
						// ✅ FIXED: Missing Address added here
						"@type": "PostalAddress",
						addressLocality: "Brampton",
						addressRegion: "ON",
						addressCountry: "CA",
					},
				},
				areaServed: { "@type": "City", name: "Brampton" },
				description: service.metaDesc,
			},
			{
				"@type": "FAQPage",
				"@id": `https://pixeltowing.com/services/${serviceId}#faq`,
				mainEntity: service.faqs.map(faq => ({
					"@type": "Question",
					name: faq.question,
					acceptedAnswer: {
						"@type": "Answer",
						text: faq.answer,
					},
				})),
			},
		],
	};

	return (
		<div style={{ paddingTop: "76px" }}>
			<SEO
				title={service.metaTitle}
				description={service.metaDesc}
				canonical={`https://pixeltowing.com/services/${serviceId}`}
			/>

			{/* 🔥 SCHEMA WRAPPER */}
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
			</Helmet>

			<Container className="pt-4">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
						Home
					</Breadcrumb.Item>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/services" }}>
						Services
					</Breadcrumb.Item>
					<Breadcrumb.Item active>{service.title}</Breadcrumb.Item>
				</Breadcrumb>
			</Container>

			<Container className="py-4">
				<Row className="g-5 align-items-center mb-5">
					<Col lg={6}>
						<Card className="border-0 shadow-lg overflow-hidden rounded-4">
							<Card.Img
								src={service.image}
								alt={`${service.title} - Pixel Towing Brampton`}
								className="img-fluid"
								loading="lazy" /* ⚡ Performance Optimization */
							/>
						</Card>
					</Col>

					<Col lg={6}>
						<div className="d-flex align-items-center mb-3">
							<div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
								<IconComponent className="text-primary" size={32} />
							</div>
							<h1 className="fw-bold mb-0 h2">{service.title}</h1>
						</div>

						<p className="lead text-primary fw-medium fst-italic mb-4">
							{service.tagline}
						</p>

						{service.details.map((p, i) => (
							<p key={i} className="text-secondary lh-lg mb-3">
								{p}
							</p>
						))}

						<div className="mt-4">
							<Button
								href="tel:+16476739755"
								variant="warning"
								size="lg"
								className="fw-bold rounded-pill shadow-sm px-5"
							>
								<Phone size={20} className="me-2 mb-1" />
								Call Now for {service.title}
							</Button>
						</div>
					</Col>
				</Row>

				{/* FEATURE HIGHLIGHTS */}
				<Row className="mt-5 justify-content-center">
					<Col lg={10}>
						<Card className="border-0 bg-light p-4 rounded-4 shadow-sm mb-5">
							<h3 className="h5 fw-bold mb-4 text-dark">Why Choose Pixel Towing?</h3>
							<Row xs={1} md={2} className="g-3">
								{service.features.map((feature, i) => (
									<Col key={i}>
										<div className="d-flex align-items-center">
											<CheckCircle
												size={20}
												className="text-success me-3 flex-shrink-0"
											/>
											<span className="fw-medium text-dark">{feature}</span>
										</div>
									</Col>
								))}
							</Row>
						</Card>
					</Col>
				</Row>

				{/* 🔥 SERVICE SPECIFIC FAQ SECTION */}
				<Row className="justify-content-center">
					<Col lg={8}>
						<h3 className="h4 fw-bold mb-4 text-center">Frequently Asked Questions</h3>
						<Accordion flush className="border rounded-3 overflow-hidden">
							{service.faqs.map((faq, idx) => (
								<Accordion.Item eventKey={idx.toString()} key={idx}>
									<Accordion.Header className="fw-bold">{faq.question}</Accordion.Header>
									<Accordion.Body className="text-secondary">{faq.answer}</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</Col>
				</Row>
			</Container>

			<div className="py-5 bg-dark text-white text-center mt-5">
				<Container>
					<h2 className="fw-bold">Ready to Dispatch?</h2>
					<p className="lead text-white-50">
						Our tow trucks are minutes away in Brampton, Mississauga, Caledon.
					</p>
					<Button
						href="tel:+16476739755"
						variant="warning"
						size="lg"
						className="fw-bold px-5 py-3 rounded-pill"
					>
						<Phone className="me-2" />
						Call 647-673-9755
					</Button>
				</Container>
			</div>
		</div>
	);
};

export default ServiceDetailPage;
