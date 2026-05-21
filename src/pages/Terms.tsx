/**
 * <Terms> — launch draft of the terms of service.
 *
 * TODO(founder + counsel): Review and finalize before production launch.
 * Specifically: confirm legal entity, governing law, and the liability
 * limit / arbitration language appropriate for your jurisdiction.
 */

import { SimplePage } from "./SimplePage";
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "./config";

export function Terms() {
  return (
    <SimplePage
      fileName="terms.txt"
      eyebrow="LEGAL · TERMS OF USE"
      title="Terms."
      lede="The basic ground rules for using this website. This is the launch draft — final terms for the product itself will be issued at signup."
    >
      <p>
        <strong>Effective date:</strong> {LEGAL_EFFECTIVE_DATE}
      </p>
      <p>
        By using this website you agree to the following, in plain English.
        If anything is unclear, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Using the site</h2>
      <ul>
        <li>This site is provided for informational and demo purposes — for now, no production product is delivered through it.</li>
        <li>Don&apos;t try to break it, scrape it abusively, or use it to harm anyone.</li>
        <li>If you submit information through the intake form, you confirm that information is accurate to the best of your knowledge.</li>
      </ul>

      <h2>No service guarantee</h2>
      <p>
        This site is provided &quot;as is&quot;. We don&apos;t guarantee it
        will be available at any given time, free of bugs, or fit for any
        particular purpose. Demo dashboards, sample inboxes, and case
        studies are illustrative — they reflect the kinds of outcomes
        GrowthSync is designed to support, not promises of future
        performance.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The GrowthSync name, marks, copy, and visual design on this site
        are ours and licensed only for viewing the site. You&apos;re welcome
        to share links and to take normal-sized screenshots for press or
        review purposes. Please don&apos;t reproduce the site wholesale.
      </p>
      <p>
        Brand names and logos belonging to third parties remain the property
        of their respective owners; any reference here is editorial.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent allowed by law, we&apos;re not liable for any
        indirect or consequential losses arising from your use of this
        website. Our total liability for anything related to this site is
        limited to a token amount (e.g. US$100) — the real product will
        ship with its own commercial agreement.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the product evolves. Continued use of
        the site after an update means you accept the revised version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
