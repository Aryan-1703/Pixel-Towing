import { Container, Row, Col, Card, Button, Accordion, Stack, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, CheckCircle, ShieldAlert, Car, Wrench, FileText, DollarSign, Award, MessageSquare } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import TowZoneNotice from "../components/TowZoneNotice";
import { IMAGES } from "../assets/images";
import { BUSINESS, BUSINESS_REF, DISPATCH_MESSAGE, absoluteUrl } from "../content/site";
import { SERVICE_AREAS } from "../content/cities";

const PAGE_URL = absoluteUrl("/accident-recovery");
const PEEL_COLLISION_REPORTING_URL =
	"https://www.peelpolice.ca/reporting-records/report-a-crime-or-incident/collision-reporting/";
const FSRA_CLAIMS_URL =
	"https://www.fsrao.ca/consumers/auto-insurance/protect-yourself/after-accident-understanding-claims-process";

const accidentServiceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${PAGE_URL}#service`,
	name: "Accident Towing and Recovery",
	serviceType: "Accident towing",
	description:
		"24/7 accident towing in Brampton and the GTA, with Collision Reporting Centre drop-off and optional collision repair and rental coordination.",
	url: PAGE_URL,
	image: absoluteUrl(IMAGES.accidentTowing.src),
	provider: BUSINESS_REF,
	areaServed: SERVICE_AREAS.map(area => ({ "@type": "City", name: area.name })),
};

const ADVANTAGES = [
	{
		icon: ShieldAlert,
		color: "text-warning",
		title: "Collision Reporting Centre Drop-Off",
		desc: "If your vehicle can't be driven, we can tow it to a Collision Reporting Centre so you can make your report, then on to the shop you choose.",
	},
	{
		icon: Wrench,
		color: "text-primary",
		title: "Collision Repair Coordination",
		desc: "Repairs at a collision facility we have an interest in, with OEM parts as our standard where they're available and approved on your estimate. Ask us for the written warranty terms.",
	},
	{
		icon: Car,
		color: "text-success",
		title: "Rental Vehicles",
		desc: "Rental vehicles through a business we have an interest in — often the same day, subject to availability. What your insurer pays depends on your coverage.",
	},
	{
		icon: DollarSign,
		color: "text-success",
		title: "Deductible Help on Some Claims",
		desc: "On some claims we can reduce our own repair price to help with your deductible. It is never billed to your insurer and is written into your repair paperwork.",
	},
	{
		icon: FileText,
		color: "text-danger",
		title: "Total-Loss Support",
		desc: "If your car is written off, we can move it out of a storage yard and explain what to ask your insurer. See our total loss guide.",
	},
	{
		icon: Award,
		color: "text-warning",
		title: "Disclosure Up Front",
		desc: "We tell you about our interest in the repair facility and rental fleet before any referral. You can choose any other shop or rental company.",
	},
] as const;

const PROCESS_STEPS = [
	{
		num: "01",
		title: "Make Sure Everyone Is Safe",
		desc: "Call 911 if anyone is hurt. Move out of traffic if you can. Then call us — 24/7.",
	},
	{
		num: "02",
		title: "We Tow Your Vehicle",
		desc: "Outside the highway tow zones, we tow your vehicle to a Collision Reporting Centre if needed, then to the shop you choose.",
	},
	{
		num: "03",
		title: "Report and Open Your Claim",
		desc: "Report the collision if required and open a claim with your insurer. Ask what your policy covers for towing, repairs and a rental.",
	},
	{
		num: "04",
		title: "Repair and Rental (Optional)",
		desc: "If you choose our repair facility, our estimator builds the repair file and works with your adjuster. A rental can be arranged subject to availability and coverage.",
	},
] as const;

const COLLISION_REPORTING_ANSWER =
	"Ontario's Highway Traffic Act requires a collision to be reported to police when anyone is injured, when combined damage exceeds $2,000, or when there is damage to highway property. In Peel Region (Brampton and Mississauga), Peel Regional Police currently direct drivers to call 911 if anyone needs to go to hospital or there is any sign of criminality; to report collisions over $2,000 with no injuries at a Collision Reporting Centre (within 48 hours if the vehicle can be driven); and, under $2,000, to report the details to their insurer. Peel publishes current centre locations and hours on its collision reporting page, and procedures can change, so check it before you go.";

const FAQS = [
	{ q: "When do I have to report a collision in Brampton or Mississauga?", a: COLLISION_REPORTING_ANSWER },
	{
		q: "Who decides which tow truck takes my car?",
		a: "Outside Ontario's restricted highway tow zones, you do: an operator needs your consent before towing and must disclose its maximum rate schedule. On tow-zone sections of Highways 400, 401, 403, 404, 409, 410 and 427 and the QEW, only the ministry's contracted operator can tow you off the highway; once you're outside the zone you can choose the next tow company and destination.",
	},
	{
		q: "Do I have to use my insurance company's preferred shop?",
		a: "No. Your insurer can recommend a shop, but FSRA — Ontario's insurance regulator — states that as long as your insurer approves the estimate, you may have your vehicle repaired at the shop of your choice. Check your policy wording and FSRA's claims guidance for the details that apply to your claim.",
	},
	{
		q: "Will my insurance pay for the tow, repair and rental?",
		a: "Coverage depends on your policy and the circumstances of the claim. Rental coverage, for example, is usually optional coverage with daily and total limits. Ask your insurer what applies before you authorize work.",
	},
	{
		q: "What if the other driver was at fault?",
		a: "In Ontario, damage to your own vehicle is usually claimed through your own insurer under Direct Compensation – Property Damage (DCPD) to the extent you're not at fault, if your policy includes DCPD coverage. Your insurer will explain how fault affects your claim. It doesn't change your right to choose your repair shop.",
	},
	{
		q: "Can you really help with my deductible?",
		a: "Sometimes. On some claims we can reduce our own repair price to help with your deductible. That reduction comes out of our price only, is never billed to your insurer, and is written into your repair authorization. We'll tell you whether your claim qualifies before you commit.",
	},
	{
		q: "My car might be a total loss. What should I do?",
		a: "Ask your insurer for the valuation report and the comparable vehicles used, and gather service records and photos showing your car's condition before the collision. Our total loss guide walks through the process.",
	},
	{
		q: "How long will repairs take?",
		a: "It depends on the damage and parts availability. Your estimator will give you a timeline once the vehicle has been assessed and keep you updated as it changes.",
	},
] as const;

const Hero = () => (
	<section
		className="text-white"
		style={{
			background: `linear-gradient(rgba(10,14,30,0.88), rgba(10,14,30,0.88)), url(${IMAGES.accidentTowing.src})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			paddingTop: "5rem",
			paddingBottom: "5rem",
		}}
	>
		<Container>
			<Row className="align-items-center g-5">
				<Col lg={7}>
					<Badge bg="warning" text="dark" className="rounded-pill mb-3 px-3 py-2">
						24/7 Accident Towing — Brampton & GTA
					</Badge>
					<h1 className="display-4 fw-bold mb-4 lh-sm">
						Accident in Brampton or the GTA?
						<br />
						<span style={{ color: "#FBBF24" }}>We'll Tow It and Help With What's Next.</span>
					</h1>
					<p className="lead text-white-50 mb-4">
						Accident towing, Collision Reporting Centre drop-off, and — if you choose — collision
						repair and rental coordination. You decide where your vehicle goes.
					</p>
					<Stack gap={3} direction="horizontal" className="flex-wrap">
						<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill px-5 py-3 shadow-lg">
							<Phone size={20} className="me-2" />
							Call Now — {BUSINESS.phoneDisplay}
						</Button>
						<Button
							href={BUSINESS.whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							variant="outline-light"
							size="lg"
							className="fw-bold rounded-pill px-4 py-3"
						>
							<MessageSquare size={18} className="me-2" />
							WhatsApp Us
						</Button>
					</Stack>
					<p className="text-white-50 small mt-3">{DISPATCH_MESSAGE.full}</p>
				</Col>
				<Col lg={5}>
					<Card className="border-0 rounded-4 shadow-lg p-4 bg-white">
						<h2 className="h5 fw-bold mb-4 text-dark text-center">Just Had an Accident?</h2>
						<ol className="text-dark fw-medium mb-0 ps-3">
							<li className="mb-2">Check for injuries — call 911 if anyone is hurt</li>
							<li className="mb-2">Move out of traffic and turn on your hazards</li>
							<li className="mb-2">Photograph the scene and exchange details</li>
							<li className="mb-2">Don't sign anything you haven't read</li>
							<li>Call {BUSINESS.phoneDisplay} for a tow</li>
						</ol>
					</Card>
				</Col>
			</Row>
		</Container>
	</section>
);

const AdvantagesSection = () => (
	<section className="py-5 bg-white">
		<Container>
			<div className="text-center mb-5">
				<h2 className="display-5 fw-bold">More Than a Tow — If You Want It</h2>
				<p className="lead text-muted mx-auto" style={{ maxWidth: "640px" }}>
					Every option below is your choice. You can use us for the tow only.
				</p>
			</div>
			<Row xs={1} md={2} lg={3} className="g-4">
				{ADVANTAGES.map(item => (
					<Col key={item.title}>
						<Card className="border-0 shadow-sm h-100 rounded-4 p-4">
							<item.icon size={40} className={`${item.color} mb-3`} />
							<h3 className="h5 fw-bold mb-2">{item.title}</h3>
							<p className="text-muted small mb-0">{item.desc}</p>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	</section>
);

const RIGHTS = [
	{
		title: "Towing",
		text: "Outside the highway tow zones, you choose the tow company and destination, and the operator needs your consent and must disclose its maximum rates.",
	},
	{
		title: "Repair-shop choice",
		text: "FSRA says that as long as your insurer approves the estimate, you may use the repair shop of your choice.",
	},
	{
		title: "Rental coverage",
		text: "You can choose your rental company. What your insurer pays depends on your coverage and its limits.",
	},
	{
		title: "Collision reporting",
		text: "Set by the Highway Traffic Act and, locally, Peel Regional Police procedure — see the FAQ below.",
	},
] as const;

const RightsSection = () => (
	<section className="py-5" style={{ background: "#0f172a" }}>
		<Container>
			<Row className="align-items-center g-5">
				<Col lg={6}>
					<Badge bg="warning" text="dark" className="rounded-pill mb-3">
						Ontario rules
					</Badge>
					<h2 className="display-6 fw-bold text-white mb-4">Four Separate Sets of Rules</h2>
					<div className="d-flex flex-column gap-3">
						{RIGHTS.map(right => (
							<div key={right.title} className="d-flex align-items-start gap-3">
								<CheckCircle size={20} className="text-warning mt-1 flex-shrink-0" />
								<span className="text-white-50">
									<strong className="text-white">{right.title}:</strong> {right.text}
								</span>
							</div>
						))}
					</div>
					<p className="text-white-50 small mt-4 mb-0">
						Sources:{" "}
						<a href={FSRA_CLAIMS_URL} target="_blank" rel="noopener noreferrer" className="text-warning">
							FSRA claims guidance
						</a>{" "}
						·{" "}
						<a href={PEEL_COLLISION_REPORTING_URL} target="_blank" rel="noopener noreferrer" className="text-warning">
							Peel Regional Police collision reporting
						</a>{" "}
						· <Link to="/blog/ontario-towing-laws-driver-rights" className="text-warning">Ontario towing laws explained</Link>
					</p>
				</Col>
				<Col lg={6}>
					<img
						src={IMAGES.flatbedTowing.src}
						alt={IMAGES.flatbedTowing.alt}
						width={IMAGES.flatbedTowing.width}
						height={IMAGES.flatbedTowing.height}
						className="img-fluid rounded-4 shadow-lg mb-4"
						style={{ height: "auto" }}
						loading="lazy"
					/>
					<TowZoneNotice className="bg-white" />
				</Col>
			</Row>
		</Container>
	</section>
);

const DisclosureSection = () => (
	<section className="py-4 bg-light border-top border-bottom">
		<Container>
			<Row className="justify-content-center">
				<Col lg={9}>
					<div className="d-flex align-items-start gap-3">
						<FileText size={20} className="text-secondary flex-shrink-0 mt-1" />
						<div>
							<h2 className="h6 fw-bold text-uppercase text-secondary mb-2">Disclosure of Interest</h2>
							<p className="text-secondary small mb-0">
								Pixel Towing has an ownership and operating interest in the collision repair
								facility and the rental vehicle fleet referred to on this page. We disclose that
								relationship before any referral, and you are free to choose a different repair
								shop, storage facility or rental provider at any time. Ontario tow operators are
								required to tell customers about any interest they have in a business or facility
								they refer them to.
							</p>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	</section>
);

const ProcessSection = () => (
	<section className="py-5 bg-light">
		<Container>
			<div className="text-center mb-5">
				<h2 className="display-6 fw-bold">How It Works</h2>
			</div>
			<Row xs={1} md={2} lg={4} className="g-4">
				{PROCESS_STEPS.map(step => (
					<Col key={step.num}>
						<Card className="border-0 shadow-sm h-100 rounded-4 p-4 bg-white">
							<div className="fw-bold mb-3" style={{ fontSize: "2.5rem", color: "#FBBF24", lineHeight: 1 }}>
								{step.num}
							</div>
							<h3 className="h5 fw-bold mb-2">{step.title}</h3>
							<p className="text-muted small mb-0">{step.desc}</p>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	</section>
);

const FaqSection = () => (
	<section className="py-5 bg-white">
		<Container>
			<Row className="justify-content-center">
				<Col lg={9}>
					<h2 className="fw-bold text-center mb-5">Accident Towing — Frequently Asked Questions</h2>
					<Accordion flush className="border rounded-4 overflow-hidden">
						{FAQS.map((faq, i) => (
							<Accordion.Item eventKey={String(i)} key={faq.q}>
								<Accordion.Header as="h3">{faq.q}</Accordion.Header>
								<Accordion.Body className="text-secondary lh-lg">{faq.a}</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
					<p className="text-muted small mt-4">
						Further reading:{" "}
						<Link to="/blog/what-to-do-after-car-accident-brampton">what to do after a car accident in Brampton</Link>,{" "}
						<Link to="/blog/total-loss-vehicle-ontario-guide">total loss vehicles in Ontario</Link> and{" "}
						<Link to="/blog/car-insurance-towing-coverage-ontario">insurance coverage for towing</Link>. This page
						is general information, not legal or insurance advice.
					</p>
				</Col>
			</Row>
		</Container>
	</section>
);

const AreasAndCta = () => (
	<>
		<section className="py-4 bg-light border-top">
			<Container>
				<h2 className="h5 fw-bold text-center mb-3">Accident Towing Service Areas</h2>
				<div className="d-flex flex-wrap justify-content-center gap-2">
					{SERVICE_AREAS.map(area => (
						<Link key={area.path} to={area.path} className="btn btn-sm btn-outline-secondary rounded-pill">
							Tow truck in {area.name}
						</Link>
					))}
				</div>
			</Container>
		</section>
		<section className="py-5 text-white text-center" style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a)" }}>
			<Container>
				<h2 className="display-5 fw-bold mb-3">Need Accident Towing Now?</h2>
				<p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "580px" }}>
					{DISPATCH_MESSAGE.full}
				</p>
				<Button href={BUSINESS.phoneHref} variant="warning" size="lg" className="fw-bold rounded-pill px-5 py-3 shadow-lg text-dark">
					<Phone size={22} className="me-2" />
					{BUSINESS.phoneDisplay} — Call Now
				</Button>
			</Container>
		</section>
	</>
);

const AccidentRecoveryPage = () => (
	<div style={{ paddingTop: "76px" }}>
		<SEO
			title="Accident Towing Brampton | 24/7 Recovery | Pixel Towing"
			description="24/7 accident towing in Brampton and the GTA, Collision Reporting Centre drop-off, and optional repair and rental help. Call 647-673-9755."
			canonical={PAGE_URL}
			image={IMAGES.accidentTowing.src}
			imageAlt={IMAGES.accidentTowing.alt}
		/>
		<Helmet>
			<script type="application/ld+json">{JSON.stringify(accidentServiceSchema)}</script>
		</Helmet>

		<Hero />
		<Breadcrumbs
			trail={[{ name: "Home", to: "/" }, { name: "Services", to: "/services" }, { name: "Accident Recovery" }]}
			currentUrl={PAGE_URL}
		/>
		<AdvantagesSection />
		<RightsSection />
		<DisclosureSection />
		<ProcessSection />
		<FaqSection />
		<AreasAndCta />
	</div>
);

export default AccidentRecoveryPage;
