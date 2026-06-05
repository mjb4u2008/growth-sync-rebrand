/**
 * <TangerineButton> - the glossy brand CTA.
 *
 *   variant: "primary" (tangerine), "ghost" (paper outline), "ink" (black)
 *   size:    "sm" | "md" | "lg" | "orb"
 *
 * Roll your own button at your peril. Use this instead.
 */

import type { CSSProperties } from "react";
import type { TangerineButtonProps, TangerineButtonSize, TangerineButtonVariant } from "@/lib/types";

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  border: 0,
  cursor: "pointer",
  font: "600 14px/1 var(--gs-font-sans)",
  letterSpacing: "0",
  whiteSpace: "nowrap",
  transition:
    "transform 120ms cubic-bezier(.2,.7,.1,1), box-shadow 120ms cubic-bezier(.2,.7,.1,1)",
};

const SIZES: Record<TangerineButtonSize, CSSProperties> = {
  sm:  { height: 32, padding: "0 14px", fontSize: 12, borderRadius: 999 },
  md:  { height: 40, padding: "0 20px", fontSize: 14, borderRadius: 999 },
  lg:  { height: 48, padding: "0 26px", fontSize: 15, borderRadius: 999 },
  orb: { height: 44, padding: "0 22px", fontSize: 13, borderRadius: 999 },
};

const VARIANTS: Record<TangerineButtonVariant, CSSProperties> = {
  primary: {
    color: "#fff",
    background:
      "radial-gradient(120% 90% at 30% 18%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 35%)," +
      "linear-gradient(180deg, #FF9159 0%, #FF6B1A 50%, #C24306 100%)",
    boxShadow: [
      "inset 0 1px 0 rgba(255,255,255,0.55)",
      "inset 0 -1px 0 rgba(0,0,0,0.25)",
      "0 8px 18px -6px rgba(224,79,10,0.6)",
      "0 1px 0 rgba(11,11,18,0.18)",
    ].join(","),
  },
  ghost: {
    color: "var(--gs-ink)",
    background: "transparent",
    boxShadow: "0 0 0 1px var(--gs-rule) inset",
  },
  ink: {
    color: "#fff",
    background: "var(--gs-ink)",
    boxShadow:
      "0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 6px 14px -4px rgba(0,0,0,0.35)",
  },
};

export function TangerineButton({
  children,
  size = "md",
  variant = "primary",
  style,
  onClick,
  type = "button",
  disabled = false,
}: TangerineButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...SIZES[size],
        ...VARIANTS[variant],
        ...(disabled ? { cursor: "not-allowed", opacity: 0.68, transform: "none" } : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
