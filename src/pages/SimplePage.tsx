/**
 * <SimplePage> — generic Y2K document shell.
 *
 * Used by Privacy, Terms, all footer pages, and 404. Wraps the body in
 * <ChromeWindow> for the metallic titlebar, with a tangerine eyebrow,
 * display headline, optional lede, and a CTA row that points at /book-a-call
 * by default.
 */

import type { ReactNode } from "react";
import { ChromeWindow, TangerineButton } from "@/components/atoms";
import { RouterLink } from "@/blog/router";

export interface SimplePageProps {
  /** Mono filename centered in the titlebar, e.g. "privacy.txt". */
  fileName: string;
  /** Short kicker shown above the headline (uppercase). */
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
  /** Override the default Book-a-Call CTA. Pass `null` to hide it. */
  cta?: { label: string; to: string } | null;
}

const DEFAULT_CTA = { label: "Book a call", to: "/book-a-call" };

export function SimplePage({
  fileName,
  eyebrow,
  title,
  lede,
  children,
  cta = DEFAULT_CTA,
}: SimplePageProps) {
  return (
    <main className="gs-pagewrap" id="page">
      <div className="gs-page-eyebrow">
        <span className="dot" />
        <span>{eyebrow}</span>
      </div>
      <h1 className="gs-page-title">{title}</h1>
      {lede && <p className="gs-page-lede">{lede}</p>}
      <ChromeWindow title={fileName} contentStyle={{ background: "var(--gs-paper)" }}>
        <div className="gs-page-body">
          {children}
          {cta && (
            <div className="gs-page-cta-row">
              <RouterLink to={cta.to} style={{ textDecoration: "none" }}>
                <TangerineButton size="lg">{cta.label} →</TangerineButton>
              </RouterLink>
              <span className="meta">No credit card · 15 min</span>
            </div>
          )}
        </div>
      </ChromeWindow>
    </main>
  );
}
