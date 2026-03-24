import { motion, useReducedMotion } from 'motion/react';
import { Network } from 'lucide-react';
import SphereImageGrid, { ImageData } from './ui/img-sphere';

const SegmentOfOne = () => {
  const prefersReducedMotion = useReducedMotion();
  // Generate mock customer data for the sphere
  const CUSTOMERS: ImageData[] = Array.from({ length: 60 }).map((_, i) => ({
    id: `cust-${i}`,
    src: `https://picsum.photos/seed/cust${i}/200/200`,
    alt: `Customer ${i}`,
    name: `Customer ${i}`,
    aov: `$${(Math.random() * 200 + 50).toFixed(2)}`,
    orders: Math.floor(Math.random() * 10) + 1,
    lastInteraction: ['Watched Story', 'Added to Cart', 'DM Inquiry', 'Liked Post'][Math.floor(Math.random() * 4)],
    channel: ['Instagram', 'Email', 'SMS', 'TikTok'][Math.floor(Math.random() * 4)]
  }));

  const SPHERE_CONFIG = {
    containerSize: 600,
    sphereRadius: 200,
    dragSensitivity: 0.8,
    momentumDecay: 0.96,
    maxRotationSpeed: 6,
    baseImageScale: 0.15,
    hoverScale: 1.3,
    perspective: 1000,
    autoRotate: true,
    autoRotateSpeed: 0.2
  };

  return (
    <section className="pb-20 pt-16 md:pb-32 md:pt-20 bg-[#030712] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-violet-300 text-xs md:text-sm font-medium mb-4 md:mb-6 border border-white/10"
            >
              <Network className="w-3 h-3 md:w-4 md:h-4" />
              The Intelligence Engine
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
              className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 md:mb-6 text-white leading-tight"
            >
              The Segment of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">One.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 md:mb-8"
            >
              GrowthSync builds a complete profile of every person who interacts with your brand. Every channel, every touchpoint. You don't talk to segments anymore. You talk to Jessica.
            </motion.p>

            <ul className="space-y-3 md:space-y-4 text-left inline-block lg:block">
              {[
                'Predictive AOV & LTV modeling',
                'Cross-channel interaction history',
                'Real-time intent scoring'
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 text-gray-300 font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: Desktop Web Visualization */}
          <div className="hidden md:flex justify-center items-center relative">
            <SphereImageGrid images={CUSTOMERS} {...SPHERE_CONFIG} />
          </div>

          {/* Mobile Profile Cards */}
          <div className="md:hidden flex flex-col gap-4 relative z-20 mt-12">
            <p className="text-white/60 text-sm font-medium mb-1">
              <span>1,247</span> customers tracked today
            </p>
            {CUSTOMERS.slice(0, 3).map((customer, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <img src={customer.src} alt={customer.name} className="w-12 h-12 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{customer.name}</p>
                  <p className="text-gray-400 text-xs">{customer.channel} · {customer.lastInteraction}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white font-bold text-sm">{customer.aov}</p>
                  <p className="text-gray-500 text-xs">AOV</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SegmentOfOne;
