import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, CheckCircle, MapPin } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";
import { RoadLiftCard } from "../components/RoadLiftPromo";
import { BUSINESS, BUSINESS_REF, DISPATCH_MESSAGE, absoluteUrl } from "../content/site";
import { SERVICE_AREAS, areaServedSchema } from "../content/cities";
import { SERVICE_LINKS, isServiceSlug, servicePath, type ServiceSlug } from "../content/services";
import { SERVICE_COPY, ROADLIFT_SERVICES, type ServiceCopy } from "../content/serviceCopy";
import { renderInline } from "../utils/renderInline";

/**
 * The hero image is the likely LCP element on desktop. React 18 has no
 * `fetchPriority` prop, so pass the lowercase HTML attribute straight through.
 */
const HIGH_FETCH_PRIORITY = { fetchpriority: "high" } as Record<string, string>;

// Text column first on phones (H1 + call button in the first screen), image first from lg up.
const ServiceIntro = ({ service }: { service: ServiceCopy }) => (
	<Row className="gx-lg-5 gy-4 align-items-center mb-5">
		<Col lg={6} className="order-2 order-lg-1">
			<Card className="border-0 shadow-lg overflow-hidden rounded-4">
				<Card.Img
					src={service.image.src}
					alt={service.image.alt}
					width={service.image.width}
					height={service.image.height}
					className="img-fluid"
					loading="eager"
					{...HIGH_FETCH_PRIORITY}
				/>
			</Card>
		</Col>
		<Col lg={6} className="order-1 order-lg-2">
			<div className="d-flex align-items-center mb-3">
				<div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
					<service.icon className="text-primary" size={32} />
				</div>
				<h1 className="fw-bold mb-0 h2">{service.title}</h1>
			</div>
			<p className="lead text-primary fw-medium fst-italic mb-4">{service.tagline}</p>
			<Button
				href={BUSINESS.phoneHref}
				variant="warning"
				size="lg"
				className="fw-bold rounded-pill shadow-sm px-5 mb-4"
				data-cta="service-intro-call"
			>
				<Phone size={20} className="me-2 mb-1" />
				Call {BUSINESS.phoneDisplay}
			</Button>
			{service.details.map((p, i) => (
				<p key={i} className="text-secondary lh-lg mb-3">
					{renderInline(p, `detail${i}`)}
				</p>
			))}
		</Col>
	</Row>
);

const ServiceSections = ({ sections }: { sections: NonNullable<ServiceCopy["sections"]> }) => (
	<Row className="justify-content-center">
		<Col lg={10}>
			{sections.map(section => (
				<section key={section.heading} className="mb-4">
					<h2 className="h4 fw-bold mb-3">{section.heading}</h2>
					{section.paragraphs.map((p, i) => (
						<p key={i} className="text-secondary lh-lg mb-3">
							{renderInline(p, `${section.heading}-${i}`)}
						</p>
					))}
				</section>
			))}
		</Col>
	</Row>
);

const ServiceFeatures = ({ features }: { features: readonly string[] }) => (
	<Row className="mt-5 justify-content-center">
		<Col lg={10}>
			<Card className="border-0 bg-light p-4 rounded-4 shadow-sm mb-5">
				<h2 className="h5 fw-bold mb-4 text-dark">What's Included</h2>
				<Row xs={1} md={2} className="g-3">
					{features.map(feature => (
						<Col key={feature}>
							<div className="d-flex align-items-center">
								<CheckCircle size={20} className="text-success me-3 flex-shrink-0" />
								<span className="fw-medium text-dark">{feature}</span>
							</div>
						</Col>
					))}
				</Row>
			</Card>
		</Col>
	</Row>
);

const ServiceFaq = ({ label, faqs }: { label: string; faqs: ServiceCopy["faqs"] }) => (
	<Row className="justify-content-center">
		<Col lg={8}>
			<h2 className="h4 fw-bold mb-4 text-center">{label} — Frequently Asked Questions</h2>
			<Accordion flush className="border rounded-3 overflow-hidden">
				{faqs.map((faq, idx) => (
					<Accordion.Item eventKey={idx.toString()} key={faq.question}>
						<Accordion.Header as="h3" className="fw-bold">{faq.question}</Accordion.Header>
						<Accordion.Body className="text-secondary">{faq.answer}</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</Col>
	</Row>
);

const ServiceAreaLinks = ({ label }: { label: string }) => (
	<Row className="justify-content-center mt-5">
		<Col lg={10}>
			<Card className="border-0 bg-light rounded-4 p-4 shadow-sm">
				<h2 className="h5 fw-bold mb-3 d-flex align-items-center">
					<MapPin size={18} className="text-warning me-2" />
					{label} Service Areas
				</h2>
				<div className="d-flex flex-wrap gap-2">
					{SERVICE_AREAS.map(area => (
						<Link key={area.path} to={area.path} className="btn btn-sm btn-outline-secondary rounded-pill">
							{/* Brampton's area page is the homepage, so describe that page, not this service. */}
							{area.slug === "brampton" ? "Tow truck in Brampton" : `${label} in ${area.name}`}
						</Link>
					))}
				</div>
			</Card>
		</Col>
	</Row>
);

const ServiceCta = ({ label }: { label: string }) => (
	<div className="py-5 bg-dark text-white text-center mt-5">
		<Container>
			<h2 className="fw-bold">Need {label.toLowerCase()} now?</h2>
			<p className="lead text-white-50">{DISPATCH_MESSAGE.full}</p>
			<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold px-5 py-3 rounded-pill">
				<Phone className="me-2" />
				Call {BUSINESS.phoneDisplay}
			</Button>
		</Container>
	</div>
);

const buildServiceSchema = (slug: ServiceSlug, service: ServiceCopy, pageUrl: string) => ({
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${pageUrl}#service`,
	name: service.title,
	serviceType: SERVICE_LINKS[slug].label,
	...(service.alternateNames ? { alternateName: service.alternateNames } : {}),
	description: service.metaDesc,
	url: pageUrl,
	image: absoluteUrl(service.image.src),
	provider: BUSINESS_REF,
	areaServed: SERVICE_AREAS.map(area => areaServedSchema(area.slug)),
});

const ServiceDetailPage = () => {
	const { serviceId = "" } = useParams<{ serviceId: string }>();
	if (!isServiceSlug(serviceId)) return <NotFound />;

	const service = SERVICE_COPY[serviceId];
	const pageUrl = absoluteUrl(servicePath(serviceId));
	const label = SERVICE_LINKS[serviceId].label;
	const roadLift = ROADLIFT_SERVICES[serviceId];

	return (
		<div style={{ paddingTop: "76px" }}>
			<SEO
				title={service.metaTitle}
				description={service.metaDesc}
				canonical={pageUrl}
				image={service.image.src}
				imageAlt={service.image.alt}
			/>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(buildServiceSchema(serviceId, service, pageUrl))}</script>
			</Helmet>
			<Breadcrumbs
				trail={[{ name: "Home", to: "/" }, { name: "Services", to: "/services" }, { name: service.title }]}
				currentUrl={pageUrl}
			/>
			<Container className="py-4">
				<ServiceIntro service={service} />
				{service.sections && <ServiceSections sections={service.sections} />}
				<ServiceFeatures features={service.features} />
				{roadLift && <RoadLiftCard roadLiftPath={roadLift.path} task={roadLift.task} />}
				<ServiceFaq label={label} faqs={service.faqs} />
				<ServiceAreaLinks label={label} />
			</Container>
			<ServiceCta label={label} />
		</div>
	);
};

export default ServiceDetailPage;
