import { FormEvent, useState } from 'react';
import { ArrowRight, MessageSquareText, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

const nextSteps = [
  'Capture the handle, volume, goal, and launch timing.',
  'Send you straight to the calendar so you can choose a time.',
  'Use your intake to make the first call concrete.',
];

const goals = [
  'Turn comments into purchases',
  'Capture restock or launch waitlists',
  'Book calls, classes, or appointments',
  'Route VIP or creator conversations',
  'Reduce manual DM triage',
];

const inputClassName = 'h-12 w-full min-w-0 rounded-md border border-black/10 bg-white px-4 text-base font-medium text-[#080b0f] outline-none transition focus:border-[#14b8a6]';
const textareaClassName = 'w-full min-w-0 resize-none rounded-md border border-black/10 bg-white px-4 py-3 text-base font-medium text-[#080b0f] outline-none transition focus:border-[#14b8a6]';
const labelClassName = 'grid gap-2 text-sm font-bold text-black/58';

export default function GetStarted() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isBookCall = location.pathname.startsWith('/book-a-call');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const handle = String(form.get('handle') || '').trim();
    const role = String(form.get('role') || '').trim();
    const brandType = String(form.get('brandType') || '').trim();
    const volume = String(form.get('volume') || '').trim();
    const goal = String(form.get('goal') || '').trim();
    const timing = String(form.get('timing') || '').trim();
    const pain = String(form.get('pain') || '').trim();

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          handle,
          message: [
            `Role: ${role}`,
            `Brand type: ${brandType}`,
            `Monthly Instagram DM/comment volume: ${volume}`,
            `Primary goal: ${goal}`,
            `Launch timing: ${timing}`,
            '',
            pain || 'No additional context provided.',
          ].join('\n'),
          source: isBookCall ? 'book-a-call-intake' : 'guided-instagram-intake',
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Could not submit your request.');
      }

      formElement.reset();
      try {
        window.sessionStorage.setItem('growthsync:lastBookCallLead', JSON.stringify({
          name,
          email,
          handle,
          goal,
        }));
      } catch {
        // Scheduling should continue even when browser storage is unavailable.
      }
      setStatusMessage('Got it. Next up: choose a time that works.');
      navigate('/book-a-call/success');
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Could not submit your request.');
    }
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 pb-16 pt-28 text-[#080b0f] md:px-8 md:pb-24 md:pt-32">
      <Helmet>
        <title>{isBookCall ? 'Book a Call' : 'Get Started for Free'} | GrowthSync</title>
        <meta
          name="description"
          content="Start a guided Instagram intake for GrowthSync, then schedule an intro call to map the right workflow."
        />
        <link rel="canonical" href={`https://growthsync.com${isBookCall ? '/book-a-call' : '/get-started'}`} />
      </Helmet>

      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.08fr] lg:items-start">
        <div className="min-w-0 lg:sticky lg:top-28">
          <p className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black uppercase text-black/42">
            Guided Instagram intake
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[0.96] md:text-6xl">
            Tell us where Instagram demand is getting stuck.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-black/62 md:text-lg md:leading-8">
            Share the handle, volume, goal, and timing. We will map the right workflow before you scale the channel.
          </p>

          <div className="mt-8 rounded-lg border border-black/10 bg-white p-5">
            <div className="flex items-center gap-3">
              <MessageSquareText className="h-5 w-5 text-[#0b84ff]" />
              <h2 className="font-display text-2xl font-extrabold">What happens next</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {nextSteps.map((step, index) => (
                <div key={step} className="flex gap-3 text-sm font-medium leading-6 text-black/58">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f9fafb] text-xs font-black text-black/52">{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-black/10 bg-[#f9fafb] p-5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#14b8a6]" />
              <p className="text-sm font-medium leading-6 text-black/62">
                Instagram is the only public channel in this intake. High-volume and agency paths get routed after review.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <form onSubmit={handleSubmit} className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(8,11,15,0.07)] md:p-7">
            <ol className="mb-7 flex flex-wrap gap-x-6 gap-y-2 border-b border-black/10 pb-4 text-sm font-black text-[#080b0f]">
              <li>
                <span className="mr-2 text-black/36">1.</span>
                Step 1: Intake
              </li>
              <li>
                <span className="mr-2 text-black/36">2.</span>
                Step 2: Schedule a call
              </li>
            </ol>

            <div className="grid gap-8">
              <section>
                <div className="mb-4 border-b border-black/10 pb-3">
                  <h2 className="font-display text-2xl font-extrabold">Account owner</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className={labelClassName}>
                    Name
                    <input name="name" required className={inputClassName} placeholder="Your name" />
                  </label>
                  <label className={labelClassName}>
                    Work email
                    <input name="email" type="email" required className={inputClassName} placeholder="you@brand.com" />
                  </label>
                  <label className={labelClassName}>
                    Your role
                    <select name="role" required className={inputClassName}>
                      <option value="">Select role</option>
                      <option>Founder / owner</option>
                      <option>Growth or marketing lead</option>
                      <option>Social / community manager</option>
                      <option>Agency or operator</option>
                      <option>Creator / talent team</option>
                    </select>
                  </label>
                  <label className={labelClassName}>
                    Brand type
                    <select name="brandType" required className={inputClassName}>
                      <option value="">Select brand type</option>
                      <option>DTC product brand</option>
                      <option>Creator-led brand</option>
                      <option>Class, event, or booking business</option>
                      <option>Agency / multi-brand team</option>
                      <option>Celebrity, VIP, or community launch</option>
                    </select>
                  </label>
                </div>
              </section>

              <section>
                <div className="mb-4 border-b border-black/10 pb-3">
                  <h2 className="font-display text-2xl font-extrabold">Instagram signal</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`${labelClassName} md:col-span-2`}>
                    Instagram handle
                    <input
                      name="handle"
                      required
                      pattern="^@?[A-Za-z0-9._]{2,30}$"
                      title="Use an Instagram handle such as @brandname."
                      className={inputClassName}
                      placeholder="@brand"
                    />
                    <span className="text-xs font-medium text-black/38">Use the handle where DMs, comments, story replies, and tags come in.</span>
                  </label>
                  <label className={labelClassName}>
                    Monthly DM/comment volume
                    <select name="volume" required className={inputClassName}>
                      <option value="">Select volume</option>
                      <option>Under 500</option>
                      <option>500-1,500</option>
                      <option>1,500-5,000</option>
                      <option>5,000-10,000</option>
                      <option>10,000+</option>
                    </select>
                  </label>
                  <label className={labelClassName}>
                    Launch or workflow timing
                    <select name="timing" required className={inputClassName}>
                      <option value="">Select timing</option>
                      <option>This week</option>
                      <option>Next 30 days</option>
                      <option>Next 90 days</option>
                      <option>Ongoing Instagram operations</option>
                      <option>Exploring before launch</option>
                    </select>
                  </label>
                </div>
              </section>

              <section>
                <div className="mb-4 border-b border-black/10 pb-3">
                  <h2 className="font-display text-2xl font-extrabold">Goal and context</h2>
                </div>
                <div className="grid gap-4">
                  <label className={labelClassName}>
                    Primary goal
                    <select name="goal" required className={inputClassName}>
                      <option value="">Select goal</option>
                      {goals.map((goal) => (
                        <option key={goal}>{goal}</option>
                      ))}
                    </select>
                  </label>
                  <label className={labelClassName}>
                    What is slowing the team down right now?
                    <textarea
                      name="pain"
                      rows={4}
                      className={textareaClassName}
                      placeholder="Restock DMs, launch comments, booking questions, VIP replies, creator handoffs..."
                    />
                  </label>
                </div>
              </section>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-8 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-[#080b0f] px-7 py-4 text-base font-black text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Instagram intake'}
              <ArrowRight className="h-4 w-4" />
            </button>

            {status === 'error' && statusMessage && (
              <p
                className="mt-4 text-center text-sm font-bold text-red-600"
              >
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
