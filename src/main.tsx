import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/global.css";
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

// The prerendered HTML (scripts/prerender.mjs) is a browser DOM snapshot, not
// React server output — adjacent text nodes are merged — so hydrateRoot always
// reports a mismatch and re-renders anyway. Mount fresh instead: crawlers and
// first paint still get the full prerendered page, without hydration errors.
createRoot(rootElement).render(app);
