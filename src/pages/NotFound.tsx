import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Phone, Home } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS } from "../content/site";

/**
 * Prerendered once to dist/404.html; server.mjs serves it with HTTP 404 for
 * any unknown URL. No canonical — a 404 is not a duplicate of the homepage.
 */
const NotFound = () => {
	return (
		<Container
			className="text-center d-flex flex-column align-items-center justify-content-center"
			style={{ minHeight: "80vh", paddingTop: "80px" }}
		>
			<SEO
				title="Page Not Found | Pixel Towing"
				description={`This page doesn't exist. If you're stranded, call Pixel Towing at ${BUSINESS.phoneDisplay} for 24/7 towing in Brampton and the GTA.`}
				noindex
			/>

			<div className="display-1 fw-bold text-warning" aria-hidden="true">
				404
			</div>
			<h1 className="mb-4">Page Not Found</h1>
			<p className="lead text-muted mb-5">
				The page you are looking for doesn't exist. <br />
				If you are stranded, please call us.
			</p>

			<Button
				href={BUSINESS.phoneHref}
				variant="warning"
				size="lg"
				className="fw-bold px-5 rounded-pill mb-3"
			>
				<Phone className="me-2" /> Call {BUSINESS.phoneDisplay}
			</Button>

			<Link to="/" className="btn btn-outline-dark px-4 mt-3">
				<Home className="me-2" size={18} /> Back Home
			</Link>
		</Container>
	);
};

export default NotFound;
