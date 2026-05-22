/**
 * <BrandGrid> + <BrandTile> - Y2K beveled mosaic.
 * Tiles read their color skin from <BrandTileColor>. The "Nike" tile
 * uses `big: true` and spans two rows.
 */

import type { CSSProperties } from "react";
import { MonoLabel } from "@/components/atoms";
import { GS_DATA } from "@/lib/data";
import type { BrandGridProps, BrandTileColor, BrandTileProps } from "@/lib/types";

interface Skin { bg: string; nm: string; sb: string; }

export const BRAND_GRID_SKINS: Record<BrandTileColor, Skin> = {
  orange: { bg: "linear-gradient(180deg, #FF8447 0%, #F36321 55%, #D8501A 100%)", nm: "#fff",          sb: "rgba(255,255,255,0.92)" },
  blue:   { bg: "linear-gradient(180deg, #6FA3D9 0%, #4F84BE 55%, #3A6BA3 100%)", nm: "#fff",          sb: "rgba(255,255,255,0.90)" },
  lilac:  { bg: "linear-gradient(180deg, #D6CCF4 0%, #B7A7E7 55%, #9D8AD6 100%)", nm: "#1A1633",       sb: "rgba(47,40,85,0.85)"    },
  tan:    { bg: "linear-gradient(180deg, #E1DCC9 0%, #C9C3AD 55%, #B0A992 100%)", nm: "var(--gs-ink)", sb: "var(--gs-ink-3)"        },
};

const overlay: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  borderRadius: 12,
  background:
    "radial-gradient(120% 70% at 0% 0%, rgba(255,255,255,0.42), rgba(255,255,255,0) 55%)," +
    "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 50%, rgba(11,11,18,0.10) 100%)",
};

export function BrandTile({ name, sub, sub2, color, big }: BrandTileProps) {
  const s = BRAND_GRID_SKINS[color];
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        padding: big ? "26px 28px 24px" : "18px 20px",
        background: s.bg,
        color: s.nm,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        gridRow: big ? "span 2" : undefined,
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.6)",
          "inset 0 -1px 0 rgba(11,11,18,0.14)",
          "0 1px 0 rgba(255,255,255,0.6)",
          "0 10px 22px -8px rgba(11,11,18,0.38)",
        ].join(","),
      }}
    >
      <div style={overlay} />
      <div
        className={big ? "gs-brand-tile-name big" : "gs-brand-tile-name"}
        style={{
          position: "relative",
          font: big
            ? "800 88px/0.9 var(--gs-font-display)"
            : "800 28px/1 var(--gs-font-display)",
          letterSpacing: big ? "-0.05em" : "-0.025em",
          color: s.nm,
        }}
      >
        {name}
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            color: s.sb,
            font: big ? "500 15px/1.2 var(--gs-font-mono)" : "700 11px/1.3 var(--gs-font-mono)",
            letterSpacing: "0.04em",
            textTransform: big ? "none" : "lowercase",
          }}
        >
          {sub}
        </span>
        {sub2 && (
          <span
            style={{
              color: s.sb,
              font: "700 10px/1 var(--gs-font-mono)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.88,
            }}
          >
            {sub2}
          </span>
        )}
      </div>
    </div>
  );
}

const frame: CSSProperties = {
  background: "linear-gradient(180deg, #F1EEDF 0%, #E8E5D7 100%)",
  borderRadius: 16,
  padding: 16,
  position: "relative",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.7)",
    "inset 0 0 0 1px rgba(11,11,18,0.06)",
    "0 1px 0 rgba(255,255,255,0.7)",
    "0 20px 38px -18px rgba(11,11,18,0.24)",
  ].join(","),
};

export function BrandGrid({ data = GS_DATA.brandGrid }: BrandGridProps) {
  return (
    <div style={frame}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          pointerEvents: "none",
          background: "radial-gradient(120% 60% at 50% 0%, rgba(183,206,228,0.18), transparent 70%)",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 12px 14px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: "var(--gs-success)",
              boxShadow: "0 0 0 2px rgba(40,201,64,0.18)",
            }}
          />
          <MonoLabel color="var(--gs-ink)">{data.eyebrow}</MonoLabel>
        </div>
        <MonoLabel color="var(--gs-tangerine-deep)">{data.featuredCount}</MonoLabel>
      </div>
      <div
        className="gs-brand-grid-tiles"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gridAutoRows: "minmax(108px, auto)",
          gap: 12,
        }}
      >
        {data.tiles.map((t) => (
          <BrandTile key={t.name} {...t} />
        ))}
      </div>
    </div>
  );
}
