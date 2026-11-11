/**
 * Single source of truth for article authorship.
 *
 * Google's guidance on people-first content asks for clarity about who created
 * the content, so the byline, the Article schema's author node and the author
 * page all read from here.
 */
import { absoluteUrl } from "./site";

const AUTHOR_PAGE_URL = absoluteUrl("/about");

export const AUTHOR = {
	name: "Aryan Talpada",
	jobTitle: "Owner and Tow Operator",
	/** Site-relative author page — used as the schema author `url`. */
	url: AUTHOR_PAGE_URL,
	/** Stable JSON-LD id for this person; the About page holds the full node. */
	schemaId: `${AUTHOR_PAGE_URL}#author`,
	location: "Brampton, Ontario",
} as const;

/**
 * Minimal Person node that any page can embed. It carries the same `@id` as the
 * full node on /about, so references resolve on every page, not just that one.
 */
export const AUTHOR_SCHEMA_NODE = {
	"@type": "Person",
	"@id": AUTHOR.schemaId,
	name: AUTHOR.name,
	jobTitle: AUTHOR.jobTitle,
	url: AUTHOR.url,
} as const;
