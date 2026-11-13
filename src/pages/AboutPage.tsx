import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, Shield, BookOpen, MapPin, CheckCircle, Truck } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { AUTHOR } from "../content/author";
import { SERVICE_AREAS } from "../content/cities";
import { ACCIDENT_RECOVERY, SERVICE_LINKS, SERVICE_SLUGS, servicePath } from "../content/services";
import { BUSINESS, BUSINESS_REF, ROADLIFT, absoluteUrl, paymentMethodsText, roadLiftUrl } from "../content/site";

const PAGE_URL = absoluteUrl("/about");
const PAGE_TITLE = "About Pixel Towing";

const TOPICS = [
	{
		title: "Ontario towing law",
		desc: "Consent to tow, maximum rate schedules, certificates, and what the Towing and Storage Safety and Enforcement Act requires of operators.",
		to: "/blog/ontario-towing-laws-driver-rights",
		label: "Ontario towing laws and your rights",
	},
	{
		title: "Collision reporting",
		desc: "What happens at the scene, when a collision has to be reported, and how Peel's Collision Reporting Centres work.",
		to: "/blog/what-to-do-after-car-accident-brampton",
		label: "What to do after a Brampton accident",
	},
	{
		title: "Insurance and repairs",
		desc: "Choosing a repair shop, OEM versus aftermarket parts, total loss valuations, and rental coverage after a collision.",
		to: "/blog/car-insurance-towing-coverage-ontario",
		label: "Car insurance towing coverage in Ontario",
	},
];

/** How every job is handled — only practices stated elsewhere on the site. */
const HOW_WE_WORK = [
	"We quote the price by phone before we dispatch.",
	"Before any work starts, you get our maximum rate schedule, as Ontario's towing rules require.",
	"You get an itemized invoice before you pay, and you can pay by " + paymentMethodsText("or").toLowerCase() + ".",
	"Outside the provincial highway tow zones, you choose where your vehicle goes — we tow it to the shop, dealer or address you pick.",
	"We have an interest in a collision repair facility and a rental fleet. We tell you before any referral, and you're free to use any other shop or rental company.",
];

const buildSchema = () => [
	{
		"@context": "https://schema.org",
		"@type": "AboutPage",
		"@id": `${PAGE_URL}#webpage`,
		url: PAGE_URL,
		name: PAGE_TITLE,
		about: BUSINESS_REF,
		mainEntity: BUSINESS_REF,
	},
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": AUTHOR.schemaId,
		name: AUTHOR.name,
		jobTitle: AUTHOR.jobTitle,
		url: PAGE_URL,
		// RoadLift's Organization node names this same @id as its founder.
		worksFor: [
			BUSINESS_REF,
			{
				"@type": "Organization",
				"@id": `${ROADLIFT.siteUrl}/#organization`,
				name: ROADLIFT.name,
				url: ROADLIFT.siteUrl,
			},
		],
		email: `mailto:${BUSINESS.email}`,
		telephone: BUSINESS.phoneE164,
	},
];

const WhatWeDo = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-3 d-flex align-items-center gap-2">
			<Truck size={20} className="text-warning" />
			What we do
		</h2>
		<p className="text-secondary lh-lg">
			We answer the phone 24 hours a day, 7 days a week, including holidays. Most calls are from drivers who
			are stuck right now — after a collision, with a car that won't start, or locked out — so the first
			thing we do is find out where you are and whether you're safe.
		</p>
		<ul className="list-unstyled mb-0">
			<li className="mb-2">
				<Link to={ACCIDENT_RECOVERY.path}>{ACCIDENT_RECOVERY.anchor}</Link>, including drop-off at a Collision
				Reporting Centre
			</li>
			{SERVICE_SLUGS.map(slug => (
				<li key={slug} className="mb-2">
					<Link to={servicePath(slug)}>{SERVICE_LINKS[slug].anchor}</Link>
				</li>
			))}
		</ul>
	</Card>
);

const WhereWeWork = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-3 d-flex align-items-center gap-2">
			<MapPin size={20} className="text-warning" />
			Where we work
		</h2>
		<p className="text-secondary lh-lg">
			We're based in {BUSINESS.locality} and cover {SERVICE_AREAS.length} service areas across Peel, Halton,
			York, Toronto and southern Wellington County. Each area page lists the roads, neighbourhoods and typical
			calls we see there.
		</p>
		<div className="d-flex flex-wrap gap-2">
			{SERVICE_AREAS.map(area => (
				<Link key={area.path} to={area.path} className="btn btn-sm btn-outline-secondary rounded-pill">
					{area.name}
				</Link>
			))}
		</div>
	</Card>
);

const HowWeWork = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-3">How we work</h2>
		<ul className="list-unstyled mb-3">
			{HOW_WE_WORK.map(item => (
				<li key={item} className="mb-2 d-flex align-items-start">
					<CheckCircle size={18} className="text-success me-2 mt-1 flex-shrink-0" />
					<span className="text-secondary">{item}</span>
				</li>
			))}
		</ul>
		<p className="text-secondary small mb-0">
			Read what customers say on{" "}
			<a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer">
				our Google Business Profile
				<span className="visually-hidden"> (opens in a new tab)</span>
			</a>
			.
		</p>
	</Card>
);

const FounderCard = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">
		<h2 className="h4 fw-bold mb-1">Who runs Pixel Towing</h2>
		<p className="text-warning fw-medium mb-4">
			{AUTHOR.name}, {AUTHOR.jobTitle.toLowerCase()} — {AUTHOR.location}
		</p>
		<p className="text-secondary lh-lg">
			{AUTHOR.name} owns and operates Pixel Towing and writes and reviews the guides on this site. That
			day-to-day work — attending collision scenes, taking customers through Peel's Collision Reporting
			Centres, and dealing with insurers on repair files — is what the articles are drawn from. Where an
			article states a legal or regulatory requirement, it links to the government source so you can check it
			yourself.
		</p>
		{/* Visible counterpart of the schema's worksFor link to RoadLift. */}
		<p className="text-secondary lh-lg mb-0">
			{AUTHOR.name} is also the founder of{" "}
			<a href={roadLiftUrl()} target="_blank" rel="noopener">
				{ROADLIFT.name}
				<span className="visually-hidden"> (opens in a new tab)</span>
			</a>
			, a separate roadside assistance app. Calls to {BUSINESS.phoneDisplay} go to Pixel Towing dispatch.
		</p>
	</Card>
);

const GuideTopics = () => (
	<>
		<h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
			<BookOpen size={18} className="text-warning" />
			What our guides cover
		</h2>
		<Row className="g-4 mb-5">
			{TOPICS.map(topic => (
				<Col md={4} key={topic.title}>
					<Card className="border-0 shadow-sm h-100 rounded-4">
						<Card.Body className="p-4">
							<h3 className="h6 fw-bold">{topic.title}</h3>
							<p className="text-muted small">{topic.desc}</p>
							<Link to={topic.to} className="small text-decoration-none fw-medium">
								{topic.label} →
							</Link>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	</>
);

const Corrections = () => (
	<Card className="border-0 rounded-4 bg-white shadow-sm p-4 mb-5">
		<h2 className="h6 fw-bold text-uppercase text-secondary mb-3">Corrections and questions</h2>
		<p className="text-secondary small">
			Towing rules, reporting thresholds and insurance requirements change. If you spot something on this site
			that is out of date or wrong, tell us and we will correct it.
		</p>
		<div className="d-flex flex-wrap gap-3 mt-2">
			<a href={`mailto:${BUSINESS.email}`} className="d-flex align-items-center gap-2 text-decoration-none">
				<Mail size={16} className="text-secondary" />
				{BUSINESS.email}
			</a>
			<a href={BUSINESS.phoneHref} className="d-flex align-items-center gap-2 text-decoration-none">
				<Phone size={16} className="text-warning" />
				{BUSINESS.phoneDisplay}
			</a>
		</div>
	</Card>
);

const AboutPage = () => (
	<div className="bg-light" style={{ paddingTop: "76px" }}>
		<SEO
			title={`${PAGE_TITLE} | 24/7 Towing in Brampton`}
			description="Pixel Towing is a Brampton-based 24/7 towing and roadside company run by tow operator Aryan Talpada. What we do, where we work and how we price jobs."
			canonical={PAGE_URL}
		/>
		<Helmet>
			<script type="application/ld+json">{JSON.stringify(buildSchema())}</script>
		</Helmet>

		<Breadcrumbs trail={[{ name: "Home", to: "/" }, { name: PAGE_TITLE }]} currentUrl={PAGE_URL} />

		<Container className="py-5">
			<Row className="justify-content-center">
				<Col lg={8}>
					<h1 className="fw-bold display-6 mb-3">{PAGE_TITLE}</h1>
					<p className="lead text-muted mb-5">
						Pixel Towing is a 24/7 towing and roadside assistance company based in {BUSINESS.locality},
						Ontario, owned and run by tow operator {AUTHOR.name}.
					</p>
					<WhatWeDo />
					<WhereWeWork />
					<HowWeWork />
					<FounderCard />
					<GuideTopics />
					<Corrections />
					<div className="d-flex align-items-center gap-2 text-muted small mb-4">
						<Shield size={16} className="text-success" />
						Licensed and insured tow operator serving Brampton and the GTA.
					</div>
					<Link to="/blog" className="btn btn-outline-dark rounded-pill px-4">
						Read the towing and insurance guides
					</Link>
				</Col>
			</Row>
		</Container>
	</div>
);

export default AboutPage;
