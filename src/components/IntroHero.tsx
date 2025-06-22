import { Container } from "react-bootstrap";
import "../css/IntroHero.css";

const letters = ["P", "I", "X", "E", "L"];

const IntroHero = () => {
	return (
		<section className="intro-hero d-flex align-items-center justify-content-center text-white">
			<Container className="text-center">
				<div className="pixel-word">
					{letters.map((letter, index) => (
						<span
							key={index}
							className="pixel-letter"
							style={{ animationDelay: `${index * 0.4}s` }}
						>
							{letter}
						</span>
					))}
				</div>
				<h2 className="towing-text">TOWING</h2>
			</Container>
		</section>
	);
};

export default IntroHero;
