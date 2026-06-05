const STORAGE_KEY = "growthsync:paid-attribution";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

export const PAID_ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

type AttributionKey = (typeof PAID_ATTRIBUTION_KEYS)[number];

export type PaidAttribution = {
  capturedAt: string;
  landingPage: string;
  referrer: string;
  fields: Partial<Record<AttributionKey, string>>;
};

type StoredAttribution = PaidAttribution & {
  expiresAt: string;
};

let memoryAttribution: StoredAttribution | null = null;

function clean(value: string | null, maxLength: number) {
  return (value ?? "")
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .slice(0, maxLength);
}

function readStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isExpired(attribution: StoredAttribution, now: Date) {
  return Date.parse(attribution.expiresAt) <= now.getTime();
}

function publicAttribution(attribution: StoredAttribution): PaidAttribution {
  const { expiresAt: _expiresAt, ...value } = attribution;
  return value;
}

export function getStoredAttribution(now = new Date()): PaidAttribution | null {
  if (memoryAttribution && !isExpired(memoryAttribution, now)) {
    return publicAttribution(memoryAttribution);
  }

  memoryAttribution = null;
  const storage = readStorage();

  if (storage) {
    try {
      const parsed = JSON.parse(storage.getItem(STORAGE_KEY) || "null") as StoredAttribution | null;
      if (parsed?.expiresAt && !isExpired(parsed, now)) {
        return publicAttribution(parsed);
      }

      storage.removeItem(STORAGE_KEY);
    } catch {
      try {
        storage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage cleanup failures; attribution is best-effort.
      }
    }
  }

  return null;
}

export function capturePaidAttribution(now = new Date()): PaidAttribution | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const fields: Partial<Record<AttributionKey, string>> = {};

  for (const key of PAID_ATTRIBUTION_KEYS) {
    const value = clean(params.get(key), 240);
    if (value) fields[key] = value;
  }

  if (Object.keys(fields).length === 0) {
    return getStoredAttribution(now);
  }

  const attribution: StoredAttribution = {
    capturedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + TTL_MS).toISOString(),
    landingPage: clean(`${window.location.origin}${window.location.pathname}`, 500),
    referrer: clean(document.referrer, 500),
    fields,
  };

  memoryAttribution = attribution;

  const storage = readStorage();
  if (storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch {
      // Keep the in-memory copy for the current SPA session if storage is blocked.
    }
  }

  return publicAttribution(attribution);
}
