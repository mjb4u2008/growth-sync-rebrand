import { FormEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function GetStarted() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const handle = String(form.get('handle') || '').trim();
    const message = String(form.get('message') || '').trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Social handle / brand: ${handle}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:hello@growthsync.com?subject=${encodeURIComponent('GrowthSync get started request')}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 py-8 text-[#080b0f] md:px-8 md:py-12">
      <Helmet>
        <title>Get Started for Free | GrowthSync</title>
        <meta
          name="description"
          content="Get started with GrowthSync for free and turn social intent into action."
        />
        <link rel="canonical" href="https://growthsync.com/get-started" />
      </Helmet>

      <header className="mx-auto flex max-w-7xl items-center justify-end">
        <a href="/" className="text-sm font-black text-black/50 transition hover:text-black">
          Back home
        </a>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 py-14 md:grid-cols-[1fr_0.82fr] md:py-20">
        <div>
          <h1 className="max-w-4xl font-display text-6xl font-black leading-[0.86] tracking-tight md:text-8xl">
            Start turning social intent into action.
          </h1>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-4 shadow-[0_28px_90px_rgba(8,11,15,0.08)] md:p-5">
          <form onSubmit={handleSubmit} className="rounded-md bg-[#fbfaf6] p-5 md:p-7">
            <div className="mb-7">
              <h2 className="text-3xl font-black tracking-tight">Get Started for Free</h2>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-black text-black/55">
                Name
                <input
                  name="name"
                  required
                  className="h-12 rounded-lg border border-black/10 bg-white px-4 text-base font-bold text-[#080b0f] outline-none transition focus:border-[#0b84ff]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-black/55">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  className="h-12 rounded-lg border border-black/10 bg-white px-4 text-base font-bold text-[#080b0f] outline-none transition focus:border-[#0b84ff]"
                  placeholder="you@brand.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-black/55">
                Social handle or brand
                <input
                  name="handle"
                  className="h-12 rounded-lg border border-black/10 bg-white px-4 text-base font-bold text-[#080b0f] outline-none transition focus:border-[#0b84ff]"
                  placeholder="@brand"
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-black/55">
                What should GrowthSync help with?
                <textarea
                  name="message"
                  rows={4}
                  className="resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-base font-bold text-[#080b0f] outline-none transition focus:border-[#0b84ff]"
                  placeholder="DMs, comments, launches, waitlists, bookings..."
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#080b0f] px-7 py-4 text-base font-black text-white"
            >
              Start Now
              <ArrowRight className="h-4 w-4" />
            </button>

            {submitted && (
              <p className="mt-4 text-center text-sm font-bold text-black/55">
                Your email app should open with the request ready to send.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
