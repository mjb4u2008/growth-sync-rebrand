/**
 * <HowItWorks> - "How It Works" + capture-feed window paired with body copy.
 */

import { MonoLabel, RainbowStrip, ReadMore } from "@/components/atoms";
import { SectionDivider, SectionHeader } from "@/components/marketing";
import { CaptureWindow } from "@/components/product";

const CAPTURE_BULLETS = [
  "24/7 listening across TikTok, Instagram, comments, DMs, and stories",
  "Sentiment, customer themes, and objections surfaced automatically",
  "Insights from every post and mention, without reading them all",
];

export function HowItWorks() {
  return (
    <section className="gs-section">
      <SectionDivider num="01" label="The Sequence" meta="Capture → Reply → CRM" />
      <div className="gs-center">
        <SectionHeader
          title="How It Works"
          lede="A three-part operating sequence for listening, understanding, and converting every social impression."
        />
      </div>
      <div style={{ marginTop: 40 }} className="gs-two-col">
        <CaptureWindow />
        <div>
          <RainbowStrip />
          <MonoLabel>Capture</MonoLabel>
          <h2 className="gs-section-title" style={{ marginTop: 8 }}>
            We capture every social
            <br />
            signal about your brand
          </h2>
          <p className="gs-lede">
            Every TikTok and Instagram comment, DM, and story reply gets surfaced in real
            time and labeled by voice, intent, and product.
          </p>
          <ul className="gs-checklist">
            {CAPTURE_BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div style={{ marginTop: 20 }}>
            <ReadMore />
          </div>
        </div>
      </div>
    </section>
  );
}
