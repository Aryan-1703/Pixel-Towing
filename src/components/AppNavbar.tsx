import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Phone, ShieldAlert } from "lucide-react";
import { BUSINESS } from "../content/site";
import LocationsMenu from "./LocationsMenu";
import "../css/AppNavbar.css";

/** Scroll distance after which the transparent homepage navbar turns solid. */
const SOLID_AFTER_SCROLL_PX = 50;

const AppNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > SOLID_AFTER_SCROLL_PX);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// An open mobile menu needs a solid background, or its links sit on the hero.
	const isSolid = isScrolled || expanded || location.pathname !== "/";

	return (
		<Navbar
			className={`navbar-custom ${isSolid ? "scrolled shadow-sm" : ""}`}
			variant={isSolid ? "light" : "dark"}
			expand="lg"
			fixed="top"
			expanded={expanded}
		>
			<Container>
				<Navbar.Brand
					as={Link}
					to="/"
					className="fw-bold fs-4"
					onClick={() => setExpanded(false)}
					title="Pixel Towing — 24/7 tow truck in Brampton and the GTA"
				>
					<span style={{ color: "#FBBF24" }}>PIXEL</span> TOWING
				</Navbar.Brand>

				{/* Below lg the menu is collapsed, so keep a call button beside the toggle. */}
				<div className="d-flex align-items-center gap-2 d-lg-none">
					<a
						href={BUSINESS.phoneHref}
						className="btn btn-warning rounded-circle navbar-call-btn"
						aria-label={`Call Pixel Towing ${BUSINESS.phoneDisplay}`}
						data-cta="navbar-call-icon"
					>
						<Phone size={20} aria-hidden="true" />
					</a>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						onClick={() => setExpanded(!expanded)}
					/>
				</div>

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center text-center">
						<Nav.Link
							as={Link}
							to="/"
							onClick={() => setExpanded(false)}
							className="fw-medium mx-1"
						>
							Home
						</Nav.Link>

						{/* ACCIDENT RECOVERY — highlighted as primary CTA in nav */}
						<Nav.Link
							as={Link}
							to="/accident-recovery"
							onClick={() => setExpanded(false)}
							className="fw-bold mx-1"
							style={{ color: "#DC2626" }}
						>
							<ShieldAlert size={15} className="me-1 mb-1" />
							Accident Recovery
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/services"
							onClick={() => setExpanded(false)}
							className="fw-medium mx-1"
						>
							Services
						</Nav.Link>

						{/* Remount when the mobile menu opens or closes, so the submenu starts closed. */}
						<LocationsMenu key={expanded ? "expanded" : "collapsed"} onNavigate={() => setExpanded(false)} />

						<Nav.Link
							as={Link}
							to="/blog"
							onClick={() => setExpanded(false)}
							className="fw-medium mx-1"
						>
							Blog
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/contact"
							onClick={() => setExpanded(false)}
							className="fw-medium mx-1"
						>
							Contact
						</Nav.Link>

						<Button
							href={BUSINESS.phoneHref}
							variant="warning"
							className="ms-lg-3 fw-bold mt-3 mt-lg-0 rounded-pill px-4"
							aria-label={`Call Pixel Towing ${BUSINESS.phoneDisplay}`}
						>
							<Phone size={18} className="me-2 mb-1" />
							{BUSINESS.phoneDisplay}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AppNavbar;
