import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';

const OUTPUT_DIR = '/Users/michaelbroughton/conductor/workspaces/newsite/budapest/public/blog';

const blogImageSpecs = [
  {
    slug: 'tiktok-halo-effect',
    seed: 42,
    prompt: [
      'A central smartphone standing upright like a monolith, its screen showing abstract video and shopping icons.',
      'Glowing teal signal lines radiate outward from the phone to three miniature storefront dioramas arranged in a semicircle: a small shipping box warehouse, a boutique shopping bag shop, and a wholesale shelf display.',
      'Each storefront glows brighter where the signal lines connect. Golden coins and small revenue bars cascade from the storefronts, not from the phone.',
      'A small lightning bolt sits at the intersection of two signal paths.',
      '3D isometric diorama scene, miniature world, matte clay and ceramic material textures, dark navy background (#0a0f1a), teal (#14b8a6) glowing accents, warm coral highlights, soft diffused studio lighting, gentle tilt-shift depth of field, editorial illustration style, no text, no people, no photorealism, high detail, 16:9 aspect ratio',
    ].join(' '),
  },
  {
    slug: 'tiktok-premium-play',
    seed: 77,
    prompt: [
      'A miniature luxury boutique storefront with elegant frosted glass display cases and warm interior lighting, being carefully lowered by a small crane with teal glowing cables into a vibrant but chaotic market plaza.',
      'The surrounding market stalls have colorful but inexpensive-looking items stacked haphazardly.',
      'The boutique glows with warm coral lighting and stands taller than the surrounding stalls.',
      'Floating notification badges and small teal signal lines connect the boutique to a glowing phone screen in the background.',
      'A small lightning bolt ornament sits on top of the boutique roof.',
      '3D isometric diorama scene, miniature world, matte clay and ceramic material textures, dark navy background (#0a0f1a), teal (#14b8a6) glowing accents, warm coral highlights, soft diffused studio lighting, gentle tilt-shift depth of field, editorial illustration style, no text, no people, no photorealism, high detail, 16:9 aspect ratio',
    ].join(' '),
  },
];

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

mkdirSync(OUTPUT_DIR, { recursive: true });
const ai = new GoogleGenAI({ apiKey });

const getImagePart = (response) => {
  for (const candidate of response.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      if (part.inlineData?.data) return part.inlineData;
    }
  }
  throw new Error('Gemini returned no image data.');
};

for (const spec of blogImageSpecs) {
  console.log(`Generating ${spec.slug}...`);
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ role: 'user', parts: [{ text: spec.prompt }] }],
    config: {
      responseModalities: ['Image'],
      imageConfig: { aspectRatio: '16:9' },
      seed: spec.seed,
    },
  });

  const imagePart = getImagePart(response);
  const ext = imagePart.mimeType === 'image/jpeg' ? 'jpg' : imagePart.mimeType === 'image/webp' ? 'webp' : 'png';
  const finalPath = join(OUTPUT_DIR, `${spec.slug}.${ext}`);
  writeFileSync(finalPath, Buffer.from(imagePart.data ?? '', 'base64'));
  console.log(`Saved: ${finalPath}`);
}
console.log('Done!');
