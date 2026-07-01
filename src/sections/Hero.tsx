/**
 * <Hero> - eyebrow + headline + dual CTA + the big dashboard peek window.
 *
 * The hero is wrapped in a positioning shell so the console window can
 * push down past the section padding; the <BrandStrip> beneath it clips
 * the bottom of the window to create the "peek" effect.
 */

import type { MouseEvent } from "react";

import { StatusPill, TangerineButton } from "@/components/atoms";
import { HeroConsoleWindow } from "@/components/product";

/**
 * Scroll the secondary CTA into the first live product section rather than
 * routing to the booking form. Mirrors the nav's smooth-scroll + sticky
 * offset, and respects reduced-motion.
 */
function scrollToSignals(e: MouseEvent<HTMLAnchorElement>) {
  const el = document.getElementById("signals");
  if (!el) return; // let the href="#signals" fallback handle it
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
  window.history.pushState({}, "", "/#signals");
}

export function Hero() {
  return (
    <section
      className="gs-section gs-center gs-hero-section"
      style={{ position: "relative", paddingBottom: 0 }}
    >
      <span className="gs-hero-grid" aria-hidden="true" />

      <div className="gs-hero-status">
        <StatusPill variant="success">
          <span className="led-dot" />
          Real-time DM replies
        </StatusPill>
        <span className="by">Replying to DMs for 40+ social-first brands</span>
      </div>

      <h1 className="gs-hero" aria-label="The relationship layer for social commerce.">
        <span className="gs-hero-copy-desktop" aria-hidden="true">
          The <span className="em">relationship</span> layer
          <br />
          for social commerce.
        </span>
        <span className="gs-hero-copy-mobile" aria-hidden="true">
          <span>The <span className="em">relationship</span></span>
          <span>layer for social</span>
          <span>commerce.</span>
        </span>
      </h1>
      <p className="gs-lede gs-lede-center gs-lede-hero">
        Most brands answer 30% of their DMs. GrowthSync answers all of them, in your voice, in minutes.
      </p>

      <div className="gs-hero-ctas" style={{ marginTop: 22 }}>
        <a href="/book-a-call" style={{ textDecoration: "none" }}>
          <TangerineButton size="lg">Book a call</TangerineButton>
        </a>
        <a href="#signals" onClick={scrollToSignals} style={{ textDecoration: "none" }}>
          <TangerineButton size="lg" variant="outline">See it work ↓</TangerineButton>
        </a>
      </div>

      <div className="gs-hero-console-shell">
        <HeroConsoleWindow />
      </div>
    </section>
  );
}
