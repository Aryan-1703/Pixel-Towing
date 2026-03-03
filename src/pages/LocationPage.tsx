import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { Phone, CheckCircle, Truck, Wrench, ShieldAlert, MapPin, Clock } from "lucide-react";
import SEO from "../components/SEO";

import heroBg from "/tow.jpg";
import flatbedImg from "../assets/flatbed-towing-brampton.jpg";

// ============================================================
// CITY DATA — rich, unique content per city (no thin pages)
// ============================================================
const CITY_DATA: Record<
	string,
	{
		name: string;
		province: string;
		title: string;
		highways: string;
		landmarks: string;
		neighborhoods: string;
		desc: string;
		desc2: string;
		uniqueFacts: string[];
		faq: { q: string; a: string }[];
		nearbyAreas: { name: string; path: string }[];
	}
> = {
	mississauga: {
		name: "Mississauga",
		province: "ON",
		title: "Towing Services in Mississauga, Ontario",
		highways: "Highway 401, 403, 410, and the QEW",
		landmarks: "Square One Shopping Centre, Port Credit, Heartland Town Centre, and Pearson Airport",
		neighborhoods: "Port Credit, Streetsville, Meadowvale, Malton, Cooksville, and Clarkson",
		desc: "Pixel Towing provides fast 24/7 towing and roadside assistance across Mississauga. Our trucks cover the entire city — from the QEW waterfront communities of Port Credit and Clarkson, to the Hwy 410 interchange and north Mississauga near Meadowvale and Heartland.",
		desc2: "Our Mississauga tow truck drivers know every major route — the 401/410 interchange, the QEW/403 splits, and high-breakdown areas like Hurontario Street. When your car breaks down in Mississauga, we're typically on scene in 15–20 minutes.",
		uniqueFacts: [
			"Coverage from the QEW waterfront to Hwy 401/410 interchange",
			"Specialized trucks for the Square One underground parkade",
			"Flatbed towing for AWD vehicles common in Mississauga suburbs",
			"Direct Collision Reporting Centre drop-off service",
		],
		faq: [
			{
				q: "Do you cover the entire Mississauga area?",
				a: "Yes — from Port Credit and Lakeshore Road to Meadowvale, Heartland, and Malton. We cover all major routes including Hurontario, Mississauga Road, and Creditview Road.",
			},
			{
				q: "Can you tow from the Square One parking structure?",
				a: "Yes. We have low-clearance vehicles capable of entering the Square One, Sherway Gardens, and other multi-storey parking structures. Call us and specify you're in a parkade.",
			},
			{
				q: "How fast can you arrive on Hwy 401 or QEW in Mississauga?",
				a: "We target 15–20 minutes for roadside calls on the 401 and QEW. Emergency response for accidents is prioritized above all other calls.",
			},
		],
		nearbyAreas: [
			{ name: "Brampton", path: "/" },
			{ name: "Etobicoke", path: "/locations/etobicoke" },
			{ name: "Toronto", path: "/locations/toronto" },
		],
	},

	caledon: {
		name: "Caledon",
		province: "ON",
		title: "Caledon Towing, Winch-Out & Roadside Assistance",
		highways: "Highway 50, Highway 10, Hwy 9, and Airport Road",
		landmarks: "Bolton, Mayfield Rd, Valleywood, Palgrave, and Cheltenham",
		neighborhoods: "Bolton, Mayfield West, Palgrave, Inglewood, Cheltenham, and Terra Cotta",
		desc: "Pixel Towing specializes in rural and highway towing throughout Caledon. Our trucks cover Bolton, Hwy 50, Hwy 10, Airport Road, and the winding country roads through Palgrave and Inglewood. We handle ditch pull-outs, winch-out recoveries, and rural road incidents that city-based tow trucks won't attempt.",
		desc2: "Caledon's rural roads and seasonal ice conditions mean we're called for off-road recoveries, vehicle rollovers on Hwy 9 and Hwy 50, and ditch pull-outs year-round. Our operators know the Caledon terrain and carry the right recovery equipment for rural conditions.",
		uniqueFacts: [
			"Specialized rural & ditch recovery equipment",
			"Winch-out service on Caledon's gravel and back roads",
			"Hwy 50 & Airport Road high-coverage zones",
			"Winter recovery for icy rural routes near Palgrave",
		],
		faq: [
			{
				q: "Can you do ditch pull-outs in rural Caledon?",
				a: "Yes — rural ditch recovery is one of our specialties. We carry heavy-duty winch equipment rated for trucks, SUVs, and farm vehicles off unpaved Caledon roads.",
			},
			{
				q: "How long will it take to reach me in Caledon?",
				a: "Response time is typically 20–35 minutes for most of Caledon, depending on your exact location. For Bolton and Mayfield West near Hwy 50, we're often under 20 minutes.",
			},
			{
				q: "Do you tow from Caledon to Toronto or Brampton?",
				a: "Absolutely. We offer long-distance towing from Caledon to any GTA destination — Brampton, Mississauga, Toronto, or further. Call for a flat-rate quote.",
			},
		],
		nearbyAreas: [
			{ name: "Brampton", path: "/" },
			{ name: "Georgetown", path: "/locations/georgetown" },
			{ name: "Vaughan", path: "/locations/vaughan" },
		],
	},

	etobicoke: {
		name: "Etobicoke",
		province: "ON",
		title: "Etobicoke Tow Truck Service — 24/7",
		highways: "Highway 427, QEW, Gardiner Expressway, and Hwy 401",
		landmarks: "Toronto Pearson International Airport, Sherway Gardens, Rexdale, Kipling Station, and the Queensway",
		neighborhoods: "Rexdale, Humber Valley, Islington Village, Alderwood, Long Branch, and Mimico",
		desc: "Serving North and South Etobicoke with fast, reliable towing and roadside services. Our drivers know Etobicoke's key breakdown zones — the 427/QEW merge, the Gardiner corridor, Pearson Airport access roads, and Hwy 401 near the 427 interchange.",
		desc2: "Etobicoke's industrial north (Rexdale, Humber Summit) and waterfront communities (Mimico, Long Branch) have different towing needs — from heavy commercial vehicles to condo-style lockouts. Our fleet handles all scenarios with the right truck for each call.",
		uniqueFacts: [
			"Airport-area towing near Pearson Cargo terminals",
			"Coverage from the Gardiner to Hwy 427 & Steeles",
			"Sherway Gardens underground parkade capable",
			"Commercial & transport truck towing available",
		],
		faq: [
			{
				q: "Do you tow near Pearson Airport in Etobicoke?",
				a: "Yes. We cover Pearson Airport access roads, Dixon Road, Airport Road, and the surrounding cargo terminal area in Etobicoke and Mississauga.",
			},
			{
				q: "Can you tow from the Gardiner Expressway?",
				a: "Yes, though Gardiner Expressway calls require coordination with the city's highway clearance protocol. Call us and we'll guide you through the safest exit procedure.",
			},
			{
				q: "Do you serve South Etobicoke near Mimico and Long Branch?",
				a: "Absolutely. We cover all of South Etobicoke including Mimico, New Toronto, Long Branch, and Alderwood — including QEW-side calls.",
			},
		],
		nearbyAreas: [
			{ name: "Mississauga", path: "/locations/mississauga" },
			{ name: "Toronto", path: "/locations/toronto" },
			{ name: "Brampton", path: "/" },
		],
	},

	vaughan: {
		name: "Vaughan",
		province: "ON",
		title: "Tow Truck Service in Vaughan, Ontario",
		highways: "Highway 400, Highway 407 ETR, Highway 7, and Hwy 27",
		landmarks: "Vaughan Mills, Wonderland, Woodbridge, Maple, and Kleinburg",
		neighborhoods: "Woodbridge, Maple, Concord, Thornhill, Kleinburg, and Patterson",
		desc: "Pixel Towing delivers dependable flatbed towing and roadside help throughout Vaughan. Our trucks cover Hwy 400 from the 401 north to Rutherford Road, Hwy 407 corridor from Hwy 27 to Weston Road, and Hwy 7 from Pine Valley to Jane Street.",
		desc2: "Vaughan's rapid suburban growth means more cars, more accidents, and more breakdowns on Hwy 400 — one of Ontario's busiest corridors. Our trucks respond quickly to 400-series highway calls and navigate Vaughan's residential grid from Woodbridge to Patterson efficiently.",
		uniqueFacts: [
			"Hwy 400 & 407 high-frequency response coverage",
			"Vaughan Mills and SmartCentres parkade access",
			"Towing to Vaughan collision centres and dealerships",
			"Woodbridge condo lockout specialists",
		],
		faq: [
			{
				q: "Do you cover Highway 400 through Vaughan?",
				a: "Yes — Hwy 400 from Hwy 401 north through Vaughan is one of our highest-frequency response corridors. We target 15–20 minute ETA for highway breakdowns.",
			},
			{
				q: "Can you tow in Kleinburg or rural Vaughan areas?",
				a: "Yes. We cover all of Vaughan including the rural western communities like Kleinburg, Nashville, and Hwy 27 between Hwy 7 and Hwy 9.",
			},
		],
		nearbyAreas: [
			{ name: "Brampton", path: "/" },
			{ name: "Caledon", path: "/locations/caledon" },
			{ name: "Toronto", path: "/locations/toronto" },
		],
	},

	toronto: {
		name: "Toronto",
		province: "ON",
		title: "Emergency Towing in Toronto, Ontario",
		highways: "Highway 401, 400, 427, DVP/404, Gardiner Expressway, and Hwy 7",
		landmarks: "North York, Scarborough Town Centre, Etobicoke, York, and East York",
		neighborhoods: "North York, Scarborough, East York, York, and the Annex",
		desc: "Pixel Towing offers 24/7 towing and roadside assistance across Toronto and the inner GTA. Our service covers North York, Scarborough, East York, and the connecting arteries of Hwy 401, the DVP, and the Gardiner Expressway.",
		desc2: "For Toronto calls, our dispatch route focuses on the 401 corridor, the DVP between Lawrence and Sheppard, and North York's high-density residential grid. Flatbed, wheel-lift, and low-clearance vehicles are all available for Toronto-area jobs.",
		uniqueFacts: [
			"DVP & 401 corridor rapid response",
			"Low-clearance trucks for Toronto condo parkades",
			"Long-distance towing out of Toronto province-wide",
			"Insurance-direct accident billing — all major providers",
		],
		faq: [
			{
				q: "Do you tow from downtown Toronto?",
				a: "We primarily cover North York, Scarborough, and inner GTA arterial roads. For deep downtown core calls (King/Queen/Front St), response times may be 30–45 minutes due to traffic.",
			},
			{
				q: "Can you tow from the 401 in Toronto?",
				a: "Yes. The Hwy 401 corridor through North York and Scarborough is a key coverage area. We respond to 401 highway breakdowns and accidents as an emergency priority.",
			},
		],
		nearbyAreas: [
			{ name: "Etobicoke", path: "/locations/etobicoke" },
			{ name: "Mississauga", path: "/locations/mississauga" },
			{ name: "Vaughan", path: "/locations/vaughan" },
		],
	},

	georgetown: {
		name: "Georgetown",
		province: "ON",
		title: "Georgetown Towing Service — Halton Hills",
		highways: "Guelph Street (Hwy 7), Trafalgar Road, and Hwy 25",
		landmarks: "Georgetown Hospital, Downtown Georgetown, Glen Williams, Silver Creek, and Norval",
		neighborhoods: "Downtown Georgetown, Glen Williams, Norval, Silver Creek, and Barber's Mill",
		desc: "Pixel Towing offers fast local towing and long-distance transport for Georgetown and surrounding Halton Hills communities. Our trucks cover Guelph Street (Hwy 7), Trafalgar Road, and the routes connecting Georgetown to Brampton and the GTA.",
		desc2: "Georgetown's location at the intersection of rural Halton Hills and the GTA commuter belt means we handle everything from highway breakdowns on Hwy 25 to farm property winch-outs and long-haul transport into Brampton, Mississauga, or Toronto.",
		uniqueFacts: [
			"Trafalgar Rd and Hwy 7 corridor coverage",
			"Towing to Brampton or Mississauga collision centres",
			"Rural winch-out and ditch recovery capability",
			"Georgetown Hospital vicinity fast response",
		],
		faq: [
			{
				q: "How long does it take to reach Georgetown from Brampton?",
				a: "Depending on traffic on Hwy 7 or Trafalgar Road, we typically arrive within 20–30 minutes in Georgetown.",
			},
			{
				q: "Do you tow from Georgetown to Toronto or Mississauga?",
				a: "Yes. Long-distance towing from Georgetown to any GTA destination is available. Call for a flat-rate quote based on distance.",
			},
		],
		nearbyAreas: [
			{ name: "Brampton", path: "/" },
			{ name: "Halton Hills", path: "/locations/halton-hills" },
			{ name: "Acton", path: "/locations/acton" },
		],
	},

	acton: {
		name: "Acton",
		province: "ON",
		title: "Acton Towing & Recovery — 24/7",
		highways: "Highway 7 and Highway 25",
		landmarks: "Fairy Lake, Acton Main Street, Acton Sobeys, and Acton Arena",
		neighborhoods: "Acton Downtown, Acton Industrial Area, and rural Acton Township",
		desc: "Pixel Towing serves Acton and the surrounding township with 24/7 towing, roadside assistance, and vehicle recovery. Whether you broke down on Hwy 7 near the Sobeys plaza, need a battery boost near Fairy Lake, or require a ditch pull-out on the rural roads east of Acton — we've got you covered.",
		desc2: "Acton is a small community, but its location on Hwy 7 between Georgetown and Guelph means plenty of highway traffic and breakdowns. Our drivers know the local shortcuts and can reach most Acton locations in under 30 minutes from Brampton.",
		uniqueFacts: [
			"Hwy 7 corridor coverage through Acton",
			"Rural ditch and field recovery east of Acton",
			"Towing to Georgetown, Brampton, or Guelph",
			"Local Acton garage partnerships for repairs",
		],
		faq: [
			{
				q: "Do you cover the rural roads outside Acton?",
				a: "Yes. We cover the rural township roads around Acton including Hwy 25, 10th Line, and surrounding farm roads. We carry winch equipment for off-road and ditch recoveries.",
			},
			{
				q: "Can you tow from Acton to Brampton for repairs?",
				a: "Yes. Towing from Acton to Brampton, Georgetown, Mississauga, or any GTA collision centre is available. We offer flat-rate long-distance pricing.",
			},
		],
		nearbyAreas: [
			{ name: "Georgetown", path: "/locations/georgetown" },
			{ name: "Halton Hills", path: "/locations/halton-hills" },
			{ name: "Erin", path: "/locations/erin" },
		],
	},

	"halton-hills": {
		name: "Halton Hills",
		province: "ON",
		title: "Halton Hills Tow Truck — Georgetown & Acton",
		highways: "Steeles Avenue, 10th Line, Hwy 25, and Trafalgar Road",
		landmarks: "Toronto Premium Outlets, Georgetown Hospital, Halton Hills GO Station, and Silver Creek Conservation",
		neighborhoods: "Georgetown, Acton, Glen Williams, Norval, Limehouse, and Ballinafad",
		desc: "Covering the entire Halton Hills municipality — including Georgetown, Acton, Glen Williams, Limehouse, and Norval. Pixel Towing provides towing, roadside assistance, and vehicle recovery across all Halton Hills communities, from the Toronto Premium Outlets to rural routes near Ballinafad.",
		desc2: "Halton Hills spans a large geographic area, and not every tow truck can serve its rural reaches. Our drivers cover the full municipality — paved arteries like Trafalgar Road and Hwy 25, as well as the back roads and 10th Line routes where GPS often fails.",
		uniqueFacts: [
			"Full municipality coverage: Georgetown + Acton",
			"Toronto Premium Outlets parkade access",
			"Trafalgar Rd and Steeles Ave fast response",
			"Rural ditch recovery across Halton Hills",
		],
		faq: [
			{
				q: "Does Pixel Towing cover all of Halton Hills?",
				a: "Yes — all of Halton Hills including Georgetown, Acton, Glen Williams, Limehouse, Norval, and rural communities east and west of the main Hwy 7 corridor.",
			},
			{
				q: "How quickly can you reach the Toronto Premium Outlets?",
				a: "The Toronto Premium Outlets at Steeles Ave and Trafalgar Road is a key landmark for us. ETA is typically 20–30 minutes from our Brampton base.",
			},
		],
		nearbyAreas: [
			{ name: "Georgetown", path: "/locations/georgetown" },
			{ name: "Acton", path: "/locations/acton" },
			{ name: "Brampton", path: "/" },
		],
	},

	erin: {
		name: "Erin",
		province: "ON",
		title: "Erin & Hillsburgh Towing — Wellington County",
		highways: "Wellington Road 124, Hwy 10, and County Road 52",
		landmarks: "Erin Fairgrounds, Main Street Erin, Hillsburgh, and the Credit River headwaters",
		neighborhoods: "Erin Village, Hillsburgh, Orton, and rural Wellington South",
		desc: "Reliable towing for Erin Village, Hillsburgh, and the surrounding Wellington County communities. Pixel Towing handles the rural and semi-rural roads that many GTA tow companies decline to service — including winter recoveries, ditch pull-outs, and long-distance hauls to Brampton or Guelph.",
		desc2: "Erin's winding country roads and the Credit River valley present unique recovery challenges — especially in winter. Our operators carry specialized winch equipment and know how to safely recover vehicles from Erin's hilly terrain without causing additional damage.",
		uniqueFacts: [
			"Wellington Road 124 and county road expertise",
			"Winter and off-season ditch recovery specialists",
			"Long-distance towing to Brampton, Guelph, or GTA",
			"Credit River valley terrain recovery",
		],
		faq: [
			{
				q: "Do you serve rural areas around Erin like Orton and Hillsburgh?",
				a: "Yes. We cover the full Erin township including Hillsburgh, Orton, and the rural Wellington County roads that GPS often misroutes. Call and give us your cross-roads.",
			},
			{
				q: "What's the best way to get a tow from Erin to Brampton?",
				a: "Call 647-673-9755. We offer flat-rate long-distance towing from Erin to Brampton, typically via Hwy 10 or Trafalgar/Hwy 7. Give us your location and destination for a quick quote.",
			},
		],
		nearbyAreas: [
			{ name: "Acton", path: "/locations/acton" },
			{ name: "Halton Hills", path: "/locations/halton-hills" },
			{ name: "Georgetown", path: "/locations/georgetown" },
		],
	},
};

const LocationPage = () => {
	const { cityId } = useParams<{ cityId: string }>();

	if (!cityId || !CITY_DATA[cityId.toLowerCase()]) {
		return <Navigate to="/" replace />;
	}

	const city = CITY_DATA[cityId.toLowerCase()];

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "TowingService",
		name: `Pixel Towing ${city.name}`,
		telephone: "+16476739755",
		url: `https://pixeltowing.com/locations/${cityId}`,
		address: {
			"@type": "PostalAddress",
			addressLocality: city.name,
			addressRegion: city.province,
			addressCountry: "CA",
		},
		areaServed: {
			"@type": "City",
			name: city.name,
		},
		description: `24/7 Tow Truck and Roadside Assistance in ${city.name}. Serving ${city.highways}.`,
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
			opens: "00:00",
			closes: "23:59",
		},
	};

	return (
		<div className="bg-light">
			<SEO
				title={`${city.name} Towing Service | 15–20 Min ETA | Pixel Towing 647-673-9755`}
				description={`Looking for a tow truck in ${city.name}? Fast 24/7 accident recovery, flatbed towing, and roadside assistance near ${city.landmarks}. Licensed & insured. Call 647-673-9755.`}
				canonical={`https://pixeltowing.com/locations/${cityId}`}
			/>
			<script type="application/ld+json">{JSON.stringify(structuredData)}</script>

			{/* HERO */}
			<section
				className="d-flex align-items-center justify-content-center text-center text-white"
				style={{
					minHeight: "60vh",
					background: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url(${heroBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					paddingTop: "60px",
				}}
			>
				<Container>
					<span className="text-warning fw-bold text-uppercase small letter-spacing-2">
						<MapPin size={14} className="me-1" /> Serving {city.name}, {city.province}
					</span>
					<h1 className="display-3 fw-bold mt-2 mb-4">
						24/7 Tow Truck in {city.name}
					</h1>
					<p className="lead text-white-50 mb-2 mx-auto" style={{ maxWidth: "680px" }}>
						Fastest arrival times on {city.highways}.
					</p>
					<p className="text-white-50 small mb-4">
						Serving {city.neighborhoods}
					</p>
					<Button
						href="tel:+16476739755"
						variant="warning"
						size="lg"
						className="rounded-pill px-5 fw-bold shadow-lg"
					>
						<Phone className="me-2 mb-1" size={18} /> Call {city.name} Dispatch
					</Button>
				</Container>
			</section>

			{/* MAIN CONTENT */}
			<section className="py-5 bg-white">
				<Container>
					<Row className="align-items-start g-5">
						<Col lg={6}>
							<h2 className="fw-bold mb-3">{city.title}</h2>
							<p className="lead text-secondary">{city.desc}</p>
							<p className="text-muted">{city.desc2}</p>

							<h3 className="h5 fw-bold mt-4 mb-3">Why drivers in {city.name} choose Pixel Towing:</h3>
							<ul className="list-unstyled">
								{city.uniqueFacts.map((fact, i) => (
									<li key={i} className="mb-2 d-flex align-items-start">
										<CheckCircle className="text-success me-2 mt-1 flex-shrink-0" size={18} />
										<span>{fact}</span>
									</li>
								))}
								<li className="mb-2 d-flex align-items-center">
									<Clock className="text-primary me-2 flex-shrink-0" size={18} />
									<span>15–20 min average ETA in {city.name}</span>
								</li>
								<li className="mb-2 d-flex align-items-center">
									<CheckCircle className="text-success me-2 flex-shrink-0" size={18} />
									<span>Credit, Debit, Cash, E-Transfer, Apple Pay, Google Pay</span>
								</li>
							</ul>

							<div className="mt-4 d-flex gap-3 flex-wrap">
								<Button href="tel:+16476739755" variant="warning" className="rounded-pill fw-bold px-4">
									<Phone size={16} className="me-2" /> Call Now
								</Button>
								<Button href="https://wa.link/sq54ln" target="_blank" variant="outline-success" className="rounded-pill px-4">
									WhatsApp
								</Button>
							</div>
						</Col>

						<Col lg={6}>
							<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
								<Card.Img
									src={flatbedImg}
									alt={`Pixel Towing flatbed tow truck in ${city.name} Ontario`}
									loading="lazy"
								/>
								<Card.ImgOverlay className="d-flex align-items-end p-0">
									<div className="bg-dark bg-opacity-75 text-white w-100 p-3 text-center">
										<small className="fw-bold">Serving {city.landmarks}</small>
									</div>
								</Card.ImgOverlay>
							</Card>

							{/* Quick contact card */}
							<Card className="border-0 shadow-sm rounded-4 mt-4 bg-dark text-white p-4">
								<div className="d-flex align-items-center mb-3">
									<Clock size={24} className="text-warning me-3" />
									<div>
										<div className="fw-bold">Available 24 Hours, 7 Days</div>
										<div className="text-white-50 small">Including holidays</div>
									</div>
								</div>
								<div className="d-flex align-items-center">
									<MapPin size={24} className="text-warning me-3" />
									<div>
										<div className="fw-bold">Service Area</div>
										<div className="text-white-50 small">{city.highways}</div>
									</div>
								</div>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* SERVICES IN CITY */}
			<section className="py-5 bg-light">
				<Container>
					<div className="text-center mb-5">
						<h2 className="fw-bold">Towing Services Available in {city.name}</h2>
						<p className="text-muted">Every service, available 24/7</p>
					</div>
					<Row xs={1} md={3} className="g-4">
						<Col>
							<Card className="border-0 shadow-sm h-100 text-center p-4 rounded-4">
								<ShieldAlert size={40} className="text-danger mx-auto mb-3" />
								<h5 className="fw-bold">Accident Recovery</h5>
								<p className="text-muted small">
									Immediate accident towing on {city.highways}. Insurance billed directly.
									You pay $0 in most cases.
								</p>
								<Link to="/services/accident-recovery" className="btn btn-sm btn-outline-danger rounded-pill stretched-link">
									Details
								</Link>
							</Card>
						</Col>
						<Col>
							<Card className="border-0 shadow-sm h-100 text-center p-4 rounded-4">
								<Wrench size={40} className="text-primary mx-auto mb-3" />
								<h5 className="fw-bold">Roadside Assistance</h5>
								<p className="text-muted small">
									Flat tire? Dead battery? Locked out in {city.name}?
									We're 15–20 minutes away.
								</p>
								<Link to="/services" className="btn btn-sm btn-outline-primary rounded-pill stretched-link">
									Details
								</Link>
							</Card>
						</Col>
						<Col>
							<Card className="border-0 shadow-sm h-100 text-center p-4 rounded-4">
								<Truck size={40} className="text-success mx-auto mb-3" />
								<h5 className="fw-bold">Long Distance Towing</h5>
								<p className="text-muted small">
									Towing from {city.name} anywhere in Ontario.
									Flat-rate pricing, no surprises.
								</p>
								<Link to="/services/vehicle-transport" className="btn btn-sm btn-outline-success rounded-pill stretched-link">
									Details
								</Link>
							</Card>
						</Col>
					</Row>

					{/* Cross-service links */}
					<div className="text-center mt-4">
						<p className="text-muted small">
							Also available in {city.name}:{" "}
							<Link to="/services/lockout">Car Lockout Service</Link> ·{" "}
							<Link to="/services/jump-start">Battery Boost</Link> ·{" "}
							<Link to="/services/tire-change">Flat Tire Change</Link> ·{" "}
							<Link to="/services/scrap-car-removal">Scrap Car Removal</Link>
						</p>
					</div>
				</Container>
			</section>

			{/* CITY FAQ */}
			<section className="py-5 bg-white">
				<Container>
					<Row className="justify-content-center">
						<Col lg={8}>
							<h3 className="text-center fw-bold mb-4">{city.name} Towing — Frequently Asked Questions</h3>
							<Accordion flush>
								{city.faq.map((item, idx) => (
									<Accordion.Item key={idx} eventKey={String(idx)}>
										<Accordion.Header>{item.q}</Accordion.Header>
										<Accordion.Body>{item.a}</Accordion.Body>
									</Accordion.Item>
								))}
								<Accordion.Item eventKey="general1">
									<Accordion.Header>Do you service underground garages in {city.name}?</Accordion.Header>
									<Accordion.Body>
										Yes. Whether it's a condo parkade or a mall parking structure in {city.name},
										our low-clearance trucks can enter and assist. Just mention you're in a
										parkade when you call and we'll dispatch the right vehicle.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="general2">
									<Accordion.Header>What payment methods do you accept?</Accordion.Header>
									<Accordion.Body>
										We accept Cash, Debit, Credit Card, E-Transfer, Apple Pay, and Google Pay.
										For accident recovery, we bill your insurance directly — most customers
										pay nothing out of pocket.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Container>
			</section>

			{/* MAP */}
			<div className="py-5 bg-light">
				<Container>
					<h3 className="text-center fw-bold mb-4">Our Coverage Area in {city.name}</h3>
					<div style={{ height: "350px", borderRadius: "1rem", overflow: "hidden" }}>
						<iframe
							width="100%"
							height="100%"
							src={`https://maps.google.com/maps?q=${encodeURIComponent(city.name + " Ontario Canada")}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
							frameBorder="0"
							scrolling="no"
							title={`Pixel Towing service area map — ${city.name}, Ontario`}
							loading="lazy"
						/>
					</div>
				</Container>
			</div>

			{/* NEARBY AREAS — Internal linking */}
			<section className="py-4 bg-white border-top">
				<Container>
					<h3 className="h5 fw-bold text-center mb-3">Also Serving Nearby Areas</h3>
					<div className="d-flex justify-content-center gap-3 flex-wrap">
						{city.nearbyAreas.map((area) => (
							<Link key={area.path} to={area.path} className="btn btn-outline-secondary btn-sm rounded-pill">
								Towing in {area.name} →
							</Link>
						))}
						<Link to="/services" className="btn btn-outline-warning btn-sm rounded-pill">
							View All Services →
						</Link>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-5 bg-dark text-center text-white">
				<Container>
					<h2 className="display-5 fw-bold mb-2">Stuck in {city.name}?</h2>
					<p className="text-white-50 mb-4">Call us now — we're typically on scene in 15–20 minutes.</p>
					<Button
						href="tel:+16476739755"
						variant="warning"
						size="lg"
						className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg"
					>
						<Phone className="me-2" size={20} /> 647-673-9755 — {city.name} Dispatch
					</Button>
				</Container>
			</section>
		</div>
	);
};

export default LocationPage;
