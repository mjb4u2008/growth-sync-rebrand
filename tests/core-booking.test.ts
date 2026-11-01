import test from 'node:test';
import assert from 'node:assert/strict';
import { getCoreCalendlyEvent, getCoreSchedulingUrl } from '../src/utils/coreBooking.ts';

const source = {};
const scheduled = { origin: 'https://calendly.com', source, data: { event: 'calendly.event_scheduled' } };

test('calendar URL is constrained to the exact HTTPS Calendly origin', () => {
  for (const value of [undefined, '', 'not-a-url', 'http://calendly.com/mike/30min', 'https://calendly.com.evil.test/mike/30min', 'https://embed.calendly.com/mike/30min', 'https://evil.test/mike/30min', 'https://name:secret@calendly.com/mike/30min', 'https://calendly.com:8443/mike/30min', 'https://calendly.com/']) {
    assert.equal(getCoreSchedulingUrl(value), null, String(value));
  }
});

test('trusted calendar retains its color and uses the prefill API rather than identity query parameters', () => {
  const result = new URL(getCoreSchedulingUrl('https://calendly.com/mike-growthsync/30min?primary_color=f26b1f&name=Old&email=old%40example.com&hide_gdpr_banner=1#old')!);
  assert.equal(result.origin, 'https://calendly.com');
  assert.equal(result.pathname, '/mike-growthsync/30min');
  assert.equal(result.searchParams.get('primary_color'), 'f26b1f');
  assert.equal(result.searchParams.get('hide_event_type_details'), '1');
  assert.equal(result.searchParams.has('name'), false);
  assert.equal(result.searchParams.has('email'), false);
  assert.equal(result.searchParams.has('hide_gdpr_banner'), false);
  assert.equal(result.hash, '');
});

test('booking confirmation requires both the exact origin and the active iframe source', () => {
  assert.equal(getCoreCalendlyEvent(scheduled, source), 'calendly.event_scheduled');
  for (const message of [
    { ...scheduled, origin: 'https://evil.test' },
    { ...scheduled, origin: 'https://calendly.com.evil.test' },
    { ...scheduled, origin: 'http://calendly.com' },
    { ...scheduled, source: {} },
    { ...scheduled, source: null },
  ]) assert.equal(getCoreCalendlyEvent(message, source), null);
  assert.equal(getCoreCalendlyEvent(scheduled, null), null);
});

test('only known Calendly events with an object payload are accepted', () => {
  for (const data of [null, [], 'calendly.event_scheduled', { event: 1 }, { event: 'calendly.event_scheduled.evil' }, { event: 'event_scheduled' }, { event: 'calendly.unknown' }]) {
    assert.equal(getCoreCalendlyEvent({ ...scheduled, data }, source), null);
  }
  assert.equal(getCoreCalendlyEvent({ ...scheduled, data: { event: 'calendly.date_and_time_selected' } }, source), 'calendly.date_and_time_selected');
});
