import { useState, type ChangeEvent } from "react";
import { Container, Row, Col, Card, Form, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calculator, Phone, CheckCircle, Info } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { ACCIDENT_RECOVERY } from "../content/services";
import { BUSINESS, BUSINESS_REF, absoluteUrl, paymentMethodsText } from "../content/site";
import { TOW_COST_CALCULATOR_PATH } from "../content/routes";
import {
	BOOST_RATE,
	DRIVE_TYPES,
	EXAMPLE_TOW_DISTANCES_KM,
	INCLUDED_KM,
	LOCKOUT_RATE,
	MAX_ESTIMATE_KM,
	PER_KM_RATE,
	ROADSIDE_RATES,
	TAX_NOTE,
	TIRE_CHANGE_RATE,
	TOW_RATES,
	estimateTow,
	formatCad,
	isDriveType,
	towRateSummary,
	type DriveType,
	type RoadsideRate,
} from "../content/rates";

const PAGE_URL = absoluteUrl(TOW_COST_CALCULATOR_PATH);
const PAGE_HEADING = "How Much Does a Tow Cost in Brampton?";
/** Distance the calculator opens with and the first FAQ answers for. */
const SAMPLE_KM = 20;
const AWD = TOW_RATES.allWheelDrive;
const TWO_WD = TOW_RATES.twoWheelDrive;
const LOCKOUT_BOOST_FROM = formatCad(Math.min(LOCKOUT_RATE.price, BOOST_RATE.price));
const sampleEstimate = estimateTow("twoWheelDrive", SAMPLE_KM);
const SAMPLE_EXTRA_KM = sampleEstimate.ok ? sampleEstimate.estimate.extraKm : 0;
const KM_HINT_ID = "calc-km-hint";
const RESULT_ID = "calc-result";

/** Total for a tow the estimator always accepts (example distances are within range). */
const exampleTotal = (drive: DriveType, km: number): string => {
	const result = estimateTow(drive, km);
	return result.ok ? formatCad(result.estimate.total) : "Call for a quote";
};

const priceLabel = (rate: RoadsideRate): string =>
	`${rate.startingFrom ? "From " : ""}${formatCad(rate.price)}`;

const buildSchema = () => ({
	"@context": "https://schema.org",
	"@type": "WebPage",
	"@id": `${PAGE_URL}#webpage`,
	url: PAGE_URL,
	name: PAGE_HEADING,
	description: towRateSummary(),
	about: BUSINESS_REF,
});

const CallButton = ({ cta }: { cta: string }) => (
	<Button
		href={BUSINESS.phoneHref}
		variant="warning"
		size="lg"
		className="fw-bold text-dark w-100"
		data-cta={cta}
	>
		<Phone size={20} className="me-2" />
		Call {BUSINESS.phoneDisplay} for your exact price
	</Button>
);

const EstimateOutput = ({ drive, kmText }: { drive: DriveType; kmText: string }) => {
	const result = estimateTow(drive, Number(kmText));
	if (!result.ok) {
		const message =
			result.reason === "too-far"
				? `For tows over ${MAX_ESTIMATE_KM} km, call us for a long-distance quote.`
				: "Enter how far the vehicle is going, in kilometres.";
		return <p className="mb-0 text-secondary">{message}</p>;
	}

	const { estimate } = result;
	return (
		<>
			<p className="display-6 fw-bold mb-1">{formatCad(estimate.total)}</p>
			<p className="small text-secondary mb-0">
				{formatCad(estimate.hookup)} hook-up (includes the first {INCLUDED_KM} km)
				{estimate.extraKm > 0 &&
					` + ${estimate.extraKm} km × ${formatCad(PER_KM_RATE)} = ${formatCad(estimate.distanceCharge)}`}
				. {TAX_NOTE}
			</p>
		</>
	);
};

const RoadsideOutput = ({ rate }: { rate: RoadsideRate }) => (
	<>
		<p className="display-6 fw-bold mb-1">{priceLabel(rate)}</p>
		<p className="small text-secondary mb-0">
			{rate.note} {TAX_NOTE}
		</p>
	</>
);

const TowCalculator = () => {
	const [service, setService] = useState<string>("twoWheelDrive");
	const [kmText, setKmText] = useState(String(SAMPLE_KM));
	const roadside = ROADSIDE_RATES.find(rate => rate.id === service);
	const drive = isDriveType(service) ? service : null;
	const kmInvalid = drive !== null && !estimateTow(drive, Number(kmText)).ok;

	return (
		<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">
			<h2 className="h4 fw-bold mb-4 d-flex align-items-center gap-2">
				<Calculator size={20} className="text-warning" />
				Tow cost calculator
			</h2>
			<Form onSubmit={event => event.preventDefault()}>
				<Form.Group className="mb-3" controlId="calc-service">
					<Form.Label className="fw-medium">What do you need?</Form.Label>
					<Form.Select
						value={service}
						onChange={(event: ChangeEvent<HTMLSelectElement>) => setService(event.target.value)}
					>
						{DRIVE_TYPES.map(type => (
							<option key={type} value={type}>
								Tow: {TOW_RATES[type].label}
							</option>
						))}
						{ROADSIDE_RATES.map(rate => (
							<option key={rate.id} value={rate.id}>
								{rate.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				{drive && (
					<Form.Group className="mb-4" controlId="calc-km">
						<Form.Label className="fw-medium">Tow distance (km)</Form.Label>
						<Form.Control
							type="number"
							inputMode="numeric"
							min={1}
							max={MAX_ESTIMATE_KM}
							step={1}
							value={kmText}
							aria-describedby={`${KM_HINT_ID} ${RESULT_ID}`}
							aria-invalid={kmInvalid}
							onChange={(event: ChangeEvent<HTMLInputElement>) => setKmText(event.target.value)}
						/>
						<Form.Text id={KM_HINT_ID}>From where the vehicle is to where it's going.</Form.Text>
					</Form.Group>
				)}
			</Form>
			<div id={RESULT_ID} className="rounded-3 bg-light p-4 mb-4" role="status" aria-atomic="true">
				<p className="small text-uppercase fw-bold text-secondary mb-2">Estimated price</p>
				{drive && <EstimateOutput drive={drive} kmText={kmText} />}
				{roadside && <RoadsideOutput rate={roadside} />}
			</div>
			<CallButton cta="calculator-call" />
		</Card>
	);
};

const RateTable = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-3">Our towing and roadside rates</h2>
		<Table responsive className="mb-3 align-middle">
			<thead>
				<tr>
					<th scope="col">Service</th>
					<th scope="col">Price</th>
					<th scope="col">Details</th>
				</tr>
			</thead>
			<tbody>
				{DRIVE_TYPES.map(type => (
					<tr key={type}>
						<td>Tow: {TOW_RATES[type].label}</td>
						<td className="fw-bold text-nowrap">{formatCad(TOW_RATES[type].hookup)}</td>
						<td>
							Hook-up fee, includes the first {INCLUDED_KM} km. Then {formatCad(PER_KM_RATE)} per km.
						</td>
					</tr>
				))}
				{ROADSIDE_RATES.map(rate => (
					<tr key={rate.id}>
						<td>{rate.name}</td>
						<td className="fw-bold text-nowrap">{priceLabel(rate)}</td>
						<td>{rate.note}</td>
					</tr>
				))}
			</tbody>
		</Table>
		<p className="small text-secondary mb-0">
			{TAX_NOTE} Winching, storage and accident scenes aren't covered by these rates; we quote them by phone.
		</p>
	</Card>
);

const ExampleTable = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-3">Example tow prices by distance</h2>
		<Table responsive className="mb-3 align-middle">
			<thead>
				<tr>
					<th scope="col">Tow distance</th>
					<th scope="col">{TWO_WD.shortLabel}</th>
					<th scope="col">{AWD.shortLabel}</th>
				</tr>
			</thead>
			<tbody>
				{EXAMPLE_TOW_DISTANCES_KM.map(km => (
					<tr key={km}>
						<td>{km} km</td>
						<td>{exampleTotal("twoWheelDrive", km)}</td>
						<td>{exampleTotal("allWheelDrive", km)}</td>
					</tr>
				))}
			</tbody>
		</Table>
		<p className="small text-secondary mb-0">{TAX_NOTE}</p>
	</Card>
);

const PRICE_FACTORS = [
	`Distance: the hook-up fee covers the first ${INCLUDED_KM} km, and every km after that is ${formatCad(PER_KM_RATE)}.`,
	`Drive type: towing an all-wheel-drive vehicle starts at ${formatCad(AWD.hookup)} instead of ${formatCad(TWO_WD.hookup)}.`,
	`Where you are: lockouts and boosts start at ${LOCKOUT_BOOST_FROM} in Brampton. Outside Brampton, the price depends on distance.`,
	"Extra work: winching, storage and accident scenes aren't in the calculator. We quote them by phone.",
	"Before any work starts, you get our maximum rate schedule, as Ontario's towing rules require. We can't charge more than it.",
];

const PriceFactors = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-3">What changes the price</h2>
		<ul className="list-unstyled mb-0">
			{PRICE_FACTORS.map(item => (
				<li key={item} className="mb-2 d-flex align-items-start">
					<CheckCircle size={18} className="text-success me-2 mt-1 flex-shrink-0" />
					<span className="text-secondary">{item}</span>
				</li>
			))}
		</ul>
	</Card>
);

const buildFaqs = () => [
	{
		q: `How much does it cost to tow a car ${SAMPLE_KM} km in Brampton?`,
		a: `About ${exampleTotal("twoWheelDrive", SAMPLE_KM)} for a front- or rear-wheel-drive car: ${formatCad(TWO_WD.hookup)} covers the first ${INCLUDED_KM} km, and the other ${SAMPLE_EXTRA_KM} km are ${formatCad(PER_KM_RATE)} each. An all-wheel-drive vehicle is about ${exampleTotal("allWheelDrive", SAMPLE_KM)}. ${TAX_NOTE}`,
	},
	{
		q: "Is there a hook-up fee?",
		a: `Yes. It's ${formatCad(TWO_WD.hookup)} for front- or rear-wheel drive and ${formatCad(AWD.hookup)} for all-wheel drive, and it includes the first ${INCLUDED_KM} km of the tow.`,
	},
	{
		q: "How much is a car lockout or a battery boost?",
		a: `Both start at ${LOCKOUT_BOOST_FROM} in Brampton. Outside Brampton, the price depends on how far we have to drive.`,
	},
	{
		q: "How much does a tire change cost?",
		a: `${formatCad(TIRE_CHANGE_RATE.price)} to put on your own spare. We don't repair or plug tires.`,
	},
	{
		q: "Is the calculator price the final price?",
		a: `It's an estimate. We confirm the price by phone before we dispatch, and you get our maximum rate schedule before any work starts. ${TAX_NOTE}`,
	},
	{
		q: "How can I pay?",
		a: `${paymentMethodsText("or")}. You get an itemized invoice before you pay.`,
	},
];

const Faqs = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-4">Towing cost questions</h2>
		{buildFaqs().map(({ q, a }) => (
			<div key={q} className="mb-4">
				<h3 className="h6 fw-bold">{q}</h3>
				<p className="text-secondary mb-0">{a}</p>
			</div>
		))}
	</Card>
);

const AccidentNote = () => (
	<div className="d-flex align-items-start gap-2 text-secondary small mb-5">
		<Info size={18} className="text-warning flex-shrink-0 mt-1" />
		<span>
			Been in a collision? Accident tows aren't priced in the calculator. See{" "}
			<Link to={ACCIDENT_RECOVERY.path}>{ACCIDENT_RECOVERY.anchor}</Link> or call {BUSINESS.phoneDisplay}. All our
			services are on the <Link to="/services">services page</Link>.
		</span>
	</div>
);

const TowCostCalculatorPage = () => (
	<div className="bg-light" style={{ paddingTop: "76px" }}>
		<SEO
			title="Tow Truck Cost Calculator Brampton | Towing Rates"
			description={`How much does a tow cost in Brampton? ${formatCad(TWO_WD.hookup)} for the first ${INCLUDED_KM} km, then ${formatCad(PER_KM_RATE)}/km (AWD from ${formatCad(AWD.hookup)}). Get an instant estimate.`}
			canonical={PAGE_URL}
		/>
		<Helmet>
			<script type="application/ld+json">{JSON.stringify(buildSchema())}</script>
		</Helmet>

		<Breadcrumbs trail={[{ name: "Home", to: "/" }, { name: "Tow cost calculator" }]} currentUrl={PAGE_URL} />

		<Container className="py-5">
			<Row className="justify-content-center">
				<Col lg={8}>
					<h1 className="fw-bold display-6 mb-3">{PAGE_HEADING}</h1>
					<p className="lead text-muted mb-5">
						{towRateSummary()} {TAX_NOTE} Use the calculator for an estimate. We confirm the price by phone
						before we dispatch.
					</p>
					<TowCalculator />
					<RateTable />
					<ExampleTable />
					<PriceFactors />
					<Faqs />
					<AccidentNote />
				</Col>
			</Row>
		</Container>
	</div>
);

export default TowCostCalculatorPage;
