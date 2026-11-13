/**
 * Blog articles. Pure data so routes.ts can build the sitemap from it; the
 * featured image for each slug lives in blogImages.ts.
 *
 * Legal and insurance statements must link to the official source and keep
 * three things separate: towing rights (TSSEA), insurance/repair choices
 * (policy wording + FSRA), and collision reporting (HTA + local police).
 * Only change dateModified when the article content actually changes.
 */

export interface BlogPost {
	slug: string;
	title: string;
	metaTitle: string;
	excerpt: string;
	category: string;
	categoryColor: string;
	datePublished: string;
	dateModified?: string;
	reviewedNote?: string;
	content: string;
}

const SOURCES = {
	ontarioTowRights: "https://www.ontario.ca/page/know-your-rights-when-getting-tow",
	ontarioTowRequirements: "https://www.ontario.ca/page/towing-and-vehicle-storage-requirements",
	ontarioTowCertificate: "https://www.ontario.ca/page/get-towing-vehicle-storage-certificate",
	ontarioTowZones: "https://www.ontario.ca/page/tow-zone-pilot-program",
	mtoOperatorLookup: "https://www.clientinformation.mto.gov.on.ca",
	peelCollisionReporting:
		"https://www.peelpolice.ca/reporting-records/report-a-crime-or-incident/collision-reporting/",
	fsraClaims:
		"https://www.fsrao.ca/consumers/auto-insurance/protect-yourself/after-accident-understanding-claims-process",
	/** FSRA's printable claims booklet (carries over FSCO-era wording). */
	fsraClaimsBooklet: "https://www.fsrao.ca/media/7386/download",
	/** Archived tip sheet first published by FSCO, FSRA's predecessor, in 2017. */
	fscoTowScams: "https://www.fsrao.ca/media/7511/download",
	fsraOpcf43: "https://www.fsrao.ca/opcf-43-removing-depreciation-deduction",
	/** O. Reg. 56/25 raised the minor-accident limit in Reg. 664 from $2,000 to $5,000. */
	minorAccidentRegulation: "https://www.ontario.ca/laws/regulation/r25056",
	vehicleBranding: "https://www.ontario.ca/page/mandatory-vehicle-branding-program",
	compulsoryInsuranceAct: "https://www.ontario.ca/laws/statute/90c25",
	towOperatorRegulation: "https://www.ontario.ca/laws/regulation/r23167",
} as const;

const REVIEWED_2026_09 = "Reviewed September 2026 against current Ontario government, FSRA and Peel Regional Police guidance.";
const REVIEWED_2026_11 = "Reviewed November 2026 against current Ontario government and FSRA guidance.";
const REVIEWED_2026_11_PEEL =
	"Reviewed November 2026 against current Ontario government, FSRA and Peel Regional Police guidance.";

export const BLOG_POSTS = [
	{
		slug: "what-to-do-after-car-accident-brampton",
		title: "What To Do After a Car Accident in Brampton: Safety, Reporting, Towing and Insurance",
		metaTitle: "What To Do After a Car Accident in Brampton | Pixel Towing",
		excerpt:
			"What to do in the first hour after a Brampton collision: staying safe, reporting it, who tows your car, and your insurance claim.",
		category: "Know Your Rights",
		categoryColor: "warning",
		datePublished: "2025-01-15",
		dateModified: "2026-11-13",
		reviewedNote: REVIEWED_2026_11_PEEL,
		content: `
## The First Few Minutes

### Step 1: Check for Injuries

Check yourself and your passengers first. If anyone is hurt, call 911 immediately. Do not move an injured person unless they are in immediate danger.

### Step 2: Move to Safety

If no one is injured and the vehicles can be driven, Ontario generally expects you to move them out of traffic. Turn on your hazard lights. On a highway, stay buckled in with the doors closed if you can't get completely off the road.

### Step 3: Document the Scene

- Photograph every vehicle, every damaged area and the road positions
- Exchange driver's licence, ownership and insurance details with the other driver
- Note the cross-street or highway kilometre marker
- Get contact details from any witnesses

## When Do You Have to Report the Collision?

The legal requirement and the local procedure are two different things.

### Ontario's legal requirement

**Report to police if anyone is injured, if combined damage is more than $5,000, or if there is damage to highway property.** That's Ontario's Highway Traffic Act rule. The damage threshold rose from $2,000 to $5,000 on January 1, 2025, so older guides — and a few older police pages — still show $2,000.

### Peel Regional Police procedure

In Brampton and Mississauga, Peel Regional Police currently direct drivers as follows:

- **Call 911** if anyone needs to go to hospital, or there is any sign of criminality — and in other situations Peel lists, such as a suspected impaired or unlicensed driver, an uninsured vehicle, a hit-and-run, hazardous goods, or a major traffic blockage
- **Combined damage over $5,000 and no injuries:** report it at a Collision Reporting Centre and bring your driver's licence, ownership and insurance. The driver has to attend with the vehicle. If the vehicle can be driven, Peel allows 48 hours to report
- **Very minor damage ($5,000 or less, no injuries):** a police report isn't required. Peel's guidance is to contact your insurance company about your options

At the centre, staff photograph the damage and give you an incident number — your insurer will ask for it. Peel lists its Collision Reporting Centre locations and hours on its [collision reporting page](${SOURCES.peelCollisionReporting}). Check it before you go: centre locations, hours and procedures can change. If your vehicle can't be driven, a tow operator can take it to the centre for you.

## Who Decides Which Tow Truck Takes Your Car?

**Outside Ontario's restricted highway tow zones, you do — unless police or another authorized official order the tow.** Towing is governed by Ontario's Towing and Storage Safety and Enforcement Act, 2021 (TSSEA): you choose which company tows your vehicle and where it goes, and an operator needs your consent before towing. When asking for consent they must disclose their maximum rate schedule. See [Ontario: know your rights when getting a tow](${SOURCES.ontarioTowRights}) and our guide to [Ontario towing laws and your rights](/blog/ontario-towing-laws-driver-rights).

**On some GTA highways the rules are different.** Sections of Highways 400, 401, 403, 404, 409, 410 and 427 and the QEW are in Ontario's [Tow Zone Program](${SOURCES.ontarioTowZones}). In those zones only the ministry's contracted operator can tow you off the highway. Once your vehicle is outside the zone you can choose the next tow company and destination, unless police direct otherwise.

Tow trucks that arrive uninvited are not entitled to your car. Outside a tow zone you can say clearly: "I've already arranged my own tow."

## Your Insurance Claim

**Repairs and rentals are an insurance matter, separate from towing.** FSRA, Ontario's insurance regulator, states that as long as your insurance company approves the estimate, you may have your vehicle repaired at the shop of your choice, and that you have the right to choose a repair shop, tow operator or vehicle rental company. See [FSRA: after an accident — understanding the claims process](${SOURCES.fsraClaims}) and FSRA's [claims booklet](${SOURCES.fsraClaimsBooklet}).

What your insurer pays for — towing, storage, repairs, a rental — depends on your policy and the circumstances of the claim. Read your policy or ask your insurer or broker before you assume something is covered. Our guide to [what car insurance covers for towing in Ontario](/blog/car-insurance-towing-coverage-ontario) breaks this into four separate questions.

## Where Pixel Towing Fits In

If you call us for [accident towing in Brampton](/accident-recovery), we can tow your vehicle (outside the tow zones), take it to a Collision Reporting Centre if it can't be driven there, and deliver it to the repair shop you choose. We also offer collision repair and rental vehicles through businesses we have an interest in — we tell you that up front, and you are free to use any shop or rental company you prefer.

---

This article is general information, not legal or insurance advice.

**After a collision in Brampton or the GTA? Call 647-673-9755 for 24/7 dispatch.**
    `,
	},
	{
		slug: "ontario-towing-laws-driver-rights",
		title: "Ontario Towing Laws: Your Rights Under the TSSEA",
		metaTitle: "Ontario Towing Laws & Your Rights (TSSEA) | Pixel Towing",
		excerpt:
			"Ontario's TSSEA sets the rules every tow operator must follow — consent, maximum rates, invoices, payment and disclosure. Here's what they mean.",
		category: "Ontario Law",
		categoryColor: "primary",
		datePublished: "2025-02-03",
		dateModified: "2026-11-13",
		reviewedNote: REVIEWED_2026_11,
		content: `
## The Law That Governs Towing in Ontario

Towing in Ontario is governed by the **Towing and Storage Safety and Enforcement Act, 2021 (TSSEA)**. It was introduced through Bill 282, the Moving Ontarians More Safely Act, 2021, and its customer protections took effect on January 1, 2024.

The TSSEA and its regulations set out certificate requirements, operator obligations and customer protections that apply to tow and vehicle storage operators across the province.

### Certificates Are Mandatory

You need a certificate from the province to provide towing or vehicle storage services in Ontario. There are three types: a **tow operator certificate**, a **tow truck driver certificate** and a **vehicle storage operator certificate**.

Tow operators must display their legal name, operating name, email address, telephone number and a copy of their certificate in any premises open to the public and on any website or social media they maintain. You can also look up an operator and its maximum rates on the [Ministry of Transportation's operator lookup](${SOURCES.mtoOperatorLookup}).

### Your Right to Choose — and the Tow Zone Exception

Outside the restricted highway tow zones, you have the right to:
- Choose which company tows your vehicle
- Choose where the vehicle is taken
- Give — or refuse — written consent before the tow

**Police-ordered tows are different.** Ontario's consent rule applies unless police or another authorized official initiate the tow — for example, if your car is parked illegally. See [Ontario: know your rights when getting a tow](${SOURCES.ontarioTowRights}).

**Restricted tow zones are the other exception.** Sections of Highways 400, 401, 403, 404, 409, 410 and 427 and the QEW are in Ontario's [Tow Zone Program](${SOURCES.ontarioTowZones}), where only the ministry's contracted operator can tow vehicles off the highway. Once your vehicle is outside the zone, you can choose the next tow company and destination unless police direct otherwise.

### Rates, Invoices and Payment

Tow operators submit their maximum rates to the Ministry of Transportation and must make them available to customers. Under the province's rules:
- The operator must disclose its maximum rate schedule before providing services
- The operator cannot charge more than its published maximum rates
- You are entitled to an itemized invoice before you pay
- You can choose how to pay, including by credit card, debit card or cash

### Disclosure of Interest

An operator cannot refer you to a repair shop, storage facility or other business without telling you whether they have an interest in it. Ask directly: "Do you have an interest in the shop you're recommending?"

### Red Flags

- A tow truck that arrives before police and you didn't call (outside a tow zone)
- A driver who won't say where your car is going
- Refusing card payment or demanding cash only
- Pressure to sign quickly, or to sign a blank or incomplete form
- No certificate number on the truck

For the tactics chaser trucks use at collision scenes, see [how to avoid predatory tow trucks in the GTA](/blog/how-to-avoid-predatory-towing-gta).

### How to Protect Yourself

1. **Save a tow company's number** before you need one
2. **Ask for the maximum rate schedule** before the tow begins
3. **Never sign a blank or unread form**
4. **Ask whether the operator has an interest** in the shop or storage yard they recommend
5. **Check the certificate** on the truck and on the operator's website

### Official Sources

Rules and procedures change. Check the current guidance directly:
- [Ontario: know your rights when getting a tow](${SOURCES.ontarioTowRights})
- [Ontario: towing and vehicle storage requirements](${SOURCES.ontarioTowRequirements})
- [Ontario: get a towing or vehicle storage certificate](${SOURCES.ontarioTowCertificate})
- [Ontario: Tow Zone Program](${SOURCES.ontarioTowZones})

This article is general information about Ontario's towing rules, not legal advice.

---

Questions about a tow? Call Pixel Towing at **647-673-9755**.
    `,
	},
	{
		slug: "dead-battery-vs-bad-alternator",
		title: "Dead Car Battery vs Bad Alternator: How to Tell the Difference",
		metaTitle: "Dead Battery vs Bad Alternator | Pixel Towing Brampton",
		excerpt:
			"Your car won't start — battery or alternator? Before buying a new battery, read this. A Brampton tow truck driver explains the symptoms of each.",
		category: "Car Tips",
		categoryColor: "success",
		datePublished: "2025-02-20",
		dateModified: "2026-09-30",
		content: `
## Dead Battery vs Bad Alternator — How to Tell

When your car won't start or dies while driving, the two usual suspects are the **battery** and the **alternator**. Getting the diagnosis wrong means buying a new battery when you actually need an alternator, or the other way around.

### Signs of a Dead Battery

- The car cranks slowly or not at all, especially after sitting overnight
- Lights are dim before you try to start it
- The battery is three to five years old or more
- The car starts after a boost and then keeps running normally

**The test:** Boost the car. If it starts and keeps starting normally over the next few days, the battery is the likely cause.

### Signs of a Bad Alternator

- The car starts, then dies while driving
- Flickering lights, a radio cutting out or unusual dash warnings
- A burning smell from the belt or wiring
- The car starts after a boost but dies again within minutes
- The battery light comes on while driving, not just at start-up

**The test:** After a boost, if the car dies again shortly after, the alternator (or the charging system) is the likely cause.

### The Chicken-and-Egg Problem

A failing alternator can wear out a healthy battery over a few weeks, and a deeply drained battery can make a good alternator look faulty. If you've had repeated battery problems in the past year, have the charging system tested before replacing the battery again.

### When to Call for a Boost vs a Tow

- **Car was fine yesterday and won't start today:** a [battery boost](/services/jump-start) is usually the first step
- **Car won't start soon after a new battery:** likely the charging system — a tow to a mechanic makes sense
- **Car died while driving:** likely the alternator or another electrical fault — call for a tow

---

**Need a battery boost in Brampton, Mississauga or the GTA? Fast 24/7 dispatch — call 647-673-9755.**
    `,
	},
	{
		slug: "how-to-avoid-predatory-towing-gta",
		title: "How to Avoid Predatory Tow Trucks in the GTA",
		metaTitle: "How to Avoid Predatory Tow Trucks in the GTA | Pixel Towing",
		excerpt:
			"How predatory towing works in the GTA, what to say when a tow truck shows up uninvited, and the Ontario rules that protect you.",
		category: "Consumer Protection",
		categoryColor: "danger",
		datePublished: "2025-03-01",
		dateModified: "2026-09-30",
		reviewedNote: REVIEWED_2026_09,
		content: `
## How Predatory Towing Works — And How to Protect Yourself

Predatory towing has been a long-running problem in the Greater Toronto Area. Ontario's Towing and Storage Safety and Enforcement Act, 2021 (TSSEA) and the provincial Tow Zone Program were both introduced in response to it.

### How "Chaser" Tow Trucks Operate

Chaser trucks listen for collisions and race to the scene, sometimes before police. The goal is to get your signature on an authorization form before you've had time to think or call anyone else. The real money is often in storage: once the car is in their yard, daily fees add up.

### Pressure Tactics to Watch For

- "You need to decide now — your car is a hazard"
- "Police said you have to use us"
- "Insurance is paying, so it doesn't matter"
- Hooking up your car before asking
- A low tow price that hides large storage fees

### What to Say

Outside a restricted tow zone, say calmly and clearly: **"I did not call you. I've arranged my own tow. Please don't touch my vehicle."** An operator needs your consent before towing your car.

**On tow-zone highways it is different.** Sections of Highways 400, 401, 403, 404, 409, 410 and 427 and the QEW are in Ontario's [Tow Zone Program](${SOURCES.ontarioTowZones}). There, only the ministry's contracted operator can tow you off the highway — a different truck offering to tow you in a zone is a red flag.

### Your Rights Under the TSSEA

- The operator must disclose its maximum rate schedule before providing services
- You are entitled to an itemized invoice before you pay
- You can pay by credit card, debit card or cash
- The operator must tell you if it has an interest in the shop or yard it refers you to

See [Ontario: know your rights when getting a tow](${SOURCES.ontarioTowRights}) and our plain-language guide to [Ontario towing laws and your rights](/blog/ontario-towing-laws-driver-rights).

### Steps to Take Now, Before You Need a Tow

1. **Save a tow company's number** in your phone
2. **Know your roadside assistance number** if your policy or a membership includes one
3. **Don't sign anything at the scene** that you haven't read in full
4. **Know the steps after a collision** — our [after-accident guide for Brampton drivers](/blog/what-to-do-after-car-accident-brampton) covers safety, reporting and towing

### If You Think You Were Treated Unfairly

- Look up the operator and its maximum rates on the [Ministry of Transportation's operator lookup](${SOURCES.mtoOperatorLookup}), and use the complaint options on [Ontario's tow rights page](${SOURCES.ontarioTowRights})
- If you believe a crime was committed, contact police

This article is general information, not legal advice.

---

Pixel Towing doesn't chase collisions. Call us at **647-673-9755** when you need a tow.
    `,
	},
	{
		slug: "car-insurance-towing-coverage-ontario",
		title: "Does Car Insurance Cover Towing in Ontario? (And Do You Have to Use Their Shop?)",
		metaTitle: "Does Car Insurance Cover Towing in Ontario? | Pixel Towing",
		excerpt:
			"Does insurance cover towing after an accident in Ontario? What's covered, what isn't, whether a tow raises your premium, and the choices that stay yours.",
		category: "Insurance",
		categoryColor: "info",
		datePublished: "2025-03-10",
		dateModified: "2026-11-13",
		reviewedNote: REVIEWED_2026_11,
		content: `
## Does Insurance Cover Towing After an Accident?

**Not automatically.** In Ontario, damage to your car after a collision is claimed through your own insurer — under Direct Compensation – Property Damage (DCPD) for the share you're not at fault, or Collision coverage if you carry it. Towing isn't on FSRA's list of what DCPD pays for, so ask your adjuster, in writing, whether the tow and any storage are covered.

- **If you're 100% at fault,** FSRA says DCPD won't cover your repairs; optional Collision coverage can, minus your deductible.
- **What DCPD lists:** FSRA's list is repairs or replacement of your vehicle, a temporary rental vehicle and damaged contents. Towing and storage aren't named, so get the answer from your adjuster before you assume.
- **Moving the car twice can cost you.** If your vehicle is moved from one shop to another, the first shop may still bill you for towing, storage and administrative fees — and your insurer may not cover them.

See [FSRA: after an accident — understanding the claims process](${SOURCES.fsraClaims}) and the archived [tow truck and storage scam tips](${SOURCES.fscoTowScams}) first published by FSCO, FSRA's predecessor.

## Does Insurance Cover Towing for a Breakdown?

**Usually not.** A mechanical breakdown isn't a collision claim. Breakdown towing is typically covered only if you have a roadside assistance add-on from your insurer or a separate roadside membership. Otherwise you pay the tow operator directly — and you're still entitled to its maximum rate schedule before the tow and an itemized invoice before you pay.

## Will Getting Towed Raise My Insurance?

**Paying for a tow on its own isn't an insurance claim.** What can change your premium is an accident claim in which you're found at fault:

- **Being found at fault goes on your record.** FSRA's current guidance: fault is assessed from 0 to 100 percent, any at-fault finding is recorded on your insurance record, and if you're found **50 percent or more at fault**, there's a good chance your premium will go up at your next renewal. How a smaller share of fault affects your rate depends on your insurer's rating rules — ask your insurer or broker. See [FSRA: after an accident — understanding the claims process](${SOURCES.fsraClaims}).
- **Minor accidents:** an insurer can't use a minor at-fault accident to set your premium if no one was injured, no insurer paid anything, and the damage to each vehicle and any other property was **$5,000 or less** and paid by the at-fault driver. It applies to one minor accident every three years. The limit was $2,000 until [O. Reg. 56/25](${SOURCES.minorAccidentRegulation}) raised it, so ask your insurer which limit applies to your accident date.

## Car Towed and You Can't Pay — Do You Still Need Insurance?

Ontario's [Compulsory Automobile Insurance Act](${SOURCES.compulsoryInsuranceAct}) requires a vehicle to be insured when it's operated on a highway. Whether to keep, reduce or pause coverage while a car sits in a storage yard is a decision to make with your insurer or broker, because:

- Comprehensive coverage is what protects a parked or stored car against theft, fire and vandalism
- A car loan or lease may require you to keep the vehicle insured — check your agreement
- The car has to be insured again before anyone drives it

Don't let the car sit while you decide. Daily storage fees keep adding up, and FSRA warns that the business holding your vehicle may be able to sell it to recover unpaid fees under Ontario's Repair and Storage Liens Act. Before you pay, you're entitled to an itemized invoice, and you can pay by credit card, debit card or cash — see [Ontario: know your rights when getting a tow](${SOURCES.ontarioTowRights}). If the tow followed a collision, call your insurer now and ask whether towing and storage are part of the claim.

### Who insures the car while it's being towed?

Certified tow operators must carry their own insurance. Ontario requires at least $100,000 of coverage for damage to a vehicle while it's in the operator's care, custody or control. See [O. Reg. 167/23 under the TSSEA](${SOURCES.towOperatorRegulation}).

## Four Separate Questions After a Collision

These often get mixed together. They are governed by different rules.

### 1. Who tows the car — towing rights

Ontario's Towing and Storage Safety and Enforcement Act, 2021 (TSSEA) lets you choose your tow company and destination. There are two exceptions: highway sections inside the province's [Tow Zone Program](${SOURCES.ontarioTowZones}), and tows ordered by police or another authorized official — for example, when a car is blocking traffic or parked illegally. See [Ontario: know your rights when getting a tow](${SOURCES.ontarioTowRights}).

### 2. Where it's repaired — repair-shop choice

FSRA, Ontario's insurance regulator, states that as long as your insurance company approves the estimate, you may have your vehicle repaired at the shop of your choice. Your insurer may suggest a preferred shop; that is a suggestion. See FSRA's [claims booklet](${SOURCES.fsraClaimsBooklet}) and its [claims process page](${SOURCES.fsraClaims}).

Insurer-preferred shops are not bad shops. If you choose a different one, ask how the estimate will be approved and whether the shop deals with your insurer directly.

### 3. Whether you get a rental — rental coverage

A rental or replacement vehicle after a collision is usually optional coverage (often called transportation replacement coverage, or OPCF 20), with a daily and total limit set in your policy. If you're not at fault, your policy's Direct Compensation – Property Damage (DCPD) coverage may also be relevant — check whether your policy includes it. Who arranges the rental is your choice; what the insurer will pay for depends on your coverage. See [getting a rental car after an accident](/blog/collision-repair-rental-car-brampton) for the questions to ask first.

### 4. What you owe — your deductible and limits

Your deductible, coverage limits and any amounts the insurer declines are set by your policy and the claim decision. Ask your insurer before you authorize work. If a shop offers to cover your deductible, read [what to ask before you agree](/blog/deductible-waived-collision-repair-brampton).

## Using Your Coverage Without Giving Up Control

1. **Make sure everyone is safe** and report the collision if required
2. **Call your insurer** to open the claim and ask what your policy covers
3. **Arrange the tow** with the company you choose (outside a tow zone)
4. **Tell your insurer which repair shop you've chosen** and let them approve the estimate

Along with [accident towing](/accident-recovery), Pixel Towing offers collision repair and rental vehicles through businesses we have an interest in. We disclose that before any referral, and you are free to choose any other shop or rental company.

This article is general information, not insurance advice.

---

**Need a tow after a collision in Brampton or the GTA? Call 647-673-9755.**
    `,
	},

	{
		slug: "total-loss-vehicle-ontario-guide",
		title: "My Car Is a Total Loss in Ontario — What Happens Next?",
		metaTitle: "Total Loss Vehicle Ontario: What Happens Next | Pixel Towing",
		excerpt:
			"Car written off in Ontario? How the payout is calculated, whether your premium goes up, what happens to the car, and how to respond to a low offer.",
		category: "Total Loss",
		categoryColor: "danger",
		datePublished: "2025-03-15",
		dateModified: "2026-11-13",
		reviewedNote: REVIEWED_2026_11,
		content: `
## What Does "Total Loss" Mean?

When an insurer declares your vehicle a total loss (a write-off), it has decided that repairing it would cost more than the vehicle's actual cash value (ACV). FSRA's [claims booklet](${SOURCES.fsraClaimsBooklet}) puts it this way: your insurer will likely treat the vehicle as a total loss and offer a cash settlement if the necessary repairs would cost more than its actual cash value — and in most cases, buying a replacement is your responsibility.

A total loss doesn't necessarily mean the car is destroyed — it means the insurer pays the lower of the repair cost and the car's value, and here the value is lower.

## How Much Will Insurance Pay for a Totaled Car?

**Usually the vehicle's actual cash value at the time of the loss, minus any deductible that applies.** FSRA says actual cash value takes into account the vehicle's mileage, age, overall condition and average retail selling price. For example, a car with an actual cash value of $12,000 and a $500 deductible would pay out $11,500. FSRA also notes that you can expect to pay your full deductible unless the accident wasn't your fault or was only partly your fault — so if you weren't at fault, the deduction may be smaller or nothing.

Insurers typically estimate that value using:

- **Valuation tools and book values**
- **Comparable vehicles** for sale in your market
- **Age, mileage, options and condition**

Automated valuations can miss things — recent major repairs, new tires, a high trim level or documented maintenance. FSRA advises telling your adjuster about recent work that could increase the vehicle's value; they may ask for receipts. Routine repairs that only keep the car in good running order may not raise its value. See FSRA's [claims booklet](${SOURCES.fsraClaimsBooklet}).

### Bought the car new? Check for OPCF 43

The standard policy lets your insurer deduct depreciation when it settles. The optional [OPCF 43 endorsement](${SOURCES.fsraOpcf43}) removes that right if you're the original owner, the vehicle was new when you took delivery, and the loss happens within the period stated on your policy. Your deductible still applies. Check your certificate of insurance to see whether you have it.

## Will My Insurance Premium Go Up After a Total Loss?

**The write-off itself doesn't decide it — fault does.** A total loss is settled like any other claim. FSRA's current guidance: any at-fault finding is recorded on your insurance record, and if you're found **50 percent or more at fault**, there's a good chance your premium will go up at your next renewal. How a smaller share of fault affects your rate depends on your insurer's rating rules. See [FSRA: after an accident — understanding the claims process](${SOURCES.fsraClaims}).

Fault is decided under Ontario's Fault Determination Rules, not by how badly the car was damaged. If you think the fault decision is wrong, ask your adjuster to explain how it was reached and to review it. Our guide to [what car insurance covers after a collision](/blog/car-insurance-towing-coverage-ontario) covers how fault affects the rest of your claim.

## What If the Total-Loss Offer Is Too Low?

Your policy and your insurer's claims process govern how disputes are handled. In general, it helps to:

### 1. Gather evidence of pre-accident condition
Service records, receipts for recent work, photos taken before the collision and documentation of options or upgrades.

### 2. Find comparable vehicles
Look up listings for the same year, make, model and trim with similar mileage in your area.

### 3. Ask how the value was calculated
Ask the adjuster for the valuation report and the comparables used, and point out anything that doesn't match your vehicle.

### 4. Put your response in writing
Send your evidence and the value you believe is fair. Ask your insurer how its dispute or appraisal process works if you still disagree. FSRA's [claims guidance](${SOURCES.fsraClaims}) explains where to go if you can't resolve a dispute with your insurer.

## What Happens to My Car After a Write-Off?

If you accept the settlement, the insurer usually takes ownership of the vehicle. Some insurers allow you to keep it for a reduced settlement.

Either way, Ontario brands written-off vehicles under its [Mandatory Vehicle Branding Program](${SOURCES.vehicleBranding}). Only vehicles branded "None" or "Rebuilt" can be driven on Ontario roads:

- **Irreparable:** written off as a total loss; it can only be used for parts or scrap and can't be driven again in Ontario
- **Salvage:** written off, but it can be repaired or used for parts or scrap. A repaired Salvage vehicle must pass a structural inspection at a registered DriveON Vehicle Inspection Centre to be re-branded **Rebuilt**

The registered owner has 90 days to appeal a Salvage or Irreparable brand — Ontario says that window is set by the Highway Traffic Act and can't be extended. A vehicle you keep that's branded Irreparable can only go for parts or scrap — our [scrap car removal](/services/scrap-car-removal) includes free towing.

Rental coverage, if you have it, usually has limits on how long it continues after a total-loss decision. Ask your insurer when your rental coverage ends — our [rental car guide](/blog/collision-repair-rental-car-brampton) lists what to check. Once the claim is settled, call your insurer or broker to take the vehicle off your policy or move the coverage to its replacement.

## Who Pays Storage While the Claim Is Decided?

If the vehicle is sitting in a storage yard, daily storage fees may apply while the claim is decided. Ask your adjuster who is paying storage and whether the vehicle should be moved. If a vehicle is moved from one shop to another, the first may still bill towing, storage and administrative fees that your insurer may not cover — so agree on the move with your adjuster first. If it does need moving, a [flatbed tow](/services/vehicle-transport) can take it to wherever you choose.

This article is general information, not legal or insurance advice.

---

**Need a vehicle moved from a scene or storage yard in Brampton or the GTA? Call 647-673-9755.**
    `,
	},

	{
		slug: "oem-vs-aftermarket-parts-collision-repair",
		title: "OEM vs Aftermarket Parts for Collision Repair — What's the Difference?",
		metaTitle: "OEM vs Aftermarket Parts for Collision Repair | Pixel Towing",
		excerpt:
			"OEM vs aftermarket parts — the practical differences in fit, safety and resale value, and the questions to ask before you authorize a collision repair.",
		category: "Repair Knowledge",
		categoryColor: "primary",
		datePublished: "2025-03-20",
		dateModified: "2026-11-11",
		content: `
## What Are OEM Parts?

OEM stands for Original Equipment Manufacturer. OEM parts are made by, or for, your vehicle's manufacturer — the same parts the car was built with.

## What Are Aftermarket Parts?

Aftermarket parts are made by other companies to fit a range of vehicles. Quality varies by manufacturer: some are close to OEM, others are not. Recycled (used OEM) parts are a third option.

## Why Repair Estimates Include Non-OEM Parts

Aftermarket and recycled parts usually cost less. Many policies allow repairs with parts of "like kind and quality", so an approved estimate may include them. Check your policy wording to see what yours says; our guide to [what Ontario car insurance covers after a collision](/blog/car-insurance-towing-coverage-ontario) lists the questions to ask.

## What We See on Our Own Repair Files

At the collision repair facility we have an interest in, the parts decision usually follows the age of the car. On newer vehicles, we install OEM parts when the insurer approves them on the estimate. On older vehicles, insurers usually tell us to install aftermarket parts instead. Either way, it's the approved estimate — not the shop — that sets which parts the insurer pays for, so ask to see the parts list before you sign.

## Differences That Can Matter to You

### Fit and finish
OEM parts are designed for your specific vehicle. Aftermarket panels can differ in fit, which can show up as uneven gaps or wind noise.

### Safety-related parts
For structural and safety-related components, ask the shop how the part has been tested for your vehicle and follow the manufacturer's repair procedures.

### Resale and leases
Buyers and dealers may look closely at repair quality. If your vehicle is leased, check the lease agreement — some require OEM parts for repairs.

## Questions to Ask Before Authorizing Repairs

- "Will you use OEM, aftermarket or recycled parts?"
- "Can I see the parts list on the estimate?"
- "If my insurer approves aftermarket parts, can I pay the difference for OEM?"

Whether you can upgrade to OEM, and who pays the difference, depends on your policy and the approved estimate. Ask your insurer and your repair shop before work starts.

This article is general information, not insurance advice.

---

**Need an [accident tow to the repair shop of your choice](/accident-recovery) in Brampton or the GTA? Call 647-673-9755.**
    `,
	},

	{
		slug: "deductible-waived-collision-repair-brampton",
		title: "\"We'll Waive Your Deductible\" — What to Ask Before You Agree",
		metaTitle: "Deductible Waived on Collision Repair? What to Ask | Pixel Towing",
		excerpt:
			"Some collision shops advertise deductible waivers or assistance. Here's how to tell a legitimate offer from one that could put your claim at risk.",
		category: "Deductible Help",
		categoryColor: "success",
		datePublished: "2025-04-01",
		dateModified: "2026-09-30",
		reviewedNote: REVIEWED_2026_09,
		content: `
## What "Deductible Assistance" Can Mean

Your deductible is the part of a claim you agreed to pay under your policy. When a shop offers to "waive" or "help with" it, the shop is offering to absorb some or all of that cost itself.

Whether that is acceptable depends entirely on how it's done.

## The Line You Must Not Cross

**A legitimate offer:** the shop reduces its own price to you and bills your insurer only for the work actually done, at the approved estimate.

**Not acceptable:** the shop recovers the deductible by inflating the estimate or billing your insurer for work, parts or hours that weren't part of the real repair. That is misrepresenting the claim, and it can put your claim — and you — at risk even if the shop made the arrangement.

## Questions to Ask Before You Agree

- "Will the amount billed to my insurer change because of this?"
- "Is the deductible arrangement written on my repair authorization?"
- "Will the final invoice to my insurer match the work actually done?"

If you're unsure, ask your insurer how they treat deductible offers from repair shops before you authorize the repair. A trustworthy shop will be comfortable with you asking.

## Pixel Towing's Position

We have an interest in a collision repair facility (see [our accident recovery service](/accident-recovery)), and we tell customers that before any referral. Any deductible help we discuss must come off our own price, never be billed to your insurer, and be written into your repair paperwork. Not every claim qualifies, and you are free to choose any repair shop.

This article is general information, not legal or insurance advice.

---

**Questions about a tow or repair after a collision in Brampton? Call 647-673-9755.**
    `,
	},

	{
		slug: "collision-repair-rental-car-brampton",
		title: "Getting a Rental Car After an Accident in Brampton — How It Works",
		metaTitle: "Rental Car After an Accident in Brampton | Pixel Towing",
		excerpt:
			"How rental coverage works after a collision in Ontario, who can arrange the rental, and what to check with your insurer first.",
		category: "Rental Car",
		categoryColor: "info",
		datePublished: "2025-04-08",
		dateModified: "2026-09-30",
		reviewedNote: REVIEWED_2026_09,
		content: `
## Is a Rental Covered?

Coverage depends on your policy and the circumstances of the claim. In Ontario, a rental or replacement vehicle after a collision is usually optional coverage (often called transportation replacement coverage, or OPCF 20), with a daily limit and a total limit.

If you were not at fault, your own policy's Direct Compensation – Property Damage (DCPD) coverage may help pay for a replacement vehicle, if your policy includes DCPD. Your insurer can tell you which coverage applies. For towing and repairs, see [does car insurance cover towing in Ontario?](/blog/car-insurance-towing-coverage-ontario)

## Before You Pick Up a Rental, Ask Your Insurer

- Does my policy include rental or replacement-vehicle coverage?
- What is the daily limit, and the total limit?
- Does it apply to this claim, given who was at fault?
- Do I need approval before I take a rental, or will you reimburse me?

Without that confirmation, you may be responsible for some or all of the rental cost.

## Who Arranges the Rental

FSRA, Ontario's insurance regulator, says you have the right to choose a repair shop, tow operator or vehicle rental company. Your insurer may offer to arrange a rental through a company it works with; you can choose another. What the insurer pays is still set by your coverage. See [FSRA: after an accident — understanding the claims process](${SOURCES.fsraClaims}).

## Matching the Vehicle Class

Coverage limits may not stretch to the same class of vehicle you drive. If you need a particular size — for example an SUV or minivan for a family — ask what your daily limit covers before you book.

## When Coverage Runs Out

Rental coverage usually ends when the repair is complete, the total limit is reached, or a set period after a total-loss settlement. Ask your insurer which applies so you know your end date.

## Pixel Towing's Rental Option

Alongside [accident towing and recovery](/accident-recovery), we offer rental vehicles through a business we have an interest in, and we disclose that before any referral. We'll tell you up front what we can bill to your insurer and what you would owe if your coverage doesn't extend to the full rental. You are free to choose any rental company.

This article is general information, not insurance advice.

---

**Need a tow after a collision in Brampton? Call 647-673-9755.**
    `,
	},
	{
		slug: "locked-keys-in-car-what-to-do",
		title: "Locked Your Keys in the Car? What To Do Next (Brampton Driver's Guide)",
		metaTitle: "Locked Keys in Car? What To Do Next | Pixel Towing Brampton",
		excerpt:
			"Locked out of your car? What to check first, when to call 911, why coat hangers cause damage, and how a car lockout service gets you back in.",
		category: "Car Tips",
		categoryColor: "success",
		datePublished: "2026-10-11",
		dateModified: "2026-10-11",
		content: `
## Locked Out of Your Car? Start Here

Locking your keys in the car happens to almost every driver at some point — at a gas station, in a mall parking lot, or in your own driveway on a cold morning. Here's what to do, in order.

### Step 1: Is a Child or Pet Inside?

If a child or animal is locked in the vehicle — especially in summer heat or winter cold — **call 911 immediately**. Emergency services can respond and force entry if needed. Don't wait for a lockout service.

### Step 2: Check Every Door and the Trunk

It sounds obvious, but a rear door or the trunk is sometimes still unlocked. On many vehicles, an open trunk with fold-down seats is a way back into the cabin.

### Step 3: Look for a Spare Key

Is there a spare at home, with a family member, or with a coworker nearby? If someone can bring it in less time than a service call, that's the cheapest fix.

### Step 4: Check Your Roadside Coverage

Many roadside assistance plans, some car insurance add-ons and some credit cards include lockout service. A quick call to check can save you money.

### Step 5: Call a Car Lockout Service

If none of that works, call a professional [car lockout service](/services/lockout). Have ready:

- Your exact location (cross streets, parking level, or store name)
- Your vehicle's make, model and year
- Where the keys are (seat, ignition, trunk) and whether the engine is running

## Why Not Use a Coat Hanger or Slim Jim?

Modern car doors are packed with wiring, airbag sensors and power-lock mechanisms. A coat hanger or slim jim pushed into the door can scratch paint, tear weather stripping, or disconnect the lock linkage — a repair that often costs more than the lockout call. Professional technicians use air wedges and coated long-reach tools designed to minimize the risk of damage.

## Keys Locked in the Trunk

If the keys are in the trunk, a technician will usually open the cabin first and then use the interior trunk release or fold-down rear seats. Some vehicles disable the interior release when locked; your technician will explain the options.

## Push-to-Start Fob Locked Inside

Most push-to-start cars try to stop you locking the fob inside, but a weak fob battery or a fob left in the trunk can defeat that. Once the door is open, if the fob battery is dead the car may still start with the fob held against the start button — check your owner's manual.

## When You Need a Locksmith Instead

A lockout service opens the car when the key is inside it. If the key is **lost, broken, or won't start the car**, you'll need a new key cut and programmed by a dealer or automotive locksmith. A tow to the dealer or locksmith is often the fastest way to get that done.

## How To Avoid the Next Lockout

- Keep a spare key somewhere you can reach quickly — not inside the car
- Replace your key fob battery every couple of years, or when range drops
- Make a habit of keeping keys in your hand until the door is closed

---

**Locked out in Brampton, Mississauga or the GTA? Our [24/7 car lockout service](/services/lockout) can help — call 647-673-9755.**
    `,
	},
] as const satisfies readonly BlogPost[];

export type BlogSlug = (typeof BLOG_POSTS)[number]["slug"];

export const findBlogPost = (slug: string | undefined): (typeof BLOG_POSTS)[number] | undefined =>
	BLOG_POSTS.find(post => post.slug === slug);

/**
 * "More Guides" under each article: topical neighbours, chosen so every post
 * is linked from at least one other post (not just the first two in the list).
 */
export const RELATED_POSTS: Record<BlogSlug, readonly BlogSlug[]> = {
	"what-to-do-after-car-accident-brampton": [
		"ontario-towing-laws-driver-rights",
		"car-insurance-towing-coverage-ontario",
		"collision-repair-rental-car-brampton",
	],
	"ontario-towing-laws-driver-rights": [
		"how-to-avoid-predatory-towing-gta",
		"what-to-do-after-car-accident-brampton",
		"car-insurance-towing-coverage-ontario",
	],
	"dead-battery-vs-bad-alternator": [
		"locked-keys-in-car-what-to-do",
		"ontario-towing-laws-driver-rights",
		"how-to-avoid-predatory-towing-gta",
	],
	"how-to-avoid-predatory-towing-gta": [
		"ontario-towing-laws-driver-rights",
		"what-to-do-after-car-accident-brampton",
		"total-loss-vehicle-ontario-guide",
	],
	"car-insurance-towing-coverage-ontario": [
		"what-to-do-after-car-accident-brampton",
		"collision-repair-rental-car-brampton",
		"deductible-waived-collision-repair-brampton",
	],
	"total-loss-vehicle-ontario-guide": [
		"car-insurance-towing-coverage-ontario",
		"oem-vs-aftermarket-parts-collision-repair",
		"what-to-do-after-car-accident-brampton",
	],
	"oem-vs-aftermarket-parts-collision-repair": [
		"deductible-waived-collision-repair-brampton",
		"total-loss-vehicle-ontario-guide",
		"car-insurance-towing-coverage-ontario",
	],
	"deductible-waived-collision-repair-brampton": [
		"oem-vs-aftermarket-parts-collision-repair",
		"car-insurance-towing-coverage-ontario",
		"collision-repair-rental-car-brampton",
	],
	"collision-repair-rental-car-brampton": [
		"car-insurance-towing-coverage-ontario",
		"deductible-waived-collision-repair-brampton",
		"total-loss-vehicle-ontario-guide",
	],
	"locked-keys-in-car-what-to-do": [
		"dead-battery-vs-bad-alternator",
		"how-to-avoid-predatory-towing-gta",
		"ontario-towing-laws-driver-rights",
	],
};

const WORDS_PER_MINUTE = 200;
const MARKDOWN_LINK_URL = /\]\([^)]*\)/g;
const MARKDOWN_SYNTAX = /[#*[\]]/g;

/** Read time computed from the article body, so it can't drift from the content. */
export const formatReadTime = (content: string): string => {
	const words = content
		.replace(MARKDOWN_LINK_URL, " ")
		.replace(MARKDOWN_SYNTAX, " ")
		.split(/\s+/)
		.filter(word => /\w/.test(word)).length;
	return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
};

/** "2025-01-15" → "January 15, 2025" (UTC, so the day never shifts by timezone). */
export const formatPostDate = (isoDate: string): string =>
	new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-CA", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	});
