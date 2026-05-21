/**
 * <SignalFeedListWindow> — the "How It Works" capture feed.
 * 6 rows of platform-tagged signals with colored type chips on the left.
 */

import type { CSSProperties } from "react";
import { ChromeWindow, MonoLabel } from "@/components/atoms";

export interface SignalFeedListRow {
  tag: string;    // chip label (e.g. "LIVE", "DM", "STORY")
  text: string;
  source: string; // right-aligned platform tag
  color: string;  // chip background color (CSS color)
}

export interface SignalFeedListWindowProps {
  title?: string;
  countLabel?: string;
  filterLabel?: string;
  rightLabel?: string;
  rows?: SignalFeedListRow[];
  style?: CSSProperties;
}

const DEFAULT_ROWS: SignalFeedListRow[] = [
  { tag: "LIVE",    text: "@vespertine_studio replied to your reel",       source: "INSTAGRAM", color: "var(--gs-coral)"  },
  { tag: "STORY",   text: "Tagged in 4 stories from /pickups account",     source: "TIKTOK",    color: "var(--gs-butter)" },
  { tag: "DM",      text: "First DM from @maya.r — \"Tuesday launch?\"",   source: "INSTAGRAM", color: "var(--gs-lilac)"  },
  { tag: "MENTION", text: "@blvkmilk: 'i had M3 at the early bird'",       source: "TIKTOK",    color: "var(--gs-mint)"   },
  { tag: "REPLY",   text: "Comment cluster: 47 replies — timing debate",   source: "INSTAGRAM", color: "var(--gs-sky)"    },
  { tag: "CREATOR", text: "Pickup signal from @aimeleondore",              source: "TIKTOK",    color: "var(--gs-rose)"   },
];

export function SignalFeedListWindow({
  title = "growthsync · signal · feed",
  countLabel = "6 LIVE · 1 IDLE",
  filterLabel = "FILTER · ALL",
  rightLabel = "LATEST →",
  rows = DEFAULT_ROWS,
  style,
}: SignalFeedListWindowProps) {
  return (
    <ChromeWindow title={title} style={{ width: "100%", ...style }}>
      <div
        className="gs-win-row"
        style={{ gridTemplateColumns: "1fr 70px 80px", background: "var(--gs-paper-cool)" }}
      >
        <MonoLabel color="var(--gs-ink)">{countLabel}</MonoLabel>
        <MonoLabel>{filterLabel}</MonoLabel>
        <MonoLabel>{rightLabel}</MonoLabel>
      </div>
      {rows.map((r) => (
        <div
          key={r.tag + r.text}
          className="gs-win-row"
          style={{ gridTemplateColumns: "70px 1fr 80px" }}
        >
          <span
            style={{
              display: "inline-flex",
              padding: "2px 6px",
              borderRadius: 4,
              background: r.color,
              font: "700 9px/1 var(--gs-font-mono)",
              letterSpacing: "0.08em",
              color: "var(--gs-ink)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {r.tag}
          </span>
          <span className="label">{r.text}</span>
          <span className="meta" style={{ textAlign: "right" }}>{r.source}</span>
        </div>
      ))}
    </ChromeWindow>
  );
}
