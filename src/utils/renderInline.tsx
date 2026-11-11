import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const INLINE_TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
const LINK_TOKEN = /^\[([^\]]+)\]\(([^)]+)\)$/;
const BOLD_TOKEN = /^\*\*([^*]+)\*\*$/;

/**
 * Renders **bold** and [text](url) inside one line of copy.
 *
 * Site-relative links ("/services/lockout") become client-side <Link>s, so
 * they are real crawlable anchors in the prerendered HTML. External links
 * open in a new tab so official sources open cleanly.
 */
export const renderInline = (text: string, keyPrefix: string): ReactNode[] =>
	text
		.split(INLINE_TOKEN)
		.filter(Boolean)
		.map((token, i) => {
			const key = `${keyPrefix}-${i}`;
			const link = LINK_TOKEN.exec(token);
			if (link && link[2].startsWith("/")) {
				return (
					<Link key={key} to={link[2]}>
						{link[1]}
					</Link>
				);
			}
			if (link) {
				const isExternal = link[2].startsWith("http");
				return (
					<a key={key} href={link[2]} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
						{link[1]}
					</a>
				);
			}
			const bold = BOLD_TOKEN.exec(token);
			// Recurse so a link inside bold text ("**Call our [lockout service](/x)**") still renders.
			if (bold) return <strong key={key}>{renderInline(bold[1], key)}</strong>;
			return token;
		});
