import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Phone, ShieldAlert } from "lucide-react";
import "../css/AppNavbar.css";

const AppNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
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
			expanded={expanded}
		>
			<Container>
				<Navbar.Brand
					as={Link}
					to="/"
					className="fw-bold fs-4"
					onClick={() => setExpanded(false)}
					title="Pixel Towing Brampton & GTA — 24/7 Tow Truck & Collision Repair"
				>
					<span style={{ color: "#FBBF24" }}>PIXEL</span> TOWING GTA
				</Navbar.Brand>

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

						<NavDropdown
							title="Locations"
							id="locations-dropdown"
							className="fw-medium mx-1"
						>
							{[
								{ name: "Mississauga", path: "/locations/mississauga" },
								{ name: "Caledon", path: "/locations/caledon" },
								{ name: "Etobicoke", path: "/locations/etobicoke" },
								{ name: "Vaughan", path: "/locations/vaughan" },
								{ name: "Toronto", path: "/locations/toronto" },
								{ name: "Georgetown", path: "/locations/georgetown" },
								{ name: "Halton Hills", path: "/locations/halton-hills" },
								{ name: "Acton", path: "/locations/acton" },
								{ name: "Erin", path: "/locations/erin" },
							].map(loc => (
								<NavDropdown.Item key={loc.path} as={Link} to={loc.path} onClick={() => setExpanded(false)}>
									{loc.name}
								</NavDropdown.Item>
							))}		
						</NavDropdown>

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
							href="tel:+16476739755"
							variant="warning"
							className="ms-lg-3 fw-bold mt-3 mt-lg-0 rounded-pill px-4"
							aria-label="Call Pixel Towing 647-673-9755"
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
