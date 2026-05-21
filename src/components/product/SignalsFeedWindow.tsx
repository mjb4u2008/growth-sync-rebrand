/**
 * <SignalsFeedWindow> — the hero-right product preview window.
 * "growthsync · signals · tiktok · /pickups" titlebar with a count strip
 * and 5 signal rows. Data lives here because it's the marketing-site
 * preview content, not real product state.
 */

import type { CSSProperties } from "react";
import { ChromeWindow, MonoLabel } from "@/components/atoms";

export interface SignalsFeedRow {
  code: string;
  label: string;
  ts: string;
}

export interface SignalsFeedWindowProps {
  title?: string;
  countLabel?: string;
  countMeta?: string;
  rows?: SignalsFeedRow[];
  style?: CSSProperties;
}

const DEFAULT_ROWS: SignalsFeedRow[] = [
  { code: "M03", label: "@maya.r asked: \"isn't it too soon for the Tuesday launch?\"", ts: "12s" },
  { code: "M04", label: "3 new DMs from creators tagged in SS25",                       ts: "1m"  },
  { code: "P12", label: "@vespertine_studio replied to your Folded Atelier reel",      ts: "4m"  },
  { code: "P14", label: "Story mention: \"i had M3 at the early bird ✨\"",            ts: "9m"  },
  { code: "P22", label: "Comment cluster: 47 replies — Tuesday timing",                ts: "11m" },
];

export function SignalsFeedWindow({
  title = "growthsync · signals · tiktok · /pickups",
  countLabel = "3 NEW",
  countMeta = "0 actioned · last sync 4 min ago",
  rows = DEFAULT_ROWS,
  style,
}: SignalsFeedWindowProps) {
  return (
    <ChromeWindow title={title} style={{ width: "100%", ...style }}>
      <div
        className="gs-win-row"
        style={{
          gridTemplateColumns: "44px 1fr 60px",
          padding: "10px 14px",
          background: "var(--gs-paper-cool)",
        }}
      >
        <MonoLabel color="var(--gs-ink)">{countLabel}</MonoLabel>
        <span className="meta">{countMeta}</span>
        <span className="meta" style={{ textAlign: "right" }}>↻</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.code}
          className="gs-win-row"
          style={{ gridTemplateColumns: "44px 1fr 60px" }}
        >
          <span className="step">{r.code}</span>
          <span className="label">{r.label}</span>
          <span className="meta" style={{ textAlign: "right" }}>{r.ts}</span>
        </div>
      ))}
    </ChromeWindow>
  );
}
