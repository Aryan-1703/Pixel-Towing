import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, KeyRound, Wrench, Zap, Truck, Phone } from "lucide-react";
import accidentImage from "../assets/accident.jpg";
import lockout from "../assets/lockout.jpg";
import flatTire from "../assets/flatTire.png";
import jumpStart from "../assets/jumpStart.jpeg";
import towing from "../assets/towing.jpg";

// You would replace these with your actual high-quality photos
const servicesData = [
	{
		title: "Accident & Collision Recovery",
		description:
			"24/7 rapid response for accidents. We handle your vehicle with professional care and work directly with insurance companies to make a stressful time easier.",
		image: accidentImage,
		link: "/services/accident-recovery",
		icon: ShieldAlert,
	},
	{
		title: "Vehicle Lockout Service",
		description:
			"Locked out of your car? Our specialists provide fast, damage-free unlocking for all vehicle makes and models to get you back in.",
		image: lockout,
		link: "/services/lockout",
		icon: KeyRound,
	},
	{
		title: "Flat Tire Change",
		description:
			"Don't risk changing a tire on a busy road. We'll quickly and safely install your spare tire, getting you back on your journey in minutes.",
		image: flatTire,
		link: "/services/tire-change",
		icon: Wrench,
	},
	{
		title: "Battery Boost / Jump Start",
		description:
			"A dead battery can happen anytime. Our powerful boosting equipment will safely jump-start your vehicle, whether it's a car, truck, or SUV.",
		image: jumpStart,
		link: "/services/jump-start",
		icon: Zap,
	},
	{
		title: "Vehicle Breakdown Towing",
		description:
			"From engine failure to transmission issues, our modern flatbed tow trucks ensure your vehicle is transported safely to your preferred mechanic or home.",
		image: towing,
		link: "/services/vehicle-transport",
		icon: Truck,
	},
];

// Custom CSS for the hero section of this page
const pageStyles = `
  .services-hero {
    background: linear-gradient(rgba(29, 37, 51, 0.8), rgba(29, 37, 51, 0.8)), url('/images/services-bg.jpg');
    background-size: cover;
    background-position: center;
    padding: 6rem 0;
    margin-top: 56px; /* Adjust for the navbar height */
    color: white;
  }
`;

const ServicesPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<style>{pageStyles}</style>

			{/* Hero Section */}
			<div className="services-hero text-center">
				<Container>
					<h1 className="display-4 fw-bold">Towing & Roadside Services</h1>
					<p className="lead text-white-50">
						Reliable, professional, and fast assistance for any situation on the road.
						We're here to help 24/7.
					</p>
				</Container>
			</div>

			{/* Services Grid */}
			<div className="py-5 bg-light">
				<Container>
					<Row xs={1} md={2} lg={3} className="g-4">
						{servicesData.map((service, index) => (
							<Col key={index}>
								<Card className="h-100 shadow-sm border-0 d-flex flex-column">
									<Card.Img
										variant="top"
										src={service.image}
										alt={service.title}
										style={{ height: "200px", objectFit: "cover" }}
									/>
									<Card.Body className="d-flex flex-column">
										<Card.Title as="h3" className="d-flex align-items-center mb-3">
											<service.icon className="me-2 text-primary" size={24} />
											{service.title}
										</Card.Title>
										<Card.Text className="text-muted flex-grow-1">
											{service.description}
										</Card.Text>
										<Button
											variant="outline-primary"
											className="mt-auto"
											onClick={() => navigate(service.link)}
										>
											Learn More
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</div>

			{/* Call to Action Section */}
			<div className="py-5 bg-dark text-white text-center">
				<Container>
					<h2 className="display-5 fw-bold">Stranded? Need Help Now?</h2>
					<p className="lead text-white-50 mb-4">
						Our emergency dispatch is ready to take your call.
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
		</>
	);
};

export default ServicesPage;
