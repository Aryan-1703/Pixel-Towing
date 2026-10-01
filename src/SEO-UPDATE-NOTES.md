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
      Insured", repair facility and rental fleet ownership, OEM parts as standard,
      the written workmanship warranty, and the deductible-help policy.
- [ ] Add real photos: trucks, equipment, team and (with consent) real jobs.
      Replace the generic photos in `src/assets/` and update `images.ts`.
- [ ] Add real, privacy-safe local job examples to each city in `cities.ts`.
- [ ] Add `etaRange` per city only from real dispatch data.
- [ ] After deploying: Search Console URL Inspection on key pages, Rich Results
      Test on a service, location and blog page, and resubmit the sitemap.

## Off-site (unchanged, still worth doing)
- Keep Google Business Profile NAP exactly matching the site; add real photos.
- Respond to reviews; ask satisfied customers to review via `/review`.
- Consistent NAP on YellowPages.ca, HomeStars, Yelp, BBB, 411.ca, Canada411.
