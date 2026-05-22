/**
 * <Hero> - eyebrow + headline + dual CTA + the big dashboard peek window.
 *
 * The hero is wrapped in a positioning shell so the console window can
 * push down past the section padding; the <BrandStrip> beneath it clips
 * the bottom of the window to create the "peek" effect.
 */

import { TangerineButton } from "@/components/atoms";
import { HeroConsoleWindow } from "@/components/product";

export function Hero() {
  return (
    <section
      className="gs-section gs-center gs-hero-section"
      style={{ position: "relative", paddingBottom: 0 }}
    >
      <span className="gs-marble" style={{ top: 96, right: "16%", width: 14, height: 14, opacity: 0.85 }} />

      <h1 className="gs-hero" aria-label="The relationship layer for social commerce.">
        <span className="gs-hero-copy-desktop" aria-hidden="true">
          The relationship layer
          <br />
          for social commerce.
        </span>
        <span className="gs-hero-copy-mobile" aria-hidden="true">
          <span>The relationship</span>
          <span>layer for social</span>
          <span>commerce.</span>
        </span>
      </h1>
      <p className="gs-lede gs-lede-center gs-lede-hero">
        GrowthSync turns social impressions into zero-party data, engagement, and revenue.
      </p>

      <div className="gs-hero-ctas" style={{ marginTop: 22 }}>
        <a href="/book-a-call" style={{ textDecoration: "none" }}>
          <TangerineButton size="lg">Book a call</TangerineButton>
        </a>
        <a href="/book-a-call" style={{ textDecoration: "none" }}>
          <TangerineButton size="lg" variant="ghost">See the demo →</TangerineButton>
        </a>
      </div>

      <div className="gs-hero-console-shell">
        <HeroConsoleWindow />
      </div>
    </section>
  );
}
