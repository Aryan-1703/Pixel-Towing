import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Link is key for SEO
import { ShieldAlert, KeyRound, Wrench, Zap, Truck, Phone } from "lucide-react";
import SEO from "../components/SEO"; // Don't forget this component

import accidentImage from "../assets/tow-truck-accident-recovery-brampton.jpg";
import lockout from "../assets/lockout.jpg";
import flatTire from "../assets/flatTire.png";
import jumpStart from "../assets/jumpStart.jpeg";
import towing from "../assets/flatbed-towing-brampton.jpg";

const servicesData = [
	{
		title: "Accident & Collision Recovery",
		description:
			"24/7 rapid accident response. We handle police reports and tow directly to collision centers.",
		image: accidentImage,
		link: "/services/accident-recovery",
		icon: ShieldAlert,
		alt: "Car accident towing scene in Brampton",
	},
	{
		title: "Vehicle Lockout Service",
		description:
			"Locked your keys in the car? Fast, damage-free unlocking for all makes and models.",
		image: lockout,
		link: "/services/lockout",
		icon: KeyRound,
		alt: "Professional unlocking car door",
	},
	{
		title: "Flat Tire Change",
		description:
			"Don't struggle with a jack. We come to you and install your spare tire safely.",
		image: flatTire,
		link: "/services/tire-change",
		icon: Wrench,
		alt: "Mechanic changing flat tire on roadside",
	},
	{
		title: "Battery Boost / Jump Start",
		description:
			"Dead battery? We provide safe boosting with voltage-protected equipment.",
		image: jumpStart,
		link: "/services/jump-start",
		icon: Zap,
		alt: "Jump starting a dead car battery",
	},
	{
		title: "Vehicle Breakdown Towing",
		description:
			"Flatbed towing for mechanical failures. Safe for AWD, Luxury, and 4x4 vehicles.",
		image: towing,
		link: "/services/vehicle-transport",
		icon: Truck,
		alt: "Flatbed tow truck loading a broken down car",
	},
];

const pageStyles = `
  .services-hero {
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/src/assets/tow.jpg'); 
    background-size: cover;
    background-position: center;
    padding: 6rem 0;
    margin-top: 56px;
    color: white;
  }
`;

const ServicesPage = () => {
	// navigate hook is no longer needed since we use real Links

	return (
		<>
			{/* 1. SEO META TAGS */}
			<SEO
				title="Towing Services Brampton | Roadside Assistance & Accident Recovery"
				description="View our full list of services: Accident Towing, Flatbed Towing, Lockouts, Tire Changes, and Battery Boosts. Available 24/7 in Brampton & GTA."
				canonical="https://pixeltowing.com/services"
			/>

			<style>{pageStyles}</style>

			<div className="services-hero text-center">
				<Container>
					{/* 2. OPTIMIZED H1 */}
					<h1 className="display-4 fw-bold">Professional Towing Services</h1>
					<p className="lead text-white-50">
						Serving Brampton, Mississauga, and Toronto 24 Hours a Day.
					</p>
				</Container>
			</div>

			<div className="py-5 bg-light">
				<Container>
					<Row xs={1} md={2} lg={3} className="g-4">
						{servicesData.map((s, i) => (
							<Col key={i}>
								<Card className="h-100 shadow-sm border-0">
									{/* 3. IMAGE ALT TEXT */}
									<Card.Img
										src={s.image}
										alt={s.alt}
										style={{ height: 200, objectFit: "cover" }}
									/>
									<Card.Body className="d-flex flex-column">
										<Card.Title className="d-flex align-items-center mb-3 h4">
											<s.icon className="me-2 text-primary" size={24} />
											{s.title}
										</Card.Title>
										<Card.Text className="text-muted flex-grow-1">
											{s.description}
										</Card.Text>

										{/* 4. REAL LINKS FOR CRAWLING */}
										<Link to={s.link} className="mt-auto w-100">
											<Button variant="outline-primary" className="w-100">
												View Details
											</Button>
										</Link>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</div>

			<div className="py-5 bg-dark text-white text-center">
				<Container>
					<h2 className="fw-bold">Need Immediate Roadside Help?</h2>
					<p className="lead text-white-50 mb-4">
						Our emergency dispatch is standing by. Fast ETA guaranteed.
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
		</>
	);
};

export default ServicesPage;
