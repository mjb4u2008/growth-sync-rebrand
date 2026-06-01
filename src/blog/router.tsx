/**
 * Minimal SPA router for the GrowthSync marketing site.
 *
 * Originally limited to blog routes, this now handles the full site:
 * marketing home, blog index/posts, the Book a Call page, legal pages,
 * and the dozen footer pages. Rather than pull in react-router-dom for
 * a handful of paths, this exposes a `useRoute()` hook and a `<RouterLink>`
 * that uses the History API and stays crawlable as a plain `<a href>`.
 */

import { useCallback, useEffect, useSyncExternalStore, type MouseEvent, type ReactNode } from "react";

export type SimplePageSlug =
  // legal
  | "privacy"
  | "terms"
  | "security"
  // product
  | "inbox"
  | "customer-memory"
  | "brand-voice"
  | "live-drop-mode"
  // company
  | "customers"
  | "founders"
  | "pricing"
  | "careers"
  // resources
  | "brand-voice-library"
  | "drop-playbook"
  | "changelog"
  | "sample-inbox";

export type Route =
  | { kind: "home" }
  | { kind: "blog-index"; search: string }
  | { kind: "blog-post"; slug: string }
  | { kind: "book-a-call" }
  | { kind: "book-a-call-success" }
  | { kind: "simple-page"; slug: SimplePageSlug }
  | { kind: "not-found"; pathname: string };

const SIMPLE_PAGE_SLUGS: ReadonlySet<SimplePageSlug> = new Set<SimplePageSlug>([
  "privacy",
  "terms",
  "security",
  "inbox",
  "customer-memory",
  "brand-voice",
  "live-drop-mode",
  "customers",
  "founders",
  "pricing",
  "careers",
  "brand-voice-library",
  "drop-playbook",
  "changelog",
  "sample-inbox",
]);

function pathToRoute(pathnameWithSearch: string): Route {
  const [pathname, search = ""] = pathnameWithSearch.split("?");
  if (pathname === "/" || pathname === "") return { kind: "home" };
  if (pathname === "/blog" || pathname === "/blog/") return { kind: "blog-index", search };
  const blogMatch = pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/i);
  if (blogMatch) return { kind: "blog-post", slug: blogMatch[1] };
  if (pathname === "/book-a-call/success" || pathname === "/book-a-call/success/") return { kind: "book-a-call-success" };
  if (pathname === "/book-a-call" || pathname === "/book-a-call/" || pathname === "/get-started" || pathname === "/get-started/") return { kind: "book-a-call" };
  const simpleMatch = pathname.match(/^\/([a-z0-9-]+)\/?$/);
  if (simpleMatch) {
    const slug = simpleMatch[1] as SimplePageSlug;
    if (SIMPLE_PAGE_SLUGS.has(slug)) return { kind: "simple-page", slug };
  }
  return { kind: "not-found", pathname };
}

function subscribe(notify: () => void) {
  window.addEventListener("popstate", notify);
  window.addEventListener("gs-route-change", notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener("gs-route-change", notify);
  };
}

function getSnapshot(): string {
  return typeof window === "undefined" ? "/" : window.location.pathname + window.location.search;
}

export function useRoute(): Route {
  const pathname = useSyncExternalStore(subscribe, getSnapshot, () => "/");
  return pathToRoute(pathname);
}

/** Programmatic navigation that scrolls to top and updates history. */
export function navigateTo(to: string, opts?: { replace?: boolean }) {
  if (typeof window === "undefined") return;
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (to === current) return;
  if (opts?.replace) {
    window.history.replaceState({}, "", to);
  } else {
    window.history.pushState({}, "", to);
  }
  window.dispatchEvent(new Event("gs-route-change"));
  window.scrollTo({ top: 0, behavior: "auto" });
}

type LinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
};

/**
 * Internal link that pushes history without a page reload. Falls back to
 * the browser when the click has modifier keys or a non-primary button.
 */
export function RouterLink({ to, children, className, style, onClick, ariaLabel }: LinkProps) {
  const handle = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigateTo(to);
    },
    [to, onClick]
  );
  return (
    <a href={to} className={className} style={style} onClick={handle} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

/**
 * Global click interceptor: any internal absolute-path `<a href="/...">`
 * rendered anywhere on the site becomes a SPA navigation. Modifier keys,
 * non-self targets, and hash-only links pass through to the browser.
 * Mounted once at the App root.
 */
export function useGlobalLinkInterception() {
  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const path = e.composedPath();
      const anchor = path.find(
        (el): el is HTMLAnchorElement =>
          el instanceof HTMLAnchorElement && !!el.getAttribute("href")
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href")!;
      if (!href.startsWith("/")) return;
      if (anchor.target && anchor.target !== "_self") return;
      // Hash-only scroll targets pass through.
      if (href.startsWith("/#") || href.startsWith("#")) return;
      e.preventDefault();
      navigateTo(href);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}
