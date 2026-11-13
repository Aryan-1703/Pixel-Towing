/**
 * Page copy for /services/:serviceId.
 *
 * Unlike the other modules in this folder, this one imports images and icons,
 * so routes.ts and vite.config.ts must never import it. Business claims here
 * must match what the owner has confirmed (see src/SEO-UPDATE-NOTES.md): no
 * invented response times, prices, equipment or guarantees.
 */
import { KeyRound, Wrench, Zap, Truck, type LucideIcon } from "lucide-react";
import { IMAGES, type SiteImage } from "../assets/images";
import type { ServiceSlug } from "./services";

export interface ServiceSection {
	heading: string;
	paragraphs: readonly string[];
}

export interface ServiceCopy {
	/** H1, breadcrumb label and schema name — include the location. */
	title: string;
	metaTitle: string;
	metaDesc: string;
	tagline: string;
	image: SiteImage;
	icon: LucideIcon;
	/** Paragraphs; **text** renders bold and [text](/path) renders a link. */
	details: readonly string[];
	/** Optional deeper sections, each rendered under its own H2. */
	sections?: readonly ServiceSection[];
	/** Other names people search for this service; emitted as schema alternateName. */
	alternateNames?: readonly string[];
	features: readonly string[];
	faqs: readonly { question: string; answer: string }[];
}

const ONTARIO_BUY_SELL_VEHICLE = "https://www.ontario.ca/page/buy-or-sell-used-vehicle-ontario";

/** Matching service page on roadlift.ca. Scrap removal isn't offered in the app. */
export const ROADLIFT_SERVICES: Partial<Record<ServiceSlug, { path: string; task: string }>> = {
	lockout: { path: "/car-lockout", task: "a car lockout" },
	"tire-change": { path: "/flat-tire-assistance", task: "flat-tire help" },
	"jump-start": { path: "/battery-boost", task: "a battery boost" },
	"vehicle-transport": { path: "/towing", task: "a tow" },
};

const LOCKOUT: ServiceCopy = {
	title: "24/7 Car Lockout Service in Brampton",
	metaTitle: "Car Lockout Brampton | Locked Keys in Car 24/7 | Pixel Towing",
	metaDesc:
		"Locked out of your car in Brampton? 24/7 car lockout service — we unlock car doors and trunks when keys or a fob are locked inside. Call 647-673-9755.",
	tagline: "Locked your keys in the car? We'll come to you and get you back in — day or night.",
	image: IMAGES.carLockout,
	icon: KeyRound,
	alternateNames: [
		"Car lockout service",
		"Vehicle lockout service",
		"Car unlock service",
		"Locked keys in car",
		"Emergency car door unlocking",
	],
	details: [
		"Locked out of your car in Brampton, Mississauga or anywhere in Peel Region? Call us with your location and your vehicle's make, model and year, and we'll dispatch a technician to unlock your car — 24 hours a day, 7 days a week, including holidays.",
		"**Professional entry tools:** Our technicians use professional vehicle-entry tools — air wedges and long-reach tools — designed to minimize the risk of damage to paint, glass and weather stripping.",
		"**Most makes and models:** We open most passenger cars, SUVs, minivans and pickups. Some newer vehicles with advanced security systems may need dealer assistance; we'll tell you up front if that's the case.",
	],
	sections: [
		{
			heading: "Keys Locked in the Car, Trunk or Running Vehicle",
			paragraphs: [
				"Most lockout calls are simple: the keys are on the seat, in the ignition, or the car locked itself with the engine running. We also handle **keys locked in the trunk** — on many vehicles we can open the cabin and use the interior trunk release or fold-down seats.",
				"If the engine is running, tell dispatch. A running car with locked doors can't be left unattended for long, and we'll treat it as a priority.",
				"Before you call, our guide to [what to do when your keys are locked in the car](/blog/locked-keys-in-car-what-to-do) covers what to check first and when to call 911 instead.",
			],
		},
		{
			heading: "Push-to-Start and Key Fob Locked Inside",
			paragraphs: [
				"Many push-to-start vehicles are designed not to lock with the fob inside, but it still happens — a weak fob battery, a fob in the trunk, or a second key left in the cabin. We can usually open the door so you can retrieve the fob. If the fob is dead, the car may still start with the fob held against the start button; check your owner's manual.",
			],
		},
		{
			heading: "Car Lockout Help Across Brampton and the GTA",
			paragraphs: [
				"We're based in Brampton and take lockout calls across the city — Bramalea, Springdale, Heart Lake, Mount Pleasant, Castlemore and downtown — plus Mississauga, Caledon, Georgetown, Etobicoke, Vaughan and nearby areas. Common call-outs include mall and plaza parking lots, condo and office garages, gas stations and driveways.",
				"Tell us whether you're in an underground garage and the posted height limit so we can plan access.",
			],
		},
		{
			heading: "Lost Your Keys? Locksmith or Tow",
			paragraphs: [
				"A lockout service opens the car when the key is inside it. If your key is **lost, broken or won't start the car**, you'll need a new key cut and programmed by a dealer or an automotive locksmith. We can tow your vehicle to the dealer or locksmith of your choice.",
			],
		},
	],
	features: [
		"24/7 dispatch, including nights and holidays",
		"Professional vehicle-entry tools",
		"Cars, SUVs, minivans and pickups",
		"Keys locked in trunk or running car",
		"Price quoted before dispatch",
		"Tow to a dealer if a key needs replacing",
	],
	faqs: [
		{
			question: "I locked my keys in my car — what should I do?",
			answer:
				"Stay with the vehicle in a safe, well-lit spot, check every door and the trunk, and look for a spare key nearby. If none of that works, call 647-673-9755 with your location and the make, model and year. If a child or pet is inside, call 911 first.",
		},
		{
			question: "How much does a car lockout cost in Brampton?",
			answer:
				"It depends on the time of day, your location and the vehicle. We quote the price over the phone before we dispatch, so you know the cost before the technician arrives. Many roadside assistance plans and some credit cards include lockout service — check yours.",
		},
		{
			question: "How long does it take to unlock a car?",
			answer:
				"Once our technician is on site, most vehicles are opened fairly quickly, though some models with extra security take longer. Arrival time varies by location, traffic, weather and current demand.",
		},
		{
			question: "Is there a child or pet locked inside the vehicle?",
			answer:
				"If a child or animal is locked inside — especially in heat or cold — call 911 first. Emergency services can respond faster and can force entry if needed. Then call us.",
		},
		{
			question: "Will unlocking the car damage it?",
			answer:
				"We use air wedges and coated long-reach tools that are designed to minimize the risk of damage. No method is entirely risk-free, so our technician will explain the approach before starting.",
		},
		{
			question: "Can you open luxury or European cars?",
			answer:
				"Usually, yes. Some models have security systems that can't be opened without the key or dealer equipment. Tell us the make, model and year when you call and we'll let you know.",
		},
		{
			question: "Can you make a new key if mine is lost?",
			answer:
				"No — we open vehicles when the keys are inside. If the key is lost, we can tow the vehicle to a dealership or locksmith of your choice.",
		},
		{
			question: "Do I need to prove the car is mine?",
			answer:
				"Yes. Once the door is open, our technician will ask to see the vehicle registration or ID that matches it. This protects you and every other driver from someone else unlocking your car.",
		},
	],
};

const TIRE_CHANGE: ServiceCopy = {
	title: "Roadside Flat Tire Change in Brampton",
	metaTitle: "Flat Tire Change Brampton | 24/7 Roadside Help | Pixel Towing",
	metaDesc:
		"Flat tire in Brampton or the GTA? We come to you, install your spare and check its pressure. No spare? We'll tow you to a tire shop. Call 647-673-9755.",
	tagline: "Don't wrestle with a jack beside traffic — we'll come to you.",
	image: IMAGES.flatTireChange,
	icon: Wrench,
	details: [
		"Changing a tire beside a busy road is dangerous. Our roadside tire change service comes to your location and fits your spare.",
		"We tighten the wheel nuts to the manufacturer's torque specification and check the spare's pressure before you drive off.",
		"No spare, or a damaged one? We can tow your vehicle to a tire shop of your choice.",
		"Outside Ontario's highway tow zones, you choose who tows your vehicle and where it goes — see [Ontario towing laws and your rights](/blog/ontario-towing-laws-driver-rights).",
	],
	sections: [
		{
			heading: "What to Do While You Wait",
			paragraphs: [
				"Get as far from traffic as you can. If the car can still roll slowly, a parking lot or a quiet side street is far safer than a road shoulder — driving a short distance on a flat may damage the wheel, but it's better than standing beside traffic.",
				"Turn on your hazard lights. On a highway shoulder, stay buckled in with the doors closed; if you're stopped in a live lane, call 911 first.",
				"When you call, tell dispatch which tire is flat, whether you have a spare, and whether your wheels have locking nuts. If they do, find the wheel-lock key — it's often in the glove box or with the spare.",
			],
		},
		{
			heading: "Full-Size Spare, Temporary Spare or No Spare?",
			paragraphs: [
				"Many cars carry a **temporary compact spare**. It has a lower speed limit and a shorter range than a regular tire; the limits are printed on its sidewall or in your owner's manual. Drive gently and go straight to a tire shop.",
				"A **full-size spare** can be driven normally, but have the flat repaired or replaced soon so you have a spare again.",
				"Some newer vehicles have **no spare at all** — just a sealant-and-inflator kit, or run-flat tires. We install the spare that's in your vehicle, so if there isn't one, we'll tow you to the tire shop of your choice.",
			],
		},
		{
			heading: "After the Spare Is On",
			paragraphs: [
				"Your tire-pressure warning light may stay on while the spare is fitted; that's normal for many vehicles. Have the tire shop check the spare's pressure again and re-check the wheel nuts when they fix the flat.",
				"Keep the damaged tire and the wheel-lock key together so the shop has everything it needs.",
			],
		},
	],
	features: [
		"Spare installed to torque specification",
		"Spare tire pressure check",
		"Tow to a tire shop if there's no spare",
		"24/7 dispatch",
	],
	faqs: [
		{
			question: "Do you repair or plug flat tires at the roadside?",
			answer:
				"No. We install the spare that's already in your vehicle so you can drive to a tire shop for the repair. If there's no usable spare, we can tow you to the tire shop of your choice.",
		},
		{
			question: "Do you supply a spare tire?",
			answer:
				"No, we install the spare that came with your vehicle. If you don't have one, we can tow you to a tire shop.",
		},
		{
			question: "Can you remove a locking or stuck wheel nut?",
			answer:
				"Bring out your wheel-lock key if you have one. We carry tools that free most stuck nuts; if one can't be removed safely, we'll tow the vehicle to a shop.",
		},
		{
			question: "I'm on a highway shoulder. What should I do?",
			answer:
				"If you can, drive slowly to the next exit or a safe lot. If you can't, pull as far right as possible, turn on your hazard lights and stay buckled in with the doors closed. Call 911 if you're in a live lane.",
		},
		{
			question: "How far can I drive on a temporary spare?",
			answer:
				"Only as far as you need to get the flat fixed. Temporary spares have a lower speed limit and a shorter range than regular tires — the limits are printed on the spare's sidewall and in your owner's manual.",
		},
		{
			question: "How much does a roadside tire change cost?",
			answer:
				"It depends on the time of day, your location and the vehicle. We quote the price before we dispatch, so you know the cost before we arrive.",
		},
	],
};

const JUMP_START: ServiceCopy = {
	title: "Battery Boost and Jump Start in Brampton",
	metaTitle: "Battery Boost Brampton | 24/7 Jump Start | Pixel Towing",
	metaDesc:
		"Dead battery in Brampton or Mississauga? 24/7 battery boost with a professional booster pack, plus a basic battery and charging check. Call 647-673-9755.",
	tagline: "Dead battery? We'll get you started and tell you what we found.",
	image: IMAGES.batteryBoost,
	icon: Zap,
	details: [
		"Modern vehicles are full of electronics. We use professional booster packs with built-in protection rather than cable-to-cable jumps from another running car.",
		"After the boost we run a **basic battery and charging-system check**, so you know whether the battery, the alternator or something else is the likely problem.",
		"If the car still won't start, we can tow it to a mechanic of your choice. Not sure whether it's the battery or the alternator? Read [dead battery vs bad alternator: how to tell the difference](/blog/dead-battery-vs-bad-alternator).",
	],
	sections: [
		{
			heading: "Is It the Battery?",
			paragraphs: [
				"Typical signs of a flat battery: a clicking sound when you turn the key or press start, an engine that cranks slowly, dim or flickering dashboard lights, or no power at all.",
				"If the engine cranks at normal speed but won't fire, the battery probably isn't the problem — a boost won't help, and a tow to a mechanic is usually the next step. Tell dispatch what you're seeing and we'll suggest the right service.",
			],
		},
		{
			heading: "Why Batteries Die in Brampton Winters",
			paragraphs: [
				"Cold weather reduces how much power a battery can deliver at the same time as it makes the engine harder to turn over, so a battery that was weak in the fall often fails on the first cold morning.",
				"Short trips make it worse: the alternator doesn't get enough time to recharge what starting the car used. Lights, a dash camera or a phone charger left on overnight can also drain a healthy battery.",
			],
		},
		{
			heading: "After the Boost",
			paragraphs: [
				"Drive the car for a while rather than switching it off after a few minutes, so the alternator can recharge the battery. If it goes flat again within a day or two, have the battery and charging system tested by a mechanic or parts store.",
				"Never try to boost a battery that is cracked, leaking, bulging or frozen. Don't attempt it yourself — tell dispatch what you see.",
			],
		},
	],
	features: [
		"Professional booster packs",
		"Basic battery and charging check",
		"12V battery boosts for hybrids and EVs",
		"Tow to a mechanic if a boost isn't enough",
	],
	faqs: [
		{
			question: "Can boosting damage my car's electronics?",
			answer:
				"Any boost carries some risk. Using a booster pack with built-in protection, connected correctly, keeps that risk low — that's why we don't do cable jumps from another running car.",
		},
		{
			question: "Can you boost a hybrid or electric vehicle?",
			answer:
				"We boost the 12-volt auxiliary battery that hybrids and EVs use to power up. We never connect to the high-voltage drive battery.",
		},
		{
			question: "What if the car still won't start after a boost?",
			answer:
				"It may be the starter, the alternator or another electrical fault. We can tow the vehicle to a mechanic of your choice.",
		},
		{
			question: "Do I need a new battery?",
			answer:
				"Not necessarily — a battery can go flat because something was left on. If it needs boosting again soon, or our basic check shows it isn't holding a charge, have it tested and replaced by a mechanic or parts store.",
		},
		{
			question: "How much does a battery boost cost?",
			answer:
				"It depends on the time of day, your location and the vehicle. We quote the price before we dispatch. Many roadside assistance plans include boosts — check yours.",
		},
	],
};

const FLATBED: ServiceCopy = {
	title: "Flatbed and Breakdown Towing in Brampton",
	metaTitle: "Flatbed Towing Brampton | AWD & Long Distance | Pixel Towing",
	metaDesc:
		"Flatbed towing in Brampton for AWD, 4WD, luxury, low-clearance vehicles and motorcycles, plus long-distance towing across Ontario. Call 647-673-9755.",
	tagline: "The right truck for the vehicle — flatbed or wheel-lift.",
	image: IMAGES.flatbedTowing,
	icon: Truck,
	details: [
		"Flatbed towing keeps all four wheels off the ground and is commonly preferred for AWD and many 4WD vehicles. We'll ask about your drivetrain when you call and send the appropriate truck.",
		"We tow sedans, SUVs, pickups, low-clearance cars and motorcycles, and we take **local tows around Brampton and Mississauga** as well as **long-distance tows across Ontario**.",
		"We quote the price before we dispatch, so you know the cost before the truck arrives.",
		"Outside Ontario's highway tow zones, you choose who tows your vehicle and where it goes — see [your rights when getting a tow in Ontario](/blog/ontario-towing-laws-driver-rights).",
	],
	sections: [
		{
			heading: "When Is a Flatbed the Right Choice?",
			paragraphs: [
				"A flatbed carries the whole vehicle, so no wheel turns and nothing drags. It's the usual choice for:",
				"**AWD and 4WD vehicles**, where towing with some wheels on the road can strain the drivetrain. **Electric and hybrid vehicles** — many manufacturers advise against towing them with the drive wheels on the ground; check your owner's manual. **Lowered, sports and luxury cars**, where low bumpers and spoilers need careful loading. **Motorcycles**, secured with wheel chocks and tie-downs. **Accident-damaged vehicles** with a broken wheel, axle or suspension that can't roll safely.",
			],
		},
		{
			heading: "Flatbed or Wheel-Lift?",
			paragraphs: [
				"A wheel-lift truck lifts one end of the vehicle and tows it on the other two wheels. For many front-wheel-drive cars that's a perfectly good tow, and a wheel-lift can reach cars in tight spots where a flatbed can't easily load.",
				"We run both. Tell dispatch the make, model and drivetrain, and where the car is parked, and we'll send the truck that suits it.",
			],
		},
		{
			heading: "Long-Distance Towing Across Ontario",
			paragraphs: [
				"We tow from Brampton to Toronto, Guelph, Hamilton, London, Ottawa and other Ontario destinations. Call with the pickup address, the destination and the vehicle, and we'll quote before we book.",
				"Confirm the destination's hours before the tow — a dealer or body shop that's closed when the truck arrives can mean a second trip. If no one will be there to receive the car, tell dispatch where the keys should go.",
			],
		},
		{
			heading: "Before the Truck Arrives",
			paragraphs: [
				"Take your valuables, garage remote and any documents you'll need out of the vehicle, and photograph it from all sides so you have a record of its condition.",
				"Tell dispatch if the car won't steer, brake or roll, if it's in an underground garage (and the posted height limit), or if it has a low front bumper. Have the key ready — we may need to put the car in neutral.",
			],
		},
	],
	features: [
		"Flatbed and wheel-lift trucks",
		"Long-distance towing across Ontario",
		"Motorcycles and low-clearance cars",
		"Price quoted before dispatch",
	],
	faqs: [
		{
			question: "Why do AWD vehicles usually need a flatbed?",
			answer:
				"Towing an all-wheel-drive vehicle with some wheels on the road can strain the drivetrain. Flatbed towing keeps all four wheels off the ground, which is why it's commonly preferred for AWD and many 4WD vehicles. Check your owner's manual for your vehicle's towing guidance.",
		},
		{
			question: "Can you tow long distance across Ontario?",
			answer:
				"Yes — from Brampton to Toronto, Guelph, Hamilton, London, Ottawa and beyond. Call with your pickup and destination for a quote.",
		},
		{
			question: "Does an electric vehicle need a flatbed?",
			answer:
				"Usually, yes. Many EV manufacturers say not to tow the car with its drive wheels on the ground. Tell us the make and model when you call and check your owner's manual for its towing instructions.",
		},
		{
			question: "Can I ride in the tow truck?",
			answer: "Usually, yes, subject to available seating. Ask when you book.",
		},
		{
			question: "Do you transport motorcycles?",
			answer: "Yes, on a flatbed with wheel chocks and tie-downs.",
		},
		{
			question: "How much does flatbed towing cost?",
			answer:
				"It depends on the distance, the vehicle and the time of day. We quote the price before we dispatch, and before any work starts you're entitled to see the operator's maximum rate schedule under Ontario's towing rules.",
		},
	],
};

const SCRAP: ServiceCopy = {
	title: "Scrap Car Removal in Brampton",
	metaTitle: "Scrap Car Removal Brampton | Free Towing | Pixel Towing",
	metaDesc:
		"Scrap car removal in Brampton — free towing, an upfront cash offer based on your vehicle, and help with the ownership paperwork. Call 647-673-9755.",
	tagline: "An upfront offer, free towing, and help with the paperwork.",
	image: IMAGES.scrapCarRemoval,
	icon: Truck,
	details: [
		"Have a vehicle you no longer need? Pixel Towing makes a cash offer and tows it away at no charge.",
		"**How offers work:** Offers are based on the vehicle's make, model, condition and current scrap metal prices. You'll get the number before we book the pickup, and towing is not deducted from it.",
		"We take most vehicles regardless of condition — non-runners, accident damage, missing wheels or high mileage.",
		"If your insurer has declared the car a total loss, our [total loss guide](/blog/total-loss-vehicle-ontario-guide) explains your options, including whether you can keep the vehicle.",
	],
	sections: [
		{
			heading: "How Scrap Car Removal Works",
			paragraphs: [
				"**1. Call with the details.** Give us the make, model, year, condition and where the car is parked — including whether it rolls and whether all the wheels are on.",
				"**2. Get the offer.** We give you a number before anything is booked, with no obligation.",
				"**3. Book the pickup.** We confirm a time and tow the car away at no charge.",
				"**4. Sign it over.** At pickup you sign the ownership over and the car leaves with us.",
			],
		},
		{
			heading: "Paperwork for Scrapping a Car in Ontario",
			paragraphs: [
				"**Remove your licence plates.** In Ontario, plates stay with the owner, not the vehicle. Keep them for your next car or return them to a ServiceOntario centre.",
				"**Sign the vehicle portion of the ownership (permit) over and keep the plate portion.** Bring photo ID. If the ownership is lost, tell dispatch before pickup and we'll explain the options. See [Ontario: buy or sell a used vehicle](" +
					ONTARIO_BUY_SELL_VEHICLE +
					").",
				"**Cancel or move your insurance** once the car has been picked up — call your insurer or broker.",
				"**Empty the car.** Check the glove box, trunk and under the seats, and take out any toll transponder, garage remote and child seats.",
			],
		},
		{
			heading: "Written Off by Your Insurer?",
			paragraphs: [
				"If your insurer settles the claim and keeps the car, it usually arranges the removal itself. If you keep a vehicle branded **Irreparable**, Ontario only allows it to be used for parts or scrap, and we can take it away. Our [total loss guide](/blog/total-loss-vehicle-ontario-guide) explains the branding rules.",
			],
		},
	],
	features: [
		"Upfront offer before pickup",
		"Free towing",
		"Most vehicles in any condition",
		"Help with ownership transfer",
	],
	faqs: [
		{
			question: "How much will you pay for my car?",
			answer:
				"It depends on the vehicle and current metal prices. Call with the make, model, year and condition and we'll give you an offer with no obligation.",
		},
		{
			question: "Do I pay for the tow?",
			answer: "No. Removal is free and isn't deducted from your offer.",
		},
		{
			question: "What documents do I need?",
			answer:
				"The vehicle ownership (permit) and photo ID. If the ownership is lost, tell our dispatcher and we'll explain the options before pickup.",
		},
		{
			question: "What happens to my licence plates?",
			answer:
				"They stay with you. Ontario plates belong to the owner, not the vehicle, so take them off before pickup and keep them for your next car or return them to ServiceOntario.",
		},
		{
			question: "How quickly can you pick it up?",
			answer:
				"Often the same or next day in Brampton, Mississauga and Caledon, depending on demand. We'll confirm a time when you book.",
		},
	],
};

export const SERVICE_COPY: Record<ServiceSlug, ServiceCopy> = {
	lockout: LOCKOUT,
	"tire-change": TIRE_CHANGE,
	"jump-start": JUMP_START,
	"vehicle-transport": FLATBED,
	"scrap-car-removal": SCRAP,
};
