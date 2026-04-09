import React, { startTransition, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleHelp,
  Mail,
  MessageSquare,
  User,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CalendlyInlineEmbed from '../components/CalendlyInlineEmbed';
import { buildCalendlyEmbedUrl, getCalendlyUrlFromClientEnv, getVolumeLabel, type DemoLeadDetails } from '../utils/calendly';

type BookingStep = 'details' | 'schedule' | 'confirmed';

const REQUIRED_FIELDS: Array<keyof DemoLeadDetails> = ['firstName', 'lastName', 'email', 'company'];

export default function BookDemo() {
  const [formState, setFormState] = useState<DemoLeadDetails>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    volume: '10k-50k',
  });
  const [step, setStep] = useState<BookingStep>('details');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [runtimeCalendlyUrl, setRuntimeCalendlyUrl] = useState<string | null>(() => getCalendlyUrlFromClientEnv());
  const [isCalendlyUrlLoading, setIsCalendlyUrlLoading] = useState(() => !getCalendlyUrlFromClientEnv());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const initialUrl = getCalendlyUrlFromClientEnv();

    if (initialUrl) {
      setRuntimeCalendlyUrl(initialUrl);
      setIsCalendlyUrlLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadCalendlyUrl() {
      try {
        const response = await fetch('/api/calendly-link', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Missing Calendly URL');
        }

        const payload = (await response.json()) as { url?: string | null };
        setRuntimeCalendlyUrl(payload.url ?? null);
      } catch {
        setRuntimeCalendlyUrl(null);
      } finally {
        setIsCalendlyUrlLoading(false);
      }
    }

    loadCalendlyUrl();

    return () => controller.abort();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const showFieldError = (field: string) => touched[field] && !formState[field as keyof typeof formState]?.trim();

  const calendlyUrl = buildCalendlyEmbedUrl(runtimeCalendlyUrl);

  const calendlyPrefill = {
    firstName: formState.firstName.trim(),
    lastName: formState.lastName.trim(),
    email: formState.email.trim(),
  };

  const detailSummary = [
    `${formState.firstName.trim()} ${formState.lastName.trim()}`.trim(),
    formState.company.trim(),
  ].filter(Boolean);
  const contactSummary = [formState.email.trim()].filter(Boolean);

  const markRequiredFieldsTouched = () => {
    setTouched((currentTouched) => {
      const nextTouched = { ...currentTouched };

      for (const field of REQUIRED_FIELDS) {
        nextTouched[field] = true;
      }

      return nextTouched;
    });
  };

  const handleContinueToSchedule = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    markRequiredFieldsTouched();

    if (!formRef.current?.reportValidity()) {
      return;
    }

    startTransition(() => {
      setStep('schedule');
    });
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>Book a Demo | GrowthSync</title>
        <meta name="description" content="See how top brands automate social revenue with GrowthSync. Get a personalized walkthrough of our conversational AI platform." />
        <link rel="canonical" href="https://growthsync.com/demo" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growthsync.com/demo" />
        <meta property="og:title" content="Book a Demo | GrowthSync" />
        <meta property="og:description" content="See how top brands automate social revenue with GrowthSync. Get a personalized walkthrough of our conversational AI platform." />
        <meta property="og:image" content="https://growthsync.com/growthsync-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Value Prop & Social Proof */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-950/5 text-gray-600 text-xs md:text-sm font-medium mb-6 border border-gray-200/50">
              <Zap className="w-3.5 h-3.5 text-teal-600" />
              Share a few details, then grab time with us.
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-950 mb-6 leading-tight">
              See how top brands automate <span className="text-gradient">social revenue.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Tell us about your brand, then pick a time with Rod for a personalized walkthrough of how GrowthSync turns DMs and comments into a predictable sales channel.
            </p>

            <div className="space-y-6 mb-12">
              {[
                'Share the context we should know about your brand',
                "Pick the slot that works best on Rod's calendar",
                'Get a custom ROI walkthrough for your catalog',
                'Leave with pricing and implementation timing',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-lg bg-gray-950 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              {step === 'confirmed' ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-gray-950 mb-4">You&apos;re booked.</h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-sm mx-auto">
                    Calendly will send the invite, and we'll be ready to dive straight into your brand goals.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('schedule')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Need a different time?
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-950 text-white font-semibold hover:bg-gray-800 transition-colors"
                    >
                      While you wait, explore our latest insights
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : step === 'schedule' ? (
                <>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-950">{detailSummary.join(' / ')}</p>
                      {contactSummary.length > 0 && (
                        <p className="mt-1 text-sm text-gray-500 break-all">{contactSummary.join(' / ')}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">{getVolumeLabel(formState.volume)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Edit
                    </button>
                  </div>

                  {isCalendlyUrlLoading ? (
                    <div className="min-h-[760px] rounded-[28px] border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-4 px-8 text-center">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full w-1/2 animate-pulse rounded-full bg-teal-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-500">Loading calendar...</p>
                    </div>
                  ) : calendlyUrl ? (
                    <CalendlyInlineEmbed
                      url={calendlyUrl}
                      prefill={calendlyPrefill}
                      onScheduled={() => setStep('confirmed')}
                    />
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex items-start gap-4">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-900 font-semibold">The Calendly link isn&apos;t configured yet.</p>
                        <p className="mt-2 text-sm leading-relaxed text-red-800">
                          Add Rod&apos;s scheduling URL to a supported env var and this page will embed it automatically.
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-red-800">
                          In the meantime, email us at <a href="mailto:hello@growthsync.com" className="font-semibold underline">hello@growthsync.com</a> and we&apos;ll book time manually.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <form ref={formRef} onSubmit={handleContinueToSchedule} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formState.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-gray-900 transition-colors ${showFieldError('firstName') ? 'border-red-300' : 'border-gray-200'}`}
                            placeholder="Jane"
                          />
                          {showFieldError('firstName') && <p className="text-red-500 text-xs mt-1">First name is required</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formState.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`block w-full px-3 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-gray-900 transition-colors ${showFieldError('lastName') ? 'border-red-300' : 'border-gray-200'}`}
                          placeholder="Doe"
                        />
                        {showFieldError('lastName') && <p className="text-red-500 text-xs mt-1">Last name is required</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Work email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-gray-900 transition-colors ${showFieldError('email') ? 'border-red-300' : 'border-gray-200'}`}
                          placeholder="jane@company.com"
                        />
                        {showFieldError('email') && <p className="text-red-500 text-xs mt-1">Email is required</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-gray-700">Company name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formState.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-gray-900 transition-colors ${showFieldError('company') ? 'border-red-300' : 'border-gray-200'}`}
                          placeholder="Acme Corp"
                        />
                        {showFieldError('company') && <p className="text-red-500 text-xs mt-1">Company name is required</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label htmlFor="volume" className="text-sm font-medium text-gray-700">
                          Monthly social interactions
                        </label>
                        <div className="group relative">
                          <button
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-gray-600"
                            aria-label="What this means"
                          >
                            <CircleHelp className="h-4 w-4" />
                          </button>
                          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-72 -translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-4 text-left text-xs leading-relaxed text-gray-500 shadow-xl group-hover:block group-focus-within:block">
                            <p className="font-semibold text-gray-900">&quot;What this means&quot;</p>
                            <p className="mt-2">
                              DMs, story mentions, comments, live responses, replies, and other inbound social activity your team has to sort through each month.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                        </div>
                        <select 
                          id="volume" 
                          name="volume" 
                          value={formState.volume}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 text-gray-900 transition-colors appearance-none"
                        >
                          <option value="<10k">Less than 10,000</option>
                          <option value="10k-50k">10,000 - 50,000</option>
                          <option value="50k-100k">50,000 - 100,000</option>
                          <option value=">100k">100,000+</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gray-950 text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                      Continue to calendar
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By submitting this form, you agree to our <Link to="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link> and <Link to="/terms-of-service" className="underline hover:text-gray-700">Terms of Service</Link>.
                    </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
