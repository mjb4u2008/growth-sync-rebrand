import { lazy, Suspense, useEffect } from "react";
import { useGlobalLinkInterception, useRoute } from "@/blog/router";
import { capturePaidAttribution } from "@/utils/attribution";
import { trackMarketingPageView } from "@/utils/marketingTags";
import CoreHome from "@/pages/CoreHome";

const ConceptStudio = import.meta.env.DEV ? lazy(() => import("@/pages/ConceptStudio")) : null;
const SupportingRoutes = lazy(() => import("@/pages/SupportingRoutes"));
const GrowLanding = lazy(() => import("@/pages/GrowLanding"));

export default function App() {
  useGlobalLinkInterception();
  const route = useRoute();
  const attributionRoute = typeof window === "undefined"
    ? ""
    : `${window.location.pathname}${window.location.search}`;

  useEffect(() => {
    capturePaidAttribution();
    trackMarketingPageView();
  }, [attributionRoute]);

  if (ConceptStudio && route.kind === "not-found" && route.pathname === "/concepts") {
    return <Suspense fallback={<main className="core-route-loading" role="status">Loading studies…</main>}><ConceptStudio /></Suspense>;
  }

  return route.kind === "home" ? <CoreHome /> : (
    <Suspense fallback={<main className="core-route-loading" role="status">Loading…</main>}>
      {route.kind === "grow" ? <GrowLanding /> : <SupportingRoutes route={route} />}
    </Suspense>
  );
}
