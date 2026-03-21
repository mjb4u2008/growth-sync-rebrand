# TODOS

## Design Debt

### Create DESIGN.md via /design-consultation
**What:** Run `/design-consultation` to create a formal design system document.
**Why:** The site has an implicit design system (teal interaction color, violet/pink brand gradients, Inter+Outfit fonts, Tailwind utility patterns) but it's not documented. Next person to add a page will guess at colors, spacing, and component patterns.
**Pros:** Single source of truth for the entire design vocabulary.
**Cons:** ~30 min CC time. Needs to wait until the design-audit-fixes spec is implemented so DESIGN.md captures the post-migration state.
**Depends on:** `docs/superpowers/specs/2026-03-21-design-audit-fixes-design.md` being fully implemented.

### Color contrast audit — teal on white
**What:** Audit all teal text-on-white instances for WCAG AA compliance (4.5:1 ratio).
**Why:** Tailwind's teal-600 (#0d9488) on white is ~4.5:1, right at the WCAG boundary. Some teal-500 usages may fail, meaning low-vision users or users in bright sunlight can't read the text.
**Pros:** Catches accessibility failures before they affect real users.
**Cons:** May require bumping some teal-500 to teal-600/700 in a few places.
**Depends on:** Design audit fixes spec being implemented (need final color values in place).

### Image fallback system for external URLs
**What:** Add fallback/placeholder handling for broken external images across Blog, BlogPost, and BookDemo pages.
**Why:** Blog posts and testimonials use external Unsplash URLs. When these 404, rate-limit, or change, users see broken images and layout shift.
**Pros:** Prevents broken layouts and improves perceived quality.
**Cons:** Minor effort. Could also be solved by self-hosting images when real content exists.
**Depends on:** Nothing — can be done independently.

## Code Quality Debt

### Split App.tsx into separate component files
**What:** Extract the 13 components in `src/App.tsx` (1,417 lines) into individual files under `src/components/` and `src/pages/`. Keep `App.tsx` as just the router + layout wrapper.
**Why:** Each new feature adds more code to a single file. Merge conflicts, slow IDE navigation, and cognitive load compound as the site grows.
**Pros:** Better file-level organization, easier to find and modify individual components, cleaner diffs.
**Cons:** ~30 min CC effort, creates a large diff that touches imports and the router.
**Context:** Components to extract: Navbar, Hero, DashboardPeek, InteractiveDemo, FeatureTwo, FeatureThree, ROICalculator, SegmentOfOne, Integrations, Pricing, Footer, IntegrationsPage. The `ScrollToTop` utility can go in a `src/utils/` folder.
**Depends on:** Design audit fixes spec should be implemented first to avoid merge conflicts during extraction.
