# Pixel Towing — SEO Update Notes
## Files Changed / Created

### UPDATED FILES (replace your existing files)
| File | What Changed |
|------|-------------|
| `src/pages/Home.tsx` | CSS-only animation (LCP fix), service areas grid, blog teaser, richer internal linking |
| `src/pages/LocationPage.tsx` | Full unique content per city — neighborhoods, unique FAQs, cross-links |
| `src/pages/ServiceDetailPage.tsx` | City service area cross-links at bottom, improved alt text, richer FAQs |
| `src/pages/ReviewPage.tsx` | AggregateRating schema, 6 reviews displayed, review card grid |
| `src/components/AppNavbar.tsx` | Blog link added to nav |
| `public/sitemap.xml` | Blog posts added, service pages bumped to 0.9 priority |

### NEW FILES (add to your project)
| File | Purpose |
|------|---------|
| `src/pages/BlogPage.tsx` | Blog listing page at /blog — 5 SEO articles |
| `src/pages/BlogPostPage.tsx` | Dynamic blog post renderer at /blog/:slug |
| `src/App.tsx` | Updated routes for /blog and /blog/:slug |

---

## What Each Change Fixes

### 1. LCP Fix (Home.tsx)
The old hero used `useEffect` + `setTimeout` to reveal "PIXEL" letters via JS.
This delays Largest Contentful Paint — a direct Google ranking signal.
**Fix:** Pure CSS `animation-delay` on each letter. Renders on first paint, no JS wait.

### 2. Location Pages (LocationPage.tsx)
Old pages had 1-2 short paragraphs — Google flags these as thin/duplicate.
**Fix:** Every city now has:
- 2 unique descriptive paragraphs with local street/highway names
- City-specific bullet points
- 3-4 city-specific FAQs
- Nearby areas cross-linking grid
- Rich schema with address fields

### 3. Blog (BlogPage.tsx + BlogPostPage.tsx)
No blog = no topical authority in Google's eyes.
**Fix:** 5 full articles targeting high-intent pre-need queries:
- "What to do after a car accident in Brampton" → targets people before they need a tow
- "Ontario towing laws" → legal/rights query, high traffic
- "Dead battery vs alternator" → common search before calling for a boost
- "Predatory towing GTA" → consumer protection query
- "Car insurance towing coverage Ontario" → insurance query, very high value

### 4. Review Schema (ReviewPage.tsx)
Old page had no schema — Google couldn't show star ratings in search results.
**Fix:** AggregateRating schema + individual Review schema = eligible for rich snippets (stars in Google results).

### 5. Service → City Cross-Links (ServiceDetailPage.tsx)
Services and locations were silos. No link from "battery boost" to "Mississauga".
**Fix:** Every service page now has a city pills grid linking to all 9 location pages.

### 6. Image Alt Text
All images now have descriptive, keyword-rich alt text:
- Before: `alt="Tow truck"` 
- After: `alt="Flatbed tow truck loading AWD vehicle in Brampton Ontario for safe transport"`

---

## Off-Site Actions (DO THESE — they matter more than code)

### Priority 1: Google Business Profile
- Add photos of your actual trucks, drivers, and completed jobs
- Fill in every service category
- Post a Google Business Update weekly
- Respond to every review (even old ones)
- Ensure your address/phone exactly matches the website

### Priority 2: Directory Listings (NAP consistency)
Submit to these with EXACTLY the same Name/Address/Phone as your site:
- [ ] YellowPages.ca
- [ ] HomeStars.com
- [ ] Yelp Canada
- [ ] BBB (Better Business Bureau Canada)
- [ ] Kijiji (with a pinned ad)
- [ ] 411.ca
- [ ] Canada411.ca
- [ ] Canpages.ca

### Priority 3: Backlinks
- Ask any collision centres you work with for a website mention
- Ask any repair shops you refer to for a link back
- Get listed on the Peel Region business directory
- Reach out to local Brampton community Facebook groups

### Priority 4: Image File Names
Before deploying, rename your asset files:
- `flatTire.png` → `flat-tire-change-brampton.png`
- `jumpStart.jpeg` → `car-battery-boost-brampton.jpg`
- `lockout.jpg` → `car-lockout-service-brampton.jpg`
- `cash for car.jpg` → `scrap-car-removal-brampton.jpg`

---

## Timeline Expectation (honest)
- **Week 1–2:** Google re-crawls updated pages
- **Month 1:** Location pages start ranking for long-tail city queries
- **Month 2–3:** Blog articles begin appearing for informational queries
- **Month 3–6:** Service pages climb for commercial queries ("tow truck Brampton")
- **Month 6+:** Map Pack position improves as reviews/links accumulate

The technical foundation is now very strong. The remaining gap is 
time + off-page signals (reviews, citations, backlinks).
