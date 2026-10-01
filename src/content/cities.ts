/**
 * Service-area content for /locations/:cityId.
 *
 * Pure data (no React, JSX or asset imports) so routes.ts and the build-time
 * sitemap generator can read it. Each city must stay genuinely local: its own
 * roads, neighbourhoods, typical calls and FAQs. Shared facts (payment, hours,
 * insurance) live on the pages that own them, not repeated here.
 */

export interface CityFaq {
	q: string;
	a: string;
}

export interface CityContent {
	name: string;
	/** Section heading under the hero. */
	heading: string;
	/** Unique meta description for this city. */
	metaDescription: string;
	intro: string;
	roads: string;
	neighbourhoods: string;
	landmarks: string;
	/**
	 * Provincial Tow Zone Program highways in this area. Inside those zones only
	 * the ministry's contracted operator may tow, so pages must say so rather
	 * than promise a highway tow. Null when no zone highway runs through.
	 */
	towZoneHighways: string | null;
	/** Typical calls in this area — what makes towing here different. */
	localSituations: readonly string[];
	faq: readonly CityFaq[];
	/** Slugs of neighbouring service areas ("brampton" links to the homepage). */
	nearby: readonly string[];
	/**
	 * City-specific ETA range. Leave null unless it is backed by real dispatch
	 * history; the page then falls back to the standard dispatch message.
	 */
	etaRange: string | null;
	/** ISO date this city's content last changed substantially. */
	lastmod: string;
}

export const CITY_SLUGS = [
	"mississauga",
	"caledon",
	"etobicoke",
	"vaughan",
	"toronto",
	"georgetown",
	"halton-hills",
	"acton",
	"erin",
] as const;

export type CitySlug = (typeof CITY_SLUGS)[number];

export const isCitySlug = (value: string): value is CitySlug =>
	(CITY_SLUGS as readonly string[]).includes(value);

const CONTENT_REVIEWED = "2026-09-30";

export const CITIES: Record<CitySlug, CityContent> = {
	mississauga: {
		name: "Mississauga",
		heading: "Towing and Roadside Help Across Mississauga",
		towZoneHighways: "Highways 401, 403, 410 and 427 and the QEW",
		metaDescription:
			"Tow truck and roadside assistance in Mississauga — Hurontario, Dundas and parking-garage calls, accident towing, lockouts and boosts. 24/7 dispatch: 647-673-9755.",
		intro:
			"Most of our Mississauga calls come from its arterial roads and from the parking structures around its malls, offices and condo towers. We cover the whole city, from Lakeshore Road in the south to Heartland and Malton in the north.",
		roads: "Hurontario Street, Mississauga Road, Dundas Street, Eglinton Avenue and Lakeshore Road",
		neighbourhoods: "Port Credit, Streetsville, Meadowvale, Malton, Cooksville and Clarkson",
		landmarks: "Square One, Heartland Town Centre, Port Credit and the Pearson Airport area",
		localSituations: [
			"Vehicles that won't start in mall and office parking structures",
			"Breakdowns on Hurontario, Dundas and Eglinton during rush hour",
			"Airport-area calls around Pearson, Airport Road and Dixon Road",
			"Tows from Mississauga to a Brampton or Toronto repair shop of your choice",
		],
		faq: [
			{
				q: "Do you cover the whole of Mississauga?",
				a: "Yes — from Port Credit and Lakeshore Road up through Cooksville, Meadowvale and Streetsville to Heartland and Malton.",
			},
			{
				q: "Can you get a car out of a parking garage at Square One?",
				a: "Often, yes, but clearance varies between structures. Tell dispatch which level you're on and the posted height limit so we can send a suitable truck or bring the car up to street level first.",
			},
			{
				q: "I broke down on the 401, 403, 410 or QEW in Mississauga. Can you tow me?",
				a: "Those highways are inside Ontario's Tow Zone Program, so only the ministry's contracted operator can tow you off them. Once your vehicle is outside the zone, you can choose who tows it next and where it goes — including calling us.",
			},
		],
		nearby: ["brampton", "etobicoke", "toronto"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	caledon: {
		name: "Caledon",
		heading: "Caledon Towing, Winch-Outs and Rural Recovery",
		towZoneHighways: null,
		metaDescription:
			"Towing in Caledon — Bolton, Mayfield West, Palgrave and Hwy 10/50 corridors. Ditch pull-outs, winch-outs, breakdown towing and boosts. Call 647-673-9755.",
		intro:
			"Caledon is mostly rural road, and that changes the work. Many of our calls here are cars and pickups that have slid into a ditch on a gravel concession road, or breakdowns on Hwy 10, Hwy 50 and Airport Road where there is no shoulder to speak of.",
		roads: "Highway 10, Highway 50, Highway 9, Airport Road and the Caledon concession roads",
		neighbourhoods: "Bolton, Mayfield West, Caledon East, Palgrave, Inglewood, Cheltenham and Terra Cotta",
		landmarks: "Bolton, Caledon East, the Forks of the Credit and the Niagara Escarpment villages",
		localSituations: [
			"Ditch pull-outs and winch-outs on gravel and back roads",
			"Winter slide-offs on the escarpment hills near Inglewood and Terra Cotta",
			"Breakdowns on Hwy 10 and Hwy 50 through Bolton and Mayfield West",
			"Long tows from rural Caledon to a shop in Brampton or the GTA",
		],
		faq: [
			{
				q: "Can you pull a vehicle out of a ditch in rural Caledon?",
				a: "Yes. Winch-outs and ditch recoveries are a regular part of our Caledon work. Tell dispatch how far off the road the vehicle is and whether it's on its wheels so we can bring the right equipment.",
			},
			{
				q: "My GPS location is a concession road with no address. How do I tell you where I am?",
				a: "Give us the nearest two crossroads (for example, Old Church Road and Airport Road) or share your live location by WhatsApp. That's usually more reliable than a rural address.",
			},
			{
				q: "Can you tow from Caledon to Brampton or Toronto?",
				a: "Yes. We tow from anywhere in Caledon to any GTA destination you choose. Call with your location and destination for a price before we dispatch.",
			},
		],
		nearby: ["brampton", "georgetown", "vaughan"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	etobicoke: {
		name: "Etobicoke",
		heading: "Etobicoke Tow Truck and Roadside Service",
		towZoneHighways: "Highways 401, 409 and 427 and the QEW",
		metaDescription:
			"Etobicoke towing and roadside help — Gardiner, Queensway and Rexdale to Long Branch. 24/7 dispatch: 647-673-9755.",
		intro:
			"Etobicoke's calls split between Rexdale's industrial areas in the north, the commuter routes through the middle, and the lakeshore neighbourhoods in the south.",
		roads: "the Gardiner Expressway, the Queensway, Kipling Avenue, Islington Avenue and Dixon Road",
		neighbourhoods: "Rexdale, Humber Valley, Islington Village, Alderwood, Long Branch and Mimico",
		landmarks: "Sherway Gardens, Kipling Station, Humber College North and the Queensway",
		localSituations: [
			"Commuter breakdowns on the Gardiner and the Queensway",
			"Onward tows to your own shop after a tow-zone operator has cleared the highway",
			"Calls around the industrial parks of Rexdale and the Pearson approach roads",
			"Lockouts and dead batteries in South Etobicoke condo parking",
		],
		faq: [
			{
				q: "Do you cover both North and South Etobicoke?",
				a: "Yes — from Rexdale and Humber Summit in the north down to Mimico, New Toronto, Alderwood and Long Branch by the lake.",
			},
			{
				q: "I've broken down on the Gardiner. Is it safe to wait in the car?",
				a: "If you can't reach an exit, pull as far right as you can, turn on your hazard lights and stay buckled in with the doors closed. Call 911 if you're in a live lane or anyone is hurt, then call us.",
			},
			{
				q: "Can you tow my car from Etobicoke to my own mechanic?",
				a: "Yes. You choose where the vehicle goes. Give us the shop's address when you call and we'll quote the tow before dispatch.",
			},
		],
		nearby: ["mississauga", "toronto", "brampton"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	vaughan: {
		name: "Vaughan",
		heading: "Tow Truck Service in Vaughan",
		towZoneHighways: "Highways 400 and 427",
		metaDescription:
			"Vaughan towing and roadside assistance — Highway 7 and 27 corridors, Woodbridge, Maple, Concord and Kleinburg. 24/7 dispatch: 647-673-9755.",
		intro:
			"We cover the residential streets of Woodbridge and Maple, the industrial blocks of Concord, the Highway 7 corridor and the quieter rural roads around Kleinburg.",
		roads: "Highway 7, Highway 27, Rutherford Road, Major Mackenzie Drive and Weston Road",
		neighbourhoods: "Woodbridge, Maple, Concord, Thornhill, Kleinburg and Vellore",
		landmarks: "Vaughan Mills, Canada's Wonderland, the Vaughan Metropolitan Centre and Kleinburg village",
		localSituations: [
			"Breakdowns along Highway 7 and Highway 27",
			"Dead batteries and lockouts around Vaughan Mills and the Vaughan Metropolitan Centre",
			"Commercial and warehouse yard calls in Concord",
			"Flatbed tows to Vaughan dealerships and repair shops",
		],
		faq: [
			{
				q: "Can you tow me off Highway 400 or 427 in Vaughan?",
				a: "Those highways are inside Ontario's Tow Zone Program, so only the ministry's contracted operator can tow you off them. Once your vehicle is outside the zone, you can choose who tows it next and where it goes.",
			},
			{
				q: "Do you go to Kleinburg and the rural parts of west Vaughan?",
				a: "Yes, including Kleinburg, Nashville and Hwy 27 north of Hwy 7.",
			},
			{
				q: "Can you take my car to my dealership in Vaughan?",
				a: "Yes. You choose the destination. If the car is all-wheel drive we'll use a flatbed.",
			},
		],
		nearby: ["brampton", "caledon", "toronto"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	toronto: {
		name: "Toronto",
		heading: "Towing in Toronto",
		towZoneHighways: "Highways 400, 401, 404, 409 and 427",
		metaDescription:
			"Towing and roadside help in Toronto — North York and York calls, plus long-distance tows out of the city. Call 647-673-9755.",
		intro:
			"Our Toronto work is concentrated in the north and west of the city — North York, York and Weston — since that's closest to our Brampton base. We also take scheduled and long-distance tows out of Toronto to Peel Region and across Ontario.",
		roads: "the Allen Road, Keele Street, Jane Street, Finch Avenue and Wilson Avenue",
		neighbourhoods: "North York, York, Weston, Downsview and Lawrence Heights",
		landmarks: "Yorkdale, Downsview Park and Humber River Hospital",
		localSituations: [
			"Breakdowns on the Allen Road, Finch and Wilson",
			"Tows from North York and York to a repair shop of your choice",
			"Condo and apartment parking calls in North York",
			"Long-distance tows from Toronto to Peel Region and beyond",
		],
		faq: [
			{
				q: "Do you tow from downtown Toronto?",
				a: "We can, but downtown is the furthest part of the city from our base and traffic in the core adds time. Call with your location and we'll give you an honest estimate before dispatch.",
			},
			{
				q: "Can you tow me off the 401 in Toronto?",
				a: "Highway 401 through Toronto is inside Ontario's Tow Zone Program, so only the ministry's contracted operator can tow you off it. Once your vehicle is outside the zone, you can choose who tows it next — including us.",
			},
		],
		nearby: ["etobicoke", "mississauga", "vaughan"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	georgetown: {
		name: "Georgetown",
		heading: "Georgetown Towing Service",
		towZoneHighways: null,
		metaDescription:
			"Towing in Georgetown, Halton Hills — Guelph Street, Mountainview Road and Trafalgar Road breakdowns, winch-outs and tows to Brampton. Call 647-673-9755.",
		intro:
			"Georgetown is the largest town in Halton Hills and a short run west of Brampton along Highway 7 and Mayfield Road. Calls here range from breakdowns on Guelph Street and Mountainview Road to slide-offs on the rural roads around Glen Williams and Norval.",
		roads: "Guelph Street (Hwy 7), Mountainview Road, Trafalgar Road, Mayfield Road and Main Street",
		neighbourhoods: "Downtown Georgetown, Glen Williams, Norval, Silver Creek and Georgetown South",
		landmarks: "Georgetown Hospital, Georgetown GO Station, Main Street and the Credit River valley",
		localSituations: [
			"Breakdowns on Guelph Street and the Hwy 7 approach from Brampton",
			"Winter slide-offs on the Credit valley roads near Glen Williams",
			"Dead batteries and lockouts around the GO station and downtown",
			"Tows from Georgetown to a Brampton, Mississauga or Guelph shop",
		],
		faq: [
			{
				q: "Do you tow from Georgetown to Brampton or Mississauga?",
				a: "Yes. You choose the destination and we'll quote the tow before dispatch.",
			},
			{
				q: "Do you cover Glen Williams and Norval?",
				a: "Yes, along with the rest of Georgetown and the surrounding rural roads.",
			},
		],
		nearby: ["brampton", "halton-hills", "acton"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	acton: {
		name: "Acton",
		heading: "Acton Towing and Recovery",
		towZoneHighways: null,
		metaDescription:
			"Towing in Acton, Ontario — Hwy 7 and Hwy 25 breakdowns, rural winch-outs, boosts and tows to Georgetown, Brampton or Guelph. Call 647-673-9755.",
		intro:
			"Acton is a small town, but Highway 7 runs straight through it between Georgetown and Guelph, so a good share of our calls here are through-traffic breakdowns. The rest come from the farm roads and concessions around town, where a winch-out is often what's needed.",
		roads: "Highway 7 (Queen Street), Highway 25 and the Halton Hills side roads",
		neighbourhoods: "Downtown Acton, the Acton industrial area and the surrounding rural township",
		landmarks: "Fairy Lake, Acton GO Station, Prospect Park and Main Street",
		localSituations: [
			"Through-traffic breakdowns on Hwy 7 between Georgetown and Guelph",
			"Ditch and field recoveries on the rural roads around town",
			"Battery boosts at the GO station lot on cold mornings",
			"Tows from Acton to Georgetown, Brampton or Guelph",
		],
		faq: [
			{
				q: "Do you cover the rural roads outside Acton?",
				a: "Yes, including Hwy 25 and the side roads and concessions around town. Give us the nearest crossroads if there's no street address.",
			},
			{
				q: "Can you tow from Acton to Brampton or Guelph?",
				a: "Yes. Tell us where you want the vehicle to go and we'll quote the tow before dispatch.",
			},
		],
		nearby: ["georgetown", "halton-hills", "erin"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	"halton-hills": {
		name: "Halton Hills",
		heading: "Towing Across Halton Hills",
		towZoneHighways: "Highway 401",
		metaDescription:
			"Halton Hills towing — Steeles Avenue corridor, Toronto Premium Outlets, Limehouse and rural recoveries. 24/7 dispatch: 647-673-9755.",
		intro:
			"Halton Hills covers a lot of ground beyond its two towns. We have separate pages for Georgetown and Acton; this page is about the rest of the municipality — the Steeles Avenue corridor in the south, the outlets at Trafalgar Road, and the rural hamlets in between.",
		roads: "Steeles Avenue, Trafalgar Road, Winston Churchill Boulevard and Tenth Line",
		neighbourhoods: "Limehouse, Ballinafad, Stewarttown, Terra Cotta and the Steeles Avenue corridor",
		landmarks: "Toronto Premium Outlets, the Steeles Avenue industrial strip and the Limehouse Conservation Area",
		localSituations: [
			"Dead batteries and lockouts in the Toronto Premium Outlets lots",
			"Commercial and yard calls along the Steeles Avenue industrial strip",
			"Rural slide-offs around Limehouse and Ballinafad",
		],
		faq: [
			{
				q: "Do you cover all of Halton Hills?",
				a: "Yes — Georgetown, Acton and the rural areas between them. For the two towns, see our Georgetown and Acton pages.",
			},
			{
				q: "Can you help at the Toronto Premium Outlets?",
				a: "Yes. Tell dispatch which lot and the nearest store entrance so the driver can find you quickly.",
			},
		],
		nearby: ["georgetown", "acton", "brampton"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},

	erin: {
		name: "Erin",
		heading: "Erin and Hillsburgh Towing",
		towZoneHighways: null,
		metaDescription:
			"Towing in Erin and Hillsburgh, Wellington County — rural breakdowns, winter winch-outs and long-distance tows to Brampton or Guelph. Call 647-673-9755.",
		intro:
			"Erin is the furthest of our regular service areas, in southern Wellington County. Calls here are usually rural: winter slide-offs on the hilly roads of the Credit River headwaters, breakdowns on Wellington Road 124, and long tows back to a shop in Brampton, Georgetown or Guelph.",
		roads: "Wellington Road 124, Trafalgar Road and the county roads around Erin and Hillsburgh",
		neighbourhoods: "Erin Village, Hillsburgh, Ballinafad and Orton",
		landmarks: "Main Street Erin, the Erin Fairgrounds, Hillsburgh and the Credit River headwaters",
		localSituations: [
			"Winter slide-offs on the hills around Erin and Hillsburgh",
			"Breakdowns on Wellington Road 124",
			"Rural winch-outs where there's no shoulder or street address",
			"Long-distance tows to Brampton, Georgetown or Guelph",
		],
		faq: [
			{
				q: "Do you serve the rural areas around Erin, like Orton and Hillsburgh?",
				a: "Yes. GPS often misroutes on the county roads, so give us your nearest crossroads or share your live location by WhatsApp.",
			},
			{
				q: "What's the best way to get a tow from Erin to Brampton?",
				a: "Call 647-673-9755 with your location and destination. We'll quote the tow before dispatch.",
			},
		],
		nearby: ["acton", "halton-hills", "georgetown"],
		etaRange: null,
		lastmod: CONTENT_REVIEWED,
	},
};

/** Every service area shown on the /locations hub, nav and footer. Brampton is the homepage. */
export const SERVICE_AREAS: readonly { slug: CitySlug | "brampton"; name: string; path: string }[] = [
	{ slug: "brampton", name: "Brampton", path: "/" },
	...CITY_SLUGS.map(slug => ({ slug, name: CITIES[slug].name, path: `/locations/${slug}` })),
];

export const serviceAreaBySlug = (slug: string) =>
	SERVICE_AREAS.find(area => area.slug === slug);
