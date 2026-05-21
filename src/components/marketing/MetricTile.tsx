/**
 * <MetricTile> — bone or tangerine KPI block.
 * Reserve `variant="tangerine"` for the headline KPI in a series; the rest
 * stay on bone.
 */

import type { MetricTileProps } from "@/lib/types";

export function MetricTile({ value, label, variant = "bone", style }: MetricTileProps) {
  const isTang = variant === "tangerine";
  return (
    <div
      style={{
        background: isTang
          ? "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))"
          : "var(--gs-bone)",
        color: isTang ? "#fff" : "var(--gs-ink)",
        borderRadius: 10,
        padding: "14px 16px",
        minWidth: 140,
        boxShadow: isTang ? "var(--gs-shadow-cta)" : "var(--gs-shadow-card)",
        ...style,
      }}
    >
      <div
        style={{
          font: "800 28px/1 var(--gs-font-display)",
          letterSpacing: "0",
          color: isTang ? "#fff" : "var(--gs-ink)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          font: "700 11px/1 var(--gs-font-mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: isTang ? "rgba(255,255,255,0.85)" : "var(--gs-ink-3)",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}
