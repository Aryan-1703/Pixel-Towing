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
	MapPin,
} from "lucide-react";
import SEO from "../components/SEO";

import lockout from "../assets/lockout.jpg";
import flatTire from "../assets/flatTire.png";
import accident from "../assets/tow-truck-accident-recovery-brampton.jpg";
import jumpStart from "../assets/jumpStart.jpeg";
import towing from "../assets/flatbed-towing-brampton.jpg";
import scrap from "../assets/cash for car.jpg";

const SERVICE_CITIES = [
	{ name: "Mississauga", path: "/locations/mississauga" },
	{ name: "Caledon", path: "/locations/caledon" },
	{ name: "Etobicoke", path: "/locations/etobicoke" },
	{ name: "Vaughan", path: "/locations/vaughan" },
	{ name: "Toronto", path: "/locations/toronto" },
	{ name: "Georgetown", path: "/locations/georgetown" },
	{ name: "Halton Hills", path: "/locations/halton-hills" },
	{ name: "Acton", path: "/locations/acton" },
	{ name: "Erin", path: "/locations/erin" },
];

const allServicesData = {
	"accident-recovery": {
		title: "Accident Recovery — Towing, Repairs & Rental Under One Roof",
		metaTitle: "Accident Towing Brampton | Bodyshop + Rental Car Same Day | Pixel Towing",
		canonical: "https://pixeltowing.com/accident-recovery",
		metaDesc:
			"Got into an accident in Brampton? Call Pixel Towing first. We handle the tow, CRC report, repairs at our own bodyshop, AND get you a rental car immediately — all under one roof. 647-673-9755.",
		tagline:
			"One Call. Tow Truck + Bodyshop + Rental Car. We Handle Everything So You Don't Have To.",
		image: accident,
		imageAlt:
			"Tow truck recovering crashed vehicle at accident scene in Brampton Ontario",
		icon: ShieldAlert,
		details: [
			"**Call us before you call anyone else.** Most drivers don't realize they have the legal right to choose their own tow company, their own repair shop, and their own rental car — regardless of what insurance suggests. In Ontario, your insurer cannot force you to use their preferred vendors. That right belongs to you.",
			"**What most people don't know:** When you call your insurance company first, their dispatch team connects you with their preferred tow company and their preferred body shop — facilities that work within insurance-negotiated rates. Those shops are incentivized to keep repair costs low, which can mean aftermarket parts instead of manufacturer-original ones. You have no obligation to go that route.",
			"**What we offer instead:** Pixel Towing is a one-stop accident solution. We tow your vehicle, take you through the Collision Reporting Centre process, repair your car at **our own certified bodyshop**, and get you into a **rental vehicle from our own fleet the same day** — no waiting for insurance pre-authorization.",
			"**Your insurance still pays.** None of this means you go out of pocket. We work directly with all major Ontario insurers (Intact, Aviva, Belair, Economical, TD, Desjardins). Your coverage applies regardless of which licensed shop and tow company you choose — that's the law.",
		],
		features: [
			"Tow + Bodyshop + Rental — One Phone Call",
			"Same-Day Rental Car (No Insurance Wait)",
			"OEM Parts at Our Own Certified Bodyshop",
			"We Handle the Entire Insurance Claim For You",
		],
		faqs: [
			{
				question: "Why should I call Pixel Towing before my insurance company?",
				answer:
					"You have every right to call us first — and it's often in your best interest. When insurance dispatches a tow, they send their preferred company to their preferred shop. When you call us, you choose where your car goes and who fixes it. We tow it, repair it at our own bodyshop with OEM parts, and get you a rental the same day. Your insurance still covers everything — the difference is you stay in control of the process.",
			},
			{
				question: "Do I have the right to choose my own repair shop in Ontario?",
				answer:
					"Yes — this is protected under Ontario insurance regulations. Your insurer can suggest a 'preferred shop' but cannot legally force you to use one. You have the right to choose any licensed collision repair facility. We recommend choosing a shop that works in your interest, not the insurer's.",
			},
			{
				question: "Can I get a rental car right away without waiting for insurance?",
				answer:
					"Yes. Because we operate our own rental fleet, we can put you in a vehicle the same day — often within hours of your accident. When insurance arranges the rental, there's typically a 24–48 hour approval process. We skip that entirely and sort the billing with insurance afterward.",
			},
			{
				question: "What is the Collision Reporting Centre and do I have to go?",
				answer:
					"In Peel Region and Toronto, you must report accidents with over $2,000 in damage to a Collision Reporting Centre (CRC). We tow your car there, wait with you, and help you fill out the report correctly — which matters a lot for how your claim is processed. The nearest CRC for Brampton is at 7750 Hurontario Street.",
			},
			{
				question: "Will my insurance rates go up if I use your bodyshop?",
				answer:
					"Your rates are affected by the accident claim itself — not by which licensed shop repairs your car. Whether the insurer's shop or ours does the work, the claim outcome is the same for your premium. What changes is the quality of parts used and who advocates for you during the repair process.",
			},
			{
				question: "Do you service accident scenes on Hwy 410 and Hwy 50 in Brampton?",
				answer:
					"Yes. Hwy 410 and Hwy 50 are our highest-priority corridors. We respond to accident scenes on these highways as a top priority.",
			},
		],
	},

	lockout: {
		title: "Emergency Car Lockout Service (No Damage Guaranteed)",
		metaTitle: "Car Lockout Service Brampton & GTA | Keys Locked in Car | 647-673-9755",
		metaDesc:
			"Keys locked in your car in Brampton or GTA? Pixel Towing unlocks all makes and models with zero damage. Luxury car safe. 15-20 min ETA. Call 647-673-9755.",
		tagline: "Keys Locked Inside? Engine Running? We Unlock It FAST — Zero Damage.",
		image: lockout,
		imageAlt: "Professional car lockout service unlocking vehicle in Brampton Ontario",
		icon: KeyRound,
		details: [
			"It happens to the best of us. Whether your engine is running, your child is locked inside, or you simply lost your keys, panic sets in quickly. We are the calm in your chaos.",
			"**100% Damage-Free Guarantee:** Unlike amateurs who use coat hangers, our certified technicians use specialized **Lishi picks, air wedges, and long-reach tools**. We unlock your door without scratching the paint, bending the frame, or damaging weather stripping.",
			"**We Unlock All Makes & Models:** From standard sedans (Civic, Corolla) to high-security luxury vehicles (BMW, Mercedes, Audi, Tesla) and even heavy-duty trucks.",
			"We also carry tools for 'deadlock' security systems found on newer European vehicles. Standard locksmiths often can't open these — we can.",
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
					"YES. Call 647-673-9755 immediately. We prioritize 'engine-running' and 'occupant-locked' calls above all others and will dispatch the nearest truck instantly.",
			},
			{
				question: "Can you open luxury cars (BMW, Mercedes, Audi)?",
				answer:
					"Yes. Luxury cars have 'deadlock' security features that normal tow truck drivers cannot open. We carry specialized Lishi decoders to pick these high-security locks without triggering anti-theft lockdown.",
			},
			{
				question: "Do you unlock semi-trucks or RVs?",
				answer:
					"Yes. Our heavy-duty division can unlock semi-truck cabs, RVs, box trucks, and buses using commercial lockout tools.",
			},
			{
				question: "Do you make keys if I lost them completely?",
				answer:
					"We primarily unlock vehicles where keys are inside. If keys are totally lost, we can tow your vehicle to a dealership or coordinate with our partner automotive locksmith.",
			},
		],
	},

	"tire-change": {
		title: "Roadside Flat Tire Change Service",
		metaTitle:
			"Flat Tire Change Brampton | Mobile Roadside Tire Service 24/7 | 647-673-9755",
		metaDesc:
			"Flat tire on Hwy 410 or in Brampton? We come to you. Safe roadside tire change, spare installation with proper torque, 24/7 service. Call 647-673-9755.",
		tagline: "Your Safety is Our Priority. Don't Risk Changing It on a Busy Highway.",
		image: flatTire,
		imageAlt: "Roadside technician changing flat tire on Highway 410 Brampton Ontario",
		icon: Wrench,
		details: [
			"Changing a tire on the side of the 401, 410, or 407 is extremely dangerous. Our professional roadside tire change service comes to your exact location.",
			"We bring commercial jacks and **calibrated torque wrenches** to ensure your spare tire is installed correctly to manufacturer specifications — preventing dangerous wheel separation while driving.",
			"No spare tire? No problem. We can tow your vehicle to the nearest tire shop in Brampton or Mississauga.",
			"We also check your spare's air pressure before you drive off, because driving on an improperly inflated spare is as dangerous as the flat itself.",
		],
		features: [
			"Highway Safety Protocols",
			"Torque-Calibrated Wheel Installation",
			"Spare Tire PSI Verification",
			"Towing to Tire Shop Available",
		],
		faqs: [
			{
				question: "Do you provide the spare tire?",
				answer:
					"No, we install the spare tire that comes with your vehicle. If you do not have a spare, we can tow you to a tire shop in Brampton or Mississauga.",
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
			{
				question: "Can you change a tire on the highway?",
				answer:
					"Yes. We carry emergency warning triangles and high-visibility equipment for safe highway tire changes. Where possible, we recommend exiting the highway first.",
			},
		],
	},

	"jump-start": {
		title: "Car Battery Boost & Jump Start Service",
		metaTitle: "Car Battery Boost Brampton | Dead Battery Jump Start 24/7 | 647-673-9755",
		metaDesc:
			"Dead battery in Brampton or Mississauga? ECU-safe battery boost with voltage protection. 15-20 min ETA. Alternator check included. Call 647-673-9755.",
		tagline: "ECU-Safe Boosting That Protects Your Vehicle's Electronics.",
		image: jumpStart,
		imageAlt: "Technician performing car battery boost jump start in Brampton Ontario",
		icon: Zap,
		details: [
			"Modern vehicles have sensitive computers (ECUs, body control modules, transmission control units). Using cheap jumper cables can cause electrical damage worth thousands of dollars.",
			"We use **professional-grade booster packs with built-in voltage protection** to jump-start your car safely — even in -20°C Brampton winters.",
			"After the boost, we also **test your alternator output** to determine whether the problem is a dead battery, a failing alternator, or both. This saves you from buying a new battery when the real problem is elsewhere.",
		],
		features: [
			"ECU-Safe Voltage-Protected Equipment",
			"Battery & Alternator Diagnostic Test",
			"Underground Garage Capable",
			"Hybrid & EV 12V Battery Boosting",
		],
		faqs: [
			{
				question: "Will boosting damage my car's computer?",
				answer:
					"No. We use voltage-regulated booster packs specifically designed to be safe for modern ECU systems — the same units used by dealerships.",
			},
			{
				question: "Can you boost a hybrid vehicle?",
				answer:
					"Yes. We are trained to safely boost the 12V startup battery in Hybrid and Electric Vehicles (Toyota Prius, Tesla, Chevrolet Bolt, etc.) without affecting the high-voltage drive system.",
			},
			{
				question: "What if the car still won't start after a boost?",
				answer:
					"If a boost doesn't work, it may be a starter, alternator, or deeper electrical issue. We can easily tow you to a certified mechanic in Brampton or Mississauga.",
			},
			{
				question: "Do you test the battery and alternator on site?",
				answer:
					"Yes. We carry basic battery and alternator test equipment. We'll tell you whether you need a new battery, a new alternator, or just a recharge.",
			},
		],
	},

	"vehicle-transport": {
		title: "Flatbed & Breakdown Towing",
		metaTitle: "Flatbed Tow Truck Brampton | Long Distance & AWD Towing | Pixel Towing",
		metaDesc:
			"Professional flatbed towing in Brampton for breakdown cars, AWD vehicles, luxury cars, and motorcycles. Ontario-wide long-distance towing. Call 647-673-9755.",
		tagline: "The Right Equipment for Every Tow — Flatbed, Wheel-Lift, and Low-Profile.",
		image: towing,
		imageAlt:
			"Flatbed tow truck loading AWD vehicle in Brampton Ontario for safe transport",
		icon: Truck,
		details: [
			"When your car breaks down, you need a truck that won't cause more damage. We dispatch flatbed trucks for AWD and 4WD vehicles — the only safe method that keeps all wheels off the ground.",
			"Our drivers are trained to handle **low-clearance sports cars** (Corvette, Porsche, Ferrari), **luxury SUVs** (BMW, Mercedes, Land Rover), and heavy pickup trucks alike.",
			"We offer both **local towing in Brampton/Mississauga** and **long-distance towing across Ontario** at flat-rate pricing — no per-km surprises.",
		],
		features: [
			"Flatbed & Wheel-Lift Trucks",
			"Ontario-Wide Long Distance Towing",
			"Motorcycle & Low-Profile Transport",
			"Low-Profile Ramp Extensions for Sports Cars",
		],
		faqs: [
			{
				question: "Why is flatbed towing safer for AWD vehicles?",
				answer:
					"Flatbed towing lifts your entire vehicle off the ground, preventing wear on your transmission, transfer case, and tires. It is the only safe method for AWD/4WD vehicles like Subaru, Audi Quattro, and BMW xDrive.",
			},
			{
				question: "Can you tow long distance across Ontario?",
				answer:
					"Yes. We offer long-distance towing from Brampton to anywhere in Ontario — Toronto, Guelph, Hamilton, London, Ottawa, Kingston. Call for a flat-rate quote.",
			},
			{
				question: "Can the driver ride in the tow truck with the vehicle?",
				answer:
					"Yes. Our trucks have clean, comfortable passenger seats. You and one passenger can ride with us to the destination.",
			},
			{
				question: "Do you transport motorcycles?",
				answer:
					"Yes. We use wheel chocks and tie-down systems rated for motorcycles. All bikes are transported on flatbed trucks only.",
			},
		],
	},

	"scrap-car-removal": {
		title: "Cash for Scrap Cars & Free Removal — Brampton",
		metaTitle:
			"Cash for Scrap Cars Brampton & GTA | Free Tow + Top Dollar | 647-673-9755",
		metaDesc:
			"Get instant CASH for your junk car in Brampton. We beat dealer prices, tow it away for FREE, and handle ownership transfer. Same-day pickup available. Call 647-673-9755.",
		tagline: "Turn That Clunker Into Cash Today. Free Towing. Same-Day Pickup.",
		image: scrap,
		imageAlt: "Scrap car removal tow truck picking up junk car in Brampton Ontario",
		icon: Truck,
		details: [
			"Stop looking at that rust bucket in your driveway. Pixel Towing pays cash for unwanted vehicles and hauls them away at absolutely no cost to you.",
			"**How It Works:** Since we are a towing company first, we don't pay a middleman. This means we offer **competitive cash payouts** while providing **100% Free Towing** — putting more money in your pocket than any scrap dealer that charges for pickup.",
			"We accept all vehicles regardless of condition: accident damage, non-runners, no wheels, flooded, high mileage, or just old. We handle the eco-friendly recycling and de-registration process.",
		],
		features: [
			"Instant Cash Offers (Call for Quote)",
			"Free Same-Day Pickup — Save $100+",
			"We Buy Any Condition",
			"Ownership Transfer Assistance",
		],
		faqs: [
			{
				question: "How much will you pay for my scrap car?",
				answer:
					"Offers are based on the vehicle's weight and current metal market prices. Call us with the Make, Model, and Year, and we'll give you a fair, upfront cash offer — no obligation.",
			},
			{
				question: "Do I have to pay for the tow?",
				answer:
					"Never. Many competitors deduct the towing fee from your payout. At Pixel Towing, removal is completely free, putting more cash in your pocket.",
			},
			{
				question: "What documents do I need to sell my scrap car?",
				answer:
					"You need the vehicle ownership (green slip). If you've lost it, let our dispatcher know and we'll guide you through the alternative process with the MTO.",
			},
			{
				question: "Do you take cars that don't run?",
				answer:
					"Yes. We bring our flatbed or wheel-lift trucks to remove the vehicle, even if it has no wheels, no keys, or is in a ditch.",
			},
			{
				question: "How quickly can you pick up?",
				answer:
					"We offer same-day pickup in most cases across Brampton, Mississauga, and Caledon. Call before noon for best chances of same-day service.",
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
					image: "https://pixeltowing.com/tow.png",
					priceRange: "$$",
					address: {
						"@type": "PostalAddress",
						addressLocality: "Brampton",
						addressRegion: "ON",
						addressCountry: "CA",
					},
				},
				areaServed: [
					{ "@type": "City", name: "Brampton" },
					{ "@type": "City", name: "Mississauga" },
					{ "@type": "City", name: "Caledon" },
					{ "@type": "City", name: "Etobicoke" },
					{ "@type": "City", name: "Vaughan" },
				],
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
				canonical={(service as { canonical?: string }).canonical ?? `https://pixeltowing.com/services/${serviceId}`}
			/>

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
								alt={service.imageAlt}
								className="img-fluid"
								loading="eager"
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

						{service.details.map((p, i) => {
							const parts = p.split(/\*\*(.*?)\*\*/g);
							return (
								<p key={i} className="text-secondary lh-lg mb-3">
									{parts.map((part, j) =>
										j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
									)}
								</p>
							);
						})}

						<div className="mt-4 d-flex gap-3 flex-wrap">
							<Button
								href="tel:+16476739755"
								variant="warning"
								size="lg"
								className="fw-bold rounded-pill shadow-sm px-5"
							>
								<Phone size={20} className="me-2 mb-1" />
								Call Now — 647-673-9755
							</Button>
						</div>
					</Col>
				</Row>

				{/* FEATURES */}
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

				{/* FAQ */}
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

				{/* ======== SERVICE AREA CROSS-LINKS ======== */}
				<Row className="justify-content-center mt-5">
					<Col lg={10}>
						<Card className="border-0 bg-light rounded-4 p-4 shadow-sm">
							<h3 className="h5 fw-bold mb-3 d-flex align-items-center">
								<MapPin size={18} className="text-warning me-2" />
								{service.title} Available In:
							</h3>
							<div className="d-flex flex-wrap gap-2">
								<Link to="/" className="btn btn-sm btn-warning rounded-pill fw-bold">
									Brampton (HQ)
								</Link>
								{SERVICE_CITIES.map(city => (
									<Link
										key={city.path}
										to={city.path}
										className="btn btn-sm btn-outline-secondary rounded-pill"
									>
										{city.name}
									</Link>
								))}
							</div>
						</Card>
					</Col>
				</Row>
			</Container>

			{/* CTA */}
			<div className="py-5 bg-dark text-white text-center mt-5">
				<Container>
					<h2 className="fw-bold">Ready for Dispatch?</h2>
					<p className="lead text-white-50">
						Tow trucks minutes away in Brampton, Mississauga, Caledon & all GTA.
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
