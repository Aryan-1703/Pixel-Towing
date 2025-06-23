import { Container, Button } from "react-bootstrap";
import "../css/HeroSection.css";

const HeroSection = () => (
	<section className="hero-section">
		<Container className="hero-overlay text-center">
			<h1>LESS THAN 20 MIN ARRIVAL</h1>
			<p>Call Us Now for 24/7 Towing Service in Brampton & GTA</p>
			<div className="hero-cta">
				<Button variant="warning" size="lg" className="me-2">
					+1 (905) 781‑5544
				</Button>
				<Button variant="outline-light" size="lg">
					towing@pixel17.com
				</Button>
			</div>
		</Container>
	</section>
);

export default HeroSection;
