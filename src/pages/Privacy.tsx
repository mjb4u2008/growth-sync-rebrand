/**
 * <Privacy> - launch draft of the privacy policy.
 *
 * TODO(founder + counsel): Review and finalize before production launch.
 * Specifically: confirm the legal entity name, jurisdiction, analytics
 * vendors actually in use, and the DSAR/contact email.
 */

import { SimplePage } from "./SimplePage";
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "./config";

export function Privacy() {
  return (
    <SimplePage
      fileName="privacy.txt"
      eyebrow="LEGAL · PRIVACY POLICY"
      title="Privacy."
      lede="A plain-English summary of what we collect, why we collect it, and how we handle it. This is the launch draft."
    >
      <p>
        <strong>Effective date:</strong> {LEGAL_EFFECTIVE_DATE}
      </p>
      <p>
        GrowthSync (&quot;we&quot;, &quot;us&quot;) operates this marketing
        website. We try to collect the minimum information needed to talk to
        you about whether GrowthSync is a fit. If anything here is unclear,
        email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Intake form submissions.</strong> When you fill out the form on /book-a-call we collect your name, company name, email address, social handles, and any notes you choose to share.</li>
        <li><strong>Basic site analytics.</strong> We may use privacy-respecting analytics (e.g. page views, referrer, country) to understand which pages are useful. We don&apos;t use ad-tech profiling cookies.</li>
        <li><strong>Scheduling.</strong> If we enable Calendly (or a similar third-party scheduler), the scheduling step happens on their domain under their privacy policy. We receive only the booking details you submit.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your request and schedule a call.</li>
        <li>To answer follow-up questions and provide product support.</li>
        <li>To improve the product by understanding which use cases come up most often.</li>
      </ul>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell your information.</li>
        <li>We don&apos;t share it with advertisers.</li>
        <li>We don&apos;t use it to train third-party AI models.</li>
      </ul>

      <h2>Your choices</h2>
      <p>
        You can ask us to delete the contact information you&apos;ve shared
        with us at any time by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        We&apos;ll confirm deletion within a reasonable window.
      </p>

      <h2>Changes</h2>
      <p>
        If we materially change how we handle information, we&apos;ll update
        this page and bump the effective date above. For substantive changes
        we&apos;ll notify users who have a relationship with us.
      </p>

      <h2>Contact</h2>
      <p>
        Questions or requests? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
