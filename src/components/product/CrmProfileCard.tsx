/**
 * <CrmProfileCard> — segment-of-one CRM panel.
 *
 *   Header: avatar + name + handle + intent pill
 *   Stats:  4-up Orbitron stat row (optional)
 *   Timeline: dated rows (optional)
 */

import { Avatar, ChromeWindow, MonoLabel, StatusPill } from "@/components/atoms";
import type { CrmProfileCardProps } from "@/lib/types";

export function CrmProfileCard({
  name,
  handle,
  location,
  joined,
  avatarInitials,
  avatarColor = "var(--gs-coral)",
  intent = "HIGH INTENT",
  stats = [],
  timeline = [],
  style,
}: CrmProfileCardProps) {
  return (
    <ChromeWindow
      title={`growthsync · crm · segment of one · ${handle.toLowerCase().replace(/^@/, "")}`}
      style={style}
    >
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Avatar initials={avatarInitials} bg={avatarColor} size={38} />
            <div>
              <div style={{ font: "var(--gs-h3)" }}>{name}</div>
              <MonoLabel
                style={{
                  font: "400 11px/1.3 var(--gs-font-mono)",
                  textTransform: "lowercase",
                }}
              >
                {handle} · {location} · joined {joined}
              </MonoLabel>
            </div>
          </div>
          <StatusPill variant="success" dot>{intent}</StatusPill>
        </div>
      </div>

      {stats.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            borderTop: "1px solid var(--gs-rule-soft)",
            borderBottom: "1px solid var(--gs-rule-soft)",
          }}
        >
          {stats.map(([value, label], i) => (
            <div
              key={label}
              style={{
                padding: "10px 14px",
                borderRight: i < stats.length - 1 ? "1px solid var(--gs-rule-soft)" : 0,
              }}
            >
              <div
                style={{
                  font: "700 22px/1 var(--gs-font-tech)",
                  letterSpacing: "0.04em",
                  color: "var(--gs-ink)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  font: "700 10px/1 var(--gs-font-mono)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--gs-ink-3)",
                  marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      {timeline.length > 0 && (
        <div style={{ padding: "12px 16px" }}>
          {timeline.map(([d, t]) => (
            <div
              key={d}
              style={{ display: "grid", gridTemplateColumns: "60px 1fr", padding: "5px 0" }}
            >
              <span style={{ font: "700 11px/1.5 var(--gs-font-mono)", color: "var(--gs-ink)" }}>
                {d}
              </span>
              <span style={{ font: "var(--gs-body-sm)", color: "var(--gs-ink-2)" }}>{t}</span>
            </div>
          ))}
        </div>
      )}
    </ChromeWindow>
  );
}
