/**
 * <Closer> - premium tangerine CTA panel.
 *
 *   - Chrome bar above grounds the card as a "system" surface.
 *   - Status pill: "NOW LIVE · ONBOARD IN 4 MINUTES" (green LED).
 *   - White/cream headline + italic editorial subcopy.
 *   - White primary pill "Start free" + secondary text link.
 */

export function Closer() {
  return (
    <section className="gs-closer-band">
      <div className="gs-closer">
        <div className="gs-closer-inner">
          <span className="gs-closer-sphere" aria-hidden="true" style={{ position: "relative" }} />
          <span className="gs-closer-status">
            <span className="led" />
            PRIVATE BETA · INSTAGRAM-FIRST
          </span>
          <h2>
            Your next customer is
            <br />
            <span className="em">already</span> in your comments.
          </h2>
          <p className="gs-closer-sub">
            Capture the signal, understand the intent, draft in your voice, and route the right next action while the buyer still cares.
          </p>

          <div className="gs-closer-actions">
            <a href="/book-a-call" className="gs-closer-primary" style={{ textDecoration: "none" }}>
              Book a call <span className="arr">→</span>
            </a>
            <a href="/book-a-call" className="gs-closer-secondary" style={{ textDecoration: "none", color: "inherit" }}>
              or book the demo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
