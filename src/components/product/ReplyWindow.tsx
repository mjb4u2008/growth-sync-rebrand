/**
 * <ReplyWindow> - Module 02 · REPLY
 *
 * A real-feeling, obviously automated IG-style thread:
 *   signal lands → GrowthSync responds → customer answers → GrowthSync sends
 *   the link/answer.
 *
 * New bubbles arrive at the bottom and push earlier ones upward.
 * A subtle typing dot precedes each incoming message. The loop restarts
 * after the last bubble lands. Respects prefers-reduced-motion.
 */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ModuleStatusPill, ModuleWindow } from "./ModuleWindow";

type Side = "them" | "us";

interface Bubble {
  side: Side;
  text: string;
  meta?: string;
}

const THREAD: Bubble[] = [
  { side: "them", text: "isn't it too soon for the Tuesday launch?", meta: "IG comment · just now" },
  { side: "us",   text: "Hey, saw your comment on the heritage cap reel. Tuesday is the official drop.", meta: "GrowthSync · auto" },
  { side: "us",   text: "I held two in your size if you want first dibs." },
  { side: "them", text: "wait fr?? yes please" },
  { side: "us",   text: "Sending the early access link now. 20% off, your size locked." },
  { side: "them", text: "yo thank you. grabbing it" },
];

const stage: CSSProperties = {
  padding: "14px 16px 16px",
  display: "grid",
  gap: 12,
};

const threadShell: CSSProperties = {
  position: "relative",
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 0 0 1px var(--gs-bone-edge)",
  padding: "14px 12px 14px",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  height: 306,
  justifyContent: "flex-end",
  overflow: "hidden",
};

const dayLabel: CSSProperties = {
  alignSelf: "center",
  font: "700 9.5px/1 var(--gs-font-mono)",
  letterSpacing: "0.14em",
  color: "#B0B0B6",
  marginBottom: 6,
  flexShrink: 0,
};

const metaTag = (side: Side): CSSProperties => ({
  alignSelf: side === "us" ? "flex-end" : "flex-start",
  font: "700 8.5px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  color: side === "us" ? "var(--gs-tangerine-deep)" : "var(--gs-ink-3)",
  textTransform: "uppercase",
  margin: "4px 6px 2px",
  flexShrink: 0,
});

const typingBubble: CSSProperties = {
  alignSelf: "flex-start",
  display: "inline-flex",
  gap: 4,
  padding: "10px 12px",
  borderRadius: "18px 18px 18px 4px",
  background: "#EFEFEF",
  flexShrink: 0,
};

const typingDot: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: 999,
  background: "#999",
};

const statusRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  font: "700 9.5px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

function usesReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ReplyWindow() {
  const [count, setCount] = useState(1);
  const [typing, setTyping] = useState<Side | null>(null);
  const reduced = useRef(usesReducedMotion());

  useEffect(() => {
    if (reduced.current) {
      setCount(THREAD.length);
      return;
    }

    if (count >= THREAD.length) {
      const restart = window.setTimeout(() => setCount(1), 4800);
      return () => window.clearTimeout(restart);
    }

    // Show the next sender's typing indicator briefly, then post bubble.
    const nextSide = THREAD[count].side;
    const typingDelay = 1200;
    const typingDuration = 900;

    const typingId = window.setTimeout(() => setTyping(nextSide), typingDelay);
    const postId = window.setTimeout(() => {
      setTyping(null);
      setCount((v) => v + 1);
    }, typingDelay + typingDuration);

    return () => {
      window.clearTimeout(typingId);
      window.clearTimeout(postId);
    };
  }, [count]);

  const visible = THREAD.slice(0, count);

  return (
    <ModuleWindow
      title="growthsync · reply · @maya.r"
      eyebrow="AUTO REPLY · BRAND VOICE"
      status={<ModuleStatusPill>SENT</ModuleStatusPill>}
    >
      <div style={stage}>
        <div style={threadShell}>
          <div style={dayLabel}>TODAY</div>
          {visible.map((b, i) => {
            // Only the freshest bubble animates; older ones are static.
            const isLatest = i === visible.length - 1 && !reduced.current;
            return (
              <div key={`b-${i}`} style={{ display: "contents" }}>
                {b.meta && (
                  <div
                    style={{
                      ...metaTag(b.side),
                      animation: isLatest ? "gs-chat-rise 460ms cubic-bezier(.2,.7,.1,1)" : undefined,
                    }}
                  >
                    {b.meta}
                  </div>
                )}
                <div
                  className={b.side === "us" ? "gs-chat-bubble us" : "gs-chat-bubble them"}
                  style={isLatest ? { animation: "gs-chat-rise 460ms cubic-bezier(.2,.7,.1,1)" } : undefined}
                >
                  {b.text}
                </div>
              </div>
            );
          })}
          {typing && (
            <div
              style={{
                ...typingBubble,
                alignSelf: typing === "us" ? "flex-end" : "flex-start",
                borderRadius: typing === "us" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: typing === "us" ? "rgba(255,178,122,0.55)" : "#EFEFEF",
                animation: "gs-chat-rise 320ms cubic-bezier(.2,.7,.1,1)",
              }}
              aria-hidden
            >
              <span style={{ ...typingDot, background: typing === "us" ? "#5A1E00" : "#999", animation: "gs-typing 1.1s ease-in-out infinite" }} />
              <span style={{ ...typingDot, background: typing === "us" ? "#5A1E00" : "#999", animation: "gs-typing 1.1s ease-in-out 0.18s infinite" }} />
              <span style={{ ...typingDot, background: typing === "us" ? "#5A1E00" : "#999", animation: "gs-typing 1.1s ease-in-out 0.36s infinite" }} />
            </div>
          )}
        </div>

        <div style={statusRow}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: "var(--gs-success)",
              boxShadow: "0 0 6px rgba(40,201,64,0.7)",
            }}
          />
          AUTO · LOGGED TO CRM · {visible.length}/{THREAD.length}
        </div>
      </div>
    </ModuleWindow>
  );
}
