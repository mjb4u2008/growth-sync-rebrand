/**
 * Real GrowthSync blog catalog adapted into the Y2K signals.psheet UI.
 *
 * The source of truth remains the migrated production article data in
 * `src/data/blogPosts.tsx`; this adapter adds slug routes, tab metadata,
 * image alt text, and legacy numeric-link rewrites.
 */

import React, { type ReactNode } from "react";

import { blogPosts as legacyBlogPosts } from "@/data/blogPosts";
import type { BlogPost, BlogTab, SignalType } from "./types";
import { slugify } from "./utils";

type LegacyPost = (typeof legacyBlogPosts)[number];
type EvidenceSource = {
  label: string;
  href: string;
};

const TECH_CATEGORIES = new Set(["Company", "Product", "Technology", "AI", "Automation"]);
const TECH_TAGS = new Set([
  "Product Engineering",
  "Founding Engineer",
  "Technology",
  "AI",
  "Automation",
  "Infrastructure",
  "Product",
  "Operations",
]);

const SOURCES = {
  emarketerSocialCommerce2026: {
    label: "EMARKETER: US Social Commerce Forecast 2026",
    href: "https://www.emarketer.com/content/us-social-commerce-forecast-2026",
  },
  emarketerTikTokShop2025: {
    label: "EMARKETER: TikTok Shop and US social commerce share",
    href: "https://www.emarketer.com/press-releases/tiktok-shop-makes-up-nearly-20-of-social-commerce-in-2025/",
  },
  shopifySocialCommerce: {
    label: "Shopify Help Center: Social commerce sales channels",
    href: "https://help.shopify.com/en/manual/online-sales-channels/social-commerce",
  },
  mckinseySocialCommerce: {
    label: "McKinsey: Social commerce and US brand growth strategies",
    href: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/social-commerce-the-future-of-how-consumers-interact-with-brands",
  },
  sproutCustomerCare: {
    label: "Sprout Social: Social media customer service statistics",
    href: "https://sproutsocial.com/insights/social-media-customer-service-statistics/",
  },
  sproutIndex2025: {
    label: "Sprout Social: 2025 social index consumer expectations",
    href: "https://sproutsocial.com/insights/press/the-days-of-trend-chasing-are-over-new-research-from-sprout-social-reveals-a-third-of-consumers-think-jumping-on-viral-trends-is-embarrassing-for-brands/",
  },
  hubspotLeadResponse: {
    label: "HubSpot: Lead response time and speed-to-lead operations",
    href: "https://www.hubspot.com/reduce-lead-response-time",
  },
  tiktokShopBfcm2025: {
    label: "TikTok Newsroom: TikTok Shop 2025 Black Friday/Cyber Monday results",
    href: "https://newsroom.tiktok.com/tiktok-shop-had-our-biggest-bfcm-weekend-ever",
  },
  adobeHoliday2025: {
    label: "Adobe: 2025 holiday online shopping data",
    href: "https://news.adobe.com/news/2026/01/adobe-holiday-shopping-season",
  },
  mckinseyAiShopping: {
    label: "McKinsey: AI and the changing shopping journey",
    href: "https://www.mckinsey.com/industries/retail/our-insights/shopping-in-the-age-of-ai-redefining-stores-for-a-new-era",
  },
  salesforceConnectedCustomer: {
    label: "Salesforce: State of the Connected Customer",
    href: "https://www.salesforce.com/ca/resources/research-reports/state-of-the-connected-customer/",
  },
} satisfies Record<string, EvidenceSource>;

const postSlugById = new Map<number, string>();

function slugFromPost(post: LegacyPost) {
  const imageSlug = post.image?.startsWith("/blog/")
    ? post.image.split("/").pop()?.replace(/\.(png|jpg|jpeg|webp|gif)$/i, "")
    : undefined;

  return imageSlug || slugify(post.title);
}

for (const post of legacyBlogPosts) {
  postSlugById.set(post.id, slugFromPost(post));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function blogTabFor(post: LegacyPost): BlogTab {
  if (post.author.name === "Tanner") return "Tech Corner";
  if (TECH_CATEGORIES.has(post.category)) return "Tech Corner";
  if (post.tags?.some((tag) => TECH_TAGS.has(tag))) return "Tech Corner";
  return "Market Studies";
}

function signalTypeFor(post: LegacyPost): SignalType {
  const haystack = `${post.category} ${post.title} ${post.tags?.join(" ") ?? ""}`.toLowerCase();
  if (haystack.includes("dm")) return "DM";
  if (haystack.includes("comment") || haystack.includes("instagram")) return "Comment";
  if (haystack.includes("creator")) return "Creator Tag";
  if (haystack.includes("live") || haystack.includes("story")) return "Story Reply";
  if (haystack.includes("crm") || haystack.includes("infrastructure") || haystack.includes("engineering")) return "CRM";
  return "Purchase Intent";
}

function titleFor(post: LegacyPost) {
  if (post.id === 34) {
    return "Instagram Copied TikTok Shop's Playbook. What It Means for E-Commerce Brands";
  }
  return post.title;
}

function uniqueSources(sources: EvidenceSource[]) {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (seen.has(source.href)) return false;
    seen.add(source.href);
    return true;
  });
}

function evidenceSourcesFor(post: LegacyPost): EvidenceSource[] {
  const haystack = `${post.title} ${post.category} ${post.tags?.join(" ") ?? ""}`.toLowerCase();
  const sources: EvidenceSource[] = [];

  if (haystack.includes("tiktok") || haystack.includes("creator") || haystack.includes("influencer")) {
    sources.push(SOURCES.emarketerTikTokShop2025, SOURCES.tiktokShopBfcm2025, SOURCES.mckinseySocialCommerce);
  }

  if (haystack.includes("black friday") || haystack.includes("holiday")) {
    sources.push(SOURCES.adobeHoliday2025, SOURCES.tiktokShopBfcm2025, SOURCES.sproutIndex2025);
  }

  if (
    haystack.includes("dm")
    || haystack.includes("conversation")
    || haystack.includes("respond")
    || haystack.includes("response")
    || haystack.includes("social listening")
    || haystack.includes("customer")
  ) {
    sources.push(SOURCES.sproutCustomerCare, SOURCES.sproutIndex2025, SOURCES.hubspotLeadResponse);
  }

  if (haystack.includes("live commerce") || haystack.includes("live")) {
    sources.push(SOURCES.mckinseySocialCommerce, SOURCES.emarketerSocialCommerce2026);
  }

  if (haystack.includes("ai") || haystack.includes("chatbot")) {
    sources.push(SOURCES.mckinseyAiShopping, SOURCES.salesforceConnectedCustomer, SOURCES.sproutCustomerCare);
  }

  if (
    haystack.includes("amazon")
    || haystack.includes("crm")
    || haystack.includes("infrastructure")
    || haystack.includes("e-commerce")
    || haystack.includes("ecommerce")
    || haystack.includes("social commerce")
  ) {
    sources.push(SOURCES.shopifySocialCommerce, SOURCES.emarketerSocialCommerce2026, SOURCES.mckinseySocialCommerce);
  }

  sources.push(SOURCES.emarketerSocialCommerce2026, SOURCES.shopifySocialCommerce, SOURCES.mckinseySocialCommerce);
  return uniqueSources(sources).slice(0, 5);
}

function growthSyncReadFor(post: LegacyPost) {
  const haystack = `${post.title} ${post.category} ${post.tags?.join(" ") ?? ""}`.toLowerCase();

  if (haystack.includes("dm") || haystack.includes("response") || haystack.includes("conversation")) {
    return "GrowthSync reads this as evidence that social replies are no longer just community management; they are part of the buying workflow and need routing, memory, and speed.";
  }

  if (haystack.includes("tiktok") || haystack.includes("creator") || haystack.includes("influencer")) {
    return "GrowthSync reads this as evidence that creator-led discovery is moving faster than most owned-channel systems, which is why brands need cleaner customer context when attention turns into intent.";
  }

  if (haystack.includes("black friday") || haystack.includes("holiday")) {
    return "GrowthSync reads this as evidence that high-volume moments reward teams that can capture social intent, answer quickly, and keep customer context intact during spikes.";
  }

  if (haystack.includes("ai") || haystack.includes("chatbot")) {
    return "GrowthSync reads this as evidence that AI only helps when it has useful customer context and human guardrails, especially in public or semi-public social conversations.";
  }

  return "GrowthSync reads these sources as directional evidence for a practical operating layer: capture the signal, understand the customer context, and route the next action while intent is still fresh.";
}

function appendEvidenceSection(content: ReactNode, post: LegacyPost): ReactNode {
  const sources = evidenceSourcesFor(post);

  return (
    <>
      {content}
      <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 mb-8">
        <h2 id="sources-growthsync-read" className="text-3xl font-display font-bold text-gray-950 mt-0 mb-6">
          Sources and GrowthSync read
        </h2>
        <p className="text-base leading-relaxed text-gray-600 mb-4">
          {growthSyncReadFor(post)}
        </p>
        <ul className="list-disc pl-5 space-y-2 text-base leading-relaxed text-gray-600">
          {sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function rewriteHref(href: string) {
  const match = href.match(/^\/blog\/(\d+)\/?$/);
  if (!match) return href;
  const slug = postSlugById.get(Number(match[1]));
  return slug ? `/blog/${slug}` : href;
}

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (React.isValidElement(node)) {
    return flattenText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function transformContent(node: ReactNode): ReactNode {
  if (node == null || typeof node === "boolean" || typeof node === "string" || typeof node === "number") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <React.Fragment key={index}>{transformContent(child)}</React.Fragment>
    ));
  }

  if (!React.isValidElement(node)) return node;

  const props = node.props as {
    children?: ReactNode;
    href?: string;
    id?: string;
    className?: string;
  };
  const nextProps: Record<string, unknown> = {};
  const transformedChildren = transformContent(props.children);

  if (transformedChildren !== props.children) {
    nextProps.children = transformedChildren;
  }

  if (typeof props.href === "string") {
    nextProps.href = rewriteHref(props.href);
  }

  if (node.type === "h2") {
    nextProps.id = props.id || slugify(flattenText(props.children));
  }

  return React.cloneElement(node as React.ReactElement<Record<string, unknown>>, nextProps);
}

function imageAltFor(post: LegacyPost) {
  if (post.author.name === "Tanner") {
    return "Portrait of Tanner for the GrowthSync founding engineer announcement.";
  }
  return `${post.category} field note illustration for ${post.title}.`;
}

export const BLOG_POSTS: BlogPost[] = legacyBlogPosts.map((post) => ({
  id: post.id,
  slug: slugFromPost(post),
  title: titleFor(post),
  excerpt: post.excerpt,
  category: post.category,
  tab: blogTabFor(post),
  signalType: signalTypeFor(post),
  author: {
    name: post.author.name,
    role: post.author.role,
    initials: initials(post.author.name),
    avatar: post.author.avatar,
    bio: post.author.bio,
  },
  date: post.date,
  dateISO: post.dateISO,
  readTime: post.readTime,
  tags: post.tags ?? [],
  image: post.image,
  imageAlt: imageAltFor(post),
  content: appendEvidenceSection(transformContent(post.content), post),
  freshness: post.id === legacyBlogPosts[0]?.id ? "fresh" : undefined,
}));
