import type { ReactNode } from 'react';
import {
  Activity,
  ArrowRight,
  Bot,
  ChartColumnBig,
  CircleDashed,
  Layers3,
  MessageSquareMore,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Zap,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

type SlideProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  children: ReactNode;
};

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
};

type FounderCardProps = {
  name: string;
  role: string;
  image: string;
  bio: string;
  highlights: string[];
  accent: string;
  dark?: boolean;
};

const Slide = ({ eyebrow, title, accent, children }: SlideProps) => (
  <section className="deck-slide">
    <div className="deck-frame">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.16),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.12),_transparent_28%)] pointer-events-none" />
      <div className="relative flex h-full flex-col p-8 md:p-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-300/85">{eyebrow}</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-display font-bold tracking-tight text-white md:text-6xl">
              {title}
              {accent ? <span className="text-gradient-teal"> {accent}</span> : null}
            </h2>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 md:block">
            GrowthSync • Investor deck • March 2026
          </div>
        </div>

        <div className="relative flex-1">{children}</div>
      </div>
    </div>
  </section>
);

const StatCard = ({ label, value, detail }: StatCardProps) => (
  <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-md">
    <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/45">{label}</p>
    <p className="mt-3 text-4xl font-display font-bold text-white md:text-5xl">{value}</p>
    <p className="mt-3 text-sm leading-relaxed text-white/70">{detail}</p>
  </div>
);

const FounderCard = ({ name, role, image, bio, highlights, accent, dark = false }: FounderCardProps) => (
  <div className={`grid h-full grid-cols-[1.05fr_1fr] overflow-hidden rounded-[36px] border ${dark ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-white text-slate-950'} shadow-[0_32px_80px_rgba(15,23,42,0.18)]`}>
    <div className={`relative overflow-hidden ${dark ? 'bg-slate-950' : 'bg-slate-100'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_36%)]" />
      <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-85" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{role}</p>
        <h3 className="mt-2 text-4xl font-display font-bold text-white">{name}</h3>
      </div>
    </div>

    <div className="flex flex-col justify-between p-8 md:p-10">
      <div>
        <p className={`text-lg leading-relaxed ${dark ? 'text-white/76' : 'text-slate-600'}`}>{bio}</p>
      </div>

      <div className="mt-8 grid gap-3">
        {highlights.map((highlight) => (
          <div
            key={highlight}
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              dark
                ? 'border-white/10 bg-white/5 text-white/84'
                : 'border-slate-200 bg-slate-50 text-slate-700'
            }`}
          >
            {highlight}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InvestorDeck = () => {
  return (
    <>
      <Helmet>
        <title>GrowthSync Investor Deck | March 2026</title>
        <meta
          name="description"
          content="GrowthSync investor deck. A new brand-forward presentation aligned with the current site, product story, and visual system."
        />
      </Helmet>

      <main className="min-h-screen bg-[#020817] text-white">
        <div className="print-hidden sticky top-0 z-40 flex justify-center px-4 pt-4">
          <div className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-md">
            Designed for 16:9 export. Open [Print] and save as PDF for a shareable deck.
          </div>
        </div>

        <section className="deck-slide">
          <div className="deck-frame overflow-hidden bg-[#020817]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,_rgba(20,184,166,0.22),_transparent_24%),radial-gradient(circle_at_78%_18%,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(145deg,_#020817_0%,_#061221_50%,_#020617_100%)]" />
            <div className="absolute inset-0 grain opacity-80" />
            <div className="relative grid h-full grid-cols-[1.1fr_0.9fr] gap-10 p-10 md:p-14">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
                    <Zap className="h-3.5 w-3.5 text-teal-300" />
                    GrowthSync Investor Deck
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-[0_16px_40px_rgba(255,255,255,0.12)]">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold tracking-tight text-white">GrowthSync</p>
                      <p className="text-sm text-white/55">Updated brand deck • March 2026</p>
                    </div>
                  </div>

                  <h1 className="mt-10 max-w-3xl text-5xl font-display font-bold leading-[0.96] tracking-tight text-white md:text-8xl">
                    Every sales channel.
                    <span className="block text-gradient-teal">One operating system.</span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/72 md:text-2xl">
                    GrowthSync unifies Shopify, Amazon, TikTok Shop, customer conversations, and back-office operations into a single AI-powered system for modern multi-channel sellers.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[
                    'Unified dashboard',
                    'Intelligent inbox',
                    'Shipping + support',
                    'Revenue analytics',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm font-medium text-white/78 backdrop-blur-md">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <img
                  src="/mascots/hero-peer.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -left-6 top-8 z-20 w-32 rotate-6 drop-shadow-[0_28px_36px_rgba(0,0,0,0.32)]"
                />

                <div className="absolute inset-x-10 top-8 h-36 rounded-full bg-teal-400/16 blur-[90px]" />
                <div className="relative w-full rounded-[34px] border border-white/10 bg-slate-950/82 p-6 shadow-[0_40px_100px_rgba(2,6,23,0.7)] backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">Unified Dashboard</p>
                      <p className="mt-2 text-2xl font-display font-bold text-white">$48.2K</p>
                      <p className="mt-1 text-sm text-emerald-300">Revenue this week · +12.3%</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">Orders</p>
                      <p className="mt-1 text-2xl font-display font-bold text-white">1,284</p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    {[
                      ['Shopify', '$12.4K', 'Live'],
                      ['Amazon', '$8.2K', 'Healthy'],
                      ['TikTok Shop', '$6.8K', 'Accelerating'],
                      ['Instagram', '$2.1K', 'Recovered'],
                    ].map(([name, value, status]) => (
                      <div key={name} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">{name}</p>
                          <span className="rounded-full bg-teal-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200">
                            {status}
                          </span>
                        </div>
                        <p className="mt-3 text-3xl font-display font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-[1.15fr_0.85fr] gap-4">
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">AI queue</p>
                        <Sparkles className="h-4 w-4 text-teal-300" />
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          ['Sizing question', 'DM response drafted'],
                          ['Late shipment', 'Proactive update sent'],
                          ['Repeat customer', 'Upsell path identified'],
                        ].map(([title, detail]) => (
                          <div key={title} className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-3">
                            <p className="text-sm font-medium text-white">{title}</p>
                            <p className="mt-1 text-xs text-white/58">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-teal-500/20 to-cyan-400/8 p-4">
                      <p className="text-sm font-semibold text-white">Operator stack</p>
                      <div className="mt-4 space-y-4">
                        {[
                          ['Inbox', 'AI triage'],
                          ['Orders', 'Cross-channel sync'],
                          ['Shipping', 'SLA watch'],
                          ['Analytics', 'Margin visibility'],
                        ].map(([title, detail]) => (
                          <div key={title}>
                            <p className="text-sm font-semibold text-white">{title}</p>
                            <p className="text-xs text-white/60">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Slide eyebrow="The Problem" title="Modern sellers do not have" accent="an operating system.">
          <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-8">
            <div className="rounded-[34px] border border-white/10 bg-white/6 p-8 backdrop-blur-md">
              <p className="text-lg leading-relaxed text-white/72">
                Commerce now happens across storefronts, marketplaces, inboxes, shipping tools, and live channels at the same time. Every new channel adds another queue, another workflow, and another chance to lose the customer.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  { icon: ShoppingBag, title: 'Demand is fragmented', detail: 'Shopify, Amazon, TikTok Shop, Instagram, email, and support all generate intent separately.' },
                  { icon: MessageSquareMore, title: 'Teams work from disconnected inboxes', detail: 'High-intent questions get buried inside comments, DMs, support tools, and live chat.' },
                  { icon: Truck, title: 'Operations break under volume', detail: 'Shipping updates, refunds, SLAs, and inventory checks happen in different systems.' },
                  { icon: Users, title: 'No shared customer record', detail: 'The same buyer appears as different people across platforms, channels, and events.' },
                ].map(({ icon: Icon, title, detail }) => (
                  <div key={title} className="rounded-[24px] border border-white/8 bg-slate-950/55 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-2xl bg-teal-400/12 p-2 text-teal-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/56">{detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_80px_rgba(2,6,23,0.6)]">
              <div className="absolute inset-x-10 top-0 h-28 rounded-full bg-teal-500/14 blur-[90px]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">What sellers juggle today</p>
                    <p className="mt-3 text-3xl font-display font-bold text-white">20 tabs, five queues, zero source of truth</p>
                  </div>
                  <CircleDashed className="h-8 w-8 text-white/20" />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    ['Shopify', 'Orders + inventory'],
                    ['Amazon', 'Listing health + returns'],
                    ['TikTok Shop', 'Live comments + DMs'],
                    ['Gmail', 'Support escalations'],
                    ['3PL', 'Shipping exceptions'],
                    ['Sheets', 'Manual reporting'],
                  ].map(([title, detail], index) => (
                    <div
                      key={title}
                      className={`rounded-[26px] border p-5 ${index % 2 === 0 ? 'border-teal-400/20 bg-teal-400/8' : 'border-white/10 bg-white/[0.04]'}`}
                    >
                      <p className="text-xl font-display font-bold text-white">{title}</p>
                      <p className="mt-2 text-sm text-white/56">{detail}</p>
                      <div className="mt-4 h-1.5 rounded-full bg-white/8">
                        <div className={`h-full rounded-full ${index % 2 === 0 ? 'bg-teal-300' : 'bg-slate-300'} w-[68%]`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-amber-300/20 bg-amber-300/8 px-5 py-4 text-sm text-amber-100">
                  Every handoff slows response time, raises operational cost, and makes revenue recovery dependent on headcount.
                </div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide eyebrow="Why Now" title="Social became the storefront." accent="Ops still lives in pieces.">
          <div className="grid h-full grid-cols-[0.88fr_1.12fr] gap-8">
            <div className="flex flex-col justify-between rounded-[34px] border border-white/10 bg-white/6 p-8 backdrop-blur-md">
              <div>
                <p className="text-lg leading-relaxed text-white/72">
                  The market is shifting from channel-first selling to conversation-first commerce. Consumers now discover, ask, compare, and buy without leaving the feed.
                </p>

                <div className="mt-8 grid gap-4">
                  <StatCard
                    label="U.S. Social Commerce"
                    value="$100B+"
                    detail="Projected to surpass $100B in 2026 as social shopping becomes a mainstream retail behavior."
                  />
                  <StatCard
                    label="TikTok Shop U.S. Sales"
                    value="$23.4B"
                    detail="Forecast 2026 ecommerce sales, making TikTok one of the biggest engines of social commerce growth."
                  />
                  <StatCard
                    label="TikTok Buyers"
                    value="50%+"
                    detail="More than half of U.S. social buyers are expected to purchase on TikTok in 2026."
                  />
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/40">
                Sources: EMARKETER forecasts and press reporting on U.S. social commerce and TikTok Shop, 2025-2026.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[34px] border border-white/10 bg-slate-950/70 p-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-teal-400/12 p-2 text-teal-200">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-display font-bold text-white">Three shifts make the wedge obvious</p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    ['Discovery now converts', 'Comments, lives, story replies, and native checkout collapse the funnel inside the platform.'],
                    ['Scale creates operational drag', 'The best brands are multi-channel by default, but every new channel adds more manual coordination.'],
                    ['Winning depends on response quality', 'Trust, speed, and follow-up determine whether demand becomes revenue or disappears.'],
                  ].map(([title, detail]) => (
                    <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-lg font-display font-bold text-white">{title}</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/56">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
                <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-teal-500/16 to-cyan-400/8 p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">The opening</p>
                  <p className="mt-4 text-4xl font-display font-bold text-white">
                    The category needs the operating layer between customer intent and execution.
                  </p>
                </div>

                <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/48">What GrowthSync owns</p>
                  <div className="mt-6 space-y-4">
                    {[
                      'Demand capture',
                      'Unified customer context',
                      'Operational triage',
                      'Cross-channel visibility',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-white/78">
                        <div className="h-2.5 w-2.5 rounded-full bg-teal-300" />
                        <span className="text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        <section className="deck-slide">
          <div className="deck-frame overflow-hidden bg-[#f7fafc] text-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.12),_transparent_25%),radial-gradient(circle_at_85%_10%,_rgba(14,165,233,0.1),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.84),_rgba(241,245,249,0.96))]" />
            <div className="absolute inset-0 dot-grid opacity-[0.06]" />
            <div className="relative flex h-full flex-col p-8 md:p-14">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700">The Product</p>
                  <h2 className="mt-4 max-w-4xl text-4xl font-display font-bold tracking-tight text-slate-950 md:text-6xl">
                    GrowthSync unifies the seller stack into
                    <span className="text-gradient-teal"> one command layer.</span>
                  </h2>
                </div>
                <div className="hidden rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-medium text-slate-500 md:block">
                  Updated from the old platform narrative
                </div>
              </div>

              <div className="grid flex-1 grid-cols-[0.9fr_1.1fr] gap-8">
                <div className="flex flex-col justify-between rounded-[34px] border border-slate-200 bg-white/86 p-8 shadow-[0_28px_60px_rgba(148,163,184,0.18)]">
                  <div>
                    <p className="text-lg leading-relaxed text-slate-600">
                      The new story is not “autonomous everything.” It is a clearer, stronger wedge: GrowthSync is the AI operating system that gives multi-channel sellers one place to run orders, customer communication, shipping, analytics, and inventory across every channel.
                    </p>

                    <div className="mt-8 grid gap-3">
                      {[
                        { icon: Layers3, title: 'Unified dashboard', detail: 'Channel performance, order health, inbox load, and revenue in one view.' },
                        { icon: MessageSquareMore, title: 'Intelligent inbox', detail: 'Centralize support, comments, DMs, and high-intent buyer conversations.' },
                        { icon: PackageCheck, title: 'Order + inventory sync', detail: 'Track fulfillment, shipping exceptions, and stock movement across channels.' },
                        { icon: ChartColumnBig, title: 'AI insights', detail: 'Surface risk, opportunity, and next-best action from the same operating data.' },
                      ].map(({ icon: Icon, title, detail }) => (
                        <div key={title} className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-2xl bg-teal-50 p-2 text-teal-700">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-950">{title}</p>
                              <p className="mt-1 text-sm text-slate-500">{detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-teal-200 bg-teal-50 px-5 py-4 text-sm font-medium text-teal-900">
                    This aligns the deck directly with the current site positioning: every sales channel, one dashboard.
                  </div>
                </div>

                <div className="rounded-[34px] border border-slate-200 bg-slate-950 p-6 shadow-[0_40px_100px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">GrowthSync OS</p>
                      <p className="mt-2 text-2xl font-display font-bold text-white">Every channel’s performance in one view</p>
                    </div>
                    <img src="/mascots/clay/peeker.png" alt="" aria-hidden="true" className="h-16 w-16 object-contain opacity-95" />
                  </div>

                  <div className="mt-5 grid grid-cols-[1.2fr_0.8fr] gap-4">
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-sm font-semibold text-white">Channel mix</p>
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {[
                          ['Shopify', '$12.4K', '76 orders'],
                          ['Amazon', '$8.2K', '54 orders'],
                          ['TikTok', '$6.8K', '124 comments'],
                          ['Instagram', '$2.1K', '93 DMs'],
                        ].map(([title, value, detail]) => (
                          <div key={title} className="rounded-[22px] border border-white/8 bg-slate-900/80 p-4">
                            <p className="text-sm font-semibold text-white">{title}</p>
                            <p className="mt-2 text-2xl font-display font-bold text-white">{value}</p>
                            <p className="mt-1 text-xs text-white/48">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        ['Smart inbox', 'Prioritize by intent, urgency, and SLA risk.'],
                        ['Customer graph', 'Merge actions across channels into one buyer profile.'],
                        ['Operating alerts', 'Catch support, shipping, and inventory issues before they spread.'],
                      ].map(([title, detail]) => (
                        <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                          <p className="font-semibold text-white">{title}</p>
                          <p className="mt-2 text-sm text-white/56">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-[28px] border border-white/10 bg-gradient-to-r from-teal-500/18 to-cyan-400/8 p-5">
                    <p className="text-sm font-semibold text-white">The new product frame</p>
                    <p className="mt-2 text-lg leading-relaxed text-white/76">
                      One system of record for channel performance, customer conversations, order health, and the next best operational action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Slide eyebrow="How It Works" title="Capture the signal." accent="Run the operation.">
          <div className="grid h-full grid-rows-[auto_1fr] gap-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: MessageSquareMore, step: '01', title: 'Ingest intent', detail: 'Comments, DMs, stories, orders, and support events stream into one system.' },
                { icon: Users, step: '02', title: 'Build context', detail: 'Every action updates a unified customer profile instead of another channel silo.' },
                { icon: Bot, step: '03', title: 'Prioritize with AI', detail: 'Score urgency, predict value, and recommend the next best response or operation.' },
                { icon: Activity, step: '04', title: 'Execute + learn', detail: 'Resolve, route, upsell, recover, and improve future workflows from the same loop.' },
              ].map(({ icon: Icon, step, title, detail }) => (
                <div key={step} className="rounded-[30px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-teal-400/12 p-3 text-teal-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">{step}</p>
                  </div>
                  <p className="mt-6 text-2xl font-display font-bold text-white">{title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/56">{detail}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[1.05fr_0.95fr] gap-6">
              <div className="rounded-[34px] border border-white/10 bg-slate-950/68 p-7">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/8 p-2">
                    <ShieldCheck className="h-5 w-5 text-teal-200" />
                  </div>
                  <p className="text-2xl font-display font-bold text-white">What the operating layer actually does</p>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  {[
                    ['Prioritize conversations', 'Move from one crowded inbox to intent-ranked workflows.'],
                    ['Protect account health', 'Spot SLA, support, and shipping issues before they become penalties.'],
                    ['Coordinate execution', 'Tie support, fulfillment, and sales actions together across the stack.'],
                    ['Surface revenue opportunities', 'Catch repeat buyers, recovery moments, and upsell windows automatically.'],
                  ].map(([title, detail]) => (
                    <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-lg font-semibold text-white">{title}</p>
                      <p className="mt-2 text-sm text-white/56">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-teal-500/14 to-cyan-400/6 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">From chaos to control</p>

                <div className="mt-6 space-y-4">
                  {[
                    ['Channel events', 'Live comments, DMs, order notifications, returns'],
                    ['Unified context', 'Customer identity, order history, sentiment, AOV, channel'],
                    ['AI decision layer', 'Intent score, issue routing, reply drafting, risk detection'],
                    ['Operator outcome', 'Revenue recovered, faster support, healthier account metrics'],
                  ].map(([title, detail], index) => (
                    <div key={title} className="relative rounded-[26px] border border-white/10 bg-slate-950/72 px-5 py-4">
                      {index < 3 ? <div className="absolute bottom-[-16px] left-8 h-4 w-px bg-gradient-to-b from-teal-300/70 to-transparent" /> : null}
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-400/12 text-sm font-semibold text-teal-100">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{title}</p>
                          <p className="mt-1 text-sm text-white/56">{detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/68">
                  <ArrowRight className="h-4 w-4 text-teal-200" />
                  The deck now tells a more believable story: AI where it matters, not hand-wavy autonomy everywhere.
                </div>
              </div>
            </div>
          </div>
        </Slide>

        <section className="deck-slide">
          <div className="deck-frame overflow-hidden bg-[#f8fafc] text-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,_rgba(20,184,166,0.12),_transparent_25%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)]" />
            <div className="relative flex h-full flex-col p-8 md:p-14">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700">Traction</p>
                  <h2 className="mt-4 max-w-4xl text-4xl font-display font-bold tracking-tight text-slate-950 md:text-6xl">
                    Early proof that the wedge is
                    <span className="text-gradient-teal"> real and compounding.</span>
                  </h2>
                </div>
                <div className="hidden rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-medium text-slate-500 md:block">
                  Refreshed styling, same underlying traction story
                </div>
              </div>

              <div className="grid flex-1 grid-cols-[0.82fr_1.18fr] gap-8">
                <div className="flex flex-col justify-between rounded-[34px] border border-slate-200 bg-white/88 p-8 shadow-[0_28px_60px_rgba(148,163,184,0.14)]">
                  <div>
                    <p className="text-lg leading-relaxed text-slate-600">
                      The original deck already had real traction. The refresh keeps those proof points, but presents them with more clarity and confidence.
                    </p>

                    <div className="mt-8 grid gap-4">
                      <StatCard
                        label="Run Rate"
                        value="$1M ARR"
                        detail="Bootstrapped to profitability in the first eight months."
                      />
                      <StatCard
                        label="Waitlist"
                        value="100+"
                        detail="Private beta momentum doubled month-over-month from word of mouth."
                      />
                      <StatCard
                        label="Enterprise pull"
                        value="$10M+"
                        detail="Onboarding a large brand looking to replace a $400K+ annual ops team."
                      />
                    </div>
                  </div>

                  <p className="text-sm text-slate-500">
                    Additional signals from the original deck: live V1 testing with Palmstreet, direct deal flow from TikTok, and active conversations tied to larger commerce rollouts.
                  </p>
                </div>

                <div className="rounded-[34px] border border-slate-200 bg-slate-950 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.28)]">
                  <div className="grid h-full grid-rows-[auto_1fr] gap-6">
                    <div className="grid grid-cols-[0.78fr_1.22fr] gap-4">
                      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-teal-500/16 to-cyan-400/6 p-6 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">Growth curve</p>
                        <p className="mt-3 text-4xl font-display font-bold">$8K → $67K</p>
                        <p className="mt-3 text-sm text-white/68">Monthly revenue growth shown in the original deck, now restyled for stronger investor readability.</p>
                      </div>

                      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                        <div className="flex items-end justify-between gap-3">
                          {[8, 18, 26, 42, 67].map((value, index) => (
                            <div key={value} className="flex flex-1 flex-col items-center gap-3">
                              <div className="flex h-48 w-full items-end rounded-t-[20px] bg-white/[0.04] p-2">
                                <div
                                  className={`w-full rounded-[16px] bg-gradient-to-t ${index === 4 ? 'from-teal-400 to-cyan-300' : 'from-white/25 to-white/12'}`}
                                  style={{ height: `${Math.max(18, value * 2.2)}px` }}
                                />
                              </div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/38">
                                {['Q1', 'Q2', 'Q3', 'Q4', "Q1'26"][index]}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        ['Private beta → strong pull', 'Brands in cohort saw 3-5x GMV growth within 45 days after onboarding.'],
                        ['Platform distribution tailwinds', 'Live product testing with Palmstreet and a path to their seller base.'],
                        ['Strategic ecosystem access', 'Direct deal flow from TikTok and conversations around deeper partnerships.'],
                        ['Category credibility', 'Active conversations around next-wave social commerce products launching in 2026.'],
                      ].map(([title, detail]) => (
                        <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                          <p className="text-xl font-display font-bold text-white">{title}</p>
                          <p className="mt-3 text-sm leading-relaxed text-white/58">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="deck-slide">
          <div className="deck-frame overflow-hidden bg-[#020817]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(20,184,166,0.18),_transparent_24%),linear-gradient(145deg,_#020817_0%,_#09111f_55%,_#040b16_100%)]" />
            <div className="relative h-full p-8 md:p-14">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-300/85">Founder</p>
                  <h2 className="mt-4 max-w-4xl text-4xl font-display font-bold tracking-tight text-white md:text-6xl">
                    Michael Broughton
                    <span className="text-gradient-teal"> builds category-defining consumer infrastructure.</span>
                  </h2>
                </div>
                <img src="/mascots/hero-sitter.png" alt="" aria-hidden="true" className="hidden w-20 rotate-[-6deg] md:block" />
              </div>

              <FounderCard
                dark
                name="Michael Broughton"
                role="Founder & CEO"
                image="/michael-broughton.png"
                accent="from-teal-500 via-cyan-400 to-sky-500"
                bio="Second-time founder building at the intersection of consumer behavior, trust, and infrastructure. Michael previously founded ALTRO, raised $22M, launched nationally with Discover, and exited in 2024."
                highlights={[
                  'Founded ALTRO and raised $22M',
                  'Launched nationwide with Discover',
                  'Thiel Fellow',
                  'YC S20',
                  'TIME Best Invention recognition',
                  'Forbes consumer technology leader',
                  'Vice Chairman, USCCU',
                ]}
              />
            </div>
          </div>
        </section>

        <section className="deck-slide">
          <div className="deck-frame overflow-hidden bg-[#f8fafc] text-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.12),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)]" />
            <div className="relative h-full p-8 md:p-14">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700">Founder</p>
                  <h2 className="mt-4 max-w-4xl text-4xl font-display font-bold tracking-tight text-slate-950 md:text-6xl">
                    Rod Henley brings the culture, creator, and relationship layer that moves this market.
                  </h2>
                </div>
                <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 md:block">
                  GrowthSync closes where commerce now starts: in the conversation
                </div>
              </div>

              <FounderCard
                name="Rod Henley"
                role="Founding GTM & Culture"
                image="/rod-henley.jpg"
                bio="Rod is a repeat founder and relationship-builder across culture, creators, and influence. He built within artist management, was recruited to Roc Nation, and understands how discovery, trust, and tastemaking shape commercial momentum."
                highlights={[
                  'Founder, Scoreboard Sundays',
                  'Launched The Influencer Network',
                  'Managed Robin Thicke, A$AP Ferg, and more',
                  'Scaled artist management into label partnerships and national touring',
                  'Built 25+ inbound relationships for the company',
                  'Deep operator network across creators, brands, and culture',
                ]}
                accent="from-slate-950 via-slate-800 to-teal-500"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default InvestorDeck;
