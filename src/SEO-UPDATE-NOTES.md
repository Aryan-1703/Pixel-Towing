# Pixel Towing — SEO & Technical Notes

_Last updated: September 30, 2026 (production SEO pass)._

## How the site is put together

| Concern | Source of truth |
|---|---|
| Business identity (name, phone, email, Google profile, TSSEA disclosure fields) | `src/content/site.ts` |
| Every public URL, its sitemap `lastmod`, indexability, 301 redirects | `src/content/routes.ts` |
| City pages content | `src/content/cities.ts` |
| Service slugs / labels | `src/content/services.ts` (page copy in `ServiceDetailPage.tsx`) |
| Blog articles | `src/content/blogPosts.ts` (featured images in `blogImages.ts`) |
| Photos, sizes, default alt text | `src/assets/images.ts` |
| Per-page head tags (title, description, robots, canonical, OG, Twitter) | `src/components/SEO.tsx` |
| The one business JSON-LD entity (`https://pixeltowing.com/#localbusiness`) | `src/components/BusinessSchema.tsx` |

### Build and serve
1. `vite build` — `vite.config.ts` reads `routes.ts` and emits `dist/sitemap.xml`
   (indexable routes only) and `dist/.site-manifest.json`.
2. `scripts/prerender.mjs` — renders every manifest route plus the 404 page with
   Puppeteer, and **fails the build** if a page has ≠1 title/description, a wrong
   or missing canonical, FAQPage schema, or ≠1 business schema node.
3. `server.mjs` (Railway start command) — 200 for prerendered pages, real HTTP
   301 for `routes.ts` redirects, trailing slashes, `www.` and `http://`, and real
   HTTP 404 (serving `dist/404.html`) for everything else. `.htaccess` is gone:
   Railway never executed it.

### Adding a page
- New city / service / article: add it to the matching content module. Routes,
  prerendering, sitemap and the server pick it up automatically.
- New static page: add the `<Route>` in `App.tsx` **and** an entry in
  `STATIC_ROUTES` in `routes.ts`.
- Only bump a `lastmod` / `dateModified` when the content really changed.

## Content rules
- Response times: use `DISPATCH_MESSAGE` from `site.ts`. Only set a city's
  `etaRange` in `cities.ts` when real dispatch history supports it.
- No absolute guarantees ("damage-free", "zero damage", "only safe method",
  "$0 out of pocket", "fastest") unless there is a written policy behind them.
- Insurance: "Coverage depends on your policy and the circumstances of the claim."
- Keep towing rights (TSSEA), insurance/repair-shop choice (FSRA), rental
  coverage, and collision reporting (HTA + Peel Regional Police) separate.
- **Ontario Tow Zone Program:** on sections of Hwys 400, 401, 403, 404, 409, 410,
  427 and the QEW only the ministry's contracted operator may tow. Don't promise
  highway tows there; use `TowZoneNotice`.
- Reviews: never reproduce or invent review text, names, dates or ratings. Link
  to the Google Business Profile instead.

## Owner action items (need real business information)
- [ ] Fill in `COMPLIANCE` in `src/content/site.ts`: legal name, tow operator
      certificate number, and upload a copy of the certificate and the maximum
      rate schedule (e.g. `public/compliance/…`). The footer block appears
      automatically once set. TSSEA requires these on the website.
- [ ] Confirm the claims that remain on the site are accurate: "Licensed &
      Insured" and repair facility / rental fleet ownership. (OEM wording, the
      written warranty and deductible help were confirmed in November 2026.)
- [ ] Add real photos: trucks, equipment, team and (with consent) real jobs.
      Replace the generic photos in `src/assets/` and update `images.ts`.
- [ ] Add real, privacy-safe local job examples to each city in `cities.ts`.
- [ ] Add `etaRange` per city only from real dispatch data.
- [ ] After deploying: Search Console URL Inspection on key pages, Rich Results
      Test on a service, location and blog page, and resubmit the sitemap.

## Car lockout ranking (October 11, 2026)
On-site: `/services/lockout` rewritten around "car lockout Brampton", "locked keys
in car", "keys locked in trunk", push-to-start fob lockouts; homepage now has a
Car Lockout card + FAQ; new article `/blog/locked-keys-in-car-what-to-do`;
business schema lists every service in `hasOfferCatalog`.

"Near me" lockout searches are decided mostly by the Google Map Pack, not the site:
- [ ] Google Business Profile → Services: add "Car lockout service" with a description
      and link it to `https://pixeltowing.com/services/lockout`.
- [ ] Post a GBP update about 24/7 car lockouts with a real photo from a job.
- [ ] After lockout jobs, ask customers for a review that mentions the lockout
      (send them to `/review`). Steady new reviews matter more than the total count.
- [ ] Confirm the "we check ID / registration after opening" policy is accurate
      (lockout FAQ). Remove it if not.
- [ ] Search Console: request indexing for `/services/lockout` and the new article.

## AI search: ChatGPT, Claude, Perplexity, Gemini, Copilot (October 13, 2026)
AI assistants answer "tow truck in Brampton" by searching the web (mostly Bing for
ChatGPT/Copilot, Google for Gemini, their own crawlers for Claude/Perplexity) and
citing pages they can read without JavaScript. Prerendering already covers that.
- `public/robots.txt` explicitly allows the AI search, user-fetch and training bots.
- `/llms.txt` is generated at build time (`src/content/llms.ts`) from the same
  content modules as the pages: key facts, services, areas and guides as Markdown.
  Service one-liners are `summary` in `services.ts`; keep them matching the page copy.
- Schema: service areas carry Wikipedia `sameAs` + Ontario (so "Acton"/"Erin" are
  not confused with namesakes); business node adds `contactPoint`, `founder`
  (links to the About page Person), `knowsAbout` and Accident Recovery in the
  offer catalogue; a `WebSite` node names the business as publisher.
- IndexNow: `npm run indexnow` after each deploy pushes every sitemap URL to Bing
  (which feeds ChatGPT search and Copilot); pass paths to submit only those. The
  key file is `public/cd50e408811dc2a962978440ded267f4.txt` — don't delete it.

What moves AI answers most is off-site. Assistants repeat what many independent
sources agree on:
- [ ] Bing Webmaster Tools: verify pixeltowing.com (import from Search Console),
      submit the sitemap. ChatGPT search relies heavily on Bing's index.
- [ ] Bing Places for Business: claim the listing with NAP identical to Google.
- [ ] Apple Business Connect: claim the listing (Siri / Apple Maps / Apple Intelligence).
- [ ] Get listed with identical NAP on the directories assistants cite most for
      local services: Yelp, YellowPages.ca, BBB, HomeStars, 411.ca, Canada411.
- [ ] Reviews on Google *and* Yelp/BBB that mention the service and city
      ("car lockout in Mississauga"). Assistants quote review themes.
- [ ] Local mentions: Brampton community sites, local news, sponsorships. Unpaid,
      genuine mentions only. Don't post fake recommendations on Reddit or forums.
- [ ] Monthly check: ask ChatGPT, Claude, Perplexity and Gemini "best tow truck in
      Brampton" / "locked keys in car Brampton" and note whether Pixel Towing is named.

## RoadLift cross-promotion (October 19, 2026)
RoadLift (roadlift.ca) is the roadside app from the team behind Pixel Towing.
All facts and the promo code live in `ROADLIFT` in `src/content/site.ts`; UI is
`src/components/RoadLiftPromo.tsx`. Phone dispatch stays the primary action.
- Homepage: "Book in the RoadLift app" hero button (jumps to `#roadlift`) and a
  full section with the promo code, after Core Towing Services.
- Service pages: a card deep-linking to the matching roadlift.ca page, on every
  service RoadLift offers (not scrap removal or accident recovery).
- City pages: a card only where RoadLift operates (`citySlugs`: Brampton,
  Mississauga). Footer: one line on every page. `/llms.txt`: a RoadLift section.
- roadlift.ca links carry `utm_source=pixeltowing` for RoadLift's GA4. The promo
  code is the real attribution: its usage count = app customers from this site.

Keep it true:
- [ ] Create `PIXEL15` ($15 fixed, active) in the RoadLift admin panel **before
      deploying**. Consider a minimum order amount and an expiry.
- [ ] When Android launches, set `androidAvailable: true` and add the Play link.
- [ ] When RoadLift adds a city, add its slug to `citySlugs`. When the offer
      ends, set `promo: null` (it disappears everywhere).

## Audit Phase 1 (November 11, 2026)
Code-only fixes from `pixeltowing.com-audit/ACTION-PLAN.md`, Phase 1:
- **Call first on mobile:** sticky bottom call bar below `lg` (`MobileCallBar.tsx`),
  call icon beside the hamburger, and on service pages the H1 + call button come
  before the image on phones. Every call link carries `data-cta="…"` for tracking.
- **Homepage hero:** decorative PIXEL wordmark hidden below `md` (it overlapped the
  navbar logo); RoadLift is a text link, not a third equal-weight button.
- **RoadLift:** one block per page with a relationship line ("a separate app from
  the team behind Pixel Towing… call 647-673-9755"); no "skip calling around"
  framing; promo code removed from `llms.txt` (still on-page via `ROADLIFT.promo`).
- **One source for facts:** payment methods are `PAYMENT_METHODS` in `site.ts`
  (schema, hero, Contact FAQ, llms.txt). Contact page lists all 10 service areas.
- **Schema:** business `founder` is an inline Person with the `/about#author` id;
  blog posts are `BlogPosting` with `author.@id`; logo stays the square `/tow.jpg`,
  social previews default to the 1200×630 `/og-default.jpg`.
- **Targeting & links:** "in Brampton" in service H1s; "Accident Towing" in the
  accident H1; its 5-step box cut to 3 bullets + link to the full guide;
  contextual links service ↔ guide and between guides; curated `RELATED_POSTS`;
  read times computed from word count; Locations menu prerendered.

Search Console follow-up (same day, baseline in `pixeltowing.com-audit/GSC-BASELINE-2026-11-11.md`):
- The insurance and total-loss guides had 2,265 impressions at positions 18–22. Both now
  open with answer-first sections for the real queries ("does insurance cover towing
  after an accident", "premium after a totaled car", "car towed, can't pay, do I still
  need insurance", "how much will insurance pay"). Every rule cites FSRA, ontario.ca or
  e-Laws. Two claims were left out because no official source confirmed them: a
  blanket "not-at-fault can't raise premiums" rule, and towing being a named DCPD cost.
- Tire page FAQ now says plainly that we install the customer's spare and don't repair
  or plug tires (owner, November 11, 2026). Don't target "flat tire repair".

Still owner-blocked (see the action plan, Phases 0 and 2–3):
- [x] Cloudflare → Scrape Shield → Email Address Obfuscation: **off** (verified
      November 11, 2026: the email is in the raw HTML of `/contact`). Still check
      AI Crawl Control / "Block AI bots" is off.
- [x] Google Search Console is already set up (confirmed by the owner, November 11,
      2026). Before deploying this batch, export Performance → Queries and Pages
      (last 3 months) as the baseline for the audit's "fails if" checks.
- [ ] After deploying: resubmit the sitemap, and URL Inspection → Request indexing
      for `/`, `/accident-recovery`, the 5 service pages, `/about`, `/contact` and the
      OEM article.
- [ ] TSSEA: fill `COMPLIANCE` in `site.ts`, upload the certificate and maximum rate
      schedule to `public/compliance/`. Then a `/rates` page and real price FAQs.
      (Deferred by the owner, November 11, 2026.)
- [ ] Confirm `PAYMENT_METHODS`: the old Contact page also listed E-Transfer, Apple
      Pay and Google Pay. Add any you really take on every job.
- [x] OEM parts (owner, November 11, 2026): OEM on newer vehicles when the insurer
      approves it on the estimate; on older vehicles insurers usually direct
      aftermarket. `/accident-recovery` and the OEM article now say exactly that.
- [x] Written repair warranty and deductible help on `/accident-recovery`
      (owner, November 13, 2026): both are real policies. Keep the wording.
- [ ] Confirm "Licensed & Insured".
- [ ] Real photos, job notes and ETA data for city and service pages.

## SEO audit phase 2 (November 13, 2026)
Second audit: `pixeltowing.com-audit/2026-11-13/` (local only, not in git).
- Fact fixes: Ontario's collision reporting threshold is **$5,000** since
  January 1, 2025 (was $2,000) — after-accident guide and `/accident-recovery`.
  The minor-accident premium rule is now **$5,000** (O. Reg. 56/25). FSRA's current
  claims page says a premium is likely to rise at **50% or more** at fault — the
  old "more than 25%" figure came from an FSCO-era guide. FSCO documents are now
  labelled as FSCO; tow-consent text mentions police-ordered tows.
- Mobile: navbar turns solid when the menu is open on `/`; the Locations menu is
  `LocationsMenu.tsx` (no Popper); `g-5` rows no longer overflow phones; call-bar
  spacing lives on the footer. Component CSS loads before Bootstrap (`main.tsx`
  imports `App` first), so overriding a Bootstrap `!important` utility needs a
  more specific selector.
- Content: service copy is in `src/content/serviceCopy.ts` with deeper tire,
  battery, flatbed and scrap sections; city FAQs can contain links; `/about` is a
  company page; blog posts show the first answer before the image.
- Server: `Content-Security-Policy-Report-Only` and `Permissions-Policy` headers.
  Check the live console for CSP reports (Cloudflare can inject scripts) before
  switching to an enforcing `Content-Security-Policy`. HTML now carries
  `s-maxage=300, stale-while-revalidate=86400`; it only takes effect at Cloudflare
  with a Cache Rule for HTML, and then needs a purge on each deploy.
- [ ] After deploying: `npm run indexnow`, then Search Console → Request indexing
      for the three insurance/accident guides, `/accident-recovery`, `/about`, the
      four expanded service pages and the edited city pages.
- [ ] No analytics is installed, so call taps (`data-cta`) aren't counted yet.

## Off-site (unchanged, still worth doing)
- Keep Google Business Profile NAP exactly matching the site; add real photos.
- Respond to reviews; ask satisfied customers to review via `/review`.
- Consistent NAP on YellowPages.ca, HomeStars, Yelp, BBB, 411.ca, Canada411.
