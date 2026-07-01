/**
 * <SectionHeader> - eyebrow + heavy-grotesk title + lede.
 *
 *   emWord  When set AND found in `title`, that word is rendered in
 *           Instrument Serif italic. Use sparingly - most sections use
 *           plain Hanken heavy.
 */

import type { ReactNode } from "react";
import type { SectionHeaderProps } from "@/lib/types";

function renderTitle(title: string, emWord?: string): ReactNode {
  if (!emWord) return title;
  const idx = title.indexOf(emWord);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="em">
        {emWord}
      </span>
      {title.slice(idx + emWord.length)}
    </>
  );
}

export function SectionHeader({ title, lede, align = "center", emWord }: SectionHeaderProps) {
  return (
    <div style={{ textAlign: align }}>
      <h2 className="gs-section-title">{renderTitle(title, emWord)}</h2>
      {lede && (
        <p
          className="gs-lede"
          style={{ margin: align === "center" ? "0 auto" : 0 }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
