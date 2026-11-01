/**
 * Migrated from the published GrowthSync policy, read November 1, 2026:
 * https://www.growthsync.com/legals/privacy-policy
 *
 * Factual migration changes: describe the new business inquiry fields and the
 * retained call/event fields; name Supabase storage and internal Slack notices;
 * disclose the existing 90-day first-party attribution storage. The published
 * rights, deletion commitments, security wording, and other terms are retained.
 * Privacy's effective date changes to November 1, 2026 for these factual updates.
 */
import { useEffect } from 'react';
import { CONTACT_EMAIL, PRIVACY_EFFECTIVE_DATE } from './config';
import '@/styles/legal.css';

export function Privacy() {
  useEffect(() => {
    document.title = 'Privacy policy | GrowthSync';
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previous = canonical?.getAttribute('href');
    canonical?.setAttribute('href', 'https://growthsync.com/privacy');
    return () => {
      if (canonical && previous !== null && previous !== undefined) canonical.setAttribute('href', previous);
    };
  }, []);

  return <main className="legal-page">
    <article className="legal-document" aria-labelledby="privacy-title">
      <header>
        <h1 id="privacy-title">Privacy policy</h1>
        <p className="legal-summary">A plain-English summary of what we collect, why we collect it, and how we handle it.</p>
        <p className="legal-effective">Effective date: {PRIVACY_EFFECTIVE_DATE}.</p>
      </header>
      <p>GrowthSync (“we”, “us”) operates this marketing website. We collect the minimum information needed to talk to you about whether GrowthSync is a fit. If anything here is unclear, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Forms you submit.</strong> Our business inquiry form collects your name, email address, company or brand name, website, and any notes you choose to add. Our book-a-call and event intake forms collect your name, company name, email address, social handles or phone number, and any notes you choose to add. We also record which form on the site you used, so we know how you found us. Submissions are processed for us by Formspree (form processing), Supabase (database storage), and Slack (internal notifications), under their privacy policies.</li>
        <li><strong>Scheduling.</strong> Booking a call happens through Calendly, embedded on our booking page and governed by Calendly’s privacy policy. If you entered your email in one of our forms first, we pass it to Calendly to prefill the booking. We receive the booking details you submit (name, email, and the time you pick).</li>
        <li><strong>Ads and conversion measurement.</strong> This site loads the Meta (Facebook) Pixel and the Google Ads tag, which report page views and form conversions (such as booking a call) to those platforms so we can measure paid campaign performance. These tags can set cookies, collect your IP address, device and browser information, and the pages you visit on this site, and read ad click identifiers (such as gclid or fbclid) from the URL. Meta may also use this data to build ad audiences.
          <p>Meta and Google process measurement data under their own privacy policies. We do not send your form answers to these platforms beyond what is needed to record that a conversion happened.</p>
        </li>
        <li><strong>Paid campaign attribution.</strong> When you arrive from a paid campaign, we keep the campaign fields utm_source, utm_medium, utm_campaign, utm_content, and utm_term, and the click identifiers gclid, gbraid, wbraid, fbclid, and msclkid when present, in first-party browser storage for up to 90 days. This record also includes the landing page, referrer, and capture time. If you submit a form, we include this attribution record with your request so we can understand which campaigns lead to real conversations.</li>
        <li><strong>Server logs.</strong> Our hosting provider keeps standard request logs (IP address, browser type, pages requested) for security and reliability. We do not run our own visitor analytics on this site today; if that changes, we will update this policy first.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your request and schedule a call.</li>
        <li>To answer follow-up questions.</li>
        <li>To measure which pages and paid campaigns lead to real conversations.</li>
        <li>To improve the product by understanding which use cases come up most often.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>Service providers who process data on our behalf: Formspree (form processing), Supabase (database storage), Slack (internal notifications), Calendly (scheduling), Google and Meta (ads measurement), and our hosting provider (serving the site and keeping request logs). Each operates under its own privacy terms. Beyond that:</p>
      <ul>
        <li>We don’t sell your information.</li>
        <li>We don’t share your form answers with advertisers for resale or third-party profiling. Conversion reporting sends only the fields needed to record that a conversion happened.</li>
        <li>We don’t use your information to train third-party AI models.</li>
      </ul>

      <h2>Cookies and your choices</h2>
      <p>This site does not set its own cookies. The Calendly embed and the Meta and Google measurement tags may set theirs. You can block or clear cookies in your browser, and you can limit ad tracking through Google’s Ads Settings and Meta’s ad preferences.</p>
      <p>You can also clear the first-party attribution record described above through your browser’s site-data or local-storage controls.</p>

      <h2>Retention and deletion</h2>
      <p>We keep form and booking details for as long as we need them for the purposes above. You can ask us to delete the contact information you’ve shared at any time by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We’ll confirm deletion within 30 days, including asking our service providers to delete their copies.</p>

      <h2>Your rights</h2>
      <p>You can ask what information we hold about you, ask us to correct it, or ask us to delete it. Depending on where you live, local law may give you additional rights. For any of these, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we’ll respond within 30 days.</p>

      <h2>Security and where data lives</h2>
      <p>Data is transmitted over HTTPS and processed by our service providers in the United States. If you believe you’ve found a security issue, see our <a href="/security">security page</a> for how to report it.</p>

      <h2>Changes</h2>
      <p>If we materially change how we handle information, we’ll update this page and bump the effective date above. For substantive changes we’ll notify people who have a relationship with us.</p>

      <h2>Contact</h2>
      <p>Questions or requests? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </article>
  </main>;
}
