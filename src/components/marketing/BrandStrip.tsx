/**
 * <BrandStrip> — partner wordmark row on paper-warm pinstripes.
 *
 * Wordmarks animate as a single horizontal marquee. The list is rendered
 * twice back-to-back so the CSS keyframe can translate by -50% with no
 * visible seam.
 */

import type { CSSProperties } from "react";
import { MonoLabel } from "@/components/atoms";
import { GS_DATA } from "@/lib/data";
import type { BrandStripLockupStyle, BrandStripProps } from "@/lib/types";

const lockupStyles: Record<BrandStripLockupStyle, CSSProperties> = {
  grotesk: { font: "800 24px/1 var(--gs-font-display)", letterSpacing: "0" },
  serif:   { fontFamily: "var(--gs-font-editorial)", fontStyle: "italic", fontSize: 30, fontWeight: 400, lineHeight: 1 },
  mono:    { font: "700 17px/1 var(--gs-font-mono)", letterSpacing: "0.14em" },
};

export function BrandStrip({ data = GS_DATA.brandStrip }: BrandStripProps) {
  const items = [...data.lockups, ...data.lockups];

  return (
    <div
      style={{
        position: "relative",
        background: "var(--gs-paper-warm)",
        backgroundImage: "var(--gs-pinstripe-warm)",
        padding: "28px 0 22px",
        borderTop: "1px solid var(--gs-bone-edge)",
        borderBottom: "1px solid var(--gs-bone-edge)",
        zIndex: 3,
        boxShadow: "0 -10px 22px -18px rgba(11,11,18,0.18)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <MonoLabel color="var(--gs-ink-3)" style={{ letterSpacing: "0.16em" }}>
          {data.eyebrow}
        </MonoLabel>
      </div>
      <div className="gs-marquee-mask">
        <div className="gs-marquee">
          {items.map((l, i) => (
            <span
              key={`${l.text}-${i}`}
              style={{ color: "var(--gs-ink)", whiteSpace: "nowrap", ...lockupStyles[l.style] }}
            >
              {l.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
