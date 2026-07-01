/**
 * <CaptureOrganizeScene> - How It Works · 01 · CAPTURE ("pull in everything")
 *
 * Frameless on purpose: no OS-window chrome, just the impressions themselves.
 * A messy pile of raw impressions - IG and TikTok comments and DMs, tossed in
 * at odd angles - snaps into one clean, aligned stream, dwells, then scatters
 * again. Every card is the SAME element that only changes its transform between
 * a "piled" arrangement and an organized row, so the settle reads as the same
 * objects being tidied rather than a swap.
 *
 * Motion follows the house idiom (setTimeout tick gated by an
 * IntersectionObserver); prefers-reduced-motion renders the organized stream
 * with no motion.
 */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Platform = "IG" | "TIKTOK";
type EventType = "Comment" | "DM";

interface Raw {
  handle: string;
  message: string;
  type: EventType;
  platform: Platform;
}

const RAW: Raw[] = [
  { handle: "@kai_o", message: "this one is hard 🔥 need it", type: "Comment", platform: "TIKTOK" },
  { handle: "@ribbed.studio", message: "any more in cream M?", type: "DM", platform: "IG" },
  { handle: "@maya.r", message: "does the size run small??", type: "Comment", platform: "IG" },
  { handle: "@drops_daily", message: "when does the restock go live?", type: "Comment", platform: "TIKTOK" },
];

const PLATFORM_GRADIENT: Record<Platform, string> = {
  IG: "linear-gradient(135deg, #FCAF45, #FD1D1D 50%, #833AB4)",
  TIKTOK: "linear-gradient(180deg, #25F4EE, #1A1A1A)",
};
const PLATFORM_LABEL: Record<Platform, string> = { IG: "IG", TIKTOK: "TT" };

/* the piled arrangement: translate(px,px) + rotate(deg) per card */
const SCATTER: Array<{ x: number; y: number; r: number }> = [
  { x: 20, y: 4, r: -6 },
  { x: -24, y: 44, r: 5 },
  { x: 28, y: 86, r: -4 },
  { x: -12, y: 126, r: 7 },
];

const ROW_STEP = 62; // organized row pitch
const CARD_H = 54;
const STAGE_H = 250;

const DWELL_ORGANIZED = 2600;
const DWELL_SCATTERED = 1100;

const mono: CSSProperties = {
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

function useReducedMotion(): boolean {
  const ref = useRef(false);
  if (typeof window !== "undefined" && window.matchMedia) {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

function Pip({ platform, size = 15 }: { platform: Platform; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        flexShrink: 0,
        background: PLATFORM_GRADIENT[platform],
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        font: `800 ${Math.round(size * 0.42)}px/1 var(--gs-font-mono)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
      }}
    >
      {PLATFORM_LABEL[platform]}
    </span>
  );
}

function Card({ raw, index, organized }: { raw: Raw; index: number; organized: boolean }) {
  const s = SCATTER[index];
  const transform = organized
    ? `translate(0px, ${index * ROW_STEP}px) rotate(0deg)`
    : `translate(${s.x}px, ${s.y}px) rotate(${s.r}deg)`;
  return (
    <div
      style={{
        position: "absolute",
        left: 6,
        right: 6,
        top: 0,
        height: CARD_H,
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 11,
        padding: "9px 13px",
        borderRadius: "var(--gs-r-3)",
        background: "#fff",
        boxShadow: organized
          ? "0 0 0 1px var(--gs-bone-edge), 0 8px 18px -14px rgba(11,11,18,0.4)"
          : "0 0 0 1px var(--gs-bone-edge), 0 18px 30px -14px rgba(11,11,18,0.5)",
        transform,
        transformOrigin: "center",
        transition: "transform 720ms cubic-bezier(.65,.02,.2,1), box-shadow 720ms ease",
        transitionDelay: `${index * 70}ms`,
        zIndex: organized ? 1 : index + 1,
      }}
    >
      <Pip platform={raw.platform} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              font: "700 12px/1 var(--gs-font-display)",
              color: "var(--gs-ink)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            {raw.handle}
          </span>
          <span style={{ ...mono, fontSize: 8, color: "var(--gs-ink-4)", flexShrink: 0 }}>{raw.type}</span>
        </div>
        <div
          style={{
            font: "12px/1.25 var(--gs-font-sans)",
            color: "var(--gs-ink-3)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginTop: 2,
          }}
        >
          {raw.message}
        </div>
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexShrink: 0,
          opacity: organized ? 1 : 0,
          transform: organized ? "scale(1)" : "scale(0.8)",
          transition: "opacity 320ms ease 280ms, transform 320ms ease 280ms",
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "var(--gs-success)",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            font: "800 9px/1 var(--gs-font-mono)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          ✓
        </span>
      </span>
    </div>
  );
}

export function CaptureOrganizeScene() {
  const reduced = useReducedMotion();
  const [organized, setOrganized] = useState(reduced);
  const [count, setCount] = useState(2481);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    let cancelled = false;
    let timer: number | undefined;
    let visible = true;
    const node = wrapRef.current;
    let observer: IntersectionObserver | undefined;

    const step = (toOrganized: boolean) => {
      if (cancelled) return;
      if (!visible) {
        timer = window.setTimeout(() => step(toOrganized), 300);
        return;
      }
      setOrganized(toOrganized);
      if (toOrganized) setCount((c) => c + 7 + (c % 3));
      timer = window.setTimeout(
        () => step(!toOrganized),
        toOrganized ? DWELL_ORGANIZED : DWELL_SCATTERED
      );
    };

    if (node && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) visible = e.isIntersecting;
        },
        { threshold: 0.2 }
      );
      observer.observe(node);
    }
    timer = window.setTimeout(() => step(true), 700);

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      if (observer && node) observer.unobserve(node);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} style={{ width: "100%", maxWidth: 470, marginInline: "auto", display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ ...mono, letterSpacing: "0.14em", color: "var(--gs-tangerine-deep)", transition: "color 400ms ease" }}>
          {organized ? "Captured · unified stream" : "Raw · unsorted"}
        </span>
        <span style={{ ...mono, fontSize: 8.5, color: "var(--gs-ink-4)" }}>Comments · DMs · Stories · Mentions</span>
      </div>

      <div style={{ position: "relative", height: STAGE_H }} aria-hidden>
        {RAW.map((raw, i) => (
          <Card key={raw.handle} raw={raw} index={i} organized={organized} />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span
          style={{
            font: "800 26px/1 var(--gs-font-display)",
            letterSpacing: "-0.01em",
            color: "var(--gs-ink)",
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {count.toLocaleString("en-US")}
        </span>
        <span style={{ font: "12.5px/1.2 var(--gs-font-sans)", color: "var(--gs-ink-3)" }}>
          impressions pulled in this week
        </span>
      </div>

      <p style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}>
        GrowthSync pulls in every comment, DM, story reply, and mention across TikTok and Instagram and
        organizes them into one unified stream.
      </p>
    </div>
  );
}
