/**
 * <StatusPill> - glossy mono pill for live state, intent, and editorial moments.
 *
 *   variant: "success" | "tangerine" | "warning" | "danger" | "info"
 *   dot:     adds a small LED dot before the label (used with "success")
 */

import type { CSSProperties } from "react";
import type { StatusPillProps, StatusPillVariant } from "@/lib/types";

interface VariantStyle {
  color: string;
  background: string;
  dotColor: string;
}

const VARIANTS: Record<StatusPillVariant, VariantStyle> = {
  success:   { color: "#06340F",                 background: "linear-gradient(180deg, #58C97B, #1E8E3E)", dotColor: "#0a3014" },
  tangerine: { color: "var(--gs-tangerine-ink)", background: "linear-gradient(180deg, #FF9159, #FF6B1A)", dotColor: "var(--gs-tangerine-ink)" },
  warning:   { color: "#3A2700",                 background: "linear-gradient(180deg, #FFD480, #E2A124)", dotColor: "#3A2700" },
  danger:    { color: "#fff",                    background: "linear-gradient(180deg, #FF8E88, #C7372F)", dotColor: "#fff" },
  info:      { color: "#fff",                    background: "linear-gradient(180deg, #7DAFE6, #3B6EA8)", dotColor: "#fff" },
};

const pillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 24,
  padding: "0 10px",
  borderRadius: 999,
  font: "700 11px/1 var(--gs-font-mono)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.16), 0 1px 0 rgba(11,11,18,0.06)",
};

export function StatusPill({ children, variant = "tangerine", dot = false, style }: StatusPillProps) {
  const v = VARIANTS[variant];
  return (
    <span
      style={{ ...pillStyle, color: v.color, background: v.background, ...style }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: v.dotColor,
            boxShadow: "0 0 0 2px rgba(255,255,255,0.45)",
          }}
        />
      )}
      {children}
    </span>
  );
}
