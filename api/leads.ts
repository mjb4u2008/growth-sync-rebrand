type LeadRequest = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  handle?: unknown;
  social?: unknown;
  socialHandles?: unknown;
  social_handles?: unknown;
  message?: unknown;
  notes?: unknown;
  source?: unknown;
  attribution?: unknown;
};

type JsonResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => JsonResponse;
  json: (body: unknown) => void;
};

type VercelRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: LeadRequest | string;
};

const attributionKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
] as const;

type AttributionKey = (typeof attributionKeys)[number];

type LeadAttribution = {
  capturedAt?: string;
  landingPage?: string;
  referrer?: string;
  fields: Partial<Record<AttributionKey, string>>;
};

type LeadPayload = {
  name: string;
  company: string;
  email: string;
  socialHandles: string;
  notes: string;
  source: string;
  capturedAt: string;
  userAgent: string;
  referrer: string;
  attribution?: LeadAttribution;
  attributionSummary: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toText(value: unknown, maxLength = 1000) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function toAttributionText(value: unknown, maxLength = 240) {
  return toText(value, maxLength).replace(/[\u0000-\u001F\u007F]/g, '');
}

function getRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function sanitizeAttribution(value: unknown): LeadAttribution | undefined {
  const attribution = getRecord(value);
  if (!attribution) return undefined;

  const fieldSource = getRecord(attribution.fields) || attribution;
  const fields: Partial<Record<AttributionKey, string>> = {};

  for (const key of attributionKeys) {
    const field = toAttributionText(fieldSource[key], 240);
    if (field) fields[key] = field;
  }

  const capturedAt = toAttributionText(attribution.capturedAt, 40);
  const landingPage = toAttributionText(attribution.landingPage, 500);
  const referrer = toAttributionText(attribution.referrer, 500);

  if (Object.keys(fields).length === 0 && !capturedAt && !landingPage && !referrer) {
    return undefined;
  }

  return {
    ...(capturedAt ? { capturedAt } : {}),
    ...(landingPage ? { landingPage } : {}),
    ...(referrer ? { referrer } : {}),
    fields,
  };
}

function summarizeAttribution(attribution?: LeadAttribution) {
  if (!attribution) return '';

  const fields = attribution.fields;
  const parts = [
    fields.utm_source ? `source=${fields.utm_source}` : null,
    fields.utm_medium ? `medium=${fields.utm_medium}` : null,
    fields.utm_campaign ? `campaign=${fields.utm_campaign}` : null,
    fields.utm_content ? `content=${fields.utm_content}` : null,
    fields.utm_term ? `term=${fields.utm_term}` : null,
    fields.gclid ? 'gclid=present' : null,
    fields.gbraid ? 'gbraid=present' : null,
    fields.wbraid ? 'wbraid=present' : null,
    fields.fbclid ? 'fbclid=present' : null,
    fields.msclkid ? 'msclkid=present' : null,
  ].filter(Boolean);

  return parts.join(' | ');
}

function parseBody(body: VercelRequest['body']): LeadRequest {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as LeadRequest;
    } catch {
      return {};
    }
  }

  return body;
}

async function sendLeadWebhook(payload: LeadPayload) {
  const webhookUrl = process.env.GROWTHSYNC_LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  const isSlackWebhook = webhookUrl.includes('hooks.slack.com/');
  const body = isSlackWebhook
    ? {
        text: [
          '*New GrowthSync book-a-call request*',
          `*Name:* ${payload.name}`,
          `*Company:* ${payload.company}`,
          `*Email:* ${payload.email}`,
          `*Social handles:* ${payload.socialHandles || 'Not provided'}`,
          `*Source:* ${payload.source}`,
          payload.attributionSummary ? `*Attribution:* ${payload.attributionSummary}` : null,
          '',
          payload.notes || 'No notes provided.',
        ].filter(Boolean).join('\n'),
      }
    : payload;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook failed with ${response.status}`);
  }

  return true;
}

async function sendLeadEmail(payload: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return false;
  }

  const to = process.env.LEAD_NOTIFICATION_EMAIL || 'hello@growthsync.com';
  const from = process.env.LEAD_NOTIFICATION_FROM || 'GrowthSync <leads@growthsync.com>';
  const lines = [
    'New GrowthSync book-a-call request',
    '',
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Social handles: ${payload.socialHandles || 'Not provided'}`,
    `Source: ${payload.source}`,
    payload.attributionSummary ? `Attribution: ${payload.attributionSummary}` : null,
    '',
    payload.notes || 'No notes provided.',
  ].filter(Boolean);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `GrowthSync lead: ${payload.name}`,
      reply_to: payload.email,
      text: lines.join('\n'),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed with ${response.status}`);
  }

  return true;
}

const BOOK_A_CALL_SOURCE = 'book-a-call';
const SOCIAL_COMMERCE_SUMMIT_SOURCE = 'social-commerce-summit';
const DEFAULT_SOCIAL_COMMERCE_SUMMIT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvzezgdr';

const FORMSPREE_DESTINATIONS: Record<string, { endpoint: string; subjectLabel: string }> = {
  [BOOK_A_CALL_SOURCE]: {
    endpoint: 'https://formspree.io/f/mkodogar',
    subjectLabel: 'Book a Call',
  },
  [SOCIAL_COMMERCE_SUMMIT_SOURCE]: {
    endpoint: process.env.SOCIAL_COMMERCE_SUMMIT_FORMSPREE_ENDPOINT || DEFAULT_SOCIAL_COMMERCE_SUMMIT_FORMSPREE_ENDPOINT,
    subjectLabel: 'Social Commerce Summit',
  },
};

async function sendLeadToFormspree(payload: LeadPayload) {
  const destination = FORMSPREE_DESTINATIONS[payload.source];

  if (!destination) {
    return false;
  }

  const response = await fetch(destination.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.socialHandles,
      notes: payload.notes,
      source: payload.source,
      _subject: `GrowthSync lead: ${payload.name} (${destination.subjectLabel})`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Formspree submission failed with ${response.status}`);
  }

  return true;
}

function missingSupabaseEnv() {
  const missing: string[] = [];
  if (!process.env.SUPABASE_URL) {
    missing.push('SUPABASE_URL');
  }
  if (!getSupabaseServerKey()) {
    missing.push('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_PUBLISHABLE_KEY or SUPABASE_ANON_KEY');
  }
  return missing;
}

function getSupabaseServerKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY
    || process.env.SUPABASE_PUBLISHABLE_KEY
    || process.env.SUPABASE_ANON_KEY;
}

async function storeLeadInSupabase(payload: LeadPayload) {
  const missing = missingSupabaseEnv();

  if (missing.length > 0) {
    return { configured: false, stored: false, missing };
  }

  const baseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseKey = getSupabaseServerKey();

  if (!baseUrl || !supabaseKey) {
    return { configured: false, stored: false, missing };
  }

  const response = await fetch(`${baseUrl}/rest/v1/book_call_leads`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: payload.name,
      company: payload.company,
      email: payload.email,
      social_handles: payload.socialHandles,
      notes: payload.notes,
      source: payload.source || 'book-a-call',
      user_agent: payload.userAgent,
      referrer: payload.referrer,
      metadata: {
        captured_at: payload.capturedAt,
        ...(payload.attribution ? { attribution: payload.attribution } : {}),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Supabase lead insert failed with ${response.status}`);
  }

  return { configured: true, stored: true, missing: [] as string[] };
}

function notificationEnvStatus() {
  const hasWebhook = Boolean(process.env.GROWTHSYNC_LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL);
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const missing: string[] = [];

  if (!hasWebhook) {
    missing.push('GROWTHSYNC_LEAD_WEBHOOK_URL or LEAD_WEBHOOK_URL or SLACK_WEBHOOK_URL');
  }

  if (!hasResend) {
    missing.push('RESEND_API_KEY');
  }

  if (hasResend && !process.env.LEAD_NOTIFICATION_EMAIL) {
    missing.push('LEAD_NOTIFICATION_EMAIL');
  }

  if (hasResend && !process.env.LEAD_NOTIFICATION_FROM) {
    missing.push('LEAD_NOTIFICATION_FROM');
  }

  return { hasWebhook, hasResend, missing };
}

export default async function handler(request: VercelRequest, response: JsonResponse) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = parseBody(request.body);
  const socialHandles = toText(body.socialHandles ?? body.social_handles ?? body.social ?? body.handle, 280);
  const notes = toText(body.notes ?? body.message, 2400);
  const payload = {
    name: toText(body.name, 160),
    company: toText(body.company, 180),
    email: toText(body.email, 240).toLowerCase(),
    socialHandles,
    notes,
    source: toText(body.source, 120) || 'book-a-call',
    capturedAt: new Date().toISOString(),
    userAgent: toText(request.headers?.['user-agent'], 300),
    referrer: toText(request.headers?.referer ?? request.headers?.referrer, 500),
    attribution: sanitizeAttribution(body.attribution),
    attributionSummary: '',
  };
  payload.attributionSummary = summarizeAttribution(payload.attribution);

  if (!payload.name || !payload.company || !payload.socialHandles || !emailPattern.test(payload.email)) {
    response.status(400).json({
      ok: false,
      error: 'Please include a valid name, company, email, and social handles.',
    });
    return;
  }

  try {
    const [databaseSettled, webhookSettled, emailSettled, formspreeSettled] = await Promise.allSettled([
      storeLeadInSupabase(payload),
      sendLeadWebhook(payload),
      sendLeadEmail(payload),
      sendLeadToFormspree(payload),
    ]);
    const databaseResult = databaseSettled.status === 'fulfilled'
      ? databaseSettled.value
      : { configured: true, stored: false, missing: [] as string[] };
    const webhookSent = webhookSettled.status === 'fulfilled' ? webhookSettled.value : false;
    const emailSent = emailSettled.status === 'fulfilled' ? emailSettled.value : false;
    const formspreeSent = formspreeSettled.status === 'fulfilled' ? formspreeSettled.value : false;

    if (!databaseResult.stored && !webhookSent && !emailSent && !formspreeSent) {
      const notification = notificationEnvStatus();
      const failed = [
        databaseSettled.status === 'rejected' ? 'supabase' : null,
        webhookSettled.status === 'rejected' ? 'webhook' : null,
        emailSettled.status === 'rejected' ? 'email' : null,
        formspreeSettled.status === 'rejected' ? 'formspree' : null,
      ].filter(Boolean);

      if (failed.length > 0) {
        console.error(`Lead capture failed for destinations: ${failed.join(', ')}`);
      }

      response.status(503).json({
        ok: false,
        error: failed.length > 0 ? 'Lead capture destinations failed.' : 'Lead capture is not configured.',
        missing: {
          supabase: databaseResult.missing,
          notification: notification.missing,
        },
      });
      return;
    }

    response.status(200).json({
      ok: true,
      captured: true,
      destinations: {
        supabase: databaseResult.stored,
        webhook: webhookSent,
        email: emailSent,
        formspree: formspreeSent,
      },
      warnings: [
        databaseSettled.status === 'rejected' ? 'Supabase insert failed; notification capture succeeded.' : null,
        webhookSettled.status === 'rejected' ? 'Webhook notification failed.' : null,
        emailSettled.status === 'rejected' ? 'Email notification failed.' : null,
        formspreeSettled.status === 'rejected' ? 'Formspree submission failed.' : null,
      ].filter(Boolean),
      missing: {
        supabase: databaseResult.missing,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(502).json({
      ok: false,
      error: 'Lead capture failed.',
    });
  }
}
