// Unit tests for the tow cost estimator. Run with `npm test` (Node's built-in
// test runner; Node strips the TypeScript types from rates.ts on import).
import { test } from "node:test";
import assert from "node:assert/strict";

import {
	DRIVE_TYPES,
	EXAMPLE_TOW_DISTANCES_KM,
	MAX_ESTIMATE_KM,
	RATES_CONFIRMED_ON,
	RATES_YEAR,
	estimateTow,
	ratesConfirmedLabel,
	formatCad,
	isDriveType,
	towRateSummary,
} from "../src/content/rates.ts";

const totalOf = (drive, km) => {
	const result = estimateTow(drive, km);
	assert.equal(result.ok, true, `expected an estimate for ${drive} ${km} km`);
	return result.estimate.total;
};

test("within the included 10 km only the hook-up fee applies", () => {
	assert.equal(totalOf("twoWheelDrive", 10), 150);
	assert.equal(totalOf("twoWheelDrive", 1), 150);
	assert.equal(totalOf("allWheelDrive", 5), 200);
});

test("charges $4.50 per km after the included distance", () => {
	assert.equal(totalOf("twoWheelDrive", 20), 195);
	assert.equal(totalOf("twoWheelDrive", 50), 330);
	assert.equal(totalOf("allWheelDrive", 30), 290);
});

test("rounds a partial kilometre up to the next whole km", () => {
	const result = estimateTow("twoWheelDrive", 10.2);
	assert.equal(result.ok, true);
	assert.equal(result.estimate.km, 11);
	assert.equal(result.estimate.extraKm, 1);
	assert.equal(result.estimate.total, 154.5);
});

test("breaks the total into hook-up and distance charges", () => {
	const result = estimateTow("allWheelDrive", 25);
	assert.deepEqual(result, {
		ok: true,
		estimate: { drive: "allWheelDrive", km: 25, hookup: 200, extraKm: 15, distanceCharge: 67.5, total: 267.5 },
	});
});

test("rejects distances that are not a positive number", () => {
	for (const km of [0, -5, Number.NaN, Number.POSITIVE_INFINITY]) {
		assert.deepEqual(estimateTow("twoWheelDrive", km), { ok: false, reason: "invalid" }, String(km));
	}
});

test("sends long tows to a phone quote instead of estimating", () => {
	assert.equal(estimateTow("twoWheelDrive", MAX_ESTIMATE_KM).ok, true);
	assert.deepEqual(estimateTow("twoWheelDrive", MAX_ESTIMATE_KM + 1), { ok: false, reason: "too-far" });
});

test("every example distance on the page has a real estimate", () => {
	for (const drive of DRIVE_TYPES) {
		for (const km of EXAMPLE_TOW_DISTANCES_KM) {
			assert.equal(estimateTow(drive, km).ok, true, `${drive} ${km} km`);
		}
	}
});

test("only accepts known drive types from form input", () => {
	assert.equal(isDriveType("twoWheelDrive"), true);
	assert.equal(isDriveType("allWheelDrive"), true);
	assert.equal(isDriveType("fourWheelDrive"), false);
	assert.equal(isDriveType(""), false);
	assert.equal(isDriveType("toString"), false);
});

test("formats Canadian dollars without needless cents", () => {
	assert.equal(formatCad(150), "$150");
	assert.equal(formatCad(4.5), "$4.50");
	assert.equal(formatCad(154.5), "$154.50");
	assert.equal(formatCad(1455), "$1,455");
});

test("the confirmed date drives the year and the visible label", () => {
	assert.match(RATES_CONFIRMED_ON, /^\d{4}-\d{2}-\d{2}$/);
	assert.equal(RATES_YEAR, Number(RATES_CONFIRMED_ON.slice(0, 4)));
	assert.equal(ratesConfirmedLabel(), "November 2026");
});

test("summary sentence states the published rates", () => {
	assert.equal(
		towRateSummary(),
		"A standard tow costs $150 for the first 10 km, then $4.50 per km. All-wheel-drive vehicles start at $200.",
	);
});
