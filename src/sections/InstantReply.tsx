/**
 * <InstantReply> — "We reply instantly" section.
 * Two-column with the brand-voice reply window + body copy.
 */

import { MonoLabel, RainbowStrip, ReadMore } from "@/components/atoms";
import { ReplyWindow } from "@/components/product";

const BULLETS = [
  "Replies to DMs and comments in your brand voice — not robotic, not it-helpdesk-stiff",
  "Closes sales in real time — invoice cards, product picks, restock pings",
  "Hand-offs to real support if intent crosses your threshold — never silently broken",
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
            GrowthSync joins every relevant DM and comment in your brand toolkit — reading
            conversations forward, answering questions, sounding (and looking) like a human in
            your tone.
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
