# Design Audit Fixes — Spec

## Context

GrowthSync marketing site on the `ux-writing-audit` branch. A full design review scored the site **B overall, C+ on AI slop**. This spec addresses all 10 findings plus a color system update.

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

## Bug Fix: No Mobile Nav (FINDING-005)

Add a hamburger menu for mobile viewports:

**Implementation:**
- Add `menuOpen` state to Navbar component
- Add hamburger button: use `Menu` icon from lucide-react, visible only on mobile (`md:hidden`), positioned before the "Get started" button
- Hamburger icon color follows `isLight` logic (white on dark hero pages, dark on light pages)
- On click, show a `motion.div` slide-down panel below the navbar, full-width, `bg-white` with `border-b border-gray-200`
- Panel contains: Platform, Blog, Integrations, Careers as links, then a divider, then Sign in and Get started
- Panel uses `z-40` (navbar is `z-50`)
- Close panel: clicking any link, clicking X button, or clicking outside
- Add `X` (close) icon from lucide-react to replace hamburger when open
- Animation: `motion.div` with `initial={{ height: 0, opacity: 0 }}` and `animate={{ height: "auto", opacity: 1 }}`

## Bug Fix: Sphere Mobile Fallback (FINDING-006)

Replace the "optimized for desktop" placeholder text with 3 customer profile cards.

**Implementation:**
- Use first 3 entries from the existing `CUSTOMERS` array (which has `name`, `aov`, `channel`, `lastInteraction` fields)
- Each card: dark background (`bg-white/5 border border-white/10 rounded-2xl p-5`), showing avatar image, name, channel, lastInteraction, and AOV
- Stack vertically with `gap-4`
- Keep it simple — no sphere, no 3D, just clean cards that communicate what the section is about

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

Remove `lg:sticky lg:top-32` from the left column in BookDemo.tsx. This prevents the left column from pinning and pushing the form down on shorter viewports.

## Files Changed

| File | Changes |
|---|---|
| `src/index.css` | Add `.text-gradient-teal`, focus-visible rules |
| `src/App.tsx` | Color swaps (per detailed list above), mobile nav hamburger, sphere mobile fallback, footer cleanup, ROI alignment, nav touch targets, selection color |
| `src/pages/Blog.tsx` | Color swaps only |
| `src/data/blogPosts.tsx` | Color swaps (blockquotes, step numbers) |
| `src/pages/BlogPost.tsx` | Color swaps only |
| `src/pages/BookDemo.tsx` | Color swaps, remove sticky positioning |
| `src/pages/Careers.tsx` | Color swaps, fix first department `whileInView` → `animate` |

## Out of Scope
- New pages (About, Changelog)
- Dark mode
- Blog content changes
- SEO/schema changes
- FINDING-007 (AI Slop: violet gradient palette) — addressed by this spec's color system update
