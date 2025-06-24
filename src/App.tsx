import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar"; // Your universal navbar
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";

// Placeholder components for routes we haven't built yet
const AreasPage = () => (
	<div style={{ paddingTop: "100px" }}>
		<h1>Our Service Areas</h1>
	</div>
);
const ContactPage = () => (
	<div style={{ paddingTop: "100px" }}>
		<h1>Contact Us</h1>
	</div>
);
const NotFoundPage = () => (
	<div style={{ paddingTop: "100px" }}>
		<h1>404 - Page Not Found</h1>
	</div>
);

function App() {
	return (
		<>
			<AppNavbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/services" element={<ServicesPage />} />
					<Route path="/services/:serviceId" element={<ServiceDetailPage />} />
					<Route path="/service-areas" element={<AreasPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
