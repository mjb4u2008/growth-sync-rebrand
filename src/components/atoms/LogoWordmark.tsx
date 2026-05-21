import { GrowthSyncLogo } from "./GrowthSyncLogo";
import type { LogoWordmarkProps } from "@/lib/types";

export function LogoWordmark({
  size = 56,
  withOrb = true,
  withBadge = false,
  color = "var(--gs-ink)",
}: LogoWordmarkProps) {
  return (
    <GrowthSyncLogo
      variant={withOrb ? "lockup" : "wordmark"}
      height={withOrb ? size * (100 / 64) : size * (92 / 64)}
      color={color}
      withBadge={withBadge}
    />
  );
}
