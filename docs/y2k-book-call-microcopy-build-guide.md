# Y2K Book-a-Call Microcopy Build Guide

## Scope

- Preserve the current Y2K/Aqua production design from `main`.
- Add a minimal two-step indicator above the `/book-a-call` intake form.
- Update `/book-a-call/success` so it asks visitors to book a time below.
- Remove the market-studies CTA from the scheduling step.
- Keep the Calendly embed inline and use only a small fallback text link.

## Verification

- `npm run quality`
- Inspect `/book-a-call` and `/book-a-call/success` locally at desktop and mobile sizes.
- Confirm production promotion targets the Y2K/main lineage, not the older saved brand branch.
