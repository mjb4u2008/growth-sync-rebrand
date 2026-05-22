/**
 * GrowthSync atoms — small, stateless primitives. Grouped into one
 * file because they share no state and each is just a few lines.
 *
 *   <Orb />            tangerine 3D orb (logo + nav)
 *   <VersionBadge />   black "v1.0" pill
 *   <MonoLabel />      Space Mono 700 ALL-CAPS label
 *   <Eyebrow />        rounded paper eyebrow pill with LED dot
 *   <ReadMore />       tangerine "Read more →" link
 *   <Avatar />         circular initials bubble
 */

import type {
  AvatarProps,
  EyebrowProps,
  MonoLabelProps,
  OrbProps,
  ReadMoreProps,
  VersionBadgeProps,
} from "@/lib/types";

export function Orb({ size = 22, style }: OrbProps) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 999,
        background:
          "radial-gradient(circle at 32% 28%, #FFC79A 0%, #FF8847 35%, #E04F0A 75%, #9A3000 100%)",
        boxShadow: [
          "0 1px 0 rgba(255,255,255,0.45) inset",
          "0 -1px 0 rgba(0,0,0,0.2) inset",
          "0 3px 6px -2px rgba(224,79,10,0.55)",
        ].join(","),
        ...style,
      }}
    />
  );
}

export function VersionBadge({ children = "v1.0", style }: VersionBadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        font: "700 11px/1 var(--gs-font-mono)",
        letterSpacing: "0.06em",
        background: "#0F0E0A",
        color: "#F9C089",
        padding: "5px 7px",
        borderRadius: 4,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 0 rgba(255,255,255,0.5)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function MonoLabel({ children, color = "var(--gs-ink-3)", style }: MonoLabelProps) {
  return (
    <span
      style={{
        font: "700 11px/1.2 var(--gs-font-mono)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, dot = true, style }: EyebrowProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 10px",
        borderRadius: 999,
        background: "var(--gs-paper)",
        boxShadow: "0 0 0 1px var(--gs-bone-edge)",
        font: "700 10px/1 var(--gs-font-mono)",
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        color: "var(--gs-ink)",
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "var(--gs-success)",
            boxShadow: "0 0 0 2px rgba(40,201,64,0.18)",
          }}
        />
      )}
      {children}
    </span>
  );
}

export function ReadMore({ children = "Read more →", href = "/book-a-call", onClick, style }: ReadMoreProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        display: "inline-block",
        font: "700 11px/1 var(--gs-font-mono)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--gs-tangerine-deep)",
        cursor: "pointer",
        textDecoration: "none",
        ...style,
      }}
    >
      {children}
    </a>
  );
}

export function Avatar({ initials, bg = "var(--gs-coral)", size = 32, style }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        font: `800 ${Math.round(size * 0.38)}px/1 var(--gs-font-display)`,
        color: "var(--gs-ink)",
        letterSpacing: "0",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
        flexShrink: 0,
        ...style,
      }}
    >
      {initials}
    </div>
  );
}
