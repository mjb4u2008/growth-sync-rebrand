import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Handshake,
  Mail,
  MessageCircle,
  MousePointer2,
  PackageCheck,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import { CoreInquiry } from '@/components/core/CoreInquiry';
import { LOGIN_URL } from '@/pages/config';
import '@/styles/core-home.css';
import '@/styles/grow.css';

const description = 'GrowthSync helps brands turn comments, story replies, and DMs into product answers, captured leads, and customer handoffs across organic, paid, and creator content.';

const useCases = [
  { title: 'Story reply to sale', text: 'Turn a story reply into a product conversation and a path to checkout.', icon: MessageCircle },
  { title: 'Ad comment to customer', text: 'Answer the questions under your ads while shoppers are interested.', icon: MousePointer2 },
  { title: 'Creator post to revenue', text: 'Help people discover and shop your products when a creator posts about you.', icon: Sparkles },
  { title: 'Drop alerts', text: 'Invite interested shoppers to hear from you when the next drop goes live.', icon: Bell },
  { title: 'Restock recovery', text: 'Reconnect with shoppers who asked about an item when it returns.', icon: PackageCheck },
  { title: 'Instant answers', text: 'Help shoppers with sizing, shipping, and product questions around the clock.', icon: CircleHelp },
  { title: 'Grow your list', text: 'Capture emails and numbers with consent, then sync them to Klaviyo.', icon: Mail },
  { title: 'Human handoff', text: 'Route complaints, complex questions, and bigger opportunities to your team.', icon: Handshake },
] as const;

const questions = [
  {
    question: 'What is GrowthSync?',
    answer: 'GrowthSync is an audience-capture and social-commerce platform. It identifies buying intent across comments, DMs, story replies, and ads, then responds, follows up, captures customer data, or routes the conversation to your team.',
  },
  {
    question: 'How does it learn our brand voice?',
    answer: 'GrowthSync learns from your website, product catalog, policies, social content, and approved customer responses. We define your tone, vocabulary, boundaries, and escalation rules so replies reflect your team.',
  },
  {
    question: 'How soon can we see results?',
    answer: 'Once your accounts are connected, GrowthSync can begin detecting and scoring social signals. You can see buying intent, unanswered questions, and engagement opportunities, then measure the conversations and outcomes over time. Results depend on your audience, traffic, and setup.',
  },
  {
    question: 'How do you connect to our accounts?',
    answer: 'GrowthSync connects through official authentication flows and approved Meta and TikTok API infrastructure. You do not need to share your social-media passwords or use unauthorized browser bots to give GrowthSync access.',
  },
  {
    question: 'How do you help protect our accounts?',
    answer: 'GrowthSync is designed to operate within platform rules, permissions, and rate limits. You control what gets sent and when a human should take over. Platform policies and available permissions still apply.',
  },
  {
    question: 'Can we keep our existing accounts?',
    answer: 'Yes. You can connect your existing Instagram and TikTok accounts without changing handles, migrating followers, or rebuilding your audience. We will confirm the account permissions and supported workflows with you during setup.',
  },
] as const;

function DemoButton({ onClick, compact = false }: { onClick: () => void; compact?: boolean }) {
  return <button type="button" className={`grow-demo-button${compact ? ' grow-demo-button--compact' : ''}`} onClick={onClick} aria-haspopup="dialog">
    <span>Book a demo</span><span className="grow-button-arrow" aria-hidden="true"><ArrowRight size={23} strokeWidth={2.5} /></span>
  </button>;
}

function Brand() {
  return <a className="grow-brand" href="/grow" aria-label="GrowthSync for growth teams home">
    <img className="grow-brand-icon" src="/grow/logo-icon.png" alt="" width="142" height="151" />
    <img className="grow-brand-wordmark" src="/grow/wordmark.png" alt="GrowthSync" width="465" height="86" />
  </a>;
}

function PhoneDemo({ name, label, paused, priority = false }: { name: string; label: string; paused: boolean; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    function update() {
      if (!video) return;
      if (paused || !visible || document.hidden) video.pause();
      else void video.play().catch(() => { /* The poster remains available when autoplay is blocked. */ });
    }
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      update();
    }, { threshold: 0.15 });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    if (paused) video.pause();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      video.pause();
    };
  }, [paused]);

  return <div className="grow-phone" role="img" aria-label={label}>
    <div className="grow-phone-screen">
      <video ref={videoRef} muted loop playsInline preload={priority ? 'auto' : 'none'} poster={`/grow/${name}-poster.jpg`} aria-hidden="true" tabIndex={-1}>
        <source src={`/grow/${name}.mp4`} type="video/mp4" />
        <source src={`/grow/${name}.webm`} type="video/webm" />
      </video>
    </div>
    <img className="grow-phone-frame" src="/grow/phone-frame.png" alt="" width="862" height="1772" loading={priority ? 'eager' : 'lazy'} />
  </div>;
}

export default function GrowLanding() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const openInquiry = () => setInquiryOpen(true);
  const pauseDemos = paused || inquiryOpen;

  useEffect(() => {
    document.body.classList.add('grow-page-active');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreferenceChange = () => setPaused(preference.matches);
    preference.addEventListener('change', onPreferenceChange);
    const anchor = window.location.hash.slice(1);
    const scrollFrame = window.requestAnimationFrame(() => {
      if (['grow-main', 'process', 'use-cases', 'faq'].includes(anchor)) document.getElementById(anchor)?.scrollIntoView();
    });
    return () => {
      document.body.classList.remove('grow-page-active');
      preference.removeEventListener('change', onPreferenceChange);
      window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return <div className="grow-page">
    <Helmet>
      <title>GrowthSync for Growth Teams | Turn Engagement Into Revenue</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://www.growthsync.com/grow" />
      <meta property="og:title" content="GrowthSync | Turn Engagement Into Revenue" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://www.growthsync.com/grow" />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content="GrowthSync | Turn Engagement Into Revenue" />
      <meta name="twitter:description" content={description} />
    </Helmet>

    <a className="grow-skip-link" href="#grow-main">Skip to content</a>
    <header className="grow-header grow-container">
      <Brand />
      <nav className="grow-nav" aria-label="Growth teams navigation">
        <a href="#process">How it works</a>
        <a href="#use-cases">Use cases</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="grow-header-actions"><a className="grow-login" href={LOGIN_URL}>Log in</a><DemoButton onClick={openInquiry} compact /></div>
    </header>

    <main id="grow-main" tabIndex={-1}>
      <section className="grow-hero grow-container" aria-labelledby="grow-heading">
        <div className="grow-hero-copy">
          <h1 id="grow-heading">Turn engagement<br />into <span>revenue</span></h1>
          <p>{description}</p>
          <div className="grow-hero-actions"><DemoButton onClick={openInquiry} /><a className="grow-secondary-button" href="#use-cases">See it in action</a></div>
        </div>
        <div className="grow-hero-media">
          <PhoneDemo name="hero" label="Illustrative GrowthSync conversations: a comment becomes a product answer, a stock check, and a path to checkout." paused={pauseDemos} priority />
          <button type="button" className="grow-motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            {paused ? 'Play demos' : 'Pause demos'}
          </button>
        </div>
      </section>

      <section id="process" className="grow-process grow-container grow-section" aria-labelledby="grow-process-heading">
        <h2 id="grow-process-heading" className="grow-section-heading">Agents focused on<br />making you money.</h2>
        <div className="grow-process-row">
          <div className="grow-process-copy"><h3>Make every post work like a storefront.</h3><p>Capture buying intent, engage shoppers, and sync customer data to Klaviyo and your CRM.</p><button className="grow-text-button" type="button" onClick={openInquiry} aria-haspopup="dialog">See it for your brand <ArrowRight size={19} aria-hidden="true" /></button></div>
          <div className="grow-process-media grow-process-media--peach"><PhoneDemo name="relationships" label="Illustrative conversation showing a shopper asking for early access to a product drop." paused={pauseDemos} /></div>
        </div>
        <div className="grow-process-row grow-process-row--reverse">
          <div className="grow-process-copy"><h3>Squeeze more revenue out of every ad dollar.</h3><p>Respond to questions and buying signals under your ads before the opportunity goes cold.</p><button className="grow-text-button" type="button" onClick={openInquiry} aria-haspopup="dialog">See it for your brand <ArrowRight size={19} aria-hidden="true" /></button></div>
          <div className="grow-process-media grow-process-media--lavender"><PhoneDemo name="ad-replies" label="Illustrative paid-social conversation where a shopper asks whether a shoe is available in their size." paused={pauseDemos} /></div>
        </div>
        <div className="grow-process-row">
          <div className="grow-process-copy"><h3>Build customer relationships at scale.</h3><p>Help shoppers around the clock, with your brand voice and clear handoffs to your team.</p><button className="grow-text-button" type="button" onClick={openInquiry} aria-haspopup="dialog">See it for your brand <ArrowRight size={19} aria-hidden="true" /></button></div>
          <div className="grow-process-media grow-process-media--sand"><PhoneDemo name="storefront" label="Illustrative customer conversation answering a question about international shipping." paused={pauseDemos} /></div>
        </div>
      </section>

      <section id="use-cases" className="grow-use-cases grow-section" aria-labelledby="grow-use-cases-heading">
        <div className="grow-container">
          <h2 id="grow-use-cases-heading" className="grow-section-heading">See it in action.</h2>
          <p className="grow-section-intro">Your next customer is already in the conversation.</p>
          <div className="grow-use-case-grid">{useCases.map(({ title, text, icon: Icon }) => <article key={title} className="grow-use-case">
            <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
            <h3>{title}</h3><p>{text}</p>
          </article>)}</div>
        </div>
      </section>

      <section className="grow-insights grow-container grow-section" aria-labelledby="grow-insights-heading">
        <div className="grow-insights-copy"><h2 id="grow-insights-heading">Understand the people behind the comments.</h2><p>See the questions, buying signals, and sentiment in your conversations. Bring that context back to your products, campaigns, and customer relationships.</p><DemoButton onClick={openInquiry} /></div>
        <div className="grow-conversation-study" aria-label="Illustrative examples of audience insights">
          <div className="grow-study-label"><MessageCircle size={18} aria-hidden="true" /> From your conversations</div>
          <div className="grow-conversation"><p>“Does this come in another size?”</p><span>Product questions</span></div>
          <div className="grow-conversation"><p>“Please bring this color back.”</p><span>Restock interest</span></div>
          <div className="grow-conversation"><p>“This is exactly what I was looking for.”</p><span>Audience sentiment</span></div>
          <p className="grow-study-note">Illustrative conversations</p>
        </div>
      </section>

      <section className="grow-invitation grow-container" aria-labelledby="grow-invitation-heading">
        <div className="grow-invitation-inner"><h2 id="grow-invitation-heading">Turn the conversation<br />into your next customer.</h2><p>See what GrowthSync can do for your brand.</p><DemoButton onClick={openInquiry} /></div>
      </section>

      <section id="faq" className="grow-faq grow-container grow-section" aria-labelledby="grow-faq-heading">
        <h2 id="grow-faq-heading" className="grow-section-heading">A few good questions.</h2>
        <div className="grow-faq-list">{questions.map(({ question, answer }) => <details key={question} className="grow-faq-item"><summary>{question}<ChevronDown size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </section>
    </main>

    <footer className="grow-footer grow-container">
      <div><Brand /><p>Audience capture for social commerce.</p></div>
      <nav aria-label="Footer navigation"><a href="/">GrowthSync</a><a href="/blog">Journal</a><a href={LOGIN_URL}>Log in</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>
      <span className="grow-copyright">© {new Date().getFullYear()} GrowthSync</span>
    </footer>

    {typeof document !== 'undefined' && createPortal(<div className="core-support grow-inquiry"><CoreInquiry intent="growth" open={inquiryOpen} onClose={() => setInquiryOpen(false)} /></div>, document.body)}
  </div>;
}
