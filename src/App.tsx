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
import { CrmSection } from "@/sections/CrmSection";
import { Hero } from "@/sections/Hero";
import { HowItWorks } from "@/sections/HowItWorks";
import { Impressions } from "@/sections/Impressions";
import { InstantReply } from "@/sections/InstantReply";

import { BlogApp } from "@/blog/BlogApp";
import { useGlobalLinkInterception, useRoute } from "@/blog/router";
import { BookACall, BookACallSuccess, FooterPage, NotFound, Privacy, Terms } from "@/pages";

function CalculatorSection() {
  return (
    <section id="calculator" className="gs-section">
      <div className="gs-center">
        <SectionHeader
          title={"97% of Brand & Creators are\nignoring their audience"}
        />
      </div>
      <div style={{ marginTop: 36 }}>
        <SignalCalculator />
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section id="case-studies" className="gs-section">
      <div className="gs-center">
        <SectionHeader
          title="Explore Our Case Studies"
          lede="Open the desktop files below to read how brands are using GrowthSync."
        />
      </div>
      <div style={{ marginTop: 28 }} className="gs-case-studies-scroll">
        <CaseStudyDesktop />
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
      <main className="gs-page" id="home">
        <Hero />
      </main>
      <BrandStrip />
      <main className="gs-page">
        <section id="signals">
          <Impressions />
        </section>
        <section id="how-it-works">
          <HowItWorks />
          <InstantReply />
          <CrmSection />
        </section>
        <CaseStudiesSection />
        <CalculatorSection />
        <Closer />
      </main>
    </div>
  );
}

export default function App() {
  useGlobalLinkInterception();
  const route = useRoute();

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
      {route.kind === "simple-page" && route.slug !== "privacy" && route.slug !== "terms" && (
        <FooterPage slug={route.slug} />
      )}
      {route.kind === "not-found" && <NotFound pathname={route.pathname} />}
      <FooterDock />
    </>
  );
}
