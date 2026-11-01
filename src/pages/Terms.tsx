/**
 * Published GrowthSync terms, carried over without substantive changes:
 * https://www.growthsync.com/legals/terms-of-service
 * Read November 1, 2026. Effective July 16, 2026.
 * Links to the former landing host now use the equivalent local routes.
 */
import { useEffect } from 'react';
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from './config';
import '@/styles/legal.css';

export function Terms() {
  useEffect(() => {
    document.title = 'Terms of service | GrowthSync';
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previous = canonical?.getAttribute('href');
    canonical?.setAttribute('href', 'https://growthsync.com/terms');
    return () => {
      if (canonical && previous !== null && previous !== undefined) canonical.setAttribute('href', previous);
    };
  }, []);

  return <main className="legal-page">
    <article className="legal-document" aria-labelledby="terms-title">
      <header>
        <h1 id="terms-title">Terms of service</h1>
        <p className="legal-effective">Effective date: {LEGAL_EFFECTIVE_DATE}.</p>
      </header>
      <p>These terms are an agreement between you and GrowthSync (“we”, “us”). They cover this website and, once you create an account, the GrowthSync product. If anything is unclear, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

      <h2>The service</h2>
      <p>GrowthSync is a social listening and reply tool. You connect your business accounts on supported platforms (currently Instagram, TikTok, and Shopify; the in-product connect screen is the current list). GrowthSync captures the comments, mentions, and DMs on those accounts, turns them into insights, and, where you switch it on, drafts and sends replies on your behalf. Some features use AI models to draft text and route conversations.</p>

      <h2>Your account</h2>
      <ul>
        <li>Sign-in is handled by our identity provider. Keep your credentials to yourself; you’re responsible for activity under your account.</li>
        <li>Give us accurate information at signup, and keep it current. If you’re signing up for a company, you confirm you have the authority to accept these terms for it.</li>
        <li>You control who you invite to your workspace. People you invite can see and act on your workspace’s data.</li>
        <li>The service is for business use by people 18 or older.</li>
      </ul>

      <h2>Connected platforms</h2>
      <ul>
        <li>You connect accounts through each platform’s official API and only within the permissions you grant. You can disconnect a platform at any time.</li>
        <li>Your use of each connected platform stays subject to that platform’s own terms. GrowthSync enforces platform messaging rules (for example Meta’s messaging window and send-rate limits), and you agree not to work around them.</li>
        <li>Platforms can change or revoke API access at any time. If that happens, features that depend on the affected platform may stop working, and that isn’t a breach of these terms by us.</li>
      </ul>

      <h2>Your data</h2>
      <ul>
        <li>You own your data. Messages, contacts, commerce records, and content that flow through your connected accounts remain yours. You give us permission to process them only as needed to run the service for you.</li>
        <li>We don’t sell your data, and we don’t use it to train third-party AI models.</li>
        <li>We treat your data as confidential and limit access to personnel and systems that need it to operate the service.</li>
        <li>We use a small set of vetted service providers to run GrowthSync: identity, payments, AI model inference, product analytics, transactional email, ads measurement on this website, and cloud hosting. Each is bound by contract to protect your data. The current list and details live in our <a href="/privacy">privacy policy</a>.</li>
      </ul>

      <h2>AI-drafted replies</h2>
      <ul>
        <li>Drafts are machine-generated and can be wrong, off-tone, or incomplete. Review controls in the product let you approve replies before they send.</li>
        <li>You’re responsible for every message sent from your connected accounts, including replies you’ve configured to send without review.</li>
        <li>If the law where you operate requires disclosing that a message was machine-written, that disclosure is your responsibility.</li>
      </ul>

      <h2>Acceptable use</h2>
      <ul>
        <li>Only message people who have engaged with your business or otherwise consented, in line with each platform’s rules and applicable law.</li>
        <li>No spam, harassment, deception, or unlawful content.</li>
        <li>Don’t probe or break the service’s security outside our <a href="/security">vulnerability disclosure policy</a>, scrape it abusively, resell it without a written agreement, or reverse engineer it.</li>
        <li>Don’t use the service to harm anyone.</li>
      </ul>

      <h2>Fees and billing</h2>
      <ul>
        <li>The product is a paid subscription plus usage charges, at the prices shown at checkout. Billing is handled by our payments provider; we don’t store your card details.</li>
        <li>Prices can change with at least 30 days’ notice, effective your next billing cycle.</li>
        <li>You can cancel anytime; cancellation takes effect at the end of the current billing period. We don’t give partial refunds unless the law requires it.</li>
        <li>Unpaid balances may lead to suspension after notice.</li>
      </ul>

      <h2>Security</h2>
      <ul>
        <li>We encrypt data in transit, restrict access to production systems, and log access to them.</li>
        <li>If we confirm a security incident affecting your data, we’ll notify you without undue delay at the email on your account.</li>
        <li>Found a vulnerability? Report it under our <a href="/security">security policy</a>.</li>
      </ul>

      <h2>Availability and beta features</h2>
      <p>We work to keep the service reliable, but we don’t offer an uptime guarantee at this stage, and we may take the service down briefly for maintenance. Features labeled beta or preview may change or be withdrawn without notice.</p>

      <h2>Suspension and termination</h2>
      <ul>
        <li>You can stop using the service and delete your account at any time.</li>
        <li>We may suspend or end your access for breach of these terms, unlawful use, a connected platform’s requirement, or a genuine risk to the service or other customers. We’ll give notice where practical.</li>
        <li>When your account closes, you can ask us for an export of your data before deletion. We then delete or de-identify your data within 90 days, except records we’re legally required to keep (such as billing records).</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>The GrowthSync name, marks, software, copy, and visual design are ours. You’re welcome to share links and take normal-sized screenshots for press or review purposes; please don’t reproduce the site or product wholesale. Brand names and logos belonging to third parties remain the property of their respective owners; any reference here is editorial.</p>

      <h2>Disclaimers</h2>
      <p>The website and the service are provided “as is”. Demo dashboards, sample inboxes, and case studies on this site are illustrative: they show the kinds of outcomes GrowthSync is designed to support, not promises of future performance.</p>

      <h2>Limitation of liability</h2>
      <p>To the maximum extent allowed by law, neither of us is liable to the other for indirect or consequential losses. Our total liability for anything related to the service is limited to the fees you paid us in the 12 months before the claim, or US$100 if you haven’t paid us anything. Nothing here limits liability that can’t be limited by law.</p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms as the product evolves. For material changes we’ll give you at least 14 days’ notice by email or in the product before they take effect. Continued use after the effective date means you accept the revised version; if you don’t, cancel before it takes effect.</p>

      <h2>Contact</h2>
      <p>Questions? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </article>
  </main>;
}
