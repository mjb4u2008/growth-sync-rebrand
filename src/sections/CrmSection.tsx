/**
 * <CrmSection> - "We turn interactions into a Social CRM" section.
 * Two-column flip with the CRM window on the right.
 */

import { MonoLabel, RainbowStrip, ReadMore } from "@/components/atoms";
import { SectionDivider } from "@/components/marketing";
import { SocialCrmWindow } from "@/components/product";

const BULLETS = [
  "Every interaction becomes a fragment of zero-party data, across platforms",
  "Sentiment, intent, voice, and product cues attached to a single segment-of-one",
  "See every touchpoint: DM, story reply, purchase, refund",
];

export function CrmSection() {
  return (
    <section className="gs-band gs-band-dark">
      <div className="gs-band-inner">
        <SectionDivider num="03" label="Social CRM" meta="Zero-Party Data" />
        <div className="gs-two-col gs-two-col-flip">
        <div>
          <RainbowStrip />
          <MonoLabel color="var(--gs-tangerine-hi)">CRM Enrichment</MonoLabel>
          <h2 className="gs-section-title" style={{ marginTop: 8 }}>
            We turn interactions
            <br />
            into a Social CRM
          </h2>
          <p className="gs-lede">
            Every reply, mention, and DM builds a detailed profile. Real customers surface
            for retention, restocks, and gift moments.
          </p>
          <ul className="gs-checklist">
            {BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div style={{ marginTop: 20 }}>
            <ReadMore style={{ color: "var(--gs-tangerine-hi)" }} />
          </div>
        </div>
        <SocialCrmWindow />
        </div>
      </div>
    </section>
  );
}
