import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { GoogleGenAI } from '@google/genai';

type MascotSpec = {
  slug: string;
  seed: number;
  prompt: string;
};

const OUTPUT_DIR = join(process.cwd(), 'public', 'mascots');
const RAW_DIR = join(process.cwd(), '.context', 'generated', 'mascots');
const REFERENCE_IMAGE_PATH = join(process.cwd(), 'public', 'blog', 'live-commerce.png');
const POST_PROCESSOR_PATH = join(process.cwd(), 'scripts', 'remove-white-background.py');

const mascotSpecs: MascotSpec[] = [
  {
    slug: 'hero-sitter',
    seed: 17,
    prompt: [
      'Using the provided reference image only for the material language and shape language of the tiny audience figures, create one isolated mascot character.',
      'The mascot is a soft matte gray clay listener blob with a rounded head, tiny arms, and tiny legs.',
      'Pose: seated casually on an invisible ledge, both legs hanging over the edge, one hand planted behind the body for balance, the other hand resting on the ledge.',
      'Mood: curious, friendly, understated.',
      'Style: miniature tactile 3D maquette, ceramic and clay finish, subtle teal rim light, extremely clean silhouette, no facial details, no props.',
      'Composition: full body visible, centered, generous whitespace, pure white seamless studio background, no border, no text, no cast shadow, sticker-like asset for website use.',
    ].join(' '),
  },
  {
    slug: 'hero-peer',
    seed: 31,
    prompt: [
      'Using the provided reference image only for the material language and shape language of the tiny audience figures, create one isolated mascot character.',
      'The mascot is a soft matte gray clay listener blob with a rounded head, tiny arms, and tiny legs.',
      'Pose: standing on an invisible ledge, leaning forward, one arm pointing downward over the edge, the other arm slightly back for balance, as if peeking down to inspect something below.',
      'Mood: playful, observant, understated.',
      'Style: miniature tactile 3D maquette, ceramic and clay finish, subtle teal rim light, extremely clean silhouette, no facial details, no props.',
      'Composition: full body visible, centered, generous whitespace, pure white seamless studio background, no border, no text, no cast shadow, sticker-like asset for website use.',
    ].join(' '),
  },
];

const apiKey = process.env.GEMINI_API_KEY ?? process.env.Google_Gemini_Key ?? process.env.Gemini_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API key. Set GEMINI_API_KEY, Google_Gemini_Key, or Gemini_API_KEY before running generate:mascots.');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(RAW_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey });
const referenceImageBase64 = readFileSync(REFERENCE_IMAGE_PATH, { encoding: 'base64' });

const extensionForMimeType = (mimeType?: string) => {
  if (mimeType === 'image/jpeg') return 'jpg';
  if (mimeType === 'image/webp') return 'webp';
  return 'png';
};

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

const generateMascot = async ({ slug, seed, prompt }: MascotSpec) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/png',
              data: referenceImageBase64,
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: ['Image'],
      imageConfig: {
        aspectRatio: '1:1',
        imageSize: '1K',
      },
      seed,
    },
  });

  const imagePart = getImagePart(response);
  const extension = extensionForMimeType(imagePart.mimeType);
  const rawPath = join(RAW_DIR, `${slug}-raw.${extension}`);
  const finalPath = join(OUTPUT_DIR, `${slug}.png`);

  writeFileSync(rawPath, Buffer.from(imagePart.data ?? '', 'base64'));

  execFileSync('python3', [POST_PROCESSOR_PATH, rawPath, finalPath], {
    stdio: 'inherit',
  });

  return {
    slug,
    rawPath,
    finalPath,
    prompt,
  };
};

const main = async () => {
  const results = [];

  for (const mascotSpec of mascotSpecs) {
    console.log(`Generating ${mascotSpec.slug}...`);
    results.push(await generateMascot(mascotSpec));
  }

  const manifestPath = join(RAW_DIR, 'manifest.json');
  writeFileSync(manifestPath, JSON.stringify(results, null, 2));

  console.log(`Generated ${results.length} mascot assets.`);
  console.log(`Final assets: ${basename(results[0].finalPath)} and ${basename(results[1].finalPath)}`);
};

await main();
