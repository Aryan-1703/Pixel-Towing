import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AccidentRecoveryPage from "./pages/AccidentRecoveryPage";
import LocationPage from "./pages/LocationPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ReviewPage from "./pages/ReviewPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";

function App() {
	return (
		<>
			<ScrollToTop />
			<AppNavbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/services" element={<ServicesPage />} />
					{/* Dedicated high-priority accident/collision page */}
					<Route path="/accident-recovery" element={<AccidentRecoveryPage />} />
					<Route path="/collision-repair" element={<AccidentRecoveryPage />} />
					<Route path="/services/:serviceId" element={<ServiceDetailPage />} />
					{/* SEO Location Pages */}
					<Route path="/locations/:cityId" element={<LocationPage />} />
					{/* Blog */}
					<Route path="/blog" element={<BlogPage />} />
					<Route path="/blog/:slug" element={<BlogPostPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/review" element={<ReviewPage />} />
					{/* 404 */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
