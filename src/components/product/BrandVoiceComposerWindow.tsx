/**
 * <BrandVoiceComposerWindow> - the "We reply instantly" composer card.
 * Tabbed window with PROMPT/VOICE/MEMORY/SEND, a customer header,
 * the inbound DM, the brand-voice draft, and a Re-draft/Send row.
 */

import type { CSSProperties } from "react";
import { Avatar, ChromeWindow, StatusPill, TangerineButton } from "@/components/atoms";

export interface BrandVoiceComposerWindowProps {
  /** Avatar initials of the customer being replied to. */
  customerInitials?: string;
  customerName?: string;
  customerMeta?: string;
  /** Inbound DM body. */
  prompt?: string;
  /** Drafted reply body (rendered glossy tangerine). */
  draft?: string;
  draftLabel?: string;
  title?: string;
  style?: CSSProperties;
}

export function BrandVoiceComposerWindow({
  customerInitials = "MR",
  customerName = "Maya R.",
  customerMeta = "@maya.r · 2 prior orders · last reply 4m",
  prompt = "Hey! I'm dialed in on this SS25 fit but isn't it too soon for the Tuesday launch?",
  draft = "Tuesday is on purpose. Post-payday and creator pickups peak then. We've held two of your size. Want me to drop you the calendar?",
  draftLabel = "BRAND-VOICE DRAFT · 4M TURNAROUND",
  title = "growthsync · brand-voice replies · @maya.r",
  style,
}: BrandVoiceComposerWindowProps) {
  return (
    <ChromeWindow
      title={title}
      style={{ width: "100%", ...style }}
      tabs={[
        { label: "PROMPT", active: true },
        { label: "VOICE" },
        { label: "MEMORY" },
        { label: "SEND" },
      ]}
    >
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <Avatar initials={customerInitials} bg="var(--gs-coral)" size={32} />
          <div style={{ flex: 1 }}>
            <div style={{ font: "var(--gs-h4)" }}>{customerName}</div>
            <span className="meta">{customerMeta}</span>
          </div>
          <StatusPill variant="tangerine">REPLY READY</StatusPill>
        </div>

        <div
          style={{
            padding: 12,
            borderRadius: 10,
            background: "var(--gs-paper-cool)",
            boxShadow: "var(--gs-shadow-hairline)",
            marginBottom: 10,
          }}
        >
          <span className="meta">PROMPT · DM IN</span>
          <p style={{ font: "var(--gs-body-sm)", color: "var(--gs-ink)", margin: "4px 0 0" }}>
            {prompt}
          </p>
        </div>

        <div
          style={{
            padding: 12,
            borderRadius: 10,
            background: "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))",
            color: "#fff",
            boxShadow: "var(--gs-shadow-pill)",
          }}
        >
          <span
            style={{
              font: "700 10px/1 var(--gs-font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            {draftLabel}
          </span>
          <p style={{ font: "var(--gs-body-sm)", margin: "4px 0 0" }}>{draft}</p>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
          <TangerineButton size="sm" variant="ghost">Re-draft</TangerineButton>
          <TangerineButton size="sm">Send reply →</TangerineButton>
        </div>
      </div>
    </ChromeWindow>
  );
}
