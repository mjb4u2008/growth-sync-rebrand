import type { ReactNode } from 'react';
import { ArrowUpRight, Download, FileArchive, Palette, Type } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

type DownloadItem = {
  label: string;
  href: string;
  external?: boolean;
};

type AssetCard = {
  title: string;
  description: string;
  usage: string;
  previewAlt: string;
  previewHref: string;
  previewSurface: 'light' | 'dark';
  previewClassName?: string;
  downloads: DownloadItem[];
};

type ColorToken = {
  name: string;
  role: string;
  value: string;
  variable: string;
  note: string;
};

type TypeToken = {
  name: string;
  role: string;
  family: string;
  weights: string;
  sample: string;
  href: string;
};

const brandAssets: AssetCard[] = [
  {
    title: 'The mark',
    description: 'Use the symbol for avatars, favicons, social profile images, and tight placements where the full lockup will feel cramped.',
    usage: 'Best for compact placements and profile surfaces.',
    previewAlt: 'GrowthSync brand mark',
    previewHref: '/brand/growthsync-mark.svg',
    previewSurface: 'light',
    previewClassName: 'h-28 w-28 md:h-32 md:w-32',
    downloads: [
      { label: 'Download SVG', href: '/brand/growthsync-mark.svg' },
    ],
  },
  {
    title: 'The wordmark',
    description: 'Use the name by itself when the audience already knows the brand or when the mark appears elsewhere in the layout.',
    usage: 'Best for headers, presentations, and partner pages.',
    previewAlt: 'GrowthSync wordmark',
    previewHref: '/brand/growthsync-wordmark.svg',
    previewSurface: 'light',
    previewClassName: 'h-10 w-auto md:h-12',
    downloads: [
      { label: 'Dark SVG', href: '/brand/growthsync-wordmark.svg' },
      { label: 'Light SVG', href: '/brand/growthsync-wordmark-light.svg' },
    ],
  },
  {
    title: 'The lockup',
    description: 'Use the full logo lockup on first mention, landing pages, PR placements, and anywhere you want the mark and name to travel together.',
    usage: 'Best for press, partner, and campaign placements.',
    previewAlt: 'GrowthSync full lockup',
    previewHref: '/brand/growthsync-lockup.svg',
    previewSurface: 'dark',
    previewClassName: 'h-12 w-auto md:h-14',
    downloads: [
      { label: 'Dark SVG', href: '/brand/growthsync-lockup.svg' },
      { label: 'Light SVG', href: '/brand/growthsync-lockup-light.svg' },
    ],
  },
];

const colorTokens: ColorToken[] = [
  {
    name: 'Graphite',
    role: 'Primary',
    value: '#030712',
    variable: '--brand-graphite',
    note: 'Core mark fill, primary text, and high-contrast moments.',
  },
  {
    name: 'Teal',
    role: 'Secondary',
    value: '#14B8A6',
    variable: '--brand-teal',
    note: 'Primary action color and system highlight.',
  },
  {
    name: 'Cyan',
    role: 'Secondary',
    value: '#06B6D4',
    variable: '--brand-cyan',
    note: 'Supporting accent for product and motion-led treatments.',
  },
  {
    name: 'Violet',
    role: 'Accent',
    value: '#8B5CF6',
    variable: '--brand-violet',
    note: 'Headline gradient start and expressive brand moments.',
  },
  {
    name: 'Pink',
    role: 'Accent',
    value: '#EC4899',
    variable: '--brand-pink',
    note: 'Headline gradient finish and campaign-led energy.',
  },
  {
    name: 'Cloud',
    role: 'Surface',
    value: '#F9FAFB',
    variable: '--brand-cloud',
    note: 'Soft background surface for cards, kits, and product framing.',
  },
];

const typeTokens: TypeToken[] = [
  {
    name: 'Outfit',
    role: 'Display',
    family: '"Outfit", ui-sans-serif, system-ui, sans-serif',
    weights: '500, 600, 700, 800, 900',
    sample: 'GrowthSync turns social noise into revenue.',
    href: 'https://fonts.google.com/specimen/Outfit',
  },
  {
    name: 'Inter',
    role: 'Body',
    family: '"Inter", ui-sans-serif, system-ui, sans-serif',
    weights: '300, 400, 500, 600',
    sample: 'Use Inter for supporting copy, UI labels, and dense information.',
    href: 'https://fonts.google.com/specimen/Inter',
  },
];

const usageNotes = [
  'Lead with the full lockup on first mention. After that, the mark or wordmark can stand alone.',
  'Keep generous breathing room around the mark. A safe minimum is about the height of the bolt container.',
  'Keep the mark upright, sharp, and unmodified. Do not stretch it, recolor it arbitrarily, or add effects.',
  'Use the violet-to-pink gradient sparingly. It works best on hero headlines and statement moments, not dense UI.',
];

const companyDetails = [
  {
    label: 'Company',
    value: 'GrowthSync',
  },
  {
    label: 'Website',
    value: 'growthsync.com',
    href: 'https://growthsync.com',
  },
  {
    label: 'Category',
    value: 'Conversational AI for social commerce',
  },
  {
    label: 'Contact',
    value: 'hello@growthsync.com',
    href: 'mailto:hello@growthsync.com',
  },
];

function DownloadLink({ href, external = false, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      download={external ? undefined : true}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-950"
    >
      {external ? <ArrowUpRight className="h-4 w-4" /> : <Download className="h-4 w-4" />}
      {children}
    </a>
  );
}

function AssetPreview({ asset }: { asset: AssetCard }) {
  const surfaceClassName = asset.previewSurface === 'dark'
    ? 'dark-card border border-gray-900/80 text-white'
    : 'border border-gray-200/80 bg-white text-gray-950';

  return (
    <div className={`flex min-h-[220px] items-center justify-center overflow-hidden rounded-[28px] p-6 ${surfaceClassName}`}>
      <img
        src={asset.previewHref}
        alt={asset.previewAlt}
        className={`max-w-full object-contain ${asset.previewClassName ?? 'h-14 w-auto'}`}
      />
    </div>
  );
}

export default function BrandKit() {
  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>Brand Kit | GrowthSync</title>
        <meta
          name="description"
          content="Download the official GrowthSync brand kit, including logo assets, wordmarks, colors, typography, and brand usage notes."
        />
        <link rel="canonical" href="https://growthsync.com/brand" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growthsync.com/brand" />
        <meta property="og:title" content="Brand Kit | GrowthSync" />
        <meta
          property="og:description"
          content="Download the official GrowthSync brand kit, including logo assets, wordmarks, colors, typography, and brand usage notes."
        />
        <meta property="og:image" content="https://growthsync.com/growthsync-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 gradient-mesh" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-12">
          <section className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 backdrop-blur-sm">
                <Palette className="h-3.5 w-3.5 text-teal-600" />
                Brand Kit
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-display font-bold tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
                Everything Rod needs, in one clean download-first page.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                This is the official GrowthSync brand kit for press, partner pages, outbound campaigns, paid social, and setup flows like Google Pixel or LinkedIn DM tooling. The mark, wordmark, lockup, colors, and typography all live here, with direct downloads.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/brand/growthsync-brand-kit.zip"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  <FileArchive className="h-4 w-4" />
                  Download full brand kit
                </a>
                <a
                  href="#logos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-950"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Jump to assets
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[36px] border border-gray-900/90 bg-gray-950 p-8 text-white shadow-[0_40px_120px_rgba(2,6,23,0.25)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.18),transparent_30%)]" />
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Official Assets</p>
                <img
                  src="/brand/growthsync-lockup-light.svg"
                  alt="GrowthSync lockup on dark surface"
                  className="mt-10 h-10 w-auto md:h-12"
                />

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Files</p>
                    <p className="mt-3 font-display text-3xl font-bold text-white">9</p>
                    <p className="mt-2 text-sm text-white/70">Logos, tokens, palette, specimen, and guide.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Type</p>
                    <p className="mt-3 font-display text-3xl font-bold text-white">2</p>
                    <p className="mt-2 text-sm text-white/70">Outfit for display, Inter for body and UI.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Contact</p>
                    <p className="mt-3 font-display text-2xl font-bold text-white">hello@</p>
                    <p className="mt-2 text-sm text-white/70">Need anything custom, press-ready, or resized.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="section-divider mt-16 md:mt-20" />

          <section id="logos" className="pt-16 md:pt-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-600">Logos</p>
                <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-gray-950 md:text-5xl">
                  The mark, the wordmark, and the full lockup.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  The essentials live up front, like the best brand pages do. Each asset has a direct download, and the lockup ships in both dark and light treatments so it drops into decks, docs, and campaign pages cleanly.
                </p>
              </div>

              <DownloadLink href="/brand/growthsync-brand-guide.txt">Download brand guide</DownloadLink>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {brandAssets.map((asset) => (
                <article key={asset.title} className="rounded-[32px] border border-gray-200 bg-gray-50/70 p-5 md:p-6">
                  <AssetPreview asset={asset} />
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">{asset.usage}</p>
                  <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-gray-950">{asset.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">{asset.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {asset.downloads.map((download) => (
                      <DownloadLink key={download.label} href={download.href} external={download.external}>
                        {download.label}
                      </DownloadLink>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pt-16 md:pt-20">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-[36px] border border-gray-200 bg-white p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-600">Colors</p>
                    <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-gray-950 md:text-5xl">
                      Core brand colors, plus the expressive accents.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                      GrowthSync mostly lives in graphite, white, and teal. The violet-to-pink range is for selective energy, not everyday UI noise.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <DownloadLink href="/brand/growthsync-color-palette.svg">Palette SVG</DownloadLink>
                    <DownloadLink href="/brand/growthsync-brand-tokens.json">Tokens JSON</DownloadLink>
                    <DownloadLink href="/brand/growthsync-brand-tokens.css">Tokens CSS</DownloadLink>
                  </div>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {colorTokens.map((token) => (
                    <div key={token.name} className="overflow-hidden rounded-[28px] border border-gray-200 bg-gray-50">
                      <div className="h-28" style={{ backgroundColor: token.value }} />
                      <div className="space-y-3 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">{token.role}</p>
                            <h3 className="mt-2 text-xl font-display font-bold text-gray-950">{token.name}</h3>
                          </div>
                          <code className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600">{token.value}</code>
                        </div>
                        <code className="block text-xs font-semibold text-teal-700">{token.variable}</code>
                        <p className="text-sm leading-relaxed text-gray-600">{token.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[36px] border border-gray-200 bg-gray-50/70 p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-600">Use It Right</p>
                <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-gray-950">A few rules keep it clean.</h2>
                <div className="mt-8 space-y-4">
                  {usageNotes.map((note) => (
                    <div key={note} className="rounded-[24px] border border-gray-200 bg-white p-5">
                      <p className="text-sm leading-relaxed text-gray-600 md:text-base">{note}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="pt-16 md:pt-20">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="rounded-[36px] border border-gray-200 bg-white p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-600">Typography</p>
                    <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-gray-950 md:text-5xl">
                      Two fonts. Clear jobs.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                      Outfit carries the brand voice. Inter keeps the product and supporting copy sharp, readable, and fast.
                    </p>
                  </div>

                  <DownloadLink href="/brand/growthsync-typography-specimen.svg">Download specimen</DownloadLink>
                </div>

                <div className="mt-10 grid gap-6">
                  {typeTokens.map((token) => (
                    <div key={token.name} className="rounded-[28px] border border-gray-200 bg-gray-50/70 p-6">
                      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">{token.role}</p>
                          <h3 className="mt-3 text-2xl font-display font-bold text-gray-950">{token.name}</h3>
                          <code className="mt-3 block max-w-full overflow-x-auto text-xs font-semibold text-teal-700">{token.family}</code>
                          <p className="mt-3 text-sm text-gray-500">Weights: {token.weights}</p>
                        </div>

                        <DownloadLink href={token.href} external>
                          Open source font
                        </DownloadLink>
                      </div>

                      <div className="mt-8 rounded-[24px] border border-gray-200 bg-white p-6">
                        <p className={token.role === 'Display' ? 'font-display text-3xl font-bold text-gray-950 md:text-5xl' : 'text-lg leading-relaxed text-gray-700 md:text-2xl'}>
                          {token.sample}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[36px] border border-gray-200 bg-gray-950 p-6 text-white md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Type className="h-5 w-5 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">At A Glance</p>
                    <h2 className="mt-1 text-3xl font-display font-bold tracking-tight text-white">Quick company details.</h2>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {companyDetails.map((detail) => (
                    <div key={detail.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{detail.label}</p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          target={detail.href.startsWith('http') ? '_blank' : undefined}
                          rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-teal-300"
                        >
                          {detail.value}
                          {detail.href.startsWith('http') && <ArrowUpRight className="h-4 w-4" />}
                        </a>
                      ) : (
                        <p className="mt-3 text-lg font-semibold text-white">{detail.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Need Everything In One File?</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Grab the bundled zip if you want the lockups, tokens, palette sheet, specimen, and usage guide in one pass.
                  </p>
                  <a
                    href="/brand/growthsync-brand-kit.zip"
                    download
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-gray-100"
                  >
                    <FileArchive className="h-4 w-4" />
                    Download bundled zip
                  </a>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
