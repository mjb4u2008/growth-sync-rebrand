import { Helmet } from 'react-helmet-async';
import { Layers } from 'lucide-react';

const INTEGRATION_DETAILS = [
  { name: 'Instagram', url: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: 'TikTok', url: "https://cdn.simpleicons.org/tiktok/000000" },
  { name: 'Gmail', url: "https://cdn.simpleicons.org/gmail/EA4335" },
  { name: 'eBay', url: "https://cdn.simpleicons.org/ebay/E53238" },
  { name: 'Twitch', url: "https://cdn.simpleicons.org/twitch/9146FF" },
  { name: 'WhatsApp', url: "https://cdn.simpleicons.org/whatsapp/25D366" },
  { name: 'Telegram', url: "https://cdn.simpleicons.org/telegram/26A5E4" },
  { name: 'Discord', url: "https://cdn.simpleicons.org/discord/5865F2" },
  { name: 'PayPal', url: "https://cdn.simpleicons.org/paypal/00457C" },
];

const IntegrationsPage = () => {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Integrations | GrowthSync</title>
        <meta name="description" content="Connect your entire stack with GrowthSync." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6">
            <Layers className="w-4 h-4" /> Integrations
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-950 mb-6">
            Connect your entire stack
          </h1>
          <p className="text-xl text-gray-600">
            Seamlessly integrate with the tools you already use. Sync data, automate workflows, and unify your social commerce strategy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {INTEGRATION_DETAILS.map((integration, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 md:p-10 bg-white rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={integration.url} alt={integration.name} className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
              </div>
              <span className="font-bold text-gray-900">{integration.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
