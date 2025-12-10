import { Container, Row, Col, Card, Button, Accordion, Stack } from "react-bootstrap";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import SEO from "../components/SEO";

// SVG Component omitted for brevity, keep your WhatsAppIcon...
const WhatsAppIcon = () => (
	<svg
		role="img"
		aria-label="WhatsApp icon"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		width="20"
		height="20"
	>
		<title>WhatsApp</title>
		<path d="M17.472 14.382c-.297-.149-.88-.436-1.017-.487-.137-.05-.274-.074-.412.074-.137.148-.512.65-.627.782-.114.133-.23.149-.412.05-.182-.1-.76-.28-1.448-.895-.533-.45-.89-1.017-.996-1.192-.107-.175-.012-.267.074-.35.08-.08.174-.21.26-.297.087-.086.114-.148.174-.25.06-.098.03-.186-.02-.26-.05-.075-.412-.997-.563-1.365-.15-.368-.302-.315-.412-.32-.11-.004-.23.005-.348.005-.118 0-.306.04-.46.223-.15.18-.57.56-.57 1.365 0 .805.582 1.58.66 1.695.078.117 1.157 1.78 2.803 2.49.444.19.78.304 1.05.383.27.08.52.07.71.023.206-.05.65-.267.74-.52.09-.25.09-.47.06-.52-.03-.05-.137-.08-.297-.133zM20.22 3.78a12.016 12.016 0 00-16.44 0 12.016 12.016 0 000 16.44 12.016 12.016 0 000-16.44zM12 21.82a9.82 9.82 0 110-19.64 9.82 9.82 0 010 19.64z" />
	</svg>
);

const pageStyles = `
  .contact-hero {
    background: linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('/images/contact-bg.jpg');
    background-size: cover;
    background-position: center;
    padding: 6rem 0;
    margin-top: 56px;
    color: white;
  }
  .map-container {
    height: 350px;
    border-radius: 0.5rem;
    overflow: hidden;
  }
`;

const ContactPage = () => {
	return (
		<>
			{/* 🔥 CONTACT PAGE SPECIFIC METADATA */}
			<SEO
				title="Contact Pixel Towing | Emergency Tow Truck Brampton 24/7"
				description="Need urgent help? Call Pixel Towing at 647-673-9755. Available 24/7 for towing in Brampton, Mississauga & the GTA."
				canonical="https://pixeltowing.com/contact"
			/>

			<style>{pageStyles}</style>

			{/* Hero Section */}
			<div className="contact-hero text-center">
				<Container>
					{/* 🔥 H1 OPTIMIZATION */}
					<h1 className="display-3 fw-bold">Contact 24/7 Towing Dispatch</h1>
					<p className="lead text-white-50">
						Fast Tow Truck Response for Brampton, Mississauga & Toronto.
					</p>
				</Container>
			</div>

			<div className="py-5 bg-light">
				<Container>
					<Row className="g-5 align-items-stretch">
						{/* CONTACT METHODS */}
						<Col lg={7}>
							<Card className="p-4 p-md-5 border-0 shadow-lg h-100">
								<h2 className="text-center fw-bold mb-4">How Can We Help You?</h2>
								<p className="text-center text-muted mb-5">
									Fast response times. Open 24 Hours.
								</p>
								<Stack gap={4}>
									{/* Emergency Call */}
									<div className="d-flex align-items-center p-3 rounded-3 border contact-choice-card bg-white">
										<Phone size={40} className="text-danger flex-shrink-0 me-4" />
										<div className="flex-grow-1">
											<h4 className="mb-1">Emergency Towing</h4>
											<p className="mb-0 text-muted">
												Accidents, flatbeds, and breakdowns.
											</p>
										</div>
										<Button
											href="tel:+16476739755"
											variant="danger"
											className="fw-bold ms-3"
										>
											647-673-9755
										</Button>
									</div>

									{/* WhatsApp - GREAT for User Experience */}
									<div className="d-flex align-items-center p-3 rounded-3 border contact-choice-card bg-white">
										<WhatsAppIcon />
										<div className="flex-grow-1 ms-4">
											<h4 className="mb-1">WhatsApp Us</h4>
											<p className="mb-0 text-muted">
												Send your Live Location for faster pickup.
											</p>
										</div>
										<Button
											href="https://wa.link/sq54ln"
											target="_blank"
											rel="noopener noreferrer"
											variant="success"
											className="fw-bold ms-3 d-flex align-items-center"
										>
											<MessageSquare size={16} className="me-2" /> Chat
										</Button>
									</div>

									{/* Email */}
									<div className="d-flex align-items-center p-3 rounded-3 border contact-choice-card bg-white">
										<Mail size={40} className="text-primary flex-shrink-0 me-4" />
										<div className="flex-grow-1">
											<h4 className="mb-1">Get a Quote</h4>
											<p className="mb-0 text-muted">
												Scheduled long-distance towing quotes.
											</p>
										</div>
										<Button
											href="mailto:towing@pixel17.com"
											variant="primary"
											className="fw-bold ms-3"
										>
											Email
										</Button>
									</div>
								</Stack>
							</Card>
						</Col>

						{/* BUSINESS INFO & MAP */}
						<Col lg={5}>
							<div className="h-100 d-flex flex-column">
								<h2 className="fw-bold mb-3">Service Areas</h2>
								<p className="text-muted">
									We dispatch immediately to the following locations:
								</p>

								<div className="d-flex align-items-start mb-3">
									<MapPin className="text-primary me-3 mt-1 flex-shrink-0" size={24} />
									<span>
										<strong>Covering:</strong>
										<br />
										Brampton, Mississauga, Caledon, Toronto, North York, Scarborough,
										Vaughan & Etobicoke.
									</span>
								</div>

								<div className="d-flex align-items-start mb-4">
									<Clock className="text-primary me-3 mt-1 flex-shrink-0" size={24} />
									<span>
										<strong>Hours:</strong>
										<br />
										24 Hours a Day, 7 Days a Week, 365 Days a Year
									</span>
								</div>

								<div className="map-container mt-auto">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92265.29381832973!2d-79.84943960309904!3d43.71694665420367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b15eba6d400e3%3A0x63391d3742468538!2sBrampton%2C%20ON!5e0!3m2!1sen!2sca!4f179"
										width="100%"
										height="100%"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										title="Brampton Towing Service Area Map"
									></iframe>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* FAQ (Excellent for "People also ask" snippet ranking) */}
			<div className="py-5 bg-white">
				<Container>
					<div className="text-center mb-5">
						<h2 className="display-5 fw-bold text-dark">Towing FAQ</h2>
						<p className="lead text-muted">
							Common questions about our Brampton roadside services.
						</p>
					</div>
					<Row className="justify-content-center">
						<Col md={10} lg={8}>
							<Accordion defaultActiveKey="0">
								<Accordion.Item eventKey="0">
									<Accordion.Header>
										How fast can you get a tow truck to Brampton?
									</Accordion.Header>
									<Accordion.Body>
										We typically arrive within 30 minutes in Brampton, Mississauga, and
										Etobicoke, depending on traffic conditions and weather.
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="1">
									<Accordion.Header>
										Do you offer direct billing to insurance?
									</Accordion.Header>
									<Accordion.Body>
										Yes. We work with all major Canadian insurance providers (Intact,
										Belair, Aviva, etc.). We can often tow your vehicle to the collision
										center and bill the insurance directly.
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="2">
									<Accordion.Header>
										Do you accept Credit/Debit at the roadside?
									</Accordion.Header>
									<Accordion.Body>
										Yes, all our drivers carry POS machines. We accept Visa, Mastercard,
										Debit, Cash, and e-Transfer.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default ContactPage;
