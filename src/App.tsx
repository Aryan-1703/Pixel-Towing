import { Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BusinessSchema from "./components/BusinessSchema";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AccidentRecoveryPage from "./pages/AccidentRecoveryPage";
import LocationsPage from "./pages/LocationsPage";
import LocationPage from "./pages/LocationPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ReviewPage from "./pages/ReviewPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AboutPage from "./pages/AboutPage";
import { PERMANENT_REDIRECTS } from "./content/routes";

// Every public URL must also be listed in src/content/routes.ts (or derived
// from a content module there) so it is prerendered and in the sitemap.
function App() {
	return (
		<>
			<BusinessSchema />
			<ScrollToTop />
			<AppNavbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/services" element={<ServicesPage />} />
					<Route path="/accident-recovery" element={<AccidentRecoveryPage />} />
					{/* server.mjs answers these with HTTP 301; this is only a client-side safety net. */}
					{Object.entries(PERMANENT_REDIRECTS).map(([from, to]) => (
						<Route key={from} path={from} element={<Navigate to={to} replace />} />
					))}
					<Route path="/services/:serviceId" element={<ServiceDetailPage />} />
					<Route path="/locations" element={<LocationsPage />} />
					<Route path="/locations/:cityId" element={<LocationPage />} />
					<Route path="/blog" element={<BlogPage />} />
					<Route path="/blog/:slug" element={<BlogPostPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/review" element={<ReviewPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
