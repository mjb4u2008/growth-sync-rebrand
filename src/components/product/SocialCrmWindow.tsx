/**
 * <SocialCrmWindow> - Module 03 · CRM
 *
 * One person, one CRM. Maya R.'s profile sits at the top. Two stat
 * cards - GMV · 90D and CONVOS - sit above a full-width INTENT bar.
 * Below them, an interactions feed renders as a fixed-height
 * notifications stack: new events drop in at the top, the oldest
 * fades out at the bottom, the stack always holds four rows. When
 * a purchase event arrives, GMV rolls up, Intent lifts, the cards
 * pulse, and a brief confetti burst plays inside the chrome.
 *
 * Respects prefers-reduced-motion (renders the final enriched
 * state, no rolling, no confetti).
 */

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ModuleStatusPill, ModuleWindow } from "./ModuleWindow";

type Source = "IG" | "TIKTOK" | "DM" | "SHOP";

interface LiveEvent {
  date: string;
  source: Source;
  text: string;
  /** Convo count delta (DM/comment/tag). */
  convos?: number;
  /** Intent score delta (positive). */
  intent?: number;
  /** Purchase rolls GMV and lifts intent. */
  purchase?: { product: string; price: number };
}

const IG_GRADIENT   = "linear-gradient(135deg, #FCAF45, #FD1D1D 50%, #833AB4)";
const TT_GRADIENT   = "linear-gradient(180deg, #25F4EE, #1A1A1A)";
const DM_GRADIENT   = "linear-gradient(180deg, #6FA3D9, #2C5E9D)";
const SHOP_GRADIENT = "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))";

const NODE_TINTS: Record<Source, string> = {
  IG: IG_GRADIENT,
  TIKTOK: TT_GRADIENT,
  DM: DM_GRADIENT,
  SHOP: SHOP_GRADIENT,
};

const NODE_LABEL: Record<Source, string> = {
  IG: "IG",
  TIKTOK: "TT",
  DM: "DM",
  SHOP: "SHOP",
};

const BASELINE = {
  gmv: 1284,
  convos: 38,
  intent: 62,
};

interface TimelineRow {
  id: string;
  date: string;
  source: Source;
  text: string;
}

const SEED_TIMELINE: TimelineRow[] = [
  { id: "seed-4", date: "10/30", source: "TIKTOK", text: "Reposted the Heritage drop teaser" },
  { id: "seed-3", date: "10/22", source: "DM",     text: "Asked about cream restock" },
  { id: "seed-2", date: "10/19", source: "SHOP",   text: "Heritage Cap · $128" },
  { id: "seed-1", date: "10/14", source: "IG",     text: "Liked the heritage cap reel" },
];

const LIVE_EVENTS: LiveEvent[] = [
  { date: "TODAY", source: "IG",     text: "Commented on the cap reel",          convos: 1, intent: 3 },
  { date: "TODAY", source: "IG",     text: "Saved the product post",             intent: 4 },
  { date: "TODAY", source: "DM",     text: "DM'd “does this come in cream?”", convos: 1, intent: 6 },
  { date: "TODAY", source: "IG",     text: "Joined the early-access list",       intent: 8 },
  { date: "TODAY", source: "SHOP",   text: "Heritage Cap · cream · M",
    purchase: { product: "Heritage Cap", price: 300 }, intent: 5 },
  { date: "TODAY", source: "TIKTOK", text: "Tagged a friend in the pickup",      convos: 1, intent: 2 },
];

const STEP_MS = 2400;
const RESTART_MS = 4200;

const VISIBLE_ROWS = 4;
const ROW_HEIGHT = 44;
const ROW_GAP = 6;
const TIMELINE_HEIGHT = VISIBLE_ROWS * ROW_HEIGHT + (VISIBLE_ROWS - 1) * ROW_GAP;

function usesReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function formatMoney(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** Smoothly tween a numeric value when its target changes. */
function useCountUp(target: number, duration = 720): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const targetRef = useRef(target);

  useEffect(() => {
    fromRef.current = value;
    targetRef.current = target;
    if (typeof window === "undefined") {
      setValue(target);
      return;
    }
    if (fromRef.current === target) return;
    let frame = 0;
    let startTs: number | null = null;
    const animate = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (targetRef.current - fromRef.current) * ease;
      setValue(next);
      if (t < 1) frame = window.requestAnimationFrame(animate);
      else setValue(targetRef.current);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

const root: CSSProperties = {
  padding: "14px 16px 16px",
  display: "grid",
  gap: 12,
};

const head: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: 12,
  alignItems: "center",
  padding: "14px 16px",
  borderBottom: "1px solid var(--gs-bone-edge)",
};

const avatar: CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 999,
  background: "linear-gradient(180deg, #FFCDB7, #F4A38A)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  font: "800 15px/1 var(--gs-font-display)",
  color: "#5A1E00",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 1px rgba(11,11,18,0.10)",
};

const nameLine: CSSProperties = {
  font: "800 18px/1.08 var(--gs-font-display)",
  color: "var(--gs-ink)",
  letterSpacing: "0",
};

const subLine: CSSProperties = {
  font: "10px/1 var(--gs-font-mono)",
  color: "var(--gs-ink-3)",
  marginTop: 5,
  letterSpacing: "0.10em",
  textTransform: "uppercase",
};

const chipHot: CSSProperties = {
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  padding: "5px 8px",
  borderRadius: 999,
  background: "linear-gradient(180deg, var(--gs-tangerine-hi), var(--gs-tangerine))",
  color: "#fff",
  whiteSpace: "nowrap",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45), 0 4px 10px -6px rgba(224,79,10,0.45)",
};

const sectionLabel: CSSProperties = {
  font: "700 10px/1 var(--gs-font-mono)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

const statCard: CSSProperties = {
  position: "relative",
  display: "grid",
  gap: 6,
  padding: "10px 12px 11px",
  borderRadius: 12,
  background: "linear-gradient(180deg, #FFFFFF 0%, var(--gs-paper-cool) 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 1px var(--gs-bone-edge)",
  minHeight: 62,
  transition: "box-shadow 320ms ease",
};

const statKey: CSSProperties = {
  font: "700 9px/1 var(--gs-font-mono)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

const statVal: CSSProperties = {
  font: "800 20px/1 var(--gs-font-display)",
  color: "var(--gs-tangerine-deep)",
  letterSpacing: "0",
};

const nodeBubble = (src: Source): CSSProperties => ({
  width: 26,
  height: 26,
  borderRadius: 999,
  background: NODE_TINTS[src],
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  font: "800 8.5px/1 var(--gs-font-mono)",
  letterSpacing: "0.06em",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.45), 0 0 0 3px var(--gs-bone), 0 5px 12px -8px rgba(11,11,18,0.32)",
  flexShrink: 0,
});

const dateMono: CSSProperties = {
  font: "700 10px/1 var(--gs-font-mono)",
  color: "var(--gs-ink)",
  letterSpacing: "0.04em",
};

const rowText: CSSProperties = {
  font: "13px/1.35 var(--gs-font-sans)",
  color: "var(--gs-ink-2)",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const intentWrap: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const intentBar: CSSProperties = {
  flex: 1,
  height: 8,
  borderRadius: 999,
  background: "rgba(11,11,18,0.06)",
  overflow: "hidden",
};

interface StatProps {
  label: string;
  value?: string;
  glowKey?: number;
  floater?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

function StatCard({ label, value, glowKey = 0, floater, style, children }: StatProps) {
  return (
    <div
      key={`glow-${glowKey}`}
      style={{
        ...statCard,
        ...style,
        animation: glowKey > 0 ? "gs-crm-glow 900ms ease-out" : undefined,
      }}
    >
      <span style={statKey}>{label}</span>
      {children ? (
        children
      ) : (
        <span
          key={`v-${glowKey}`}
          style={{
            ...statVal,
            display: "inline-block",
            animation: glowKey > 0 ? "gs-crm-bump 520ms cubic-bezier(.2,.7,.1,1)" : undefined,
          }}
        >
          {value}
        </span>
      )}
      {floater && (
        <span
          key={`f-${glowKey}`}
          style={{
            position: "absolute",
            right: 12,
            top: 6,
            font: "800 10px/1 var(--gs-font-mono)",
            color: "var(--gs-success)",
            letterSpacing: "0.04em",
            animation: "gs-crm-floater 1000ms ease-out forwards",
            pointerEvents: "none",
          }}
        >
          {floater}
        </span>
      )}
    </div>
  );
}

interface Confetti {
  id: number;
  left: number;
  top: number;
  dx: number;
  dy: number;
  color: string;
  rot: number;
  size: number;
}

const CONFETTI_COLORS = [
  "var(--gs-tangerine)",
  "var(--gs-tangerine-hi)",
  "#25F4EE",
  "#58C97B",
  "#FD1D1D",
  "#FCAF45",
];

function spawnConfetti(): Confetti[] {
  const out: Confetti[] = [];
  for (let i = 0; i < 14; i++) {
    out.push({
      id: Math.random(),
      left: 50 + (Math.random() - 0.5) * 16,
      top: 8,
      dx: (Math.random() - 0.5) * 240,
      dy: -80 - Math.random() * 120,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rot: (Math.random() - 0.5) * 540,
      size: 5 + Math.random() * 4,
    });
  }
  return out;
}

function renderRow(row: TimelineRow): ReactNode {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30px 46px 1fr",
        gap: 8,
        alignItems: "center",
        height: "100%",
      }}
    >
      <span style={nodeBubble(row.source)}>{NODE_LABEL[row.source]}</span>
      <span style={dateMono}>{row.date}</span>
      <span style={rowText}>{row.text}</span>
    </div>
  );
}

export function SocialCrmWindow() {
  const reducedRef = useRef(usesReducedMotion());
  const reduced = reducedRef.current;

  const enriched = useMemo(() => {
    const start = { ...BASELINE };
    for (const ev of LIVE_EVENTS) {
      if (ev.purchase) start.gmv += ev.purchase.price;
      if (ev.convos) start.convos += ev.convos;
      if (ev.intent) start.intent = Math.min(100, start.intent + ev.intent);
    }
    return start;
  }, []);

  const initialMetrics = reduced ? enriched : BASELINE;

  const [gmv, setGmv] = useState(initialMetrics.gmv);
  const [convos, setConvos] = useState(initialMetrics.convos);
  const [intent, setIntent] = useState(initialMetrics.intent);

  const [gmvGlow, setGmvGlow] = useState(0);
  const [convosGlow, setConvosGlow] = useState(0);
  const [intentGlow, setIntentGlow] = useState(0);

  const [gmvFloater, setGmvFloater] = useState<string | undefined>();
  const [convosFloater, setConvosFloater] = useState<string | undefined>();
  const [intentFloater, setIntentFloater] = useState<string | undefined>();

  const [rows, setRows] = useState<TimelineRow[]>([...SEED_TIMELINE]);
  const [exiting, setExiting] = useState<TimelineRow | null>(null);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    let liveIdx = 0;
    let timeoutId: number | undefined;
    let visible = true;
    let observer: IntersectionObserver | undefined;
    const node = containerRef.current;

    const reset = () => {
      setGmv(BASELINE.gmv);
      setConvos(BASELINE.convos);
      setIntent(BASELINE.intent);
      setRows([...SEED_TIMELINE]);
    };

    const playEvent = (ev: LiveEvent, idx: number) => {
      const row: TimelineRow = {
        id: `live-${idx}-${Date.now()}`,
        date: ev.date,
        source: ev.source,
        text: ev.text,
      };
      setRows((prev) => {
        const dropped = prev.length >= VISIBLE_ROWS ? prev[prev.length - 1] : null;
        const next = [row, ...prev];
        if (next.length > VISIBLE_ROWS) {
          if (dropped) {
            setExiting(dropped);
            window.setTimeout(() => {
              setExiting((curr) => (curr && curr.id === dropped.id ? null : curr));
            }, 480);
          }
          return next.slice(0, VISIBLE_ROWS);
        }
        return next;
      });

      if (ev.purchase) {
        const p = ev.purchase;
        setGmv((v) => v + p.price);
        setGmvGlow((g) => g + 1);
        setGmvFloater(`+$${p.price}`);
        window.setTimeout(() => setGmvFloater(undefined), 1000);
        setConfetti(spawnConfetti());
        window.setTimeout(() => setConfetti([]), 1300);
      }
      if (ev.convos) {
        setConvos((v) => v + ev.convos!);
        setConvosGlow((g) => g + 1);
        setConvosFloater(`+${ev.convos}`);
        window.setTimeout(() => setConvosFloater(undefined), 1000);
      }
      if (ev.intent) {
        setIntent((v) => Math.min(100, v + ev.intent!));
        setIntentGlow((g) => g + 1);
        setIntentFloater(`+${ev.intent}`);
        window.setTimeout(() => setIntentFloater(undefined), 1000);
      }
    };

    const tick = () => {
      if (!visible) {
        timeoutId = window.setTimeout(tick, STEP_MS);
        return;
      }
      if (liveIdx >= LIVE_EVENTS.length) {
        liveIdx = 0;
        timeoutId = window.setTimeout(() => {
          reset();
          timeoutId = window.setTimeout(tick, 1200);
        }, RESTART_MS);
        return;
      }
      const ev = LIVE_EVENTS[liveIdx];
      const idx = liveIdx;
      liveIdx += 1;
      playEvent(ev, idx);
      timeoutId = window.setTimeout(tick, STEP_MS);
    };

    if (node && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) visible = e.isIntersecting;
        },
        { threshold: 0.2 }
      );
      observer.observe(node);
    }

    timeoutId = window.setTimeout(tick, 1500);

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (observer && node) observer.unobserve(node);
    };
  }, [reduced]);

  const gmvDisplay = useCountUp(gmv);
  const convosDisplay = useCountUp(convos);
  const intentDisplay = useCountUp(intent, 600);

  const statsGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  };

  return (
    <ModuleWindow
      title="growthsync · crm · @maya.r"
      eyebrow="SEGMENT OF ONE · ENRICHED"
      status={<ModuleStatusPill>SYNCED</ModuleStatusPill>}
    >
      <div ref={containerRef} style={{ position: "relative" }}>
        <div style={head}>
          <span style={avatar}>MR</span>
          <div>
            <div style={nameLine}>Maya R.</div>
            <div style={subLine}>@maya.r · cream caps · 12-wk active</div>
          </div>
          <span style={chipHot}>HOT BUYER</span>
        </div>

        <div style={root}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={sectionLabel}>CAPTURED DATA</span>
            <span
              style={{
                font: "700 9px/1 var(--gs-font-mono)",
                letterSpacing: "0.12em",
                color: "var(--gs-ink-3)",
                textTransform: "uppercase",
              }}
            >
              ENRICHING LIVE
            </span>
          </div>

          <div style={statsGridStyle}>
            <StatCard label="GMV · 90D" value={formatMoney(gmvDisplay)} glowKey={gmvGlow} floater={gmvFloater} />
            <StatCard label="CONVOS · IG + TT" value={`${Math.round(convosDisplay)}`} glowKey={convosGlow} floater={convosFloater} />
            <StatCard label="INTENT" glowKey={intentGlow} floater={intentFloater} style={{ gridColumn: "1 / -1" }}>
              <div style={intentWrap}>
                <div style={intentBar}>
                  <span
                    style={{
                      display: "block",
                      height: "100%",
                      width: `${intentDisplay}%`,
                      background: "linear-gradient(90deg, var(--gs-tangerine-deep), var(--gs-tangerine))",
                      transition: "width 600ms cubic-bezier(.2,.7,.1,1)",
                    }}
                  />
                </div>
                <span style={{ ...statVal, minWidth: 36, textAlign: "right" }}>{Math.round(intentDisplay)}</span>
              </div>
            </StatCard>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
            <span style={sectionLabel}>INTERACTIONS · LIVE</span>
            <span
              style={{
                font: "700 9px/1 var(--gs-font-mono)",
                letterSpacing: "0.12em",
                color: "var(--gs-ink-3)",
                textTransform: "uppercase",
              }}
            >
              MOST RECENT FIRST
            </span>
          </div>

          <div style={{ position: "relative", height: TIMELINE_HEIGHT, overflow: "hidden" }}>
            {exiting && (
              <div
                key={`exit-${exiting.id}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: (VISIBLE_ROWS - 1) * (ROW_HEIGHT + ROW_GAP),
                  height: ROW_HEIGHT,
                  animation: reduced ? undefined : "gs-crm-row-out 460ms ease-out forwards",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                {renderRow(exiting)}
              </div>
            )}
            {rows.map((row, i) => (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: i * (ROW_HEIGHT + ROW_GAP),
                  height: ROW_HEIGHT,
                  transition: reduced ? undefined : "top 460ms cubic-bezier(.2,.7,.1,1)",
                  animation: reduced ? undefined : "gs-crm-row-in 460ms cubic-bezier(.2,.7,.1,1)",
                  zIndex: 1,
                }}
              >
                {renderRow(row)}
              </div>
            ))}
          </div>
        </div>

        {confetti.length > 0 && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden>
            {confetti.map((c) => (
              <span
                key={c.id}
                style={
                  {
                    position: "absolute",
                    left: `${c.left}%`,
                    top: `${c.top}%`,
                    width: c.size,
                    height: c.size * 1.6,
                    background: c.color,
                    borderRadius: 1,
                    boxShadow: "0 1px 0 rgba(255,255,255,0.3)",
                    transform: "translate(-50%, -50%)",
                    animation: "gs-crm-confetti 1200ms cubic-bezier(.2,.7,.1,1) forwards",
                    "--gs-dx": `${c.dx}px`,
                    "--gs-dy": `${c.dy}px`,
                    "--gs-rot": `${c.rot}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>
    </ModuleWindow>
  );
}
