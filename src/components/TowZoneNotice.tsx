import { AlertTriangle } from "lucide-react";

const TOW_ZONE_URL = "https://www.ontario.ca/page/tow-zone-pilot-program";

interface TowZoneNoticeProps {
	/** e.g. "Highways 401, 403 and 410" — omit for the general GTA wording. */
	highways?: string;
	className?: string;
}

/**
 * Ontario's Tow Zone Program restricts who may tow on sections of GTA
 * 400-series highways. Shown wherever the site talks about highway calls so
 * it never implies we can tow inside a restricted zone.
 */
const TowZoneNotice = ({ highways, className = "" }: TowZoneNoticeProps) => (
	<div className={`d-flex align-items-start gap-3 p-3 rounded-3 border border-warning bg-warning bg-opacity-10 ${className}`}>
		<AlertTriangle size={20} className="text-warning flex-shrink-0 mt-1" aria-hidden="true" />
		<p className="small text-secondary mb-0">
			<strong>Highway tow zones:</strong> sections of{" "}
			{highways ?? "Highways 400, 401, 403, 404, 409, 410 and 427 and the QEW"} are in
			Ontario's{" "}
			<a href={TOW_ZONE_URL} target="_blank" rel="noopener noreferrer">
				Tow Zone Program
			</a>
			, where only the ministry's contracted operator can tow vehicles off the highway. Once
			your vehicle is outside the zone, you can choose who tows it next and where it goes.
		</p>
	</div>
);

export default TowZoneNotice;
