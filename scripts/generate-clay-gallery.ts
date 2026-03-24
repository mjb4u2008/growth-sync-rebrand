import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { GoogleGenAI } from '@google/genai';

type ClaySpec = {
  slug: string;
  title: string;
  prompt: string;
  seed: number;
};

const apiKey = process.env.GEMINI_API_KEY ?? process.env.Google_Gemini_Key ?? process.env.Gemini_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API key. Set GEMINI_API_KEY, Google_Gemini_Key, or Gemini_API_KEY before running generate:clay-gallery.');
}

const OUTPUT_DIR = join(process.cwd(), 'public', 'mascots', 'clay');
const RAW_DIR = join(process.cwd(), '.context', 'generated', 'clay-gallery');
const POST_PROCESSOR_PATH = join(process.cwd(), 'scripts', 'remove-white-background.py');
const MODEL = 'gemini-2.5-flash-image';

const referencePaths = [
  join(process.cwd(), 'public', 'mascots', 'hero-sitter.png'),
  join(process.cwd(), 'public', 'mascots', 'hero-peer.png'),
];

const specs: ClaySpec[] = [
  {
    slug: 'wave',
    title: 'Waver',
    seed: 101,
    prompt: [
      'Match the exact Clay Listeners character design from the provided reference images.',
      'Treat the reference images as the canonical character sheet and preserve the same identity across every proportion.',
      'Keep the same oversized smooth oval head, slim slightly tapered torso, narrow shoulders, narrow arms, narrow rounded legs, matte gray clay material, and subtle teal rim light.',
      'Do not redesign the mascot. Only change the pose.',
      'Create one isolated full-body mascot standing upright and giving a small calm wave with one arm lifted and the other relaxed.',
      'Keep the hand minimal and simple, not mitten-like, not oversized.',
      'The character should feel calm, observant, and friendly, not goofy.',
      'Pure white seamless background, centered, no props, no platform, no pedestal, no environment, sticker-like website asset.',
      'No chubby body, no wide torso, no squat stance, no plush toy proportions, no inflated toy look, no babyish proportions, no facial features, no clothes, no accessories, no glossy plastic.',
    ].join(' '),
  },
  {
    slug: 'peeker',
    title: 'Peeker',
    seed: 102,
    prompt: [
      'Match the exact Clay Listeners character design from the provided reference images.',
      'Treat the reference images as the canonical character sheet and preserve the same identity across every proportion.',
      'Keep the same oversized smooth oval head, slim slightly tapered torso, narrow shoulders, narrow arms, narrow rounded legs, matte gray clay material, and subtle teal rim light.',
      'Do not redesign the mascot. Only change the pose.',
      'Create one isolated mascot cropped around the upper body, leaning forward curiously as if peeking below the frame with both hands extended downward.',
      'Do not render any literal card edge, ledge, bar, table, or white shape in front of the character.',
      'The character should feel understated and observant.',
      'Pure white seamless background, centered, no props, no visible edge, no visible ledge, no platform, no pedestal, no environment, sticker-like website asset.',
      'No chubby body, no wide torso, no squat stance, no plush toy proportions, no inflated toy look, no babyish proportions, no facial features, no clothes, no accessories, no glossy plastic.',
    ].join(' '),
  },
  {
    slug: 'thinker',
    title: 'Thinker',
    seed: 103,
    prompt: [
      'Match the exact Clay Listeners character design from the provided reference images.',
      'Treat the reference images as the canonical character sheet and preserve the same identity across every proportion.',
      'Keep the same oversized smooth oval head, slim slightly tapered torso, narrow shoulders, narrow arms, narrow rounded legs, matte gray clay material, and subtle teal rim light.',
      'Do not redesign the mascot. Only change the pose.',
      'Create one isolated mascot in a thoughtful seated pose with one hand touching its chin.',
      'Keep the body slim and elegant even while seated. Do not let the torso bunch up or become bundled, plush, or wide.',
      'The character should feel quiet, thoughtful, and premium.',
      'Pure white seamless background, centered, no props, no platform, no pedestal, no environment, sticker-like website asset.',
      'No chubby body, no wide torso, no squat stance, no plush toy proportions, no inflated toy look, no babyish proportions, no facial features, no clothes, no accessories, no glossy plastic.',
    ].join(' '),
  },
];

mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(RAW_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey });
const referenceParts = referencePaths.map((path) => ({
  inlineData: {
    mimeType: 'image/png',
    data: readFileSync(path, 'base64'),
  },
}));

const saveGenerated = async (spec: ClaySpec) => {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: 'user',
        parts: [{ text: spec.prompt }, ...referenceParts],
      },
    ],
    config: {
      responseModalities: ['Image'],
      imageConfig: {
        aspectRatio: '1:1',
        imageSize: '1K',
      },
      seed: spec.seed,
    },
  });

  const imagePart = response.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .find((part) => part.inlineData?.data)?.inlineData;

  if (!imagePart?.data) {
    throw new Error(`Gemini returned no image data for ${spec.slug}`);
  }

  const rawPath = join(RAW_DIR, `${spec.slug}-raw.png`);
  const finalPath = join(OUTPUT_DIR, `${spec.slug}.png`);

  writeFileSync(rawPath, Buffer.from(imagePart.data, 'base64'));
  execFileSync('python3', [POST_PROCESSOR_PATH, rawPath, finalPath], { stdio: 'inherit' });

  return {
    ...spec,
    image: `/mascots/clay/${spec.slug}.png`,
  };
};

const main = async () => {
  const manifest = [];

  for (const spec of specs) {
    console.log(`Generating ${spec.slug}...`);
    manifest.push(await saveGenerated(spec));
  }

  writeFileSync(join(RAW_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Clay gallery assets generated.');
};

await main();
