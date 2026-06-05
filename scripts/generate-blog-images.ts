import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { config } from 'dotenv';

config({ path: '.env.local' });

type BlogImageSpec = {
  slug: string;
  scene: string;
};

const OUTPUT_DIR = join(process.cwd(), 'public', 'blog');
const SAMPLE_OUTPUT_DIR = join(OUTPUT_DIR, 'y2k-samples');

const BASE_STYLE = `Y2K Aqua social-commerce operating system illustration, abstract old desktop chrome with only three colored status dots and otherwise blank top bars, blank spreadsheet grids, blank CRM cards, cream paper background (#fbfaf6), tangerine status lights, soft Aqua blue glass, retro 2003 interface materials, abstract comments and DM bubbles as rounded UI shapes only, tiny blank file tiles, clean editorial composition, warm studio light, subtle pinstripe texture, complete edge-to-edge 16:9 frame. Hard constraints: no black bars, no letterboxing, no menu words, no tab labels, no address bars, no captions, no readable text, no garbled pseudo-text, no micro-writing strokes, no letters, no numerals, no currency symbols, no @ symbols, no typography, no real logos, no platform glyphs, no app icons, no play-button marks, no copied characters or existing IP, no photorealistic people`;
const COMPOSITION_GUARDRAILS = `Distinct silhouette, avoid repeating a centered monolith phone or four-way crossroads layout unless the concept absolutely requires it. Choose a composition unique to this article's idea. Keep the image bright, inspectable, and useful as a blog hero. Use unlabeled symbolic shapes, blank panels, color, paths, and object relationships instead of labels or UI text. If you draw a window, its chrome must be blank except for three colored circles; all panels inside must use simple geometric bars and dots only.`;

const imageSpecs: BlogImageSpec[] = [
  {
    slug: 'the-convergence-is-happening',
    scene: 'A convergence map where many separate blank social commerce surfaces collapse into one bright operating layer. Around the edges, distinct unlabeled mini scenes made only of shapes: a bar-chart panel, an abstract media tile, a small circular stage, a cluster of empty speech bubbles, a grid of blank product cards, and a glowing checkout pedestal. Each sends glowing teal signal streams inward to a central transparent Aqua control console made of layered glass panes, empty rows, and simple geometric bars. The center feels like a unified commerce operating system, while the outer surfaces remain visibly different. Editorial market-shift composition, diagonal motion toward the center, no people, no logos, no text labels, no title text, no header text, no word-like marks, no central phone, no outer window buttons except three colored status dots in the upper left, no x icons, no square icons, no tiny interface glyphs.',
  },
  {
    slug: 'social-commerce-shared-language',
    scene: 'A miniature drafting table where glowing teal social signals are being organized into a clear shared language. On the left, messy unlabeled social shapes float like a thought cloud. On the right, six large blank ceramic cards sit in a clean operating map, each card using only simple geometric bars and dots with no grid, no menu row, no tiny marks, no labels. Thin teal threads connect the messy shapes into the blank cards. Editorial, cerebral, category-building mood, no people, no central phone.',
  },
  {
    slug: 'creator-led-distribution-market',
    scene: 'A creator-led distribution network shown as a miniature marketplace map. Several small creator stages and product pedestals sit around the edges, each sending glowing teal sales paths toward multiple checkout destinations: a storefront, a marketplace warehouse, and a social shop kiosk. In the center is a brand command hub capturing the signals without owning every checkout. Dynamic radial composition, no people, no text, no central monolith phone.',
  },
  {
    slug: 'social-commerce-better-definition',
    scene: 'A compact circular loop diorama showing the true definition of social commerce. Four connected stations form one continuous loop: a glowing discovery feed tile, a conversation bubble cluster, a trust badge made from abstract hearts and comments, and a checkout pedestal with a shopping bag. Teal signal lines flow around the loop while old gray channel silos sit outside it disconnected. Clean symbolic composition, no readable text, no people.',
  },
  {
    slug: 'instagram-tiktok-shop-playbook',
    scene: 'A side-by-side miniature platform scene showing one social shop system copying another without using any real platform marks. Left side: an established social commerce machine with a tiny creator stage, live-selling conveyor, blank product tags, and glowing teal sales signals already in motion. Right side: a newer storefront rebuilding that exact system from translucent tracing outlines, duplicate molds, cloned blank product tags, and copied checkout parts. A scanning beam or blueprint bridge travels from left to right, making the act of copying obvious. Asymmetrical composition, no central phone hero, no crossroads, clear feeling that one platform is borrowing another platform playbook.',
  },
  {
    slug: 'social-commerce-eating-ecommerce',
    scene: 'A miniature traditional brick storefront slowly being wrapped and absorbed by glowing teal social signal tiles, chat bubbles, and blank commerce panels. The old store is gray ceramic crumbling at the edges. Shopping bags morph from physical brown paper into glowing teal digital checkout shapes. Signal lines connect the social elements.',
  },
  {
    slug: 'decade-in-ecommerce',
    scene: 'A winding timeline path through a miniature landscape. Starting from a small gray ceramic laptop and cardboard boxes on one end, the path winds past milestones: a shopping cart, a warehouse, and stacked packages, ending at a glowing teal blank social commerce panel emitting signal lines. The path transitions from muted gray to vibrant teal.',
  },
  {
    slug: 'brand-dms-goldmine',
    scene: 'A treasure chest overflowing with glowing teal 3D chat bubbles and message envelopes. Golden coins and small gems spill out from between the messages. The chest sits on a ceramic pedestal surrounded by scattered nuggets of gold. All chat bubbles are blank and symbol-free.',
  },
  {
    slug: 'social-listening-sales-channel',
    scene: 'A giant ceramic ear sculpture on a pedestal, surrounded by dozens of tiny floating social signals: blank chat bubbles, abstract reaction tokens, and notification beads. Some signals glow bright teal representing sales signals while others are muted gray. Glowing teal signal lines connect the important signals to a small blank revenue dashboard display.',
  },
  {
    slug: 'link-in-bio-era-over',
    scene: 'A broken bridge or crumbling chain link structure spanning a gap. On one side, a blank social profile panel sits on a ceramic stand. On the other side, a glowing teal checkout interface with a shopping bag. Abstract chain segments fall into the void between. The gap represents lost conversions.',
  },
  {
    slug: 'instagram-engagement-wrong',
    scene: 'Two measuring instruments side by side on a ceramic platform. The left instrument is a tall tower of stacked reaction tokens, gray and cold, impressively tall but dim. The right is shorter but radiates bright teal light and connects to rising graph lines. A spotlight illuminates the right side.',
  },
  {
    slug: 'creator-economy-sales-playbook',
    scene: 'A miniature content creation studio setup with a blank panel on a tiny tripod, a ring light, and a desk with editing tools. Instead of traditional sales tools, the desk has abstract social equipment. Bright teal signal lines flow outward to multiple small shopping bag tokens scattered around the scene like an expanding network.',
  },
  {
    slug: 'response-time-gap',
    scene: 'A dramatic hourglass with glowing teal sand flowing rapidly from top to bottom. Around the hourglass, blank chat bubble message shapes transition from bright teal at the top fresh and alive to faded gray at the bottom cold and dead. A small stopwatch nearby uses only a colored teal arc, with no numbers or markings.',
  },
  {
    slug: 'conversational-ai-not-chatbot',
    scene: 'Two contrasting objects on a split platform. Left side: a rigid boxy gray ceramic robot with stiff mechanical arms and a scripted flowchart pattern etched into it. Right side: a smooth organic flowing teal-glowing entity with natural conversation bubbles radiating outward and interconnected neural pathways. The right side is clearly more alive.',
  },
  {
    slug: 'small-brands-beating-enterprise',
    scene: 'A tiny ceramic storefront with a single blank teal commerce panel, radiating connection lines to many small customer figures. Behind it towers a massive gray corporate building that is dim and lifeless with few connections. The small store is vibrant and winning despite its size. David and Goliath scale contrast.',
  },
  {
    slug: 'crm-not-built-social',
    scene: 'A traditional filing cabinet or database cylinder made of gray ceramic, cracking open at the seams. Social signals: blank chat bubbles, DM envelopes, reaction beads, and story reply arrows overflow out of every crack and drawer. The volume is overwhelming. Some signals escape into the air and fade away unprocessed.',
  },
  {
    slug: 'tiktok-shop-33-billion',
    scene: 'A massive glowing teal commerce engine at the center of the scene, shaped like an abstract triangular prism rather than a media icon, surrounded by cascading waterfalls of golden coins, miniature shopping bags, and rising bar chart blocks. Growth arrows point upward. The scale emphasizes enormous market momentum without showing any numbers. Small product boxes orbit the engine like satellites.',
  },
  {
    slug: 'brands-social-selling-field-notes',
    scene: 'A miniature roundtable conference scene with abstract ceramic blob figures seated around a circular table. Above each figure, speech bubbles float with different symbols such as charts, question marks, and lightbulbs. Teal signal lines connect some of the bubbles showing shared themes. Small brand storefronts ring the background.',
  },
  {
    slug: 'social-media-revenue-channel',
    scene: 'A balance scale on a ceramic pedestal. On the left pan sit traditional revenue channel objects including an email envelope, a megaphone for ads, and a blank website browser. On the right pan sits a single blank teal social interaction panel, tipping the entire scale dramatically. The social side clearly outweighs everything else.',
  },
  {
    slug: 'amazon-sellers-moving-social',
    scene: 'A miniature migration scene with small cardboard shipping boxes with tiny ceramic legs walking in a line across a bridge. They migrate from a large gray warehouse fulfillment center toward a vibrant landscape of blank commerce panels, chat bubbles, and social signal tiles all glowing teal. The new world is brighter.',
  },
  {
    slug: 'intent-signals-everywhere',
    scene: 'A dark scene with dozens of pulsing teal dots and expanding signal wave rings emanating from various sources including blank comment bubbles, DM envelopes, story reply arrows, and live stream reaction beads. In the center stands a single large antenna or receiver dish capturing all the signals, glowing brilliantly teal with concentrated energy.',
  },
  {
    slug: 'respond-every-dm-realtime',
    scene: 'A towering mountain of 3D message envelopes and chat bubbles piled impossibly high. At the base, a tiny single desk with a small figure looks overwhelmed. Nearby, a glowing teal AI hub - a smooth sphere with neural network patterns - sends out dozens of simultaneous response lines to the messages, processing them all at once.',
  },
  {
    slug: 'holiday-social-commerce-proof',
    scene: 'A festive diorama with miniature gift boxes, shopping bags, and ornament baubles, but instead of ribbons they are connected by glowing teal social signal lines. Blank commerce panels show shopping interfaces without text. Warm coral and gold accents mix with the teal for a holiday feel. A small tree has chat bubbles as ornaments.',
  },
  {
    slug: 'ai-social-selling-scalable',
    scene: 'A single glowing teal AI node, a smooth sphere with circuit-like patterns, sits at the center. From it radiate dozens of glowing conversation lines outward to multiple blank social panels arranged in a circular array, each showing a different customer interaction through abstract shapes only. The visualization emphasizes scale and simultaneity. Each panel glows softly.',
  },
  {
    slug: 'black-friday-social-data',
    scene: 'A miniature high-volume sale storefront scene rendered in the digital world with blank price-tag shapes, shopping bags, and deal starburst shapes floating around blank commerce panels. Teal and warm coral accents create urgency. A giant blank sale badge is made of clay, surrounded by abstract social engagement bars and dots.',
  },
  {
    slug: 'social-commerce-2025-review',
    scene: 'A large ceramic calendar-like grid or yearbook page lying open with no numbers or text. Key milestones are marked with glowing teal pins placed across the grid. Each pin connects via signal lines to a miniature scene: an abstract media tile, a DM bubble cluster, a live stream bead, and a checkout path. The year is visualized as a journey of growth.',
  },
  {
    slug: 'holiday-winners-common-thread',
    scene: 'A row of five miniature storefronts. Four are gray, quiet, with few customers and dim windows. The center one glows teal with active chat bubbles streaming from the door, customer figures approaching, and a visible revenue graph climbing on a small display. A glowing teal thread literally connects through all the active elements.',
  },
  {
    slug: 'social-commerce-predictions-2026',
    scene: 'A crystal ball or futuristic lens sitting on a ceramic pedestal, glowing teal from within. Inside the transparent sphere, several tiny scenes are visible: an AI chat interface, a rising graph, a live stream setup, a social revenue dashboard, and a conversation commerce flow. Stars and prediction sparkles float around it.',
  },
  {
    slug: 'premium-brands-tiktok',
    scene: 'Luxury brand elements: elegant product packaging, premium ceramic boxes with gold trim, high-end shopping bags, arranged in a semicircle around a blank teal social commerce panel. Subtle signal lines draw the premium items toward the panel. The premium items maintain their elegance while being attracted to social.',
  },
  {
    slug: 'cost-ignoring-social-conversations',
    scene: 'A large ceramic bucket receiving coins and revenue from social engagement at the top, but leaking badly through cracks at the bottom. Each crack is shaped like an unread message envelope or ignored chat bubble. The lost revenue flows away into a drain. The waste is visually dramatic as most of what goes in leaks right out.',
  },
  {
    slug: 'infrastructure-social-selling',
    scene: 'An architectural cross-section or blueprint-style construction scene showing layered infrastructure. Bottom layer: conversation engine with chat mechanics. Middle layer: product catalog with shopping items. Top layer: analytics dashboard with charts. Glowing teal pipes and conduits connect all layers. Feels like building something solid.',
  },
  {
    slug: 'brand-responds-every-dm',
    scene: 'A dramatic before-and-after split scene. Left half: a quiet gray ceramic storefront with piling unread message envelopes gathering dust, no customers. Right half: the same storefront transformed, glowing teal with active conversation bubbles flowing, customer figures streaming in, and a revenue chart climbing visibly. Night and day contrast.',
  },
];

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey && !process.argv.includes('--dry-run')) {
  throw new Error('Missing GEMINI_API_KEY environment variable.');
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const getImagePart = (response: Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>) => {
  for (const candidate of response.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      if (part.inlineData?.data) {
        return part.inlineData;
      }
    }
  }
  throw new Error('Gemini returned no image data.');
};

const generateImage = async (
  { slug, scene }: BlogImageSpec,
  index: number,
  total: number,
  options: { dryRun: boolean; overwrite: boolean; sample: boolean },
) => {
  const prompt = `${scene} ${COMPOSITION_GUARDRAILS} ${BASE_STYLE}`;
  const outputDir = options.sample ? SAMPLE_OUTPUT_DIR : OUTPUT_DIR;
  const finalPath = join(outputDir, options.sample ? `${slug}-y2k-sample.png` : `${slug}.png`);

  console.log(`[${index + 1}/${total}] ${options.dryRun ? 'Prompting' : 'Generating'}: ${slug}...`);

  if (options.dryRun) {
    console.log(prompt);
    return { slug, finalPath };
  }

  if (existsSync(finalPath) && !options.overwrite) {
    console.log(`  Skipped existing file: ${finalPath}`);
    return { slug, finalPath };
  }

  if (!ai) {
    throw new Error('Missing Gemini client.');
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseModalities: ['Image'],
      imageConfig: {
        aspectRatio: '16:9',
        imageSize: '1K',
      },
    },
  });

  const imagePart = getImagePart(response);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(finalPath, Buffer.from(imagePart.data ?? '', 'base64'));
  console.log(`  Done: ${finalPath}`);
  return { slug, finalPath };
};

const main = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const overwrite = args.includes('--overwrite');
  const sample = args.includes('--sample');
  const all = args.includes('--all');
  const requestedSlugs = args.flatMap((arg, index) => {
    if (arg === '--slug') return args[index + 1] ? [args[index + 1]] : [];
    if (arg.startsWith('--')) return [];
    if (args[index - 1] === '--slug') return [];
    return [arg];
  });

  if (!all && requestedSlugs.length === 0) {
    throw new Error('Refusing to batch-generate blog images. Pass --slug <slug> for 1-2 review samples, or --all after approval.');
  }

  if (!all && requestedSlugs.length > 2) {
    throw new Error('Generate only 1-2 review samples before batch approval.');
  }

  const specsToGenerate = all
    ? imageSpecs
    : imageSpecs.filter(({ slug }) => requestedSlugs.includes(slug));

  if (requestedSlugs.length > 0 && specsToGenerate.length === 0) {
    throw new Error(`No blog image specs found for slugs: ${requestedSlugs.join(', ')}`);
  }

  console.log(`Generating ${specsToGenerate.length} Y2K Aqua blog image${specsToGenerate.length === 1 ? '' : 's'}...\n`);

  const results = [];
  for (let i = 0; i < specsToGenerate.length; i++) {
    try {
      results.push(await generateImage(specsToGenerate[i], i, specsToGenerate.length, { dryRun, overwrite, sample }));
    } catch (err: any) {
      console.error(`  Failed: ${specsToGenerate[i].slug} - ${err.message}`);
      if (err.message?.includes('429') || err.message?.includes('rate') || err.message?.includes('Resource')) {
        console.log('  Waiting 15s for rate limit...');
        await new Promise(r => setTimeout(r, 15000));
        try {
          results.push(await generateImage(specsToGenerate[i], i, specsToGenerate.length, { dryRun, overwrite, sample }));
        } catch (retryErr: any) {
          console.error(`  Retry failed: ${specsToGenerate[i].slug} - ${retryErr.message}`);
        }
      }
    }
    if (i < specsToGenerate.length - 1) {
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\nDone. Generated ${results.length}/${specsToGenerate.length} images.`);
};

await main();
