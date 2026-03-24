# Clay Listeners

`Clay Listeners` is the mascot system for GrowthSync's small gray social-commerce characters.

These are not generic mascots. They are meant to feel like:
- quiet listeners
- soft matte clay figures
- minimal and slightly anonymous
- curious, observant, and a little playful
- capable of "breaking the fourth wall" by sitting on type, standing on buttons, or peeking over layout edges

The goal is to make the site feel less sterile without turning it into a cartoon product site.

## Core Visual DNA

Every `Clay Listener` should keep these traits unless a prompt explicitly changes them:

- Material: soft matte clay or ceramic
- Color: warm neutral gray body with subtle teal rim light
- Shape: oversized round head, tiny limbs, simplified torso, no fingers, no facial features
- Finish: tactile, slightly pebbled surface, soft studio shading
- Mood: understated and curious, never hyper-expressive
- Background for isolated assets: pure white seamless studio background
- Output use: sticker-like PNG asset with lots of clean space around the figure

## Style Name

Use this exact style family name in prompts:

`Clay Listeners`

That gives the system a stable identity so future prompts can vary pose and context without changing the base character language.

## Prompt Formula

Use this structure when generating a new mascot:

```text
Create one "Clay Listeners" mascot. [CHARACTER DESCRIPTION]. [POSE DESCRIPTION]. [MOOD DESCRIPTION].
Style: miniature tactile 3D maquette, matte clay and ceramic finish, simplified social-commerce listener character, oversized round head, tiny arms and legs, no facial details, subtle teal rim light, clean silhouette.
Composition: isolated full-body character, centered, generous whitespace, pure white seamless studio background, no text, no props unless explicitly requested, no border, no busy environment, sticker-like website asset.
```

## Prompt Tokens

These are the main knobs to turn.

### Character

- `soft matte gray listener blob`
- `quiet social-commerce observer`
- `small clay watcher`

### Pose

- `sitting casually with legs dangling`
- `standing on an edge and leaning forward`
- `peeking over a ledge`
- `pointing downward as if noticing something below`
- `waving from the corner of a card`
- `resting elbows on an invisible surface`

### Mood

- `curious`
- `observant`
- `friendly`
- `understated`
- `slightly mischievous`

### Placement Intent

Use this when the asset will sit on real UI:

- `posed to sit on a letterform`
- `posed to stand on a rounded button`
- `posed to peek over the edge of a content card`
- `posed to rest on the top border of a section`

### Negative Constraints

Include these when Gemini starts drifting:

- `no facial features`
- `no clothes`
- `no props`
- `no photorealism`
- `no toy packaging`
- `no colorful character design`
- `no glossy plastic`
- `no busy shadows`

## Best Practice: Use a Reference Image

The best current reference in this repo is:

`/public/blog/live-commerce.png`

Use that image to keep the material language consistent with the existing blog art.

When you want Gemini to stay close to the current GrowthSync figures, tell it:

```text
Use the provided reference image only for the material language and shape language of the tiny audience figures.
```

## Example Prompts

### 1. Sitter for a headline

```text
Create one "Clay Listeners" mascot. A soft matte gray listener blob with a rounded head, tiny arms, and tiny legs. Pose: seated casually with legs dangling below the body, designed to sit on top of a large letterform. Mood: curious and understated. Style: miniature tactile 3D maquette, matte clay and ceramic finish, simplified social-commerce listener character, oversized round head, tiny arms and legs, no facial details, subtle teal rim light, clean silhouette. Composition: isolated full-body character, centered, generous whitespace, pure white seamless studio background, no text, no props, no border, sticker-like website asset.
```

### 2. Pointer for a button

```text
Create one "Clay Listeners" mascot. A soft matte gray listener blob with a rounded head, tiny arms, and tiny legs. Pose: standing on an edge, leaning forward, one arm pointing downward as if looking over the page below, designed to stand on a rounded button. Mood: playful, observant, understated. Style: miniature tactile 3D maquette, matte clay and ceramic finish, simplified social-commerce listener character, oversized round head, tiny arms and legs, no facial details, subtle teal rim light, clean silhouette. Composition: isolated full-body character, centered, generous whitespace, pure white seamless studio background, no text, no props, no border, sticker-like website asset.
```

### 3. Card-peeker

```text
Create one "Clay Listeners" mascot. A soft matte gray listener blob with a rounded head, tiny arms, and tiny legs. Pose: peeking over a card edge with hands resting on the top surface and only part of the torso visible. Mood: curious and friendly. Style: miniature tactile 3D maquette, matte clay and ceramic finish, simplified social-commerce listener character, oversized round head, tiny arms and legs, no facial details, subtle teal rim light, clean silhouette. Composition: isolated character, centered, generous whitespace, pure white seamless studio background, no text, no props, no border, sticker-like website asset.
```

## Repo Workflow

The reusable generator is:

`/scripts/generate-mascots.ts`

The background cleanup helper is:

`/scripts/remove-white-background.py`

Run the generator like this:

```bash
GEMINI_API_KEY=your_key_here npm run generate:mascots
```

The generated PNG assets go here:

`/public/mascots`

Raw generations and the manifest go here:

`/.context/generated/mascots`

## How To Make Mascots Feel Attached To The Page

Do not place mascots as a free-floating page overlay.

Instead:

1. Put the mascot inside the element it is supposed to interact with.
2. Make that parent element `relative`.
3. Position the mascot `absolute` inside that parent.
4. Size the mascot in `em`, not `px`, so it scales with the text or button.
5. Use tiny motion only. The mascot should feel alive, not decorative.

Good examples:

- A sitter attached to the first letter of a headline
- A pointer standing on the actual top edge of a CTA button
- A peeker attached to the border of a dashboard card

Bad examples:

- Random floating characters in empty whitespace
- Mascots sized from viewport width instead of local typography
- Characters that overlap the copy enough to hurt readability

## Current Homepage Anchors

The current homepage behavior should follow this rule:

- The sitter is anchored to the opening `T` in the hero heading.
- The pointing mascot is anchored to the `See how it works` button.

That is intentional. They should move with those elements, not with the whole hero container.

## If Gemini Starts Adding Weird Stuff

If the model adds ledges, props, scenery, or toy-like details, tighten the prompt with:

```text
No visible prop, platform, furniture, pedestal, packaging, or environment.
Only the character on a pure white seamless background.
```

If the model gets too cute or too polished, tighten with:

```text
Keep the character minimal, quiet, and anonymous.
No facial features, no glossy toy finish, no cartoon styling.
```

## Naming Convention

Use descriptive filenames:

- `hero-sitter.png`
- `hero-peer.png`
- `card-peeker.png`
- `logo-wave.png`
- `footer-leaner.png`

This makes it easier to reuse poses across the site without guessing what each asset is for.

## Brand Rule

`Clay Listeners` should feel like listeners inside social commerce.

They are not mascots for children, not glossy product toys, and not expressive cartoon characters. They are quiet little observers living on the edges of the interface.
