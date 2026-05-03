type LeadRequest = {
  name?: unknown;
  email?: unknown;
  handle?: unknown;
  message?: unknown;
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
          '*New GrowthSync get-started request*',
          `*Name:* ${payload.name}`,
          `*Email:* ${payload.email}`,
          `*Social handle / brand:* ${payload.handle || 'Not provided'}`,
          `*Source:* ${payload.source}`,
          '',
          payload.message || 'No message provided.',
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
    'New GrowthSync get-started request',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Social handle / brand: ${payload.handle || 'Not provided'}`,
    `Source: ${payload.source}`,
    '',
    payload.message || 'No message provided.',
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

export default async function handler(request: VercelRequest, response: JsonResponse) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = parseBody(request.body);
  const payload = {
    name: toText(body.name, 160),
    email: toText(body.email, 240).toLowerCase(),
    handle: toText(body.handle, 200),
    message: toText(body.message, 2000),
    source: toText(body.source, 120) || 'get-started',
    capturedAt: new Date().toISOString(),
    userAgent: toText(request.headers?.['user-agent'], 300),
  };

  if (!payload.name || !emailPattern.test(payload.email)) {
    response.status(400).json({ ok: false, error: 'Please include a valid name and email.' });
    return;
  }

  try {
    const [webhookSent, emailSent] = await Promise.all([
      sendLeadWebhook(payload),
      sendLeadEmail(payload),
    ]);

    if (!webhookSent && !emailSent) {
      response.status(503).json({
        ok: false,
        error: 'Lead capture is not configured.',
      });
      return;
    }

    response.status(200).json({
      ok: true,
      captured: true,
      destinations: {
        webhook: webhookSent,
        email: emailSent,
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
