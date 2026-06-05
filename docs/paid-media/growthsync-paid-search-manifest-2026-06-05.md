# GrowthSync Paid Search Manifest

Date: 2026-06-05
Status: Site readiness prepared. No ad-platform campaign mutations made.
Primary channel: Google Search
Secondary channel: Meta, later
Approved starter budget: $50/day

## Decision

`CONTROLLED_PAID_PILOT: NO PASS` until Google Ads billing setup and Meta/Google creative assets are confirmed.

This manifest is ready to translate into paused Google Ads drafts once the platform connection exists.

## Platform Readback

Google Ads:

- Browser account: `mike@growthsync.com`
- Current state: active Google Ads manager workspace.
- Visible account/customer label: `920-770-5643`
- Account display name corrected from `Growthsync` to `GrowthSync` on 2026-06-05.
- Conversion action: `Book a call lead`, category `Submit lead form`, primary, count `One`, enhanced conversions off.
- Google tag / conversion ID: `AW-18183231509`
- Google Ads lead conversion label: `lvkdCKawyrkcEJWwuN5D`
- Vercel env added: `VITE_GOOGLE_TAG_ID`, `VITE_GOOGLE_ADS_CONVERSION_ID`, and `VITE_GOOGLE_ADS_LEAD_CONVERSION_LABEL` for production, preview, and development.
- Blocker: no linked payment profile and no billing setup. Google Ads says a billing setup is required to show ads.

Meta:

- Browser account access reached Events Manager.
- Ad account: `196247430`
- Candidate dataset/pixel: `Growth Sync`, ID `1182775987029382`
- Vercel env added: `VITE_META_PIXEL_ID=1182775987029382` for production, preview, and development.
- Current state: pixel can load after the site code is deployed with these changes; no Meta campaigns or ad sets created.

## Destination

- Primary final URL: `https://growthsync.com/book-a-call`
- Alternate final URL: `https://growthsync.com/get-started`
- Conversion path: successful `/api/leads` response from the book-a-call intake form.
- First-party join key: lead email plus captured lead timestamp.
- Click IDs captured: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`.
- Browser conversion tags: Google Ads `conversion` and Meta `Lead` fire only after `/api/leads` returns `ok`.
- Google lead conversion payload: `send_to=AW-18183231509/lvkdCKawyrkcEJWwuN5D`, `value=1.0`, `currency=USD`.

## UTM Convention

Google Search final URL template:

```text
https://growthsync.com/book-a-call?utm_source=google&utm_medium=cpc&utm_campaign=gs-search-social-commerce-alpha-202606&utm_content={adgroupid}-{creative}&utm_term={keyword}
```

Meta later:

```text
https://growthsync.com/book-a-call?utm_source=meta&utm_medium=paid_social&utm_campaign=gs-meta-retargeting-alpha-202606&utm_content={adset}-{creative}
```

## Google Search Draft

Campaign name:

```text
GS_US_Search_SocialCommerce_LeadGen_20260605
```

Draft settings:

- Status: `PAUSED`
- Objective: leads
- Network: Google Search only
- Match types: exact and phrase only for the first pilot
- Budget: `$50/day`
- Dates: `7-day starter pilot once account gates pass`
- Geography: `United States`
- Bidding: start conservative; do not use broad match or Performance Max until conversion quality is proven.

## Ad Groups

### Social Commerce AI

Keywords:

- `"social commerce software"`
- `[social commerce software]`
- `"social commerce ai"`
- `[social commerce ai]`
- `"ai social commerce platform"`
- `"ecommerce social selling software"`

Safe draft copy:

- Headline: `Social Commerce AI`
- Headline: `Turn Social Intent Into Action`
- Headline: `GrowthSync For Modern Brands`
- Description: `Capture social signals, route replies, and turn high-intent conversations into follow-up workflows.`
- Description: `Built for brands that want cleaner customer context across Instagram, TikTok, and launches.`
- CTA: `Book a call`

### Instagram DM Automation

Keywords:

- `"instagram dm automation"`
- `[instagram dm automation]`
- `"instagram customer service automation"`
- `"instagram sales automation"`
- `"automate instagram comments"`

Safe draft copy:

- Headline: `Instagram DM Automation`
- Headline: `Respond With Customer Context`
- Headline: `Built For Social Commerce`
- Description: `Give teams one place to capture, understand, and respond to social buying intent.`
- Description: `See how GrowthSync helps turn comments and DMs into a cleaner revenue workflow.`
- CTA: `Book a call`

### TikTok And Creator Commerce

Keywords:

- `"tiktok shop crm"`
- `[tiktok shop crm]`
- `"creator commerce software"`
- `"social selling crm"`
- `"tiktok customer engagement"`

Safe draft copy:

- Headline: `TikTok Shop CRM`
- Headline: `Social Selling Workflows`
- Headline: `Capture Creator-Led Demand`
- Description: `Track high-intent social conversations and keep customer context attached to the next action.`
- Description: `Designed for brands turning creator and community attention into owned relationships.`
- CTA: `Book a call`

## Shared Negatives

- free course
- jobs
- careers
- salary
- definition
- examples
- template
- pdf
- login
- support
- customer service phone number
- facebook marketplace
- personal instagram automation
- bot followers
- buy followers
- fake engagement

## Meta Later

Do not launch Meta cold prospecting yet. Meta should start only after:

- Pixel/dataset and domain verification are confirmed.
- Retargeting or warm audience size is known.
- Creative assets are approved.
- Privacy review allows Meta tracking or CAPI.

Potential first Meta use:

- Retarget visitors who reached `/book-a-call` but did not submit, if privacy and consent requirements are satisfied.
- Use brand/product visual assets from `public/brand/` and product UI assets from the homepage after review.

## Claims Guardrail

Approved claim space:

- GrowthSync helps capture social signals.
- GrowthSync helps route replies and preserve customer context.
- GrowthSync is built for modern brands using Instagram, TikTok, creator commerce, and launches.

Avoid until sourced and approved:

- Specific ROI, GMV, lift, revenue, or conversion-rate claims.
- Guarantees.
- Star ratings or testimonials.
- "Official partner" or accreditation language.
- Claims that fully autonomous messaging is approved for every brand or regulated category.

## Kill Rules

Needs founder approval, but recommended first-pass rules:

- Pause if spend reaches the approved daily cap.
- Pause if no valid lead is captured after $350 total spend.
- Pause any query with irrelevant intent after meaningful click volume.
- Add negatives daily for jobs, education, bot/follower, and support-intent searches.
- Review all leads manually before scaling.

## Approval Needed

```text
Approved action:
Platform:
Account:
Campaign(s):
Objective/conversion:
Budget daily / total / dates:
Audience/geography:
Placements/search network:
Creative asset IDs/files:
Copy:
Landing pages:
Allowed mutation:
Kill rules:
Approver/date:
```

Allowed mutation must be one of:

- `prepare local manifest only`
- `create paused drafts`
- `enable approved campaign`

## Current Approval Record

```text
Approved action: prepare site measurement, prepare campaign manifest, create paused drafts when a connected account/tool is available, and enable only after account, billing/payment profile, tag, and creative readback
Platform: Google Ads first, Meta later
Account: Google Ads 920-770-5643; Meta ad account 196247430 with Growth Sync dataset 1182775987029382
Campaign(s): GS_US_Search_SocialCommerce_LeadGen_20260605
Objective/conversion: Book-a-call lead
Budget daily / total / dates: $50/day, $350 first-week guardrail, 7-day starter pilot
Audience/geography: United States, exact/phrase search intent for social commerce / Instagram DM automation / TikTok creator commerce
Placements/search network: Google Search only for first pilot
Creative asset IDs/files: [NEEDS_USER_ASSETS]
Copy: Safe draft copy in this manifest
Landing pages: https://growthsync.com/book-a-call
Allowed mutation: create paused drafts when account access exists; enable approved campaign only after final account, billing/payment profile, tag, and creative readback
Kill rules: Daily cap, $350 no-lead cap, irrelevant-query negatives, manual lead-quality review before scaling
Approver/date: Michael Broughton, 2026-06-05
```
