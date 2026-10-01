/**
 * Single source of truth for article authorship.
 *
 * Google's guidance on people-first content asks for clarity about who created
 * the content, so the byline, the Article schema's author node and the author
 * page all read from here.
 */
export const AUTHOR = {
	name: "Aryan Talpada",
	jobTitle: "Owner and Tow Operator",
	/** Site-relative author page — used as the schema author `url`. */
	url: "https://pixeltowing.com/about",
	location: "Brampton, Ontario",
} as const;
