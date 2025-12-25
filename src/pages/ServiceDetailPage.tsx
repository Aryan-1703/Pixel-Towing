import { Container, Row, Col, Card, Button, Breadcrumb } from "react-bootstrap";
import { Link, useParams, Navigate } from "react-router-dom";
import {
	Phone,
	ShieldAlert,
	KeyRound,
	Wrench,
	Zap,
	Truck,
	CheckCircle,
} from "lucide-react";
import SEO from "../components/SEO"; // SEO Component for Metadata

import lockout from "../assets/lockout.jpg";
import flatTire from "../assets/flatTire.png";
import accident from "../assets/tow-truck-accident-recovery-brampton.jpg";
import jumpStart from "../assets/jumpStart.jpeg";
import towing from "../assets/flatbed-towing-brampton.jpg";

const allServicesData = {
	"accident-recovery": {
		title: "Accident Recovery Towing",
		metaTitle: "Accident Recovery Towing Brampton | Insurance & Collision Assistance",
		metaDesc:
			"Immediate accident recovery towing in Brampton & GTA. We handle insurance claims, secure vehicle storage, and towing to collision centers. 24/7 Service.",
		tagline:
			"Just Been in an Accident? We Handle the Tow, Secure Storage, and Insurance Hassle.",
		image: accident,
		icon: ShieldAlert,
		details: [
			"The moments after a car crash are confusing. You need more than just a tow truck—you need an accident recovery partner.",
			"We manage the entire process, ensuring your vehicle is transported safely to our secure lot or a collision reporting center.",
			"Our team assists directly with insurance companies, saving you time and stress during a difficult situation.",
		],
		features: [
			"24/7 Emergency Accident Response",
			"Direct Billing to Insurance Companies",
			"Secure, Monitored Storage Facility",
			"Assistance at Collision Reporting Centers",
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
			"20-30 Minute Arrival Time",
			"Keys Locked in Trunk Retrieval",
			"Licensed & Insured Techs",
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
	},
};

type ServiceKey = keyof typeof allServicesData;

const ServiceDetailPage = () => {
	const { serviceId } = useParams<{ serviceId: ServiceKey }>();

	// SEO-Friendly Redirect: If invalid service, go to services listing
	if (!serviceId || !allServicesData[serviceId]) {
		return <Navigate to="/services" replace />;
	}

	const service = allServicesData[serviceId];
	const IconComponent = service.icon;

	// Structured Data (Service Schema)
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Service",
		serviceType: service.title,
		provider: {
			"@type": "LocalBusiness",
			name: "Pixel Towing",
			telephone: "+16476739755",
		},
		areaServed: {
			"@type": "City",
			name: "Brampton",
		},
		description: service.metaDesc,
	};

	return (
		<div style={{ paddingTop: "76px" }}>
			{" "}
			{/* Adjusted padding for Navbar */}
			{/* 1. DYNAMIC META TAGS PER SERVICE */}
			<SEO
				title={service.metaTitle}
				description={service.metaDesc}
				canonical={`https://pixeltowing.com/services/${serviceId}`}
			/>
			<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
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
				<Row className="g-5 align-items-center">
					<Col lg={6}>
						<Card className="border-0 shadow-lg overflow-hidden">
							<Card.Img
								src={service.image}
								alt={`${service.title} - Pixel Towing Brampton`} // Added Alt
								className="img-fluid"
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

						<p className="lead text-primary fw-medium fst-italic">{service.tagline}</p>

						{service.details.map((p, i) => (
							<p key={i} className="text-secondary lh-lg">
								{p}
							</p>
						))}

						<div className="mt-4">
							<Button
								href="tel:+16476739755"
								variant="warning"
								size="lg"
								className="fw-bold rounded-pill shadow-sm px-4"
							>
								<Phone size={20} className="me-2 mb-1" />
								Get {service.title} Now
							</Button>
						</div>
					</Col>
				</Row>

				<Row className="mt-5 justify-content-center">
					<Col lg={10}>
						<Card className="border-0 bg-light p-4 rounded-4">
							<h3 className="h4 fw-bold mb-4">Why Choose Pixel for {service.title}?</h3>
							<Row xs={1} md={2} className="g-3">
								{service.features.map((feature, i) => (
									<Col key={i}>
										<div className="d-flex align-items-center">
											<CheckCircle
												size={20}
												className="text-success me-3 flex-shrink-0"
											/>
											<span className="fw-medium">{feature}</span>
										</div>
									</Col>
								))}
							</Row>
						</Card>
					</Col>
				</Row>
			</Container>
			<div className="py-5 bg-dark text-white text-center mt-5">
				<Container>
					<h2 className="fw-bold">Ready to Dispatch?</h2>
					<p className="lead text-white-50">
						Our tow trucks are minutes away in Brampton & Mississauga.
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
