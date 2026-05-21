/**
 * <HeroConsoleWindow> — coded recreation of the real GrowthSync dashboard
 * for the hero peek. Structure: full app shell (sidebar + main) showing
 * Campaigns / Shirt Drop · Activity tab, with an activity list, an open
 * conversation, and a "review before sending" composer.
 *
 * Information architecture mirrors the live product screenshot at
 * reference/hero-real-dashboard-reference-2026-05-20.jpeg, restyled
 * onto the marketing site's cream / Y2K-aqua / tangerine palette.
 *
 * The brand strip below the hero clips the bottom of this window so
 * it "peeks" — see .gs-hero-console-shell in global.css.
 */

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/atoms";

type RowState = "pending" | "sent";

interface ActivityRow {
  initials: string;
  color: string;
  handle: string;
  badge?: number;
  snippet: string;
  state: RowState;
  time: string;
  selected?: boolean;
}

const ROWS: ActivityRow[] = [
  {
    initials: "KI", color: "var(--gs-lilac)",
    handle: "@kickflip_kai", badge: 2,
    snippet: "Do you have this in 8.5 wide? I ska…",
    state: "pending", time: "3 minutes ago",
    selected: true,
  },
  {
    initials: "PA", color: "var(--gs-coral)",
    handle: "@park_rat_mike",
    snippet: "what's the concave like? deep or …",
    state: "pending", time: "about 2 hours ago",
  },
  {
    initials: "SK", color: "var(--gs-rose)",
    handle: "@skate_content_claire",
    snippet: "obsessed with this graphic, who di…",
    state: "pending", time: "about 3 hours ago",
  },
  {
    initials: "SH", color: "var(--gs-butter)",
    handle: "@shred_alex",
    snippet: "do you ship to Australia? need thi…",
    state: "sent", time: "about 4 hours ago",
  },
  {
    initials: "FL", color: "var(--gs-mint)",
    handle: "@flow_rider_p",
    snippet: "just got two 👍👍",
    state: "sent", time: "about 5 hours ago",
  },
  {
    initials: "SE", color: "var(--gs-sky)",
    handle: "@session_hunter",
    snippet: "what time does the jam start? nee…",
    state: "pending", time: "about 6 hours ago",
  },
  {
    initials: "AN", color: "var(--gs-coral)",
    handle: "@angry_skater99",
    snippet: "My deck snapped on the first day …",
    state: "pending", time: "about 7 hours ago",
  },
];

/* ---------- root + chrome ---------- */

const root: CSSProperties = {
  position: "relative",
  width: "100%",
  borderRadius: 16,
  background: "var(--gs-bone)",
  overflow: "hidden",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 1px var(--gs-chrome-edge), 0 30px 60px -22px rgba(11,11,18,0.32), 0 60px 120px -60px rgba(11,11,18,0.35)",
};

const titlebar: CSSProperties = {
  height: 28,
  display: "grid",
  gridTemplateColumns: "76px minmax(0, 1fr) 76px",
  alignItems: "center",
  padding: "0 12px",
  background: "linear-gradient(180deg, #ECE5D0, #C9C0A6)",
  borderBottom: "1px solid #8E8A7E",
};

const trafficLight = (bg: string): CSSProperties => ({
  width: 11, height: 11, borderRadius: 999, background: bg,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 0.5px rgba(0,0,0,0.25)",
});

const urlBar: CSSProperties = {
  justifySelf: "center",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  minWidth: 0,
  maxWidth: "100%",
  overflow: "hidden",
  padding: "3px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.55)",
  boxShadow: "inset 0 0 0 1px rgba(11,11,18,0.10)",
  font: "var(--gs-mono-sm)",
  color: "var(--gs-ink-3)",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap",
};

/* ---------- shell ---------- */

const shell: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "212px 1fr",
  minHeight: 560,
};

/* ---------- sidebar ---------- */

const sidebar: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  background: "var(--gs-paper)",
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0) 30%)",
  borderRight: "1px solid var(--gs-bone-edge)",
  padding: "16px 12px 12px",
  gap: 14,
};

const sidebarLogo: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "0 4px 6px",
};

const sidebarLogoMark: CSSProperties = {
  width: 22, height: 22, borderRadius: 999,
  background:
    "radial-gradient(circle at 32% 28%, #FFC79A 0%, #FF8847 35%, #E04F0A 75%, #9A3000 100%)",
  boxShadow:
    "0 1px 0 rgba(255,255,255,0.45) inset, 0 -1px 0 rgba(0,0,0,0.2) inset, 0 3px 6px -2px rgba(224,79,10,0.55)",
};

const sidebarLogoWord: CSSProperties = {
  font: "800 15px/1 var(--gs-font-display)",
  letterSpacing: "0",
  color: "var(--gs-ink)",
};

const sidebarGroupLabel: CSSProperties = {
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
  padding: "8px 8px 4px",
};

const navItem = (active?: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 10px",
  borderRadius: 10,
  font: "600 13px/1 var(--gs-font-sans)",
  letterSpacing: "0",
  color: active ? "#fff" : "var(--gs-ink-2)",
  background: active
    ? "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))"
    : "transparent",
  boxShadow: active
    ? "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.18), 0 6px 14px -8px rgba(224,79,10,0.55)"
    : "none",
  cursor: "default",
});

const navIcon: CSSProperties = {
  width: 16, height: 16, display: "inline-flex",
  alignItems: "center", justifyContent: "center", flexShrink: 0,
  opacity: 0.95,
};

const inboundBadge: CSSProperties = {
  marginLeft: "auto",
  minWidth: 18, height: 18, padding: "0 5px",
  borderRadius: 999,
  background: "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))",
  color: "#fff",
  font: "800 10px/18px var(--gs-font-sans)",
  textAlign: "center",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
};

const sidebarUser: CSSProperties = {
  marginTop: "auto",
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 10px",
  borderTop: "1px solid var(--gs-bone-edge)",
};

/* ---------- main column ---------- */

const main: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  background: "var(--gs-bone)",
  minWidth: 0,
};

const breadcrumb: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "14px 22px 0",
  font: "var(--gs-body-sm)",
  color: "var(--gs-ink-3)",
};

const titleRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 12,
  alignItems: "center",
  padding: "10px 22px 6px",
};

const targetIcon: CSSProperties = {
  width: 36, height: 36,
  borderRadius: 10,
  background: "var(--gs-paper)",
  display: "flex", alignItems: "center", justifyContent: "center",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
};

const title: CSSProperties = {
  font: "800 22px/1.15 var(--gs-font-display)",
  letterSpacing: "0",
  color: "var(--gs-ink)",
  margin: 0,
};

const statusRow: CSSProperties = {
  display: "flex", alignItems: "center", gap: 10, marginTop: 4,
};

const statusPill: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "3px 8px 3px 7px",
  borderRadius: 999,
  background: "var(--gs-paper-cool)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  font: "600 11px/1 var(--gs-font-sans)",
  color: "var(--gs-ink-2)",
};

const tabs: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 22,
  padding: "8px 22px 0",
  borderBottom: "1px solid var(--gs-bone-edge)",
};

const tab = (active: boolean): CSSProperties => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 0 12px",
  font: "600 13px/1 var(--gs-font-sans)",
  color: active ? "var(--gs-ink)" : "var(--gs-ink-3)",
  cursor: "default",
  borderBottom: active ? "2px solid var(--gs-ink)" : "2px solid transparent",
});

const tabBadge: CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  minWidth: 22, height: 17, padding: "0 6px",
  borderRadius: 999,
  background: "var(--gs-paper-cool)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  font: "700 10px/1 var(--gs-font-mono)",
  letterSpacing: "0.04em",
  color: "var(--gs-ink-2)",
};

/* ---------- workspace ---------- */

const workspace: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  flex: 1,
  minHeight: 0,
};

const listCol: CSSProperties = {
  borderRight: "1px solid var(--gs-bone-edge)",
  display: "flex", flexDirection: "column",
  minWidth: 0,
};

const filterBar: CSSProperties = {
  display: "flex", alignItems: "center", gap: 4,
  padding: "12px 14px 8px",
};

const filterPill = (active: boolean): CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: 5,
  padding: "5px 10px",
  borderRadius: 999,
  font: "600 11px/1 var(--gs-font-sans)",
  color: active ? "var(--gs-ink)" : "var(--gs-ink-3)",
  background: active ? "var(--gs-paper-cool)" : "transparent",
  boxShadow: active ? "inset 0 0 0 1px var(--gs-bone-edge)" : "none",
  cursor: "default",
});

const searchWrap: CSSProperties = {
  display: "flex", alignItems: "center", gap: 8,
  margin: "2px 14px 8px",
  padding: "8px 10px",
  borderRadius: 8,
  background: "var(--gs-paper-cool)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  font: "var(--gs-body-sm)",
  color: "var(--gs-ink-4)",
};

const listScroll: CSSProperties = {
  overflow: "hidden", flex: 1,
};

const listRow = (selected?: boolean): CSSProperties => ({
  display: "grid",
  gridTemplateColumns: "34px 1fr auto",
  gap: 10,
  alignItems: "flex-start",
  padding: "10px 14px",
  background: selected
    ? "linear-gradient(180deg, rgba(151,196,219,0.22), rgba(151,196,219,0.12))"
    : "transparent",
  boxShadow: selected
    ? "inset 0 0 0 1px rgba(70,130,170,0.18)"
    : "none",
  borderRadius: 8,
  margin: "0 8px",
  position: "relative",
});

const handleRow: CSSProperties = {
  display: "flex", alignItems: "center", gap: 6,
  font: "700 13px/1.1 var(--gs-font-sans)",
  color: "var(--gs-ink)",
};

const handleBadge: CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  minWidth: 16, height: 16, padding: "0 5px",
  borderRadius: 999,
  background: "var(--gs-paper-cool)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  font: "700 9px/1 var(--gs-font-mono)",
  color: "var(--gs-ink-2)",
};

const snippet: CSSProperties = {
  font: "13px/1.35 var(--gs-font-sans)",
  color: "var(--gs-ink-2)",
  marginTop: 3,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100%",
};

const stateRow: CSSProperties = {
  display: "flex", alignItems: "center", gap: 8,
  marginTop: 6,
};

const statePill = (state: RowState): CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: 5,
  padding: "2px 7px",
  borderRadius: 999,
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background: state === "pending"
    ? "rgba(201,138,26,0.12)"
    : "rgba(30,142,62,0.14)",
  color: state === "pending" ? "#8A5C00" : "#1E6B33",
  boxShadow: state === "pending"
    ? "inset 0 0 0 1px rgba(201,138,26,0.28)"
    : "inset 0 0 0 1px rgba(30,142,62,0.28)",
});

const stateDot = (state: RowState): CSSProperties => ({
  width: 5, height: 5, borderRadius: 999,
  background: state === "pending" ? "#C98A1A" : "#1E8E3E",
});

const rowTime: CSSProperties = {
  font: "var(--gs-body-sm)",
  color: "var(--gs-ink-3)",
};

/* ---------- conversation ---------- */

const convo: CSSProperties = {
  display: "flex", flexDirection: "column",
  minWidth: 0,
};

const convoHeader: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  padding: "12px 22px",
  borderBottom: "1px solid var(--gs-bone-edge)",
};

const convoHandle: CSSProperties = {
  font: "700 14px/1.1 var(--gs-font-sans)",
  color: "var(--gs-ink)",
};

const convoControls: CSSProperties = {
  display: "flex", alignItems: "center", gap: 12,
  font: "var(--gs-body-sm)",
  color: "var(--gs-ink-3)",
};

const detailsBtn: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "5px 10px",
  borderRadius: 8,
  background: "var(--gs-paper-cool)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  font: "600 11px/1 var(--gs-font-sans)",
  color: "var(--gs-ink-2)",
};

const convoStream: CSSProperties = {
  padding: "18px 28px 14px",
  display: "flex", flexDirection: "column", gap: 10,
  flex: 1, minHeight: 0,
  overflow: "hidden",
};

const dateStamp: CSSProperties = {
  alignSelf: "center",
  font: "var(--gs-mono-sm)",
  color: "var(--gs-ink-3)",
  letterSpacing: "0.04em",
  margin: "2px 0 4px",
};

const commentMeta: CSSProperties = {
  font: "var(--gs-body-sm)",
  color: "var(--gs-ink-3)",
};

const commentBubble: CSSProperties = {
  alignSelf: "flex-start",
  maxWidth: "78%",
  padding: "9px 13px",
  borderRadius: 14,
  borderTopLeftRadius: 4,
  background: "var(--gs-paper-cool)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  font: "14px/1.4 var(--gs-font-sans)",
  color: "var(--gs-ink)",
};

const commentTime: CSSProperties = {
  font: "var(--gs-mono-sm)",
  color: "var(--gs-ink-3)",
  letterSpacing: "0.04em",
};

const sentTag: CSSProperties = {
  alignSelf: "flex-end",
  display: "inline-flex", alignItems: "center", gap: 6,
  font: "var(--gs-body-sm)",
  color: "var(--gs-ink-3)",
};

const sentDmPill: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 4,
  padding: "2px 7px",
  borderRadius: 999,
  background: "var(--gs-paper-cool)",
  boxShadow: "inset 0 0 0 1px var(--gs-bone-edge)",
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.08em",
  color: "var(--gs-ink-2)",
};

const dmPanel: CSSProperties = {
  alignSelf: "stretch",
  borderRadius: 12,
  background: "rgba(151,196,219,0.10)",
  boxShadow: "inset 0 0 0 1px rgba(70,130,170,0.18)",
  padding: 0,
  overflow: "hidden",
};

const dmHeader: CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "8px 12px",
  background: "rgba(151,196,219,0.18)",
  borderBottom: "1px solid rgba(70,130,170,0.18)",
  font: "700 10px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: "var(--gs-ink-2)",
};

const dmBody: CSSProperties = {
  padding: "10px 14px",
  font: "14px/1.45 var(--gs-font-sans)",
  color: "var(--gs-ink)",
};

/* ---------- composer ---------- */

const composer: CSSProperties = {
  margin: "10px 22px 18px",
  borderRadius: 12,
  background: "var(--gs-bone)",
  boxShadow: "0 0 0 1px var(--gs-bone-edge), 0 10px 26px -22px rgba(11,11,18,0.35)",
  overflow: "hidden",
};

const composerHeader: CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "9px 14px",
  background: "rgba(151,196,219,0.14)",
  borderBottom: "1px solid var(--gs-bone-edge)",
  font: "700 10px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: "var(--gs-ink-2)",
};

const composerBody: CSSProperties = {
  padding: "12px 14px 10px",
  font: "14px/1.5 var(--gs-font-sans)",
  color: "var(--gs-ink)",
};

const composerActions: CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12,
  padding: "8px 12px 12px",
};

const ghostBtn: CSSProperties = {
  font: "600 12px/1 var(--gs-font-sans)",
  color: "var(--gs-ink-3)",
  background: "transparent",
  padding: "8px 10px",
  cursor: "default",
};

const sendBtn: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "8px 12px",
  borderRadius: 8,
  background: "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))",
  color: "#fff",
  font: "700 12px/1 var(--gs-font-sans)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.18), 0 6px 14px -6px rgba(224,79,10,0.55)",
  cursor: "default",
};

/* ---------- tiny inline icons (currentColor) ---------- */

function IconHome() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M3 11L12 4l9 7v8a2 2 0 0 1-2 2h-3v-6h-8v6H5a2 2 0 0 1-2-2v-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconCampaign() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
function IconInbound() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconPlug() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 17v4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconChevron({ left }: { left?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transform: left ? "rotate(180deg)" : "none" }}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCaret() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPaperPlane() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l18-8-8 18-2-8-8-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconDetails() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 5v14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/* ---------- component ---------- */

export function HeroConsoleWindow() {
  // Subtle product motion: tick the composer caret + occasionally flip
  // the most-recent pending row in the list to "sent" and back.
  const [caretOn, setCaretOn] = useState(true);
  const [shippedFlash, setShippedFlash] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCaretOn((v) => !v), 540);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let alive = true;
    const loop = async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 4800));
        if (!alive) return;
        setShippedFlash(true);
        await new Promise((r) => setTimeout(r, 1400));
        if (!alive) return;
        setShippedFlash(false);
      }
    };
    loop();
    return () => { alive = false; };
  }, []);

  return (
    <div style={root}>
      {/* Y2K-Aqua chrome strip */}
      <div className="gs-console-titlebar" style={titlebar}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={trafficLight("var(--gs-tl-red)")} />
          <span style={trafficLight("var(--gs-tl-yel)")} />
          <span style={trafficLight("var(--gs-tl-grn)")} />
        </div>
        <div className="gs-console-urlbar" style={urlBar}>
          <span className="gs-console-urlmark" style={{ opacity: 0.55, flexShrink: 0 }}>◇</span>
          <span
            className="gs-console-urltext"
            style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            app.growthsync.io/campaigns/shirt-drop/activity
          </span>
        </div>
        <div />
      </div>

      <div className="gs-console-body" style={shell}>
        {/* ---------- SIDEBAR ---------- */}
        <aside className="gs-console-sidebar" style={sidebar}>
          <div style={sidebarLogo}>
            <span style={sidebarLogoMark} />
            <span style={sidebarLogoWord}>GrowthSync</span>
          </div>

          <div>
            <div style={sidebarGroupLabel}>Workspace</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={navItem(false)}>
                <span style={navIcon}><IconHome /></span> Home
              </div>
              <div style={navItem(true)}>
                <span style={navIcon}><IconCampaign /></span> Campaigns
              </div>
              <div style={navItem(false)}>
                <span style={navIcon}><IconInbound /></span> Inbound
                <span style={inboundBadge}>4</span>
              </div>
            </div>
          </div>

          <div>
            <div style={sidebarGroupLabel}>Account</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={navItem(false)}>
                <span style={navIcon}><IconPlug /></span> Signal setup
              </div>
              <div style={navItem(false)}>
                <span style={navIcon}><IconGear /></span> Settings
              </div>
            </div>
          </div>

          <div style={sidebarUser}>
            <Avatar initials="TA" bg="var(--gs-mint)" size={28} />
            <div style={{ minWidth: 0, lineHeight: 1.1 }}>
              <div style={{ font: "700 12px/1.1 var(--gs-font-sans)", color: "var(--gs-ink)" }}>
                Tanner Siciliano
              </div>
              <div style={{ font: "11px/1.1 var(--gs-font-sans)", color: "var(--gs-ink-3)", marginTop: 2 }}>
                Launch workspace
              </div>
            </div>
            <span style={{ marginLeft: "auto", color: "var(--gs-ink-3)" }}><IconCaret /></span>
          </div>
        </aside>

        {/* ---------- MAIN ---------- */}
        <section style={main}>
          <div style={breadcrumb}>
            <span>Campaigns</span>
            <span style={{ color: "var(--gs-ink-4)" }}>/</span>
            <span style={{ color: "var(--gs-ink)" }}>Shirt Drop</span>
          </div>

          <div style={titleRow}>
            <div style={targetIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="var(--gs-ink-2)" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="5" stroke="var(--gs-ink-2)" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="1.6" fill="var(--gs-tangerine)" />
              </svg>
            </div>
            <div>
              <h2 style={title}>Shirt Drop</h2>
              <div style={statusRow}>
                <span style={statusPill}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--gs-success)" }} />
                  Active
                  <span style={{ color: "var(--gs-ink-3)" }}><IconCaret /></span>
                </span>
                <span style={{ font: "var(--gs-body-sm)", color: "var(--gs-ink-3)" }}>5d ago</span>
              </div>
            </div>
          </div>

          <div style={tabs}>
            <span style={tab(false)}>Configuration</span>
            <span style={tab(true)}>
              Activity <span style={tabBadge}>9+</span>
            </span>
          </div>

          <div className="gs-console-workspace" style={workspace}>
            {/* ----- list ----- */}
            <div style={listCol}>
              <div style={filterBar}>
                <span style={filterPill(true)}>All</span>
                <span style={filterPill(false)}>
                  Pending <span style={{ color: "var(--gs-ink-4)" }}>4</span>
                </span>
                <span style={filterPill(false)}>Sent</span>
                <span style={filterPill(false)}>Failed</span>
              </div>
              <div style={searchWrap}>
                <span style={{ color: "var(--gs-ink-3)" }}><IconSearch /></span>
                <span>Search activity…</span>
              </div>
              <div style={listScroll}>
                {ROWS.map((r, i) => {
                  // Subtle motion: row 3 flips pending→sent during the flash window.
                  const state: RowState =
                    shippedFlash && i === 3 ? "sent" : r.state;
                  return (
                    <div key={r.handle} style={listRow(r.selected)}>
                      <Avatar initials={r.initials} bg={r.color} size={30} />
                      <div style={{ minWidth: 0 }}>
                        <div style={handleRow}>
                          <span>{r.handle}</span>
                          {r.badge && <span style={handleBadge}>{r.badge}</span>}
                        </div>
                        <div style={snippet}>{r.snippet}</div>
                        <div style={stateRow}>
                          <span style={statePill(state)}>
                            <span style={stateDot(state)} />
                            {state}
                          </span>
                          <span style={rowTime}>{r.time}</span>
                        </div>
                      </div>
                      <span />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ----- conversation ----- */}
            <div style={convo}>
              <div style={convoHeader}>
                <div style={convoHandle}>@kickflip_kai</div>
                <div style={convoControls}>
                  <span>1 of 4</span>
                  <span style={{ display: "inline-flex", gap: 6, color: "var(--gs-ink-3)" }}>
                    <IconChevron left /> <IconChevron />
                  </span>
                  <span style={detailsBtn}>
                    <IconDetails /> Details
                  </span>
                </div>
              </div>

              <div style={convoStream}>
                <div style={dateStamp}>May 20, 11:40 AM</div>

                <div style={commentMeta}>@kickflip_kai commented</div>
                <div style={commentBubble}>
                  been waiting for this shape to come back 🔥
                </div>
                <div style={commentTime}>May 20, 2026 · 11:40 AM</div>

                <div style={sentTag}>
                  Sent <span style={sentDmPill}>🔒 DM</span>
                </div>

                <div style={dmPanel}>
                  <div style={dmHeader}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <IconPaperPlane /> Direct Message
                    </span>
                    <span style={{ color: "var(--gs-ink-3)" }}>@kickflip_kai</span>
                  </div>
                  <div style={dmBody}>
                    We heard you all asking for the popsicle shape — it's back and better. Stoked you're hyped 👍
                  </div>
                </div>
                <div style={{ ...commentTime, alignSelf: "flex-end" }}>May 20, 2026 · 12:40 PM</div>
              </div>

              {/* ----- composer ----- */}
              <div style={composer}>
                <div style={composerHeader}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <IconPencil /> Review before sending
                  </span>
                  <span style={{ color: "var(--gs-ink-3)" }}>118 / 1000</span>
                </div>
                <div style={composerBody}>
                  Yo Kai! We do 8.25 and 8.5 — the 8.5 is perfect for transition. Grab it before the run sells out.
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                      width: 1.5,
                      height: 14,
                      marginLeft: 2,
                      verticalAlign: "-2px",
                      background: "var(--gs-ink)",
                      opacity: caretOn ? 1 : 0,
                      transition: "opacity 120ms linear",
                    }}
                  />
                </div>
                <div style={composerActions}>
                  <span style={ghostBtn}>Discard</span>
                  <span style={sendBtn}>
                    <IconPaperPlane /> Send DM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
