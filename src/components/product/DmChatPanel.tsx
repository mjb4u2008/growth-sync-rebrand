/**
 * <DmChatPanel> - windowed DM conversation. Pass messages as an array of
 * { who: "us" | "them", text }. Optional `footer` slot for the input row,
 * status badge, etc.
 */

import { ChatBubble, ChromeWindow } from "@/components/atoms";
import type { DmChatPanelProps } from "@/lib/types";

export function DmChatPanel({
  title = "conversation · brand voice on",
  messages,
  footer,
  style,
}: DmChatPanelProps) {
  return (
    <ChromeWindow title={title} style={style}>
      <div style={{ padding: "14px 16px 16px" }}>
        {messages.map((m, i) => (
          <ChatBubble key={`${m.who}-${i}`} who={m.who}>
            {m.text}
          </ChatBubble>
        ))}
        {footer && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
            {footer}
          </div>
        )}
      </div>
    </ChromeWindow>
  );
}
