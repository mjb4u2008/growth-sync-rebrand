import { ArrowDown, ArrowRight, CheckCircle2, Instagram, MessageCircle, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import HeaderPrototype from './HeaderPrototype';

const trustBrands = ['Von Dutch', 'Ed Hardy', 'Drip Gloss', 'Homme Femme'];

const conversations = [
  {
    channel: 'IG DM',
    customer: 'Does the brown gloss ship before Friday?',
    ai: 'Yes. Order in the next 4 hours and we can get it out today. Want the direct shade link?',
    signal: 'Purchase intent',
  },
  {
    channel: 'Ad comment',
    customer: 'Is this safe for sensitive skin?',
    ai: 'It is fragrance-free. I can send the ingredient list and the best starter shade.',
    signal: 'Product question',
  },
  {
    channel: 'Story reply',
    customer: 'Need this for my birthday drop look.',
    ai: 'Got you. What day is the event? I can help pick the fastest option.',
    signal: 'Time-sensitive',
  },
];

export default function HeroPrototype() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="relative min-h-[760px] bg-[linear-gradient(180deg,#ffffff_0%,#f9fafb_100%)]">
        <div className="absolute inset-x-0 top-0 h-32 border-b border-gray-100 bg-white/70 backdrop-blur-sm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 md:px-8">
          <HeaderPrototype />
        </div>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-56 pt-16 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:pt-20">
          <div className="flex flex-col justify-center">
            <motion.div
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Built for social commerce teams
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="relative"
            >
              <img
                src="/mascots/clay/peeker.png"
                alt=""
                className="absolute -left-2 -top-12 hidden h-20 w-20 object-contain md:block"
              />
              <h1 className="max-w-4xl text-5xl font-bold leading-[0.96] tracking-tight text-gray-950 md:text-7xl">
                Turn every comment and DM into a real conversation.
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              GrowthSync is autonomous AI for social commerce: it answers product questions, captures intent, and escalates the moments your team should not miss.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              <button className="inline-flex h-13 items-center justify-center gap-2 rounded-md bg-gray-950 px-7 text-sm font-bold text-white transition-colors hover:bg-gray-800">
                Get started
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex h-13 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-7 text-sm font-bold text-gray-950 transition-colors hover:bg-gray-50">
                See how it works
                <ArrowDown className="h-4 w-4" />
              </button>
            </motion.div>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Trusted social commerce work</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {trustBrands.map((brand) => (
                  <span key={brand} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-500 shadow-sm">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute -right-6 top-10 hidden h-44 w-44 rounded-full border border-gray-200 md:block" />
            <div className="relative rounded-lg border border-gray-200 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="rounded-md border border-gray-200 bg-gray-950 p-4 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-950">
                      <Instagram className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Social inbox</p>
                      <p className="text-xs text-gray-400">AI is working 24/7</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-200">
                    Live
                  </span>
                </div>

                <div className="grid gap-3">
                  {conversations.map((item) => (
                    <div key={item.customer} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-gray-400">{item.channel}</span>
                        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-bold text-teal-200">{item.signal}</span>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <p className="rounded-md bg-white/10 p-3 text-gray-100">{item.customer}</p>
                        <p className="rounded-md bg-teal-400/15 p-3 text-teal-50">{item.ai}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 border-x border-b border-gray-200 bg-white text-center">
                {[
                  ['87', 'DMs sent'],
                  ['34.5%', 'response'],
                  ['5', 'purchases'],
                ].map(([value, label]) => (
                  <div key={label} className="border-r border-gray-100 px-3 py-4 last:border-r-0">
                    <p className="text-2xl font-bold text-gray-950">{value}</p>
                    <p className="text-xs font-semibold text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <div className="absolute inset-x-0 bottom-0 z-20 mx-auto max-w-5xl px-6">
          <div className="translate-y-[46%] rounded-t-lg border border-gray-200 bg-white shadow-[0_-20px_70px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-950 text-white">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-bold text-gray-950">Sarah Jenkins</p>
                  <p className="text-xs font-medium text-gray-500">@sarahj_style • purchase intent captured</p>
                </div>
              </div>
              <div className="hidden items-center gap-8 md:flex">
                <div>
                  <p className="text-xs font-semibold text-gray-400">Total value</p>
                  <p className="text-lg font-bold text-gray-950">$450.00</p>
                </div>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">VIP</span>
              </div>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-3">
              {[
                ['Relationship timeline', 'Liked posts, asked about sizing, replied to offer.'],
                ['AI reasoning', 'Chose IG DM because conversion confidence was highest.'],
                ['Next action', 'Send product link and ask for email before drop ends.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-md border border-gray-200 bg-gray-50 p-4">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <p className="mt-3 font-bold text-gray-950">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-8 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-xs font-bold text-gray-500 shadow-sm backdrop-blur md:flex">
          <MessageCircle className="h-4 w-4 text-teal-600" />
          24/7 social response
        </div>
        <div className="absolute right-10 bottom-40 hidden items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-xs font-bold text-gray-500 shadow-sm backdrop-blur md:flex">
          <Sparkles className="h-4 w-4 text-cyan-600" />
          brand-safe AI
        </div>
      </div>
    </div>
  );
}
