import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import LocationPage from "./pages/LocationPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<>
			<ScrollToTop />
			<AppNavbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/services" element={<ServicesPage />} />
					<Route path="/services/:serviceId" element={<ServiceDetailPage />} />
					{/* SEO Location Pages */}
					<Route path="/locations/:cityId" element={<LocationPage />} />
					<Route path="/contact" element={<ContactPage />} />
					{/* 404 */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
