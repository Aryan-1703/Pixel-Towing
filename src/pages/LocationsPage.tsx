import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MapPin, Phone } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import TowZoneNotice from "../components/TowZoneNotice";
import { BUSINESS, DISPATCH_MESSAGE, absoluteUrl } from "../content/site";
import { CITIES, SERVICE_AREAS, isCitySlug } from "../content/cities";

const PAGE_URL = absoluteUrl("/locations");

const areaSummary = (slug: string): string =>
	isCitySlug(slug)
		? CITIES[slug].neighbourhoods
		: "Our home base — towing and roadside help across the city.";

/** Service-area hub: the one page that links every area we serve. */
const LocationsPage = () => (
	<div className="bg-light" style={{ paddingTop: "76px" }}>
		<SEO
			title="Towing Service Areas | Brampton & GTA | Pixel Towing"
			description="Pixel Towing serves Brampton, Mississauga, Caledon, Etobicoke, Vaughan, Toronto, Georgetown, Halton Hills, Acton and Erin. Find towing in your area."
			canonical={PAGE_URL}
		/>

		<Breadcrumbs trail={[{ name: "Home", to: "/" }, { name: "Service Areas" }]} currentUrl={PAGE_URL} />

		<Container className="py-5">
			<Row className="justify-content-center">
				<Col lg={9}>
					<h1 className="fw-bold display-6 mb-3">Towing Service Areas</h1>
					<p className="lead text-muted mb-4">
						Pixel Towing is based in Brampton and serves Peel Region and the surrounding GTA
						and Halton and Wellington communities. {DISPATCH_MESSAGE.full}
					</p>
				</Col>
			</Row>

			<Row xs={1} md={2} lg={3} className="g-4 mb-5">
				{SERVICE_AREAS.map(area => (
					<Col key={area.slug}>
						<Card className="border-0 shadow-sm h-100 rounded-4">
							<Card.Body className="p-4 d-flex flex-column">
								<h2 className="h5 fw-bold d-flex align-items-center gap-2">
									<MapPin size={18} className="text-warning" /> {area.name}
								</h2>
								<p className="text-muted small flex-grow-1">{areaSummary(area.slug)}</p>
								<Link to={area.path} className="fw-medium text-decoration-none">
									Tow truck in {area.name} →
								</Link>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			<Row className="justify-content-center">
				<Col lg={9}>
					<TowZoneNotice className="mb-5" />
					<div className="text-center">
						<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill px-5">
							<Phone size={18} className="me-2" /> Call {BUSINESS.phoneDisplay}
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	</div>
);

export default LocationsPage;
