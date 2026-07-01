/**
 * <HowItWorks> - the three-part operating sequence (Capture -> Analyze ->
 * Engage) as three plain stacked feature rows.
 *
 * Each row pairs the step's product visual with its copy and a small step
 * marker; rows alternate which side the visual sits on. The section scrolls
 * normally - there is no scroll pinning or scroll-driven animation. (The
 * individual visuals animate on their own, each gated by its own
 * IntersectionObserver.)
 */

import type { ReactNode } from "react";

import { RainbowStrip, ReadMore } from "@/components/atoms";
import { SectionHeader } from "@/components/marketing";
import { CaptureOrganizeScene, EngageAgentScene, InsightsDashboardWindow } from "@/components/product";

interface Part {
  step: string;
  title: string;
  lede: string;
  bullets: string[];
  window: ReactNode;
  flip?: boolean;
}

const PARTS: Part[] = [
  {
    step: "Capture",
    title: "We pull in every\ninteraction, everywhere",
    lede:
      "Every TikTok and Instagram comment, DM, story reply, and mention — captured the second it lands and pulled into one clean stream.",
    bullets: [
      "24/7 capture across TikTok & Instagram: comments, DMs, story replies, mentions",
      "Logged the moment it happens — nothing slips through",
      "One unified stream, no matter where the conversation started",
    ],
    window: <CaptureOrganizeScene />,
  },
  {
    step: "Analyze",
    title: "We read the room\nand turn it into insight",
    lede:
      "GrowthSync scores every interaction and rolls it up into the themes, sentiment, and demand you'd never catch reading them one by one.",
    bullets: [
      "Every interaction scored for NPS impact, loyalty, and buying signal",
      "Themes, objections, and product demand surfaced automatically",
      "Know what your audience actually wants — without reading it all",
    ],
    window: <InsightsDashboardWindow />,
    flip: true,
  },
  {
    step: "Engage",
    title: "We run AI campaigns\nthat engage for you",
    lede:
      "Describe a goal and your brand voice, and GrowthSync spins up always-on AI campaigns that reply, route, and reach out in seconds.",
    bullets: [
      "AI campaigns reply in your brand voice in ~42 seconds",
      "Each campaign runs a goal: restock pings, hot-lead DMs, VIP thank-yous",
      "Proactive, not reactive — they act the moment a signal fires",
    ],
    window: <EngageAgentScene />,
  },
];

function PanelBody({ part, index }: { part: Part; index: number }) {
  return (
    <div className={`gs-two-col${part.flip ? " gs-two-col-flip" : ""}`}>
      {part.window}
      <div>
        <RainbowStrip />
        <div
          style={{
            marginTop: 10,
            marginBottom: 2,
            font: "700 11px/1 var(--gs-font-mono)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "var(--gs-tangerine-deep)" }}>0{index + 1}</span>
          <span style={{ color: "var(--gs-ink-4)", margin: "0 8px" }}>·</span>
          <span style={{ color: "var(--gs-ink-3)" }}>{part.step}</span>
        </div>
        <h2 className="gs-section-title" style={{ marginTop: 8 }}>
          {part.title}
        </h2>
        <p className="gs-lede">{part.lede}</p>
        <ul className="gs-checklist">
          {part.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div style={{ marginTop: 20 }}>
          <ReadMore />
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="gs-band gs-band-tint">
      <div className="gs-band-inner">
        <div className="gs-center">
          <SectionHeader
            title="How It Works"
            lede="A three-part operating sequence: pull in every interaction, turn it into insight, and let AI campaigns engage for you."
          />
        </div>
        <div style={{ display: "grid", gap: "clamp(56px, 8vw, 104px)", marginTop: 48 }}>
          {PARTS.map((part, i) => (
            <PanelBody key={part.step} part={part} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
