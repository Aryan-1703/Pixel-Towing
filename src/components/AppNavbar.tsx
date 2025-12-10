import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Phone } from "lucide-react";
import "../css/AppNavbar.css";

const AppNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	// 1. Fixed: State remains a boolean
	const [expanded, setExpanded] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const isSolid = isScrolled || location.pathname !== "/";

	return (
		<Navbar
			className={`navbar-custom ${isSolid ? "scrolled shadow-sm" : ""}`}
			variant={isSolid ? "light" : "dark"}
			expand="lg"
			fixed="top"
			// 2. Fixed: Uses the boolean state directly
			expanded={expanded}
		>
			<Container>
				{/* BRAND */}
				<Navbar.Brand
					as={Link}
					to="/"
					className="fw-bold fs-4"
					onClick={() => setExpanded(false)}
					title="Pixel Towing Brampton & GTA"
				>
					<span style={{ color: "#FBBF24" }}>PIXEL</span> TOWING GTA
				</Navbar.Brand>

				{/* 3. Fixed: Simplified Toggle Logic (!expanded) */}
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					onClick={() => setExpanded(!expanded)}
				/>

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center text-center">
						<Nav.Link
							as={Link}
							to="/"
							onClick={() => setExpanded(false)}
							className="fw-medium mx-2"
						>
							Home
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/services"
							onClick={() => setExpanded(false)}
							className="fw-medium mx-2"
						>
							Services
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/contact"
							onClick={() => setExpanded(false)}
							className="fw-medium mx-2"
						>
							Contact
						</Nav.Link>

						{/* Phone Number */}
						<Button
							href="tel:+16476739755"
							variant="warning"
							className="ms-lg-3 fw-bold mt-3 mt-lg-0 rounded-pill px-4"
						>
							<Phone size={18} className="me-2 mb-1" />
							647-673-9755
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AppNavbar;
