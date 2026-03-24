# GrowthSync Blog Image Theme: "Signal Worlds"

## Concept
Each blog post gets a miniature 3D diorama scene — a self-contained world that represents the post's core idea. Think editorial illustration meets architectural model. The scenes are abstract and symbolic, never literal or photorealistic. No fake people. No stock photo energy.

## Visual Style
- **Rendering**: 3D isometric/slightly elevated camera angle, matte clay and ceramic material finish
- **Lighting**: Soft, diffused studio lighting with one warm key light and subtle ambient occlusion shadows
- **Depth of field**: Gentle tilt-shift blur at edges to give that miniature/diorama feel
- **Composition**: Centered subject with breathing room, clean negative space around the scene

## Color Palette
- **Background**: Rich dark navy gradient (#0a0f1a to #0f172a) — consistent across all posts
- **Primary accent**: GrowthSync teal (#14b8a6) — used for glowing elements, key objects, and emphasis
- **Secondary accents**: Warm coral (#f97316), soft violet (#8b5cf6) — used sparingly for contrast
- **Materials**: Matte white ceramic for structures, frosted glass for overlays, brushed metal for small details
- **Glow**: Teal elements emit a soft bloom/glow against the dark background

## Recurring Motifs
These elements can appear across posts to create visual continuity:
- **Chat bubbles** as physical 3D objects (rounded rectangles with depth)
- **Lightning bolt** (our logo mark) as a small recurring element in scenes
- **Signal lines** — glowing teal paths connecting objects (representing data/conversation flow)
- **Miniature phone screens** showing abstract UI
- **Floating notification badges** as small spheres or pills

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

## Prompt Template for Image Generation (Google Imagen / Gemini)

When generating an image, combine the base style with the post-specific scene:

```
[POST SCENE DESCRIPTION]. 3D isometric diorama scene, miniature world, matte clay and ceramic material textures, dark navy background (#0a0f1a), teal (#14b8a6) glowing accents, warm coral highlights, soft diffused studio lighting, gentle tilt-shift depth of field, editorial illustration style, no text, no people, no photorealism, high detail, 16:9 aspect ratio
```

## How to Generate

1. Use the Google Gemini API (Imagen 3) endpoint
2. Pass the prompt from the template above
3. Use `aspectRatio: "16:9"` and `sampleCount: 1`
4. Save the output as PNG to `/public/blog/` directory
5. Update the `image` field in `src/data/blogPosts.tsx`

**API Key**: Ask the user for the Google AI Studio API key (do not store in this file or commit to git).

## What This Theme is NOT
- Not photorealistic renders of real environments
- Not stock photography or generic tech imagery
- Not AI-generated "people" or faces
- Not flat 2D illustrations (these have depth and physicality)
- Not overly complex or busy — each scene has one clear focal point
