import React from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SITE_ORIGIN } from "../content/site";

export interface Crumb {
	/** Visible label. */
	name: string;
	/** Site-relative path, e.g. "/services". Omit on the final (current) crumb. */
	to?: string;
}

interface BreadcrumbsProps {
	trail: readonly Crumb[];
	/** Absolute URL of the current page — used as the last BreadcrumbList item. */
	currentUrl: string;
	/**
	 * Set false on pages that already emit their own BreadcrumbList inside a
	 * larger @graph, so the page never ships two competing breadcrumb nodes.
	 */
	withSchema?: boolean;
}

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 *
 * Google asks that breadcrumb structured data reflect breadcrumbs the user can
 * actually see, so the visible trail and the schema are generated from one list.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	trail,
	currentUrl,
	withSchema = true,
}) => {
	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"@id": `${currentUrl}#breadcrumb`,
		itemListElement: trail.map((crumb, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: crumb.name,
			item: crumb.to ? `${SITE_ORIGIN}${crumb.to}` : currentUrl,
		})),
	};

	return (
		<>
			{withSchema && (
				<Helmet>
					<script type="application/ld+json">{JSON.stringify(schema)}</script>
				</Helmet>
			)}
			<Container className="pt-4">
				<Breadcrumb listProps={{ className: "mb-0 small" }}>
					{trail.map(crumb =>
						crumb.to ? (
							<Breadcrumb.Item
								key={crumb.name}
								linkAs={Link}
								linkProps={{ to: crumb.to }}
							>
								{crumb.name}
							</Breadcrumb.Item>
						) : (
							<Breadcrumb.Item key={crumb.name} active>
								{crumb.name}
							</Breadcrumb.Item>
						),
					)}
				</Breadcrumb>
			</Container>
		</>
	);
};

export default Breadcrumbs;
