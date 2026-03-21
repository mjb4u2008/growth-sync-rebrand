# Design Audit Fixes — Spec

## Context

GrowthSync marketing site on the `main` branch. A full design review scored the site **B overall, C+ on AI slop**. This spec addresses all 10 findings plus a color system update, with additional design decisions from the plan design review.

## Color System Update

### What stays (DO NOT CHANGE these)
1. Hero gradient text ("revenue.") — the `.text-gradient` CSS class and its usage in the Hero component
2. Careers page hero gradient span: `from-violet-400 to-fuchsia-400`
3. InteractiveDemo chat bot bubbles: `bg-violet-600` (represents the AI product)
4. FeatureThree chat bot bubbles: `bg-pink-600` (represents the AI product)
5. FeatureThree section label: `text-pink-600` "Retention Engine" — stays pink
6. FeatureThree checkmarks: `text-pink-500` — stays pink
7. **Entire SegmentOfOne section** — all violet/pink references stay. This is a dark-background brand moment. Includes: `bg-violet-900/20` glow, `text-violet-300` badge, `bg-violet-500` bullet dots, `from-violet-400 to-pink-400` gradient text. Also includes `bg-violet-500/30` inside `src/components/ui/img-sphere.tsx` (sphere glow effect)
8. Careers hero dark section: `bg-violet-600/20` glow and `text-violet-400` rocket icon stay (dark hero, brand moment)
9. `.dark-card` CSS class radial gradients in `index.css` — stay
10. `--color-brand-primary: #8B5CF6` CSS variable in `index.css` — stays. Used by `.text-gradient` which is kept for the Hero
11. DashboardPeek "SJ" avatar circle: `bg-violet-600` — stays (represents the product's customer profile UI)
12. InteractiveDemo decorative blob: `from-violet-100 to-pink-100` — stays (background decoration behind the product demo)
13. Instagram story ring gradients: `from-yellow-400 via-pink-500 to-purple-500` — stays (references Instagram's actual UI)
14. Blog page `.text-gradient` on "growth team." — stays (brand gradient moment, consistent with Hero)
15. BookDemo page `.text-gradient` on "social revenue." — stays (brand gradient moment, consistent with Hero)

### What changes (violet → teal)

**`src/App.tsx` — Navbar:**
- `bg-violet-50 text-violet-600` sidebar active state in DashboardPeek → `bg-teal-50 text-teal-600`

**`src/App.tsx` — DashboardPeek (both Classic and new):**
- `bg-violet-100 text-violet-700` badges → `bg-teal-100 text-teal-700`
- `bg-violet-50 text-violet-700` AI action badges → `bg-teal-50 text-teal-700`
- `border-violet-100` → `border-teal-100`
- `text-blue-500`, `text-blue-700`, `bg-blue-50`, `bg-blue-100`, `border-blue-100`, `text-blue-600` in AI Reasoning cards → `text-teal-500`, `text-teal-700`, `bg-teal-50`, `bg-teal-100`, `border-teal-100`, `text-teal-600`

**`src/App.tsx` — InteractiveDemo section:**
- Section label `text-violet-600` "DM Automation" → `text-teal-600`

**`src/App.tsx` — ROI Calculator:**
- Slider fill: `bg-violet-600` → `bg-teal-600`
- Slider thumb (webkit + moz): `bg-violet-600` → `bg-teal-600`
- Revenue card: `bg-violet-600` → `bg-teal-600`
- Revenue card border: `border-violet-500` → `border-teal-500`
- Revenue card shadow: `shadow-violet-600/20` → `shadow-teal-600/20`
- Revenue card gradient: `from-violet-600 to-pink-500` → `from-teal-600 to-cyan-400`
- Revenue card label: `text-violet-200` → `text-teal-200`
- Calculator hover shadow: `hover:shadow-violet-500/10` → `hover:shadow-teal-500/10`

**`src/App.tsx` — Integrations section:**
- Badge: `bg-emerald-50 text-emerald-700` — stays emerald (already non-violet)

**`src/App.tsx` — Pricing section:**
- "We only make money when you do" span: change class from `text-gradient` to `text-gradient-teal` (new CSS class)
- Urgency badge: stays red (already non-violet)

**`src/App.tsx` — Footer:**
- No violet references to change

**`src/App.tsx` — Global wrapper (line ~1360):**
- `selection:bg-violet-100 selection:text-violet-900` → `selection:bg-teal-100 selection:text-teal-900`

**`src/pages/Blog.tsx`:**
- `bg-violet-100 text-violet-700` header badge → `bg-teal-100 text-teal-700`
- `group-hover:text-violet-600` on post titles (h2 and h3) → `group-hover:text-teal-600`
- `group-hover:text-violet-600` on featured post ArrowRight icon → `group-hover:text-teal-600`
- `group-hover:bg-violet-50` on featured post arrow container → `group-hover:bg-teal-50`
- `text-violet-600` on "Read more" links → `text-teal-600`

**`src/pages/BlogPost.tsx`:**
- `text-violet-600` breadcrumb → `text-teal-600`
- `hover:text-violet-700` → `hover:text-teal-700`
- `bg-violet-100 text-violet-700` category badge → `bg-teal-100 text-teal-700`
- `hover:bg-violet-50 hover:text-violet-600` share buttons → `hover:bg-teal-50 hover:text-teal-600`
- Author follow button: `text-violet-600 hover:text-violet-700` → `text-teal-600 hover:text-teal-700`

**`src/data/blogPosts.tsx`** (blog post content, NOT BlogPost.tsx):
- Blockquotes: `border-violet-600 bg-violet-50` → `border-teal-600 bg-teal-50`
- Blockquote text: `text-violet-950` → `text-teal-950`
- Blockquote footer: `text-violet-700` → `text-teal-700`
- Step number circles: `bg-violet-100 text-violet-600` → `bg-teal-100 text-teal-600`

**`src/pages/BookDemo.tsx`:**
- Checklist icons: `bg-violet-100` → `bg-teal-100`, `text-violet-600` → `text-teal-600`
- Form focus rings (6 instances — firstName, lastName, email, company, website, volume select): `focus:ring-violet-500 focus:border-violet-500` → `focus:ring-teal-500 focus:border-teal-500`
- Decorative blob: `from-violet-50 to-pink-50` → `from-teal-50 to-cyan-50`

**`src/pages/Careers.tsx`:**
- `hover:border-violet-300` on role cards → `hover:border-teal-300`
- `group-hover:text-violet-600` on role titles → `group-hover:text-teal-600`
- `text-violet-600` on "Apply Now" and email link → `text-teal-600`

### New CSS class in `src/index.css`

```css
.text-gradient-teal {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, #14b8a6, #06b6d4);
}
```

### Focus-visible rings in `src/index.css`

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid #14b8a6;
  outline-offset: 2px;
  border-radius: 4px;
}
```

## Bug Fix: Blog/Careers Above-Fold Content (FINDING-001)

**Blog.tsx:** All motion elements already use `animate` (not `whileInView`). The blank-on-load issue observed in the headless browser audit was likely a rendering timing issue, not a code bug. **No changes needed for Blog.tsx motion.**

**Careers.tsx:** The department sections use `whileInView`. The first department ("Engineering") and the "Open Roles" heading should use `animate` instead since they're the first content after the hero. Remaining departments can keep `whileInView`.

## Bug Fix: Nav Touch Targets (FINDING-002)

Add `py-3` to each nav link inside the `hidden md:flex` container. This brings them from 20px to ~44px tap target height without visual bloat.

Add `py-1` to footer `<li>` elements to bring footer links from 17px closer to minimum.

## Bug Fix: Dead Footer Links (FINDING-004)

Current footer Platform column: Features, Integrations, Pricing, Changelog
Current footer Company column: About, Blog, Careers, Contact

**Change to:**
- Platform column: Integrations (Link to /integrations), Pricing (anchor to /#pricing)
- Company column: Blog (Link to /blog), Careers (Link to /careers), Contact (`mailto:hello@growthsync.com`)

Remove: Features, Changelog, About (no pages exist).

## Navbar Link Updates (DESIGN-REVIEW-001)

**Current nav:** Platform, Blog, Careers
**Problem:** "Platform" links to `/` — it's redundant with the logo link and wastes a nav slot. Meanwhile, Integrations will be in the footer but not the nav.

**Change to:**
- Remove "Platform" link from nav (logo already links to `/`)
- Add "Integrations" link pointing to `/#integrations` (anchor scroll)
- **Add `id="integrations"` to the Integrations section wrapper** in App.tsx (required for anchor scroll to work)
- Final nav: Blog, Integrations, Careers

## Remove Dead Sign In Button (DESIGN-REVIEW-002)

**Problem:** The "Sign in" button in the navbar and mobile menu is a `<button>` with no handler — clicking it does nothing. Dead interactive elements erode user trust.

**Change:** Remove the "Sign in" button from both desktop nav and mobile nav menu. Add it back when auth exists.

## Mobile CTA Visibility (DESIGN-REVIEW-003)

**Problem:** The "Get started" button has `hidden sm:inline-flex` — invisible on phones < 640px. The primary conversion CTA should never be hidden.

**Change:** Remove the `hidden sm:` prefix. Make the button always visible: `inline-flex px-4 py-2 md:px-5 md:py-2.5`. On small screens, the layout will be: logo (left), hamburger + CTA (right).

## Bug Fix: No Mobile Nav (FINDING-005)

Add a hamburger menu for mobile viewports:

**Implementation:**
- Add `menuOpen` state to Navbar component
- Add hamburger button: use `Menu` icon from lucide-react, visible only on mobile (`md:hidden`), positioned before the "Get started" button
- Hamburger icon color follows `isLight` logic (white on dark hero pages, dark on light pages)
- On click, show a `motion.div` slide-down panel below the navbar, full-width, `bg-white` with `border-b border-gray-200`
- Panel contains: Blog, Integrations, Careers as links, then a divider, then Get started (Sign in removed per DESIGN-REVIEW-002)
- Panel uses `z-40` (navbar is `z-50`)
- Close panel: clicking any link, clicking X button, pressing Escape key, or clicking outside
- Add `X` (close) icon from lucide-react to replace hamburger when open
- Animation: `motion.div` with `initial={{ height: 0, opacity: 0 }}` and `animate={{ height: "auto", opacity: 1 }}`

**Accessibility:**
- Hamburger button: `aria-expanded={menuOpen}`, `aria-controls="mobile-nav"`, `aria-label="Toggle navigation menu"`
- Mobile nav panel: `id="mobile-nav"`, `role="navigation"`, `aria-label="Mobile navigation"`
- Focus trap: hand-rolled with `useEffect` — onKeyDown handler for Tab (cycle within panel links) and Escape (close + return focus to hamburger). Use `ref` to track focusable elements within the panel.
- Escape key: closes the panel and returns focus to the hamburger button
- Desktop `<nav>`: add `role="navigation"`, `aria-label="Main navigation"`

## Bug Fix: Sphere Mobile Fallback (FINDING-006)

Replace the "optimized for desktop" placeholder text with 3 customer profile cards + scale counter.

**Emotional intent:** On desktop, the sphere communicates "we handle scale at volume." The mobile fallback must convey the same feeling of scale, not just show cards.

**Implementation:**
- Add a stat counter above the cards: "1,247 customers tracked today" in `text-white/60 text-sm font-medium` with a subtle `animate-pulse` on the number
- Use first 3 entries from the existing `CUSTOMERS` array (which has `name`, `aov`, `channel`, `lastInteraction` fields)
- Each card: dark background (`bg-white/5 border border-white/10 rounded-2xl p-5`), showing avatar image, name, channel, lastInteraction, and AOV
- Stack vertically with `gap-4`
- Keep it simple — no sphere, no 3D, just clean cards that communicate scale

## Layout: Mixed Alignment (FINDING-008)

**ROI Calculator:** Left-align the urgency badge, heading ("How much revenue are you ignoring?"), and subtext. Change the container from `text-center` to `text-left` on the top text elements. The calculator card itself stays centered.

**Pricing section:** Left-align "GrowthSync is free." and subtext. The urgency badge and CTA button stay centered.

## Layout: H2 Size Normalization (FINDING-010)

Current H2 sizes: 48px (features), 60px (ROI, Segment, Integrations), 88px (pricing).

**Changes:**
- Feature H2s (InteractiveDemo, FeatureTwo, FeatureThree): keep at `text-3xl md:text-5xl` (48px) — correct for 2-column layouts
- Section H2s (ROI, Integrations): keep at `text-3xl md:text-6xl` (60px) — appropriate for full-width sections
- Segment of One: keep at `text-3xl md:text-6xl` (60px) — matches other full-width sections
- Pricing: keep at current size — intentionally hero-scale as a bold closing statement

**No changes needed** — the current scale is actually systematic when analyzed: 48px for feature sections (2-col), 60px for standalone sections, 88px for the pricing hero moment. The audit flagged it as irregular but it follows a logic.

## Layout: Demo Form Positioning (FINDING-009)

**Already resolved.** No `lg:sticky lg:top-32` exists in BookDemo.tsx — this was either already fixed or never applied. No changes needed.

## BookDemo Error State (DESIGN-REVIEW-004)

**Problem:** The form currently simulates success with `setTimeout()`. No error handling exists. When a real API replaces this, users could fill 6 fields and get nothing back.

**Implementation:**
- Add `isError` state alongside existing `isSuccess`
- On submission failure: show an inline banner above the submit button
  - Banner: `bg-red-50 border border-red-200 rounded-xl p-4` with a `AlertCircle` icon
  - Copy: "Something went wrong. Please try again, or email us at hello@growthsync.com"
  - Include a "Try again" button that resets `isError` and re-enables the form
- Inline field validation: required fields show `border-red-300` and helper text on blur if empty
- Submit button shows loading spinner when `isSubmitting` (already exists), disables on submit

## BookDemo Post-Submission Experience (DESIGN-REVIEW-005)

**Problem:** After successful submission, the user sees confetti + checkmark and nothing else. This is the highest-engagement moment — don't waste it.

**Implementation:** After success animation, show:
1. Confirmation headline: "You're in! We'll reach out within 24 hours."
2. Subtext: "Check your inbox for a calendar invite from the GrowthSync team."
3. Secondary CTA: "While you wait, explore our latest insights →" linking to /blog
4. Layout: centered, clean, same card container as the form

## AI Slop Watch List (DESIGN-REVIEW-006)

These patterns on BookDemo aren't bugs, but they're red flags for AI-generated aesthetics. During implementation, consider differentiation:

1. **"Live Demo Available" pulsing green dot** — Replace with a subtle calendar icon or the GrowthSync logo mark. Pulsing green dots appear on every AI-generated SaaS page.
2. **5-star testimonial card** — Make the testimonial more specific: include a metric ("34% lift" is good), add company logo instead of stock headshot, or use a different format (pull-quote with brand color left border instead of card + stars).
3. **Checklist with circle-check icons** — Consider numbered steps, or use `→` arrows instead of checkmarks. Vary the visual rhythm.

## Files Changed

| File | Changes |
|---|---|
| `src/index.css` | Add `.text-gradient-teal`, focus-visible rules |
| `src/App.tsx` | Color swaps, mobile nav (with a11y + hand-rolled focus trap), sphere mobile fallback (with counter), footer cleanup, nav link update (remove Platform, add Integrations + `id="integrations"` anchor), remove Sign In button, always-visible CTA, ROI alignment, nav touch targets, selection color, **delete DashboardPeekClassic** (unused dead code) |
| `src/pages/Blog.tsx` | Color swaps only |
| `src/data/blogPosts.tsx` | Color swaps (blockquotes, step numbers) |
| `src/pages/BlogPost.tsx` | Color swaps only |
| `src/pages/BookDemo.tsx` | Color swaps, remove sticky, error state, post-submission experience, AI slop differentiation |
| `src/pages/Careers.tsx` | Color swaps, fix first department `whileInView` → `animate` |

## NOT in Scope
- New pages (About, Changelog)
- Dark mode
- Blog content changes
- SEO/schema changes
- FINDING-007 (AI Slop: violet gradient palette) — addressed by this spec's color system update
- DESIGN.md creation — deferred to separate `/design-consultation` run
- Blog empty state (no posts) — data is hardcoded, low risk
- Blog/careers image fallbacks for broken external URLs — low priority for static content
- Careers "Apply Now" mailto link — intentional for early-stage company
- Color contrast audit for teal-600 on white — verify during implementation
- Touch target audit for role cards, blog cards, ROI slider — verify during implementation

## What Already Exists
- **Font system:** Inter (body) + Outfit (display) in `index.css` `@theme` block
- **CSS patterns:** `.text-gradient`, `.dark-card`, `.mask-edges`, `.animate-marquee` in `index.css`
- **Motion patterns:** Framer Motion fade-up-on-scroll used consistently across all pages
- **Icon system:** lucide-react used everywhere
- **Layout:** `max-w-7xl mx-auto px-6 md:px-12` container pattern used site-wide
- **Color convention (post-migration):** teal for interaction, violet/pink for brand gradient moments only

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAN | 4 issues, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | ISSUES | score: 6/10 → 7/10, 7 decisions |

- **UNRESOLVED:** 2 (design review deferred: Careers mailto, blog image fallbacks)
- **VERDICT:** ENG CLEARED — ready to implement
