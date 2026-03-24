import { motion } from 'motion/react';
import { Bot, PlayCircle, Eye, Heart, X, MessageSquare, ShoppingCart, Users } from 'lucide-react';

const FeatureTwo = () => {
  return (
    <section className="py-16 md:py-32 bg-[#0a0a0a] overflow-hidden relative">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Text on left */}
          <div className="order-1 text-center lg:text-left">
            <p className="text-xs md:text-sm font-bold text-emerald-400 tracking-widest uppercase mb-3 md:mb-4">Live Commerce</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4 md:mb-6">
              Turn live viewers into live buyers
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 md:mb-8">
              Don't let the hype die when the stream ends. Capture the missed opportunity by automatically DMing viewers who comment during your live sessions.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              {[
                { icon: <MessageSquare className="w-4 h-4" />, label: 'Auto-reply' },
                { icon: <ShoppingCart className="w-4 h-4" />, label: 'Checkout links' },
                { icon: <Users className="w-4 h-4" />, label: 'Lead capture' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-gray-300 text-sm font-medium border border-white/5">
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Phone mock on right */}
          <div className="relative order-2">
            <div className="relative bg-[#0a0a0a] border border-gray-800 shadow-2xl rounded-3xl md:rounded-[2rem] overflow-hidden max-w-sm mx-auto flex flex-col h-[380px] sm:h-[450px] md:h-[550px]">
              {/* Live Video Mock */}
              <div className="absolute inset-0">
                <img src="https://picsum.photos/seed/live/400/800" className="w-full h-full object-cover opacity-60" alt="Live Stream" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Top Bar */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <PlayCircle className="w-3 h-3" /> LIVE
                  </div>
                  <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 4.2K
                  </div>
                </div>
                <X className="w-5 h-5 text-white" />
              </div>

              {/* Chat Area */}
              <div className="relative z-10 flex-1 flex flex-col justify-end p-4 pb-20 space-y-3">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                  <img src="https://picsum.photos/seed/u1/100/100" className="w-6 h-6 rounded-full" alt="User" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <p className="text-white text-sm"><span className="font-bold">sarah_j</span> Omg need this!!</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-2">
                  <img src="https://picsum.photos/seed/u2/100/100" className="w-6 h-6 rounded-full" alt="User" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <p className="text-white text-sm"><span className="font-bold">mike.styles</span> How much is the jacket?</p>
                </motion.div>

                {/* GrowthSync Bot Intervention */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl mt-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-emerald-400 text-xs font-bold">GrowthSync Auto-Reply</p>
                  </div>
                  <p className="text-white text-sm">@mike.styles The jacket is $120! Just sent a checkout link to your DMs 🚀</p>
                </motion.div>

                {/* Floating Hearts - Instagram style */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -60 - Math.random() * 80],
                      x: [0, (Math.random() - 0.5) * 40],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 0.8 + Math.random() * 0.6, 0.6 + Math.random() * 0.4],
                    }}
                    transition={{
                      duration: 1.8 + Math.random() * 1.2,
                      repeat: Infinity,
                      delay: i * 0.4 + Math.random() * 0.3,
                      ease: 'easeOut',
                    }}
                    className={`absolute right-4 bottom-24${i >= 4 ? ' hidden md:block' : ''}`}
                    style={{ right: `${12 + Math.random() * 24}px` }}
                  >
                    <Heart className={`${i % 3 === 0 ? 'w-5 h-5' : i % 3 === 1 ? 'w-6 h-6' : 'w-4 h-4'} text-pink-500 fill-pink-500`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureTwo;
