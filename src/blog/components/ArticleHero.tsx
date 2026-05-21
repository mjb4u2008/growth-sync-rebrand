/**
 * <ArticleHero> — slot for the post's hero illustration.
 * Phase 1: just passes the post's `hero` ReactNode through. The wrapper
 * stays separate so it can later add OG-image generation hooks.
 */

import type { ReactNode } from "react";

export function ArticleHero({ children, alt }: { children: ReactNode; alt: string }) {
  return (
    <div className="gs-blog-hero" role="img" aria-label={alt}>
      {children}
    </div>
  );
}
