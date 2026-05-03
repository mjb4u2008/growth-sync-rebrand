import type { ReactNode } from 'react';
import { ArrowRight, Database, MessageCircle, Send, Sparkles, UserRoundCheck, Zap } from 'lucide-react';

import { Badge } from './badge';
import { Button } from './button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  visual: ReactNode;
}

interface Tab {
  value: string;
  icon: ReactNode;
  label: string;
  content: TabContent;
}

interface GrowthSyncFeature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const conversationRows = [
  {
    label: 'Story reply',
    message: 'Need this for my birthday drop look.',
    response: 'Got you. Want the fastest shipping option or the shade guide first?',
  },
  {
    label: 'Ad comment',
    message: 'Is this safe for sensitive skin?',
    response: 'Yes. It is fragrance-free. I can send the ingredient list and starter shade.',
  },
];

const signalRows = [
  ['Email', 'shared'],
  ['Product intent', 'brown gloss'],
  ['Event', 'birthday drop'],
  ['Preference', 'sensitive skin'],
];

const actionRows = [
  { action: 'Send signup link', status: 'Ready' },
  { action: 'Remind before class', status: 'Queued' },
  { action: 'Route VIP intent', status: 'Team' },
  { action: 'Attach shade guide', status: 'Sent' },
];

function EngageVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 text-white shadow-2xl backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-300/10 blur-3xl" />
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold">Live social inbox</p>
            <p className="text-xs text-white/45">Comments, DMs, replies</p>
          </div>
        </div>
        <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs font-bold text-teal-100">
          Online
        </span>
      </div>

      <div className="grid gap-3">
        {conversationRows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-white/10 bg-black/15 p-4 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">{row.label}</span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-teal-100">Intent found</span>
            </div>
            <p className="rounded-xl border border-white/10 bg-white/[0.08] p-3 text-sm leading-6 text-white/78">{row.message}</p>
            <p className="ml-8 mt-2 rounded-xl border border-teal-200/20 bg-teal-300/10 p-3 text-sm leading-6 text-teal-50">
              {row.response}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaptureVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 text-white shadow-2xl backdrop-blur-xl">
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-teal-300/10 blur-3xl" />
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-white">Customer signal profile</p>
          <p className="mt-1 text-xs font-medium text-white/45">Built from permissioned social interactions</p>
        </div>
        <div className="rounded-full border border-teal-200/20 bg-teal-300/10 px-3 py-1 text-xs font-bold text-teal-100">86% confidence</div>
      </div>

      <div className="mb-5 rounded-2xl border border-white/10 bg-black/15 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-950">SJ</div>
          <div>
            <p className="font-bold text-white">Sarah Jenkins</p>
            <p className="text-sm text-white/45">@sarahj_style</p>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {signalRows.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">{label}</p>
              <p className="mt-1 text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-teal-200/20 bg-teal-300/10 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-teal-50">
          <UserRoundCheck className="h-4 w-4" />
          Ready for owned audience
        </div>
        <p className="mt-2 text-sm leading-6 text-teal-50/65">Use the captured context for reminders, launches, VIP routing, and follow-up.</p>
      </div>
    </div>
  );
}

function ActivateVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 text-white shadow-2xl backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">Action queue</p>
            <p className="mt-1 text-xs text-white/45">Every signal gets a next step</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
            <Zap className="h-5 w-5" />
          </div>
        </div>

        <div className="grid gap-3">
          {actionRows.map((row) => (
            <div key={row.action} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/15 p-4 backdrop-blur-md">
              <div>
                <p className="font-semibold text-white">{row.action}</p>
                <p className="mt-1 text-xs text-white/45">Triggered from social intent</p>
              </div>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">{row.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4">
          <p className="text-sm font-bold text-amber-100">High-intent moments stay visible.</p>
          <p className="mt-2 text-sm leading-6 text-white/60">Send the link automatically, or route the conversation when a human should close it.</p>
        </div>
      </div>
    </div>
  );
}

const defaultTabs: Tab[] = [
  {
    value: 'engage',
    icon: <MessageCircle className="h-auto w-4 shrink-0" />,
    label: 'Engage',
    content: {
      badge: '24/7 audience response',
      title: 'Keep every comment, DM, and reply moving.',
      description:
        'GrowthSync answers social interactions in your brand voice, keeps people warm, and makes your audience feel heard even when your team is offline.',
      buttonText: 'See how it works',
      visual: <EngageVisual />,
    },
  },
  {
    value: 'capture',
    icon: <Database className="h-auto w-4 shrink-0" />,
    label: 'Capture',
    content: {
      badge: 'Permissioned customer data',
      title: 'Turn social attention into useful customer context.',
      description:
        'Collect emails, phone numbers, product preferences, event interest, and buying signals directly from natural social conversations.',
      buttonText: 'View proof',
      visual: <CaptureVisual />,
    },
  },
  {
    value: 'activate',
    icon: <Send className="h-auto w-4 shrink-0" />,
    label: 'Activate',
    content: {
      badge: 'Next-best action',
      title: 'Route intent into the action that matters.',
      description:
        'Send links, trigger reminders, route VIPs, and escalate high-value conversations so social engagement turns into measurable outcomes.',
      buttonText: 'Get started',
      visual: <ActivateVisual />,
    },
  },
];

function GrowthSyncFeature108({
  badge = 'How GrowthSync works',
  heading = 'Turn every social interaction into the right next step.',
  description = 'Engage your audience, capture permissioned data, and activate intent from one social commerce system.',
  tabs = defaultTabs,
}: GrowthSyncFeature108Props) {
  return (
    <section className="relative overflow-hidden bg-[#050807] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/85 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(45,95,77,0.42),transparent_34%),radial-gradient(circle_at_78%_46%,rgba(20,184,166,0.13),transparent_30%),linear-gradient(180deg,#050807_0%,#07110f_42%,#030505_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="border-teal-200/20 bg-white/[0.055] text-teal-100 backdrop-blur-md">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {badge}
          </Badge>
          <h2 className="max-w-3xl text-4xl font-bold leading-[0.98] tracking-tight text-white md:text-6xl">
            {heading}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-white/58 md:text-lg">{description}</p>
        </div>

        <Tabs defaultValue={tabs[0].value} className="mt-10">
          <TabsList className="mx-auto flex h-auto w-full max-w-2xl flex-col items-stretch justify-center gap-3 rounded-none bg-transparent p-0 sm:flex-row">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-white/55 shadow-sm backdrop-blur-md transition-all data-[state=active]:border-teal-200/20 data-[state=active]:bg-teal-300/10 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl lg:p-10">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
              >
                <div className="flex flex-col items-start gap-5">
                  <Badge variant="outline" className="border-white/10 bg-white/[0.055] text-white/70">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-bold leading-[1.02] tracking-tight text-white lg:text-5xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-base leading-7 text-white/58 lg:text-lg">{tab.content.description}</p>
                  <Button className="mt-1 rounded-full bg-white text-gray-950 hover:bg-white/90" size="lg">
                    {tab.content.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div>{tab.content.visual}</div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export { GrowthSyncFeature108 };
