import { useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileArchive,
  Mail,
  Palette,
  X,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

type DownloadItem = {
  label: string;
  href: string;
  external?: boolean;
};

type SectionLink = {
  id: string;
  label: string;
};

type AssetCard = {
  title: string;
  description: string;
  usage: string;
  previewAlt: string;
  previewHref: string;
  previewSurface: 'paper' | 'soft' | 'ink';
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

type RuleGroup = {
  title: string;
  tone: 'do' | 'dont';
  items: string[];
};

const sectionLinks: SectionLink[] = [
  { id: 'logos', label: 'Logos' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'usage', label: 'Usage' },
];

const heroDownloads: DownloadItem[] = [
  { label: 'Download full brand kit', href: '/brand/growthsync-brand-kit.zip' },
  { label: 'Logo lockups', href: '#logos' },
  { label: 'Brand tokens', href: '/brand/growthsync-brand-tokens.json' },
  { label: 'Brand guide', href: '/brand/growthsync-brand-guide.txt' },
];

const brandAssets: AssetCard[] = [
  {
    title: 'Full lockup',
    description:
      'Use the lockup for first mention, press placements, decks, partner pages, and anywhere the mark and name should travel together.',
    usage: 'Preferred in editorial and partner contexts.',
    previewAlt: 'GrowthSync full lockup',
    previewHref: '/brand/growthsync-lockup-light.svg',
    previewSurface: 'ink',
    previewClassName: 'h-10 w-auto md:h-12',
    downloads: [
      { label: 'Dark SVG', href: '/brand/growthsync-lockup.svg' },
      { label: 'Light SVG', href: '/brand/growthsync-lockup-light.svg' },
    ],
  },
  {
    title: 'Wordmark',
    description:
      'Use the wordmark when the surrounding layout already establishes the brand or when the mark appears elsewhere on the page.',
    usage: 'Best for headers, press mentions, and product-adjacent layouts.',
    previewAlt: 'GrowthSync wordmark',
    previewHref: '/brand/growthsync-wordmark.svg',
    previewSurface: 'paper',
    previewClassName: 'h-9 w-auto md:h-10',
    downloads: [
      { label: 'Dark SVG', href: '/brand/growthsync-wordmark.svg' },
      { label: 'Light SVG', href: '/brand/growthsync-wordmark-light.svg' },
    ],
  },
  {
    title: 'Mark',
    description:
      'Use the mark for avatars, favicons, app surfaces, social profiles, and tight placements where the full name would feel cramped.',
    usage: 'Best for compact placements and icon-led surfaces.',
    previewAlt: 'GrowthSync brand mark',
    previewHref: '/brand/growthsync-mark.svg',
    previewSurface: 'soft',
    previewClassName: 'h-24 w-24 md:h-28 md:w-28',
    downloads: [{ label: 'Download SVG', href: '/brand/growthsync-mark.svg' }],
  },
];

const colorTokens: ColorToken[] = [
  {
    name: 'Graphite',
    role: 'Primary',
    value: '#030712',
    variable: '--brand-graphite',
    note: 'Primary mark fill, headline color, and highest-contrast UI moments.',
  },
  {
    name: 'Teal',
    role: 'Primary',
    value: '#14B8A6',
    variable: '--brand-teal',
    note: 'Primary action tone and the main system accent across the site.',
  },
  {
    name: 'Cyan',
    role: 'Secondary',
    value: '#06B6D4',
    variable: '--brand-cyan',
    note: 'Support tone for product movement, gradients, and system highlights.',
  },
  {
    name: 'Violet',
    role: 'Accent',
    value: '#8B5CF6',
    variable: '--brand-violet',
    note: 'Headline gradient start and selective statement moments.',
  },
  {
    name: 'Pink',
    role: 'Accent',
    value: '#EC4899',
    variable: '--brand-pink',
    note: 'Headline gradient finish and campaign-led emphasis.',
  },
  {
    name: 'Cloud',
    role: 'Surface',
    value: '#F9FAFB',
    variable: '--brand-cloud',
    note: 'Soft canvas for cards, surfaces, and presentation-friendly sections.',
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
    sample: 'Inter carries the product UI, supporting copy, and information-dense moments.',
    href: 'https://fonts.google.com/specimen/Inter',
  },
];

const ruleGroups: RuleGroup[] = [
  {
    title: 'Do',
    tone: 'do',
    items: [
      'Lead with the full lockup on first mention, then use the wordmark or mark where space is tighter.',
      'Keep clear space around the logo. It should feel calm and expensive, never crowded.',
      'Use graphite, white, and teal as the system foundation. Save the violet-to-pink gradient for statement moments.',
      'Keep your own branding larger and more prominent when mentioning GrowthSync alongside another company.',
    ],
  },
  {
    title: "Don't",
    tone: 'dont',
    items: [
      'Do not stretch, rotate, outline, shadow, or recolor the mark.',
      'Do not use the accent gradient as a default fill for dense interface elements.',
      'Do not combine the mark with other graphic elements to invent a new logo lockup.',
      'Do not imply endorsement, partnership, or official affiliation without permission.',
    ],
  },
];

const companyFacts = [
  { label: 'Company', value: 'GrowthSync' },
  { label: 'Website', value: 'growthsync.com', href: 'https://growthsync.com' },
  { label: 'Category', value: 'Conversational AI for social commerce' },
  { label: 'Contact', value: 'hello@growthsync.com', href: 'mailto:hello@growthsync.com' },
];

function DownloadLink({
  href,
  external = false,
  children,
  tone = 'light',
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  tone?: 'light' | 'dark' | 'subtle';
}) {
  const toneClassName = tone === 'dark'
    ? 'border border-gray-950 bg-gray-950 text-white hover:bg-gray-800'
    : tone === 'subtle'
      ? 'border border-gray-200 bg-transparent text-gray-700 hover:border-gray-300 hover:text-gray-950'
      : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:text-gray-950';

  return (
    <a
      href={href}
      download={external ? undefined : true}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${toneClassName}`}
    >
      {external ? <ArrowUpRight className="h-4 w-4" /> : <Download className="h-4 w-4" />}
      {children}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="lg:sticky lg:top-28">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-gray-950 md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-gray-600 md:text-lg">
        {description}
      </p>
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

function AssetPreview({ asset }: { asset: AssetCard }) {
  const surfaceClassName = asset.previewSurface === 'ink'
    ? 'dark-card border border-gray-950/80 text-white'
    : asset.previewSurface === 'soft'
      ? 'border border-gray-200 bg-gray-50 text-gray-950'
      : 'border border-gray-200 bg-white text-gray-950';

  return (
    <div className={`flex min-h-[220px] items-center justify-center overflow-hidden rounded-[28px] p-8 ${surfaceClassName}`}>
      <img
        src={asset.previewHref}
        alt={asset.previewAlt}
        className={`max-w-full object-contain ${asset.previewClassName ?? 'h-12 w-auto'}`}
      />
    </div>
  );
}

export default function BrandKit() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = async (value: string) => {
    if (!navigator.clipboard?.writeText) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      window.setTimeout(() => {
        setCopiedValue((currentValue) => (currentValue === value ? null : currentValue));
      }, 1400);
    } catch {
      // Ignore clipboard failures and keep the page usable.
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>Brand Kit | GrowthSync</title>
        <meta
          name="description"
          content="Official GrowthSync brand kit and press resources, including approved logos, brand colors, typography, and usage guidance."
        />
        <link rel="canonical" href="https://growthsync.com/brand" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growthsync.com/brand" />
        <meta property="og:title" content="Brand Kit | GrowthSync" />
        <meta
          property="og:description"
          content="Official GrowthSync brand kit and press resources, including approved logos, brand colors, typography, and usage guidance."
        />
        <meta property="og:image" content="https://growthsync.com/growthsync-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.08),transparent_32%),radial-gradient(circle_at_top_left,rgba(6,182,212,0.05),transparent_26%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-12">
          <section className="grid gap-12 border-b border-gray-200 pb-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16 md:pb-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                <Palette className="h-3.5 w-3.5 text-teal-600" />
                Official Brand Kit
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-display font-bold tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
                Official GrowthSync brand kit and press resources.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                Logos, color tokens, typography, and usage guidance for press, partner pages, platform setup, outbound campaigns, and anywhere GrowthSync shows up outside the product.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <DownloadLink href="/brand/growthsync-brand-kit.zip" tone="dark">
                  Download full brand kit
                </DownloadLink>
                <DownloadLink href="/brand/growthsync-brand-guide.txt" tone="subtle">
                  Download brand guide
                </DownloadLink>
              </div>

              <nav
                aria-label="Brand kit sections"
                className="mt-10 overflow-x-auto border-y border-gray-200"
              >
                <div className="flex min-w-max items-center gap-8 py-4">
                  {sectionLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className="text-sm font-semibold text-gray-500 transition-colors hover:text-gray-950"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            <aside className="h-fit rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(3,7,18,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Included</p>
              <img
                src="/brand/growthsync-lockup.svg"
                alt="GrowthSync lockup"
                className="mt-8 h-10 w-auto"
              />

              <div className="mt-8 space-y-3">
                {heroDownloads.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    download={item.href.startsWith('#') ? undefined : true}
                    className="flex items-center justify-between rounded-[22px] border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-950"
                  >
                    <span>{item.label}</span>
                    {item.href.startsWith('#') ? <ArrowUpRight className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                  </a>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-gray-200 pt-6">
                <div className="rounded-[22px] bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Logos</p>
                  <p className="mt-3 font-display text-3xl font-bold text-gray-950">3</p>
                </div>
                <div className="rounded-[22px] bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Colors</p>
                  <p className="mt-3 font-display text-3xl font-bold text-gray-950">6</p>
                </div>
              </div>

              <a
                href="mailto:hello@growthsync.com"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-950"
              >
                <Mail className="h-4 w-4" />
                hello@growthsync.com
              </a>
            </aside>
          </section>

          <section id="logos" className="grid gap-10 py-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 md:py-20">
            <SectionIntro
              eyebrow="Logos"
              title="The official marks."
              description="The best brand pages get the essentials out of the way fast. This section does the same, with the preferred lockup first and clean fallback variants below."
              actions={(
                <>
                  <DownloadLink href="/brand/growthsync-lockup.svg">Lockup SVG</DownloadLink>
                  <DownloadLink href="/brand/growthsync-mark.svg" tone="subtle">Mark SVG</DownloadLink>
                </>
              )}
            />

            <div className="space-y-5">
              {brandAssets.map((asset) => (
                <article key={asset.title} className="rounded-[32px] border border-gray-200 bg-white p-5 md:p-6">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                          {asset.usage}
                        </p>
                        <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-gray-950 md:text-3xl">
                          {asset.title}
                        </h3>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
                          {asset.description}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {asset.downloads.map((download) => (
                          <DownloadLink key={download.label} href={download.href} external={download.external}>
                            {download.label}
                          </DownloadLink>
                        ))}
                      </div>
                    </div>

                    <AssetPreview asset={asset} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="colors" className="grid gap-10 border-t border-gray-200 py-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 md:py-20">
            <SectionIntro
              eyebrow="Colors"
              title="A restrained core palette."
              description="Graphite, white, and teal do most of the work. Violet and pink are reserved for selective emphasis, not everyday interface noise."
              actions={(
                <>
                  <DownloadLink href="/brand/growthsync-brand-tokens.json">Tokens JSON</DownloadLink>
                  <DownloadLink href="/brand/growthsync-brand-tokens.css" tone="subtle">Tokens CSS</DownloadLink>
                </>
              )}
            />

            <div className="space-y-5">
              <article className="overflow-hidden rounded-[32px] border border-gray-200 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                  {colorTokens.map((token) => (
                    <div key={token.name} className="border-b border-gray-200 md:border-b-0 md:border-r last:border-r-0">
                      <div className="h-32" style={{ backgroundColor: token.value }} />
                      <div className="space-y-3 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">{token.role}</p>
                            <h3 className="mt-2 text-xl font-display font-bold text-gray-950">{token.name}</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(token.value)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-950"
                            aria-label={`Copy ${token.name} color value`}
                          >
                            {copiedValue === token.value ? <Check className="h-4 w-4 text-teal-600" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                        <code className="block text-xs font-semibold text-gray-600">{token.value}</code>
                        <code className="block text-xs font-semibold text-teal-700">{token.variable}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[32px] border border-gray-200 bg-gray-50 p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">Usage notes</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {colorTokens.map((token) => (
                    <div key={token.variable} className="rounded-[24px] border border-gray-200 bg-white p-5">
                      <p className="text-lg font-display font-bold text-gray-950">{token.name}</p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">{token.note}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section id="typography" className="grid gap-10 border-t border-gray-200 py-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 md:py-20">
            <SectionIntro
              eyebrow="Typography"
              title="Two fonts, clear roles."
              description="Outfit carries the brand voice. Inter handles interface labels, supporting paragraphs, and the dense moments that still need to feel polished."
              actions={(
                <>
                  <DownloadLink href="/brand/growthsync-typography-specimen.svg">Specimen</DownloadLink>
                  <DownloadLink href="https://fonts.google.com/specimen/Outfit" external tone="subtle">Font sources</DownloadLink>
                </>
              )}
            />

            <div className="space-y-5">
              {typeTokens.map((token) => (
                <article key={token.name} className="rounded-[32px] border border-gray-200 bg-white p-6 md:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">{token.role}</p>
                      <h3 className="mt-3 text-3xl font-display font-bold tracking-tight text-gray-950">
                        {token.name}
                      </h3>
                      <code className="mt-4 block max-w-full overflow-x-auto text-xs font-semibold text-teal-700">
                        {token.family}
                      </code>
                      <p className="mt-3 text-sm text-gray-500">Weights: {token.weights}</p>
                    </div>

                    <DownloadLink href={token.href} external tone="subtle">
                      Open font source
                    </DownloadLink>
                  </div>

                  <div className={`mt-8 rounded-[28px] border p-6 md:p-8 ${token.role === 'Display' ? 'border-gray-200 bg-gray-50' : 'border-gray-900 bg-gray-950 text-white'}`}>
                    <p className={token.role === 'Display' ? 'font-display text-4xl font-bold tracking-tight text-gray-950 md:text-6xl' : 'text-lg leading-relaxed text-white md:text-2xl'}>
                      {token.sample}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="usage" className="grid gap-10 border-t border-gray-200 py-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 md:py-20">
            <SectionIntro
              eyebrow="Usage"
              title="Simple rules, professional output."
              description="Use these rules to keep external placements clean, consistent, and unmistakably GrowthSync."
              actions={(
                <DownloadLink href="/brand/growthsync-brand-guide.txt">Plain-text guide</DownloadLink>
              )}
            />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="grid gap-5">
                {ruleGroups.map((group) => (
                  <article key={group.title} className="rounded-[32px] border border-gray-200 bg-white p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${group.tone === 'do' ? 'bg-teal-50 text-teal-700' : 'bg-rose-50 text-rose-700'}`}>
                        {group.tone === 'do' ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                          {group.tone === 'do' ? 'Preferred' : 'Avoid'}
                        </p>
                        <h3 className="mt-1 text-2xl font-display font-bold tracking-tight text-gray-950">
                          {group.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      {group.items.map((item) => (
                        <div key={item} className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                          <p className="text-sm leading-relaxed text-gray-600 md:text-base">{item}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <aside className="space-y-5">
                <article className="rounded-[32px] border border-gray-200 bg-gray-950 p-6 text-white md:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <FileArchive className="h-5 w-5 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Bundle</p>
                      <h3 className="mt-1 text-2xl font-display font-bold tracking-tight text-white">
                        Everything in one zip.
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-white/70">
                    Logos, tokens, palette sheet, typography specimen, and guide. One download, no hunting.
                  </p>

                  <a
                    href="/brand/growthsync-brand-kit.zip"
                    download
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-gray-100"
                  >
                    <FileArchive className="h-4 w-4" />
                    Download zip
                  </a>
                </article>

                <article className="rounded-[32px] border border-gray-200 bg-white p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Press facts</p>
                  <div className="mt-6 space-y-4">
                    {companyFacts.map((fact) => (
                      <div key={fact.label} className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">{fact.label}</p>
                        {fact.href ? (
                          <a
                            href={fact.href}
                            target={fact.href.startsWith('http') ? '_blank' : undefined}
                            rel={fact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-gray-950 transition-colors hover:text-teal-700"
                          >
                            {fact.value}
                            {fact.href.startsWith('http') ? <ArrowUpRight className="h-4 w-4" /> : null}
                          </a>
                        ) : (
                          <p className="mt-3 text-base font-semibold text-gray-950">{fact.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
