/**
 * GrowthSync Design System - single source of truth for content.
 * All marketing surfaces read from this constant. Swap an entry here
 * and every consumer updates in lockstep.
 */

import type { GsData } from "./types";

export const GS_DATA: GsData = {
  brandStrip: {
    eyebrow: "POWERING BRANDS & CREATORS ACROSS SOCIAL COMMERCE",
    lockups: [
      { text: "Ed Hardy",         style: "grotesk" },
      { text: "India Love",       style: "grotesk" },
      { text: "Allbirds",         style: "grotesk" },
      { text: "Ray J",            style: "grotesk" },
      { text: "Canvas Beauty",    style: "grotesk" },
      { text: "The Hoop Gang",    style: "grotesk" },
      { text: "Kyyla Renee",      style: "grotesk" },
      { text: "Pavoi",            style: "grotesk" },
      { text: "Von Dutch",        style: "grotesk" },
      { text: "Jordyn Lucas",     style: "grotesk" },
      { text: "Dripglosss",       style: "grotesk" },
      { text: "Klean By Ky",      style: "grotesk" },
      { text: "NDA",              style: "grotesk" },
      { text: "Homme Femme",      style: "grotesk" },
      { text: "The Genuine Club", style: "grotesk" },
    ],
  },

  brandGrid: {
    eyebrow: "WORKFLOW ROTATION · INSTAGRAM SIGNALS · LIVE",
    featuredCount: "11 SIGNALS",
    tiles: [
      { name: "Launch post",      sub: "comment demand", sub2: "SIZES · RESTOCK · WAITLIST", color: "orange", big: true },
      { name: "VIP DM",           sub: "human handoff",         color: "tan"    },
      { name: "Story reply",      sub: "purchase question",     color: "blue"   },
      { name: "Creator tag",      sub: "partnership cue",       color: "lilac"  },
      { name: "Restock ask",      sub: "waitlist capture",      color: "tan"    },
      { name: "Sizing thread",    sub: "answer drafted",        color: "orange" },
      { name: "Order question",   sub: "context attached",      color: "blue"   },
      { name: "Drop mention",     sub: "launch queue",          color: "tan"    },
      { name: "Repeat buyer",     sub: "profile enriched",      color: "lilac"  },
      { name: "Comment spike",    sub: "intent ranked",         color: "blue"   },
      { name: "DM follow-up",     sub: "next action routed",    color: "tan"    },
    ],
  },

  calculator: {
    title: "SOCIAL SIGNAL CALCULATOR · [signals.123 : Sheet1]",
    ticks: [
      { lbl: "1K",   v: 1_000     },
      { lbl: "10K",  v: 10_000    },
      { lbl: "50K",  v: 50_000    },
      { lbl: "100K", v: 100_000   },
      { lbl: "350K", v: 350_000   },
      { lbl: "1M",   v: 1_000_000 },
      { lbl: "5M",   v: 5_000_000 },
      { lbl: "10M+", v: 10_000_000 },
    ],
    defaultStep: 4, // 350K
    formula: { maxRate: 0.10, minRate: 0.05 },
    formulaLabel: "= B3 × tapered signal rate = signals",
    formulaShort: "LOG-TAPERED 10% → 5%",
    instruction: "drag the meter",
    resultBody: {
      lb: "SIGNALS / MONTH",
      ti: "This is the conversation happening about your brand.",
      sub: "Comments, likes, DMs, mentions, and shares across Instagram and TikTok every month, on average.",
    },
    autosavedAt: "14:02:11",
  },

  caseStudies: {
    eyebrowTop: "CASE STUDIES / SOCIAL COMMERCE PROOF",
    title: "Explore Our Case Studies",
    eyebrowBelow: "OPEN THE DESKTOP FILES BELOW TO VIEW CUSTOMER STORIES",
    desktopTabs: [
      { dot: "#3F7BC4", label: "case files", active: true },
      { dot: "#E15A1B", label: "inbox" },
      { dot: "#1E8E3E", label: "voice training" },
      { dot: "#A697D6", label: "drop calendar" },
    ],
    url: { host: "https://growthsync.app", path: "case-files" },
    menuItems: ["GrowthSync", "File", "Edit", "View", "Cases", "Help"],
    files: [
      { letter: "D", name: "Drip_Gloss.case", browserIndex: 0 },
      { letter: "N", name: "NDA_Launch.case", browserIndex: 1 },
      { letter: "V", name: "Von_Dutch.case",  browserIndex: 2 },
    ],
    browsers: [
      {
        skin: "orange", brand: "Drip Gloss", host: "growthsync.com/cases/drip-gloss",
        since: "Window · Ongoing · IG DMs", tagline: "Beauty · DTC · Instagram-first", caseN: "01",
        headline: "High-intent social engagement, turned into a repeatable revenue channel.",
        by: "Drip Gloss · GrowthSync customer",
        body: "Drip Gloss was sitting on high-intent Instagram DMs: product questions, tags, and purchase-ready conversations. GrowthSync turned that engagement into a repeatable revenue channel, moving average monthly new net revenue from $7K to $60K after launch.",
        stats: [["Monthly new net", "$60K/mo"], ["Run-rate uplift", "~$636K"], ["DM response", "34.5%"], ["Purchases", "5,000+"]],
        quote: "The customers were already in our DMs. We just hadn't been answering them.",
        counter: "00060,000", x: 144, y: 60,
      },
      {
        skin: "mint", brand: "NDA", host: "growthsync.com/cases/nda-launch",
        since: "Window · 6 months · TikTok + IG", tagline: "Drinking card game · DTC launch", caseN: "02",
        headline: "Launched NDA from zero to $270K in new net revenue.",
        by: "Jordan Lucas · founder, NDA",
        body: "Jordan Lucas launched NDA from a following into a sales engine. Across six months, TikTok and Instagram organic traction drove 20M+ reach, 35K new followers, 6,000+ sales, and $270K in new net revenue with roughly 90% of sales from organic traction and DMs.",
        stats: [["Launch revenue", "$270K"], ["Organic reach", "20M+"], ["New followers", "+35K"], ["Sales closed", "6,000+"]],
        quote: "I had a following but no system to convert it. GrowthSync turned my social into a sales engine.",
        counter: "00270,000", x: 380, y: 90,
      },
      {
        skin: "lilac", brand: "Von Dutch", host: "vondutch.com",
        since: "Window · Monthly · Instagram", tagline: "Streetwear · DTC · Multi-channel", caseN: "03",
        headline: "Existing Instagram attention, converted into tracked revenue.",
        by: "Von Dutch · Instagram",
        body: "Von Dutch already had Instagram attention. GrowthSync converted 1,143 high-intent monthly signals into tracked conversations, producing 65 purchases per month at a $195 AOV, or about $12,675 in monthly new net revenue with no added ad spend.",
        stats: [["Monthly new net", "$12,675"], ["Signals / mo", "1,143"], ["DM -> purchase", "5.7%"], ["AOV", "$195"]],
        quote: "Von Dutch didn't need more attention. It already had attention - we just made it count.",
        counter: "00012,675", x: 600, y: 130,
      },
    ],
    features: [
      { lab: "REACT TO COMMENTS",        ti: "Drafts in your voice. Sends with your sign-off.", c1: "#FF8447", c2: "#D8501A", ic: "✦" },
      { lab: "CONVERSE IN DMs",          ti: "All the AI tooling. None of the headcount.",      c1: "#AEDED1", c2: "#7FBFAE", ic: "▣" },
      { lab: "PROMOTE DEALS & DROPS",    ti: "Three steps from inbox to peace of mind.",        c1: "#D6CCF4", c2: "#9D8AD6", ic: "◎" },
      { lab: "COLLECT ZERO-PARTY DATA",  ti: "Bring your macros. Leave the headaches.",         c1: "#E1DCC9", c2: "#C9C3AD", ic: "⇄", tan: true },
    ],
  },

  footer: {
    statusbar: {
      os: "GROWTHSYNC OS",
      version: "V 2.0 · SPRING DROP",
      flow: ["LISTEN", "UNDERSTAND", "ENGAGE", "CONVERT"],
      right: "NETWORK · CONNECTED · 04:21 PM",
    },
    tagline: "The relationship layer for social commerce.",
    columns: [
      {
        heading: "PRODUCT",
        items: [
          { label: "Inbox", href: "/inbox" },
          { label: "Customer memory", href: "/customer-memory" },
          { label: "Brand voice", href: "/brand-voice" },
          { label: "Live drop mode", href: "/live-drop-mode" },
        ],
      },
      {
        heading: "COMPANY",
        items: [
          { label: "Customers", href: "/customers" },
          { label: "Founders", href: "/founders" },
          { label: "Pricing", href: "/pricing" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        heading: "RESOURCES",
        items: [
          { label: "Brand voice library", href: "/brand-voice-library" },
          { label: "Drop playbook", href: "/drop-playbook" },
          { label: "Changelog", href: "/changelog" },
          { label: "Sample inbox", href: "/sample-inbox" },
        ],
      },
      {
        heading: "LEGAL",
        items: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms-of-service" },
          { label: "Status", href: "https://growthsync-status.instatus.com/" },
        ],
      },
    ],
    colophon: "© GROWTHSYNC 2026 · THE RELATIONSHIP LAYER FOR SOCIAL COMMERCE",
  },

  nav: {
    tabs: ["Home", "Signals", "How It Works", "Case Studies", "Calculator"],
    activeTab: "Home",
    accentTab: "Case Studies",
    search: "Search GrowthSync.com",
    cta: "Book a call",
    ctaHref: "/book-a-call",
  },
};
