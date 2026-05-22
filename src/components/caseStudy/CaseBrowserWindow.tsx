/**
 * <CaseBrowserWindow> — a single retro browser window inside the
 * Mac-desktop scene. Rendered absolute-positioned by <CaseStudyDesktop>.
 *
 * The titlebar is grabbable: pressing mouse-down anywhere on .tb
 * (except the close light) starts a drag handled by the parent.
 */

import type { MouseEvent as ReactMouseEvent } from "react";
import type { CaseBrowserWindowProps } from "@/lib/types";

export function CaseBrowserWindow({
  skin,
  brand,
  host,
  since,
  tagline,
  caseN,
  totalCases = 3,
  headline,
  by,
  body,
  stats,
  quote,
  counter,
  x,
  y,
  z,
  onClick,
  onClose,
  onDragStart,
}: CaseBrowserWindowProps) {
  const paddedTotal = String(totalCases).padStart(2, "0");

  const handleClose = (e: ReactMouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  return (
    <div
      className={`gscs-bw b-${skin}`}
      style={{ left: x, top: y, zIndex: z }}
      onMouseDown={onClick}
    >
      <div
        className="tb"
        onMouseDown={(e) => {
          // ignore drags initiated from the traffic-light cluster
          if ((e.target as HTMLElement).closest(".lights")) return;
          onDragStart?.(e);
        }}
        style={{ cursor: "grab", userSelect: "none" }}
      >
        <div className="lights" onMouseDown={(e) => e.stopPropagation()}>
          <span className="lt r" onClick={handleClose} style={{ cursor: "pointer" }} />
          <span className="lt y" />
          <span className="lt g" />
        </div>
        <div className="tt">{brand} — {tagline}</div>
        <div />
      </div>
      <div className="urlbar">
        <div className="arr-row">
          <span className="arr">‹</span>
          <span className="arr">›</span>
        </div>
        <div className="u">
          <span className="star">☆</span>
          <span>http://www.{host}/</span>
        </div>
        <div className="goo">
          <span>Google</span><span>⌕</span>
        </div>
      </div>
      <div className="bm">
        <span>Apple</span><span>iCloud (.Mac)</span><span>Yahoo!</span>
        <span>Amazon</span><span>eBay</span><span>News ▾</span>
      </div>
      <div className="banner">
        <span className="since">{since}</span>
        <div className="wm">{brand.toUpperCase()}</div>
        <div className="tg">{tagline}</div>
      </div>
      <div className={`nav ${skin === "mint" ? "mint" : skin === "lilac" ? "lilac" : ""}`}>
        <span>home</span><span>about</span><span>cases</span><span>press</span>
        <span className="x">shop ▾</span><span>guestbook</span><span>contact</span>
      </div>
      <div className="article">
        <div>
          <div className="eyebrow">FEATURED ON GROWTHSYNC · CASE {caseN} OF {paddedTotal}</div>
          <h4>{headline}</h4>
          <div className="by">{by}</div>
          <p>{body}</p>
        </div>
        <div className="side">
          <a className="pr" href="/book-a-call" onClick={(e) => e.stopPropagation()}>
            → press release
          </a>
          <div className="stats">
            <div className="h">Stats / Numbers</div>
            {stats.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{k}</span>
                <span className="v">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="quote">&ldquo;{quote}&rdquo;</div>
      <div className="ft">
        <span>© 2003–2004 {brand}. webmaster@{host.replace(/\..*/, "")}.com</span>
        <span className="count">{counter}</span>
      </div>
    </div>
  );
}
