import { lazy, Suspense, useEffect } from "react";
import { useGlobalLinkInterception, useRoute } from "@/blog/router";
import { capturePaidAttribution } from "@/utils/attribution";
import { trackMarketingPageView } from "@/utils/marketingTags";
import CoreHome from "@/pages/CoreHome";

const SupportingRoutes = lazy(() => import("@/pages/SupportingRoutes"));

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

  return route.kind === "home" ? <CoreHome /> : (
    <Suspense fallback={<main className="core-route-loading" role="status">Loading…</main>}>
      <SupportingRoutes route={route} />
    </Suspense>
  );
}
