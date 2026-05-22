/**
 * <BlogHero> - generated 16:9 Y2K Aqua hero illustration.
 * Drawn entirely in inline SVG so Phase 1 needs zero image assets.
 * Variants tint the dominant chrome to keep posts visually distinct.
 */

import { useId } from "react";

type Variant = "aqua" | "tangerine" | "lilac" | "coral" | "mint" | "butter" | "rose";

const PALETTE: Record<Variant, { panel: string; panelEdge: string; tile: string; accent: string }> = {
  aqua:      { panel: "#D9E8F1", panelEdge: "#A6BBC7", tile: "#B7CEE4", accent: "#3B6EA8" },
  tangerine: { panel: "#FFE4D2", panelEdge: "#E89C66", tile: "#FFC79D", accent: "#FF6B1A" },
  lilac:     { panel: "#E3DEEE", panelEdge: "#B6ACCF", tile: "#C9C0E3", accent: "#7A6CA0" },
  coral:     { panel: "#F7CFBE", panelEdge: "#D78F73", tile: "#F4A38A", accent: "#C45A39" },
  mint:      { panel: "#D7E9D2", panelEdge: "#9CBE92", tile: "#B7D8B2", accent: "#3F7A38" },
  butter:    { panel: "#F7E4B1", panelEdge: "#D7B055", tile: "#F2D58B", accent: "#A77F1B" },
  rose:      { panel: "#F1D2D5", panelEdge: "#C98E94", tile: "#E8B6BB", accent: "#9A4B53" },
};

export function BlogHero({
  variant = "aqua",
  label,
  filename,
}: {
  variant?: Variant;
  label?: string;
  filename?: string;
}) {
  const p = PALETTE[variant];
  const uid = useId().replace(/:/g, "");
  const bgId = `gs-bh-bg-${uid}`;
  const tbId = `gs-bh-tb-${uid}`;
  const stripeId = `gs-bh-stripe-${uid}`;

  return (
    <div className="gs-blog-hero">
      <svg
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={bgId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBF7EE" />
            <stop offset="100%" stopColor="#EFE6D2" />
          </linearGradient>
          <linearGradient id={tbId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6E4DC" />
            <stop offset="100%" stopColor="#C9C5BA" />
          </linearGradient>
          <pattern id={stripeId} width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(11,11,18,0.06)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="1600" height="900" fill={`url(#${bgId})`} />
        <rect width="1600" height="900" fill={`url(#${stripeId})`} />

        {/* Back panel - large spreadsheet window */}
        <g transform="translate(120 120)">
          <rect width="900" height="660" rx="14" fill="#FBF7EE" stroke="#8E8A7E" />
          <rect width="900" height="42" rx="14" fill={`url(#${tbId})`} />
          <rect y="38" width="900" height="4" fill="#8E8A7E" opacity="0.45" />
          <circle cx="22" cy="21" r="6" fill="#FF6058" />
          <circle cx="42" cy="21" r="6" fill="#FFBE2E" />
          <circle cx="62" cy="21" r="6" fill="#28C940" />
          <text x="450" y="26" fontFamily="Space Mono, monospace" fontSize="13" fill="#6E6A60" textAnchor="middle">
            {label ?? "signals.psheet"}
          </text>

          <g transform="translate(20 64)">
            {Array.from({ length: 9 }).map((_, i) => (
              <rect key={i} y={i * 60} width="860" height="60" fill={i % 2 === 0 ? "#FBF7EE" : "#F2EADB"} />
            ))}
            {Array.from({ length: 6 }).map((_, c) => (
              <line key={c} x1={c * 143} y1="0" x2={c * 143} y2="540" stroke="rgba(11,11,18,0.08)" />
            ))}
            {Array.from({ length: 10 }).map((_, r) => (
              <line key={r} x1="0" y1={r * 60} x2="860" y2={r * 60} stroke="rgba(11,11,18,0.08)" />
            ))}
            <rect y="120" width="860" height="60" fill={p.tile} opacity="0.55" />
            <rect y="120" width="6" height="60" fill={p.accent} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <circle key={i} cx="22" cy={30 + i * 60} r="4" fill={i === 2 ? p.accent : "rgba(11,11,18,0.18)"} />
            ))}
          </g>
        </g>

        {/* Floating front panel - DM thread / signal card */}
        <g transform="translate(900 360)">
          <rect width="540" height="380" rx="14" fill="#FBF7EE" stroke="#8E8A7E" />
          <rect width="540" height="36" rx="14" fill={`url(#${tbId})`} />
          <rect y="32" width="540" height="4" fill="#8E8A7E" opacity="0.45" />
          <circle cx="20" cy="18" r="5" fill="#FF6058" />
          <circle cx="36" cy="18" r="5" fill="#FFBE2E" />
          <circle cx="52" cy="18" r="5" fill="#28C940" />
          <text x="270" y="22" fontFamily="Space Mono, monospace" fontSize="11" fill="#6E6A60" textAnchor="middle">
            {filename ?? "thread.ui"}
          </text>

          <rect x="24" y="68" width="280" height="46" rx="10" fill={p.tile} />
          <rect x="240" y="130" width="276" height="62" rx="10" fill="#EDE4D2" />
          <rect x="24" y="210" width="220" height="46" rx="10" fill={p.tile} />
          <rect x="240" y="272" width="276" height="78" rx="10" fill="#EDE4D2" />
          <circle cx="510" cy="60" r="8" fill="#FF6B1A" />
        </g>

        {/* File icons - bottom left */}
        <g transform="translate(80 540)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 90} 0)`}>
              <rect width="72" height="92" rx="6" fill="#FBF7EE" stroke="#8E8A7E" />
              <rect width="72" height="14" rx="6" fill={p.tile} />
              <line x1="10" y1="36" x2="62" y2="36" stroke="rgba(11,11,18,0.1)" />
              <line x1="10" y1="50" x2="62" y2="50" stroke="rgba(11,11,18,0.1)" />
              <line x1="10" y1="64" x2="50" y2="64" stroke="rgba(11,11,18,0.1)" />
              <circle cx="60" cy="84" r="4" fill={p.accent} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
