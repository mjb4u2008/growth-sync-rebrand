/**
 * <ArticleToc> - right-side `Jump to:` rail generated from H2 headings.
 * Tracks active heading via IntersectionObserver. Also exposes a mobile
 * `<details>` variant under 1100px.
 */

import { useEffect, useState } from "react";
import type { ArticleHeading } from "../utils";

export function ArticleToc({
  headings,
  variant = "both",
}: {
  headings: ArticleHeading[];
  /** "rail" renders only the sticky desktop column. "mobile" renders only the
   *  collapsible <details>. "both" renders both (default for older callers). */
  variant?: "rail" | "mobile" | "both";
}) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const ids = headings.map((h) => h.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size === 0) return;
        let bestId = "";
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestId = id;
            bestRatio = ratio;
          }
        }
        if (bestId) setActive(bestId);
      },
      { rootMargin: "-88px 0px -65% 0px", threshold: [0.1, 0.5, 1] }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {variant !== "rail" && (
        <details className="gs-blog-toc-mobile">
          <summary>Jump to</summary>
          <ol>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ol>
        </details>
      )}
      {variant !== "mobile" && (
        <nav className="gs-blog-toc-rail" aria-label="Section navigation">
          <div className="gs-blog-toc-label">Jump to:</div>
          <ol className="gs-blog-toc-list">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={active === h.id ? "active" : undefined}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
