/**
 * <LogoWordmark> — the GrowthSync wordmark.
 * Hanken Grotesk 900 with optional 3D orange orb and black v1.0 badge.
 */

import { Orb, VersionBadge } from "./primitives";
import type { LogoWordmarkProps } from "@/lib/types";

export function LogoWordmark({
  size = 56,
  withOrb = true,
  withBadge = false,
  color = "var(--gs-ink)",
}: LogoWordmarkProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.18 }}>
      {withOrb && <Orb size={size * 0.4} />}
      <span
        style={{
          font: `900 ${size}px/1 "Hanken Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif`,
          letterSpacing: "-0.035em",
          color,
        }}
      >
        GrowthSync
      </span>
      {withBadge && <VersionBadge style={{ fontSize: Math.max(9, size * 0.18) }} />}
    </span>
  );
}
