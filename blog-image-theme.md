# GrowthSync Blog Image Theme: "Y2K Aqua Field Notes"

## Concept
Each blog post gets a Y2K Aqua social-commerce field-note image. Think early-2000s browser chrome, cream paper, spreadsheet cells, DM bubbles, customer memory cards, and tangerine status lights. Images should feel like a useful artifact from GrowthSync's operating system, not generic SaaS decoration.

## Visual Style
- **Rendering**: Editorial 16-bit / early-2000s internet blend with old Apple Aqua windows, spreadsheet chrome, soft bevels, and crisp UI objects.
- **Lighting**: Warm studio light on cream paper, with gentle Aqua-blue glass highlights and tangerine LEDs.
- **Texture**: Subtle pinstripes, scanline hints, paper grain, and glossy title bars.
- **Composition**: Readable 16:9 hero image with one clear article idea. Avoid text-heavy layouts and repeated centered-phone compositions.

## Color Palette
- **Background**: Warm cream paper (#fbfaf6 / #f2eadb), never dark navy as the default.
- **Primary accents**: Aqua, teal, cyan, electric blue.
- **Conversion accents**: Tangerine status lights and sparse signal lime.
- **Sparse moments**: Violet/pink only as small Instagram-native accents.
- **Materials**: Aqua glass, old browser chrome, cream paper, product workflow surfaces.

## Recurring Motifs
These elements can appear across posts to create visual continuity:
- Instagram-style comments and DM bubbles as abstract UI shapes
- Old-web spreadsheet/table rows with highlighted intent
- CRM cards and customer memory folders
- Tiny original helper objects: pencil, cursor, folder, inbox sprite, receipt, browser window, signal orb
- Tangerine status dots and Aqua titlebars

## Per-Post Scene Descriptions

### Post 1: "The $50 Billion DM Problem Nobody is Talking About"
**Scene**: A massive pile of unopened 3D message envelopes and chat bubbles, stacked haphazardly like a mountain. Some glow teal (representing intent), but most are faded gray and gathering dust. A single small lightning bolt sits at the top of the pile, barely visible. In the foreground, a few golden coins spill out from the cracks between messages — revenue leaking from unread conversations.
**Mood**: Urgency, waste, untapped potential

### Post 2: "Why Live Commerce Will Be a $35 Billion Channel in the US by 2028"
**Scene**: A miniature amphitheater/stage setup. A glowing phone screen stands upright at center stage like a monolith, projecting teal light. Around it, rows of tiny abstract viewer figures (simple geometric shapes, not realistic people) fill the seats. Floating hearts, shopping bags, and chat bubbles rise from the audience like lanterns. Signal lines connect the screen to each viewer.
**Mood**: Energy, scale, the live moment

### Post 3: "Your Social Media Manager is Your Best Salesperson"
**Scene**: A split diorama — two desks side by side. The left desk is cluttered with content calendars, post mockups, and engagement charts, but no revenue tools. The right desk has the same setup but with a glowing teal dashboard, checkout links, and a lightning bolt connector bridging the two sides. The right side is noticeably brighter and more organized.
**Mood**: Transformation, bridging the gap, empowerment

### Post 4: "Introducing GrowthSync"
**Image**: Use the actual GrowthSync logo (white lightning bolt on dark navy rounded square) as the hero image. This is a company announcement — the logo speaks for itself. Place it centered on the dark navy background, optionally with a subtle teal glow/bloom behind it.

### Post 5: "Instagram Just Copied TikTok Shop's Playbook"
**Scene**: A side-by-side miniature platform study, not a centered phone hero. On the left, a vibrant TikTok-style commerce machine: a tiny creator stage, affiliate product tags, a live-selling conveyor, and glowing sales signals already humming. On the right, an Instagram-like storefront is visibly recreating that exact system from traced outlines, duplicate molds, and freshly copied components. A scanning beam or translucent blueprint bridge runs from left to right, making the "copying" unmistakable. The two worlds should feel related, but the right side should read as an imitation catching up, not an original.
**Mood**: Strategic imitation, platform convergence, "the playbook is being copied"

## Prompt Template for Image Generation (Google Imagen / Gemini)

When generating an image, combine the base style with the post-specific scene:

```
[POST SCENE DESCRIPTION]. Y2K Aqua social-commerce operating system illustration, old browser window and spreadsheet UI surfaces, cream paper background, tangerine status lights, soft Aqua blue glass, retro 2003 desktop chrome, Instagram-style comments and DM bubbles as abstract UI shapes, CRM cards and tiny file icons, clean editorial composition, high readability, warm studio light, subtle pinstripe texture, no readable text, no real logos, no copied characters or existing IP, no photorealistic people, 16:9
```

## How to Generate

1. Use the Google Gemini API image endpoint
2. Pass the prompt from the template above
3. Use `aspectRatio: "16:9"` and `sampleCount: 1`
4. Save the output as PNG to `/public/blog/` directory
5. Save only reviewed samples first. Do not batch-generate without Mike's approval.

**API Key**: Use `GEMINI_API_KEY` from local or Vercel env. Do not print, commit, or expose the key.

## What This Theme is NOT
- Not dark Signal Worlds / navy clay dioramas
- Not stock photography or generic SaaS dashboards
- Not fake platform logos or brand logos
- Not copied helper characters such as Microsoft Clippy or any existing character IP
- Not unreadable text-heavy images
- Not batches generated before reviewing one or two samples
