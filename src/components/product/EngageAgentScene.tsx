/**
 * <EngageAgentScene> - How It Works · 03 · ENGAGE ("always-on AI agent")
 *
 * Frameless on purpose: instead of another dashboard window, a little
 * GrowthSync agent works the queue. It slides down a column of incoming
 * comments and DMs; as it reaches each one the card lights up, a reply in the
 * brand voice slides in, the card is marked handled, and the "replied today"
 * tally ticks up. Several stay visibly handled behind it, so the read is a
 * proactive worker going through and responding.
 *
 * Motion follows the house idiom (setTimeout tick gated by an
 * IntersectionObserver); prefers-reduced-motion renders the fully-handled
 * queue with the agent at the bottom, no motion.
 */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Platform = "IG" | "TIKTOK";
type EventType = "Comment" | "DM";

interface Msg {
  handle: string;
  message: string;
  reply: string;
  type: EventType;
  platform: Platform;
}

const QUEUE: Msg[] = [
  { handle: "@drops_daily", message: "when does the restock go live?", reply: "Restock lands Tuesday — want me to hold a pair?", type: "Comment", platform: "TIKTOK" },
  { handle: "@ribbed.studio", message: "any more in cream M?", reply: "Cream M is back in stock — sending the link!", type: "DM", platform: "IG" },
  { handle: "@kai_o", message: "this one is hard 🔥 need it", reply: "Appreciate you 🙌 dropping early access now.", type: "Comment", platform: "TIKTOK" },
  { handle: "@maya.r", message: "does the size run small??", reply: "Runs true to size — size up for a relaxed fit 👍", type: "Comment", platform: "IG" },
];
const N = QUEUE.length;

const PLATFORM_GRADIENT: Record<Platform, string> = {
  IG: "linear-gradient(135deg, #FCAF45, #FD1D1D 50%, #833AB4)",
  TIKTOK: "linear-gradient(180deg, #25F4EE, #1A1A1A)",
};
const PLATFORM_LABEL: Record<Platform, string> = { IG: "IG", TIKTOK: "TT" };

const CARD_H = 72;
const GAP = 12;
const PITCH = CARD_H + GAP;
const AGENT_H = 50;
const RAIL_W = 64;
const STACK_H = N * CARD_H + (N - 1) * GAP;

const TICK_MS = 1650;

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

/** The little GrowthSync agent: rounded head, blinking eyes, pulsing antenna. */
function Agent({ working, pulseKey, reduced }: { working: boolean; pulseKey: number; reduced: boolean }) {
  const eye: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: working ? "var(--gs-tangerine-hi)" : "var(--gs-bone)",
    boxShadow: working ? "0 0 7px var(--gs-tangerine)" : "none",
    transformOrigin: "center",
    animation: reduced ? undefined : "gs-agent-blink 3.4s ease-in-out infinite",
    transition: "background 240ms ease, box-shadow 240ms ease",
  };
  return (
    <div style={{ position: "relative", width: 56, display: "grid", justifyItems: "center" }}>
      {/* antenna */}
      <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", width: 2, height: 11, background: "var(--gs-ink-4)", borderRadius: 2 }} />
      <span
        style={{
          position: "absolute",
          top: -18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 8,
          height: 8,
          borderRadius: 999,
          background: "var(--gs-tangerine)",
          boxShadow: "0 0 8px var(--gs-tangerine)",
          animation: reduced ? undefined : "gs-led-pulse 1.4s ease-in-out infinite",
        }}
      />
      {/* head */}
      <div
        style={{
          position: "relative",
          width: 56,
          height: AGENT_H,
          borderRadius: 16,
          background: "linear-gradient(180deg, #3A3A44, var(--gs-ink))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 24px -12px rgba(11,11,18,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
        }}
      >
        <span style={eye} />
        <span style={{ ...eye, animationDelay: reduced ? undefined : "0.12s" }} />
        <span key={pulseKey} className={pulseKey > 0 && !reduced ? "gs-so-ring" : undefined} style={{ position: "absolute", inset: 0, borderRadius: 16 }} />
      </div>
    </div>
  );
}

function QueueCard({ msg, state }: { msg: Msg; state: "pending" | "responding" | "done" }) {
  const active = state !== "pending";
  return (
    <div
      style={{
        height: CARD_H,
        boxSizing: "border-box",
        padding: "9px 13px",
        display: "grid",
        gap: 3,
        alignContent: "center",
        borderRadius: "var(--gs-r-3)",
        background: "#fff",
        boxShadow: active
          ? "0 0 0 1px rgba(200,79,14,0.30), 0 12px 24px -14px rgba(200,79,14,0.4)"
          : "0 0 0 1px var(--gs-bone-edge), 0 8px 18px -14px rgba(11,11,18,0.35)",
        opacity: state === "pending" ? 0.72 : 1,
        transition: "box-shadow 320ms ease, opacity 320ms ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <Pip platform={msg.platform} size={14} />
        <span style={{ font: "700 12px/1 var(--gs-font-display)", color: "var(--gs-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
          {msg.handle}
        </span>
        <span style={{ marginLeft: "auto", ...mono, fontSize: 8, color: "var(--gs-ink-4)", flexShrink: 0 }}>
          {state === "done" ? "✓ replied · 42s" : msg.type}
        </span>
      </div>

      {/* reply slot — reserved height so cards never jump; fades in when handled */}
      <div style={{ height: 18, position: "relative" }}>
        {active ? (
          <div
            key={`r-${msg.handle}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              maxWidth: "100%",
              animation: "gs-crm-row-in 380ms cubic-bezier(.2,.7,.1,1)",
            }}
          >
            <span style={{ color: "var(--gs-tangerine-deep)", flexShrink: 0, font: "700 11px/1 var(--gs-font-sans)" }}>↩</span>
            <span
              style={{
                font: "500 12px/1.2 var(--gs-font-sans)",
                color: "var(--gs-ink-2)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {msg.reply}
            </span>
          </div>
        ) : (
          <span
            style={{
              font: "12px/1.25 var(--gs-font-sans)",
              color: "var(--gs-ink-3)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {msg.message}
          </span>
        )}
      </div>
    </div>
  );
}

export function EngageAgentScene() {
  const reduced = useReducedMotion();
  // step: -1 idle at top; 0..N-1 responding to that row; N all handled.
  const [step, setStep] = useState(reduced ? N : -1);
  const [replied, setReplied] = useState(reduced ? 1247 : 1243);
  const [pulseKey, setPulseKey] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    let cancelled = false;
    let timer: number | undefined;
    let visible = true;
    let s = -1;
    const node = wrapRef.current;
    let observer: IntersectionObserver | undefined;

    const tick = () => {
      if (cancelled) return;
      if (!visible) {
        timer = window.setTimeout(tick, 400);
        return;
      }
      if (s >= N) {
        // hold the fully-handled queue, then restart from the top
        s = -1;
        setStep(-1);
        timer = window.setTimeout(tick, 1400);
        return;
      }
      s += 1;
      setStep(s);
      if (s < N) {
        setPulseKey((k) => k + 1);
        setReplied((r) => r + 1);
      }
      timer = window.setTimeout(tick, TICK_MS);
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
    timer = window.setTimeout(tick, 900);

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      if (observer && node) observer.unobserve(node);
    };
  }, [reduced]);

  const agentRow = Math.max(0, Math.min(N - 1, step));
  const agentY = agentRow * PITCH + (CARD_H - AGENT_H) / 2;
  const working = step >= 0 && step < N;

  const cardState = (i: number): "pending" | "responding" | "done" => {
    if (i < step) return "done";
    if (i === step) return "responding";
    return "pending";
  };

  return (
    <div ref={wrapRef} style={{ width: "100%", maxWidth: 470, marginInline: "auto", display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "var(--gs-success)",
            boxShadow: "0 0 7px rgba(40,201,64,0.75)",
            animation: reduced ? undefined : "gs-led-pulse 1.8s ease-in-out infinite",
          }}
        />
        <span style={{ ...mono, letterSpacing: "0.14em", color: "var(--gs-tangerine-deep)" }}>
          Your GrowthSync agent · replying in your voice
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `${RAIL_W}px 1fr`, gap: 12 }}>
        <div style={{ position: "relative", height: STACK_H }} aria-hidden>
          {/* the track the agent scans down */}
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: 6,
              bottom: 6,
              width: 0,
              transform: "translateX(-50%)",
              borderLeft: "2px dashed var(--gs-bone-edge)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: (RAIL_W - 56) / 2,
              transform: `translateY(${agentY}px)`,
              transition: reduced ? undefined : "transform 640ms cubic-bezier(.4,.05,.2,1)",
            }}
          >
            <Agent working={working} pulseKey={pulseKey} reduced={reduced} />
          </div>
        </div>

        <div style={{ display: "grid", gap: GAP }} aria-hidden>
          {QUEUE.map((msg, i) => (
            <QueueCard key={msg.handle} msg={msg} state={cardState(i)} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span
          key={replied}
          style={{
            font: "800 26px/1 var(--gs-font-display)",
            letterSpacing: "-0.01em",
            color: "var(--gs-ink)",
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {replied.toLocaleString("en-US")}
        </span>
        <span style={{ font: "12.5px/1.2 var(--gs-font-sans)", color: "var(--gs-ink-3)" }}>
          replied today · ~42s each
        </span>
      </div>

      <p style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}>
        A GrowthSync agent works the queue around the clock, proactively replying to every comment and DM
        in your brand voice within seconds.
      </p>
    </div>
  );
}
