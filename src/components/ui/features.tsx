import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  MessageCircle,
  MoreHorizontal,
  MousePointerClick,
  Mic,
  UserRoundPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureMessage = {
  side: 'customer' | 'growthsync';
  text: string;
  tone?: 'link' | 'yellow';
  messageDelay: string;
  typingDelay?: string;
  typingDuration?: string;
};

type FeatureStory = {
  label: string;
  headline: string;
  body: string;
  icon: typeof MessageCircle;
  duration: number;
  handle: string;
  status: string;
  avatarColor: string;
  avatarSrc: string;
  messages: FeatureMessage[];
};

const stories: FeatureStory[] = [
  {
    label: 'Convert',
    headline: 'Convert intent into buyers',
    body: 'When someone is ready to book, buy, or join, GrowthSync recognizes the intent and moves them to the right link, offer, or handoff.',
    icon: MousePointerClick,
    duration: 26800,
    handle: 'alex.fitcheck',
    status: 'Active now',
    avatarColor: 'from-[#e7ff78] via-[#0b84ff] to-[#d62976]',
    avatarSrc: '/avatars/alex-fitcheck.jpg',
    messages: [
      { side: 'growthsync', text: 'Thanks for tagging the brand. How are you liking our new hoodie collection?', typingDelay: '0.65s', typingDuration: '2.35s', messageDelay: '3.25s' },
      { side: 'customer', text: 'It’s probably the best set y’all have dropped. My friend was asking about it earlier too.', typingDelay: '4.75s', typingDuration: '3s', messageDelay: '8.1s' },
      { side: 'growthsync', text: 'Here’s a discount code if your friend also wants the set.', typingDelay: '9.7s', typingDuration: '2.15s', messageDelay: '12.1s' },
      { side: 'growthsync', text: 'If they buy, I’ll get you early access to the next drop.', typingDelay: '13s', typingDuration: '2.1s', messageDelay: '15.35s' },
      { side: 'growthsync', text: 'XQB-20', tone: 'link', typingDelay: '16.2s', typingDuration: '1.35s', messageDelay: '17.8s' },
      { side: 'customer', text: 'Too easy, gimme 5 mins.', typingDelay: '19.15s', typingDuration: '2.05s', messageDelay: '21.45s' },
      { side: 'growthsync', text: 'Bet.', typingDelay: '22.75s', typingDuration: '1.25s', messageDelay: '24.25s' },
    ],
  },
  {
    label: 'Capture',
    headline: 'Capture zero-party data',
    body: 'Let your audience volunteer emails, phone numbers, preferences, and drop intent naturally through conversation instead of forcing a cold form.',
    icon: UserRoundPlus,
    duration: 25200,
    handle: 'maya.glow',
    status: 'Active now',
    avatarColor: 'from-[#ff7a18] via-[#af2cff] to-[#0b84ff]',
    avatarSrc: '/avatars/maya-glow.jpg',
    messages: [
      { side: 'customer', text: 'Can you tell me when the gloss restocks?', typingDelay: '0.65s', typingDuration: '1.9s', messageDelay: '2.8s' },
      { side: 'growthsync', text: 'Absolutely. Want a text when it goes live?', typingDelay: '4.15s', typingDuration: '2.05s', messageDelay: '6.4s' },
      { side: 'customer', text: 'Yes please.', typingDelay: '7.65s', typingDuration: '1.55s', messageDelay: '9.35s' },
      { side: 'growthsync', text: "What's your cell?", typingDelay: '10.55s', typingDuration: '1.75s', messageDelay: '12.5s' },
      { side: 'customer', text: '+1 (310) 555-0148', typingDelay: '13.7s', typingDuration: '1.65s', messageDelay: '15.55s' },
      { side: 'growthsync', text: "Perfect, I'll text you when it drops.", typingDelay: '16.45s', typingDuration: '1.85s', messageDelay: '18.5s' },
    ],
  },
  {
    label: 'Engage',
    headline: 'Engage with your audience',
    body: 'Keep your community warm across DMs, comments, replies, and story mentions while your team focuses on the moments that need a human.',
    icon: MessageCircle,
    duration: 19600,
    handle: 'jessica.wears',
    status: 'Active now',
    avatarColor: 'from-[#feda75] via-[#d62976] to-[#4f5bd5]',
    avatarSrc: '/avatars/jessica-wears.jpg',
    messages: [
      { side: 'customer', text: 'Y’all still answering sizing questions from the live?', typingDelay: '0.65s', typingDuration: '1.85s', messageDelay: '2.75s' },
      { side: 'growthsync', text: 'Yes. I saw you were looking at the medium hoodie.', typingDelay: '4.05s', typingDuration: '2s', messageDelay: '6.25s' },
      { side: 'growthsync', text: 'Medium is still available, and I can hold it for 10 minutes.', typingDelay: '7.1s', typingDuration: '1.75s', messageDelay: '9.05s' },
      { side: 'customer', text: 'Perfect. Does it run oversized?', typingDelay: '10.45s', typingDuration: '1.9s', messageDelay: '12.55s' },
      { side: 'growthsync', text: 'A little. If you like a cleaner fit, go true to size.', typingDelay: '13.6s', typingDuration: '1.7s', messageDelay: '15.45s' },
    ],
  },
];

function MessageExchange({ message }: { message: FeatureMessage; key?: string }) {
  const isCustomer = message.side === 'customer';
  const openDelay = message.typingDelay ?? message.messageDelay;

  return (
    <div className="feature-exchange-slot" style={{ animationDelay: openDelay }}>
      <div className={cn('grid', isCustomer ? 'justify-items-start' : 'justify-items-end')}>
        {message.typingDelay && message.typingDuration && (
          <div
            className={cn(
              'feature-exchange-layer feature-typing-bubble flex w-fit items-center gap-1 rounded-full px-3 py-2.5',
              isCustomer ? 'bg-[#eef0f4]' : 'bg-[#0b84ff]',
            )}
            style={{
              animationDelay: message.typingDelay,
              animationDuration: message.typingDuration,
            }}
          >
            <span className={cn('dm-typing-dot h-1 w-1 rounded-full', isCustomer ? 'bg-black/45' : 'bg-white/90')} />
            <span className={cn('dm-typing-dot h-1 w-1 rounded-full', isCustomer ? 'bg-black/35' : 'bg-white/75')} />
            <span className={cn('dm-typing-dot h-1 w-1 rounded-full', isCustomer ? 'bg-black/25' : 'bg-white/60')} />
          </div>
        )}

        <div
          className={cn(
            'feature-exchange-layer feature-text-bubble max-w-[86%] rounded-[1.35rem] px-3.5 py-2.5 text-[13px] font-black leading-5',
            message.tone === 'link' &&
              'rounded-br-md border border-black/8 bg-white text-[#0b84ff] underline decoration-[#0b84ff]/65 decoration-2 underline-offset-4 shadow-sm',
            message.tone === 'yellow' && 'rounded-br-md bg-[#e7ff78] text-[#080b0f]',
            !message.tone && isCustomer && 'rounded-bl-md bg-[#eef0f4] text-[#080b0f]',
            !message.tone && !isCustomer && 'rounded-br-md bg-[#0b84ff] text-white',
          )}
          style={{ animationDelay: message.messageDelay }}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const activeStory = stories[activeIndex];
  const ActiveIcon = activeStory.icon;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setActiveIndex(0);
        setHasStarted(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.28 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % stories.length);
    }, activeStory.duration);

    return () => window.clearTimeout(timer);
  }, [activeIndex, activeStory.duration, hasStarted]);

  return (
    <section ref={sectionRef} id="how" className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[70vh] overflow-hidden rounded-lg border border-black/10 bg-[#e7ff78]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(8,11,15,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(8,11,15,0.08)_1px,transparent_1px)] bg-[size:120px_120px]" />

          <div className="relative grid min-h-[70vh] gap-10 p-6 md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="flex flex-col justify-center">
              <div className="mb-10 flex flex-wrap gap-2">
                {stories.map((story, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={story.label}
                      type="button"
                      onClick={() => {
                        setActiveIndex(index);
                        setHasStarted(true);
                      }}
                      className={cn(
                        'relative overflow-hidden rounded-full border px-5 py-3 text-sm font-black transition-colors',
                        isActive
                          ? 'border-[#080b0f] bg-[#080b0f] text-white'
                          : 'border-[#080b0f]/15 bg-white/45 text-[#080b0f] hover:bg-white/70',
                      )}
                    >
                      {story.label}
                      {isActive && hasStarted && (
                        <span
                          key={`${story.label}-${activeIndex}-${hasStarted ? 'started' : 'idle'}`}
                          className="feature-tab-progress absolute inset-x-0 bottom-0 h-1 bg-[#0b84ff]"
                          style={{ animationDuration: `${story.duration}ms` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div
                key={`${activeStory.label}-${hasStarted ? 'started' : 'waiting'}`}
                className={cn('max-w-2xl', hasStarted && 'feature-copy-in')}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#080b0f] text-white">
                  <ActiveIcon className="h-6 w-6" />
                </div>
                <h2 className="text-5xl font-black leading-[0.88] tracking-tight text-[#080b0f] md:text-7xl">
                  {activeStory.headline}
                </h2>
                <p className="mt-7 max-w-xl text-xl font-bold leading-9 text-[#080b0f]/68">
                  {activeStory.body}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative h-[620px] w-full max-w-[360px] rounded-[3rem] bg-[#080b0f] p-3 shadow-[0_30px_100px_rgba(8,11,15,0.22)]">
                <div className="absolute left-1/2 top-5 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
                <div className="relative h-full overflow-hidden rounded-[2.45rem] bg-[#fbfaf6]">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-black/8 bg-white px-4 pb-3 pt-12">
                      <div className="flex items-center gap-3">
                        <div className={cn('rounded-full bg-gradient-to-tr p-[2px]', activeStory.avatarColor)}>
                          <img
                            src={activeStory.avatarSrc}
                            alt=""
                            className="h-10 w-10 rounded-full border-2 border-white object-cover"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-black leading-4 text-[#080b0f]">{activeStory.handle}</div>
                          <div className="text-xs font-bold leading-4 text-black/45">{activeStory.status}</div>
                        </div>
                      </div>
                      <MoreHorizontal className="h-5 w-5 text-black/45" />
                    </div>

              <div
                className={cn(
                  'relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 pt-5',
                  activeStory.label === 'Convert' ? 'pb-[5.35rem]' : 'pb-[4.7rem]'
                )}
              >
                      <div
                        key={`${activeStory.label}-${hasStarted ? 'started' : 'waiting'}`}
                        className="feature-ig-thread grid gap-2"
                      >
                        {hasStarted &&
                          activeStory.messages.map((message) => (
                            <MessageExchange key={message.text} message={message} />
                          ))}
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#fbfaf6] via-[#fbfaf6] to-[#fbfaf6]/80 px-4 pb-5 pt-4">
                      <div className="flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-2 shadow-sm">
                        <button
                          type="button"
                          aria-label="Open camera"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b84ff] text-white"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                        <div className="min-w-0 flex-1 text-sm font-bold text-black/35">Message...</div>
                        <Mic className="h-4 w-4 text-black/45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
