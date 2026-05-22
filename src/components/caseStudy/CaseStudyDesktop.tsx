/**
 * <CaseStudyDesktop> — the retro Mac desktop scene.
 *
 * Interaction model:
 *   - Starts with NO browser windows open.
 *   - Each file icon on the left, when clicked, opens the case-study
 *     browser window for that file. Files map to browsers via
 *     `browserIndex` in the data.
 *   - Open windows are draggable from their titlebar.
 *   - Clicking a window brings it to the front.
 *   - The red traffic-light closes the window.
 *   - Re-clicking an open file brings it forward.
 *   - Multiple files can be open at once.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { GS_DATA } from "@/lib/data";
import type {
  CaseFeatureTileData,
  CaseFileIconData,
  CaseStudyDesktopProps,
} from "@/lib/types";
import { CaseBrowserWindow } from "./CaseBrowserWindow";

interface OpenWindow {
  /** Index into data.browsers. */
  browserIndex: number;
  x: number;
  y: number;
}

interface FileIconProps extends CaseFileIconData {
  open?: boolean;
  onOpen?: () => void;
}

function FileIcon({ letter, name, open, onOpen }: FileIconProps) {
  return (
    <button
      type="button"
      className="gscs-file"
      onClick={onOpen}
      onDoubleClick={onOpen}
      style={{
        background: "transparent",
        border: 0,
        padding: 0,
        cursor: "pointer",
        outline: "none",
      }}
    >
      <div
        className="gscs-icon"
        style={{
          boxShadow: open
            ? "inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 2px var(--gs-tangerine), 0 4px 8px rgba(0,0,0,0.3)"
            : undefined,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 6,
            fontSize: 8,
            color: "var(--gs-ink-3)",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          CASE
        </span>
        {letter}
      </div>
      <span
        style={{
          color: "#fff",
          font: "400 10px/1.1 var(--gs-font-mono)",
          letterSpacing: "0.04em",
          textShadow: "0 1px 2px rgba(0,0,0,0.6)",
          background: open ? "rgba(255,107,26,0.85)" : "transparent",
          borderRadius: 3,
          padding: open ? "1px 4px" : 0,
        }}
      >
        {name}
      </span>
    </button>
  );
}

function FeatureTile({ lab, ti, c1, c2, ic, tan }: CaseFeatureTileData) {
  return (
    <div
      className={`gscs-feat${tan ? " tan" : ""}`}
      style={{ "--c-1": c1, "--c-2": c2 } as CSSProperties}
    >
      <div
        className="ic"
        style={
          tan
            ? { background: "rgba(11,11,18,0.06)", color: "var(--gs-tangerine-deep)" }
            : undefined
        }
      >
        {ic}
      </div>
      <div className="lab">{lab}</div>
      <div className="ti">{ti}</div>
      <a className="more" href="/book-a-call" onClick={(e) => e.stopPropagation()}>
        Read more ›
      </a>
    </div>
  );
}

const DOCK_APPS: Array<{ bg: string; g: string }> = [
  { bg: "linear-gradient(180deg, #F36321, #B83F0A)", g: "✕" },
  { bg: "linear-gradient(180deg, #FF9159, #E15A1B)", g: "✉" },
  { bg: "linear-gradient(180deg, #5D9CD7, #2C5E9D)", g: "♪" },
  { bg: "linear-gradient(180deg, #C9C0E3, #8C7BC0)", g: "◷" },
  { bg: "linear-gradient(180deg, #58C97B, #1E8E3E)", g: "✓" },
  { bg: "linear-gradient(180deg, #FFD27A, #E2A124)", g: "★" },
  { bg: "linear-gradient(180deg, #B0A992, #6E6A60)", g: "▤" },
];

/* Layout helper — stagger spawn locations so a fresh open lands in
   a different spot than the previous one. First spawn lands near the
   visual center of the desktop, not pinned to the left rail. */
const SPAWN_STEP = { x: 38, y: 30 };

export function CaseStudyDesktop({ data = GS_DATA.caseStudies }: CaseStudyDesktopProps) {
  const [open, setOpen] = useState<OpenWindow[]>([]);
  const [order, setOrder] = useState<number[]>([]); // browserIndex stack, front-of-list = top
  const desktopRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    browserIndex: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [spawnCount, setSpawnCount] = useState(0);

  const isOpen = (bi: number) => open.some((w) => w.browserIndex === bi);
  const bringFront = (bi: number) => {
    setOrder((o) => [bi, ...o.filter((x) => x !== bi)]);
  };

  const openFile = (f: CaseFileIconData) => {
    if (f.browserIndex == null) return;
    if (isOpen(f.browserIndex)) {
      bringFront(f.browserIndex);
      return;
    }
    const i = spawnCount;
    setSpawnCount((c) => c + 1);
    const desktop = desktopRef.current;
    const w = desktop?.clientWidth ?? 900;
    const h = desktop?.clientHeight ?? 720;
    // Try to center the spawn around the desktop's visual middle, then
    // stagger from there. Window width is ~540px.
    const windowWidth = Math.min(540, Math.max(280, w - 132));
    const minX = w < 680 ? 96 : 170;
    const maxX = Math.max(minX, w - windowWidth - 18);
    const baseX = Math.max(minX, (w - windowWidth) / 2);
    const baseY = Math.max(36, h * 0.14);
    const x = Math.min(maxX, baseX + (i % 4) * SPAWN_STEP.x);
    const y = Math.min(Math.max(24, h - 340), baseY + (i % 4) * SPAWN_STEP.y);
    setOpen((arr) => [...arr, { browserIndex: f.browserIndex!, x, y }]);
    bringFront(f.browserIndex);
  };

  const closeWindow = (bi: number) => {
    setOpen((arr) => arr.filter((w) => w.browserIndex !== bi));
    setOrder((o) => o.filter((x) => x !== bi));
  };

  const startDrag = (
    bi: number,
    e: React.MouseEvent,
    cur: { x: number; y: number }
  ) => {
    bringFront(bi);
    dragRef.current = {
      browserIndex: bi,
      startX: e.clientX,
      startY: e.clientY,
      origX: cur.x,
      origY: cur.y,
    };
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      setOpen((arr) =>
        arr.map((w) => {
          if (w.browserIndex !== d.browserIndex) return w;
          const desktop = desktopRef.current;
          const desktopWidth = desktop?.clientWidth ?? 900;
          const windowWidth = Math.min(540, Math.max(280, desktopWidth - 132));
          const minX = desktopWidth < 680 ? 96 : -260;
          const maxX = desktopWidth - windowWidth - 18;
          const maxY = (desktop?.clientHeight ?? 720) - 80;
          return {
            ...w,
            x: Math.max(Math.min(minX, maxX), Math.min(maxX, d.origX + dx)),
            y: Math.max(-10, Math.min(maxY, d.origY + dy)),
          };
        })
      );
    };
    const up = () => {
      dragRef.current = null;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div className="gscs-frame">
      <div className="gscs-tabs">
        {data.desktopTabs.map((t) => (
          <span key={t.label} className={`gscs-tab${t.active ? " on" : ""}`}>
            <span className="dot" style={{ background: t.dot }} />
            {t.label}
            <span className="x">×</span>
          </span>
        ))}
        <span className="gscs-tab plus">+</span>
      </div>

      <div className="gscs-url">
        <div className="arrows">
          <span className="arr">‹</span>
          <span className="arr">›</span>
          <span className="arr">↺</span>
        </div>
        <div className="field">
          <span>⌕</span>
          <span className="light-host">{data.url.host} / </span>
          <b>{data.url.path}</b>
        </div>
        <div className="orb" />
      </div>

      <div className="gscs-menu">
        <span style={{ fontWeight: 800 }}>{data.menuItems[0]}</span>
        {data.menuItems.slice(1).map((m) => (
          <span key={m}>{m}</span>
        ))}
        <span className="right">
          <span>▤</span><span>☼</span><span>◐</span><span>📊</span><span>🔔</span>
          <span>Tue 8:42 PM</span><span>◔</span>
        </span>
      </div>

      <div className="gscs-desktop" ref={desktopRef}>
        <div className="gscs-files">
          {data.files.map((f) => (
            <FileIcon
              key={f.name}
              letter={f.letter}
              name={f.name}
              browserIndex={f.browserIndex}
              open={f.browserIndex != null && isOpen(f.browserIndex)}
              onOpen={() => openFile(f)}
            />
          ))}
        </div>

        {open.length === 0 && (
          <div
            className="gscs-empty"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              className="gscs-empty-card"
              style={{
                padding: "16px 22px",
                borderRadius: 14,
                background: "rgba(11,30,60,0.55)",
                backdropFilter: "blur(10px)",
                color: "#fff",
                textAlign: "center",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.15), 0 18px 40px -16px rgba(0,0,0,0.55)",
                font: "var(--gs-mono-md)",
                letterSpacing: "0.04em",
              }}
            >
              <div style={{ font: "700 10px/1 var(--gs-font-mono)", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7, marginBottom: 8 }}>
                FINDER · CASE FILES · {data.files.length}
              </div>
              <div style={{ font: "italic 400 22px/1.2 var(--gs-font-editorial)" }}>
                Click any file to open a case
              </div>
              <div style={{ font: "var(--gs-body-sm)", opacity: 0.85, marginTop: 6 }}>
                Drag windows · click to bring to front · red light closes.
              </div>
            </div>
          </div>
        )}

        {open.map((w) => {
          const z = 10 + (order.length - order.indexOf(w.browserIndex));
          const b = data.browsers[w.browserIndex];
          if (!b) return null;
          return (
            <CaseBrowserWindow
              key={w.browserIndex}
              {...b}
              totalCases={data.browsers.length}
              x={w.x}
              y={w.y}
              z={z}
              onClick={() => bringFront(w.browserIndex)}
              onClose={() => closeWindow(w.browserIndex)}
              onDragStart={(e) =>
                startDrag(w.browserIndex, e, { x: w.x, y: w.y })
              }
            />
          );
        })}

        <div className="gscs-dock">
          {DOCK_APPS.map((d, i) => (
            <div key={i} className="gscs-app" style={{ background: d.bg }}>
              {d.g}
            </div>
          ))}
        </div>
      </div>

      <div className="gscs-features">
        {data.features.map((f) => (
          <FeatureTile key={f.lab} {...f} />
        ))}
      </div>
    </div>
  );
}
