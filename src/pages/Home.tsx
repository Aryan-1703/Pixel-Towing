import { Container, Row, Col, Button, Card } from "react-bootstrap";
import IntroHero from "../components/IntroHero";
import "../css/Home.css";

const Home = () => {
	return (
		<>
			<IntroHero />

			{/* Hero Section */}
			<section
				className="hero-section text-white text-center py-5"
				style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }}
			>
				<Container>
					<h1 className="display-4 fw-bold">Reliable Towing, Anytime You Need It</h1>
					<p className="lead">Available 24/7 in Brampton & GTA</p>
					<Button variant="warning" size="lg">
						Call Now: +1 647 673 9755
					</Button>
					<p className="mt-3">
						Email:{" "}
						<a href="mailto:towing@pixel17.com" className="text-white">
							towing@pixel17.com
						</a>
					</p>
				</Container>
			</section>

			{/* Services Section */}
			<section className="services-section py-5" style={{ backgroundColor: "#f9f9f9" }}>
				<Container>
					<h2 className="text-center mb-5 text-primary">Our Services</h2>
					<Row>
						{[
							{
								title: "Accident Recovery",
								description:
									"When you're in a collision, we provide rapid accident recovery to get your vehicle off the road and to safety. Our trained operators ensure your car is handled with care and efficiency.",
								icon: "🚨",
							},
							{
								title: "Roadside Assistance",
								description:
									"We provide comprehensive roadside help, including jump starts, tire changes, fuel delivery, and minor mechanical support to get you moving again—fast and safely.",
								icon: "🧰",
							},
							{
								title: "Vehicle Transport & Towing",
								description:
									"From short-distance to long-distance towing, we offer secure transport for all vehicle types. Whether you're stranded or relocating a vehicle, we’ve got you covered.",
								icon: "🚛",
							},
							{
								title: "Lockout Services",
								description:
									"Locked out of your vehicle? No worries. Our team can safely unlock your doors without damage, getting you back behind the wheel in no time.",
								icon: "🔐",
							},
						].map((service, idx) => (
							<Col key={idx} md={6} className="mb-4">
								<Card className="h-100 shadow-lg border-0 text-center">
									<Card.Body>
										<div style={{ fontSize: "3rem" }}>{service.icon}</div>
										<Card.Title className="mt-3 text-dark fw-bold">
											{service.title}
										</Card.Title>
										<Card.Text className="text-muted">{service.description}</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* About Section */}
			<section className="about-section py-5" style={{ backgroundColor: "#fff" }}>
				<Container>
					<Row className="align-items-center">
						<Col md={6}>
							<h2 className="text-secondary">About Pixel Towing</h2>
							<p className="text-muted">
								At Pixel Towing, we believe that no one should be left stranded. With a
								team of certified drivers, modern tow trucks, and unmatched dedication, we
								deliver fast and safe towing services across Brampton and surrounding
								areas. Our mission is to make towing stress-free and trustworthy.
							</p>
						</Col>
						<Col md={6}>
							<img
								src="/images/towing-truck.jpg"
								alt="Towing Truck"
								className="img-fluid rounded shadow-sm"
							/>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Contact Section */}
			<section
				className="contact-section py-5 text-white"
				style={{ background: "linear-gradient(to right, #141e30, #243b55)" }}
			>
				<Container className="text-center">
					<h2 className="mb-3">Need Help Now?</h2>
					<p className="mb-4">Call us 24/7 or get in touch for scheduled service.</p>
					<Button variant="warning" size="lg">
						Call Us: +1 647 673 9755
					</Button>
					<p className="mt-3">
						Email:{" "}
						<a href="mailto:towing@pixel17.com" className="text-white">
							towing@pixel17.com
						</a>
					</p>
				</Container>
			</section>
		</>
	);
};

export default Home;
