/**
 * <InsightsDashboardWindow> - Module 02 · ANALYZE ("read the room")
 *
 * The aggregate-insight beat: instead of one comment scoring live (that's the
 * Impressions animation up-page), this rolls the whole stream up into a
 * dashboard - top themes, sentiment split, and emerging demand - so a visitor
 * sees GrowthSync turning volume into understanding.
 *
 * Bars grow from zero when the panel scrolls into view; headline numbers count
 * up and keep nudging to feel live. prefers-reduced-motion renders the final
 * populated dashboard with no motion.
 */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ModuleStatusPill, ModuleWindow } from "./ModuleWindow";

interface Theme {
  label: string;
  pct: number;
  color: string;
}

const THEMES: Theme[] = [
  { label: "Restock demand", pct: 34, color: "linear-gradient(90deg, var(--gs-tangerine-deep), var(--gs-tangerine))" },
  { label: "Sizing & fit", pct: 22, color: "linear-gradient(90deg, #C84F0E, var(--gs-tangerine-hi))" },
  { label: "Praise · UGC", pct: 19, color: "linear-gradient(90deg, #1F8E80, #4ADB5C)" },
  { label: "Shipping & delivery", pct: 14, color: "linear-gradient(90deg, #6E6E78, #A6A6AE)" },
  { label: "Other", pct: 11, color: "linear-gradient(90deg, #9A9AA2, #C4C4CA)" },
];
const THEME_MAX = 34;

const SENTIMENT = [
  { label: "Positive", pct: 72, color: "linear-gradient(90deg, #1F8E80, #4ADB5C)" },
  { label: "Neutral", pct: 21, color: "rgba(11,11,18,0.16)" },
  { label: "Negative", pct: 7, color: "linear-gradient(90deg, #C84F0E, #FD1D1D)" },
];

const DEMAND = ["Cream · M ↑", "Navy return ↑", "Tuesday drop ↑"];

const mono: CSSProperties = {
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

const statCard: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: "10px 12px 11px",
  borderRadius: 12,
  background: "linear-gradient(180deg, #FFFFFF 0%, var(--gs-paper-cool) 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 1px var(--gs-bone-edge)",
};

function useReducedMotion(): boolean {
  const ref = useRef(false);
  if (typeof window !== "undefined" && window.matchMedia) {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

/** Tween a number toward its target whenever the target changes. */
function useCountUp(target: number, duration = 900): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    if (typeof window === "undefined") {
      setValue(target);
      return;
    }
    const from = fromRef.current;
    if (from === target) return;
    let frame = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * ease);
      if (t < 1) frame = window.requestAnimationFrame(tick);
      else {
        fromRef.current = target;
        setValue(target);
      }
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function BarRow({ theme, lit }: { theme: Theme; lit: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "116px 1fr 30px", alignItems: "center", gap: 10 }}>
      <span style={{ font: "600 11px/1.2 var(--gs-font-sans)", color: "var(--gs-ink-2)" }}>{theme.label}</span>
      <span style={{ height: 8, borderRadius: 999, background: "rgba(11,11,18,0.06)", overflow: "hidden", display: "block" }}>
        <span
          style={{
            display: "block",
            height: "100%",
            width: "100%",
            borderRadius: 999,
            background: theme.color,
            transformOrigin: "left center",
            transform: `scaleX(${lit ? theme.pct / THEME_MAX : 0})`,
            transition: "transform 780ms cubic-bezier(.2,.7,.1,1)",
          }}
        />
      </span>
      <span
        style={{
          font: "700 11px/1 var(--gs-font-tech)",
          color: "var(--gs-ink)",
          textAlign: "right",
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        {theme.pct}%
      </span>
    </div>
  );
}

export function InsightsDashboardWindow() {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(reduced);
  const [signals, setSignals] = useState(2481);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    let cancelled = false;
    const node = wrapRef.current;
    let observer: IntersectionObserver | undefined;
    let timer: number | undefined;

    const bump = () => {
      if (cancelled) return;
      setSignals((n) => n + 5 + (n % 4));
      timer = window.setTimeout(bump, 3400);
    };

    if (node && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setLit(true);
              if (timer === undefined) timer = window.setTimeout(bump, 3400);
            }
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(node);
    } else {
      setLit(true);
    }

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      if (observer && node) observer.unobserve(node);
    };
  }, [reduced]);

  const signalsDisplay = useCountUp(signals);

  return (
    <ModuleWindow
      frame="console"
      title="growthsync · insights"
      eyebrow="WHAT YOUR AUDIENCE IS TELLING YOU"
      status={<ModuleStatusPill>ANALYZING</ModuleStatusPill>}
    >
      <div ref={wrapRef} style={{ padding: "14px 16px 16px", display: "grid", gap: 13 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={statCard}>
            <span style={{ ...mono, letterSpacing: "0.14em" }}>Signals analyzed</span>
            <span style={{ font: "800 22px/1 var(--gs-font-display)", color: "var(--gs-ink)", fontFeatureSettings: '"tnum" 1' }}>
              {Math.round(signalsDisplay).toLocaleString("en-US")}
            </span>
          </div>
          <div style={statCard}>
            <span style={{ ...mono, letterSpacing: "0.14em" }}>Avg NPS impact</span>
            <span style={{ font: "800 22px/1 var(--gs-font-display)", color: "var(--gs-tangerine-deep)", fontFeatureSettings: '"tnum" 1' }}>
              74
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gap: 9 }}>
          <span style={{ ...mono, letterSpacing: "0.13em" }}>Top themes</span>
          <div style={{ display: "grid", gap: 8 }}>
            {THEMES.map((t) => (
              <BarRow key={t.label} theme={t} lit={lit} />
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <span style={{ ...mono, letterSpacing: "0.13em" }}>Sentiment</span>
          <div style={{ display: "flex", height: 12, borderRadius: 999, overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)" }}>
            {SENTIMENT.map((s) => (
              <span
                key={s.label}
                style={{
                  height: "100%",
                  width: lit ? `${s.pct}%` : "0%",
                  background: s.color,
                  transition: "width 780ms cubic-bezier(.2,.7,.1,1)",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {SENTIMENT.map((s) => (
              <span key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color }} />
                <span style={{ font: "600 10.5px/1 var(--gs-font-sans)", color: "var(--gs-ink-2)" }}>
                  {s.label} {s.pct}%
                </span>
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <span style={{ ...mono, letterSpacing: "0.13em" }}>Emerging demand</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {DEMAND.map((d) => (
              <span
                key={d}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "5px 10px",
                  borderRadius: 999,
                  font: "700 10.5px/1 var(--gs-font-sans)",
                  color: "var(--gs-tangerine-deep)",
                  background: "rgba(242,107,31,0.07)",
                  boxShadow: "inset 0 0 0 1px rgba(200,79,14,0.24)",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ModuleWindow>
  );
}
