import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield } from "lucide-react";

const footerStyles = `
  .footer-bg {
    background-color: #111827; /* A very dark blue, almost black */
    color: #9ca3af; /* Light gray text for readability */
  }
  .footer-bg a {
    color: #e5e7eb; /* Off-white for links */
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }
  .footer-bg a:hover {
    color: #FBBF24; /* Your brand's gold/yellow color on hover */
  }
  .footer-title {
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .footer-bottom {
    border-top: 1px solid #374151; /* A slightly lighter gray for the divider */
  }
`;

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<>
			<style>{footerStyles}</style>
			<footer className="footer-bg pt-5 pb-4">
				<Container>
					<Row className="gy-4">
						{/* Column 1: Brand & CTA */}
						<Col lg={4} md={12}>
							<h3 className="footer-title fs-4">
								<Link to="/" className="d-flex align-items-center">
									<span style={{ color: "#FBBF24" }}>PIXEL</span>
									<span className="ms-2 text-white">TOWING</span>
								</Link>
							</h3>
							<p>
								Your trusted 24/7 partner for professional towing and roadside assistance
								in the Greater Toronto Area.
							</p>
							<Button
								href="tel:+16476739755"
								variant="warning"
								className="fw-bold text-dark mt-2"
							>
								<Phone size={16} className="me-2" />
								Get Help Now
							</Button>
						</Col>

						{/* Column 2: Quick Links */}
						<Col lg={2} md={6}>
							<h5 className="footer-title">Quick Links</h5>
							<Stack as="ul" gap={2} className="list-unstyled">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/services">Services</Link>
								</li>
								<li>
									<Link to="/contact">Contact</Link>
								</li>
							</Stack>
						</Col>

						{/* Column 3: Our Services */}
						<Col lg={3} md={6}>
							<h5 className="footer-title">Our Services</h5>
							<Stack as="ul" gap={2} className="list-unstyled">
								<li>
									<Link to="/services/accident-recovery">Accident Recovery</Link>
								</li>
								<li>
									<Link to="/services/vehicle-transport">Breakdown Towing</Link>
								</li>
								<li>
									<Link to="/services/lockout">Lockout Service</Link>
								</li>
								<li>
									<Link to="/services/tire-change">Tire Change & Boost</Link>
								</li>
							</Stack>
						</Col>

						{/* Column 4: Contact Info */}
						<Col lg={3} md={12}>
							<h5 className="footer-title">Contact Information</h5>
							<Stack gap={3}>
								<a href="tel:+16476739755" className="d-flex align-items-center">
									<Phone size={16} className="me-3 flex-shrink-0" />
									<span>+1 (647) 673-9755</span>
								</a>
								<a href="mailto:towing@pixel17.com" className="d-flex align-items-center">
									<Mail size={16} className="me-3 flex-shrink-0" />
									<span>towing@pixel17.com</span>
								</a>
								<div className="d-flex align-items-center">
									<MapPin size={16} className="me-3 flex-shrink-0" />
									<span>Brampton, ON & The GTA</span>
								</div>
								<div className="d-flex align-items-center text-success">
									<Shield size={16} className="me-3 flex-shrink-0" />
									<span>Licensed & Fully Insured</span>
								</div>
							</Stack>
						</Col>
					</Row>

					{/* Bottom Footer */}
					<Row className="mt-5 pt-4 footer-bottom align-items-center">
						{/* Copyright on the left */}
						<Col md={6} className="text-center text-md-start mb-2 mb-md-0">
							<p className="mb-0">© {currentYear} Pixel Towing. All Rights Reserved.</p>
						</Col>
						<Col md={6} className="text-center text-md-end">
							<a href="mailto:aryan17032@gmail.com" className="footer-credit">
								Developed by Aryan
							</a>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};

export default Footer;
