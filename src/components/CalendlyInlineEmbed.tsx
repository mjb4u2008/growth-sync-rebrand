import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, CalendarDays } from 'lucide-react';

type CalendlyPrefill = {
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  customAnswers?: Record<string, string>;
};

type CalendlyInlineEmbedProps = {
  url: string;
  prefill: CalendlyPrefill;
  onScheduled?: () => void;
};

type CalendlyWidgetConfig = {
  url: string;
  parentElement: HTMLElement;
  prefill?: CalendlyPrefill;
  resize?: boolean;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (config: CalendlyWidgetConfig) => void;
    };
  }
}

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.Calendly) {
    return Promise.resolve();
  }

  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Calendly.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Calendly.'));
    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}

function isCalendlyMessage(event: MessageEvent) {
  return event.origin === 'https://calendly.com' && typeof event.data?.event === 'string' && event.data.event.startsWith('calendly.');
}

export default function CalendlyInlineEmbed({ url, prefill, onScheduled }: CalendlyInlineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = '';
    setStatus('loading');

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) {
          return;
        }

        containerRef.current.innerHTML = '';
        window.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
          prefill,
          resize: true,
        });
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
        }
      });

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [url, JSON.stringify(prefill)]);

  useEffect(() => {
    if (!onScheduled) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (!isCalendlyMessage(event)) {
        return;
      }

      if (event.data.event === 'calendly.event_scheduled') {
        onScheduled();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [onScheduled]);

  return (
    <div className="relative h-[860px] rounded-[28px] border border-gray-200 bg-white overflow-hidden md:h-[920px]">
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white/90 px-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <CalendarDays className="h-7 w-7" />
          </div>
          <p className="text-sm font-medium text-gray-500">Loading calendar...</p>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-teal-500" />
          </div>
        </div>
      )}

      {status === 'error' ? (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle className="h-7 w-7" />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-500">
            The calendar did not load here. Open it in a new tab and keep moving.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Open Calendly
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="h-full w-full"
          style={{ minWidth: '320px' }}
        />
      )}
    </div>
  );
}
