import { Phone } from "lucide-react";
import { BUSINESS } from "../content/site";
import "../css/MobileCallBar.css";

/**
 * Bottom-fixed call bar on phones and tablets, mounted once in App.tsx.
 *
 * Most visitors are stranded drivers on a phone and the call is the
 * conversion, so the number stays one tap away on every page. Hidden from the
 * lg breakpoint up, where the navbar's call button is always visible.
 * `data-cta` lets analytics or tag managers count taps per placement.
 */
const MobileCallBar = () => (
	<div className="mobile-call-bar d-lg-none">
		<a
			href={BUSINESS.phoneHref}
			className="btn btn-warning fw-bold w-100 rounded-pill"
			data-cta="sticky-call-bar"
		>
			<Phone size={20} className="me-2" aria-hidden="true" />
			Call {BUSINESS.phoneDisplay} · 24/7
		</a>
	</div>
);

export default MobileCallBar;
