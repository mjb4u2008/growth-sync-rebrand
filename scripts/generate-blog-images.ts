import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';

type BlogImageSpec = {
  slug: string;
  scene: string;
};

const OUTPUT_DIR = join(process.cwd(), 'public', 'blog');

const BASE_STYLE = `3D isometric diorama scene, miniature world, matte clay and ceramic material textures, dark navy background (#0a0f1a), teal (#14b8a6) glowing accents, warm coral highlights, soft diffused studio lighting, gentle tilt-shift depth of field, editorial illustration style, no text, no people, no photorealism, high detail, 16:9 aspect ratio`;

const imageSpecs: BlogImageSpec[] = [
  {
    slug: 'social-commerce-eating-ecommerce',
    scene: 'A miniature traditional brick storefront slowly being wrapped and absorbed by glowing teal social media icons, chat bubbles, and phone screens. The old store is gray ceramic crumbling at the edges. Shopping bags morph from physical brown paper into glowing teal digital shopping cart icons. Signal lines connect the social elements.',
  },
  {
    slug: 'decade-in-ecommerce',
    scene: 'A winding timeline path through a miniature landscape. Starting from a small gray ceramic laptop and cardboard boxes on one end, the path winds past milestones — a shopping cart, a warehouse, stacked packages — ending at a glowing teal phone emitting social commerce signal lines. The path transitions from muted gray to vibrant teal.',
  },
  {
    slug: 'brand-dms-goldmine',
    scene: 'A treasure chest overflowing with glowing teal 3D chat bubbles and message envelopes. Golden coins and small gems spill out from between the messages. Some chat bubbles have tiny dollar signs embossed on them. The chest sits on a ceramic pedestal surrounded by scattered nuggets of gold.',
  },
  {
    slug: 'social-listening-sales-channel',
    scene: 'A giant ceramic ear sculpture on a pedestal, surrounded by dozens of tiny floating social signals — chat bubbles, heart icons, at symbols, notification badges. Some signals glow bright teal representing sales signals while others are muted gray. Glowing teal signal lines connect the important signals to a small revenue dashboard display.',
  },
  {
    slug: 'link-in-bio-era-over',
    scene: 'A broken bridge or crumbling chain link structure spanning a gap. On one side, a phone screen shows a social media profile. On the other side, a glowing teal checkout interface with a shopping bag. Chain link icons fall into the void between. The gap represents lost conversions.',
  },
  {
    slug: 'instagram-engagement-wrong',
    scene: 'Two measuring instruments side by side on a ceramic platform. The left instrument is a tall tower of stacked heart and like icons, gray and cold, impressively tall but dim. The right is shorter but radiates bright teal light topped with a dollar sign and connected to rising graph lines. A spotlight illuminates the right side.',
  },
  {
    slug: 'creator-economy-sales-playbook',
    scene: 'A miniature content creation studio setup with a phone on a tiny tripod, a ring light, a desk with editing tools. Instead of traditional sales tools, the desk has social media equipment. Bright teal signal lines flow outward from the phone to multiple small shopping bag icons scattered around the scene like an expanding network.',
  },
  {
    slug: 'response-time-gap',
    scene: 'A dramatic hourglass with glowing teal sand flowing rapidly from top to bottom. Around the hourglass, chat bubble message icons transition from bright teal at the top fresh and alive to faded gray at the bottom cold and dead. A small stopwatch nearby shows the critical five-minute window with teal markings.',
  },
  {
    slug: 'conversational-ai-not-chatbot',
    scene: 'Two contrasting objects on a split platform. Left side: a rigid boxy gray ceramic robot with stiff mechanical arms and a scripted flowchart pattern etched into it. Right side: a smooth organic flowing teal-glowing entity with natural conversation bubbles radiating outward and interconnected neural pathways. The right side is clearly more alive.',
  },
  {
    slug: 'small-brands-beating-enterprise',
    scene: 'A tiny ceramic storefront with a single phone screen glowing bright teal, radiating connection lines to many small customer figures. Behind it towers a massive gray corporate building that is dim and lifeless with few connections. The small store is vibrant and winning despite its size. David and Goliath scale contrast.',
  },
  {
    slug: 'crm-not-built-social',
    scene: 'A traditional filing cabinet or database cylinder made of gray ceramic, cracking open at the seams. Social media signals — chat bubbles, DM envelopes, heart reactions, story reply icons — overflow out of every crack and drawer. The volume is overwhelming. Some signals escape into the air and fade away unprocessed.',
  },
  {
    slug: 'tiktok-shop-33-billion',
    scene: 'A massive glowing teal play button icon triangular at the center of the scene, surrounded by cascading waterfalls of golden coins, miniature shopping bags, and rising bar chart segments. Growth arrows point upward. The scale emphasizes enormous numbers. Small product boxes orbit the play button like satellites.',
  },
  {
    slug: 'brands-social-selling-field-notes',
    scene: 'A miniature roundtable conference scene with abstract ceramic blob figures seated around a circular table. Above each figure, speech bubbles float with different symbols such as charts, question marks, and lightbulbs. Teal signal lines connect some of the bubbles showing shared themes. Small brand storefronts ring the background.',
  },
  {
    slug: 'social-media-revenue-channel',
    scene: 'A balance scale on a ceramic pedestal. On the left pan sit traditional revenue channel icons including an email envelope, a megaphone for ads, and a website browser. On the right pan sits a single phone showing social interactions, glowing teal, tipping the entire scale dramatically. The phone side clearly outweighs everything else.',
  },
  {
    slug: 'amazon-sellers-moving-social',
    scene: 'A miniature migration scene with small cardboard shipping boxes with tiny ceramic legs walking in a line across a bridge. They migrate from a large gray warehouse fulfillment center toward a vibrant landscape of phones, chat bubbles, and social icons all glowing teal. The new world is brighter.',
  },
  {
    slug: 'intent-signals-everywhere',
    scene: 'A dark scene with dozens of pulsing teal dots and expanding signal wave rings emanating from various sources including comment icons, DM envelopes, story reply arrows, and live stream hearts. In the center stands a single large antenna or receiver dish capturing all the signals, glowing brilliantly teal with concentrated energy.',
  },
  {
    slug: 'respond-every-dm-realtime',
    scene: 'A towering mountain of 3D message envelopes and chat bubbles piled impossibly high. At the base, a tiny single desk with a small figure looks overwhelmed. Nearby, a glowing teal AI hub — a smooth sphere with neural network patterns — sends out dozens of simultaneous response lines to the messages, processing them all at once.',
  },
  {
    slug: 'holiday-social-commerce-proof',
    scene: 'A festive diorama with miniature gift boxes, shopping bags, and ornament baubles, but instead of ribbons they are connected by glowing teal social signal lines. Phone screens show shopping interfaces. Warm coral and gold accents mix with the teal for a holiday feel. A small tree has chat bubbles as ornaments.',
  },
  {
    slug: 'ai-social-selling-scalable',
    scene: 'A single glowing teal AI node — a smooth sphere with circuit-like patterns — sits at the center. From it radiate dozens of glowing conversation lines outward to multiple phone screens arranged in a circular array, each showing a different customer interaction. The visualization emphasizes scale and simultaneity. Each phone glows softly.',
  },
  {
    slug: 'black-friday-social-data',
    scene: 'A miniature Black Friday storefront scene rendered in the digital world with price tag badges, shopping bags, and deal starburst icons floating around phone screens displaying social commerce interfaces. Teal and warm coral accents create urgency. A giant sale badge is made of clay, surrounded by social engagement metrics.',
  },
  {
    slug: 'social-commerce-2025-review',
    scene: 'A large ceramic calendar or yearbook page for 2025, lying open. Key milestones are marked with glowing teal pins placed at various months. Each pin connects via signal lines to a miniature scene: a play button logo, a phone with DMs, a live stream icon, a checkout link. The year is visualized as a journey of growth.',
  },
  {
    slug: 'holiday-winners-common-thread',
    scene: 'A row of five miniature storefronts. Four are gray, quiet, with few customers and dim windows. The center one glows teal with active chat bubbles streaming from the door, customer figures approaching, and a visible revenue graph climbing on a small display. A glowing teal thread literally connects through all the active elements.',
  },
  {
    slug: 'social-commerce-predictions-2026',
    scene: 'A crystal ball or futuristic lens sitting on a ceramic pedestal, glowing teal from within. Inside the transparent sphere, five tiny scenes are visible: an AI chat interface, a rising graph, a live stream setup, a social revenue dashboard, and a conversation commerce flow. Stars and prediction sparkles float around it.',
  },
  {
    slug: 'premium-brands-tiktok',
    scene: 'Luxury brand elements — elegant product packaging, premium ceramic boxes with gold trim, high-end shopping bags — arranged in a semicircle around a phone screen that glows teal. Subtle signal lines draw the premium items toward the screen. The premium items maintain their elegance while being attracted to social.',
  },
  {
    slug: 'cost-ignoring-social-conversations',
    scene: 'A large ceramic bucket receiving coins and revenue from social engagement at the top, but leaking badly through cracks at the bottom. Each crack is shaped like an unread message icon or ignored chat bubble. The lost revenue flows away into a drain. The waste is visually dramatic as most of what goes in leaks right out.',
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

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable.');
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey });

const getImagePart = (response: Awaited<ReturnType<typeof ai.models.generateContent>>) => {
  for (const candidate of response.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      if (part.inlineData?.data) {
        return part.inlineData;
      }
    }
  }
  throw new Error('Gemini returned no image data.');
};

const generateImage = async ({ slug, scene }: BlogImageSpec, index: number) => {
  const prompt = `${scene} ${BASE_STYLE}`;
  const finalPath = join(OUTPUT_DIR, `${slug}.png`);

  console.log(`[${index + 1}/${imageSpecs.length}] Generating: ${slug}...`);

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
  writeFileSync(finalPath, Buffer.from(imagePart.data ?? '', 'base64'));
  console.log(`  Done: ${finalPath}`);
  return { slug, finalPath };
};

const main = async () => {
  console.log(`Generating ${imageSpecs.length} Signal Worlds blog images...\n`);

  const results = [];
  for (let i = 0; i < imageSpecs.length; i++) {
    try {
      results.push(await generateImage(imageSpecs[i], i));
    } catch (err: any) {
      console.error(`  Failed: ${imageSpecs[i].slug} — ${err.message}`);
      if (err.message?.includes('429') || err.message?.includes('rate') || err.message?.includes('Resource')) {
        console.log('  Waiting 15s for rate limit...');
        await new Promise(r => setTimeout(r, 15000));
        try {
          results.push(await generateImage(imageSpecs[i], i));
        } catch (retryErr: any) {
          console.error(`  Retry failed: ${imageSpecs[i].slug} — ${retryErr.message}`);
        }
      }
    }
    if (i < imageSpecs.length - 1) {
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\nDone. Generated ${results.length}/${imageSpecs.length} images.`);
};

await main();
