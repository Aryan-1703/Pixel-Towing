import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, KeyRound, Wrench, Zap, Truck, CheckCircle, MapPin, type LucideIcon } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";
import { IMAGES, type SiteImage } from "../assets/images";
import { BUSINESS, BUSINESS_REF, DISPATCH_MESSAGE, absoluteUrl } from "../content/site";
import { SERVICE_AREAS, areaServedSchema } from "../content/cities";
import { SERVICE_LINKS, isServiceSlug, servicePath, type ServiceSlug } from "../content/services";

interface ServiceCopy {
	title: string;
	metaTitle: string;
	metaDesc: string;
	tagline: string;
	image: SiteImage;
	icon: LucideIcon;
	/** Paragraphs; **text** renders bold. */
	details: readonly string[];
	/** Optional deeper sections, each rendered under its own H2. */
	sections?: readonly { heading: string; paragraphs: readonly string[] }[];
	/** Other names people search for this service; emitted as schema alternateName. */
	alternateNames?: readonly string[];
	features: readonly string[];
	faqs: readonly { question: string; answer: string }[];
}

const SERVICES: Record<ServiceSlug, ServiceCopy> = {
	lockout: {
		title: "24/7 Car Lockout Service in Brampton",
		metaTitle: "Car Lockout Brampton | Locked Keys in Car 24/7 | Pixel Towing",
		metaDesc:
			"Locked out of your car in Brampton? 24/7 car lockout service — we unlock car doors and trunks when keys or a fob are locked inside. Call 647-673-9755.",
		tagline: "Locked your keys in the car? We'll come to you and get you back in — day or night.",
		image: IMAGES.carLockout,
		icon: KeyRound,
		alternateNames: [
			"Car lockout service",
			"Vehicle lockout service",
			"Car unlock service",
			"Locked keys in car",
			"Emergency car door unlocking",
		],
		details: [
			"Locked out of your car in Brampton, Mississauga or anywhere in Peel Region? Call us with your location and your vehicle's make, model and year, and we'll dispatch a technician to unlock your car — 24 hours a day, 7 days a week, including holidays.",
			"**Professional entry tools:** Our technicians use professional vehicle-entry tools — air wedges and long-reach tools — designed to minimize the risk of damage to paint, glass and weather stripping.",
			"**Most makes and models:** We open most passenger cars, SUVs, minivans and pickups. Some newer vehicles with advanced security systems may need dealer assistance; we'll tell you up front if that's the case.",
		],
		sections: [
			{
				heading: "Keys Locked in the Car, Trunk or Running Vehicle",
				paragraphs: [
					"Most lockout calls are simple: the keys are on the seat, in the ignition, or the car locked itself with the engine running. We also handle **keys locked in the trunk** — on many vehicles we can open the cabin and use the interior trunk release or fold-down seats.",
					"If the engine is running, tell dispatch. A running car with locked doors can't be left unattended for long, and we'll treat it as a priority.",
				],
			},
			{
				heading: "Push-to-Start and Key Fob Locked Inside",
				paragraphs: [
					"Many push-to-start vehicles are designed not to lock with the fob inside, but it still happens — a weak fob battery, a fob in the trunk, or a second key left in the cabin. We can usually open the door so you can retrieve the fob. If the fob is dead, the car may still start with the fob held against the start button; check your owner's manual.",
				],
			},
			{
				heading: "Car Lockout Help Across Brampton and the GTA",
				paragraphs: [
					"We're based in Brampton and take lockout calls across the city — Bramalea, Springdale, Heart Lake, Mount Pleasant, Castlemore and downtown — plus Mississauga, Caledon, Georgetown, Etobicoke, Vaughan and nearby areas. Common call-outs include mall and plaza parking lots, condo and office garages, gas stations and driveways.",
					"Tell us whether you're in an underground garage and the posted height limit so we can plan access.",
				],
			},
			{
				heading: "Lost Your Keys? Locksmith or Tow",
				paragraphs: [
					"A lockout service opens the car when the key is inside it. If your key is **lost, broken or won't start the car**, you'll need a new key cut and programmed by a dealer or an automotive locksmith. We can tow your vehicle to the dealer or locksmith of your choice.",
				],
			},
		],
		features: [
			"24/7 dispatch, including nights and holidays",
			"Professional vehicle-entry tools",
			"Cars, SUVs, minivans and pickups",
			"Keys locked in trunk or running car",
			"Price quoted before dispatch",
			"Tow to a dealer if a key needs replacing",
		],
		faqs: [
			{
				question: "I locked my keys in my car — what should I do?",
				answer:
					"Stay with the vehicle in a safe, well-lit spot, check every door and the trunk, and look for a spare key nearby. If none of that works, call 647-673-9755 with your location and the make, model and year. If a child or pet is inside, call 911 first.",
			},
			{
				question: "How much does a car lockout cost in Brampton?",
				answer:
					"It depends on the time of day, your location and the vehicle. We quote the price over the phone before we dispatch, so you know the cost before the technician arrives. Many roadside assistance plans and some credit cards include lockout service — check yours.",
			},
			{
				question: "How long does it take to unlock a car?",
				answer:
					"Once our technician is on site, most vehicles are opened fairly quickly, though some models with extra security take longer. Arrival time varies by location, traffic, weather and current demand.",
			},
			{
				question: "Is there a child or pet locked inside the vehicle?",
				answer:
					"If a child or animal is locked inside — especially in heat or cold — call 911 first. Emergency services can respond faster and can force entry if needed. Then call us.",
			},
			{
				question: "Will unlocking the car damage it?",
				answer:
					"We use air wedges and coated long-reach tools that are designed to minimize the risk of damage. No method is entirely risk-free, so our technician will explain the approach before starting.",
			},
			{
				question: "Can you open luxury or European cars?",
				answer:
					"Usually, yes. Some models have security systems that can't be opened without the key or dealer equipment. Tell us the make, model and year when you call and we'll let you know.",
			},
			{
				question: "Can you make a new key if mine is lost?",
				answer:
					"No — we open vehicles when the keys are inside. If the key is lost, we can tow the vehicle to a dealership or locksmith of your choice.",
			},
			{
				question: "Do I need to prove the car is mine?",
				answer:
					"Yes. Once the door is open, our technician will ask to see the vehicle registration or ID that matches it. This protects you and every other driver from someone else unlocking your car.",
			},
		],
	},

	"tire-change": {
		title: "Roadside Flat Tire Change",
		metaTitle: "Flat Tire Change Brampton | 24/7 Roadside Help | Pixel Towing",
		metaDesc:
			"Flat tire in Brampton or the GTA? We come to you, install your spare and check its pressure. No spare? We'll tow you to a tire shop. Call 647-673-9755.",
		tagline: "Don't wrestle with a jack beside traffic — we'll come to you.",
		image: IMAGES.flatTireChange,
		icon: Wrench,
		details: [
			"Changing a tire beside a busy road is dangerous. Our roadside tire change service comes to your location and fits your spare.",
			"We tighten the wheel nuts to the manufacturer's torque specification and check the spare's pressure before you drive off.",
			"No spare, or a damaged one? We can tow your vehicle to a tire shop of your choice.",
		],
		features: [
			"Spare installed to torque specification",
			"Spare tire pressure check",
			"Tow to a tire shop if there's no spare",
			"24/7 dispatch",
		],
		faqs: [
			{
				question: "Do you supply a spare tire?",
				answer:
					"No, we install the spare that came with your vehicle. If you don't have one, we can tow you to a tire shop.",
			},
			{
				question: "Can you remove a locking or stuck wheel nut?",
				answer:
					"Bring out your wheel-lock key if you have one. We carry tools that free most stuck nuts; if one can't be removed safely, we'll tow the vehicle to a shop.",
			},
			{
				question: "I'm on a highway shoulder. What should I do?",
				answer:
					"If you can, drive slowly to the next exit or a safe lot. If you can't, pull as far right as possible, turn on your hazard lights and stay buckled in with the doors closed. Call 911 if you're in a live lane.",
			},
		],
	},

	"jump-start": {
		title: "Battery Boost and Jump Start",
		metaTitle: "Battery Boost Brampton | 24/7 Jump Start | Pixel Towing",
		metaDesc:
			"Dead battery in Brampton or Mississauga? 24/7 battery boost with a professional booster pack, plus a basic battery and charging check. Call 647-673-9755.",
		tagline: "Dead battery? We'll get you started and tell you what we found.",
		image: IMAGES.batteryBoost,
		icon: Zap,
		details: [
			"Modern vehicles are full of electronics. We use professional booster packs with built-in protection rather than cable-to-cable jumps from another running car.",
			"After the boost we run a **basic battery and charging-system check**, so you know whether the battery, the alternator or something else is the likely problem.",
			"If the car still won't start, we can tow it to a mechanic of your choice.",
		],
		features: [
			"Professional booster packs",
			"Basic battery and charging check",
			"12V battery boosts for hybrids and EVs",
			"Tow to a mechanic if a boost isn't enough",
		],
		faqs: [
			{
				question: "Can boosting damage my car's electronics?",
				answer:
					"Any boost carries some risk. Using a booster pack with built-in protection, connected correctly, keeps that risk low — that's why we don't do cable jumps from another running car.",
			},
			{
				question: "Can you boost a hybrid or electric vehicle?",
				answer:
					"We boost the 12-volt auxiliary battery that hybrids and EVs use to power up. We never connect to the high-voltage drive battery.",
			},
			{
				question: "What if the car still won't start after a boost?",
				answer:
					"It may be the starter, the alternator or another electrical fault. We can tow the vehicle to a mechanic of your choice.",
			},
		],
	},

	"vehicle-transport": {
		title: "Flatbed and Breakdown Towing",
		metaTitle: "Flatbed Towing Brampton | AWD & Long Distance | Pixel Towing",
		metaDesc:
			"Flatbed towing in Brampton for AWD, 4WD, luxury, low-clearance vehicles and motorcycles, plus long-distance towing across Ontario. Call 647-673-9755.",
		tagline: "The right truck for the vehicle — flatbed or wheel-lift.",
		image: IMAGES.flatbedTowing,
		icon: Truck,
		details: [
			"Flatbed towing keeps all four wheels off the ground and is commonly preferred for AWD and many 4WD vehicles. We'll ask about your drivetrain when you call and send the appropriate truck.",
			"We tow sedans, SUVs, pickups, low-clearance cars and motorcycles, and we take **local tows around Brampton and Mississauga** as well as **long-distance tows across Ontario**.",
			"We quote the price before we dispatch, so you know the cost before the truck arrives.",
		],
		features: [
			"Flatbed and wheel-lift trucks",
			"Long-distance towing across Ontario",
			"Motorcycles and low-clearance cars",
			"Price quoted before dispatch",
		],
		faqs: [
			{
				question: "Why do AWD vehicles usually need a flatbed?",
				answer:
					"Towing an all-wheel-drive vehicle with some wheels on the road can strain the drivetrain. Flatbed towing keeps all four wheels off the ground, which is why it's commonly preferred for AWD and many 4WD vehicles. Check your owner's manual for your vehicle's towing guidance.",
			},
			{
				question: "Can you tow long distance across Ontario?",
				answer:
					"Yes — from Brampton to Toronto, Guelph, Hamilton, London, Ottawa and beyond. Call with your pickup and destination for a quote.",
			},
			{
				question: "Can I ride in the tow truck?",
				answer:
					"Usually, yes, subject to available seating. Ask when you book.",
			},
			{
				question: "Do you transport motorcycles?",
				answer: "Yes, on a flatbed with wheel chocks and tie-downs.",
			},
		],
	},

	"scrap-car-removal": {
		title: "Scrap Car Removal",
		metaTitle: "Scrap Car Removal Brampton | Free Towing | Pixel Towing",
		metaDesc:
			"Scrap car removal in Brampton — free towing, an upfront cash offer based on your vehicle, and help with the ownership paperwork. Call 647-673-9755.",
		tagline: "An upfront offer, free towing, and help with the paperwork.",
		image: IMAGES.scrapCarRemoval,
		icon: Truck,
		details: [
			"Have a vehicle you no longer need? Pixel Towing makes a cash offer and tows it away at no charge.",
			"**How offers work:** Offers are based on the vehicle's make, model, condition and current scrap metal prices. You'll get the number before we book the pickup, and towing is not deducted from it.",
			"We take most vehicles regardless of condition — non-runners, accident damage, missing wheels or high mileage.",
		],
		features: [
			"Upfront offer before pickup",
			"Free towing",
			"Most vehicles in any condition",
			"Help with ownership transfer",
		],
		faqs: [
			{
				question: "How much will you pay for my car?",
				answer:
					"It depends on the vehicle and current metal prices. Call with the make, model, year and condition and we'll give you an offer with no obligation.",
			},
			{
				question: "Do I pay for the tow?",
				answer: "No. Removal is free and isn't deducted from your offer.",
			},
			{
				question: "What documents do I need?",
				answer:
					"The vehicle ownership (permit) and photo ID. If the ownership is lost, tell our dispatcher and we'll explain the options before pickup.",
			},
			{
				question: "How quickly can you pick it up?",
				answer:
					"Often the same or next day in Brampton, Mississauga and Caledon, depending on demand. We'll confirm a time when you book.",
			},
		],
	},
};

const renderBold = (text: string) =>
	text.split(/\*\*(.*?)\*\*/g).map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part));

const ServiceIntro = ({ service }: { service: ServiceCopy }) => (
	<Row className="g-5 align-items-center mb-5">
		<Col lg={6}>
			<Card className="border-0 shadow-lg overflow-hidden rounded-4">
				<Card.Img
					src={service.image.src}
					alt={service.image.alt}
					width={service.image.width}
					height={service.image.height}
					className="img-fluid"
					loading="eager"
				/>
			</Card>
		</Col>
		<Col lg={6}>
			<div className="d-flex align-items-center mb-3">
				<div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
					<service.icon className="text-primary" size={32} />
				</div>
				<h1 className="fw-bold mb-0 h2">{service.title}</h1>
			</div>
			<p className="lead text-primary fw-medium fst-italic mb-4">{service.tagline}</p>
			{service.details.map((p, i) => (
				<p key={i} className="text-secondary lh-lg mb-3">
					{renderBold(p)}
				</p>
			))}
			<div className="mt-4 d-flex gap-3 flex-wrap">
				<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill shadow-sm px-5">
					<Phone size={20} className="me-2 mb-1" />
					Call Now — {BUSINESS.phoneDisplay}
				</Button>
			</div>
		</Col>
	</Row>
);

const ServiceSections = ({ sections }: { sections: NonNullable<ServiceCopy["sections"]> }) => (
	<Row className="justify-content-center">
		<Col lg={10}>
			{sections.map(section => (
				<section key={section.heading} className="mb-4">
					<h2 className="h4 fw-bold mb-3">{section.heading}</h2>
					{section.paragraphs.map((p, i) => (
						<p key={i} className="text-secondary lh-lg mb-3">
							{renderBold(p)}
						</p>
					))}
				</section>
			))}
		</Col>
	</Row>
);

const ServiceFeatures =({ features }: { features: readonly string[] }) => (
	<Row className="mt-5 justify-content-center">
		<Col lg={10}>
			<Card className="border-0 bg-light p-4 rounded-4 shadow-sm mb-5">
				<h2 className="h5 fw-bold mb-4 text-dark">What's Included</h2>
				<Row xs={1} md={2} className="g-3">
					{features.map(feature => (
						<Col key={feature}>
							<div className="d-flex align-items-center">
								<CheckCircle size={20} className="text-success me-3 flex-shrink-0" />
								<span className="fw-medium text-dark">{feature}</span>
							</div>
						</Col>
					))}
				</Row>
			</Card>
		</Col>
	</Row>
);

const ServiceFaq = ({ label, faqs }: { label: string; faqs: ServiceCopy["faqs"] }) => (
	<Row className="justify-content-center">
		<Col lg={8}>
			<h2 className="h4 fw-bold mb-4 text-center">{label} — Frequently Asked Questions</h2>
			<Accordion flush className="border rounded-3 overflow-hidden">
				{faqs.map((faq, idx) => (
					<Accordion.Item eventKey={idx.toString()} key={faq.question}>
						<Accordion.Header as="h3" className="fw-bold">{faq.question}</Accordion.Header>
						<Accordion.Body className="text-secondary">{faq.answer}</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</Col>
	</Row>
);

const ServiceAreaLinks = ({ label }: { label: string }) => (
	<Row className="justify-content-center mt-5">
		<Col lg={10}>
			<Card className="border-0 bg-light rounded-4 p-4 shadow-sm">
				<h2 className="h5 fw-bold mb-3 d-flex align-items-center">
					<MapPin size={18} className="text-warning me-2" />
					{label} Service Areas
				</h2>
				<div className="d-flex flex-wrap gap-2">
					{SERVICE_AREAS.map(area => (
						<Link key={area.path} to={area.path} className="btn btn-sm btn-outline-secondary rounded-pill">
							{label} in {area.name}
						</Link>
					))}
				</div>
			</Card>
		</Col>
	</Row>
);

const ServiceCta = ({ label }: { label: string }) => (
	<div className="py-5 bg-dark text-white text-center mt-5">
		<Container>
			<h2 className="fw-bold">Need {label.toLowerCase()} now?</h2>
			<p className="lead text-white-50">{DISPATCH_MESSAGE.full}</p>
			<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold px-5 py-3 rounded-pill">
				<Phone className="me-2" />
				Call {BUSINESS.phoneDisplay}
			</Button>
		</Container>
	</div>
);

const buildServiceSchema = (slug: ServiceSlug, service: ServiceCopy, pageUrl: string) => ({
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${pageUrl}#service`,
	name: service.title,
	serviceType: SERVICE_LINKS[slug].label,
	...(service.alternateNames ? { alternateName: service.alternateNames } : {}),
	description: service.metaDesc,
	url: pageUrl,
	image: absoluteUrl(service.image.src),
	provider: BUSINESS_REF,
	areaServed: SERVICE_AREAS.map(area => areaServedSchema(area.slug)),
});

const ServiceDetailPage = () => {
	const { serviceId = "" } = useParams<{ serviceId: string }>();
	if (!isServiceSlug(serviceId)) return <NotFound />;

	const service = SERVICES[serviceId];
	const pageUrl = absoluteUrl(servicePath(serviceId));
	const label = SERVICE_LINKS[serviceId].label;

	return (
		<div style={{ paddingTop: "76px" }}>
			<SEO
				title={service.metaTitle}
				description={service.metaDesc}
				canonical={pageUrl}
				image={service.image.src}
				imageAlt={service.image.alt}
			/>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(buildServiceSchema(serviceId, service, pageUrl))}</script>
			</Helmet>
			<Breadcrumbs
				trail={[{ name: "Home", to: "/" }, { name: "Services", to: "/services" }, { name: service.title }]}
				currentUrl={pageUrl}
			/>
			<Container className="py-4">
				<ServiceIntro service={service} />
				{service.sections && <ServiceSections sections={service.sections} />}
				<ServiceFeatures features={service.features} />
				<ServiceFaq label={label} faqs={service.faqs} />
				<ServiceAreaLinks label={label} />
			</Container>
			<ServiceCta label={label} />
		</div>
	);
};

export default ServiceDetailPage;
