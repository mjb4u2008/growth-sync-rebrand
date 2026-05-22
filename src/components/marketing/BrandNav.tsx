/**
 * <BrandNav> - full-width chrome strip nav.
 *
 * Layout:
 *   - Orange orb + Hanken wordmark + black v1.0 badge (left)
 *   - Recessed pill rail; a single raised cream pill slides between
 *     tabs. The rail never reflows and the tabs never jump - text and
 *     pill move independently in their own stacking layer.
 *   - Recessed search pill (right)
 *   - Glossy tangerine "Start free" orb (far right)
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { GrowthSyncLogo, TangerineButton, VersionBadge } from "@/components/atoms";
import { GS_DATA } from "@/lib/data";
import type { BrandNavProps } from "@/lib/types";

/** Maps a tab label to its scroll target id. */
function slugifyTab(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-");
}

const bar: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  display: "grid",
  gridTemplateColumns: "240px 1fr 240px 140px",
  alignItems: "center",
  gap: 16,
  height: 64,
  padding: "0 28px",
  background: "linear-gradient(180deg, #F2EBDA 0%, #E5DCC4 55%, #D6CCB1 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -1px 0 rgba(11,11,18,0.18), 0 1px 0 rgba(11,11,18,0.06)",
};

const RAIL_PAD = 5;
const TAB_GAP = 2;
const RAIL_HEIGHT = 36;
const PILL_HEIGHT = RAIL_HEIGHT - RAIL_PAD * 2; // 26

const railStyle: CSSProperties = {
  position: "relative",
  justifySelf: "center",
  display: "flex",
  alignItems: "center",
  gap: TAB_GAP,
  height: RAIL_HEIGHT,
  padding: `0 ${RAIL_PAD}px`,
  borderRadius: 999,
  // Softer recessed cream: less contrast top→bottom, no glossy edge.
  background: "linear-gradient(180deg, #D6CBB0 0%, #E2D9C2 60%, #DAD0B6 100%)",
  boxShadow: [
    "inset 0 1px 2px rgba(11,11,18,0.16)",
    "inset 0 -1px 0 rgba(255,255,255,0.35)",
    "inset 0 0 0 1px rgba(11,11,18,0.06)",
  ].join(","),
};

const tabBase: CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: PILL_HEIGHT,
  padding: "0 14px",
  borderRadius: 999,
  font: "700 12px/1 var(--gs-font-sans)",
  letterSpacing: "-0.005em",
  background: "transparent",
  border: 0,
  cursor: "pointer",
  color: "var(--gs-ink-2)",
  transition: "color 220ms ease",
  whiteSpace: "nowrap",
  outline: "none",
};

const pillStyle: CSSProperties = {
  position: "absolute",
  top: RAIL_PAD,
  left: 0,
  height: PILL_HEIGHT,
  borderRadius: 999,
  // Soft cream pill - less glossy top highlight, subtler depth.
  background: "linear-gradient(180deg, #FBF4DF 0%, #EDE0BE 100%)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.65)",
    "inset 0 -1px 0 rgba(11,11,18,0.06)",
    "0 0 0 1px rgba(11,11,18,0.14)",
    "0 1px 2px rgba(11,11,18,0.10)",
  ].join(","),
  transition: "transform 380ms cubic-bezier(.2,.7,.1,1), width 380ms cubic-bezier(.2,.7,.1,1)",
  pointerEvents: "none",
  zIndex: 0,
  willChange: "transform, width",
};

const blogStyle: CSSProperties = {
  justifySelf: "end",
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
  maxWidth: 260,
  height: 36,
  padding: "0 16px 0 14px",
  borderRadius: 999,
  textDecoration: "none",
  background: "linear-gradient(180deg, #FBF4DF 0%, #EAE0BE 55%, #F1E7CB 100%)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.80)",
    "inset 0 -1px 0 rgba(11,11,18,0.10)",
    "0 0 0 1px rgba(11,11,18,0.18)",
    "0 1px 2px rgba(11,11,18,0.10)",
  ].join(","),
  color: "var(--gs-ink)",
  font: "800 12px/1 var(--gs-font-sans)",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

export function BrandNav({ data = GS_DATA.nav }: BrandNavProps) {
  const [activeTab, setActiveTab] = useState(data.activeTab);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillRect, setPillRect] = useState<{ x: number; w: number } | null>(null);
  // User clicks "win" briefly so scroll-spy doesn't override the selection
  // while the page is still smooth-scrolling to the target.
  const userClickTimer = useRef<number | null>(null);

  const recalc = useCallback(() => {
    const w = wrapRef.current;
    const t = tabRefs.current[activeTab];
    if (!w || !t) return;
    const wb = w.getBoundingClientRect();
    const tb = t.getBoundingClientRect();
    setPillRect({ x: tb.left - wb.left, w: tb.width });
  }, [activeTab]);

  useLayoutEffect(recalc, [recalc, data.tabs.join("|")]);

  useEffect(() => {
    const r = () => recalc();
    window.addEventListener("resize", r);
    if (document.fonts?.ready) document.fonts.ready.then(r).catch(() => {});
    return () => window.removeEventListener("resize", r);
  }, [recalc]);

  /** Smooth-scroll to the tab's section. */
  const handleTabClick = (label: string) => {
    setActiveTab(label);
    if (userClickTimer.current) window.clearTimeout(userClickTimer.current);
    // Suppress scroll-spy for ~900ms after click.
    userClickTimer.current = window.setTimeout(() => {
      userClickTimer.current = null;
    }, 900);

    const id = slugifyTab(label);
    const el = document.getElementById(id);
    if (!el) {
      // On non-home routes (e.g. /blog), bounce to the home page anchor
      // and let the home page handle the scroll on mount.
      if (window.location.pathname !== "/") {
        window.history.pushState({}, "", `/#${id}`);
        window.dispatchEvent(new Event("gs-route-change"));
      }
      return;
    }
    const navH = 64;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  /** Scroll-spy: track which section is currently in view and update active.
   *  Iterates by actual DOM offsetTop (not tab order) so the last section
   *  whose top is past the probe wins, regardless of how tabs are listed.
   *  Probe sits just under the sticky nav so the active tab flips when
   *  the next section's heading reaches the nav, not before. */
  useEffect(() => {
    const navH = 64;
    const buildEntries = () =>
      data.tabs
        .map((tab) => {
          const el = document.getElementById(slugifyTab(tab));
          return el ? { tab, top: el.offsetTop } : null;
        })
        .filter((e): e is { tab: string; top: number } => !!e)
        .sort((a, b) => a.top - b.top);

    let entries = buildEntries();
    if (entries.length === 0) return;

    const onScroll = () => {
      if (userClickTimer.current !== null) return;
      const probe = window.scrollY + navH + 80;
      let current = entries[0].tab;
      for (const e of entries) {
        if (probe >= e.top) current = e.tab;
        else break;
      }
      setActiveTab((prev) => (prev === current ? prev : current));
    };

    // Section heights can shift as fonts/images load; rebuild on resize.
    const onResize = () => { entries = buildEntries(); onScroll(); };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [data.tabs, data.activeTab]);

  return (
    <nav className="gs-nav" style={bar}>
      <a
        href="/"
        className="gs-nav-logo"
        style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}
        aria-label="GrowthSync home"
      >
        <GrowthSyncLogo height={30} />
        <VersionBadge>v1.0</VersionBadge>
      </a>

      <div ref={wrapRef} className="gs-nav-tabs" style={railStyle}>
        <span
          aria-hidden
          style={{
            ...pillStyle,
            width: pillRect?.w ?? 0,
            transform: `translateX(${pillRect?.x ?? 0}px)`,
            opacity: pillRect ? 1 : 0,
          }}
        />
        {data.tabs.map((t) => {
          const active = t === activeTab;
          const accent = t === data.accentTab && !active;
          return (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[t] = el;
              }}
              type="button"
              onClick={() => handleTabClick(t)}
              style={{
                ...tabBase,
                color: active
                  ? "var(--gs-ink)"
                  : accent
                  ? "var(--gs-tangerine-deep)"
                  : "var(--gs-ink-2)",
                fontWeight: active ? 800 : 700,
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <a className="gs-nav-blog" href="/blog" style={blogStyle}>
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: 6,
            background: "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))",
            color: "#fff",
            font: "800 12px/1 var(--gs-font-display)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 1px rgba(11,11,18,0.10)",
          }}
        >
          ✦
        </span>
        <span style={{ flex: 1 }}>Read the Blog</span>
        <span style={{ color: "var(--gs-tangerine-deep)", font: "700 13px/1 var(--gs-font-mono)" }}>›</span>
      </a>

      <div style={{ justifySelf: "end" }}>
        <a href={data.ctaHref} style={{ textDecoration: "none" }}>
          <TangerineButton size="orb">
            {data.cta} <span style={{ marginLeft: 6, opacity: 0.9 }}>›</span>
          </TangerineButton>
        </a>
      </div>
    </nav>
  );
}
