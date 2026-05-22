/**
 * <BlogDesktopShell> - the fixed-height "signals.psheet" window shell.
 * Used by both the table state and the article-reader state, so the
 * article never feels like a separate page; it opens inside this shell.
 *
 * Composable: titlebar has left/center/right slots, body is whatever the
 * caller passes as children.
 */

import type { ReactNode } from "react";
import { RouterLink } from "../router";

export function BlogDesktopShell({
  titlebarLeft,
  titlebarCenter,
  titlebarRight,
  closeHref,
  closeAriaLabel = "Close article and return home",
  modifier,
  children,
}: {
  titlebarLeft?: ReactNode;
  titlebarCenter?: ReactNode;
  titlebarRight?: ReactNode;
  closeHref?: string;
  closeAriaLabel?: string;
  /** Extra class modifier, e.g. "is-reader". */
  modifier?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`gs-psheet${modifier ? ` ${modifier}` : ""}`}
      role="region"
      aria-label="signals.psheet"
    >
      <div className="gs-psheet-titlebar">
        <div className="lights" aria-hidden={closeHref ? undefined : true}>
          {closeHref ? (
            <RouterLink
              to={closeHref}
              className="light light-r gs-psheet-close"
              ariaLabel={closeAriaLabel}
            >
              <span className="gs-sr-only">{closeAriaLabel}</span>
            </RouterLink>
          ) : (
            <span className="light light-r" />
          )}
          <span className="light light-y" />
          <span className="light light-g" />
          {titlebarLeft}
        </div>
        <div className="name">{titlebarCenter}</div>
        <div className="status">{titlebarRight}</div>
      </div>
      {children}
    </div>
  );
}
