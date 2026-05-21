/**
 * <ChatBubble> — single message bubble for DM panels and chat windows.
 *   who: "us"  → glossy tangerine
 *   who: "them"→ paper-cool with hairline border
 */

import type { ChatBubbleProps } from "@/lib/types";

export function ChatBubble({ who, children, style }: ChatBubbleProps) {
  const us = who === "us";
  return (
    <div style={{ textAlign: us ? "right" : "left", margin: "4px 0", ...style }}>
      <span
        style={{
          display: "inline-block",
          maxWidth: 320,
          padding: "8px 12px",
          borderRadius: 14,
          borderBottomLeftRadius: us ? 14 : 4,
          borderBottomRightRadius: us ? 4 : 14,
          font: "var(--gs-body-sm)",
          lineHeight: 1.4,
          textAlign: "left",
          background: us
            ? "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))"
            : "var(--gs-paper-cool)",
          color: us ? "#fff" : "var(--gs-ink)",
          boxShadow: us ? "var(--gs-shadow-pill)" : "var(--gs-shadow-hairline)",
        }}
      >
        {children}
      </span>
    </div>
  );
}
