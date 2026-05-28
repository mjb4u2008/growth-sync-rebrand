import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import CalendlyInlineEmbed from '../components/CalendlyInlineEmbed';
import { buildCalendlyEmbedUrl, getCalendlyUrlFromClientEnv } from '../utils/calendly';

type StoredLead = {
  name?: string;
  email?: string;
  handle?: string;
  goal?: string;
};

function getStoredLead(): StoredLead {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.sessionStorage.getItem('growthsync:lastBookCallLead');
    return raw ? JSON.parse(raw) as StoredLead : {};
  } catch {
    return {};
  }
}

export default function BookACallSuccess() {
  const lead = useMemo(() => getStoredLead(), []);
  const calendlyUrl = useMemo(() => getCalendlyUrlFromClientEnv(), []);
  const calendlyEmbedUrl = useMemo(() => buildCalendlyEmbedUrl(calendlyUrl), [calendlyUrl]);

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 pb-16 pt-28 text-[#080b0f] md:px-8 md:pb-24 md:pt-32">
      <Helmet>
        <title>Schedule a Call | GrowthSync</title>
        <meta
          name="description"
          content="Schedule your GrowthSync intro call after sharing your Instagram intake."
        />
        <link rel="canonical" href="https://growthsync.com/book-a-call/success" />
      </Helmet>

      <section className="mx-auto max-w-5xl">
        <div className="mb-6 text-xs font-black uppercase text-black/46">
          Step 2: Schedule a call
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(8,11,15,0.07)] md:p-7">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold leading-[1.02] md:text-5xl">
              Book a time below to get started.
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-black/62 md:text-lg md:leading-8">
              Choose any slot that works for you. We will use your intake to make the first conversation concrete.
              {calendlyUrl && (
                <>
                  {' '}
                  If the calendar does not load,{' '}
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-black text-[#080b0f] underline decoration-[#14b8a6] decoration-2 underline-offset-4 transition hover:text-[#0f766e]"
                  >
                    schedule a call here
                  </a>
                  .
                </>
              )}
            </p>
          </div>

          <div className="mt-7">
            {calendlyEmbedUrl ? (
              <CalendlyInlineEmbed
                url={calendlyEmbedUrl}
                prefill={{
                  name: lead.name,
                  email: lead.email,
                  customAnswers: {
                    a1: lead.handle || '',
                    a2: lead.goal || '',
                  },
                }}
              />
            ) : (
              <div className="rounded-lg border border-black/10 bg-[#fbfaf6] p-6 text-sm font-bold leading-6 text-black/58">
                Calendly is not configured in this environment yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
