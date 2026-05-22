/**
 * <SourceBox> - dashed-rule list of sources at the foot of the article.
 * Hidden when the post has no sources.
 */

import type { BlogSource } from "../types";

export function SourceBox({ sources }: { sources?: BlogSource[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <aside className="gs-blog-source">
      <div className="gs-blog-source-label">Sources / Notes</div>
      <ul>
        {sources.map((s) => (
          <li key={s.label}>
            {s.href && s.href !== "#" ? (
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ) : (
              s.label
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
