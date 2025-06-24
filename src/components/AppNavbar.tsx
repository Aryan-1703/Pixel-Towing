import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Phone } from "lucide-react";
import "../css/AppNavbar.css";

const AppNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	// 2. Get the current location object
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
		>
			<Container>
				<Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
					<span style={{ color: "#FBBF24" }}>PIXEL</span> TOWING
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						<Nav.Link as={Link} to="/" className="fw-medium">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/services" className="fw-medium">
							Services
						</Nav.Link>
						<Nav.Link as={Link} to="/service-areas" className="fw-medium">
							Service Areas
						</Nav.Link>
						<Nav.Link as={Link} to="/contact" className="fw-medium">
							Contact
						</Nav.Link>
						<Button href="tel:+16476739755" variant="warning" className="ms-lg-3 fw-bold">
							<Phone size={16} className="me-2" />
							Call Now
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AppNavbar;
