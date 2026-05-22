/**
 * Footer page content registry.
 *
 * Every footer link resolves here. Each entry maps a SimplePageSlug to a
 * short, intentional content block that uses <SimplePage>. Keep these
 * tight - they exist so footer links aren't dead, not as full marketing
 * pages.
 */

import type { ReactNode } from "react";

import { SimplePage } from "./SimplePage";
import type { SimplePageSlug } from "@/blog/router";

interface Section {
  heading: string;
  body: ReactNode;
}

interface FooterPageContent {
  fileName: string;
  eyebrow: string;
  title: string;
  lede: string;
  sections: Section[];
}

const REGISTRY: Record<Exclude<SimplePageSlug, "privacy" | "terms">, FooterPageContent> = {
  // ---- Product ----
  inbox: {
    fileName: "inbox.product",
    eyebrow: "PRODUCT · INBOX",
    title: "Every comment and DM, in one place.",
    lede: "GrowthSync routes Instagram comments, DMs, story replies, and tags into a single unified inbox so your team always knows what to answer next.",
    sections: [
      {
        heading: "What it does",
        body: (
          <ul>
            <li>Unifies Instagram comments, DMs, story replies, and tags.</li>
            <li>Tags signals by intent: question, complaint, drop interest, VIP.</li>
            <li>Routes high-intent conversations to whoever should reply.</li>
          </ul>
        ),
      },
      {
        heading: "Best for",
        body: (
          <p>
            Brands and creators whose comments outrun their team during launches
            and drops. Timing is often the difference between a sale and a silent
            scroll.
          </p>
        ),
      },
    ],
  },
  "customer-memory": {
    fileName: "customer_memory.product",
    eyebrow: "PRODUCT · CUSTOMER MEMORY",
    title: "Zero-party data, kept warm.",
    lede: "Turn every comment, DM, and reply into a structured profile. The next conversation starts with context.",
    sections: [
      {
        heading: "What it does",
        body: (
          <ul>
            <li>Builds a profile for every person who interacts: size, color, channel, intent.</li>
            <li>Surfaces history the moment a familiar handle slides into your DMs.</li>
            <li>Exports cleanly to your CRM, ESP, or warehouse.</li>
          </ul>
        ),
      },
      {
        heading: "Why it matters",
        body: (
          <p>
            Social is not anonymous. The same hundred people drive most of your drops.
            Customer memory makes that obvious and useful.
          </p>
        ),
      },
    ],
  },
  "brand-voice": {
    fileName: "brand_voice.product",
    eyebrow: "PRODUCT · BRAND VOICE",
    title: "Replies that sound like you.",
    lede: "Train GrowthSync on your existing replies, captions, and tone notes. Drafts come back in your voice.",
    sections: [
      {
        heading: "What it does",
        body: (
          <ul>
            <li>Learns from your past comments, DMs, and captions.</li>
            <li>Drafts replies you can send as-is or tweak in one click.</li>
            <li>Adapts across Instagram surfaces: captions, comments, story replies, and DM threads.</li>
          </ul>
        ),
      },
      {
        heading: "Guardrails",
        body: (
          <p>
            You set the voice notes; you can require human approval on anything
            sensitive, including refunds, claims, and partnerships.
          </p>
        ),
      },
    ],
  },
  "live-drop-mode": {
    fileName: "live_drop_mode.product",
    eyebrow: "PRODUCT · LIVE DROP MODE",
    title: "A real-time room for the moments that matter.",
    lede: "Drop day flips GrowthSync into Live Drop Mode: a real-time signal stream, with reply suggestions, sellout alerts, and waitlist capture in one view.",
    sections: [
      {
        heading: "What it does",
        body: (
          <ul>
            <li>Live feed of every comment, DM, and mention as the drop happens.</li>
            <li>Reply suggestions tuned for the moment: sizes, colors, restock ETA.</li>
            <li>Captures waitlist intent automatically when stock runs low.</li>
          </ul>
        ),
      },
      {
        heading: "Best for",
        body: <p>Limited-run drops, capsule collections, creator launches, presales.</p>,
      },
    ],
  },

  // ---- Company ----
  customers: {
    fileName: "customers.field-notes",
    eyebrow: "COMPANY · CUSTOMERS",
    title: "Brands using GrowthSync.",
    lede: "A short list of brands and creators using GrowthSync to turn social intent into tracked revenue.",
    sections: [
      {
        heading: "Featured stories",
        body: (
          <ul>
            <li><strong>Drip Gloss</strong>: grew monthly new net revenue from $7K to $60K after launch.</li>
            <li><strong>NDA</strong>: launched from zero to $270K in new net revenue across six months.</li>
            <li><strong>Von Dutch</strong>: converted existing Instagram attention into $12,675/mo in tracked revenue.</li>
          </ul>
        ),
      },
      {
        heading: "More",
        body: (
          <p>
            Full case files live on the homepage. Want to be the next one? Book a
            call below.
          </p>
        ),
      },
    ],
  },
  founders: {
    fileName: "founders.profile",
    eyebrow: "COMPANY · FOUNDERS",
    title: "Who builds GrowthSync.",
    lede: "A small team of operators, engineers, and brand people obsessed with the gap between social engagement and revenue.",
    sections: [
      {
        heading: "Origin",
        body: (
          <p>
            GrowthSync started as a tool we wished existed when we ran social for a
            DTC brand and watched 97% of conversations die in the void. We built it
            for ourselves, then for friends, and now for everyone.
          </p>
        ),
      },
      {
        heading: "Get in touch",
        body: <p>The fastest path is a 15-minute call. We answer email too.</p>,
      },
    ],
  },
  pricing: {
    fileName: "pricing.txt",
    eyebrow: "COMPANY · PRICING",
    title: "Pricing.",
    lede: "GrowthSync is in private beta. Pricing is custom per brand based on signal volume and team size. We share the range on a 15-minute call.",
    sections: [
      {
        heading: "What to expect",
        body: (
          <ul>
            <li>Tiered by monthly signal volume (comments + DMs + mentions).</li>
            <li>Includes brand voice training and weekly tuning.</li>
            <li>Annual and quarterly options available; no long-term lock-in during beta.</li>
          </ul>
        ),
      },
      {
        heading: "Get a quote",
        body: <p>Book a call below and we&apos;ll share a written estimate the same week.</p>,
      },
    ],
  },
  careers: {
    fileName: "careers.txt",
    eyebrow: "COMPANY · CAREERS",
    title: "Working at GrowthSync.",
    lede: "We're a small team. We hire slowly, care about taste, and ship every week. No open listings right now, but introductions are welcome.",
    sections: [
      {
        heading: "What we look for",
        body: (
          <ul>
            <li>Engineers who care about the seam between product and design.</li>
            <li>Brand-side operators who understand what a drop actually feels like.</li>
            <li>Designers who can hold a system in their head.</li>
          </ul>
        ),
      },
      {
        heading: "Introductions",
        body: <p>Email a few sentences about yourself. We read everything.</p>,
      },
    ],
  },

  // ---- Resources ----
  "brand-voice-library": {
    fileName: "brand_voice_library.resource",
    eyebrow: "RESOURCES · BRAND VOICE LIBRARY",
    title: "Brand voice library.",
    lede: "A growing collection of brand voice notes, reply patterns, and tone guides from brands using GrowthSync.",
    sections: [
      {
        heading: "What's inside",
        body: (
          <ul>
            <li>Reply tone snapshots from heritage brands, premium DTC, and creator-led shops.</li>
            <li>Templates for objection handling, drop FAQs, and shipping comms.</li>
            <li>Examples annotated with what works and what doesn&apos;t.</li>
          </ul>
        ),
      },
      {
        heading: "Coming soon",
        body: <p>The full library opens to customers first. Book a call to get early access.</p>,
      },
    ],
  },
  "drop-playbook": {
    fileName: "drop_playbook.resource",
    eyebrow: "RESOURCES · DROP PLAYBOOK",
    title: "Drop playbook.",
    lede: "The 72-hour playbook we use with brands running drops on GrowthSync, from pre-launch capture to post-drop re-engagement.",
    sections: [
      {
        heading: "The phases",
        body: (
          <ul>
            <li><strong>T-72:</strong> tease + waitlist capture from comments.</li>
            <li><strong>T-0:</strong> live triage for sizes, colors, restock, and fit.</li>
            <li><strong>T+48:</strong> re-engagement DMs to high-intent missed customers.</li>
          </ul>
        ),
      },
      {
        heading: "Get the full playbook",
        body: <p>It ships as a PDF to every brand that books a call below.</p>,
      },
    ],
  },
  changelog: {
    fileName: "changelog.psheet",
    eyebrow: "RESOURCES · CHANGELOG",
    title: "Changelog.",
    lede: "What we've been shipping. Updated as the product evolves.",
    sections: [
      {
        heading: "Recent",
        body: (
          <ul>
            <li><strong>v2.0 · Spring Drop:</strong> Live Drop Mode, customer memory v2, brand voice training UI.</li>
            <li><strong>v1.8:</strong> Instagram comment unification, signal calculator.</li>
            <li><strong>v1.6:</strong> Y2K dashboard refresh, case files browser.</li>
          </ul>
        ),
      },
      {
        heading: "Coming next",
        body: <p>Live drop alerts in Slack, public sample inbox, and the public roadmap.</p>,
      },
    ],
  },
  "sample-inbox": {
    fileName: "sample_inbox.demo",
    eyebrow: "RESOURCES · SAMPLE INBOX",
    title: "Sample inbox.",
    lede: "A walkthrough of a working GrowthSync inbox with comments, DMs, customer memory, and voice replies.",
    sections: [
      {
        heading: "What you'll see",
        body: (
          <ul>
            <li>A real-shaped feed of incoming signals across channels.</li>
            <li>Reply drafts in a fictional brand&apos;s voice.</li>
            <li>Customer profiles assembled from the feed.</li>
          </ul>
        ),
      },
      {
        heading: "See it live",
        body: <p>The interactive version opens after you book a call. We walk it with you.</p>,
      },
    ],
  },
};

export function hasFooterPage(slug: SimplePageSlug): boolean {
  return slug in REGISTRY;
}

export function FooterPage({ slug }: { slug: SimplePageSlug }) {
  const entry = (REGISTRY as Record<string, FooterPageContent>)[slug];
  if (!entry) return null;
  return (
    <SimplePage
      fileName={entry.fileName}
      eyebrow={entry.eyebrow}
      title={entry.title}
      lede={entry.lede}
    >
      {entry.sections.map((s) => (
        <div key={s.heading}>
          <h2>{s.heading}</h2>
          {s.body}
        </div>
      ))}
    </SimplePage>
  );
}
