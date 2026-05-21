/**
 * <HowItWorks> — "How It Works" + capture-feed window paired with body copy.
 */

import { MonoLabel, RainbowStrip, ReadMore } from "@/components/atoms";
import { SectionHeader } from "@/components/marketing";
import { CaptureWindow } from "@/components/product";

const CAPTURE_BULLETS = [
  "24/7 listening across TikTok, Instagram, comments, DMs, and stories",
  "Sentiment, voice-of-customer themes, and emerging objections — surfaced automatically",
  "Insights you'll only get by reading every post and mention — without reading them",
];

export function HowItWorks() {
  return (
    <section className="gs-section">
      <div className="gs-center">
        <SectionHeader
          title="How It Works"
          lede="A three-part operating sequence for listening, understanding, and converting every social impression."
        />
      </div>
      <div style={{ marginTop: 48 }} className="gs-two-col">
        <CaptureWindow />
        <div>
          <RainbowStrip />
          <MonoLabel>MODULE · 01 · CAPTURE</MonoLabel>
          <h2 className="gs-section-title" style={{ marginTop: 8 }}>
            We capture every social
            <br />
            signal about your brand
          </h2>
          <p className="gs-lede">
            Every TikTok, Instagram, comment, DM, and story reply about your brand — surfaced in real
            time and labelled by voice, intent, and product.
          </p>
          <ul className="gs-checklist">
            {CAPTURE_BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div style={{ marginTop: 18 }}>
            <ReadMore />
          </div>
        </div>
      </div>
    </section>
  );
}
