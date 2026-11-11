import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, Shield, BookOpen } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { AUTHOR } from "../content/author";
import { BUSINESS, BUSINESS_REF, ROADLIFT, absoluteUrl, roadLiftUrl } from "../content/site";

const PAGE_URL = absoluteUrl("/about");

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

const AboutPage = () => {
	const personSchema = {
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
	};

	return (
		<div className="bg-light" style={{ paddingTop: "76px" }}>
			<SEO
				title="About the Author | Pixel Towing Brampton"
				description="Who writes Pixel Towing's guides to Ontario towing law, collision reporting and insurance claims — and how to get in touch about them."
				canonical={PAGE_URL}
			/>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(personSchema)}</script>
			</Helmet>

			<Breadcrumbs
				trail={[{ name: "Home", to: "/" }, { name: "About the Author" }]}
				currentUrl={PAGE_URL}
			/>

			<Container className="py-5">
				<Row className="justify-content-center">
					<Col lg={8}>
						<h1 className="fw-bold display-6 mb-3">About the Author</h1>
						<p className="lead text-muted mb-5">
							Pixel Towing's guides to Ontario towing law, collision reporting and
							insurance claims are written and reviewed by a working tow operator, not
							an anonymous content desk.
						</p>

						<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">
							<h2 className="h4 fw-bold mb-1">{AUTHOR.name}</h2>
							<p className="text-warning fw-medium mb-4">
								{AUTHOR.jobTitle} — Pixel Towing, Brampton, Ontario
							</p>

							<p className="text-secondary lh-lg">
								{AUTHOR.name} operates Pixel Towing, a licensed and insured towing and
								roadside assistance company serving Brampton, Mississauga, Caledon and
								the wider GTA. The work covers emergency towing, accident recovery,
								flatbed transport, lockouts and roadside assistance, 24 hours a day.
							</p>

							<p className="text-secondary lh-lg mb-0">
								That day-to-day work — attending collision scenes, taking customers
								through Peel's Collision Reporting Centres, and dealing with insurers on
								repair files — is what the articles on this site are drawn from. Where an
								article states a legal or regulatory requirement, it links to the
								government source so you can check it yourself.
							</p>

							{/* Visible counterpart of the schema's worksFor link to RoadLift. */}
							<p className="text-secondary lh-lg mt-3 mb-0">
								{AUTHOR.name} is also the founder of{" "}
								<a href={roadLiftUrl()} target="_blank" rel="noopener">
									{ROADLIFT.name}
									<span className="visually-hidden"> (opens in a new tab)</span>
								</a>
								, a separate roadside assistance app. Calls to {BUSINESS.phoneDisplay} go to
								Pixel Towing dispatch.
							</p>
						</Card>

						<h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
							<BookOpen size={18} className="text-warning" />
							What these guides cover
						</h2>
						<Row className="g-4 mb-5">
							{TOPICS.map(topic => (
								<Col md={4} key={topic.title}>
									<Card className="border-0 shadow-sm h-100 rounded-4">
										<Card.Body className="p-4">
											<h3 className="h6 fw-bold">{topic.title}</h3>
											<p className="text-muted small">{topic.desc}</p>
											<Link
												to={topic.to}
												className="small text-decoration-none fw-medium"
											>
												{topic.label} →
											</Link>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>

						<Card className="border-0 rounded-4 bg-white shadow-sm p-4 mb-5">
							<h2 className="h6 fw-bold text-uppercase text-secondary mb-3">
								Corrections and questions
							</h2>
							<p className="text-secondary small">
								Towing rules, reporting thresholds and insurance requirements change. If
								you spot something on this site that is out of date or wrong, tell us and
								we will correct it.
							</p>
							<div className="d-flex flex-wrap gap-3 mt-2">
								<a
									href={`mailto:${BUSINESS.email}`}
									className="d-flex align-items-center gap-2 text-decoration-none"
								>
									<Mail size={16} className="text-secondary" />
									{BUSINESS.email}
								</a>
								<a
									href={BUSINESS.phoneHref}
									className="d-flex align-items-center gap-2 text-decoration-none"
								>
									<Phone size={16} className="text-warning" />
									{BUSINESS.phoneDisplay}
								</a>
							</div>
						</Card>

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
};

export default AboutPage;
