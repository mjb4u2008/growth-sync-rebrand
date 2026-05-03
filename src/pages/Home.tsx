import { ArrowRight, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CaseStudies from '../components/ui/case-studies';
import Features from '../components/ui/features';

const proofNames = [
  { name: 'Ed Hardy', kind: 'Brand' },
  { name: 'India Love', kind: 'Creator' },
  { name: 'Allbirds', kind: 'Brand' },
  { name: 'Ray J', kind: 'Creator' },
  { name: 'Canvas Beauty', kind: 'Brand' },
  { name: 'The Hoop Gang', kind: 'Brand' },
  { name: 'Kyyla Renee', kind: 'Creator' },
  { name: 'Pavoi', kind: 'Brand' },
  { name: 'Von Dutch', kind: 'Brand' },
  { name: 'Jordyn Lucas', kind: 'Creator' },
  { name: 'Dripglosss', kind: 'Brand' },
  { name: 'KleanByKy', kind: 'Brand' },
  { name: 'NDA', kind: 'Private client' },
  { name: 'Homme Femme', kind: 'Brand' },
  { name: 'The Genuine Club', kind: 'Brand' },
];

const chatMessages = [
  {
    sender: 'customer',
    text: 'Hey, is there a class tonight?',
    typingDelay: '0.12s',
    typingDuration: '0.97s',
    messageDelay: '1.2s',
  },
  {
    sender: 'growthsync',
    text: 'Hey boo, yes, I have three spots left. Here’s the link.',
    typingDelay: '1.95s',
    typingDuration: '1.3s',
    messageDelay: '3.43s',
  },
  {
    sender: 'growthsync',
    text: 'growthsync.fit/book-tonight',
    messageDelay: '4.43s',
    isLink: true,
  },
  {
    sender: 'customer',
    text: 'Ok, thanks :) When does it start again?',
    typingDelay: '5.2s',
    typingDuration: '2.15s',
    messageDelay: '7.52s',
  },
  {
    sender: 'growthsync',
    text: 'I’m kicking off at 8, so try to get here by 7:50. See you soon!',
    typingDelay: '8.5s',
    typingDuration: '1.33s',
    messageDelay: '9s',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#080b0f]">
      <Helmet>
        <title>GrowthSync | Turn social intent into action</title>
        <meta
          name="description"
          content="GrowthSync engages your social audience, captures permissioned customer data, and turns intent into action."
        />
      </Helmet>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <a href="/" className="flex items-center gap-3 font-black tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#080b0f] text-white">
            <Zap className="h-5 w-5" />
          </span>
          GrowthSync
        </a>
        <nav className="hidden items-center gap-8 text-sm font-bold text-black/55 md:flex">
          <a href="#how">How it works</a>
          <a href="#proof">Proof</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" className="rounded-full bg-[#080b0f] px-5 py-3 text-sm font-black text-white">
            Get Started for Free
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-10 md:px-8 md:pb-12 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-4xl text-6xl font-black leading-[0.88] tracking-tight md:text-8xl">
              Turn social intent into action.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-black/62">
              Engage your audience, capture permissioned customer data, and move every comment, DM, and reply toward the right next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#080b0f] px-7 py-4 text-base font-black text-white">
                Get Started for Free
                <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#how" className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-7 py-4 text-base font-black">
                See how it works
              </a>
            </div>
          </div>

          <div className="dm-thread-fade relative flex min-h-[520px] items-center justify-center overflow-hidden px-1 py-8 sm:px-5">
            <div className="dm-thread-stack relative flex w-full max-w-[520px] flex-col gap-4">
              {chatMessages.map((message) => {
                const isCustomer = message.sender === 'customer';
                const isLink = Boolean(message.isLink);

                return (
                  <div
                    key={message.text}
                    className={`relative flex ${isCustomer ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.typingDelay && (
                      <div
                        className={`dm-typing-bubble absolute top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-full px-4 py-3 ${
                          isCustomer
                            ? 'left-0 bg-white'
                            : 'right-0 bg-[#0b84ff]'
                        }`}
                        style={{
                          animationDelay: message.typingDelay,
                          animationDuration: message.typingDuration,
                        }}
                      >
                        <span className={`dm-typing-dot h-2 w-2 rounded-full ${isCustomer ? 'bg-black/35' : 'bg-white/90'}`} />
                        <span className={`dm-typing-dot h-2 w-2 rounded-full ${isCustomer ? 'bg-black/30' : 'bg-white/75'}`} />
                        <span className={`dm-typing-dot h-2 w-2 rounded-full ${isCustomer ? 'bg-black/25' : 'bg-white/60'}`} />
                      </div>
                    )}

                    <div
                      className={`dm-message-bubble max-w-[82%] rounded-[1.65rem] px-5 py-4 text-base font-bold leading-7 md:text-lg ${
                        isLink
                          ? 'rounded-br-md border border-black/5 bg-white text-sm text-[#0b84ff] underline decoration-[#0b84ff]/65 decoration-2 underline-offset-4 md:text-base'
                          : isCustomer
                            ? 'rounded-bl-md bg-white text-[#080b0f]'
                            : 'rounded-br-md bg-[#0b84ff] text-white'
                      }`}
                      style={{ animationDelay: message.messageDelay }}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div id="proof" className="mt-12 overflow-hidden border-t border-black/10 pt-7">
          <div className="mask-edges">
            <div className="animate-marquee flex w-max items-center gap-10 py-2" style={{ animationDuration: '34s' }}>
              {[...proofNames, ...proofNames].map((item, index) => (
                <span
                  key={`${item.name}-${index}`}
                  className={`font-display text-xl leading-tight tracking-tight md:text-2xl ${
                    item.kind === 'Creator'
                      ? 'font-black text-black/50'
                      : 'font-bold text-black/34'
                  }`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Features />

      <CaseStudies />

      <section id="pricing" className="px-5 py-10 md:px-8 md:py-16">
        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl overflow-hidden rounded-lg border border-black/10 bg-[#e8ff63] text-[#080b0f] shadow-[0_28px_90px_rgba(8,11,15,0.08)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(8,11,15,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(8,11,15,0.08)_1px,transparent_1px)] bg-[size:7rem_7rem]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#e8ff63] to-transparent" />
          <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-20 text-center md:px-12">
            <h2 className="max-w-5xl font-display text-6xl font-black leading-[0.84] tracking-tight md:text-8xl lg:text-9xl">
              Get started for free.
            </h2>
            <button
              type="button"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-[#080b0f] px-8 py-4 text-base font-black text-white shadow-[0_18px_50px_rgba(8,11,15,0.22)] md:px-10 md:py-5 md:text-lg"
            >
              Start Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
