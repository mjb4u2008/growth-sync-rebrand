import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { getCalendlyUrlFromClientEnv } from '@/utils/calendly';
import { getCoreCalendlyEvent, getCoreSchedulingUrl } from '@/utils/coreBooking';
import '@/styles/core-booking.css';

type BookingLead = { name: string; email: string };
type CalendlyWidget = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill: BookingLead;
    resize: boolean;
  }) => void;
};
type BookingStatus = 'loading' | 'ready' | 'slow' | 'error';
const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
let widgetPromise: Promise<CalendlyWidget> | null = null;

function getWidget() {
  return (window as unknown as { Calendly?: CalendlyWidget }).Calendly;
}

function loadWidget(): Promise<CalendlyWidget> {
  const existingWidget = getWidget();
  if (typeof existingWidget?.initInlineWidget === 'function') return Promise.resolve(existingWidget);
  if (widgetPromise) return widgetPromise;
  widgetPromise = new Promise<CalendlyWidget>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT}"]`);
    const script = existingScript || document.createElement('script');
    let timeout = 0;
    const finish = (error?: Error) => {
      window.clearTimeout(timeout);
      script.removeEventListener('load', loaded);
      script.removeEventListener('error', failed);
      const widget = getWidget();
      if (error || typeof widget?.initInlineWidget !== 'function') {
        if (!existingScript) script.remove();
        reject(error || new Error('Scheduling widget unavailable'));
      } else resolve(widget);
    };
    const loaded = () => finish();
    const failed = () => finish(new Error('Scheduling widget could not load'));
    script.addEventListener('load', loaded, { once: true });
    script.addEventListener('error', failed, { once: true });
    timeout = window.setTimeout(() => finish(new Error('Scheduling widget timed out')), 12000);
    if (!existingScript) {
      script.src = WIDGET_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
  }).catch(error => {
    widgetPromise = null;
    throw error;
  });
  return widgetPromise;
}

/** Mounted only after the lead handler has explicitly confirmed capture. */
export function CoreBooking({ lead, active, titleId, descriptionId, onClose }: {
  lead: BookingLead;
  active: boolean;
  titleId: string;
  descriptionId: string;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<BookingStatus>('loading');
  const [scheduled, setScheduled] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const schedulingUrl = useMemo(() => getCoreSchedulingUrl(getCalendlyUrlFromClientEnv()), []);

  useEffect(() => {
    if (active) headingRef.current?.focus();
  }, [active, scheduled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!active || scheduled || !container || !schedulingUrl) return;
    let cancelled = false;
    setStatus('loading');
    container.replaceChildren();
    iframeRef.current = null;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus(current => current === 'loading' ? 'slow' : current);
    }, 15000);
    const ready = () => {
      if (cancelled) return;
      window.clearTimeout(timeout);
      setStatus('ready');
    };
    const attachFrame = () => {
      const iframe = container.querySelector('iframe');
      if (!iframe || iframe === iframeRef.current) return;
      iframeRef.current = iframe;
      iframe.title = 'Choose a time for your GrowthSync introduction';
      iframe.setAttribute('referrerpolicy', 'no-referrer');
    };
    const observer = new MutationObserver(attachFrame);
    observer.observe(container, { childList: true, subtree: true });
    // A loaded iframe can still be blank; wait for Calendly to confirm its UI is ready.
    const onMessage = (message: MessageEvent) => {
      const event = getCoreCalendlyEvent(message, iframeRef.current?.contentWindow);
      if (!event || cancelled) return;
      ready();
      if (event === 'calendly.event_scheduled') setScheduled(true);
    };
    window.addEventListener('message', onMessage);
    loadWidget().then(widget => {
      if (cancelled) return;
      widget.initInlineWidget({
        url: schedulingUrl,
        parentElement: container,
        prefill: { name: lead.name, email: lead.email },
        resize: true,
      });
      attachFrame();
    }).catch(() => {
      if (!cancelled) {
        window.clearTimeout(timeout);
        setStatus('error');
      }
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener('message', onMessage);
      iframeRef.current = null;
      container.replaceChildren();
    };
  }, [active, scheduled, schedulingUrl, lead.name, lead.email, attempt]);

  return (
    <div className="core-booking">
      <div className="core-booking-header">
        <p className="core-booking-received" role="status"><Check size={15} aria-hidden="true" /> Inquiry received</p>
        <h2 id={titleId} ref={headingRef} tabIndex={-1}>{scheduled ? 'You’re booked.' : 'Choose a time.'}</h2>
        <p id={descriptionId}>{scheduled
          ? 'Your introduction is scheduled. Look for the calendar invitation at the email you shared.'
          : 'Your details are with our team. Pick a time below to meet GrowthSync.'}</p>
      </div>
      {!scheduled && status === 'slow' && schedulingUrl && (
        <div className="core-booking-recovery" role="status">
          <p>The calendar is taking longer to load.</p>
          <div>
            <button type="button" className="core-booking-retry" onClick={() => setAttempt(value => value + 1)}>Reload calendar</button>
            <a href={schedulingUrl} target="_blank" rel="noopener noreferrer">Open in a new tab <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      )}
      {scheduled ? (
        <div className="core-booking-complete">
          <button className="core-submit" type="button" onClick={onClose}>Back to GrowthSync <ArrowUpRight size={18} aria-hidden="true" /></button>
        </div>
      ) : (
        <>
          <div className="core-booking-calendar" data-status={schedulingUrl ? status : 'error'} aria-busy={Boolean(schedulingUrl) && status === 'loading'}>
            <div className="core-booking-widget" ref={containerRef} />
            {status === 'loading' && <p className="core-booking-feedback" role="status">Loading available times…</p>}
            {(status === 'error' || !schedulingUrl) && (
              <div className="core-booking-feedback" role="status">
                <p>The calendar couldn’t load here. Your inquiry is still received.</p>
                {schedulingUrl && <button type="button" className="core-booking-retry" onClick={() => setAttempt(value => value + 1)}>Try again</button>}
              </div>
            )}
          </div>
          <div className="core-booking-footer">
            {schedulingUrl && <a href={schedulingUrl} target="_blank" rel="noopener noreferrer">Open calendar in a new tab <ArrowUpRight size={15} aria-hidden="true" /></a>}
            <p>Your appointment is confirmed when you complete the booking in Calendly.</p>
          </div>
        </>
      )}
    </div>
  );
}
