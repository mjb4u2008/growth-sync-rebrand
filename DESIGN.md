# Design System

GrowthSync's visual language. This document is the source of truth for all UI work in `next/`.

Update this file when a token, component, or pattern changes. Drift between this doc and the running product is a bug.

---

## 1. Product Context

GrowthSync is the wire service for socially driven brands going from 1 to 10. Every DM the brand's content earns gets a real reply, in the brand's voice, at the hour the customer wrote. The product surface is a daily-use web app where operators (founders, heads of social, heads of growth) spend hours triaging conversations, configuring campaigns, and reviewing work the system has drafted on their behalf.

The full brand and voice live in `.context/attachments/growthsync-brand-book-v2 (1)-v1.html` (Brand Book v1.0). This document is the **product** subset of that kit — same colors, same primary typeface, restrained chrome.

**Two surface contexts:**

- **Product** — the daily-use app. Inbox, campaigns, activity, settings. Optimized for legibility, speed, and density. Operators don't want decoration; they want signal.
- **Marketing** — onboarding, empty states, upgrade prompts, feature announcements, external landing pages. Optimized for personality, emotion, and brand recall. The user is in a receptive mode, not a working mode.

These surfaces share a brand identity but apply it with different intensity. The boundary is enforced, not aspirational. See §3.

---

## 2. Design Philosophy

**Two-tier discipline.** The brand kit is expressive (Y2K-inspired, skeuomorphic, multi-typeface). The product is a disciplined subset of that kit — same colors, same primary typeface, but flat surfaces, hairline rules, and chrome reserved for moments that earn it.

**Operator-grade simplicity.** Power users spend hours daily in this tool. Every pixel of decoration is a pixel less of data. Default to flat, hairline, and high-contrast where it counts.

**Warm but unsentimental.** Paper and cream surfaces, ink for text, tangerine for action. The tool feels alive without being chatty.

**Semantic color over decorative color.** Each color has one job (see §6). When tempted to introduce a new color for variety, find another lever — typography, spacing, hierarchy — first.

**Match implementation complexity to context.** Marketing surfaces can carry elaborate CSS. Product surfaces should not. A gradient that costs three layers of CSS to render is fine on the landing page; it's overkill on a button you click 200 times a day.

---

## 3. The Product / Marketing Boundary

This is the rule that keeps the product from drifting back into the expressive brand kit. Treat the right column as **off-limits in product code** unless you're explicitly building a marketing moment.

| Element | Product | Marketing only |
|---|---|---|
| Hanken Grotesk | ✓ | ✓ |
| Space Mono (system signals only) | ✓ | ✓ |
| Orbitron (numeric display font) |  | ✓ (one hero stat per view max) |
| Instrument Serif (decorative italic) |  | ✓ |
| Tangerine, paper, cream, ink | ✓ | ✓ |
| Green, cyan, lilac, amber (semantic) | ✓ | ✓ |
| Brushed metal texture | sidebar only | ✓ |
| Pinstripe patterns |  | ✓ |
| Traffic light decorations | drawers/modals only | ✓ |
| Gradient text |  | ✓ |
| Diagonal stripe progress fills | animating only | ✓ |
| Skeuomorphic window chrome (title bars, drop shadows) |  | ✓ |

**"Marketing moments" inside the product** are screens or components where the user is in a receptive mode rather than a working mode:

- First-run onboarding
- Empty states with educational content
- Upgrade / pricing prompts
- Feature announcements / changelog
- Celebratory moments (first DM sent, milestone reached)
- Marketing-style modals (rare)

These can selectively borrow from the marketing column. Use restraint — even here, one expressive element per view is usually enough.

---

## 4. Frontend Tooling

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC-first |
| Language | TypeScript 5, React 19 | Strict mode |
| Styling | Tailwind CSS v4 | No config file — tokens declared in `app/globals.css` via `@theme` |
| Component library | shadcn/ui (`base-nova`) | Components live in `next/components/ui/`; install via `npx shadcn add <component>` |
| Icons | lucide-react | Do not introduce other icon libraries |
| Primary font | Hanken Grotesk | Loaded via `next/font` (self-hosted) |
| System-signal font | Space Mono | Loaded via `next/font` (self-hosted) |
| Marketing fonts | Orbitron, Instrument Serif | Lazy-loaded only on routes/components that use them |
| Utility classes | `clsx` + `tailwind-merge` via `cn()` helper | |
| Variant handling | `class-variance-authority` (CVA) | For shadcn components and variant-driven components |
| Animation | `tw-animate-css` + Framer Motion | CSS for micro-interactions; Framer for orchestrated motion in marketing moments |
| Logger | `next/lib/logger` | Always use instead of `console.*` |

---

## 5. Typography

### Stack

```
--font-display: 'Hanken Grotesk', system-ui, sans-serif
--font-mono:    'Space Mono', ui-monospace, monospace
--font-tech:    'Orbitron', 'Hanken Grotesk', sans-serif      /* marketing only */
--font-serif:   'Instrument Serif', Georgia, serif             /* marketing only */
```

### Usage rules

**Hanken Grotesk** — primary for all content: headings, body, labels, buttons, form fields, tabs, navigation. Default font.

**Space Mono** — reserved for **system signals**. Use it when the text is the system speaking, not the user reading content. Specifically:

- Sidebar section dividers (e.g. `WORKSPACE`, `ACCOUNT`)
- Status pill text (e.g. `Active`, `Paused`)
- Test panel eyebrow (`AI · TEST`)
- Generated DM headers (e.g. `Generated DM · 0.8s`)
- UTM parameter tags (e.g. `utm_source`)
- Numeric nav badges
- Timestamps in dense lists where tabular alignment matters

If the text reads as "content the user is engaging with," use Hanken Grotesk. If the text reads as "the system is signaling state," use Space Mono.

**Orbitron** — marketing only. At most **one hero stat per marketing view** (a price, a milestone number, a brand metric). Never in product chrome.

**Instrument Serif** — marketing only. Decorative italic accents in onboarding or feature announcements. Never in product chrome.

### Scale

| Token | Size | Line-height | Use |
|---|---|---|---|
| `text-2xs` | 10px | 1.4 | Mono badges, tabular timestamps |
| `text-xs` | 11px | 1.4 | Mono section dividers, micro labels |
| `text-sm` | 12.5px | 1.5 | Body small, dense lists, form sub-labels |
| `text-base` | 13px | 1.5 | Default body, form fields |
| `text-md` | 14px | 1.4 | Card titles, step titles |
| `text-lg` | 16px | 1.3 | Section headings |
| `text-xl` | 20px | 1.15 | Page headings (e.g. campaign name) |
| `text-2xl` | 24px | 1.1 | Marketing subheads |
| `text-3xl` | 32px | 1.05 | Marketing display |
| `text-display` | clamp(40px, 6vw, 72px) | 0.95 | Marketing hero |

Weight scale: 400 / 500 / 600 / 700 / 800 / 900. Headings default to 700–800. Body 400–500. Labels 600.

Letter-spacing: tight on display (`-0.025em` to `-0.045em`), neutral on body, wide on mono (`0.12em` to `0.22em`, always uppercase).

---

## 6. Color System

### Token list

All tokens are declared in `app/globals.css` under `@theme inline`. Hex values are the source of truth; Tailwind utilities (`bg-paper`, `text-tangerine`, etc.) reference them.

**Surfaces**
```
--paper:       #EDECE8   /* primary background (greige) */
--paper-warm:  #E7E6E1   /* hover / selected neutral fill */
--cream:       #FAFAF8   /* secondary surface, cards — near-white so layers separate */
--cream-alt:   #F1F1ED   /* tertiary surface, paper-fade gradient stops */
--cream-fg:    #FFFBF2   /* text / icons on tangerine, ink, or other dark fills */
--field:       #FCFCFB   /* input / textarea / select bg — tinted off-white */
```

**Ink (text)**
```
--ink:         #0B0B12   /* primary text */
--ink-soft:    #2A2A30   /* secondary text */
--ink-mute:    #65615A   /* tertiary text — AA-tuned (was #6E6B5F, 4.24:1 on warm) */
--ink-faint:   #989485   /* quaternary / disabled */
```

**Tangerine — primary action**
```
--tangerine:        #F26B1F
--tangerine-light:  #FF8F3F   /* gradient top */
--tangerine-deep:   #C84F0E   /* gradient bottom, borders */
--tangerine-pale:   #F6E0D2   /* calm-orange: softened tint for active/selected only */
--tangerine-tint:   rgba(242,107,31,0.10)  /* subtle highlight */
```

**Green — on / enabled / selected**
```
--green:        #4ADB5C   /* LED bright */
--green-deep:   #4FB245   /* canonical semantic on (brand kit) */
--green-ink:    #1F5A26   /* readable green for TEXT on light surfaces (LED fills use --green-deep) */
```

**Cyan — system surface (AI + subtle active/info states)**
```
--cyan:         #A8CFD2
--cyan-deep:    #7DB0B4
--cyan-pale:    #E6F1F2
--cyan-ink:     #2F5E63   /* text on cyan surfaces */
```

**Lilac — identity**
```
--lilac:        #C8C5E8
--lilac-deep:   #9B97D4   /* avatar fills */
--lilac-pale:   #EEEDF8   /* tinted identity surface (e.g. People nav-option chip) */
--lilac-ink:    #4B4878   /* text / icons on lilac-pale */
```

**Amber — warning / caution**
```
--amber:        #F0B027
--amber-pale:   #FFF1CF
--amber-ink:    #6F4E0A   /* text on amber surfaces */
```

**Red — error / destructive**
```
--red:          #E54B36
--red-pale:     #FDEEEC   /* error surface bg */
--red-ink:      #8B2417   /* text on red surfaces */
```

**Semantic state aliases** (for banners, toasts, inline messaging — more readable than raw color names in those contexts)
```
--success           → var(--green-deep)
--error             → var(--red)
--error-surface     → var(--red-pale)
--error-border      → var(--red)
--error-text        → var(--red-ink)
--warning           → var(--amber)
--warning-surface   → var(--amber-pale)
--warning-text      → var(--amber-ink)
--info              → var(--cyan-deep)
--info-surface      → var(--cyan-pale)
--info-text         → var(--cyan-ink)
```

**Borders & rules**
```
--rule:         #CFCDC6                /* default hairline (greige) */
--rule-soft:    rgba(17,17,12,0.10)    /* softest hairline */
--rule-dash:    rgba(17,17,12,0.16)    /* dashed dividers */
```

**Metal (sidebar only)**
```
--metal-top:    #E9E8E4
--metal-mid:    #D7D5CF
--metal-bot:    #C3C1B9
--metal-line:   #ACAAA0
```

### Semantic color usage

This is the lookup table for "what color do I use for X?" If a use case isn't here, find the closest match — don't invent a new one.

| Color | Semantic role | Examples |
|---|---|---|
| **Tangerine** | Primary navigation, primary CTAs, milestone affirmation | Active sidebar nav, primary buttons, tab underline (active), brand mark, step-completion checkmark circle, post-selection checkmark |
| **Green** (`--green-deep`) | "On / enabled / selected" state | Toggle ON, goal/option selection (border + radio), live status LED, "saved" indicator |
| **Cyan** | System surface — AI **and** subtle active/info states | Test panel eyebrow, generation dot, DM bubble, AI button variant, active row tints (e.g. an "on" toggle row), info chips, paused banners, "sent via Instagram" indicators |
| **Lilac-deep** | User / actor identity | Avatar fills, identity rings |
| **Amber** | Warning, caution, non-blocking concern | Warning banners, "publicly visible" callouts, escalation indicators |
| **Red** | Error, destructive action | Error toasts, delete confirmations, validation failures |
| **Ink** | Default text, current-step ring, body emphasis | Body text, current step circle border |

**Lilac is identity-only.** Don't use lilac for selection states, status, or anything else. Mixing identity colors with state colors creates ambiguity over time.

**Tangerine is for action and "you are here."** Don't use it for passive state, status, or AI surfaces.

**Calm orange — keep orange surface area small.** The reserved *focal* orange is the tangerine **gradient** (primary CTA, active nav, brand mark). Everything else should let the orange recede. `--tangerine-pale` is a softened tint reserved for genuine **active/selected** signals (selected filter, active row) — not decorative fills or generic hovers (use `--paper-warm` for those). On the greige canvas a small amount of orange reads as deliberate; a lot reads as busy. Prefer a tangerine **border/text/tick** over a tangerine **fill** when an element only needs a light accent.

**Green is for state, not action.** A green button reads as "this thing is on," not "click me."

### Gradient policy

**Gradients are reserved for tangerine moments.** Specifically:

- Primary CTA buttons (`.btn-primary`)
- Active sidebar nav (`.nav-row.active`)
- Toggle ON state (background only, knob stays flat)
- Brand mark logo

Everything else is **flat color**. No gradients on cyan surfaces, no gradients on green toggles, no gradients on neutral chrome. This keeps tangerine doing the heavy visual lifting and prevents the rest of the UI from feeling busy.

Exceptions (marketing only): brushed metal gradients, expressive gradient hero treatments, etc. See §3.

---

## 7. Layout

### Grid

```
[ Sidebar 220px (metal) ][ Main (cream, flex-1) ]
```

No outer gutter, no inner floating panel, no rounded corners on the content surface. The cream main area is full bleed below the toolbar.

### Sidebar (`220px`)

- Background: brushed metal texture (repeating 1px horizontal lines + vertical gradient)
- Border-right: `1px solid var(--metal-line)`
- Brand mark at top: `28×28px` tangerine-gradient badge
- Section dividers: Space Mono, uppercase, `0.22em` tracking
- Nav rows: Hanken Grotesk 12.5px, weight 600; active state uses tangerine gradient (see §6 gradient policy)
- User identity at bottom: lilac-deep avatar + name + sub-label
- The sidebar is the **only** place brushed metal appears in product chrome

### Toolbar (`48px`)

- Background: `--cream` (continuous with main panel, not paper)
- Border-bottom: `1px solid var(--rule-soft)`
- Left: breadcrumb (Hanken Grotesk, current page bold)
- Right: passive status indicators (e.g. "Saved") + secondary actions
- No metal texture, no pinstripes

### Main content (`flex-1`)

- Background: `--cream`
- Full bleed, no inner panel container, no rounded corners
- Section structure: identity row → tab bar → body
- Body padding: `22px 28px` standard

### Cards

Implementation: `next/components/ui/card.tsx`.

- Background: **transparent** (assumes a cream PageShell)
- Border: `1px solid var(--rule-soft)`
- Border-radius: `8px` (`rounded-lg`)
- No shadows, no inset highlights
- Card head: hairline bottom border (when used), no gradient overlay, no traffic lights
- Card footer: hairline top border, no fill (`bg-transparent`)
- Card title: 14px / 600

**On paper-bg surfaces** (outside a cream PageShell), opt into a filled treatment with `className="bg-cream"`.

**Nested cards are never correct.** If you find yourself wanting a card inside a card, the inner element should be flat content with appropriate spacing, not another bordered surface.

---

## 8. Components

### Buttons

All variants share: **pill shape** (`border-radius: 999px`), Hanken Grotesk, sentence case, `gap: 7px` between icon and label, 3px tangerine focus ring at ~18% opacity with 2px offset. Implementation: `next/components/ui/button.tsx`.

| Variant | Use | Visual |
|---|---|---|
| **`default`** (Primary) | The one primary action per view (Submit, Save, Get a sample) | Tangerine Aqua gradient (`tangerine-light → tangerine → tangerine-deep`), tangerine-deep border, cream-fg text, inset top highlight. The only gradient button. |
| **`outline`** (Secondary) | Cancel, Back, secondary CTAs sitting next to a primary | Transparent bg, rule-soft border, ink text, paper-warm on hover. |
| **`secondary`** | A non-primary action that needs visible weight (e.g. tab-bar-style toggles inside a card) | Filled paper-warm, ink text. |
| **`ghost`** | Dense actions, icon-only buttons, dialog-close, inline menus | No border, hover reveals paper-warm fill. |
| **`destructive`** | Delete / detach / disconnect confirmations | Red tint (`red/10`), red text, deepens on hover. Always paired with confirmation copy and an icon — color is never the only signal. |
| **`ai`** | AI-driven actions: Regenerate, Retry, Ask AI | Cyan-pale flat fill, cyan border, cyan-ink text. Never for primary user actions — AI augments, doesn't lead. |
| **`link`** | Inline text actions where chrome would be noise | Tangerine text, underline on hover. |

Sizes: `xs` (24px), `sm` (28px), `default` (32px), `lg` (36px); plus matching `icon-*` square sizes.

### Inputs (text, textarea, select)

- Background: `var(--field)` (`#FCFAF5`) — a faintly warm off-white
- Border: `1px solid var(--rule-soft)`
- Border-radius: `8px` (`rounded-md`)
- Padding: `9px 11px`
- Font: Hanken Grotesk 13px / 500
- Focus: tangerine border + 3px tangerine ring at ~18% opacity (Tailwind `ring-ring/20`)
- No inset shadow (no "pressed" look)

Inputs sit on cream/paper surfaces. `--field` is tinted just enough to read as "editable surface" while staying inside the brand's "never pure white" rule. Reach for `--field` only on genuinely editable elements (input, textarea, select); other "raised" surfaces use `--cream`.

### Field labels (`<Label>`)

Implementation: `next/components/ui/label.tsx`.

- Hanken Grotesk 12px / 600
- Color: `--ink-soft`
- Sentence case (not uppercase)

Don't use Space Mono for form labels. Mono is for system signals, not field names.

### Toggles

- Size: `38×22px` pill
- Knob: `16×16px`, cream fill with subtle border
- OFF: cream-alt background, hairline border
- ON: `--green-deep` background, matching border
- No gradient on toggles

### Selection state (radio / single-choice cards)

For options where the user picks one (goal options, plan choice, etc.):

- **Unselected:** transparent bg, `--rule-soft` border, empty hairline radio circle
- **Hover:** `--paper-warm` bg, no border change
- **Selected:** `--paper-warm` bg, `--green-deep` border, filled radio (`--green-deep` with white inner dot)
- Selected option's icon swatch: filled `--green-deep` with white icon

The combination of filled bg + colored border + filled radio is what makes selection unambiguous. Don't ship a selected state that relies on color alone.

### Selection state (multi-checkbox / posts, items)

For options where the user picks multiple:

- **Unselected:** no indicator
- **Selected:** `--green-deep` filled circle with white check, positioned top-right of the item, 18px circle with 1.5px cream border

### Cards (config sections)

- Transparent bg, `--rule-soft` hairline border, `8px` radius
- Card head: small padding, optional title + meta on the right
- No drop shadow, no inset highlight, no header gradient

### Empty states (`<EmptyState>`)

Implementation: `next/components/ui/empty-state.tsx`. Use instead of inline flex-col center patterns.

Three sizes:

| Size | Padding | Title | Use |
|---|---|---|---|
| `sm` | `py-6` | 12px / medium | Constrained lists (activity list, `h-24` panels) |
| `md` (default) | `py-10` | 13px / medium | Inbox panels, section empty states |
| `lg` | `py-[72px]` | 15px / semibold | Full-page empty states (campaigns table) |

Pass `iconContainer` to wrap the icon in a `paper-warm` rounded box. Without it the icon renders bare so callers control colour via `className` or `style`.

### Form field groups (`<FormFieldGroup>`)

Implementation: `next/components/ui/form-field-group.tsx`. Wraps any labeled form field (input, textarea, select) with a structured header (label + optional description + optional right-side action) and optional inline error.

```tsx
<FormFieldGroup
  label="Brand name"
  description="Shown in account settings."
  headerAction={<StatusPill tone="warning">Required</StatusPill>}
  error={errors.brand_name?.message}
>
  <Input {...register("brand_name")} />
</FormFieldGroup>
```

- Label: 13px / 600 / `--ink` (matches `<Label>` spec §8)
- Description: 12px / `--ink-mute`, renders below label
- `headerAction`: floated right of the label row (status pill, refresh button, etc.)
- Bottom margin: `mb-6` by default; pass `className="mb-0"` on the last field

### Avatars (`<AvatarInitials>`)

Implementation: `next/components/ui/avatar-initials.tsx`. Use instead of inline `rounded-full` spans with lilac fills.

- Fill: `--lilac-deep` (identity-only)
- Text: `--cream-fg`, weight 700
- Border: `1px solid rgba(0,0,0,0.12)`, flat (no gloss)
- Sizes: `sm` (26px / nav), `md` (34px / list rows), `lg` (44px / profile)

Note: DESIGN.md spec lists list rows at 30px; current implementation uses 34px to match existing product usage. Will align in a future spacing pass.

### Status pills (`<StatusPill>`)

Implementation: `next/components/ui/status-pill.tsx`. Use this component instead of reinventing the pattern inline.

- Padding: `5px 11px 5px 9px`
- Border-radius: `999px` (pill)
- Border: `1px solid var(--rule-soft)`
- Background: transparent (hover: `--paper-warm`, only when `interactive` prop is set)
- Font: Hanken Grotesk 12px / 600 (not mono)
- LED dot: 7px solid color (no glow on passive states)
- No chevron unless the pill opens a dropdown (`hasChevron` prop)

Tones: `active` (green-deep), `warning` (amber), `error` (red), `pending` (ink-faint), `paused` (ink-mute), `generation` (cyan-deep, **the only tone that pulses** — used for live AI generation indicators).

### LED indicators

Solid color, no radial gradient, no glow on passive states. Only animate (pulse) when actively signaling a live event (e.g. generation in progress). A passive "Active" status should not pulse — it's a fact, not an event.

```
.led          { background: --green-deep; }  /* active/healthy */
.led-warn     { background: --amber; }
.led-error    { background: --red; }
.led-pending  { background: --ink-faint; }
```

### Step rail (progress indicator)

- Circle: `24×24px`
- **Upcoming:** hairline border, transparent bg, `--ink-faint` number
- **Current:** ink border, transparent bg, ink number
- **Completed:** filled tangerine bg, cream check, no border
- Connector between steps: dashed vertical line (`--rule-dash`)

### Tabs

- Container: hairline bottom border (`--rule-soft`)
- Tab: Hanken Grotesk 13px / 600, sentence case, `12px 4px` padding, `22px` right margin
- Active: `--ink` text + 2px tangerine bottom border
- Inactive: `--ink-mute` text

### Sidebar nav rows

- Padding: `7px 10px`
- Font: Hanken Grotesk 12.5px / 600
- Default: ink-soft text, transparent bg
- Hover: 35% white overlay (visible against metal)
- Active: tangerine gradient, cream text, tangerine-deep border (see §6 gradient policy)

### Avatars

- Default fill: `--lilac-deep`
- Border: `1px solid rgba(0,0,0,0.12)`
- Text/initials: `#FFFBF2`, weight 700
- No radial gloss (flat fill)
- Sizes: `26px` (small/nav), `30px` (list rows), `44px` (profile/identity)

### Test panel (AI surface)

The test panel is the canonical "AI surface." Everything in it uses cyan as the accent.

- Eyebrow: Space Mono `AI · TEST` in `--cyan-ink`
- Generation indicator: cyan-deep dot + "Generated DM · Xs" header
- DM bubble: `--cyan-pale` background, `--cyan` border, ink text
- Regenerate button: AI button variant

Cyan is also used for subtle active and informational states elsewhere (e.g. an "on" toggle row tint, paused/info banners). Both uses share the underlying meaning "the system is signaling something" — context disambiguates AI surfaces from passive info.

### Warning / callout

Inline, no card chrome. Amber icon + `--ink-mute` text in 12px Hanken Grotesk. Avoid full-width amber-bg banners except in genuinely urgent cases (e.g. account suspended, billing failure).

### Modals / drawers

Two variants. The default is operator-grade; the brand-kit window chrome is opt-in for marketing moments only.

**`<Dialog>` / `<Sheet>` / `<AlertDialog>` (operator-grade default)** — `next/components/ui/{dialog,sheet,alert-dialog}.tsx`.

- Cream surface, hairline rule-soft border, 8px radius (`rounded-lg`)
- Soft `0 8px 32px rgba(0,0,0,0.12)` shadow — distance from page, not Aqua-elevation
- Hairline footer rule, no fill
- Use for working surfaces: delete confirmations, form submissions, org creation, picker modals, side panels

**`<MarketingDialog>` (brand-kit window chrome)** — `next/components/ui/marketing-dialog.tsx`.

- Brushed-metal title bar with three decorative traffic lights, centered title in Hanken bold (Space-Mono-bold optional via `meta` prop)
- Cream body, optional brushed-metal status bar at the bottom for version chrome
- 8px radius, soft shadow, metal-line border
- Use *only* for marketing moments: first-run onboarding, upgrade prompts, feature announcements, celebratory milestones. One expressive surface per view.

Traffic lights are decorative — they're affordance for "this is a window," not interactive close/min/max controls. Real close is handled by the dialog's own escape/backdrop behaviour.

---

## 9. Motion

**Default duration:** 150ms. **Easing:** `ease-out` cubic-bezier(0.16, 1, 0.3, 1) (ease-out-quart).

| Token | Duration | Use |
|---|---|---|
| `--motion-micro` | 80ms | Hover state changes, focus ring appearance |
| `--motion-short` | 150ms | Default for color/bg transitions, toggle slide |
| `--motion-medium` | 250ms | Modal/drawer open, accordion expand |
| `--motion-long` | 400ms | Onboarding step transitions (marketing) |

**Hard rules:**

- Never animate layout properties (`width`, `height`, `margin`, `padding`). Animate transforms instead.
- No bounce, no elastic, no spring overshoot.
- Passive states (a saved indicator, an active status pill) do not pulse or breathe. Only animate when actively signaling an event.
- Loading shimmers / generation dots: subtle, low contrast, 1.5–2s cycle.

---

## 10. Accessibility

- **Focus rings:** 3px `--tangerine` at 18% opacity, offset 2px. Visible on all interactive elements.
- **Contrast:** AA minimum for body text. Primary CTAs and active states aim for AAA.
- **Touch targets:** 36×36px minimum. Larger on primary actions.
- **Color is never the only signal.** Selected states have a filled bg + border + radio, not just a color change. Error states pair red with an icon and label, never red alone.
- **Hit areas** extend slightly beyond visual bounds for small icon buttons (e.g. close, expand).

---

## 11. Responsive design

Three breakpoints inherited from Tailwind:

- **Mobile** (`< 768px`): sidebar collapsed to bottom tab bar (56px), main is full-bleed, test panel becomes a bottom sheet
- **Tablet** (`768–1279px`): sidebar visible (220px), test panel hidden behind a button
- **Desktop** (`≥ 1280px`): full layout with test panel inline

The sidebar's metal texture and brand mark are preserved at all breakpoints. Mobile bottom tabs use a 2px tangerine indicator line at the top edge of the active tab (matching the §8 tabs component pattern) — not a full gradient fill. The gradient fill is sidebar-only; on a cream bottom bar it reads as a CTA rather than a location indicator.

---

## 12. Decision Log

Document significant decisions here. Format: date, decision, rationale.

**2026-06-30 — Marketing site (`--gs-` tokens) fully reconciled to §6 + two AA tokens added.**
Aligned the marketing landing page's `--gs-`-prefixed token set to the canonical §6 values: brand tangerine (`#FF6B1A/#E04F0A → #F26B1F/#C84F0E`), greige surfaces, ink ramp, semantic green/amber/red/info, lilac, rule, and metal/chrome. All hardcoded old-palette literals (warm cream, `#FF6B1A`, `#1E8E3E`, `#C98A1A`, `#C7372F`, etc.) were swept site-wide so no pre-greige color remains. Two tokens were tuned/added for accessibility (the doc was the source of truth, but its own §10 AA rule took precedence where they conflicted): `--ink-mute #6E6B5F → #65615A` (the old value was 4.24:1 on the warm tint band, sub-AA), and `--green-ink #1F5A26` added for green **text** (the §6 greens `#4FB245`/`#4ADB5C` are LED/fill greens that fail as text at 2.7:1; `--green-ink` is the readable text green carried from the source mockups).

**2026-06-30 — Command-palette nav ("Command Spine") + lilac pale/ink tokens.**
Added a ⌘K command palette behind the SideNav search field (`NavSearchButton` + `CommandPalette` in `components/nav/`). Scope is navigation-only (every row routes; no mutations): static groups — nav options (`NAV_LINKS`), quick actions (`PALETTE_ACTIONS`, e.g. New campaign), Settings sub-tabs (`SETTINGS_TABS`, deep-linking via `/settings?tab=…`) — plus dynamic, data-backed groups: **Campaigns** (client-filtered from the cached `useAgents` list — bounded, no per-keystroke network) and **People** (debounced server search via `usePeopleSearch`, gated at a 2-char minimum, with loading/empty states; rows show handle + platform). Surface is the operator-grade Dialog (cream, hairline, soft shadow — not marketing chrome). Result rows carry **tinted semantic IconChips** keyed off a per-route `tone`; this is the one place route-identity colour lives — the everyday metal nav spine stays uncoloured. The highlighted/hover row uses the `--tangerine-pale` selected tint (the sanctioned calm-orange active surface). To support the People chip on-system, added `--lilac-pale #EEEDF8` / `--lilac-ink #4B4878`, completing lilac's pale/ink pair to match cyan/green/amber. Lilac stays identity-only; the pale tint is used for identity chips, not state.

**2026-06-29 — Greige + Calm-orange neutral pass.**
Desaturated the neutral palette toward greige and pushed card surfaces near-white so layers separate cleanly and tangerine reads as a deliberate accent rather than blending into a warm field. Driver: the product felt "not quite polished / muddy" — root cause was over-saturated (yellow) neutrals that were too close in value, which muted hierarchy and the action color. Warmth is retained, the yellow chroma is removed. Token changes (hue of tangerine/ink/semantic unchanged): `--paper #ECE9DE→#EDECE8`, `--paper-warm #F0EBDF→#E7E6E1`, `--cream #FBF7EC→#FAFAF8`, `--cream-alt #F5F0E2→#F1F1ED`, `--field #FCFAF5→#FCFCFB`, `--rule #C5C0B0→#CFCDC6`, `--rule-soft .12→.10` (recolored to `17,17,12`), `--rule-dash .18→.16`, metal `#E8E5DC/#D2CEC2/#BCB8AC/#A8A498 → #E9E8E4/#D7D5CF/#C3C1B9/#ACAAA0`. **Calm orange:** `--tangerine-pale #FFE3D0→#F6E0D2` (softened, cooler) and reserved for active/selected only; the strong gradient stays the focal orange. Active-state surfaces that lean only on a `--tangerine-pale` fill should migrate to fill + tangerine border/tick in a later pass so the softer tint doesn't weaken the "selected" signal.

**2026-05-14 — Warm Sand system retired in favor of Y2K-derived product subset.**
Replaced `#E8E4DE` warm sand + DM Sans + forest green CTA system with `#ECE9DE` paper + Hanken Grotesk + tangerine CTA. Driver: brand refresh aligning marketing and product on a shared kit while preserving operator-grade product discipline.

**2026-05-14 — Tangerine for CTA, green for state, cyan for AI.**
Three-color semantic split eliminates the previous "green does double duty" ambiguity. Each color has one job. Lilac stays identity-only.

**2026-05-14 (revised) — Cyan widened to "system surface."**
Cyan now covers both AI surfaces (test panel, generation indicators, AI buttons) and subtle active/informational states (e.g. an "on" toggle row, info chips, paused banners). The two uses share the underlying meaning "the system is signaling something." Driver: tangerine row highlights felt too loud; green would have competed with the toggle state; cyan-pale was the right subtle tint. Avoids the AI-equals-purple trope and the lilac identity collision.

**2026-05-14 — Gradients reserved for tangerine moments only.**
CTA buttons, active nav, toggle ON, and brand mark are the only gradient surfaces in product. Everything else is flat. Keeps tangerine doing the visual lifting and prevents UI noise.

**2026-05-14 — Marketing/product boundary formalized.**
Brushed metal (except sidebar), Orbitron, Instrument Serif, traffic lights (except drawers/modals), pinstripes, gradient text are reserved for marketing surfaces and "marketing moments" within product (onboarding, empty states, upgrade prompts).

**2026-05-14 — Sidebar keeps brushed metal texture.**
The sidebar is the one place in product chrome where the Y2K personality shows through. It's a contained element, visible always, and gives the product a distinctive spine without competing with data.

**2026-05-14 — No inner panel; content surface is full bleed.**
Removed the floating cream panel with rounded corners. Cream main area now extends edge-to-edge below the toolbar. Eliminates "box within a box" feel.

**2026-05-14 — Dark mode out of scope.**
Removing all `dark:` tokens and variants. Light-only system. Will revisit if user demand emerges.

**2026-05-15 — Phase 0 foundations cleanup (design-system migration).**
Token layer audit and rip of legacy aliases. New canonical tokens added: `--cream-fg` (`#FFFBF2`, text/icons on dark fills — replaces the ad hoc `--text-inverse` and ~30 hardcoded `#FFFBF2` literals), `--field` (`#FCFAF5`, tinted off-white for editable surfaces — replaces `#FFFFFF` on inputs, satisfies the brand's "never pure white" rule), `--amber-ink` (`#6F4E0A`), `--red-pale` (`#FDEEEC`), `--red-ink` (`#8B2417`), `--rule-dash` exposed via `@theme`. Killed pure-rename aliases: `--surface`, `--surface-alt`, `--text-primary/-secondary/-muted/-inverse`, `--nav-text*`, `--accent-hover/-surface/-border/-text`, `--identity*`, `--strategy*`, `--border-light`, `--hover-surface/-border`, `--active-surface`, `--ai/-surface/-border/-text`. Kept as canonical semantic tokens: `--success`, `--error*`, `--warning*`, `--info*`, `--focus-ring*`, `--disabled-opacity` (these read clearer than raw color names in banner/toast/inline-message contexts). 637 `var(--legacy)` references across 42 files were rewritten mechanically; typecheck + lint clean.

**2026-05-15 — Phase 2 component extraction pass.**
Extracted three reusable primitives that were being reinvented inline across 6+ files. (1) `<EmptyState>` (`empty-state.tsx`) — three sizes (sm/md/lg), optional icon container box, replaces ad hoc flex-col-center patterns in campaigns table, inbound list (×2), and activity list. (2) `<FormFieldGroup>` (`form-field-group.tsx`) — label + description + optional right-side action + error; replaces four identical structures in BrandTab. (3) `<AvatarInitials>` (`avatar-initials.tsx`) — canonical lilac-deep/cream-fg round avatar; replaces inline spans in ActivityEntryRow, InboundConversationList (ActorAvatar), and TeamTab (corrects TeamTab's off-spec lilac/lilac-deep colour usage to lilac-deep/cream-fg per spec). All three documented in §8. Typecheck clean.

**2026-05-15 — Phase 1 shared-component pass (design-system migration).**
Aligned primitives in `next/components/ui/` to §7 / §8 / §10. (1) Buttons: pill shape (`rounded-full`) across all sizes — eliminates dozens of ad hoc `rounded-full` overrides. Focus ring opacity tightened to `/20` (3px ~18% per §10). Documented all 7 variants (`default`, `outline`, `secondary`, `ghost`, `destructive`, `ai`, `link`). (2) Card: rebuilt to spec — transparent bg, rule-soft border, `rounded-lg` (8px), no `ring`, no footer fill, title 14px / 600. (3) Radius alignment: inputs/textarea/select `rounded-lg` → `rounded-md` (8px); dialog/sheet/alert-dialog `rounded-xl` → `rounded-lg`; select dropdown popup same; BottomNav account sheet `rounded-t-[20px]` → `rounded-t-lg`. (4) Inset `ring-1 ring-foreground/10` removed from modals and select popup in favour of hairline border + soft shadow. (5) Label defaults aligned to §8 (12px / 600 / ink-soft). (6) BottomNav active mobile tab now carries the tangerine Aqua gradient matching SideNav per §11. (7) SideNav width 224 → 220px per §7, `text-white` → `--cream-fg`. (8) `SidePanel` `bg-[var(--cream,#fff)]` → `bg-cream` (drop the pure-white fallback). **New components:** `<StatusPill>` (`status-pill.tsx`) for the LED+label pattern §8 spec'd but Badge didn't implement; `<MarketingDialog>` (`marketing-dialog.tsx`) is the opt-in Y2K-window-chrome modal — brushed-metal title bar, three decorative traffic lights, optional status bar — for marketing moments (onboarding, upgrade, celebration). The default `<Dialog>` stays operator-grade.
</content>
</invoke>
