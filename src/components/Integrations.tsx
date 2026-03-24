import React from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

const INTEGRATION_LOGOS = [
  "https://cdn.simpleicons.org/instagram/E4405F",
  "https://cdn.simpleicons.org/tiktok/000000",
  "https://cdn.simpleicons.org/gmail/EA4335",
  "https://cdn.simpleicons.org/ebay/E53238",
  "https://cdn.simpleicons.org/twitch/9146FF",
  "https://cdn.simpleicons.org/whatsapp/25D366",
  "https://cdn.simpleicons.org/telegram/26A5E4",
  "https://cdn.simpleicons.org/discord/5865F2",
  "https://cdn.simpleicons.org/paypal/00457C",
];

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Split into two distinct halves to avoid side-by-side duplicates
const half = Math.ceil(INTEGRATION_LOGOS.length / 2);
const col1Base = shuffle(INTEGRATION_LOGOS.slice(0, half));
const col2Base = shuffle(INTEGRATION_LOGOS.slice(half));

// 4 copies to ensure the diagonal columns are long enough to loop seamlessly
const COL1_ITEMS = [...col1Base, ...col1Base, ...col1Base, ...col1Base];
const COL2_ITEMS = [...col2Base, ...col2Base, ...col2Base, ...col2Base];

const IntegrationCard: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center justify-center shrink-0 transition-all hover:scale-110 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
      <img src={url} alt="Integration logo" className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
    </div>
  );
};

const Integrations = () => {
  return (
    <section id="integrations" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="max-w-2xl relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6">
              <Layers className="w-4 h-4" /> Integrations
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-950 mb-6 leading-[1.1]">
              Every channel,<br />already connected
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Connect the platforms where conversations happen to the systems where deals close. A few clicks, fully live.
            </p>
          </div>

          {/* Right Content - Diagonal Scrolling Grid */}
          <div className="relative h-[380px] sm:h-[500px] md:h-[650px] w-full flex justify-center lg:justify-end overflow-hidden rounded-3xl">

            {/* Stronger Gradient Masks for fading effect */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-24 md:h-40 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

            <style>{`
              @keyframes scroll-up {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              @keyframes scroll-down {
                0% { transform: translateY(-50%); }
                100% { transform: translateY(0); }
              }
              .animate-scroll-up {
                animation: scroll-up 35s linear infinite;
              }
              .animate-scroll-down {
                animation: scroll-down 35s linear infinite;
              }

            `}</style>

            {/* Rotated Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] flex gap-6 md:gap-10 justify-center items-center rotate-[-12deg]">
              {/* Column 1 - Up */}
              <div className="flex flex-col gap-6 md:gap-10 animate-scroll-up">
                {COL1_ITEMS.map((url, i) => (
                  <IntegrationCard key={i} url={url} />
                ))}
              </div>
              {/* Column 2 - Down */}
              <div className="flex flex-col gap-6 md:gap-10 animate-scroll-down" style={{ animationDelay: '-17s' }}>
                {COL2_ITEMS.map((url, i) => (
                  <IntegrationCard key={i} url={url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
