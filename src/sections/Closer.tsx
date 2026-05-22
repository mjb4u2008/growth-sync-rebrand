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
    <section className="gs-section">
      <div className="gs-closer-shell">
        <div className="gs-closer-chrome">
          <span className="lights">
            <span style={{ background: "var(--gs-tl-red)" }} />
            <span style={{ background: "var(--gs-tl-yel)" }} />
            <span style={{ background: "var(--gs-tl-grn)" }} />
          </span>
          <span className="name">growthsync · system · ready</span>
          <span style={{ textAlign: "right", font: "700 10px/1 var(--gs-font-mono)", color: "var(--gs-ink-3)", letterSpacing: "0.08em" }}>
            04:21 PM
          </span>
        </div>

        <div className="gs-closer" style={{ borderRadius: "0 0 22px 22px" }}>
          <span className="gs-closer-status">
            <span className="led" />
            PRIVATE BETA · INSTAGRAM-FIRST
          </span>
          <h2>
            Your next customer is
            <br />
            already in your comments.
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
