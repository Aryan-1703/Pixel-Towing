import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { Phone, CheckCircle, Truck, Wrench, ShieldAlert } from "lucide-react";
import SEO from "../components/SEO";

// Images (Reuse existing assets)
import heroBg from "../assets/tow.jpg";
import flatbedImg from "../assets/flatbed-towing-brampton.jpg";

// 🌍 DYNAMIC CITY DATA
const CITY_DATA: Record<
	string,
	{
		name: string;
		title: string;
		highways: string;
		landmarks: string;
		desc: string;
	}
> = {
	mississauga: {
		name: "Mississauga",
		title: "Towing Services in Mississauga",
		highways: "Highway 410 & Highway 407 access points",
		landmarks: "Square One, Heartland, and Port Credit",
		desc: "Pixel Towing provides fast towing and roadside assistance across Mississauga. Once your vehicle is safely off major highways, our operators can assist near Square One, Port Credit, and surrounding service roads.",
	},

	caledon: {
		name: "Caledon",
		title: "Caledon Towing & Roadside Assistance",
		highways: "Highway 50 access areas",
		landmarks: "Bolton, Mayfield Rd, and Valleywood",
		desc: "Stuck in Caledon or Bolton? Pixel Towing specializes in rural towing, ditch pull-outs, and roadside recovery. Assistance is available once vehicles are safely off main highways and positioned on service or local roads.",
	},

	etobicoke: {
		name: "Etobicoke",
		title: "Etobicoke Tow Truck Service",
		highways: "Nearby Highway 427 exits",
		landmarks: "Pearson Airport, Rexdale, and Queensway",
		desc: "Serving North and South Etobicoke with reliable towing and roadside services. Our drivers respond quickly to vehicles located off highways near airport roads, industrial areas, and residential streets.",
	},

	vaughan: {
		name: "Vaughan",
		title: "Tow Truck Service in Vaughan",
		highways: "Highway 7 & Highway 407 access routes",
		landmarks: "Woodbridge, Vaughan Mills, and Maple",
		desc: "From Woodbridge to Maple, Pixel Towing delivers dependable flatbed towing and roadside help. Accident recovery and assistance is provided once vehicles are safely off major highways and cleared by authorities.",
	},

	toronto: {
		name: "Toronto",
		title: "Emergency Towing in Toronto",
		highways: "Highway 7 & surrounding arterial roads",
		landmarks: "North York, Scarborough, and Etobicoke",
		desc: "Need a tow in Toronto? Pixel Towing offers 24/7 local and long-distance towing across the GTA. Service is available once vehicles are moved off highways and onto city or service roads.",
	},
	georgetown: {
		name: "Georgetown",
		title: "Georgetown Towing Service",
		highways: "Guelph Street & Trafalgar Road",
		landmarks: "Georgetown Hospital, Downtown, and Glen Williams",
		desc: "Stuck in Georgetown? Pixel Towing offers fast local towing and long-distance transport to Brampton or Toronto. We specialize in winch-outs along Trafalgar Rd.",
	},
	acton: {
		name: "Acton",
		title: "Acton Towing & Recovery",
		highways: "Hwy 7 & Hwy 25",
		landmarks: "Fairy Lake, Main Street",
		desc: "Whether you need a boost at Sobeys or broke down on Highway 7, our trucks serve Acton 24/7. We provide affordable towing back to the city or local garages.",
	},
	"halton-hills": {
		name: "Halton Hills",
		title: "Halton Hills Tow Truck",
		highways: "Steeles Ave & 10th Line",
		landmarks: "Toronto Premium Outlets",
		desc: "Covering the entire Halton Hills region. From Acton to Georgetown, we handle roadside emergencies, ditch recoveries, and flatbed transport safely.",
	},
	erin: {
		name: "Erin",
		title: "Erin & Hillsburgh Towing",
		highways: "Wellington Road 124",
		landmarks: "Erin Fairgrounds & Main St",
		desc: "Reliable towing for Erin and Hillsburgh. We understand the rural roads and handle winching and winter recovery expertly. Long-distance towing available.",
	},
};

const LocationPage = () => {
	const { cityId } = useParams<{ cityId: string }>();

	// 1. Validation: If city doesn't exist, go to Home
	if (!cityId || !CITY_DATA[cityId.toLowerCase()]) {
		return <Navigate to="/" replace />;
	}

	const city = CITY_DATA[cityId.toLowerCase()];

	// 2. Local SEO Schema
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "AutoBody", // Using a general Automotive type or LocalBusiness
		name: `Pixel Towing ${city.name}`,
		telephone: "+16476739755",
		areaServed: {
			"@type": "City",
			name: city.name,
		},
		description: `24/7 Tow Truck and Roadside Assistance in ${city.name}. Serving ${city.highways}.`,
	};

	return (
		<div className="bg-light">
			<SEO
				title={`${city.name} Towing Service | 15 Min ETA | Pixel Towing`}
				description={`Looking for a tow truck in ${city.name}? Fast 24/7 accident recovery and roadside assistance near ${city.landmarks}. Call 647-673-9755.`}
				canonical={`https://pixeltowing.com/locations/${cityId}`}
			/>
			<script type="application/ld+json">{JSON.stringify(structuredData)}</script>

			{/* HERO SECTION */}
			<section
				className="d-flex align-items-center justify-content-center text-center text-white"
				style={{
					minHeight: "60vh",
					background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					paddingTop: "60px",
				}}
			>
				<Container>
					<span className="text-warning fw-bold letter-spacing-2 text-uppercase">
						Serving {city.name}, Ontario
					</span>
					<h1 className="display-3 fw-bold mt-2 mb-4">24/7 Tow Truck in {city.name}</h1>
					<p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "700px" }}>
						Fastest arrival times for {city.highways} and surrounding areas.
					</p>
					<Button
						href="tel:+16476739755"
						variant="warning"
						size="lg"
						className="rounded-pill px-5 fw-bold shadow-lg"
					>
						<Phone className="me-2 mb-1" /> Call {city.name} Dispatch
					</Button>
				</Container>
			</section>

			{/* LOCAL CONTENT BLOCK */}
			<section className="py-5 bg-white">
				<Container>
					<Row className="align-items-center">
						<Col lg={6}>
							<h2 className="fw-bold mb-3">{city.title}</h2>
							<p className="lead text-secondary">{city.desc}</p>
							<p className="text-muted">
								When you break down in <strong>{city.name}</strong>, you shouldn't have to
								wait hours. Pixel Towing station trucks near{" "}
								<strong>{city.highways}</strong> to ensure we get to you faster than the
								competition.
							</p>
							<ul className="list-unstyled mt-4">
								<li className="mb-2 d-flex align-items-center">
									<CheckCircle className="text-success me-2" /> 15-20 Min ETA in{" "}
									{city.name}
								</li>
								<li className="mb-2 d-flex align-items-center">
									<CheckCircle className="text-success me-2" /> Flatbed & Wheel Lift
									Trucks
								</li>
								<li className="mb-2 d-flex align-items-center">
									<CheckCircle className="text-success me-2" /> Accept Credit, Debit &
									Cash
								</li>
							</ul>
						</Col>
						<Col lg={6}>
							<Card className="border-0 shadow-sm rounded-4 overflow-hidden mt-4 mt-lg-0">
								<Card.Img src={flatbedImg} alt={`Tow Truck in ${city.name}`} />
								<Card.ImgOverlay className="d-flex align-items-end p-0">
									<div className="bg-dark bg-opacity-75 text-white w-100 p-3 text-center">
										<small className="fw-bold">We cover {city.landmarks}</small>
									</div>
								</Card.ImgOverlay>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* SERVICES IN CITY */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold">Our Services in {city.name}</h2>
					</div>
					<Row xs={1} md={3} className="g-4">
						<Col>
							<Card className="border-0 shadow-sm h-100 text-center p-4">
								<ShieldAlert size={40} className="text-danger mx-auto mb-3" />
								<h5>Accident Recovery</h5>
								<p className="text-muted small">
									Immediate accident towing from {city.highways}. Insurance approved.
								</p>
								<Link to="/services/accident-recovery" className="stretched-link">
									More info
								</Link>
							</Card>
						</Col>
						<Col>
							<Card className="border-0 shadow-sm h-100 text-center p-4">
								<Wrench size={40} className="text-primary mx-auto mb-3" />
								<h5>Roadside Assist</h5>
								<p className="text-muted small">
									Flat tire? Dead Battery? Locked out in {city.name}? We can help.
								</p>
								<Link to="/services" className="stretched-link">
									More info
								</Link>
							</Card>
						</Col>
						<Col>
							<Card className="border-0 shadow-sm h-100 text-center p-4">
								<Truck size={40} className="text-success mx-auto mb-3" />
								<h5>Long Distance</h5>
								<p className="text-muted small">
									Towing from {city.name} to anywhere in Ontario or the GTA.
								</p>
								<Link to="/services/vehicle-transport" className="stretched-link">
									More info
								</Link>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* CITY SPECIFIC FAQ */}
			<section className="py-5 bg-white">
				<Container>
					<Row className="justify-content-center">
						<Col lg={8}>
							<h3 className="text-center fw-bold mb-4">{city.name} Towing FAQ</h3>
							<Accordion flush>
								<Accordion.Item eventKey="0">
									<Accordion.Header>
										How fast can you reach me in {city.name}?
									</Accordion.Header>
									<Accordion.Body>
										We typically arrive in <strong>15 to 20 minutes</strong> for calls
										within {city.name}, especially near {city.highways}.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>
										Do you service underground garages in {city.name}?
									</Accordion.Header>
									<Accordion.Body>
										Yes. Whether it's a condo in {city.name} or a mall parking garage, we
										have Low-Clearance trucks to help.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Container>
			</section>

			{/* MAP BLOCK - Dynamically shows the city on map */}
			<div className="py-5 bg-light">
				<Container>
					<div
						style={{
							height: "350px",
							width: "100%",
							borderRadius: "1rem",
							overflow: "hidden",
						}}
					>
						<iframe
							width="100%"
							height="100%"
							id="gmap_canvas"
							src={`https://maps.google.com/maps?q=${city.name}%20Ontario&t=&z=11&ie=UTF8&iwloc=&output=embed`}
							frameBorder="0"
							scrolling="no"
							title={`Map of ${city.name}`}
							loading="lazy"
						></iframe>
					</div>
				</Container>
			</div>

			{/* CTA */}
			<section className="py-5 bg-dark text-center text-white">
				<Container>
					<h2 className="display-5 fw-bold mb-3">Stuck in {city.name}?</h2>
					<Button
						href="tel:+16476739755"
						variant="warning"
						size="lg"
						className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg"
					>
						<Phone className="me-2" /> Call {city.name} Driver
					</Button>
				</Container>
			</section>
		</div>
	);
};

export default LocationPage;
