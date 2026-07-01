/**
 * <SignalOrganizer> - "Find & engage" section visual.
 *
 * The marketing story in one animated picture. A single comment travels the
 * whole Find -> Engage loop so a visitor can follow exactly what GrowthSync
 * does:
 *
 *   1. COMES IN    - a raw comment lifts off the incoming pile (left)
 *   2. SENT        - it flies through GrowthSync (brand mark + flow arrows)
 *   3. ANALYZED    - the mark pulses; NPS Impact + Loyalty scores compute on it
 *   4. ORGANIZED   - it drops into the live, scored product feed (right)
 *   5. ENGAGED     - GrowthSync auto-replies in your voice; the reply flies
 *                    back out to the customer, closing the loop
 *
 * A queue of upcoming impressions waits on the left; a running feed builds on
 * the right. The travelling chip is one overlay element positioned between
 * three measured anchors (incoming / mark / feed), so the same choreography
 * reads left-to-right on desktop and top-to-bottom on mobile. Motion follows
 * the house idiom (setTimeout tick + IntersectionObserver gate);
 * prefers-reduced-motion renders the final populated feed with no motion.
 */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { GrowthSyncLogo } from "@/components/atoms";
import { ModuleStatusPill, ModuleWindow } from "./ModuleWindow";

/* ---------- data --------------------------------------------------- */

type Platform = "IG" | "TIKTOK";
type EventType = "Comment" | "DM";
type SignalLevel = "Medium" | "High";

interface Impression {
  handle: string;
  initials: string;
  message: string;
  type: EventType;
  platform: Platform;
  nps: number;
  loyalty: number;
  signal: SignalLevel;
  campaign: string;
  reply: string;
}

const IMPRESSIONS: Impression[] = [
  { handle: "@biggest_fan2026", initials: "BI", message: "These look great!", type: "Comment", platform: "IG", nps: 72, loyalty: 75, signal: "Medium", campaign: "Auto-Reply to All Comments", reply: "So glad you love them! 🧡 which colorway's your fave?" },
  { handle: "@kai_o", initials: "KO", message: "this one is hard 🔥 need it", type: "Comment", platform: "TIKTOK", nps: 88, loyalty: 82, signal: "High", campaign: "Hot Leads · DM", reply: "Appreciate you 🙌 dropping you early access now." },
  { handle: "@maya.r", initials: "MR", message: "does the size run small??", type: "Comment", platform: "IG", nps: 61, loyalty: 64, signal: "Medium", campaign: "Sizing Questions", reply: "Runs true to size! size up for a relaxed fit 👍" },
  { handle: "@drops_daily", initials: "DD", message: "when does the restock go live?", type: "Comment", platform: "TIKTOK", nps: 64, loyalty: 69, signal: "High", campaign: "Restock Questions", reply: "Restock lands Tuesday — want me to hold a pair?" },
  { handle: "@ribbed.studio", initials: "RS", message: "any more in cream M?", type: "DM", platform: "IG", nps: 82, loyalty: 80, signal: "High", campaign: "Restock Questions", reply: "Cream M is back in stock — sending the link!" },
  { handle: "@noor.k", initials: "NK", message: "when does early access drop?", type: "Comment", platform: "IG", nps: 79, loyalty: 74, signal: "High", campaign: "Early Access", reply: "Early access opens Friday — you're on the list ✨" },
  { handle: "@vespertine", initials: "VE", message: "tagged you in my pickup ✨", type: "Comment", platform: "IG", nps: 70, loyalty: 91, signal: "Medium", campaign: "UGC · Thank You", reply: "Ahh thank you for the tag! 💛 code THANKYOU for 15%" },
  { handle: "@blvkmilk", initials: "BM", message: "obsessed with the new drop", type: "DM", platform: "TIKTOK", nps: 68, loyalty: 77, signal: "Medium", campaign: "Auto-Reply to All Comments", reply: "So hyped you're into it 🙌 anything you want restocked?" },
  { handle: "@theo.makes", initials: "TM", message: "is the navy coming back?", type: "Comment", platform: "IG", nps: 66, loyalty: 72, signal: "Medium", campaign: "Restock Questions", reply: "Navy's back next week — want a heads up?" },
  { handle: "@sunday.rae", initials: "SR", message: "just ordered two 🙌", type: "Comment", platform: "TIKTOK", nps: 84, loyalty: 88, signal: "High", campaign: "VIP · Thank You", reply: "Two?! you're the best 🙌 enjoy the drop!" },
];
const LEN = IMPRESSIONS.length;

const PLATFORM_GRADIENT: Record<Platform, string> = {
  IG: "linear-gradient(135deg, #FCAF45, #FD1D1D 50%, #833AB4)",
  TIKTOK: "linear-gradient(180deg, #25F4EE, #1A1A1A)",
};
const PLATFORM_LABEL: Record<Platform, string> = { IG: "IG", TIKTOK: "TT" };

const FEED_MAX = 6; // rows kept in the live feed
const VISIBLE_INCOMING = 4; // upcoming raw bubbles shown in the queue

/* the five beats of one comment's Find -> Engage journey (ms) */
type Phase = "in" | "sent" | "analyze" | "organize" | "reply" | "idle";
const T_IN = 650;
const T_SENT = 600;
const T_ANALYZE = 780;
const T_ORGANIZE = 620;
const T_REPLY = 1500; // keep in sync with .gs-so-reply animation duration in global.css
const T_GAP = 360;

const TW = 186; // traveler width
const TH = 88; // traveler height (reserves room for scores so it never jumps)
const RW = 230; // reply width
const RH = 92; // reply height

/* ---------- small hooks -------------------------------------------- */

function useReducedMotion(): boolean {
  const ref = useRef(false);
  if (typeof window !== "undefined" && window.matchMedia) {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 720px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

/* ---------- style atoms -------------------------------------------- */

const mono: CSSProperties = {
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

function Avatar({ initials, size = 24 }: { initials: string; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        flexShrink: 0,
        background: "linear-gradient(180deg, #33333B, var(--gs-ink))",
        color: "var(--gs-bone)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        font: `800 ${Math.round(size * 0.4)}px/1 var(--gs-font-display)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
      }}
    >
      {initials}
    </span>
  );
}

function Pip({ platform, size = 15 }: { platform: Platform; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        flexShrink: 0,
        background: PLATFORM_GRADIENT[platform],
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        font: `800 ${Math.round(size * 0.42)}px/1 var(--gs-font-mono)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
      }}
    >
      {PLATFORM_LABEL[platform]}
    </span>
  );
}

/** Compact scored bar: NPS/LOY label + green fill + number. */
function MiniScore({ label, value, animate }: { label: string; value: number; animate: boolean }) {
  return (
    <div style={{ display: "grid", gap: 3, width: 58 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ ...mono, fontSize: 8, letterSpacing: "0.1em", color: "var(--gs-ink-4)" }}>{label}</span>
        <span
          style={{
            font: "700 12px/1 var(--gs-font-tech)",
            letterSpacing: "0.02em",
            fontFeatureSettings: '"tnum" 1',
            color: "var(--gs-success-ink)",
          }}
        >
          {value}
        </span>
      </div>
      <span style={{ height: 5, borderRadius: 999, background: "rgba(11,11,18,0.06)", overflow: "hidden", display: "block" }}>
        <span
          style={
            {
              display: "block",
              height: "100%",
              width: "100%",
              borderRadius: 999,
              transformOrigin: "left center",
              transform: `scaleX(${Math.max(0, Math.min(100, value)) / 100})`,
              background: "linear-gradient(90deg, var(--gs-success-ink), var(--gs-success))",
              animation: animate ? "gs-so-bar 720ms cubic-bezier(.2,.7,.1,1) both" : undefined,
              "--gs-so-v": `${Math.max(0, Math.min(100, value)) / 100}`,
            } as CSSProperties
          }
        />
      </span>
    </div>
  );
}

/* ---------- raw incoming bubble (the waiting queue) ---------------- */

function RawBubble({ imp, tilt }: { imp: Impression; tilt: number }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 4,
        padding: "8px 10px",
        borderRadius: "var(--gs-r-2)",
        background: "var(--gs-bone)",
        boxShadow: "0 0 0 1px var(--gs-bone-edge), 0 6px 16px -12px rgba(11,11,18,0.35)",
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Pip platform={imp.platform} size={14} />
        <span
          style={{
            font: "700 11px/1 var(--gs-font-display)",
            color: "var(--gs-ink-2)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}
        >
          {imp.handle}
        </span>
        <span style={{ marginLeft: "auto", ...mono, fontSize: 8, color: "var(--gs-ink-4)", flexShrink: 0 }}>{imp.type}</span>
      </div>
      <div
        style={{
          font: "12px/1.3 var(--gs-font-sans)",
          color: "var(--gs-ink-3)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {imp.message}
      </div>
    </div>
  );
}

/* ---------- the travelling comment --------------------------------- */

function Traveler({ imp, phase }: { imp: Impression; phase: Phase }) {
  const scored = phase === "analyze" || phase === "organize";
  return (
    <div
      style={{
        width: TW,
        boxSizing: "border-box",
        padding: "8px 11px",
        display: "grid",
        gap: 6,
        borderRadius: "var(--gs-r-2)",
        background: "var(--gs-bone)",
        boxShadow: "0 0 0 1px var(--gs-bone-edge), 0 16px 30px -12px rgba(11,11,18,0.45), 0 0 0 3px rgba(242,107,31,0.12)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <Pip platform={imp.platform} size={15} />
        <span
          style={{
            font: "700 12px/1 var(--gs-font-display)",
            color: "var(--gs-ink)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}
        >
          {imp.handle}
        </span>
        <span style={{ marginLeft: "auto", ...mono, fontSize: 8, color: "var(--gs-ink-4)", flexShrink: 0 }}>{imp.type}</span>
      </div>
      <div
        style={{
          font: "12px/1.3 var(--gs-font-sans)",
          color: "var(--gs-ink-2)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {imp.message}
      </div>
      <div style={{ display: "flex", gap: 10, opacity: scored ? 1 : 0, transition: "opacity 300ms ease" }}>
        <MiniScore label="NPS" value={imp.nps} animate={false} />
        <MiniScore label="LOY" value={imp.loyalty} animate={false} />
      </div>
    </div>
  );
}

/* ---------- the auto-reply flying back to the customer ------------- */

function ReplyBubble({ imp }: { imp: Impression }) {
  return (
    <div style={{ width: RW, display: "grid", gap: 5, justifyItems: "end" }}>
      <span style={{ ...mono, letterSpacing: "0.1em", color: "var(--gs-tangerine-deep)" }}>
        ↩ Auto-reply · in your voice
      </span>
      <div
        style={{
          maxWidth: "100%",
          padding: "9px 12px",
          borderRadius: "16px 16px 4px 16px",
          background: "linear-gradient(180deg, #FFB37A 0%, #FF7E36 100%)",
          color: "#220A00",
          font: "500 12.5px/1.35 var(--gs-font-sans)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 10px 22px -12px rgba(200,79,14,0.55)",
        }}
      >
        {imp.reply}
      </div>
      <span style={{ ...mono, fontSize: 8, letterSpacing: "0.08em", color: "var(--gs-success-ink)" }}>
        ✓ Sent to {imp.handle} · 42s
      </span>
    </div>
  );
}

/* ---------- one scored feed row ------------------------------------ */

interface FeedRow {
  id: string;
  imp: Impression;
  fresh: boolean;
}

function SignalRow({ row, narrow }: { row: FeedRow; narrow: boolean }) {
  const { imp, fresh } = row;
  const signalColor = imp.signal === "High" ? "var(--gs-success)" : "var(--gs-warning)";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: narrow ? 10 : 14,
        padding: "9px 14px",
        borderBottom: "1px solid var(--gs-bone-edge)",
        animation: fresh ? "gs-crm-row-in 460ms cubic-bezier(.2,.7,.1,1)" : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1, minWidth: 0 }}>
        <span style={{ position: "relative", flexShrink: 0 }}>
          <Avatar initials={imp.initials} size={26} />
          <span style={{ position: "absolute", right: -3, bottom: -3 }}>
            <Pip platform={imp.platform} size={13} />
          </span>
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              font: "700 12.5px/1.15 var(--gs-font-display)",
              color: "var(--gs-ink)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {imp.handle}
          </div>
          <div
            style={{
              font: "12px/1.25 var(--gs-font-sans)",
              color: "var(--gs-ink-3)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginTop: 1,
            }}
          >
            {imp.message}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <MiniScore label="NPS" value={imp.nps} animate={fresh} />
        <MiniScore label="LOY" value={imp.loyalty} animate={fresh} />
      </div>

      {!narrow && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, width: 214 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, width: 74 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: signalColor, boxShadow: `0 0 6px ${signalColor}`, flexShrink: 0 }} />
            <span style={{ ...mono, letterSpacing: "0.08em" }}>{imp.signal}</span>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              flex: 1,
              minWidth: 0,
              padding: "4px 9px",
              borderRadius: 999,
              boxShadow: "inset 0 0 0 1px rgba(200,79,14,0.25)",
              background: "rgba(242,107,31,0.06)",
            }}
            title={imp.campaign}
          >
            <span style={{ color: "var(--gs-tangerine-deep)", flexShrink: 0 }}>↪</span>
            <span
              style={{
                font: "600 10.5px/1.2 var(--gs-font-sans)",
                color: "var(--gs-link)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {imp.campaign}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------- the GrowthSync pass-through mark ------------------------ */

function GsMark({ pulseKey, analyzing, size }: { pulseKey: number; analyzing: boolean; size: number }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size,
        transform: analyzing ? "scale(1.1)" : "scale(1)",
        transition: "transform 380ms cubic-bezier(.2,.7,.1,1)",
      }}
    >
      <GrowthSyncLogo variant="icon" height={size} />
      <span key={pulseKey} className={pulseKey > 0 ? "gs-so-ring" : undefined} style={{ position: "absolute", inset: 0, borderRadius: 999 }} />
    </span>
  );
}

function FlowArrows({ size = 15 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "var(--gs-tangerine)", font: `800 ${size}px/1 var(--gs-font-sans)` }} aria-hidden>
      <span className="gs-so-flow" style={{ animationDelay: "0ms" }}>›</span>
      <span className="gs-so-flow" style={{ animationDelay: "150ms" }}>›</span>
      <span className="gs-so-flow" style={{ animationDelay: "300ms" }}>›</span>
    </span>
  );
}

/* ---------- incoming queue ----------------------------------------- */

const TILTS = [1.2, -0.8, 1.6, -1.3, 0.7];

function IncomingLane({
  pile,
  weekCount,
  inRef,
  narrow,
}: {
  pile: Impression[];
  weekCount: number;
  inRef: React.RefObject<HTMLDivElement | null>;
  narrow: boolean;
}) {
  return (
    <div style={{ display: "grid", gap: narrow ? 10 : 14, alignContent: "start" }}>
      <div style={{ display: "grid", gap: 6 }}>
        <span style={{ ...mono, letterSpacing: "0.14em" }}>Every impression · 24/7</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              font: "800 30px/1 var(--gs-font-display)",
              letterSpacing: "-0.02em",
              color: "var(--gs-ink)",
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            {weekCount.toLocaleString("en-US")}
          </span>
          <span style={{ font: "12px/1.2 var(--gs-font-sans)", color: "var(--gs-ink-3)" }}>this week</span>
        </div>
        <span style={{ ...mono, fontSize: 8.5, letterSpacing: "0.14em", color: "var(--gs-ink-4)" }}>Comments · DMs · Mentions</span>
      </div>

      <div style={{ position: "relative", display: "grid", gap: 8 }}>
        <div ref={inRef} style={{ position: "absolute", top: -4, left: 0, right: 0, height: 0 }} />
        {pile.map((imp, i) => (
          <div key={`${imp.handle}-${i}`} style={{ opacity: 1 - i * 0.16 }}>
            <RawBubble imp={imp} tilt={narrow ? 0 : TILTS[i % TILTS.length]} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- the product feed window -------------------------------- */

function FeedWindow({
  rows,
  newCount,
  totalProfiles,
  feedRef,
  narrow,
}: {
  rows: FeedRow[];
  newCount: number;
  totalProfiles: number;
  feedRef: React.RefObject<HTMLDivElement | null>;
  narrow: boolean;
}) {
  return (
    <div style={{ position: "relative" }}>
      <div ref={feedRef} style={{ position: "absolute", top: narrow ? 118 : 130, left: 24, width: 0, height: 0, zIndex: 0 }} />
      <ModuleWindow
        frame="console"
        title="growthsync · signals"
        eyebrow="LIVE FEED · ORGANIZED & SCORED"
        status={<ModuleStatusPill>{`LIVE · ${newCount} NEW`}</ModuleStatusPill>}
        style={{ maxWidth: "none" }}
      >
        {!narrow && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "8px 14px",
              borderBottom: "1px solid var(--gs-bone-edge)",
              background: "var(--gs-paper-cool)",
            }}
          >
            <span style={{ ...mono, flex: 1 }}>Customer · Message</span>
            <span style={{ ...mono, width: 58 }}>NPS</span>
            <span style={{ ...mono, width: 58 }}>Loyalty</span>
            <span style={{ ...mono, width: 214 }}>Signal · Routed to</span>
          </div>
        )}

        <div style={{ position: "relative", overflow: "hidden" }}>
          {rows.map((row) => (
            <SignalRow key={row.id} row={row} narrow={narrow} />
          ))}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 44,
              pointerEvents: "none",
              background: "linear-gradient(180deg, rgba(251,251,249,0), var(--gs-bone) 88%)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
            padding: "11px 14px",
            borderTop: "1px solid var(--gs-bone-edge)",
            background: "var(--gs-paper-cool)",
          }}
        >
          <FooterStat value={totalProfiles.toLocaleString("en-US")} label="profiles built" />
          <FooterStat value="98%" label="auto-handled" />
          <FooterStat value="42s" label="median reply" />
        </div>
      </ModuleWindow>
    </div>
  );
}

function FooterStat({ value, label }: { value: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
      <span style={{ font: "800 14px/1 var(--gs-font-display)", color: "var(--gs-ink)", fontFeatureSettings: '"tnum" 1' }}>{value}</span>
      <span style={{ ...mono, fontSize: 8.5, letterSpacing: "0.1em", color: "var(--gs-ink-4)" }}>{label}</span>
    </span>
  );
}

/* ---------- the section component ---------------------------------- */

let uid = 0;
const nextId = () => `so-${uid++}`;

interface Anchor {
  x: number;
  y: number;
}

export function SignalOrganizer() {
  const reduced = useReducedMotion();
  const narrow = useIsNarrow();

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const inRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const seedFeed = (): FeedRow[] => {
    const n = reduced ? FEED_MAX - 1 : 3;
    const out: FeedRow[] = [];
    for (let i = 0; i < n; i++) {
      out.push({ id: nextId(), imp: IMPRESSIONS[(LEN - 1 - i + LEN) % LEN], fresh: false });
    }
    return out;
  };

  const [head, setHead] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [feed, setFeed] = useState<FeedRow[]>(seedFeed);
  const [newCount, setNewCount] = useState(reduced ? 12 : 3);
  const [weekCount, setWeekCount] = useState(2481);
  const [profiles, setProfiles] = useState(1204);
  const [pulseKey, setPulseKey] = useState(0);
  const [anchors, setAnchors] = useState<{ in: Anchor; mark: Anchor; feed: Anchor } | null>(null);

  // measure the three anchor points relative to the stage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      const s = stageRef.current?.getBoundingClientRect();
      if (!s || !inRef.current || !markRef.current || !feedRef.current) return;
      const center = (el: HTMLElement): Anchor => {
        const r = el.getBoundingClientRect();
        return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
      };
      setAnchors({ in: center(inRef.current), mark: center(markRef.current), feed: center(feedRef.current) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [narrow]);

  // the Find -> Engage journey loop
  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    let cancelled = false;
    let timer: number | undefined;
    let visible = true;
    let h = 0;
    const node = wrapRef.current;
    let observer: IntersectionObserver | undefined;

    const at = (fn: () => void, ms: number) => {
      timer = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const runComment = () => {
      if (cancelled) return;
      if (!visible) {
        timer = window.setTimeout(runComment, 300);
        return;
      }
      setHead(h);
      setPhase("in");
      at(() => {
        setPhase("sent");
        at(() => {
          setPhase("analyze");
          setPulseKey((k) => k + 1);
          at(() => {
            setPhase("organize");
            const imp = IMPRESSIONS[h % LEN];
            setFeed((prev) => [{ id: nextId(), imp, fresh: true }, ...prev.map((r) => ({ ...r, fresh: false }))].slice(0, FEED_MAX));
            setNewCount((n) => (n >= 99 ? 1 : n + 1));
            setWeekCount((n) => n + 1 + (h % 3));
            setProfiles((n) => (imp.type === "DM" || h % 2 === 0 ? n + 1 : n));
            at(() => {
              setPhase("reply");
              at(() => {
                setPhase("idle");
                h = (h + 1) % LEN;
                at(runComment, T_GAP);
              }, T_REPLY);
            }, T_ORGANIZE);
          }, T_ANALYZE);
        }, T_SENT);
      }, T_IN);
    };

    if (node && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) visible = e.isIntersecting;
        },
        { threshold: 0.15 }
      );
      observer.observe(node);
    }
    timer = window.setTimeout(runComment, 800);

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      if (observer && node) observer.unobserve(node);
    };
  }, [reduced]);

  const activeImp = IMPRESSIONS[head % LEN];
  const pile = Array.from({ length: VISIBLE_INCOMING }, (_, i) => IMPRESSIONS[(head + 1 + i) % LEN]);

  const travelTarget: Anchor | null = !anchors
    ? null
    : phase === "sent" || phase === "analyze"
    ? anchors.mark
    : phase === "organize"
    ? anchors.feed
    : anchors.in;

  const showTraveler = !reduced && anchors && travelTarget && (phase === "in" || phase === "sent" || phase === "analyze" || phase === "organize");
  const showReply = !reduced && anchors && phase === "reply";
  const analyzing = phase === "analyze";

  const centerColumn = (markSize: number) => (
    <div style={{ display: "grid", justifyItems: "center", gap: 8 }}>
      <span ref={markRef} style={{ display: "inline-flex" }}>
        <GsMark pulseKey={pulseKey} analyzing={analyzing} size={markSize} />
      </span>
      <FlowArrows />
    </div>
  );

  const stageInner = (
    <>
      {narrow ? (
        <div style={{ display: "grid", gap: 16 }}>
          <IncomingLane pile={pile.slice(0, 3)} weekCount={weekCount} inRef={inRef} narrow />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span ref={markRef} style={{ display: "inline-flex" }}>
              <GsMark pulseKey={pulseKey} analyzing={analyzing} size={26} />
            </span>
            <span style={{ ...mono, letterSpacing: "0.14em", color: "var(--gs-tangerine-deep)" }}>Through GrowthSync</span>
            <FlowArrows />
          </div>
          <FeedWindow rows={feed} newCount={newCount} totalProfiles={profiles} feedRef={feedRef} narrow />
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(200px, 0.8fr) 108px minmax(430px, 1.7fr)",
            alignItems: "center",
            gap: 8,
          }}
        >
          <IncomingLane pile={pile} weekCount={weekCount} inRef={inRef} narrow={false} />
          {centerColumn(40)}
          <FeedWindow rows={feed} newCount={newCount} totalProfiles={profiles} feedRef={feedRef} narrow={false} />
        </div>
      )}

      {/* the travelling comment overlay */}
      {showTraveler && travelTarget && (
        <div
          key={`t-${head}`}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: TW,
            zIndex: 6,
            pointerEvents: "none",
            transform: `translate(${travelTarget.x - TW / 2}px, ${travelTarget.y - TH / 2}px) scale(${phase === "organize" ? 0.92 : 1})`,
            opacity: phase === "organize" ? 0 : 1,
            transition: "transform 640ms cubic-bezier(.2,.7,.1,1), opacity 520ms ease",
          }}
        >
          <Traveler imp={activeImp} phase={phase} />
        </div>
      )}

      {/* the auto-reply generated on the record and sent back to the customer */}
      {showReply && anchors && (
        <div
          key={`r-${head}`}
          className="gs-so-reply"
          style={{
            position: "absolute",
            left: anchors.feed.x - RW / 2,
            top: anchors.feed.y - RH / 2,
            width: RW,
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <ReplyBubble imp={activeImp} />
        </div>
      )}
    </>
  );

  return (
    <div ref={wrapRef} style={{ marginTop: 40, textAlign: "left" }}>
      <div ref={stageRef} style={{ position: "relative" }} aria-hidden>
        {stageInner}
      </div>

      <p
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        GrowthSync captures every comment and DM across TikTok and Instagram, scores each one with
        an NPS Impact and Loyalty score, organizes them into a live feed, and auto-replies to the
        customer in your brand voice.
      </p>
    </div>
  );
}
