import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <Helmet>
        <title>Terms of Service | GrowthSync</title>
        <meta name="description" content="GrowthSync terms of service. Review the terms governing your use of the GrowthSync platform." />
        <link rel="canonical" href="https://growthsync.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growthsync.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service | GrowthSync" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 md:px-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-950 mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-12">Last updated: March 23, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the GrowthSync platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">2. Description of Service</h2>
            <p>
              GrowthSync provides a conversational AI platform that automates social commerce interactions, including direct message automation, comment response, live stream engagement, and checkout link generation across social media platforms. The Service integrates with third-party platforms including but not limited to Instagram, TikTok, and Shopify.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">3. Account Registration</h2>
            <p>
              You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activity under your account. Notify us immediately at <a href="mailto:support@growthsync.com" className="text-teal-600 hover:text-teal-700 font-medium">support@growthsync.com</a> if you suspect unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">4. Pricing and Payment</h2>
            <p>
              GrowthSync operates on a revenue-share model. There is no platform fee. We earn a percentage of the revenue generated through the platform. Specific pricing details are provided during onboarding and outlined in your service agreement. We reserve the right to modify pricing with 30 days advance notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">5. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Send spam, unsolicited messages, or deceptive content</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Transmit malware, viruses, or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Violate the terms of service of any connected third-party platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">6. Intellectual Property</h2>
            <p>
              GrowthSync and its associated logos, features, and documentation are owned by GrowthSync Inc. You retain ownership of your content and data. By using the Service, you grant us a limited license to process your data solely to provide and improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">7. Third-Party Integrations</h2>
            <p>
              The Service integrates with third-party platforms. Your use of those platforms is governed by their respective terms of service. We are not responsible for the availability, accuracy, or policies of third-party services. Changes to third-party APIs may affect Service functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, GrowthSync Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">9. Termination</h2>
            <p>
              Either party may terminate this agreement at any time with 30 days written notice. We may suspend or terminate your access immediately if you violate these Terms. Upon termination, your right to use the Service ceases and we will delete your data in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">10. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved in the state or federal courts located in Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">11. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be communicated via email or through the platform. Continued use of the Service after changes take effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-950 mb-4">12. Contact</h2>
            <p>
              For questions about these Terms, contact us at <a href="mailto:legal@growthsync.com" className="text-teal-600 hover:text-teal-700 font-medium">legal@growthsync.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
