import { ArrowRight, BrainCircuit, Crown, Instagram, Play, MessageCircle, Sparkles } from 'lucide-react';

const CLIENTS = [
  { name: 'Von Dutch' },
  { name: 'Pavoy' },
  { name: 'Ed Hardy' },
  { name: 'Canvas Beauty' },
  { name: 'Dripglosss' },
  { name: 'Allbirds' },
  { name: 'NDA' },
  { name: 'The Genuine Club' },
  { name: 'Homme Femme' },
  { name: 'HoopGang' },
];

const conversations = [
  {
    label: 'Customer',
    text: 'I want to join the next class. Is there still room?',
  },
  {
    label: 'GrowthSync',
    text: 'Yes, there are a few spots left. Want the signup link and a reminder before it starts?',
  },
];

const signals = [
  { label: 'Engage', value: 'answered interest' },
  { label: 'Capture', value: 'class + reminder' },
  { label: 'Act', value: 'send signup link' },
];

export default function GlassmorphismTrustHero() {
  return (
    <div className="relative w-full overflow-hidden bg-zinc-950 font-sans text-white">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glassMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .glass-animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .glass-animate-marquee {
          animation: glassMarquee 40s linear infinite;
        }
        .glass-delay-100 { animation-delay: 0.1s; }
        .glass-delay-200 { animation-delay: 0.2s; }
        .glass-delay-300 { animation-delay: 0.3s; }
        .glass-delay-400 { animation-delay: 0.4s; }
        .glass-delay-500 { animation-delay: 0.5s; }
      `}</style>

      <div
        className="absolute inset-0 z-0 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a72ca2f3-9dd1-4fe4-84ba-fe86468a5237_3840w.webp?w=800&q=80)] bg-cover bg-center opacity-40"
        style={{
          maskImage: 'linear-gradient(180deg, transparent, black 0%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 70%, transparent)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 md:pb-20 md:pt-32 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-center space-y-8 pt-8 lg:col-span-7">
            <h1
              className="glass-animate-fade-in glass-delay-200 text-5xl font-medium leading-[0.9] tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl"
              style={{
                maskImage: 'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
              }}
            >
              Engage your
              <br />
              <span className="bg-gradient-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                audience 24/7
              </span>
            </h1>

            <p className="glass-animate-fade-in glass-delay-300 max-w-xl text-lg leading-relaxed text-zinc-400">
              Answer comments and DMs, collect permissioned customer data, and turn intent into action across every social interaction.
            </p>

            <div className="glass-animate-fade-in glass-delay-400 flex flex-col gap-4 sm:flex-row">
              <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]">
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10">
                <Play className="h-4 w-4 fill-current" />
                How it works
              </button>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5 lg:mt-12">
            <div className="glass-animate-fade-in glass-delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="grid gap-3">
                  {conversations.map((item, index) => (
                    <div
                      key={item.label}
                      className={`rounded-2xl border p-4 ${
                        index === 1
                          ? 'ml-8 border-teal-300/20 bg-teal-300/10'
                          : index === 2
                            ? 'border-white/10 bg-white/[0.03]'
                            : 'mr-8 border-white/10 bg-white/10'
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        {index === 1 ? (
                          <Sparkles className="h-3.5 w-3.5 text-teal-200" />
                        ) : (
                          <MessageCircle className="h-3.5 w-3.5 text-zinc-400" />
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{item.label}</span>
                      </div>
                      <p className="text-sm leading-6 text-zinc-100">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4 text-teal-100" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Reasoning cache</p>
                    </div>
                    <div className="rounded-full bg-teal-300/10 px-2.5 py-1 text-xs font-bold text-teal-100">
                      86% confidence
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {signals.map((signal) => (
                      <div key={signal.label} className="flex items-center justify-between gap-4 border-t border-white/10 pt-2 first:border-t-0 first:pt-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{signal.label}</span>
                        <span className="text-right text-sm font-semibold text-zinc-100">{signal.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="glass-animate-fade-in glass-delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur-xl">
              <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400">Trusted by industry leaders</h3>

              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                }}
              >
                <div className="glass-animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div
                      key={`${client.name}-${i}`}
                      className="flex cursor-default items-center gap-2 opacity-50 grayscale transition-all hover:scale-105 hover:opacity-100 hover:grayscale-0"
                    >
                      <span className="text-lg font-bold tracking-tight text-white">{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
