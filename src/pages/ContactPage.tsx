import { Container, Row, Col, Card, Button, Accordion, Stack } from "react-bootstrap";
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";

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
    background: linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('/assets/tow.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 6rem 0;
    margin-top: 56px;
    color: white;
  }
  .map-container {
    height: 400px;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const ContactPage = () => {
	return (
		<>
			<SEO
				title="Contact Pixel Towing | 24/7 Emergency Tow Truck Brampton"
				description="Need a tow truck fast? Call Pixel Towing 24/7 for emergency towing in Brampton, Mississauga & the GTA. Insurance-direct accident recovery available."
				canonical="https://pixeltowing.com/contact"
			/>

			<style>{pageStyles}</style>

			{/* HERO SECTION */}
			<div className="contact-hero text-center">
				<Container>
					<h1 className="display-3 fw-bold">
						Contact Pixel Towing – 24/7 Emergency Tow Truck in Brampton
					</h1>
					<p className="lead text-white-50">
						Fast tow truck dispatch across Brampton, Mississauga & the GTA.
					</p>
					<div className="mt-4">
						<Button
							href="tel:+16476739755"
							variant="warning"
							size="lg"
							className="rounded-pill px-5 fw-bold shadow-lg"
						>
							<Phone className="me-2" /> 647-673-9755
						</Button>
					</div>
				</Container>
			</div>

			<div className="py-5 bg-light">
				<Container>
					<Row className="g-5 align-items-stretch">
						{/* CONTACT METHODS */}
						<Col lg={7}>
							<Card className="p-4 p-md-5 border-0 shadow-lg h-100 rounded-4">
								<h2 className="fw-bold mb-4">How Can We Help You?</h2>
								<p className="text-muted mb-5">
									Our 24/7 dispatch team sends the nearest tow truck to your live
									location.
								</p>

								<Stack gap={4}>
									<div className="d-flex align-items-center p-4 rounded-4 border bg-white shadow-sm">
										<Phone size={32} className="text-danger me-4" />
										<div className="flex-grow-1">
											<h4 className="fw-bold mb-1">Emergency Towing</h4>
											<p className="mb-0 text-muted small">
												Accidents, breakdowns & flatbeds
											</p>
										</div>
										<Button
											href="tel:+16476739755"
											variant="danger"
											className="rounded-pill fw-bold"
										>
											Call Now
										</Button>
									</div>

									<div className="d-flex align-items-center p-4 rounded-4 border bg-white shadow-sm">
										<div className="text-success me-4">
											<WhatsAppIcon />
										</div>
										<div className="flex-grow-1">
											<h4 className="fw-bold mb-1">WhatsApp Dispatch</h4>
											<p className="mb-0 text-muted small">Send GPS for faster pickup</p>
										</div>
										<Button
											href="https://wa.link/sq54ln"
											target="_blank"
											variant="success"
											className="rounded-pill fw-bold"
										>
											<MessageSquare size={16} className="me-2" /> Chat
										</Button>
									</div>

									<div className="d-flex align-items-center p-4 rounded-4 border bg-white shadow-sm">
										<Mail size={32} className="text-primary me-4" />
										<div className="flex-grow-1">
											<h4 className="fw-bold mb-1">Scheduled Towing</h4>
											<p className="mb-0 text-muted small">
												Long distance & planned transport
											</p>
										</div>
										<Button
											href="mailto:towing@pixel17.com"
											variant="outline-primary"
											className="rounded-pill fw-bold"
										>
											Email
										</Button>
									</div>
								</Stack>
							</Card>
						</Col>

						{/* INFO + MAP */}
						<Col lg={5}>
							<h2 className="fw-bold h4 mb-3">Dispatch Coverage</h2>
							<p className="text-muted">
								Mobile tow trucks covering Peel Region & GTA highways.
							</p>

							<div className="d-flex mb-3">
								<MapPin size={22} className="text-warning me-3" />
								<span>
									<strong>Service Area:</strong>
									<br />
									Brampton, Mississauga, Toronto, Vaughan, Hwy 401/410/407
								</span>
							</div>

							<div className="d-flex mb-3">
								<Clock size={22} className="text-warning me-3" />
								<span>
									<strong>Hours:</strong>
									<br />
									24/7 – 365 Days
								</span>
							</div>

							<div className="d-flex mb-4">
								<ShieldCheck size={22} className="text-warning me-3" />
								<span>
									<strong>Insurance Billing:</strong>
									<br />
									Accident recovery is fully covered — customers pay nothing out of pocket
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
						</Col>
					</Row>
				</Container>
			</div>

			{/* FAQ */}
			<div className="py-5 bg-white">
				<Container>
					<h2 className="text-center fw-bold mb-4">Towing Contact Questions</h2>
					<Accordion flush>
						<Accordion.Item eventKey="0">
							<Accordion.Header>How fast can a tow truck arrive?</Accordion.Header>
							<Accordion.Body>
								Average arrival time is 15–30 minutes depending on traffic.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>Does insurance cover accident towing?</Accordion.Header>
							<Accordion.Body>
								Yes. Accident recovery is billed directly to insurance — you pay nothing.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2">
							<Accordion.Header>What payment methods do you accept?</Accordion.Header>
							<Accordion.Body>
								We accept Debit, Credit Cards, Apple Pay, Google Pay & Cash.
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Container>
			</div>
		</>
	);
};

export default ContactPage;
