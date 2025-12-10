import React from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield } from "lucide-react";

const footerStyles = `
  .footer-bg {
    background-color: #0f172a;
    color: #94a3b8;
  }
  .footer-bg a {
    color: #e2e8f0;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }
  .footer-bg a:hover {
    color: #fbbf24;
    text-decoration: underline;
  }
  .footer-title {
    color: #ffffff;
    font-weight: 700;
    margin-bottom: 1.25rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .footer-bottom {
    border-top: 1px solid #1e293b;
    font-size: 0.875rem;
  }
  .footer-phone {
    font-weight: 800;
    color: #fbbf24 !important; /* Gold for phone number */
    font-size: 1.1rem;
  }
  .service-area-pill {
    font-size: 0.85rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 2px 8px;
    border-radius: 4px;
    margin-right: 5px;
    display: inline-block;
    margin-bottom: 5px;
  }
`;

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<>
			<style>{footerStyles}</style>
			<footer className="footer-bg pt-5 pb-4 mt-auto">
				<Container>
					<Row className="gy-4">
						{/* Column 1: Brand & CTA */}
						<Col lg={4} md={12}>
							<div className="mb-3">
								<Link
									to="/"
									className="text-decoration-none"
									aria-label="Pixel Towing Home"
								>
									<span className="h3 fw-bold text-warning">PIXEL</span>
									<span className="h3 fw-bold text-white ms-2">TOWING</span>
								</Link>
							</div>
							<p className="mb-4" style={{ maxWidth: "300px" }}>
								Professional 24/7 towing & roadside assistance service. We arrive fast, we
								work safely, and we offer fair pricing across the GTA.
							</p>
							<Button
								href="tel:+16476739755"
								variant="warning"
								size="lg"
								className="fw-bold text-dark w-100 mb-2 shadow-sm"
							>
								<Phone size={20} className="me-2" />
								Call 647-673-9755
							</Button>
							<div className="d-flex align-items-center mt-2 text-white">
								<Shield size={16} className="text-success me-2" />
								<small>Licensed & Fully Insured Operator</small>
							</div>
						</Col>

						{/* Column 2: Quick Navigation */}
						<Col lg={2} md={6} xs={6}>
							<h5 className="footer-title">Navigation</h5>
							<Stack as="ul" gap={2} className="list-unstyled">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/services">Services</Link>
								</li>
								<li>
									<Link to="/contact">Contact Us</Link>
								</li>
								<li>
									<Link to="/contact">Get A Quote</Link>
								</li>
								<li>
									<Link to="/sitemap.xml">Sitemap</Link>
								</li>
							</Stack>
						</Col>

						{/* Column 3: Specific Services */}
						<Col lg={3} md={6} xs={6}>
							<h5 className="footer-title">Our Services</h5>
							<Stack as="ul" gap={2} className="list-unstyled">
								<li>
									<Link to="/services/accident-recovery">Accident Towing</Link>
								</li>
								<li>
									<Link to="/services/vehicle-transport">Flatbed Transport</Link>
								</li>
								<li>
									<Link to="/services/lockout">Car Lockout</Link>
								</li>
								<li>
									<Link to="/services/tire-change">Flat Tire Change</Link>
								</li>
								<li>
									<Link to="/services/jump-start">Battery Boost</Link>
								</li>
								<li>
									<Link to="/services">Scrap Car Removal</Link>
								</li>
								<li>
									<Link to="/services">Fuel Delivery</Link>
								</li>
							</Stack>
						</Col>

						{/* Column 4: Contact & Locations */}
						<Col lg={3} md={12}>
							<h5 className="footer-title">Contact Dispatch</h5>
							<Stack gap={3}>
								<a href="tel:+16476739755" className="d-flex align-items-center">
									<Phone size={18} className="me-3 flex-shrink-0 text-warning" />
									<span className="footer-phone">647-673-9755</span>
								</a>
								<a href="mailto:towing@pixel17.com" className="d-flex align-items-center">
									<Mail size={18} className="me-3 flex-shrink-0 text-secondary" />
									<span>towing@pixel17.com</span>
								</a>
								<div className="d-flex align-items-start">
									<MapPin size={18} className="me-3 mt-1 flex-shrink-0 text-secondary" />
									<div>
										<strong className="d-block text-white mb-1">Serving All GTA:</strong>
										<div className="d-flex flex-wrap">
											<span className="service-area-pill">Brampton</span>
											<span className="service-area-pill">Mississauga</span>
											<span className="service-area-pill">Toronto</span>
											<span className="service-area-pill">Vaughan</span>
											<span className="service-area-pill">Etobicoke</span>
											<span className="service-area-pill">North York</span>
											<span className="service-area-pill">Scarborough</span>
										</div>
									</div>
								</div>
							</Stack>
						</Col>
					</Row>

					{/* Bottom Footer */}
					<Row className="mt-5 pt-4 footer-bottom align-items-center">
						<Col md={6} className="text-center text-md-start mb-2 mb-md-0">
							<p className="mb-0">
								© {currentYear} Pixel Towing Brampton. All Rights Reserved.
							</p>
						</Col>
						<Col md={6} className="text-center text-md-end">
							<small className="text-muted">Fast. Reliable. Affordable.</small>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};

export default Footer;
