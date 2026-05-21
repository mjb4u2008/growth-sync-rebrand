import { useId, type CSSProperties } from "react";
import { VersionBadge } from "./primitives";

type GrowthSyncLogoVariant = "lockup" | "wordmark" | "icon";

export interface GrowthSyncLogoProps {
  variant?: GrowthSyncLogoVariant;
  height?: number;
  color?: string;
  withBadge?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

function cleanId(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, "");
}

function LogoIcon({ gradientId }: { gradientId: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${gradientId}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8F3F" />
          <stop offset="50%" stopColor="#F26B1F" />
          <stop offset="100%" stopColor="#C84F0E" />
        </linearGradient>
        <radialGradient id={`${gradientId}-hl`} cx="0.3" cy="0.25" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gradientId}-inset-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="6%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${gradientId}-inset-bot`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="6%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${gradientId}-base)`} stroke="#8C2F0C" strokeWidth="2" />
      <circle cx="50" cy="50" r="47" fill={`url(#${gradientId}-hl)`} />
      <circle cx="50" cy="50" r="47" fill={`url(#${gradientId}-inset-top)`} />
      <circle cx="50" cy="50" r="47" fill={`url(#${gradientId}-inset-bot)`} />
    </>
  );
}

export function GrowthSyncLogo({
  variant = "lockup",
  height = variant === "icon" ? 32 : 32,
  color = "#0B0B12",
  withBadge = false,
  className,
  style,
  ariaLabel = "GrowthSync",
}: GrowthSyncLogoProps) {
  const id = cleanId(useId());
  const viewBox = variant === "icon" ? "0 0 100 100" : variant === "wordmark" ? "0 0 440 92" : "0 0 540 100";
  const width = variant === "icon" ? height : variant === "wordmark" ? height * (440 / 92) : height * 5.4;

  const logo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ display: "block", flex: "0 0 auto", ...style }}
    >
      {variant === "icon" ? (
        <LogoIcon gradientId={id} />
      ) : variant === "wordmark" ? (
        <text
          x="0"
          y="68"
          fontFamily="'Hanken Grotesk', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="64"
          fill={color}
          letterSpacing="-0.05em"
        >
          GrowthSync
        </text>
      ) : (
        <>
          <g transform="translate(10, 10) scale(0.8)">
            <LogoIcon gradientId={id} />
          </g>
          <text
            x="110"
            y="68"
            fontFamily="'Hanken Grotesk', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="64"
            fill={color}
            letterSpacing="-0.05em"
          >
            GrowthSync
          </text>
        </>
      )}
    </svg>
  );

  if (!withBadge) return logo;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.max(8, height * 0.18) }}>
      {logo}
      <VersionBadge style={{ fontSize: Math.max(9, height * 0.28) }} />
    </span>
  );
}
