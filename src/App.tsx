/**
 * GrowthSync - top-level app.
 *
 * Routes:
 *   /              - marketing homepage (unchanged)
 *   /blog          - signals.psheet index
 *   /blog/:slug    - article reader
 *   /book-a-call   - intake form + Calendly slot
 *   /privacy, /terms, and other footer pages - legal + brochure pages
 *   anything else - 404
 *
 * Routing is a tiny custom SPA layer (see src/blog/router.tsx) so the
 * marketing site doesn't take a router dependency just for two pages.
 */

import { useEffect } from "react";

import { SignalCalculator } from "@/components/calculator";
import { CaseStudyDesktop } from "@/components/caseStudy";
import {
  BrandNav,
  BrandStrip,
  FooterDock,
  SectionHeader,
} from "@/components/marketing";

import { Closer } from "@/sections/Closer";
import { Hero } from "@/sections/Hero";
import { HowItWorks } from "@/sections/HowItWorks";
import { Impressions } from "@/sections/Impressions";

import { BlogApp } from "@/blog/BlogApp";
import { useGlobalLinkInterception, useRoute } from "@/blog/router";
import { BookACall, BookACallSuccess, FooterPage, NotFound, Privacy, Security, Terms } from "@/pages";
import { capturePaidAttribution } from "@/utils/attribution";
import { trackMarketingPageView } from "@/utils/marketingTags";

function CalculatorSection() {
  return (
    <section id="calculator" className="gs-band gs-band-tint">
      <div className="gs-band-inner">
        <div className="gs-center">
          <SectionHeader
            title={"97% of Brand & Creators are\nignoring their audience"}
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <SignalCalculator />
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section id="case-studies" className="gs-band gs-band-bone hiw-reveal-next">
      <div className="gs-band-inner">
        <div className="gs-center">
          <SectionHeader
            title="Explore Our Case Studies"
            lede="Open the desktop files below to read how brands are using GrowthSync."
          />
        </div>
        <div style={{ marginTop: 40 }} className="gs-case-studies-scroll">
          <CaseStudyDesktop />
        </div>
      </div>
    </section>
  );
}

function MarketingHome() {
  // On mount, if the URL carries a hash like /#signals, scroll to it.
  // This is how the in-nav scroll-spy tabs work after a route bounce
  // back from /blog or /blog/:slug.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const id = setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      const navH = 64;
      const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }, 40);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="gs-home">
      <main className="gs-page" id="home" style={{ paddingBottom: 0 }}>
        <Hero />
      </main>
      <BrandStrip />

      {/* Impressions owns its own near-white band (id="signals"). */}
      <Impressions />

      {/* How It Works is a full-bleed, scroll-pinned scroller that owns
          id="how-it-works" and the three parts (Capture / Analyze / Engage). */}
      <HowItWorks />

      <CaseStudiesSection />
      <CalculatorSection />

      {/* Closer is a full-bleed tangerine band — the page's final note. */}
      <Closer />
    </div>
  );
}

export default function App() {
  useGlobalLinkInterception();
  const route = useRoute();
  const attributionRoute = typeof window === "undefined"
    ? ""
    : `${window.location.pathname}${window.location.search}`;

  useEffect(() => {
    capturePaidAttribution();
    trackMarketingPageView();
  }, [attributionRoute]);

  const onBlog = route.kind === "blog-index" || route.kind === "blog-post";

  return (
    <>
      <BrandNav />
      {route.kind === "home" && <MarketingHome />}
      {onBlog && <BlogApp />}
      {route.kind === "book-a-call" && <BookACall />}
      {route.kind === "book-a-call-success" && <BookACallSuccess />}
      {route.kind === "simple-page" && route.slug === "privacy" && <Privacy />}
      {route.kind === "simple-page" && route.slug === "terms" && <Terms />}
      {route.kind === "simple-page" && route.slug === "security" && <Security />}
      {route.kind === "simple-page" && route.slug !== "privacy" && route.slug !== "terms" && route.slug !== "security" && (
        <FooterPage slug={route.slug} />
      )}
      {route.kind === "not-found" && <NotFound pathname={route.pathname} />}
      <FooterDock />
    </>
  );
}
