/**
 * <ModuleWindow> - shared product window used by the three "How It Works"
 * visuals so they all read in the same GrowthSync product language.
 *
 *   chrome titlebar (traffic lights · filename · system clock)
 *   subbar (eyebrow label · status pill)
 *   body  (provided by children)
 */

import type { CSSProperties, ReactNode } from "react";

interface Props {
  title: string;
  eyebrow: string;
  /** Right-aligned pill in the subbar - e.g. "LIVE · 24 NEW". */
  status: ReactNode;
  /** Right-aligned text in the titlebar (default: clock). */
  clock?: string;
  children: ReactNode;
  style?: CSSProperties;
}

const root: CSSProperties = {
  borderRadius: 14,
  background: "var(--gs-bone)",
  overflow: "hidden",
  position: "relative",
  width: "100%",
  maxWidth: 540,
  marginInline: "auto",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.65), 0 0 0 1px var(--gs-chrome-edge), 0 24px 48px -18px rgba(11,11,18,0.32), 0 56px 96px -40px rgba(11,11,18,0.36)",
};

const titlebar: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "70px 1fr 70px",
  alignItems: "center",
  height: 26,
  padding: "0 12px",
  background: "linear-gradient(180deg, #ECE5D0, #C9C0A6)",
  borderBottom: "1px solid rgba(11,11,18,0.18)",
};

const subbar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 14px",
  background: "var(--gs-paper-cool)",
  borderBottom: "1px solid var(--gs-bone-edge)",
  font: "700 10px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

export function ModuleWindow({ title, eyebrow, status, clock = "04:21 PM", children, style }: Props) {
  return (
    <div style={{ ...root, ...style }}>
      <div style={titlebar}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "var(--gs-tl-red)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "var(--gs-tl-yel)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "var(--gs-tl-grn)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
        </div>
        <div style={{ textAlign: "center", font: "var(--gs-mono-sm)", color: "var(--gs-ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {title}
        </div>
        <div style={{ textAlign: "right", font: "700 10px/1 var(--gs-font-mono)", color: "var(--gs-ink-3)", letterSpacing: "0.08em" }}>
          {clock}
        </div>
      </div>
      <div style={subbar}>
        <span style={{ color: "var(--gs-ink)" }}>{eyebrow}</span>
        <span>{status}</span>
      </div>
      <div style={{ background: "var(--gs-bone)" }}>{children}</div>
    </div>
  );
}

/** Small green-LED status pill for the subbar. */
export function ModuleStatusPill({ children }: { children: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 999, background: "rgba(40,201,64,0.12)", color: "var(--gs-success)", boxShadow: "0 0 0 1px rgba(40,201,64,0.30)" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--gs-success)", boxShadow: "0 0 6px rgba(40,201,64,0.7)" }} />
      <span style={{ font: "700 9px/1 var(--gs-font-mono)", letterSpacing: "0.10em" }}>{children}</span>
    </span>
  );
}
