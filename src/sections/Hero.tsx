/**
 * <Hero> - "Quiet Editorial" jumbotron (Variant A).
 *
 * Left-aligned two-column layout on a full-bleed bone canvas: headline +
 * lede + ink CTA on the left, one clean DM card on the right. Replaces the
 * old centered console-peek — the calm surface and a single real card do the
 * work the window chrome used to, so the page reads as product, not hobby.
 */

import type { MouseEvent } from "react";

import { TangerineButton } from "@/components/atoms";

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
    <section className="gs-hero-a">
      <div className="gs-hero-a-inner">
        <div className="gs-hero-a-copy">
          <h1 className="gs-hero">
            The relationship layer for social commerce.
          </h1>
          <p className="gs-lede gs-hero-a-lede">
            Most brands answer 30% of their DMs. GrowthSync answers all of them,
            in your voice, capturing permissioned customer data while you sleep.
          </p>
          <div className="gs-hero-a-ctas">
            <a href="/book-a-call" style={{ textDecoration: "none" }}>
              <TangerineButton size="lg" variant="ink">
                Book a call →
              </TangerineButton>
            </a>
            <a href="#signals" onClick={scrollToSignals} className="gs-hero-a-link">
              See how it works
            </a>
          </div>
        </div>

        <div className="gs-hero-a-card" aria-hidden="true">
          <div className="gs-hero-a-card-head">
            <span className="gs-hero-a-av" />
            <div>
              <div className="gs-hero-a-name">alex.fitcheck</div>
              <div className="gs-hero-a-meta">Instagram · DM</div>
            </div>
            <span className="gs-hero-a-live">Live</span>
          </div>
          <div className="gs-hero-a-body">
            <div className="gs-hero-a-thread">
              <div className="gs-hero-a-row">
                <span className="gs-hero-a-bub them">Is the hoodie back in the medium?</span>
              </div>
              <div className="gs-hero-a-row me">
                <span className="gs-hero-a-bub me">It is — want me to hold one for 10 min?</span>
              </div>
              <div className="gs-hero-a-row me">
                <span className="gs-hero-a-bub link">growthsync.fit/hold-medium</span>
              </div>
              <div className="gs-hero-a-row">
                <span className="gs-hero-a-bub them">yes please 🙌</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
