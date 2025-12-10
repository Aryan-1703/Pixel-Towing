import { Container, Button } from "react-bootstrap";
import "../css/HeroSection.css";

const HeroSection = () => (
	<section className="hero-section">
		<Container className="hero-overlay text-center">
			<h1>24/7 Towing Service in Brampton & GTA</h1>
			<h2 className="mt-3">Fast Tow Truck Response – Under 20 Minutes</h2>

			<p className="mt-2">
				Emergency towing, roadside assistance, scrap car removal, boosts, lockouts, and
				long-distance towing across Brampton, Mississauga, Toronto, Scarborough, and North
				York.
			</p>

			<div className="hero-cta mt-4">
				<Button variant="warning" size="lg" className="me-2" href="tel:+19057815544">
					+1 (905) 781-5544
				</Button>

				<Button variant="outline-light" size="lg" href="mailto:towing@pixel17.com">
					towing@pixel17.com
				</Button>
			</div>
		</Container>
	</section>
);

export default HeroSection;
