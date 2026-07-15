export const CALENDLY_ENV_KEYS = [
  'NEXT_PUBLIC_SCHEDULER_URL',
  'NEXT_PUBLIC_CALENDLY_URL',
  'VITE_ROD_CALENDLY_URL',
  'ROD_CALENDLY_URL',
  'VITE_CALENDLY_URL',
  'CALENDLY_URL',
  'VITE_DEMO_CALENDLY_URL',
  'DEMO_CALENDLY_URL',
  'VITE_CALENDLY_LINK',
  'CALENDLY_LINK',
  'VITE_SCHEDULING_URL',
  'SCHEDULING_URL',
] as const;

export const DEFAULT_CALENDLY_URL = 'https://calendly.com/mike-growthsync/30min?primary_color=f26b1f';

const CALENDLY_EMBED_PARAMS = {
  hide_event_type_details: '1',
  hide_gdpr_banner: '1',
} as const;

const CALENDLY_THEME_PARAMS = [
  'background_color',
  'text_color',
] as const;

export type DemoLeadDetails = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  volume: string;
};

export function normalizeCalendlyUrl(value?: string | null) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://calendly.com/${trimmed.replace(/^\/+/, '')}`;

  try {
    const url = new URL(candidate);

    if (!/(\.|^)calendly\.com$/i.test(url.hostname)) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function buildCalendlyEmbedUrl(value?: string | null) {
  const normalized = normalizeCalendlyUrl(value);

  if (!normalized) {
    return null;
  }

  const url = new URL(normalized);

  for (const key of CALENDLY_THEME_PARAMS) {
    url.searchParams.delete(key);
  }

  for (const [key, paramValue] of Object.entries(CALENDLY_EMBED_PARAMS)) {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, paramValue);
    }
  }

  return url.toString();
}

export function pickCalendlyUrl(source: Record<string, string | undefined>) {
  for (const key of CALENDLY_ENV_KEYS) {
    const normalized = normalizeCalendlyUrl(source[key]);

    if (normalized) {
      return normalized;
    }
  }

  return null;
}

export function getCalendlyUrlFromClientEnv() {
  return DEFAULT_CALENDLY_URL;
}

export function getVolumeLabel(volume: string) {
  switch (volume) {
    case '<10k':
      return 'Less than 10,000 DMs/month';
    case '10k-50k':
      return '10,000 to 50,000 DMs/month';
    case '50k-100k':
      return '50,000 to 100,000 DMs/month';
    case '>100k':
      return '100,000+ DMs/month';
    default:
      return volume;
  }
}
