/**
 * <SocialSignalCard> — windowed TikTok/IG signal card.
 * Image is shown as a 4:5 hero, with handle + LIVE pill underneath and
 * a tangerine "PICK UP →" CTA in the metadata row.
 */

import { Avatar, ChromeWindow, MonoLabel, StatusPill } from "@/components/atoms";
import type { SocialSignalCardProps } from "@/lib/types";

export function SocialSignalCard({
  handle,
  avatar,
  avatarColor = "var(--gs-coral)",
  image,
  body,
  meta,
  cta = "PICK UP →",
  platform = "tiktok",
  id,
  style,
}: SocialSignalCardProps) {
  const slug = id ?? handle.replace(/[^a-z0-9_]/gi, "");
  const title = `signal · ${slug} · ${platform}`;
  return (
    <ChromeWindow title={title} style={style}>
      <div style={{ padding: 12 }}>
        <div
          style={{
            aspectRatio: "4 / 5",
            borderRadius: "var(--gs-r-2)",
            background: image ? undefined : avatarColor,
            backgroundImage: image ? `url(${image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "var(--gs-shadow-hairline)",
          }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
          <Avatar initials={avatar} size={22} bg={avatarColor} />
          <span style={{ font: "var(--gs-h4)", color: "var(--gs-ink)" }}>{handle}</span>
          <StatusPill
            variant="success"
            dot
            style={{ marginLeft: "auto", height: 18, padding: "0 6px", fontSize: 9 }}
          >
            LIVE
          </StatusPill>
        </div>
        <p style={{ font: "var(--gs-body-sm)", color: "var(--gs-ink-2)", margin: "8px 0 0" }}>
          {body}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <MonoLabel>{meta}</MonoLabel>
          <MonoLabel color="var(--gs-tangerine-deep)">{cta}</MonoLabel>
        </div>
      </div>
    </ChromeWindow>
  );
}
