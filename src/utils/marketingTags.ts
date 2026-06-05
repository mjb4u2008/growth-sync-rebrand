import { PAID_ATTRIBUTION_KEYS } from "./attribution";

type Gtag = (command: string, eventNameOrId: string | Date, params?: Record<string, unknown>) => void;

type MetaPixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: MetaPixel;
  queue?: unknown[];
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: Gtag;
    fbq?: MetaPixel;
    _fbq?: MetaPixel;
  }
}

const GOOGLE_SCRIPT_ID = "growthsync-google-tag";
const META_SCRIPT_ID = "growthsync-meta-pixel";

let googleLoadedFor: string | null = null;
let metaLoadedFor: string | null = null;
let lastPageViewKey = "";

const measurementQueryKeys = new Set<string>([
  ...PAID_ATTRIBUTION_KEYS,
  "tab",
]);

function env(name: string) {
  const value = import.meta.env[name] as string | undefined;
  return value?.trim() || "";
}

function googleTagId() {
  return env("VITE_GOOGLE_TAG_ID") || env("VITE_GOOGLE_ADS_CONVERSION_ID");
}

function appendScript(id: string, src: string) {
  if (typeof document === "undefined" || document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureGoogleTag() {
  const tagId = googleTagId();
  if (!tagId || typeof window === "undefined") return "";
  if (googleLoadedFor === tagId && window.gtag) return tagId;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  appendScript(GOOGLE_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`);
  googleLoadedFor = tagId;
  return tagId;
}

function ensureMetaPixel() {
  const pixelId = env("VITE_META_PIXEL_ID");
  if (!pixelId || typeof window === "undefined") return "";
  if (metaLoadedFor === pixelId && window.fbq) return pixelId;

  if (!window.fbq) {
    const fbq: MetaPixel = function fbqShim(...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue?.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
  }

  window.fbq("init", pixelId);
  appendScript(META_SCRIPT_ID, "https://connect.facebook.net/en_US/fbevents.js");
  metaLoadedFor = pixelId;
  return pixelId;
}

function sanitizedMeasurementUrl() {
  const url = new URL(window.location.href);
  const sanitizedParams = new URLSearchParams();

  for (const [key, value] of url.searchParams) {
    if (measurementQueryKeys.has(key)) {
      sanitizedParams.append(key, value);
    }
  }

  url.search = sanitizedParams.toString();
  return url;
}

function stripUnsafeMeasurementParams() {
  const sanitized = sanitizedMeasurementUrl();
  if (sanitized.href === window.location.href) return sanitized;

  window.history.replaceState(
    window.history.state,
    "",
    `${sanitized.pathname}${sanitized.search}${sanitized.hash}`,
  );
  return sanitized;
}

function currentPage() {
  return {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  };
}

function eventId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackMarketingPageView() {
  if (typeof window === "undefined") return;

  stripUnsafeMeasurementParams();
  const page = currentPage();
  const tagId = ensureGoogleTag();
  const metaPixelId = ensureMetaPixel();
  const pageViewKey = `${tagId}|${metaPixelId}|${page.page_location}|${page.page_title}`;
  if (pageViewKey === lastPageViewKey) return;
  lastPageViewKey = pageViewKey;

  if (tagId) {
    window.gtag?.("config", tagId, page);
  }

  if (metaPixelId) {
    window.fbq?.("track", "PageView");
  }
}

export function trackLeadConversion() {
  if (typeof window === "undefined") return;

  const conversionId = env("VITE_GOOGLE_ADS_CONVERSION_ID");
  const conversionLabel = env("VITE_GOOGLE_ADS_LEAD_CONVERSION_LABEL");
  const tagId = ensureGoogleTag();

  if (tagId && conversionId && conversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${conversionId}/${conversionLabel}`,
      value: 1.0,
      currency: "USD",
    });
  }

  if (ensureMetaPixel()) {
    window.fbq?.("track", "Lead", { content_name: "Book a call" }, { eventID: eventId("lead") });
  }
}
