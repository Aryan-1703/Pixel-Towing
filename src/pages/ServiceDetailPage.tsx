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
		// A more powerful title and tagline
		title: "Accident Management & Recovery",
		tagline: "From Roadside to Resolution: Your Complete Accident Support Partner.",
		image: accident,
		icon: ShieldAlert,
		// The new, detailed "story" of your service
		details: [
			"In the moments after a collision, confusion and stress are overwhelming. You're faced with questions: What do I do now? What are my rights? Where should my car go? Who do I call first? This is where Pixel Towing becomes more than just a towing service—we become your dedicated accident manager.",

			"We provide a clear, guided process to protect you and your vehicle, handling the complex logistics so you can focus on your well-being.",

			"**Step 1: Immediate On-Scene Assistance**\nOur first priority is your safety. Upon arrival, our licensed driver will secure the scene. Crucially, we will inform you of your rights, including your right to choose where your vehicle is towed. We will then use our state-of-the-art equipment to recover your vehicle without any further damage, whether it needs a flatbed or a dolly.",

			"**Step 2: Secure Transport & Insurance Notification**\nThe real hassle begins after the tow, and that's the hassle we eliminate. We transport your vehicle to a secure, licensed, and monitored storage facility. From there, we immediately take on the communication burden:",
			"- We contact your insurance company's claims department on your behalf.\n- We provide them with all necessary details: the vehicle's secure location, your name, and the police incident number.\n- We formally arrange for their appraiser to come and inspect the vehicle at our facility. You don't have to make a single call about the car's location.",

			"**Step 3: Managing the Appraisal & Resolution**\nOnce the appraiser inspects the vehicle, one of two things will happen:",
			"- **If the vehicle is repairable:** We coordinate with the body shop of your choice to have the vehicle moved for repairs.\n- **If the vehicle is a total loss:** After you've reached a settlement with your insurer, we manage the final release of the vehicle directly to them. You won't have to worry about storage fees or arranging the final pickup.",

			"With Pixel Towing, the entire logistical nightmare of a post-accident situation is handled by one professional, compassionate team. You make one call—to us.",
		],

		features: [
			"Complete Insurance Claims Coordination",
			"Your Right-to-Choose Towing Guidance",
			"24/7 Emergency Accident Response",
			"Direct Billing to Most Insurance Providers",
			"Specialized Recovery Equipment (Flatbed/Dolly)",
			"Secure, Camera-Monitored Vehicle Storage",
			"Police Reporting Centre Transportation",
			"Coordination with Your Chosen Body Shop",
		],
	},
	lockout: {
		title: "Precision Lockout Service",
		tagline: "Access Restored. Vehicle Untouched. Guaranteed.",
		image: lockout,
		icon: KeyRound,
		details: [
			"Being locked out is a moment of pure frustration. The solution shouldn't add to your stress. Our technicians are not just locksmiths; they are vehicle entry specialists who treat your car as if it were their own.",
			"We use a range of specialized, vehicle-specific tools—from high-tech decoders to soft, inflatable air wedges—that interact directly with the lock mechanism, bypassing the door and electronics entirely. This modern, non-destructive approach guarantees zero damage to your paint, window seals, or complex locking systems.",
			"Whether you have a traditional key, a push-to-start system, or a high-security European model, we have the expertise to get you back inside quickly and safely.",
		],
		features: [
			"100% Damage-Free Guarantee",
			"Expertise with All Makes & Models (Incl. Luxury & European)",
			"Advanced Non-Destructive Tools",
			"Key Fob & Transponder Key Solutions",
			"Rapid Response Times",
		],
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
