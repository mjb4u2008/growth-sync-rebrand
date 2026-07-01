/**
 * <SectionDivider> - the spec-sheet "chapter opener" that sits at the top
 * of a section band. A numbered mono kicker on a rule that spans the
 * content column, with an optional right-aligned meta tag.
 *
 *   num    page-order index, e.g. "01" (optional)
 *   label  section name, e.g. "SIGNALS"
 *   meta   right-aligned descriptor, e.g. "TIKTOK + INSTAGRAM" (optional)
 *
 * Styling lives in global.css under .gs-divider. Dark/tangerine bands
 * recolor it automatically via .gs-band-dark / .gs-closer descendant rules.
 */

import type { CSSProperties } from "react";

interface SectionDividerProps {
  label: string;
  num?: string;
  meta?: string;
  style?: CSSProperties;
}

export function SectionDivider({ num, label, meta, style }: SectionDividerProps) {
  return (
    <div className="gs-divider" style={style}>
      {num && <span className="gs-divider-num">{num}</span>}
      <span className="gs-divider-label">{label}</span>
      <span className="gs-divider-rule" aria-hidden="true" />
      {meta && <span className="gs-divider-meta">{meta}</span>}
    </div>
  );
}
