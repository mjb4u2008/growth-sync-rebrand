/**
 * <ModuleWindow> - shared product surface for the three "How It Works"
 * visuals. To keep the page from reading as one repeated OS window, the
 * wrapper ships three framing variants on a single, consistent depth +
 * radius system; each module picks a different one so the sections stack
 * with rhythm instead of repetition:
 *
 *   frame="console" - glossy Aqua titlebar (traffic lights + file), window depth
 *   frame="tab"     - single document tab, no traffic lights, card depth
 *   frame="ledger"  - no titlebar, flat record header, card depth
 *
 * Depth + radius come from the design tokens (--gs-shadow-*, --gs-r-5) so
 * every surface on the page shares the same elevation language.
 */

import type { CSSProperties, ReactNode } from "react";

type Frame = "console" | "tab" | "ledger";

interface Props {
  title: string;
  eyebrow: string;
  /** Right-aligned pill in the subbar - e.g. "LIVE · 24 NEW". */
  status: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  /** Framing language for the surface. Defaults to the Aqua console. */
  frame?: Frame;
}

const SHADOW: Record<Frame, string> = {
  console: "var(--gs-shadow-window)",
  tab: "var(--gs-shadow-card)",
  ledger: "var(--gs-shadow-card)",
};

function rootStyle(frame: Frame): CSSProperties {
  return {
    borderRadius: "var(--gs-r-5)",
    background: "var(--gs-bone)",
    overflow: "hidden",
    position: "relative",
    width: "100%",
    maxWidth: 540,
    marginInline: "auto",
    boxShadow: SHADOW[frame],
  };
}

const trafficLight: CSSProperties = {
  width: 11,
  height: 11,
  borderRadius: 999,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 0.5px rgba(0,0,0,0.22)",
};

/** Glossy Aqua titlebar - traffic lights + centered filename, no clock. */
function ConsoleTitlebar({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr 64px",
        alignItems: "center",
        height: 28,
        padding: "0 12px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0) 46%), linear-gradient(180deg, var(--gs-chrome-1), var(--gs-chrome-2))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85)",
        borderBottom: "1px solid var(--gs-chrome-edge)",
      }}
    >
      <div style={{ display: "flex", gap: 6 }}>
        <span style={{ ...trafficLight, background: "var(--gs-tl-red)" }} />
        <span style={{ ...trafficLight, background: "var(--gs-tl-yel)" }} />
        <span style={{ ...trafficLight, background: "var(--gs-tl-grn)" }} />
      </div>
      <div style={{ textAlign: "center", font: "var(--gs-mono-sm)", color: "var(--gs-ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {title}
      </div>
      <div />
    </div>
  );
}

/** Single document tab anchored on a baseline rule - no traffic lights. */
function TabHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: 31,
        padding: "0 12px",
        background: "var(--gs-bone)",
        borderBottom: "1px solid var(--gs-bone-edge)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "6px 13px 7px",
          borderRadius: "var(--gs-r-3) var(--gs-r-3) 0 0",
          background: "linear-gradient(180deg, var(--gs-paper-cool), var(--gs-paper-warm))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 1px var(--gs-bone-edge)",
          font: "700 10px/1 var(--gs-font-mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--gs-ink-3)",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--gs-tangerine)", boxShadow: "0 0 0 1px rgba(11,11,18,0.14)" }} />
        {title}
      </span>
    </div>
  );
}

function subbarStyle(frame: Frame): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 14px",
    background: frame === "ledger" ? "var(--gs-bone)" : "var(--gs-paper-cool)",
    borderBottom: "1px solid var(--gs-bone-edge)",
    font: "700 10px/1 var(--gs-font-mono)",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: "var(--gs-ink-3)",
  };
}

export function ModuleWindow({ title, eyebrow, status, children, style, frame = "console" }: Props) {
  return (
    <div style={{ ...rootStyle(frame), ...style }}>
      {frame === "console" && <ConsoleTitlebar title={title} />}
      {frame === "tab" && <TabHeader title={title} />}
      <div style={subbarStyle(frame)}>
        <span style={{ color: frame === "ledger" ? "var(--gs-tangerine-deep)" : "var(--gs-ink)" }}>
          {frame === "ledger" ? `› ${eyebrow}` : eyebrow}
        </span>
        <span>{status}</span>
      </div>
      <div style={{ background: "var(--gs-bone)" }}>{children}</div>
    </div>
  );
}

/** Small green-LED status pill for the subbar. */
export function ModuleStatusPill({ children }: { children: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 999, background: "rgba(40,201,64,0.12)", color: "var(--gs-success-ink)", boxShadow: "0 0 0 1px rgba(40,201,64,0.30)" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--gs-success)", boxShadow: "0 0 6px rgba(40,201,64,0.7)" }} />
      <span style={{ font: "700 9px/1 var(--gs-font-mono)", letterSpacing: "0.10em" }}>{children}</span>
    </span>
  );
}
