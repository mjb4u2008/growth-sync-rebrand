/**
 * <BlogFileIcon> - tiny old-OS file glyph used as category marker.
 * Color tint follows the category so the index doubles as a quick legend.
 */

import type { BlogCategory, SignalType } from "../types";

const CATEGORY_TINT: Record<BlogCategory, string> = {
  "Social Commerce": "var(--gs-sky)",
  "Instagram Ops": "var(--gs-tangerine)",
  "Creator Commerce": "var(--gs-coral)",
  "AI Replies": "var(--gs-lilac)",
  "Field Notes": "var(--gs-butter)",
  "Product Logs": "var(--gs-mint)",
};

const SIGNAL_GLYPH: Record<SignalType, string> = {
  DM: "✉",
  Comment: "○",
  "Story Reply": "▷",
  "Creator Tag": "@",
  "Purchase Intent": "$",
  CRM: "▤",
};

export function BlogFileIcon({ category }: { category: BlogCategory }) {
  const tint = CATEGORY_TINT[category] ?? "var(--gs-sky)";
  return (
    <span
      aria-hidden
      style={{
        position: "relative",
        display: "inline-block",
        width: 14,
        height: 16,
        background: "#FBF7EE",
        border: "1px solid var(--gs-chrome-edge)",
        borderRadius: 2,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: tint,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
      <span
        style={{
          position: "absolute",
          right: -1,
          top: -1,
          width: 4,
          height: 4,
          background: tint,
          borderLeft: "1px solid var(--gs-chrome-edge)",
          borderBottom: "1px solid var(--gs-chrome-edge)",
        }}
      />
    </span>
  );
}

export function SignalDot({ signal }: { signal: SignalType }) {
  return (
    <span
      aria-hidden
      title={signal}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 16,
        height: 16,
        borderRadius: 999,
        background: "var(--gs-bone)",
        border: "1px solid var(--gs-chrome-edge)",
        font: "700 10px/1 var(--gs-font-mono)",
        color: "var(--gs-ink-3)",
      }}
    >
      {SIGNAL_GLYPH[signal]}
    </span>
  );
}

export function FreshnessDot({ kind }: { kind: "fresh" | "warm" | "cold" }) {
  const color =
    kind === "fresh"
      ? "var(--gs-success)"
      : kind === "warm"
      ? "var(--gs-warning)"
      : "var(--gs-ink-4)";
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: 999,
        background: color,
        boxShadow: "0 0 0 1px rgba(11,11,18,0.12)",
      }}
    />
  );
}
