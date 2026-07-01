/**
 * <HowItWorks> - the three-part operating sequence as sticky "stacking"
 * parts.
 *
 * Each part (Capture -> Analyze -> Engage) pins to the top of the viewport
 * and the next part slides up and overlays it - the same reveal the section
 * that follows (Case Studies) uses over How It Works. This is pure CSS: the
 * parts are sticky siblings with increasing z-index and opaque backgrounds,
 * so a later part covers the earlier one as it scrolls into place. A trailing
 * spacer lets the last part dwell so Case Studies can reveal up over it.
 *
 * Below 720px the pin is dropped and the three parts stack normally.
 */

import { RainbowStrip, ReadMore } from "@/components/atoms";
import { SectionHeader } from "@/components/marketing";
import { CaptureOrganizeScene, EngageAgentScene, InsightsDashboardWindow } from "@/components/product";
import { Fragment, useEffect, useRef, useState } from "react";

interface Part {
  step: string;
  title: string;
  lede: string;
  bullets: string[];
  window: React.ReactNode;
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

function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 720px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

function useReducedMotion(): boolean {
  const ref = useRef(false);
  if (typeof window !== "undefined" && window.matchMedia) {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

function PanelBody({ part }: { part: Part }) {
  return (
    <div className={`gs-two-col${part.flip ? " gs-two-col-flip" : ""}`}>
      {part.window}
      <div>
        <RainbowStrip />
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

/** The step rail up top of each pinned part, with the current step lit. */
function StepRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="hiw-steps">
      {PARTS.map((p, j) => (
        <div
          key={p.step}
          className={`hiw-step${activeIndex === j ? " is-active" : ""}${j < activeIndex ? " is-done" : ""}`}
        >
          <span className="hiw-step__idx">0{j + 1}</span>
          <span className="hiw-step__name">{p.step}</span>
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  const narrow = useIsNarrow();
  const reduced = useReducedMotion();
  const partRefs = useRef<(HTMLElement | null)[]>([]);

  // Fade each part in as it rises into place (instead of an opaque hard wipe).
  // Opacity is driven by the part's top position, but only over the last
  // FADE_RANGE of the slide, so the incoming part stays hidden for most of the
  // rise and dissolves in near the end - keeping the double-content window
  // short. Part 0 stays solid (nothing to dissolve over).
  useEffect(() => {
    if (narrow || reduced || typeof window === "undefined") return;
    const FADE_RANGE = 0.25; // fraction of a viewport the dissolve spans
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const span = vh * FADE_RANGE;
      const parts = partRefs.current;
      for (let i = 1; i < parts.length; i++) {
        const el = parts[i];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        el.style.opacity = String(Math.max(0, Math.min(1, 1 - top / span)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [narrow, reduced]);

  // Mobile / small screens: no pin, just stack the three parts.
  if (narrow) {
    return (
      <section id="how-it-works" className="gs-band gs-band-bone">
        <div className="gs-band-inner">
          <div className="gs-center">
            <SectionHeader
              title="How It Works"
              lede="A three-part operating sequence: pull in every interaction, turn it into insight, and let AI campaigns engage for you."
            />
          </div>
          <div style={{ display: "grid", gap: 44, marginTop: 40 }}>
            {PARTS.map((part) => (
              <PanelBody key={part.step} part={part} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div id="how-it-works" className="hiw-stack">
      {PARTS.map((part, i) => (
        <Fragment key={part.step}>
          <section
            ref={(el) => {
              partRefs.current[i] = el;
            }}
            className={`hiw-part${i > 0 ? " hiw-part--over" : ""}`}
            style={{ zIndex: i + 1 }}
          >
            <div className="hiw-part__inner gs-band-inner">
              <div className="hiw-part__head">
                <span className="gs-eyebrow">How It Works</span>
                <StepRail activeIndex={i} />
              </div>
              <PanelBody part={part} />
            </div>
          </section>
          {/* dwell: keeps the pinned part on screen longer before the next
              part rises over it, so the section doesn't scroll by too fast */}
          {i < PARTS.length - 1 && <div className="hiw-part-gap" aria-hidden />}
        </Fragment>
      ))}
      <div className="hiw-stack__spacer" aria-hidden />
    </div>
  );
}
