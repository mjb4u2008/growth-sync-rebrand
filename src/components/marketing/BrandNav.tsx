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
import { GrowthSyncLogo, TangerineButton } from "@/components/atoms";
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
  display: "flex",
  alignItems: "center",
  gap: 16,
  height: 64,
  padding: "0 28px",
  background: "linear-gradient(180deg, #FCFBF9 0%, #EFEDE7 100%)",
  borderBottom: "1px solid rgba(11,11,18,0.14)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 0 rgba(11,11,18,0.04), 0 8px 24px -18px rgba(11,11,18,0.5)",
};

const RAIL_PAD = 5;
const TAB_GAP = 2;
const RAIL_HEIGHT = 36;
const PILL_HEIGHT = RAIL_HEIGHT - RAIL_PAD * 2; // 26

const railStyle: CSSProperties = {
  position: "relative",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  gap: TAB_GAP,
  height: RAIL_HEIGHT,
  padding: `0 ${RAIL_PAD}px`,
  borderRadius: 999,
  // Recessed track — a hair lighter/cooler so the raised cream pill reads
  // as genuinely raised, with a deeper inset to sell the recess.
  background: "linear-gradient(180deg, #D8D5CD 0%, #E6E3DC 70%, #DDDAD2 100%)",
  boxShadow: [
    "inset 0 2px 3px rgba(11,11,18,0.18)",
    "inset 0 -1px 0 rgba(255,255,255,0.5)",
    "inset 0 0 0 1px rgba(11,11,18,0.05)",
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
};

const pillStyle: CSSProperties = {
  position: "absolute",
  top: RAIL_PAD,
  left: 0,
  height: PILL_HEIGHT,
  borderRadius: 999,
  // Bright cream pill — crisp top highlight so the active tab pops off
  // the recessed track.
  background: "linear-gradient(180deg, #FFFFFF 0%, #F1EFEA 100%)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.9)",
    "0 0 0 1px rgba(11,11,18,0.13)",
    "0 1px 3px rgba(11,11,18,0.16)",
  ].join(","),
  transition: "transform 380ms cubic-bezier(.2,.7,.1,1), width 380ms cubic-bezier(.2,.7,.1,1)",
  pointerEvents: "none",
  zIndex: 0,
  willChange: "transform, width",
};

const blogStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 36,
  padding: "0 6px",
  textDecoration: "none",
  color: "var(--gs-ink-2)",
  font: "700 12px/1 var(--gs-font-sans)",
  letterSpacing: "-0.005em",
  whiteSpace: "nowrap",
};

export function BrandNav({ data = GS_DATA.nav }: BrandNavProps) {
  const [activeTab, setActiveTab] = useState(data.activeTab);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillRect, setPillRect] = useState<{ x: number; w: number } | null>(null);
  // Mobile drawer: at ≤900px the tab rail collapses, so the section nav
  // lives behind a hamburger instead of vanishing entirely.
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
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

  // While the drawer is open: lock body scroll, close on Escape, and
  // collapse it if the viewport grows back to desktop. Focus moves into
  // the panel on open and returns to the trigger on close.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  };

  /** Smooth-scroll to the tab's section. */
  const handleTabClick = (label: string) => {
    setActiveTab(label);
    setMenuOpen(false);
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
    <>
    <nav className="gs-nav" style={bar}>
      <a
        href="/"
        className="gs-nav-logo"
        style={{
          flex: "1 1 0",
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
          textDecoration: "none",
          color: "inherit",
        }}
        aria-label="GrowthSync home"
      >
        <GrowthSyncLogo height={30} />
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
                  ? "var(--gs-tangerine-deep)"
                  : accent
                  ? "var(--gs-tangerine-deep)"
                  : "var(--gs-ink-3)",
                fontWeight: active ? 800 : 700,
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div
        className="gs-nav-right"
        style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}
      >
        <a className="gs-nav-blog" href="/blog" style={blogStyle}>
          <span>Blog</span>
          <span aria-hidden style={{ color: "var(--gs-ink-4)", font: "700 13px/1 var(--gs-font-mono)" }}>›</span>
        </a>

        <div className="gs-nav-cta">
          <a href={data.ctaHref} style={{ textDecoration: "none" }}>
            <TangerineButton size="orb">
              {data.cta} <span style={{ marginLeft: 6, opacity: 0.9 }}>›</span>
            </TangerineButton>
          </a>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="gs-nav-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="gs-nav-mobile-menu"
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
    </nav>

    {menuOpen && (
      <>
        <div className="gs-nav-menu-backdrop" onClick={closeMenu} aria-hidden="true" />
        <div
          id="gs-nav-mobile-menu"
          ref={menuRef}
          className="gs-nav-menu"
          role="navigation"
          aria-label="Site"
          tabIndex={-1}
        >
          {data.tabs.map((t) => (
            <button
              key={t}
              type="button"
              className={`gs-nav-menu-item${t === activeTab ? " active" : ""}`}
              aria-current={t === activeTab ? "true" : undefined}
              onClick={() => handleTabClick(t)}
            >
              {t}
              <span aria-hidden="true" style={{ color: "var(--gs-ink-4)" }}>›</span>
            </button>
          ))}
          <span className="gs-nav-menu-sep" aria-hidden="true" />
          <a className="gs-nav-menu-item" href="/blog" onClick={closeMenu}>
            Blog
            <span aria-hidden="true" style={{ color: "var(--gs-ink-4)" }}>›</span>
          </a>
          <a className="gs-nav-menu-cta" href={data.ctaHref} onClick={closeMenu}>
            {data.cta} <span aria-hidden="true" style={{ opacity: 0.9 }}>›</span>
          </a>
        </div>
      </>
    )}
    </>
  );
}
