import { Container, Row, Col, Card, Button, Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Phone, ShieldAlert, KeyRound, Wrench, Zap, Truck } from "lucide-react";
import lockout from "../assets/lockout.jpg";
import flatTire from "../assets/flatTire.png";
import accident from "../assets/accident.jpg";
import jumpStart from "../assets/jumpStart.jpeg";
import towing from "../assets/towing.jpg";

const allServicesData = {
	"accident-recovery": {
		title: "24/7 Accident Towing & Collision Recovery in [Your City/Region]",
		tagline:
			"Just Been in an Accident? We Handle the Tow, Secure Storage, and Insurance Hassle.",
		image: accident,
		icon: ShieldAlert,
		details: [
			"The moments after a car crash are confusing. You need more than just a tow truck—you need an accident recovery partner. Our team specializes in post-accident services, guiding you from the roadside chaos to a clear resolution. We handle the entire process, so you can focus on what's most important: your well-being.",

			"**Step 1: Safe, On-Scene Accident Response**\nYour safety is our priority. When you search for 'accident towing near me,' you need a fast and professional response. Our licensed towing operator will secure the scene and advise you on your rights, including your right to choose your tow provider. Using state-of-the-art flatbed tow trucks and recovery equipment, we'll retrieve your vehicle without causing further damage, a critical step in any car accident cleanup.",

			"**Step 2: Secure Vehicle Storage & Insurance Coordination**\nThis is where we eliminate your biggest headache. We provide secure vehicle transport to our licensed, camera-monitored storage facility. From there, we take over communication:",
			"- We immediately contact your insurance provider's claims department for you.\n- We provide all key information: the secure vehicle location, policy details, and police incident number.\n- We schedule the insurance appraiser to inspect your damaged vehicle at our facility. You don't have to worry about coordinating calls or finding the car.",

			"**Step 3: Managing the Appraisal & Final Steps**\nAfter the insurance adjuster inspects the vehicle, we manage the outcome:",
			"- **If the vehicle is repairable:** We will coordinate with the auto body shop of your choice to transport the vehicle for repairs.\n- **If the vehicle is deemed a total loss:** Once you settle with your insurer, we handle the final vehicle release directly to them or their designated salvage yard. This frees you from dealing with post-accident storage fees and logistics.",

			"With our comprehensive collision towing service, the entire logistical nightmare is handled by one professional team. You make one call, and we manage the rest.",
		],
		features: [
			"24/7 Emergency Accident & Collision Towing",
			"Direct Insurance Billing & Claims Assistance",
			"Damage-Free Recovery (Flatbed & Wheel-Lift Tow Trucks)",
			"Guidance on Your 'Right to Choose' Your Towing Service",
			"Secure, Monitored Post-Accident Vehicle Storage",
			"Liaison with Your Chosen Auto Body Shop",
			"Wreck and Recovery Services for All Vehicle Types",
			"Fast Response Times for Roadside Emergencies",
		],

		cta: {
			headline: "In an Accident? Call for Immediate Dispatch.",
			phone_text: "24/7 Emergency Line:",
			phone_number: "647-673-9755",
			link_text: "Learn More About Our Process",
			link_href: "/accident-process",
		},
	},
	lockout: {
		title: "Emergency Car Lockout Service in Brampton/Mississauga/GTA",
		tagline:
			"Locked Keys in Your Car? We Provide Fast, Damage-Free Unlocking, Guaranteed.",
		image: lockout,
		icon: KeyRound,
		details: [
			"Locked your keys in the car? It's a frustrating moment, but the solution shouldn't be. As vehicle entry specialists and professional auto locksmiths, we get you back in without adding stress. If you're thinking 'I've locked my keys in my car,' we are the fast, reliable solution you're searching for.",
			"Our car unlock service uses a range of specialized, vehicle-specific tools—from high-tech Lishi decoders to soft, inflatable air wedges that protect your door frame and weather stripping. This modern, non-destructive approach interacts directly with the lock, guaranteeing zero damage to your paint, window seals, or complex electronic locking systems. This is the safest way to retrieve keys locked in a car.",
			"Whether your keys are locked in the trunk, you have a push-to-start system with a key fob inside, or you drive a high-security European model (like BMW, Mercedes, Audi), our technicians have the expertise to get you back on the road quickly and safely. We are your local car lockout experts.",
		],
		features: [
			"100% Damage-Free Car Unlocking Guarantee",
			"24/7 Emergency Lockout Service & Rapid Response",
			"Unlocking All Makes & Models (Luxury, European, Domestic)",
			"Expertise with Keys Locked in Trunk",
			"Safe Retrieval of Key Fobs, Smart Keys, & Transponders",
			"Trained & Insured Auto Locksmith Technicians",
		],

		// NEW SECTION: Clear calls to action (CTAs) to convert searches into customers.
		cta: {
			headline: "Stranded? Get Immediate Help!",
			phone_text: "Call Now for a Fast Quote:",
			phone_number: "Your-Phone-Number",
			link_text: "Request Service Online",
			link_href: "/contact-us",
		},
	},
	"tire-change": {
		title: "Professional Roadside Tire Service",
		tagline: "Your Safety is Our Priority. The Job Done Right.",
		image: flatTire,
		icon: Wrench,
		details: [
			"A flat tire rarely happens in a convenient location. Changing it on the shoulder of a busy road or in the dark is a significant safety risk. Our service is designed to protect you. Our highly visible assistance vehicles create a safe zone around your car while our technicians work.",
			"We don't just put on the spare; we do it to manufacturer specifications. This includes using a professional-grade impact wrench for removal, a calibrated torque wrench for proper tightening of lug nuts to prevent warping your rotors, and checking the spare's pressure. If your spare is unusable or missing, we provide honest options, including towing you to the nearest trusted tire shop.",
		],
		features: [
			"High-Visibility Roadside Safety Setup",
			"Calibrated Torque Wrench for Proper Tightening",
			"Spare Tire Pressure Check & Inflation",
			"Inspection of Damaged Tire",
			"Towing to a Tire Shop if Needed",
		],
	},
	"jump-start": {
		title: "Safe Battery Boost & Diagnostics",
		tagline: "The Right Power, The Right Way. Protecting Your Vehicle's Brain.",
		image: jumpStart,
		icon: Zap,
		details: [
			"In a modern vehicle, a jump start is a sensitive procedure. Using improper equipment or technique can send a voltage spike that damages your car's Engine Control Unit (ECU) and other electronics, leading to thousands in repairs. We eliminate that risk.",
			"Our service trucks are equipped with commercial-grade, microprocessor-controlled jump packs. These units deliver a clean, stable, and correct voltage, safely waking up your battery without ever threatening your car's delicate systems. After the boost, we can perform a quick diagnostic check on your battery and alternator to see if the problem is likely to reoccur, giving you peace of mind.",
		],
		features: [
			"ECU & Sensitive Electronics Protection",
			"Microprocessor-Controlled Power Delivery",
			"Post-Boost Battery & Alternator Check",
			"Service for Cars, SUVs, Trucks, and Commercial Vehicles",
			"Guaranteed Safe for All Vehicle Types",
		],
	},
	"vehicle-transport": {
		title: "Specialized Vehicle Transport",
		tagline: "The Right Truck and the Right Technique for Your Specific Vehicle.",
		image: towing,
		icon: Truck,
		details: [
			"When your vehicle can't move on its own, 'towing' isn't a one-size-fits-all solution. Using the wrong method can cause severe damage to your transmission, suspension, or bodywork. We assess your specific situation and dispatch the correct truck for the job.",
			"**For All-Wheel Drive (AWD), 4x4, and low-clearance vehicles** our flatbed and dolllies tow trucks are the only safe option. The entire vehicle rests on the bed, ensuring no part of the drivetrain is engaged or stressed during transport. **For standard 2-wheel drive vehicles** our modern wheel-lift trucks can provide efficient and safe transport. Every vehicle, regardless of the method, is secured with a meticulous multi-point tie-down system for a damage-free journey.",
		],
		features: [
			"Flatbed Towing for AWD, 4x4 & Specialty Cars",
			"Modern Wheel-Lift for 2WD Vehicles",
			"Damage-Free Multi-Point Tie-Down System",
			"Local & Long-Distance Transport",
			"Motorcycle & Classic Car Expertise",
		],
	},
};

// A helper type for our service keys
type ServiceKey = keyof typeof allServicesData;

const ServiceDetailPage = () => {
	const { serviceId } = useParams<{ serviceId: ServiceKey }>();

	// If the serviceId is invalid or not found, show a not found message
	if (!serviceId || !allServicesData[serviceId]) {
		return (
			<Container className="py-5" style={{ marginTop: "56px" }}>
				<h2>Service Not Found</h2>
				<p>The service you are looking for does not exist.</p>
				<Link to="/services">Back to all services</Link>
			</Container>
		);
	}

	const service = allServicesData[serviceId];
	const IconComponent = service.icon;

	return (
		<div style={{ paddingTop: "56px" }}>
			{/* Breadcrumb Navigation */}
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

			<Container className="py-5">
				<Row className="g-5 align-items-center">
					<Col lg={6}>
						<Card className="border-0">
							<Card.Img
								variant="top"
								src={service.image}
								alt={service.title}
								className="rounded-3 shadow-lg"
							/>
						</Card>
					</Col>
					<Col lg={6}>
						<div className="d-flex align-items-center mb-3">
							<IconComponent className="text-primary me-3" size={40} />
							<h1 className="display-5 fw-bold mb-0">{service.title}</h1>
						</div>
						<p className="lead text-muted mb-4">{service.tagline}</p>

						{/* NEW, ENHANCED RENDERING LOGIC */}
						{service.details.map((paragraph, index) => {
							const parts = paragraph.split(/(\*\*.*?\*\*|\n- .*)/g).filter(Boolean);

							return (
								<div key={index} className="mb-3">
									{parts.map((part, partIndex) => {
										if (part.startsWith("**") && part.endsWith("**")) {
											// Render as a bold heading
											return (
												<h4 key={partIndex} className="mt-3">
													{part.slice(2, -2)}
												</h4>
											);
										}
										if (part.startsWith("\n- ")) {
											return (
												<li key={partIndex} className="ms-3">
													{part.slice(3)}
												</li>
											);
										}
										return <span key={partIndex}>{part}</span>;
									})}
								</div>
							);
						})}
					</Col>
				</Row>

				<Row className="mt-5 bg-light p-4 rounded-3">
					<h3 className="mb-3">Key Features of This Service</h3>
					{service.features.map((feature, index) => (
						<Col md={6} key={index} className="mb-2">
							<p>
								<ShieldAlert size={16} className="text-success me-2" /> {feature}
							</p>
						</Col>
					))}
				</Row>
			</Container>

			{/* Re-usable Call to Action Section */}
			<div className="py-5 bg-dark text-white text-center">
				<Container>
					<h2 className="display-5 fw-bold">Need This Service Now?</h2>
					<p className="lead text-white-50 mb-4">
						We are available around the clock to help.
					</p>
					<Button
						href="tel:+16476739755"
						variant="warning"
						size="lg"
						className="fw-bold px-5 py-3"
					>
						<Phone className="me-2" />
						Call for Immediate Assistance
					</Button>
				</Container>
			</div>
		</div>
	);
};

export default ServiceDetailPage;
