/**
 * <InstantReply> - "We reply instantly" section.
 * Two-column with the brand-voice reply window + body copy.
 */

import { MonoLabel, RainbowStrip, ReadMore } from "@/components/atoms";
import { SectionDivider } from "@/components/marketing";
import { ReplyWindow } from "@/components/product";

const BULLETS = [
  "Replies to DMs and comments in your brand voice",
  "Turns intent into invoice cards, product picks, and restock pings",
  "Sends sensitive moments to support before anything breaks",
];

export function InstantReply() {
  return (
    <section className="gs-band gs-band-bone">
      <div className="gs-band-inner">
        <SectionDivider num="02" label="Instant Reply" meta="Brand Voice" />
        <div className="gs-two-col">
        <div>
          <RainbowStrip />
          <MonoLabel>Reply</MonoLabel>
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
          <div style={{ marginTop: 20 }}>
            <ReadMore />
          </div>
        </div>
        <ReplyWindow />
        </div>
      </div>
    </section>
  );
}
