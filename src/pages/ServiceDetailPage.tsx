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
import { Helmet } from "react-helmet-async";
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
import scrap from "../assets/cash for car.jpg"; // Ensure this filename matches your actual file

// 🔥 DATA STRUCTURE
const allServicesData = {
	"accident-recovery": {
		title: "Accident Recovery & Claims Management",
		metaTitle: "Accident Towing & Insurance Claim Help Brampton | 24/7 Recovery",
		metaDesc:
			"In an accident? We handle towing, insurance claims, and total loss negotiations. $0 out-of-pocket with full coverage. Lifetime warranty repairs available.",
		tagline: "Don't Stress. We Handle the Tow, the Claim, and the Repairs.",
		image: accident,
		icon: ShieldAlert,
		details: [
			"The moments after a crash are chaotic. You don't just need a tow; you need an expert to protect your interests.",
			"**Complete Insurance Handling:** We assist with opening your claim and managing the paperwork. If you have full coverage, our service is billable directly to your insurer, meaning you pay **$0 out of pocket**.",
			"**Total Loss Protection:** If your vehicle is a write-off, our team fights to ensure you get **Fair Market Value** for your car, not the low-ball offer.",
			"**Lifetime Warranty Repairs:** If your car is repairable, we can connect you with certified collision shops that offer a **Lifetime Warranty** on all workmanship and paint.",
		],
		features: [
			"Direct Insurance Billing ($0 Upfront)",
			"Total Loss Value Negotiation",
			"Assistance Opening Claims",
			"Access to Lifetime Warranty Shops",
		],
		faqs: [
			{
				question: "Do I have to pay for the tow?",
				answer:
					"If you have full coverage insurance, you typically pay nothing. We bill the insurance company directly for the towing, cleanup, and storage fees.",
			},
			{
				question: "What if my car is a Total Loss (Write-off)?",
				answer:
					"We can help! We advocate for you to ensure the insurance company pays you the true Fair Market Value for your vehicle, rather than their initial low offer.",
			},
			{
				question: "Can you help fix my car?",
				answer:
					"Yes. We work with a network of certified collision repair shops in Brampton and Mississauga that provide a Lifetime Warranty on their repairs. We handle the transport seamlessly.",
			},
			{
				question: "Will you help me open the claim?",
				answer:
					"Absolutely. Our team will guide you through the process of reporting the accident, submitting photos, and speaking with your adjuster.",
			},
		],
	},

	lockout: {
		title: "Car Lockout Service",
		metaTitle: "Car Lockout Service Brampton | Keys Locked in Car Help 24/7",
		metaDesc:
			"Locked keys in your car in Brampton or Mississauga? Our lockout service opens cars without damage. Fast 20 min arrival. Call now: 647-673-9755.",
		tagline: "Locked Keys in Your Car? We Provide Fast, Damage-Free Unlocking.",
		image: lockout,
		icon: KeyRound,
		details: [
			"It happens to the best of us. Whether your keys are in the ignition or the trunk, we can help.",
			"Our technicians use professional Lishi tools and air wedges to unlock your vehicle without scratching the paint or damaging the weather stripping.",
			"We unlock all makes: BMW, Mercedes, Honda, Toyota, and domestic vehicles.",
		],
		features: [
			"100% Damage-Free Unlocking",
			"5-10 Minute Arrival Time",
			"Keys Locked in Trunk Retrieval",
			"Licensed & Insured Techs",
		],
		faqs: [
			{
				question: "Will unlocking damage my car door?",
				answer:
					"No. We use specialized air wedges and long-reach tools that apply gentle pressure without bending the door frame or scratching the paint.",
			},
			{
				question: "Can you unlock luxury cars (BMW, Mercedes)?",
				answer:
					"Yes. We have specialized Lishi tools designed for high-security German and European locks.",
			},
			{
				question: "How fast can you get here?",
				answer:
					"For lockouts in Brampton and Mississauga, we typically arrive in 10-15 minutes.",
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
		metaTitle: "Scrap Car Removal Brampton | Cash for Junk Cars & Free Tow",
		metaDesc:
			"We buy junk cars in Brampton & Mississauga! Get an instant cash offer + FREE towing. Same-day pickup for scrap cars, vans, and trucks.",
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

	// Structured Data: Service + FAQ Page
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Service",
				"@id": `https://pixeltowing.com/services/${serviceId}#service`, // Added unique ID
				serviceType: service.title,
				provider: {
					"@type": "AutomotiveBusiness",
					name: "Pixel Towing",
					telephone: "+16476739755",
				},
				areaServed: { "@type": "City", name: "Brampton" },
				description: service.metaDesc,
			},
			{
				"@type": "FAQPage",
				"@id": `https://pixeltowing.com/services/${serviceId}#faq`, // Added unique ID to separate graph nodes
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

			{/* 🔥 IMPORTANT: Wrap Schema in Helmet so it refreshes when route changes */}
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
