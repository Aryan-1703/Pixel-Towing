import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Phone, CheckCircle, MapPin, Clock } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import TowZoneNotice from "../components/TowZoneNotice";
import NotFound from "./NotFound";
import { IMAGES } from "../assets/images";
import { BUSINESS, BUSINESS_REF, DISPATCH_MESSAGE, absoluteUrl } from "../content/site";
import { CITIES, isCitySlug, serviceAreaBySlug, type CityContent } from "../content/cities";
import { SERVICE_SLUGS, SERVICE_LINKS, ACCIDENT_RECOVERY, servicePath } from "../content/services";

import heroBg from "/tow.jpg";

const buildServiceSchema = (city: CityContent, pageUrl: string) => ({
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${pageUrl}#service`,
	name: `Towing Service in ${city.name}`,
	serviceType: "Tow Truck and Roadside Assistance",
	description: city.metaDescription,
	url: pageUrl,
	provider: BUSINESS_REF,
	areaServed: { "@type": "City", name: city.name },
});

const CityServices = ({ city }: { city: CityContent }) => (
	<section className="py-5 bg-light">
		<Container>
			<div className="text-center mb-4">
				<h2 className="fw-bold">Towing Services in {city.name}</h2>
			</div>
			<div className="d-flex flex-wrap justify-content-center gap-2">
				<Link to={ACCIDENT_RECOVERY.path} className="btn btn-outline-danger rounded-pill">
					Accident towing in {city.name}
				</Link>
				{SERVICE_SLUGS.map(slug => (
					<Link key={slug} to={servicePath(slug)} className="btn btn-outline-secondary rounded-pill">
						{SERVICE_LINKS[slug].label} in {city.name}
					</Link>
				))}
			</div>
		</Container>
	</section>
);

const NearbyAreas = ({ city }: { city: CityContent }) => (
	<section className="py-4 bg-white border-top">
		<Container>
			<h2 className="h5 fw-bold text-center mb-3">Nearby Service Areas</h2>
			<div className="d-flex justify-content-center gap-3 flex-wrap">
				{city.nearby.map(slug => {
					const area = serviceAreaBySlug(slug);
					return area ? (
						<Link key={area.path} to={area.path} className="btn btn-outline-secondary btn-sm rounded-pill">
							Tow truck in {area.name}
						</Link>
					) : null;
				})}
				<Link to="/locations" className="btn btn-outline-warning btn-sm rounded-pill">
					All service areas
				</Link>
			</div>
		</Container>
	</section>
);

const CityHero = ({ city }: { city: CityContent }) => (
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
			<span className="text-warning fw-bold text-uppercase small">
				<MapPin size={14} className="me-1" /> Serving {city.name}, ON
			</span>
			<h1 className="display-3 fw-bold mt-2 mb-4">24/7 Tow Truck in {city.name}</h1>
			<p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: "680px" }}>
				Serving {city.neighbourhoods}
			</p>
			<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="rounded-pill px-5 fw-bold shadow-lg">
				<Phone className="me-2 mb-1" size={18} /> Call {BUSINESS.phoneDisplay}
			</Button>
		</Container>
	</section>
);

const CityFacts = ({ city }: { city: CityContent }) => {
	const responseLine = city.etaRange
		? `Typical response in ${city.name}: ${city.etaRange}. Actual times vary with traffic, weather and demand.`
		: DISPATCH_MESSAGE.full;
	return (
		<>
			<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
				<Card.Img
					src={IMAGES.flatbedTowing.src}
					alt={IMAGES.flatbedTowing.alt}
					width={IMAGES.flatbedTowing.width}
					height={IMAGES.flatbedTowing.height}
					loading="lazy"
				/>
			</Card>
			<Card className="border-0 shadow-sm rounded-4 mt-4 bg-dark text-white p-4">
				<div className="d-flex align-items-start mb-3">
					<Clock size={24} className="text-warning me-3 flex-shrink-0" />
					<div>
						<div className="fw-bold">Available 24 hours, 7 days</div>
						<div className="text-white-50 small">{responseLine}</div>
					</div>
				</div>
				<div className="d-flex align-items-start">
					<MapPin size={24} className="text-warning me-3 flex-shrink-0" />
					<div>
						<div className="fw-bold">Roads we cover</div>
						<div className="text-white-50 small">{city.roads}</div>
						<div className="text-white-50 small mt-1">Near {city.landmarks}</div>
					</div>
				</div>
			</Card>
		</>
	);
};

const CityOverview = ({ city }: { city: CityContent }) => (
	<section className="py-5 bg-white">
		<Container>
			<Row className="align-items-start g-5">
				<Col lg={6}>
					<h2 className="fw-bold mb-3">{city.heading}</h2>
					<p className="lead text-secondary">{city.intro}</p>
					<h3 className="h5 fw-bold mt-4 mb-3">Typical calls in {city.name}</h3>
					<ul className="list-unstyled">
						{city.localSituations.map(item => (
							<li key={item} className="mb-2 d-flex align-items-start">
								<CheckCircle className="text-success me-2 mt-1 flex-shrink-0" size={18} />
								<span>{item}</span>
							</li>
						))}
					</ul>
					{city.towZoneHighways && <TowZoneNotice highways={city.towZoneHighways} className="mt-4" />}
				</Col>
				<Col lg={6}>
					<CityFacts city={city} />
				</Col>
			</Row>
		</Container>
	</section>
);

const CityFaq = ({ city }: { city: CityContent }) => (
	<section className="py-5 bg-white">
		<Container>
			<Row className="justify-content-center">
				<Col lg={8}>
					<h2 className="h3 text-center fw-bold mb-4">{city.name} Towing — Frequently Asked Questions</h2>
					<Accordion flush>
						{city.faq.map((item, idx) => (
							<Accordion.Item key={item.q} eventKey={String(idx)}>
								<Accordion.Header as="h3">{item.q}</Accordion.Header>
								<Accordion.Body>{item.a}</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				</Col>
			</Row>
		</Container>
	</section>
);

const CityCta = ({ city }: { city: CityContent }) => (
	<section className="py-5 bg-dark text-center text-white">
		<Container>
			<h2 className="display-5 fw-bold mb-2">Need a tow in {city.name}?</h2>
			<p className="text-white-50 mb-4">{DISPATCH_MESSAGE.short} — call any time.</p>
			<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill px-5 py-3 text-dark shadow-lg">
				<Phone className="me-2" size={20} /> {BUSINESS.phoneDisplay}
			</Button>
		</Container>
	</section>
);

const LocationPage = () => {
	const { cityId = "" } = useParams<{ cityId: string }>();
	if (!isCitySlug(cityId)) return <NotFound />;

	const city = CITIES[cityId];
	const pageUrl = absoluteUrl(`/locations/${cityId}`);

	return (
		<div className="bg-light">
			<SEO
				title={`Tow Truck ${city.name} | 24/7 Towing | Pixel Towing`}
				description={city.metaDescription}
				canonical={pageUrl}
				image={IMAGES.flatbedTowing.src}
				imageAlt={IMAGES.flatbedTowing.alt}
			/>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(buildServiceSchema(city, pageUrl))}</script>
			</Helmet>
			<CityHero city={city} />
			<Breadcrumbs
				trail={[{ name: "Home", to: "/" }, { name: "Service Areas", to: "/locations" }, { name: city.name }]}
				currentUrl={pageUrl}
			/>
			<CityOverview city={city} />
			<CityServices city={city} />
			<CityFaq city={city} />
			<NearbyAreas city={city} />
			<CityCta city={city} />
		</div>
	);
};

export default LocationPage;
