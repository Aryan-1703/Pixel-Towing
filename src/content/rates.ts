/**
 * Pixel Towing's published prices: the single source of truth for the tow
 * cost calculator page, its rate tables and llms.txt.
 *
 * Every number here comes from the owner. Ontario's TSSEA says an operator
 * can't charge more than its maximum rate schedule filed with the MTO, so
 * these prices must stay at or below that schedule. The page shows them as
 * estimates and the final price is confirmed by phone before dispatch.
 *
 * Keep this module free of imports: tests/rates.test.mjs loads it directly
 * with Node, and vite.config.ts reaches it through llms.ts.
 */

/** Prices on the site are shown before HST. */
export const PRICES_INCLUDE_HST = false;

export const TOW_RATES = {
	twoWheelDrive: { label: "Front- or rear-wheel drive (FWD / RWD)", shortLabel: "FWD / RWD", hookup: 150 },
	allWheelDrive: { label: "All-wheel drive (AWD)", shortLabel: "AWD", hookup: 200 },
} as const;

export type DriveType = keyof typeof TOW_RATES;

export const DRIVE_TYPES: readonly DriveType[] = ["twoWheelDrive", "allWheelDrive"];

/** Kilometres included in the hook-up fee. */
export const INCLUDED_KM = 10;
/** Charge for each kilometre after the included distance. */
export const PER_KM_RATE = 4.5;
/** Longer tows are quoted by phone rather than estimated. */
export const MAX_ESTIMATE_KM = 300;

/** Distances used for the worked-example table. */
export const EXAMPLE_TOW_DISTANCES_KM: readonly number[] = [10, 20, 30, 50, 80];

export interface RoadsideRate {
	readonly id: string;
	readonly name: string;
	readonly price: number;
	/** true → shown as "from $X" because the price can go up with distance. */
	readonly startingFrom: boolean;
	readonly note: string;
}

const OUTSIDE_BRAMPTON_NOTE = "In Brampton. Outside Brampton the price depends on distance.";

export const LOCKOUT_RATE: RoadsideRate = {
	id: "lockout",
	name: "Car lockout",
	price: 50,
	startingFrom: true,
	note: OUTSIDE_BRAMPTON_NOTE,
};

export const BOOST_RATE: RoadsideRate = {
	id: "boost",
	name: "Battery boost",
	price: 50,
	startingFrom: true,
	note: OUTSIDE_BRAMPTON_NOTE,
};

export const TIRE_CHANGE_RATE: RoadsideRate = {
	id: "tire-change",
	name: "Tire change",
	price: 70,
	startingFrom: false,
	note: "We put on your own spare. We don't repair or plug tires.",
};

export const ROADSIDE_RATES: readonly RoadsideRate[] = [LOCKOUT_RATE, BOOST_RATE, TIRE_CHANGE_RATE];

/**
 * Accident (collision) tows. The hook-up applies in Brampton. Insurance covers
 * the tow with collision and comprehensive coverage, or when the driver isn't
 * at fault (even with third-party liability only). An at-fault driver with
 * third-party liability only gets a separate quote.
 */
export const ACCIDENT_TOW_RATE = {
	id: "accident",
	name: "Accident tow",
	area: "Brampton",
	hookup: 995,
} as const;

export interface TowEstimate {
	readonly drive: DriveType;
	/** Tow distance rounded up to whole kilometres. */
	readonly km: number;
	readonly hookup: number;
	readonly extraKm: number;
	readonly distanceCharge: number;
	readonly total: number;
}

export type EstimateResult =
	| { readonly ok: true; readonly estimate: TowEstimate }
	| { readonly ok: false; readonly reason: "invalid" | "too-far" };

const roundCents = (amount: number): number => Math.round(amount * 100) / 100;

/** Narrows untrusted form input to a known drive type. */
export const isDriveType = (value: string): value is DriveType =>
	Object.prototype.hasOwnProperty.call(TOW_RATES, value);

/**
 * Estimated tow price before tax: the hook-up fee covers the first
 * INCLUDED_KM, then PER_KM_RATE for every started kilometre after that.
 */
export const estimateTow = (drive: DriveType, km: number): EstimateResult => {
	if (!Number.isFinite(km) || km <= 0) return { ok: false, reason: "invalid" };

	const wholeKm = Math.ceil(km);
	if (wholeKm > MAX_ESTIMATE_KM) return { ok: false, reason: "too-far" };

	const hookup = TOW_RATES[drive].hookup;
	const extraKm = Math.max(0, wholeKm - INCLUDED_KM);
	const distanceCharge = roundCents(extraKm * PER_KM_RATE);

	return {
		ok: true,
		estimate: { drive, km: wholeKm, hookup, extraKm, distanceCharge, total: roundCents(hookup + distanceCharge) },
	};
};

/** "$150", "$4.50", "$1,455": cents only when there are any. */
export const formatCad = (amount: number): string =>
	new Intl.NumberFormat("en-CA", {
		style: "currency",
		currency: "CAD",
		currencyDisplay: "narrowSymbol",
		minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
		maximumFractionDigits: 2,
	}).format(amount);

/** One-sentence answer to "how much does a tow cost", built from the rates above. */
export const towRateSummary = (): string =>
	`A standard tow costs ${formatCad(TOW_RATES.twoWheelDrive.hookup)} for the first ${INCLUDED_KM} km, ` +
	`then ${formatCad(PER_KM_RATE)} per km. ` +
	`All-wheel-drive vehicles start at ${formatCad(TOW_RATES.allWheelDrive.hookup)}.`;

export const TAX_NOTE = PRICES_INCLUDE_HST ? "Prices include HST." : "Prices are before HST.";

/** Shown with every price and coverage answer: nothing on the site is a final quote. */
export const ESTIMATE_DISCLAIMER =
	"This is an estimate, not a final price. Nothing is final until we confirm the price, and any insurance coverage, with you by phone.";
