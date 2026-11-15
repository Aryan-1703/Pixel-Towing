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
	ACCIDENT_TOW_RATE,
	BOOST_RATE,
	DRIVE_TYPES,
	ESTIMATE_DISCLAIMER,
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
const ACCIDENT_HOOKUP = formatCad(ACCIDENT_TOW_RATE.hookup);
/** Official sources for the rate rules the page states. */
const BRAMPTON_TOW_LICENSING_URL = "https://www.brampton.ca/EN/Business/Licensing/Pages/Tow-Trucks.aspx";
const ONTARIO_TOW_RIGHTS_URL = "https://www.ontario.ca/page/know-your-rights-when-getting-tow";
/** Brampton's last city-set collision tow rate (By-law 1-2022), before the TSSEA replaced city licensing. */
const OLD_BRAMPTON_COLLISION_RATE = 400;
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
		Call {BUSINESS.phoneDisplay} to confirm your price
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

const COVERAGE_OPTIONS = [
	{ id: "full", label: "Full coverage (collision and comprehensive)" },
	{ id: "third-party-not-at-fault", label: "Third-party liability only, and I'm not at fault" },
	{ id: "third-party-at-fault", label: "Third-party liability only, and I'm at fault" },
	{ id: "unsure", label: "Not sure / something else" },
] as const;

type CoverageId = (typeof COVERAGE_OPTIONS)[number]["id"];

const isCoverageId = (value: string): value is CoverageId => COVERAGE_OPTIONS.some(option => option.id === value);

const ACCIDENT_HOOKUP_TEXT = `Our accident tow hook-up in ${ACCIDENT_TOW_RATE.area} is ${ACCIDENT_HOOKUP}; outside ${ACCIDENT_TOW_RATE.area}, call for the rate.`;

const COVERAGE_CONFIRM_TEXT = "Coverage depends on your policy and your claim, so we confirm it with you before we tow.";

const ACCIDENT_RESULTS: Readonly<Record<CoverageId, { headline: string; detail: string }>> = {
	full: {
		headline: "Usually covered by your insurance",
		detail: `With collision and comprehensive coverage, your insurance usually covers the tow. ${COVERAGE_CONFIRM_TEXT} ${ACCIDENT_HOOKUP_TEXT}`,
	},
	"third-party-not-at-fault": {
		headline: "Usually covered by insurance",
		detail: `If you're not at fault, insurance usually covers the tow, even with third-party liability only. ${COVERAGE_CONFIRM_TEXT} ${ACCIDENT_HOOKUP_TEXT}`,
	},
	"third-party-at-fault": {
		headline: "Separate quote",
		detail:
			"If you're at fault and only have third-party liability, your insurance won't pay for your tow. We'll give you a separate price for your situation before we hook up.",
	},
	unsure: {
		headline: "Call for your price",
		detail: `We'll go over your coverage and confirm the price before we hook up. ${ACCIDENT_HOOKUP_TEXT}`,
	},
};

const AccidentOutput = ({ coverage }: { coverage: CoverageId }) => (
	<>
		<p className="h3 fw-bold mb-1">{ACCIDENT_RESULTS[coverage].headline}</p>
		<p className="small text-secondary mb-0">
			{ACCIDENT_RESULTS[coverage].detail} {TAX_NOTE}
		</p>
	</>
);

type SelectChange = ChangeEvent<HTMLSelectElement>;

const ServiceSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
	<Form.Group className="mb-3" controlId="calc-service">
		<Form.Label className="fw-medium">What do you need?</Form.Label>
		<Form.Select value={value} onChange={(event: SelectChange) => onChange(event.target.value)}>
			{DRIVE_TYPES.map(type => (
				<option key={type} value={type}>
					Tow: {TOW_RATES[type].label}
				</option>
			))}
			<option value={ACCIDENT_TOW_RATE.id}>{ACCIDENT_TOW_RATE.name} (collision)</option>
			{ROADSIDE_RATES.map(rate => (
				<option key={rate.id} value={rate.id}>
					{rate.name}
				</option>
			))}
		</Form.Select>
	</Form.Group>
);

const CoverageSelect = ({ value, onChange }: { value: CoverageId; onChange: (value: CoverageId) => void }) => (
	<Form.Group className="mb-4" controlId="calc-coverage">
		<Form.Label className="fw-medium">Your car insurance</Form.Label>
		<Form.Select
			value={value}
			aria-describedby={RESULT_ID}
			onChange={(event: SelectChange) => isCoverageId(event.target.value) && onChange(event.target.value)}
		>
			{COVERAGE_OPTIONS.map(option => (
				<option key={option.id} value={option.id}>
					{option.label}
				</option>
			))}
		</Form.Select>
	</Form.Group>
);

interface DistanceFieldProps {
	value: string;
	invalid: boolean;
	onChange: (value: string) => void;
}

const DistanceField = ({ value, invalid, onChange }: DistanceFieldProps) => (
	<Form.Group className="mb-4" controlId="calc-km">
		<Form.Label className="fw-medium">Tow distance (km)</Form.Label>
		<Form.Control
			type="number"
			inputMode="numeric"
			min={1}
			max={MAX_ESTIMATE_KM}
			step={1}
			value={value}
			aria-describedby={`${KM_HINT_ID} ${RESULT_ID}`}
			aria-invalid={invalid}
			onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
		/>
		<Form.Text id={KM_HINT_ID}>From where the vehicle is to where it's going.</Form.Text>
	</Form.Group>
);

const TowCalculator = () => {
	const [service, setService] = useState<string>("twoWheelDrive");
	const [kmText, setKmText] = useState(String(SAMPLE_KM));
	const [coverage, setCoverage] = useState<CoverageId>("full");
	const roadside = ROADSIDE_RATES.find(rate => rate.id === service);
	const drive = isDriveType(service) ? service : null;
	const isAccident = service === ACCIDENT_TOW_RATE.id;
	const kmInvalid = drive !== null && !estimateTow(drive, Number(kmText)).ok;

	return (
		<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">
			<h2 className="h4 fw-bold mb-4 d-flex align-items-center gap-2">
				<Calculator size={20} className="text-warning" />
				Tow cost calculator
			</h2>
			<Form onSubmit={event => event.preventDefault()}>
				<ServiceSelect value={service} onChange={setService} />
				{drive && <DistanceField value={kmText} invalid={kmInvalid} onChange={setKmText} />}
				{isAccident && <CoverageSelect value={coverage} onChange={setCoverage} />}
			</Form>
			<div id={RESULT_ID} className="rounded-3 bg-light p-4 mb-4" role="status" aria-atomic="true">
				<p className="small text-uppercase fw-bold text-secondary mb-2">Estimated price</p>
				{drive && <EstimateOutput drive={drive} kmText={kmText} />}
				{roadside && <RoadsideOutput rate={roadside} />}
				{isAccident && <AccidentOutput coverage={coverage} />}
				<p className="small fw-medium text-dark mt-3 mb-0">{ESTIMATE_DISCLAIMER}</p>
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
				<tr>
					<td>
						{ACCIDENT_TOW_RATE.name} ({ACCIDENT_TOW_RATE.area})
					</td>
					<td className="fw-bold text-nowrap">{ACCIDENT_HOOKUP}</td>
					<td>
						Hook-up. Covered by insurance if you have collision and comprehensive coverage, or if you're
						not at fault. At fault with third-party liability only? We quote you a separate price.
					</td>
				</tr>
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
			{TAX_NOTE} These are estimates; every price is confirmed by phone before we dispatch. Winching and storage
			aren't covered by these rates; we quote them by phone.
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
		<p className="small text-secondary mb-0">
			Estimates only. {TAX_NOTE} Call to confirm your price.
		</p>
	</Card>
);

const PRICE_FACTORS = [
	`Distance: the hook-up fee covers the first ${INCLUDED_KM} km, and every km after that is ${formatCad(PER_KM_RATE)}.`,
	`Drive type: towing an all-wheel-drive vehicle starts at ${formatCad(AWD.hookup)} instead of ${formatCad(TWO_WD.hookup)}.`,
	`Where you are: lockouts and boosts start at ${LOCKOUT_BOOST_FROM} in Brampton. Outside Brampton, the price depends on distance.`,
	`Accidents: insurance usually covers the tow (${ACCIDENT_HOOKUP} hook-up in ${ACCIDENT_TOW_RATE.area}) if you have collision and comprehensive coverage or you're not at fault. If you're at fault with third-party liability only, we quote you separately. We confirm coverage with you before we tow.`,
	"Extra work: winching and storage aren't in the calculator. We quote them by phone.",
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

interface Faq {
	readonly q: string;
	readonly a: string;
	readonly source?: { readonly label: string; readonly url: string };
}

const buildFaqs = (): readonly Faq[] => [
	{
		q: `How much does it cost to tow a car ${SAMPLE_KM} km in Brampton?`,
		a: `About ${exampleTotal("twoWheelDrive", SAMPLE_KM)} for a front- or rear-wheel-drive car: ${formatCad(TWO_WD.hookup)} covers the first ${INCLUDED_KM} km, and the other ${SAMPLE_EXTRA_KM} km are ${formatCad(PER_KM_RATE)} each. An all-wheel-drive vehicle is about ${exampleTotal("allWheelDrive", SAMPLE_KM)}. ${TAX_NOTE}`,
	},
	{
		q: "Is there a hook-up fee?",
		a: `Yes. It's ${formatCad(TWO_WD.hookup)} for front- or rear-wheel drive and ${formatCad(AWD.hookup)} for all-wheel drive, and it includes the first ${INCLUDED_KM} km of the tow.`,
	},
	{
		q: "How much does an accident tow cost in Brampton?",
		a: `Our accident tow hook-up in ${ACCIDENT_TOW_RATE.area} is ${ACCIDENT_HOOKUP}. Insurance usually covers the tow if you have collision and comprehensive coverage, or if you're not at fault, even with third-party liability only. If you're at fault and only have third-party liability, insurance won't pay for it, so we give you a separate price before we hook up. ${COVERAGE_CONFIRM_TEXT} ${TAX_NOTE}`,
	},
	{
		q: "Does the City of Brampton still set tow rates?",
		a: `No. Since January 1, 2024, the province regulates towing under the Towing and Storage Safety and Enforcement Act, and the City no longer licenses tow operators. You may still see Brampton's old ${formatCad(OLD_BRAMPTON_COLLISION_RATE)} collision rate online. Today each operator files a maximum rate schedule with the province and can't charge for anything that isn't on it.`,
		source: { label: "City of Brampton: tow truck licensing changes", url: BRAMPTON_TOW_LICENSING_URL },
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
		a: `No. Every price and insurance answer on this page is an estimate. Nothing is final until we confirm it with you by phone before we dispatch, and you get our maximum rate schedule before any work starts. ${TAX_NOTE}`,
		source: { label: "Ontario: know your rights when getting a tow", url: ONTARIO_TOW_RIGHTS_URL },
	},
	{
		q: "How can I pay?",
		a: `${paymentMethodsText("or")}. You get an itemized invoice before you pay.`,
	},
];

const Faqs = () => (
	<Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
		<h2 className="h4 fw-bold mb-4">Towing cost questions</h2>
		{buildFaqs().map(({ q, a, source }) => (
			<div key={q} className="mb-4">
				<h3 className="h6 fw-bold">{q}</h3>
				<p className="text-secondary mb-0">{a}</p>
				{source && (
					<p className="small mb-0 mt-1">
						Source:{" "}
						<a href={source.url} target="_blank" rel="noopener noreferrer">
							{source.label}
							<span className="visually-hidden"> (opens in a new tab)</span>
						</a>
					</p>
				)}
			</div>
		))}
	</Card>
);

const AccidentNote = () => (
	<div className="d-flex align-items-start gap-2 text-secondary small mb-5">
		<Info size={18} className="text-warning flex-shrink-0 mt-1" />
		<span>
			Been in a collision? For what happens at the scene and with your insurer, see{" "}
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
						{towRateSummary()} {TAX_NOTE} Everything on this page is an estimate: nothing is final until we
						confirm the price with you by phone before we dispatch.
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
