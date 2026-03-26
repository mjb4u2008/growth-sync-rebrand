import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <Helmet>
        <title>Privacy Policy | GrowthSync</title>
        <meta name="description" content="GrowthSync privacy policy. Learn how we collect, use, and protect your data." />
        <link rel="canonical" href="https://growthsync.com/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growthsync.com/privacy" />
        <meta property="og:title" content="Privacy Policy | GrowthSync" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 md:px-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-950 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: March 23, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">1. Information We Collect</h2>
            <p>
              When you use GrowthSync, we collect information you provide directly, such as your name, email address, company name, and website URL when you book a demo or create an account. We also collect usage data including how you interact with our platform, feature usage patterns, and performance metrics.
            </p>
            <p className="mt-4">
              When you connect social media accounts to GrowthSync, we access data necessary to provide our services, including direct messages, comments, and engagement metrics on your connected accounts. We do not access or store the personal social media credentials of your end customers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Provide, maintain, and improve the GrowthSync platform</li>
              <li>Process and fulfill your service requests</li>
              <li>Send transactional communications about your account</li>
              <li>Analyze usage patterns to improve our product</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">3. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with trusted third-party service providers who help us operate our platform (such as cloud hosting, analytics, and payment processing). All third parties are contractually obligated to protect your data and use it only for the purposes we specify.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">4. Data Retention</h2>
            <p>
              We retain your account data for as long as your account is active or as needed to provide services. If you close your account, we will delete your data within 90 days, except where retention is required by law or for legitimate business purposes such as resolving disputes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">5. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including encryption in transit and at rest, regular security audits, and access controls. While no system is 100% secure, we take reasonable steps to protect your information from unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at <a href="mailto:privacy@growthsync.com" className="text-teal-600 hover:text-teal-700 font-medium">privacy@growthsync.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">7. Cookies</h2>
            <p>
              We use essential cookies to maintain session state and preferences. We use analytics cookies to understand how visitors interact with our website. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last updated" date. Continued use of GrowthSync after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">9. Contact</h2>
            <p>
              If you have questions about this privacy policy or our data practices, contact us at <a href="mailto:privacy@growthsync.com" className="text-teal-600 hover:text-teal-700 font-medium">privacy@growthsync.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
