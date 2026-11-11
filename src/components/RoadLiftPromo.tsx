import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Smartphone, CheckCircle, Copy, Check } from "lucide-react";
import { BUSINESS, ROADLIFT, roadLiftUrl } from "../content/site";

/**
 * Cross-promotion for RoadLift, the roadside assistance app from the team
 * behind Pixel Towing. Phone dispatch always stays the primary action; these
 * blocks sit beside or below it, never with equal weight, and never framed as
 * an alternative to calling. All facts and the promo code come from ROADLIFT
 * in site.ts.
 */

export const ROADLIFT_SECTION_ID = "roadlift";
const COPY_RESET_MS = 2000;

const CITY_LABEL = "Brampton and Mississauga";
const AVAILABILITY = ROADLIFT.androidAvailable
	? `On iPhone and Android in ${CITY_LABEL}.`
	: `On iPhone in ${CITY_LABEL}. Android coming soon.`;

/** One line that keeps the two brands distinct for readers, search engines and AI answers. */
const RELATIONSHIP = `${ROADLIFT.name} is a separate app from the team behind ${BUSINESS.name}. To reach ${BUSINESS.name} dispatch directly, call ${BUSINESS.phoneDisplay}.`;

type CopyState = "idle" | "copied" | "failed";

const COPY_STATUS: Record<CopyState, string> = {
	idle: "",
	copied: "Promo code copied",
	failed: "Couldn't copy the code — please type it in",
};

const PromoCode = ({ code, offer }: { code: string; offer: string }) => {
	const [state, setState] = useState<CopyState>("idle");
	const resetTimer = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(resetTimer.current), []);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setState("copied");
		} catch (err) {
			// Clipboard can be blocked (permissions, insecure context); the code stays visible to type.
			console.warn("Could not copy promo code:", err instanceof Error ? err.message : err);
			setState("failed");
		}
		window.clearTimeout(resetTimer.current);
		resetTimer.current = window.setTimeout(() => setState("idle"), COPY_RESET_MS);
	};

	return (
		<div className="text-center p-4 rounded-4 border border-2 border-warning" style={{ borderStyle: "dashed" }}>
			<div className="small text-uppercase fw-bold text-secondary mb-1">{offer} your request</div>
			<div className="display-6 fw-bold font-monospace mb-2" style={{ letterSpacing: "3px" }}>
				{code}
			</div>
			<Button
				variant="outline-dark"
				size="sm"
				className="rounded-pill px-3"
				onClick={copy}
				aria-label={`Copy promo code ${code}`}
			>
				{state === "copied" ? <Check size={16} className="me-1" /> : <Copy size={16} className="me-1" />}
				{state === "copied" ? "Copied" : state === "failed" ? "Copy failed — type it in" : "Copy code"}
			</Button>
			<span className="visually-hidden" role="status" aria-live="polite">
				{COPY_STATUS[state]}
			</span>
			<p className="small text-secondary mt-3 mb-0">Enter it when you confirm your request in the app.</p>
		</div>
	);
};

const AppStoreButton = ({ size = "lg" }: { size?: "sm" | "lg" }) => (
	<Button
		href={ROADLIFT.appStoreUrl}
		target="_blank"
		rel="noopener"
		variant="dark"
		size={size}
		className="fw-bold rounded-pill px-4"
	>
		<Smartphone size={18} className="me-2" />
		Download on the App Store
		<span className="visually-hidden"> (opens in a new tab)</span>
	</Button>
);

/**
 * Low-key hero mention: a text link to the RoadLift section on the homepage,
 * so the call button stays the one primary action above the fold.
 */
export const RoadLiftHeroLink = () => (
	<a href={`#${ROADLIFT_SECTION_ID}`} className="link-warning fw-medium small">
		<Smartphone size={16} className="me-1 mb-1" aria-hidden="true" />
		Prefer an app? Book with {ROADLIFT.name}
	</a>
);

/** Full homepage section. */
export const RoadLiftSection = () => (
	<section id={ROADLIFT_SECTION_ID} className="py-5 bg-white" style={{ scrollMarginTop: "76px" }}>
		<Container>
			<Row className="align-items-center g-5">
				<Col lg={7}>
					<div className="small text-uppercase fw-bold text-secondary mb-2">
						From the team behind Pixel Towing
					</div>
					<h2 className="display-6 fw-bold mb-3">Prefer an app? Book roadside help with {ROADLIFT.name}</h2>
					<p className="lead text-secondary">
						With {ROADLIFT.name} you can request towing, a battery boost, flat-tire help, a car
						lockout or fuel delivery from your phone, see the price upfront, and watch dispatch
						happen live. {AVAILABILITY}
					</p>
					<p className="small text-secondary">{RELATIONSHIP}</p>
					<ul className="list-unstyled my-4">
						{ROADLIFT.features.map(feature => (
							<li key={feature} className="d-flex align-items-center mb-2">
								<CheckCircle size={18} className="text-success me-2 flex-shrink-0" />
								{feature}
							</li>
						))}
					</ul>
					<div className="d-flex flex-wrap gap-3 align-items-center">
						<AppStoreButton />
						<a href={roadLiftUrl()} target="_blank" rel="noopener" className="fw-bold">
							Learn more at roadlift.ca
							<span className="visually-hidden"> (opens in a new tab)</span>
						</a>
					</div>
				</Col>
				{ROADLIFT.promo && (
					<Col lg={5}>
						<PromoCode code={ROADLIFT.promo.code} offer={ROADLIFT.promo.offer} />
					</Col>
				)}
			</Row>
		</Container>
	</section>
);

/**
 * Compact card for service and city pages. `roadLiftPath` deep-links to the
 * matching page on roadlift.ca (e.g. "/car-lockout").
 */
export const RoadLiftCard = ({ roadLiftPath, task }: { roadLiftPath: string; task: string }) => (
	// An aside with a plain title (not an H2), so the promo doesn't compete with the
	// page's own topic in its heading outline.
	<aside className="p-4 rounded-4 bg-white shadow-sm border border-warning my-5" aria-label={`${ROADLIFT.name} app`}>
		<Row className="align-items-center g-4">
			<Col md={8}>
				<p className="h5 fw-bold mb-2">
					Prefer an app? Request {task} with {ROADLIFT.name}
				</p>
				<p className="text-secondary mb-3">
					See the price upfront, then watch a driver accept and track them live. {AVAILABILITY}{" "}
					{RELATIONSHIP}
					{ROADLIFT.promo && (
						<>
							{" "}
							Use code <strong className="font-monospace">{ROADLIFT.promo.code}</strong> for{" "}
							{ROADLIFT.promo.offer}.
						</>
					)}
				</p>
				<a href={roadLiftUrl(roadLiftPath)} target="_blank" rel="noopener" className="fw-bold small">
					How {ROADLIFT.name} works
					<span className="visually-hidden"> (opens in a new tab)</span>
				</a>
			</Col>
			<Col md={4} className="text-md-end">
				<AppStoreButton size="sm" />
			</Col>
		</Row>
	</aside>
);

/** One line for the site footer. */
export const RoadLiftFooterNote = () => (
	<p className="mb-0">
		Prefer an app? Try{" "}
		<a href={roadLiftUrl()} target="_blank" rel="noopener">
			{ROADLIFT.name}
			<span className="visually-hidden"> (opens in a new tab)</span>
		</a>
		, a separate roadside app from the team behind {BUSINESS.name}
		{ROADLIFT.promo && (
			<>
				{" "}
				— {ROADLIFT.promo.offer} with code <strong className="text-warning">{ROADLIFT.promo.code}</strong>
			</>
		)}
		.
	</p>
);
