# Book-a-Call Flow Build Guide

## Intent

Improve the book-a-call conversion path without changing product strategy.

The visitor should understand the flow has two screens:

1. Intake
2. Schedule a call

After intake, the success page should focus on booking time in the embedded Calendly scheduler. It should not imply the user is merely in a queue, and it should not push them to market studies or any other exit path.

## Scope

- Add or preserve `/book-a-call` as the intake route.
- Keep `/get-started` usable as an alias to the same intake experience.
- Add a minimal two-step flow indicator above the intake form.
- Route successful intake submissions to `/book-a-call/success`.
- Update `/book-a-call/success` copy to tell the user to book below.
- Keep Calendly embedded on the success page.
- Keep only a low-emphasis fallback Calendly text link for load failure or manual scheduling.
- Remove the market studies CTA from the scheduling page.

## Non-goals

- Do not add integrations flow, channel marketplace, or unsupported public channels.
- Do not redesign the whole intake page.
- Do not alter lead capture destinations.
- Do not add a second primary CTA that takes users away from scheduling.

## Micro-PR Checklist

- [ ] Intake route and form
  - Definition of Done: `/book-a-call` renders the current intake form and shows a minimal two-step indicator above it.
  - Verify: inspect `/book-a-call` at desktop and mobile in the browser.

- [ ] Scheduling page
  - Definition of Done: `/book-a-call/success` renders Calendly with CTA copy: "Book a time below to get started." The market studies link is gone, and the external Calendly option is only fallback text.
  - Verify: inspect `/book-a-call/success` at desktop and mobile in the browser.

- [ ] Quality and regression pass
  - Definition of Done: Typecheck, blog validation, and production build pass.
  - Verify: `npm run quality`.

- [ ] Brand check
  - Definition of Done: UI uses Outfit/Inter, graphite/cream/teal accents, Instagram-first copy, restrained CTAs, and mobile-first conversion.
  - Verify: compare changed screens and required site captures against `DESIGN.md`.

## Evidence Log

- `npm run quality` passed on the final tree. Vite emitted the existing chunk-size warning.
- Independent review pass found 1 P1 and 2 P2 issues; all were fixed.
- Independent refresh review returned no active P1/P2 findings.
- Production `dist` search found no internal workspace route strings for `/design-board`, `/site-assets`, or `/ads`.
- gstack captured `/`, `/pricing`, `/get-started`, and `/blog` at mobile, tablet, and desktop sizes in `.codex_tmp/book-call-captures/`.
- gstack captured `/book-a-call` and `/book-a-call/success` at desktop and mobile sizes in `.codex_tmp/book-call-captures/`.
