/**
 * <InstantReply> - "We reply instantly" section.
 * Two-column with the brand-voice reply window + body copy.
 */

import { MonoLabel, RainbowStrip, ReadMore } from "@/components/atoms";
import { ReplyWindow } from "@/components/product";

const BULLETS = [
  "Replies to DMs and comments in your brand voice",
  "Turns intent into invoice cards, product picks, and restock pings",
  "Sends sensitive moments to support before anything breaks",
];

export function InstantReply() {
  return (
    <section className="gs-section">
      <div className="gs-two-col">
        <div>
          <RainbowStrip />
          <MonoLabel>MODULE · 02 · ENGAGEMENT</MonoLabel>
          <h2 className="gs-section-title" style={{ marginTop: 8 }}>
            We reply instantly,
            <br />
            turning intent into action
          </h2>
          <p className="gs-lede">
            GrowthSync reads the thread, answers the question, and drafts a reply in your
            tone. The result feels human and stays on brand.
          </p>
          <ul className="gs-checklist">
            {BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div style={{ marginTop: 18 }}>
            <ReadMore />
          </div>
        </div>
        <ReplyWindow />
      </div>
    </section>
  );
}
