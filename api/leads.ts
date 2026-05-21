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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toText(value: unknown, maxLength = 1000) {
  return String(value ?? '').trim().slice(0, maxLength);
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

async function sendLeadWebhook(payload: Record<string, string>) {
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
          '',
          payload.notes || 'No notes provided.',
        ].join('\n'),
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

async function sendLeadEmail(payload: Record<string, string>) {
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
    '',
    payload.notes || 'No notes provided.',
  ];

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

async function storeLeadInSupabase(payload: Record<string, string>) {
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
  };

  if (!payload.name || !payload.company || !payload.socialHandles || !emailPattern.test(payload.email)) {
    response.status(400).json({
      ok: false,
      error: 'Please include a valid name, company, email, and social handles.',
    });
    return;
  }

  try {
    const [databaseSettled, webhookSettled, emailSettled] = await Promise.allSettled([
      storeLeadInSupabase(payload),
      sendLeadWebhook(payload),
      sendLeadEmail(payload),
    ]);
    const databaseResult = databaseSettled.status === 'fulfilled'
      ? databaseSettled.value
      : { configured: true, stored: false, missing: [] as string[] };
    const webhookSent = webhookSettled.status === 'fulfilled' ? webhookSettled.value : false;
    const emailSent = emailSettled.status === 'fulfilled' ? emailSettled.value : false;

    if (!databaseResult.stored && !webhookSent && !emailSent) {
      const notification = notificationEnvStatus();
      const failed = [
        databaseSettled.status === 'rejected' ? 'supabase' : null,
        webhookSettled.status === 'rejected' ? 'webhook' : null,
        emailSettled.status === 'rejected' ? 'email' : null,
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
      },
      warnings: [
        databaseSettled.status === 'rejected' ? 'Supabase insert failed; notification capture succeeded.' : null,
        webhookSettled.status === 'rejected' ? 'Webhook notification failed.' : null,
        emailSettled.status === 'rejected' ? 'Email notification failed.' : null,
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
