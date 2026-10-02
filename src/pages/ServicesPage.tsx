import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShieldAlert, KeyRound, Wrench, Zap, Truck, Phone, Banknote, type LucideIcon } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { IMAGES, type SiteImage } from "../assets/images";
import { BUSINESS, DISPATCH_MESSAGE, absoluteUrl } from "../content/site";
import { ACCIDENT_RECOVERY, SERVICE_LINKS, servicePath } from "../content/services";

interface ServiceCard {
	title: string;
	description: string;
	image: SiteImage;
	link: string;
	/** Descriptive anchor text for the card's link. */
	anchor: string;
	icon: LucideIcon;
}

const SERVICE_CARDS: readonly ServiceCard[] = [
	{
		title: "Accident Towing & Recovery",
		description: "24/7 accident towing, help getting to a Collision Reporting Centre, and delivery to the repair shop you choose.",
		image: IMAGES.accidentTowing,
		link: ACCIDENT_RECOVERY.path,
		anchor: ACCIDENT_RECOVERY.anchor,
		icon: ShieldAlert,
	},
	{
		title: "Car Lockout Service",
		description: "Keys locked in the car? Professional entry tools designed to minimize the risk of damage.",
		image: IMAGES.carLockout,
		link: servicePath("lockout"),
		anchor: SERVICE_LINKS.lockout.anchor,
		icon: KeyRound,
	},
	{
		title: "Flat Tire Change",
		description: "We come to you and fit your spare, tightened to specification.",
		image: IMAGES.flatTireChange,
		link: servicePath("tire-change"),
		anchor: SERVICE_LINKS["tire-change"].anchor,
		icon: Wrench,
	},
	{
		title: "Battery Boost / Jump Start",
		description: "Dead battery? A boost with a professional booster pack and a basic charging check.",
		image: IMAGES.batteryBoost,
		link: servicePath("jump-start"),
		anchor: SERVICE_LINKS["jump-start"].anchor,
		icon: Zap,
	},
	{
		title: "Flatbed & Breakdown Towing",
		description: "Flatbed towing for breakdowns, commonly preferred for AWD and many 4WD vehicles. Local and long distance.",
		image: IMAGES.flatbedTowing,
		link: servicePath("vehicle-transport"),
		anchor: SERVICE_LINKS["vehicle-transport"].anchor,
		icon: Truck,
	},
	{
		title: "Scrap Car Removal",
		description: "An upfront cash offer and free towing for vehicles you no longer need.",
		image: IMAGES.scrapCarRemoval,
		link: servicePath("scrap-car-removal"),
		anchor: SERVICE_LINKS["scrap-car-removal"].anchor,
		icon: Banknote,
	},
];

// Fixed backgrounds are janky (and ignored by iOS) on phones — desktop only.
const pageStyles = `
  .services-hero {
    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/tow.jpg');
    background-size: cover;
    background-position: center;
    padding: 6rem 0;
    margin-top: 56px;
    color: white;
  }
  @media (min-width: 992px) {
    .services-hero { background-attachment: fixed; }
  }
`;

const ServicesPage = () => {
	const pageUrl = absoluteUrl("/services");
	return (
		<>
			<SEO
				title="Towing Services Brampton | 24/7 Roadside | Pixel Towing"
				description="Accident towing, car lockouts, flat tire changes, battery boosts, flatbed towing and scrap car removal in Brampton. 24/7: 647-673-9755."
				canonical={pageUrl}
			/>

			<style>{pageStyles}</style>

			<div className="services-hero text-center">
				<Container>
					<h1 className="display-4 fw-bold">Brampton Towing &amp; Roadside Services</h1>
					<p className="lead text-white-50">
						Serving Brampton, Mississauga, Caledon and the GTA 24 hours a day.
					</p>
				</Container>
			</div>

			<Breadcrumbs trail={[{ name: "Home", to: "/" }, { name: "Services" }]} currentUrl={pageUrl} />

			<div className="py-5 bg-light">
				<Container>
					<Row xs={1} md={2} lg={3} className="g-4">
						{SERVICE_CARDS.map(s => (
							<Col key={s.link}>
								<Card className="h-100 shadow-sm border-0">
									<Card.Img
										src={s.image.src}
										alt={s.image.alt}
										width={s.image.width}
										height={s.image.height}
										style={{ height: 200, objectFit: "cover" }}
										loading="lazy"
									/>
									<Card.Body className="d-flex flex-column">
										<h2 className="d-flex align-items-center mb-3 h4">
											<s.icon className="me-2 text-primary" size={24} />
											{s.title}
										</h2>
										<Card.Text className="text-muted flex-grow-1">{s.description}</Card.Text>
										<Link to={s.link} className="btn btn-outline-primary w-100 mt-auto">
											{s.anchor}
										</Link>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</div>

			<div className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold">Common Service Questions</h2>
					</div>
					<Row className="justify-content-center">
						<Col md={8}>
							<Accordion flush>
								<Accordion.Item eventKey="0">
									<Accordion.Header as="h3">Which areas do you cover?</Accordion.Header>
									<Accordion.Body>
										We're based in Brampton and serve Peel Region and nearby GTA, Halton and
										Wellington communities. See all of our{" "}
										<Link to="/locations">towing service areas</Link>. Long-distance towing is
										available on request.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header as="h3">How quickly can you get to me?</Accordion.Header>
									<Accordion.Body>{DISPATCH_MESSAGE.full}</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Container>
			</div>

			<div className="py-5 bg-dark text-white text-center">
				<Container>
					<h2 className="fw-bold">Need Roadside Help Now?</h2>
					<p className="lead text-white-50 mb-4">{DISPATCH_MESSAGE.short} — call any time.</p>
					<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold px-5 py-3 rounded-pill">
						<Phone className="me-2" />
						Call {BUSINESS.phoneDisplay}
					</Button>
				</Container>
			</div>
		</>
	);
};

export default ServicesPage;
