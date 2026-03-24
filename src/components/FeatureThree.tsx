import { motion } from 'motion/react';
import { Bot } from 'lucide-react';

const FeatureThree = () => {
  return (
    <section className="py-16 md:py-32 bg-white overflow-hidden relative">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Text column */}
          <div className="text-center lg:text-left">
            <p className="text-xs md:text-sm font-bold text-pink-600 tracking-widest uppercase mb-3 md:mb-4">Retention Engine</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-950 leading-tight mb-4 md:mb-6">
              Turn every mention into a customer relationship
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              When someone tags you in a story or replies to a post, GrowthSync opens a conversation. It collects zero-party data, builds VIP lists, and tees up the next sale automatically.
            </p>
            <ul className="space-y-4 text-left inline-block lg:block">
              {['Reward story mentions instantly', 'Build VIP lists via DMs', 'Gather zero-party data naturally'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 mt-2 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual column */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-50"></div>

            <div className="relative bg-white border border-gray-200 shadow-2xl rounded-3xl md:rounded-[2rem] overflow-hidden max-w-md mx-auto flex flex-col h-[380px] sm:h-[450px] md:h-[500px]">
              {/* Story Header */}
              <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-3 shrink-0 z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                  <div className="bg-white rounded-full p-[2px] w-full h-full">
                    <img src="https://picsum.photos/seed/brand/100/100" className="w-full h-full rounded-full" alt="Brand" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">yourbrand</p>
                  <p className="text-xs text-gray-500">Mentioned you in their story</p>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-5 space-y-4 bg-gray-50/50 overflow-y-auto flex flex-col justify-end">

                {/* Story Reply Context */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-gray-200 rounded-xl p-2 flex gap-3 max-w-[85%] mb-2"
                >
                  <img src="https://picsum.photos/seed/bag/100/100" className="w-12 h-16 object-cover rounded-lg" alt="Story" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-gray-500 font-bold">jessica.wears</p>
                    <p className="text-sm text-gray-900 italic">"Obsessed with this new bag! 😍"</p>
                  </div>
                </motion.div>

                {/* AI Message 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 shrink-0"></div>
                  <div className="bg-pink-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Yo, thanks for adding this on your story! I see you're loving that bag we just dropped. 🔥
                  </div>
                </motion.div>

                {/* AI Message 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 2.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 shrink-0"></div>
                  <div className="bg-pink-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    We're actually dropping a new one in 3 weeks. No one knows about it yet. Want me to add you to the VIP list?
                  </div>
                </motion.div>

                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 4 }}
                  className="flex gap-2"
                >
                  <img src="https://picsum.photos/seed/customer1/100/100" className="w-8 h-8 rounded-full mt-auto shrink-0" alt="Customer" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="bg-gray-200 text-gray-900 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
                    Yeah, please! What's the drop?
                  </div>
                </motion.div>

                {/* AI Message 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 5.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mt-auto shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-pink-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Got you saved. What's your email? I'll send you the secret link when it drops. 🤫
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureThree;
