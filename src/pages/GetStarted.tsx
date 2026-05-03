import { ArrowRight, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function GetStarted() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 py-24 text-[#080b0f] md:px-8 md:py-32">
      <Helmet>
        <title>Get Started for Free | GrowthSync</title>
        <meta
          name="description"
          content="Get started with GrowthSync for free and turn social intent into action."
        />
        <link rel="canonical" href="https://growthsync.com/get-started" />
      </Helmet>

      <section className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-[#080b0f] p-5 text-white shadow-[0_28px_90px_rgba(8,11,15,0.1)] md:p-8">
          <div className="rounded-lg bg-[#fbfaf6] p-8 text-[#080b0f] md:p-12">
            <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[#080b0f] text-white">
              <Zap className="h-6 w-6" />
            </div>
            <h1 className="max-w-4xl font-display text-6xl font-black leading-[0.88] tracking-tight md:text-8xl">
              Get Started for Free.
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-bold leading-8 text-black/56">
              GrowthSync helps turn DMs, comments, replies, and social intent into the right next action.
            </p>
            <button
              type="button"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-[#080b0f] px-7 py-4 text-base font-black text-white"
            >
              Get Started for Free Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
