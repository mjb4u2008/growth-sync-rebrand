export const CORE_CALENDLY_ORIGIN = 'https://calendly.com';

/** Only the trusted scheduling host receives the captured name/email prefill. */
export function getCoreSchedulingUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.origin !== CORE_CALENDLY_ORIGIN || url.username || url.password || url.pathname === '/') return null;
    url.hash = '';
    url.searchParams.set('hide_event_type_details', '1');
    // Keep Calendly's own consent controls and pass identity via its prefill API only.
    for (const key of ['hide_gdpr_banner', 'name', 'email', 'first_name', 'last_name']) url.searchParams.delete(key);
    return url.toString();
  } catch {
    return null;
  }
}

type CalendarMessage = { origin: string; source: unknown; data: unknown };
const EVENTS = new Set([
  'calendly.profile_page_viewed',
  'calendly.event_type_viewed',
  'calendly.date_and_time_selected',
  'calendly.event_scheduled',
]);

/** An origin match alone is insufficient when another Calendly frame is open. */
export function getCoreCalendlyEvent(message: CalendarMessage, frameWindow: unknown): string | null {
  if (!frameWindow || message.origin !== CORE_CALENDLY_ORIGIN || message.source !== frameWindow) return null;
  const data = message.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const event = (data as { event?: unknown }).event;
  return typeof event === 'string' && EVENTS.has(event) ? event : null;
}
