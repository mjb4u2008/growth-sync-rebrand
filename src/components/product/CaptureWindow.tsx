/**
 * <CaptureWindow> - Module 01 · CAPTURE
 *
 * Cascading feed of incoming signals - IG comments, TikTok DMs, story replies,
 * etc. - falling down a list with a soft "ding" rhythm and fading at the
 * bottom. A subtle intent/sentiment summary below shifts with the topmost
 * active signal.
 */

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { ModuleStatusPill, ModuleWindow } from "./ModuleWindow";

type Sentiment = "positive" | "curious" | "intent";
type Source = "IG" | "TIKTOK" | "DM" | "COMMENT";

interface Signal {
  who: string;
  src: Source;
  msg: string;
  intent: number;     // 0-100
  sentiment: number;  // 0-100 (positive %)
  tone: Sentiment;
}

const FEED: Signal[] = [
  { who: "@maya.r",        src: "IG",      msg: "isn't it too soon for the Tuesday launch?", intent: 64, sentiment: 71, tone: "curious"  },
  { who: "@blvkmilk",      src: "COMMENT", msg: "does the size run small??",                  intent: 58, sentiment: 64, tone: "curious"  },
  { who: "@kai_o",         src: "TIKTOK",  msg: "this one is hard. need it.",                 intent: 88, sentiment: 92, tone: "intent"   },
  { who: "@ribbed.studio", src: "DM",      msg: "any more in cream M?",                       intent: 82, sentiment: 80, tone: "intent"   },
  { who: "@vespertine",    src: "IG",      msg: "tagged you in my pickup ✨",                  intent: 54, sentiment: 95, tone: "positive" },
  { who: "@noor.k",        src: "COMMENT", msg: "when does Tuesday early access drop?",       intent: 79, sentiment: 84, tone: "intent"   },
];

const SRC_BG: Record<Source, string> = {
  IG:      "linear-gradient(135deg, #FCAF45, #FD1D1D 50%, #833AB4)",
  TIKTOK:  "linear-gradient(180deg, #25F4EE, #1A1A1A)",
  DM:      "linear-gradient(180deg, #6FA3D9, #2C5E9D)",
  COMMENT: "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))",
};

const stage: CSSProperties = {
  padding: "14px 16px 16px",
  display: "grid",
  gap: 12,
};

const feedWrap: CSSProperties = {
  position: "relative",
  height: 234,
  overflow: "hidden",
  borderRadius: 10,
  background: "linear-gradient(180deg, #fff 0%, var(--gs-paper-cool) 100%)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  padding: "10px 10px 0",
};

const feedFade: CSSProperties = {
  position: "absolute",
  left: 0, right: 0, bottom: 0,
  height: 64,
  pointerEvents: "none",
  background: "linear-gradient(180deg, rgba(247,243,234,0) 0%, var(--gs-paper-cool) 90%)",
};

const sourceChip = (src: Source): CSSProperties => ({
  display: "inline-flex",
  padding: "3px 7px",
  borderRadius: 4,
  background: SRC_BG[src],
  color: "#fff",
  font: "700 8.5px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
  flexShrink: 0,
});

const intentChip = (intent: number): CSSProperties => ({
  display: "inline-flex",
  padding: "3px 7px",
  borderRadius: 999,
  background: intent >= 75
    ? "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))"
    : "var(--gs-bone)",
  color: intent >= 75 ? "#fff" : "var(--gs-tangerine-deep)",
  boxShadow: intent >= 75 ? "inset 0 1px 0 rgba(255,255,255,0.4)" : "inset 0 0 0 1px rgba(224,79,10,0.30)",
  font: "700 8.5px/1 var(--gs-font-mono)",
  letterSpacing: "0.08em",
  flexShrink: 0,
});

const summary: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const summaryCell: CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  background: "#fff",
  boxShadow: "0 0 0 1px var(--gs-bone-edge)",
};

const summaryLabel: CSSProperties = {
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
  marginBottom: 6,
};

const bar: CSSProperties = {
  height: 6,
  borderRadius: 999,
  background: "rgba(11,11,18,0.06)",
  overflow: "hidden",
};

const barFill = (pct: number, color: string): CSSProperties => ({
  display: "block",
  height: "100%",
  width: `${pct}%`,
  background: color,
  transition: "width 700ms cubic-bezier(.6,.2,.2,1)",
});

const numLine: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  font: "700 12px/1 var(--gs-font-sans)",
  color: "var(--gs-ink)",
};

interface RowProps {
  signal: Signal;
  /** Index in the visible list - 0 is the freshest at the top. */
  position: number;
}

const ROW_HEIGHT = 49;
const ROW_GAP = 7;
const VISIBLE = 4;

function Row({ signal, position }: RowProps) {
  const top = position * (ROW_HEIGHT + ROW_GAP);
  // Top row is freshest - fully opaque. Bottom rows fade.
  const opacity = position === 0 ? 1 : Math.max(0.18, 1 - position * 0.22);
  return (
    <div
      style={{
        position: "absolute",
        left: 10,
        right: 10,
        top: top + 10,
        height: ROW_HEIGHT,
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 10,
        alignItems: "center",
        padding: "10px 12px",
        borderRadius: 10,
        background: "#fff",
        boxShadow:
          position === 0
            ? "0 0 0 1px rgba(224,79,10,0.28), 0 8px 18px -12px rgba(224,79,10,0.30)"
            : "0 0 0 1px var(--gs-bone-edge)",
        opacity,
        transition: "top 480ms cubic-bezier(.6,.2,.2,1), opacity 480ms ease",
        animation: position === 0 ? "gs-cap-ding 600ms ease-out" : undefined,
      }}
    >
      <span style={sourceChip(signal.src)}>{signal.src}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ font: "700 12px/1.1 var(--gs-font-sans)", color: "var(--gs-ink)" }}>
          {signal.who}
        </div>
        <div
          style={{
            font: "12px/1.35 var(--gs-font-sans)",
            color: "var(--gs-ink-2)",
            marginTop: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {signal.msg}
        </div>
      </div>
      <span style={intentChip(signal.intent)}>{signal.intent}</span>
    </div>
  );
}

export function CaptureWindow() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2400);
    return () => window.clearInterval(id);
  }, []);

  // Pick the freshest signal as the summary driver.
  const visible = useMemo(() => {
    const out: Signal[] = [];
    for (let i = 0; i < VISIBLE; i++) {
      out.push(FEED[(tick + i) % FEED.length]);
    }
    return out;
  }, [tick]);

  const active = visible[0];

  return (
    <ModuleWindow
      title="growthsync · capture · live"
      eyebrow="LISTENING 24/7"
      status={<ModuleStatusPill>CAPTURING</ModuleStatusPill>}
    >
      <div style={stage}>
        <div style={feedWrap} aria-live="polite">
          {visible.map((s, i) => (
            <Row key={`${tick}-${i}`} signal={s} position={i} />
          ))}
          <div style={feedFade} aria-hidden />
        </div>

        <div style={summary}>
          <div style={summaryCell}>
            <div style={summaryLabel}>BUY INTENT · LIVE</div>
            <div style={numLine}>
              <span>buy</span>
              <span style={{ color: "var(--gs-tangerine-deep)", transition: "color 400ms" }}>
                {active.intent}%
              </span>
            </div>
            <div style={{ ...bar, marginTop: 8 }}>
              <span style={barFill(active.intent, "linear-gradient(90deg, var(--gs-tangerine-deep), var(--gs-tangerine))")} />
            </div>
          </div>
          <div style={summaryCell}>
            <div style={summaryLabel}>SENTIMENT · LIVE</div>
            <div style={numLine}>
              <span>positive</span>
              <span style={{ color: "var(--gs-success)" }}>{active.sentiment}%</span>
            </div>
            <div style={{ ...bar, marginTop: 8 }}>
              <span style={barFill(active.sentiment, "linear-gradient(90deg, #1F8E80, #58C97B)")} />
            </div>
          </div>
        </div>
      </div>
    </ModuleWindow>
  );
}
