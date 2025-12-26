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
    font-size: 1.05rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .footer-bottom {
    border-top: 1px solid #1e293b;
    font-size: 0.875rem;
  }

  .footer-phone {
    font-weight: 800;
    color: #fbbf24 !important;
    font-size: 1.15rem;
  }

  .service-area-pill {
    font-size: 0.8rem;
    background: rgba(255, 255, 255, 0.06);
    padding: 4px 10px;
    border-radius: 6px;
    margin-right: 6px;
    margin-bottom: 6px;
    display: inline-block;
    transition: background 0.2s ease;
  }

  .service-area-pill:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<>
			<style>{footerStyles}</style>

			<footer className="footer-bg pt-5 pb-4 mt-auto" role="contentinfo">
				<Container>
					<Row className="gy-4">
						{/* BRAND + CTA */}
						<Col lg={4} md={12}>
							<Link to="/" aria-label="Pixel Towing Home">
								<span className="h3 fw-bold text-warning">PIXEL</span>
								<span className="h3 fw-bold text-white ms-2">TOWING</span>
							</Link>

							<p className="mt-3 mb-4" style={{ maxWidth: "340px" }}>
								Trusted 24/7 towing & roadside assistance in Brampton and the GTA. Fast
								response. Safe towing. Fair pricing.
							</p>

							<Button
								href="tel:+16476739755"
								variant="warning"
								size="lg"
								className="fw-bold text-dark w-100 shadow-sm"
								aria-label="Call Pixel Towing Dispatch"
							>
								<Phone size={20} className="me-2" />
								Call 647-673-9755
							</Button>

							<div className="d-flex align-items-center mt-3 text-white">
								<Shield size={16} className="text-success me-2" />
								<small>Licensed & Fully Insured Tow Operator</small>
							</div>
						</Col>

						{/* NAVIGATION */}
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
									<Link to="/contact">Contact</Link>
								</li>
								<li>
									<Link to="/contact">Get a Quote</Link>
								</li>
								<li>
									<a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
										Sitemap
									</a>
								</li>
							</Stack>
						</Col>

						{/* SERVICES */}
						<Col lg={3} md={6} xs={6}>
							<h5 className="footer-title">Our Services</h5>
							<Stack as="ul" gap={2} className="list-unstyled">
								<li>
									<Link to="/services/accident-recovery">Accident Recovery</Link>
								</li>
								<li>
									<Link to="/services/vehicle-transport">Flatbed Towing</Link>
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
									<Link to="/services">Fuel Delivery</Link>
								</li>
								<li>
									<Link to="/services/scrap-car-removal">Scrap Car Removal</Link>
								</li>
							</Stack>
						</Col>

						{/* CONTACT + SERVICE AREAS */}
						<Col lg={3} md={12}>
							<h5 className="footer-title">Contact Dispatch</h5>

							<Stack gap={3}>
								<a href="tel:+16476739755" className="d-flex align-items-center">
									<Phone size={18} className="me-3 text-warning" />
									<span className="footer-phone">647-673-9755</span>
								</a>

								<a href="mailto:towing@pixel17.com" className="d-flex align-items-center">
									<Mail size={18} className="me-3 text-secondary" />
									towing@pixel17.com
								</a>

								<div className="d-flex align-items-start">
									<MapPin size={18} className="me-3 mt-1 text-secondary" />
									<div>
										<strong className="text-white d-block mb-2">Service Areas:</strong>
										<div className="d-flex flex-wrap">
											<Link to="/locations/mississauga" className="service-area-pill">
												Mississauga
											</Link>
											<Link to="/locations/caledon" className="service-area-pill">
												Caledon
											</Link>
											<Link to="/locations/etobicoke" className="service-area-pill">
												Etobicoke
											</Link>
											<Link to="/locations/vaughan" className="service-area-pill">
												Vaughan
											</Link>
											<Link to="/locations/toronto" className="service-area-pill">
												Toronto
											</Link>
										</div>
									</div>
								</div>
							</Stack>
						</Col>
					</Row>

					{/* FOOTER BOTTOM */}
					<Row className="mt-5 pt-4 footer-bottom align-items-center">
						<Col md={6} className="text-center text-md-start mb-2 mb-md-0">
							© {currentYear} Pixel Towing Brampton. All Rights Reserved.
						</Col>
						<Col md={6} className="text-center text-md-end">
							<small className="text-muted">
								Fast • Reliable • 24/7 Emergency Towing
							</small>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};

export default Footer;
