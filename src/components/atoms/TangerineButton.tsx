/**
 * <TangerineButton> - the canonical GrowthSync CTA pill.
 *
 *   variant: "default" (tangerine gradient) | "outline" | "ghost"
 *            | "destructive" | "ai"
 *   size:    "xs" | "sm" | "default" | "lg"   ("md"/"orb" are legacy aliases)
 *
 * All visual treatment lives in CSS (.gs-tbtn--*) so the spec's hover,
 * focus-ring, and disabled states work - those can't be expressed inline.
 * Roll your own button at your peril. Use this instead.
 */

import type { TangerineButtonProps, TangerineButtonSize, TangerineButtonVariant } from "@/lib/types";

const SIZE_CLASS: Record<TangerineButtonSize, string> = {
  xs: "gs-tbtn--sz-xs",
  sm: "gs-tbtn--sz-sm",
  default: "gs-tbtn--sz-default",
  lg: "gs-tbtn--sz-lg",
  md: "gs-tbtn--sz-lg", // legacy alias → spec lg
  orb: "gs-tbtn--sz-lg", // legacy alias → spec lg
};

const VARIANT_CLASS: Record<TangerineButtonVariant, string> = {
  default: "gs-tbtn--default",
  outline: "gs-tbtn--outline",
  ghost: "gs-tbtn--ghost",
  destructive: "gs-tbtn--destructive",
  ai: "gs-tbtn--ai",
  ink: "gs-tbtn--ink",
};

export function TangerineButton({
  children,
  size = "default",
  variant = "default",
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
      className={`gs-tbtn ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]}`}
      style={style}
    >
      {children}
    </button>
  );
}
