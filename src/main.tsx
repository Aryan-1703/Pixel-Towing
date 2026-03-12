import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root")!;

const app = (
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>
);

// If react-snap pre-rendered this page, hydrate it; otherwise mount fresh
if (rootElement.hasChildNodes()) {
	hydrateRoot(rootElement, app);
} else {
	createRoot(rootElement).render(app);
}
