/**
 * <Impressions> - "Find & engage with every social impression" section.
 *
 * A single marketing visual (<SignalOrganizer>): a flood of raw social
 * impressions streams in, GrowthSync sorts + scores each one, and they land
 * as a clean, organized, actionable product feed (NPS Impact · Loyalty ·
 * Signal · Routed-to).
 */

import { SignalOrganizer } from "@/components/product";
import { SectionHeader } from "@/components/marketing";

export function Impressions() {
  return (
    <section id="signals" className="gs-band gs-band-bone gs-center">
      <div className="gs-band-inner">
        <SectionHeader
          title={"Find & engage with every social impression\nacross TikTok and Instagram"}
          emWord="engage"
          lede="Every comment and DM gets captured, scored, and organized into one live feed — so a wall of social noise becomes a digestible, actionable view of your customers."
        />

        <SignalOrganizer />
      </div>
    </section>
  );
}
